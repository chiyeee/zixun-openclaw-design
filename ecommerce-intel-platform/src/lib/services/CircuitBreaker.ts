/**
 * 熔断器 (Circuit Breaker)
 * 防止级联故障和过载保护
 */

import { logger } from '$lib/config/api';

export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface CircuitBreakerConfig {
	failureThreshold: number;    // 失败阈值
	recoveryTimeout: number;     // 恢复超时时间(ms)
	monitoringPeriod: number;    // 监控周期(ms)
	halfOpenMaxCalls: number;    // 半开状态最大调用次数
}

interface CircuitBreakerStats {
	totalRequests: number;
	successfulRequests: number;
	failedRequests: number;
	consecutiveFailures: number;
	lastFailureTime: number;
	lastSuccessTime: number;
	state: CircuitBreakerState;
	stateChangedAt: number;
}

export class CircuitBreaker {
	private serviceName: string;
	private config: CircuitBreakerConfig;
	private stats: CircuitBreakerStats;
	private halfOpenCalls: number = 0;

	constructor(
		serviceName: string,
		failureThreshold: number = 5,
		recoveryTimeout: number = 60000, // 1分钟
		monitoringPeriod: number = 60000,  // 1分钟
		halfOpenMaxCalls: number = 3
	) {
		this.serviceName = serviceName;
		this.config = {
			failureThreshold,
			recoveryTimeout,
			monitoringPeriod,
			halfOpenMaxCalls
		};

		this.stats = {
			totalRequests: 0,
			successfulRequests: 0,
			failedRequests: 0,
			consecutiveFailures: 0,
			lastFailureTime: 0,
			lastSuccessTime: 0,
			state: 'CLOSED',
			stateChangedAt: Date.now()
		};

		logger.log('CircuitBreaker', `Initialized circuit breaker for ${serviceName} (threshold: ${failureThreshold})`);
	}

	/**
	 * 检查是否可以执行请求
	 */
	canExecute(): boolean {
		const now = Date.now();

		switch (this.stats.state) {
			case 'CLOSED':
				return true;

			case 'OPEN':
				// 检查是否可以转换到半开状态
				if (now - this.stats.stateChangedAt >= this.config.recoveryTimeout) {
					this.setState('HALF_OPEN');
					this.halfOpenCalls = 0;
					logger.log('CircuitBreaker', `${this.serviceName} circuit breaker: OPEN -> HALF_OPEN`);
					return true;
				}
				return false;

			case 'HALF_OPEN':
				// 半开状态下允许有限次数的请求
				return this.halfOpenCalls < this.config.halfOpenMaxCalls;

			default:
				return false;
		}
	}

	/**
	 * 记录成功请求
	 */
	recordSuccess(): void {
		const now = Date.now();
		this.stats.totalRequests++;
		this.stats.successfulRequests++;
		this.stats.lastSuccessTime = now;
		this.stats.consecutiveFailures = 0;

		switch (this.stats.state) {
			case 'HALF_OPEN':
				this.halfOpenCalls++;
				// 如果半开状态下成功次数达到阈值，转换到关闭状态
				if (this.halfOpenCalls >= this.config.halfOpenMaxCalls) {
					this.setState('CLOSED');
					this.halfOpenCalls = 0;
					logger.log('CircuitBreaker', `${this.serviceName} circuit breaker: HALF_OPEN -> CLOSED (recovered)`);
				}
				break;

			case 'OPEN':
				// 开放状态下不应该有成功请求，但如果有就转换到关闭状态
				this.setState('CLOSED');
				logger.log('CircuitBreaker', `${this.serviceName} circuit breaker: OPEN -> CLOSED (unexpected success)`);
				break;
		}

		logger.debug('CircuitBreaker', `${this.serviceName} success recorded (consecutive failures: ${this.stats.consecutiveFailures})`);
	}

	/**
	 * 记录失败请求
	 */
	recordFailure(): void {
		const now = Date.now();
		this.stats.totalRequests++;
		this.stats.failedRequests++;
		this.stats.lastFailureTime = now;
		this.stats.consecutiveFailures++;

		switch (this.stats.state) {
			case 'CLOSED':
				// 如果连续失败次数达到阈值，转换到开放状态
				if (this.stats.consecutiveFailures >= this.config.failureThreshold) {
					this.setState('OPEN');
					logger.warn('CircuitBreaker', `${this.serviceName} circuit breaker: CLOSED -> OPEN (${this.stats.consecutiveFailures} consecutive failures)`);
				}
				break;

			case 'HALF_OPEN':
				// 半开状态下任何失败都转换到开放状态
				this.setState('OPEN');
				this.halfOpenCalls = 0;
				logger.warn('CircuitBreaker', `${this.serviceName} circuit breaker: HALF_OPEN -> OPEN (failure during recovery)`);
				break;
		}

		logger.debug('CircuitBreaker', `${this.serviceName} failure recorded (consecutive failures: ${this.stats.consecutiveFailures})`);
	}

	/**
	 * 获取当前状态
	 */
	getState(): CircuitBreakerState {
		return this.stats.state;
	}

	/**
	 * 获取统计信息
	 */
	getStats(): CircuitBreakerStats {
		return { ...this.stats };
	}

	/**
	 * 获取失败率
	 */
	getFailureRate(): number {
		if (this.stats.totalRequests === 0) return 0;
		return this.stats.failedRequests / this.stats.totalRequests;
	}

	/**
	 * 获取成功率
	 */
	getSuccessRate(): number {
		if (this.stats.totalRequests === 0) return 0;
		return this.stats.successfulRequests / this.stats.totalRequests;
	}

	/**
	 * 检查是否健康
	 */
	isHealthy(): boolean {
		const now = Date.now();

		// 如果最近没有请求，认为是健康的
		if (this.stats.totalRequests === 0) return true;

		// 如果熔断器开放，认为不健康
		if (this.stats.state === 'OPEN') return false;

		// 检查失败率
		const recentFailureRate = this.getRecentFailureRate();
		if (recentFailureRate > 0.5) return false; // 50%以上失败率认为不健康

		// 检查连续失败次数
		if (this.stats.consecutiveFailures >= this.config.failureThreshold / 2) return false;

		return true;
	}

	/**
	 * 获取最近的失败率（监控周期内）
	 */
	private getRecentFailureRate(): number {
		const now = Date.now();
		const monitoringPeriodStart = now - this.config.monitoringPeriod;

		// 简化实现：如果最后一次失败在监控周期内，使用总体失败率
		if (this.stats.lastFailureTime >= monitoringPeriodStart) {
			return this.getFailureRate();
		}

		return 0;
	}

	/**
	 * 设置状态
	 */
	private setState(newState: CircuitBreakerState): void {
		if (this.stats.state !== newState) {
			this.stats.state = newState;
			this.stats.stateChangedAt = Date.now();
		}
	}

	/**
	 * 手动重置熔断器
	 */
	reset(): void {
		this.stats = {
			totalRequests: 0,
			successfulRequests: 0,
			failedRequests: 0,
			consecutiveFailures: 0,
			lastFailureTime: 0,
			lastSuccessTime: 0,
			state: 'CLOSED',
			stateChangedAt: Date.now()
		};
		this.halfOpenCalls = 0;

		logger.log('CircuitBreaker', `${this.serviceName} circuit breaker manually reset`);
	}

	/**
	 * 手动打开熔断器
	 */
	forceOpen(): void {
		this.setState('OPEN');
		this.halfOpenCalls = 0;
		logger.log('CircuitBreaker', `${this.serviceName} circuit breaker manually opened`);
	}

	/**
	 * 手动关闭熔断器
	 */
	forceClose(): void {
		this.setState('CLOSED');
		this.stats.consecutiveFailures = 0;
		this.halfOpenCalls = 0;
		logger.log('CircuitBreaker', `${this.serviceName} circuit breaker manually closed`);
	}

	/**
	 * 获取下次可以尝试的时间
	 */
	getNextAttemptTime(): number | null {
		if (this.stats.state !== 'OPEN') return null;
		return this.stats.stateChangedAt + this.config.recoveryTimeout;
	}

	/**
	 * 获取距离下次尝试的剩余时间
	 */
	getTimeUntilNextAttempt(): number {
		const nextAttemptTime = this.getNextAttemptTime();
		if (nextAttemptTime === null) return 0;
		return Math.max(0, nextAttemptTime - Date.now());
	}

	/**
	 * 更新配置
	 */
	updateConfig(config: Partial<CircuitBreakerConfig>): void {
		this.config = { ...this.config, ...config };
		logger.log('CircuitBreaker', `${this.serviceName} circuit breaker configuration updated`);
	}

	/**
	 * 获取详细状态信息
	 */
	getDetailedStatus(): {
		serviceName: string;
		state: CircuitBreakerState;
		isHealthy: boolean;
		stats: CircuitBreakerStats;
		config: CircuitBreakerConfig;
		failureRate: number;
		successRate: number;
		timeUntilNextAttempt: number;
		halfOpenCalls: number;
	} {
		return {
			serviceName: this.serviceName,
			state: this.stats.state,
			isHealthy: this.isHealthy(),
			stats: this.getStats(),
			config: this.config,
			failureRate: this.getFailureRate(),
			successRate: this.getSuccessRate(),
			timeUntilNextAttempt: this.getTimeUntilNextAttempt(),
			halfOpenCalls: this.halfOpenCalls
		};
	}

	/**
	 * 导出状态数据
	 */
	exportState(): {
		serviceName: string;
		config: CircuitBreakerConfig;
		stats: CircuitBreakerStats;
		halfOpenCalls: number;
	} {
		return {
			serviceName: this.serviceName,
			config: this.config,
			stats: this.stats,
			halfOpenCalls: this.halfOpenCalls
		};
	}

	/**
	 * 导入状态数据
	 */
	importState(data: {
		config?: CircuitBreakerConfig;
		stats?: CircuitBreakerStats;
		halfOpenCalls?: number;
	}): void {
		if (data.config) {
			this.config = { ...this.config, ...data.config };
		}
		if (data.stats) {
			this.stats = { ...this.stats, ...data.stats };
		}
		if (typeof data.halfOpenCalls === 'number') {
			this.halfOpenCalls = data.halfOpenCalls;
		}

		logger.log('CircuitBreaker', `${this.serviceName} circuit breaker state imported`);
	}
}