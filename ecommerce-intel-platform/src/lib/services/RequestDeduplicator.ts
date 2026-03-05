/**
 * 请求去重器 (Request Deduplicator)
 * 防止相同的并发请求重复执行
 */

import { logger } from '$lib/config/api';

interface PendingRequest<T> {
	promise: Promise<T>;
	createdAt: number;
	resolveCount: number;
}

interface DeduplicatorStats {
	totalRequests: number;
	deduplicatedRequests: number;
	uniqueRequests: number;
	activeRequests: number;
	averageWaitTime: number;
	maxWaitTime: number;
}

export class RequestDeduplicator {
	private pendingRequests = new Map<string, PendingRequest<unknown>>();
	private stats: DeduplicatorStats = {
		totalRequests: 0,
		deduplicatedRequests: 0,
		uniqueRequests: 0,
		activeRequests: 0,
		averageWaitTime: 0,
		maxWaitTime: 0
	};
	private maxPendingTime: number;
	private cleanupInterval: NodeJS.Timeout;

	constructor(
		maxPendingTime: number = 30000,    // 30秒最大等待时间
		cleanupIntervalMs: number = 10000  // 10秒清理间隔
	) {
		this.maxPendingTime = maxPendingTime;

		// 定期清理超时的请求
		this.cleanupInterval = setInterval(() => {
			this.cleanup();
		}, cleanupIntervalMs);

		logger.log('RequestDeduplicator', `Initialized request deduplicator (maxPendingTime: ${maxPendingTime}ms)`);
	}

	/**
	 * 去重执行请求
	 */
	async dedupe<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
		const startTime = Date.now();
		this.stats.totalRequests++;

		// 检查是否有相同的请求正在执行
		const existing = this.pendingRequests.get(key) as PendingRequest<T> | undefined;

		if (existing) {
			// 有相同请求正在执行，等待结果
			this.stats.deduplicatedRequests++;
			existing.resolveCount++;

			logger.debug('RequestDeduplicator', `Deduplicating request: ${key} (${existing.resolveCount} waiters)`);

			try {
				const result = await existing.promise;
				const waitTime = Date.now() - startTime;
				this.updateWaitTimeStats(waitTime);
				return result;
			} catch (error) {
				// 如果请求失败，从缓存中移除
				this.pendingRequests.delete(key);
				throw error;
			}
		}

		// 没有相同请求，创建新的请求
		this.stats.uniqueRequests++;
		this.stats.activeRequests++;

		const promise = this.executeRequest(key, requestFn);
		
		const pendingRequest: PendingRequest<T> = {
			promise,
			createdAt: Date.now(),
			resolveCount: 1
		};

		this.pendingRequests.set(key, pendingRequest);

		logger.debug('RequestDeduplicator', `New unique request: ${key}`);

		try {
			const result = await promise;
			return result;
		} finally {
			// 请求完成后清理
			this.pendingRequests.delete(key);
			this.stats.activeRequests--;
		}
	}

	/**
	 * 执行实际请求
	 */
	private async executeRequest<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
		try {
			const result = await requestFn();
			logger.debug('RequestDeduplicator', `Request completed successfully: ${key}`);
			return result;
		} catch (error) {
			logger.error('RequestDeduplicator', `Request failed: ${key}`, error);
			throw error;
		}
	}

	/**
	 * 更新等待时间统计
	 */
	private updateWaitTimeStats(waitTime: number): void {
		// 更新最大等待时间
		if (waitTime > this.stats.maxWaitTime) {
			this.stats.maxWaitTime = waitTime;
		}

		// 更新平均等待时间（简化实现）
		if (this.stats.deduplicatedRequests === 1) {
			this.stats.averageWaitTime = waitTime;
		} else {
			this.stats.averageWaitTime = (this.stats.averageWaitTime + waitTime) / 2;
		}
	}

	/**
	 * 清理超时的请求
	 */
	private cleanup(): void {
		const now = Date.now();
		const expiredKeys: string[] = [];

		for (const [key, request] of this.pendingRequests.entries()) {
			if (now - request.createdAt > this.maxPendingTime) {
				expiredKeys.push(key);
			}
		}

		if (expiredKeys.length > 0) {
			for (const key of expiredKeys) {
				this.pendingRequests.delete(key);
				this.stats.activeRequests = Math.max(0, this.stats.activeRequests - 1);
			}
			
			logger.warn('RequestDeduplicator', `Cleaned up ${expiredKeys.length} expired pending requests`);
		}
	}

	/**
	 * 获取统计信息
	 */
	getStats(): DeduplicatorStats {
		return { ...this.stats };
	}

	/**
	 * 获取去重率
	 */
	getDeduplicationRate(): number {
		if (this.stats.totalRequests === 0) return 0;
		return this.stats.deduplicatedRequests / this.stats.totalRequests;
	}

	/**
	 * 获取当前活跃请求数量
	 */
	getActiveCount(): number {
		return this.pendingRequests.size;
	}

	/**
	 * 获取所有待处理的请求键
	 */
	getPendingKeys(): string[] {
		return Array.from(this.pendingRequests.keys());
	}

	/**
	 * 获取特定请求的等待者数量
	 */
	getWaiterCount(key: string): number {
		const request = this.pendingRequests.get(key);
		return request ? request.resolveCount : 0;
	}

	/**
	 * 检查请求是否正在进行
	 */
	isPending(key: string): boolean {
		return this.pendingRequests.has(key);
	}

	/**
	 * 获取请求的创建时间
	 */
	getRequestAge(key: string): number {
		const request = this.pendingRequests.get(key);
		if (!request) return 0;
		return Date.now() - request.createdAt;
	}

	/**
	 * 强制取消特定请求
	 */
	cancelRequest(key: string): boolean {
		const existed = this.pendingRequests.has(key);
		if (existed) {
			this.pendingRequests.delete(key);
			this.stats.activeRequests = Math.max(0, this.stats.activeRequests - 1);
			logger.warn('RequestDeduplicator', `Manually cancelled request: ${key}`);
		}
		return existed;
	}

	/**
	 * 清除所有待处理的请求
	 */
	clear(): void {
		const clearedCount = this.pendingRequests.size;
		this.pendingRequests.clear();
		this.stats.activeRequests = 0;
		
		if (clearedCount > 0) {
			logger.warn('RequestDeduplicator', `Cleared ${clearedCount} pending requests`);
		}
	}

	/**
	 * 重置统计信息
	 */
	resetStats(): void {
		this.stats = {
			totalRequests: 0,
			deduplicatedRequests: 0,
			uniqueRequests: 0,
			activeRequests: this.pendingRequests.size,
			averageWaitTime: 0,
			maxWaitTime: 0
		};
		logger.log('RequestDeduplicator', 'Statistics reset');
	}

	/**
	 * 获取详细状态信息
	 */
	getDetailedStatus(): {
		stats: DeduplicatorStats;
		deduplicationRate: number;
		activeRequests: Array<{
			key: string;
			age: number;
			waiterCount: number;
		}>;
		oldestRequestAge: number;
		newestRequestAge: number;
	} {
		const activeRequests: Array<{
			key: string;
			age: number;
			waiterCount: number;
		}> = [];

		let oldestAge = 0;
		let newestAge = 0;

		for (const [key, request] of this.pendingRequests.entries()) {
			const age = Date.now() - request.createdAt;
			
			activeRequests.push({
				key,
				age,
				waiterCount: request.resolveCount
			});

			if (age > oldestAge) oldestAge = age;
			if (newestAge === 0 || age < newestAge) newestAge = age;
		}

		// 按等待时间排序
		activeRequests.sort((a, b) => b.age - a.age);

		return {
			stats: this.getStats(),
			deduplicationRate: this.getDeduplicationRate(),
			activeRequests,
			oldestRequestAge: oldestAge,
			newestRequestAge: newestAge
		};
	}

	/**
	 * 设置最大等待时间
	 */
	setMaxPendingTime(maxPendingTime: number): void {
		this.maxPendingTime = maxPendingTime;
		logger.log('RequestDeduplicator', `Max pending time updated to ${maxPendingTime}ms`);
	}

	/**
	 * 导出状态数据
	 */
	exportState(): {
		stats: DeduplicatorStats;
		maxPendingTime: number;
		pendingRequests: Array<{
			key: string;
			createdAt: number;
			resolveCount: number;
		}>;
	} {
		const pendingRequests = Array.from(this.pendingRequests.entries()).map(([key, request]) => ({
			key,
			createdAt: request.createdAt,
			resolveCount: request.resolveCount
		}));

		return {
			stats: this.stats,
			maxPendingTime: this.maxPendingTime,
			pendingRequests
		};
	}

	/**
	 * 检查是否健康
	 */
	isHealthy(): boolean {
		// 检查是否有过多的活跃请求
		if (this.stats.activeRequests > 100) return false;

		// 检查是否有请求等待时间过长
		if (this.stats.maxWaitTime > 60000) return false; // 1分钟

		// 检查平均等待时间
		if (this.stats.averageWaitTime > 10000) return false; // 10秒

		return true;
	}

	/**
	 * 销毁去重器
	 */
	destroy(): void {
		if (this.cleanupInterval) {
			clearInterval(this.cleanupInterval);
		}
		this.clear();
		logger.log('RequestDeduplicator', 'Request deduplicator destroyed');
	}
}