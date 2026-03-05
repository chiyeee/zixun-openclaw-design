/**
 * 服务客户端 - 统一的HTTP请求处理
 * 集成缓存、熔断器、请求去重等功能
 */

import { CacheManager } from './CacheManager';
import { CircuitBreaker } from './CircuitBreaker';
import { RequestDeduplicator } from './RequestDeduplicator';
import { logger, REQUEST_CONFIG } from '$lib/config/api';

export interface ServiceClientConfig {
	serviceName: string;
	baseURL?: string;
	defaultHeaders?: Record<string, string>;
	timeout?: number;
	retryAttempts?: number;
	cacheConfig?: {
		enabled: boolean;
		ttl: number;
	};
	circuitBreakerConfig?: {
		enabled: boolean;
		failureThreshold: number;
		recoveryTimeout: number;
	};
}

export interface RequestOptions extends RequestInit {
	skipCache?: boolean;
	skipDeduplication?: boolean;
	skipCircuitBreaker?: boolean;
	cacheKey?: string;
	cacheTTL?: number;
}

export class ServiceClient {
	private serviceName: string;
	private baseURL: string;
	private defaultHeaders: Record<string, string>;
	private timeout: number;
	private retryAttempts: number;
	private cacheManager: CacheManager;
	private circuitBreaker: CircuitBreaker;
	private requestDeduplicator: RequestDeduplicator;

	constructor(config: ServiceClientConfig) {
		this.serviceName = config.serviceName;
		this.baseURL = config.baseURL || '';
		this.defaultHeaders = config.defaultHeaders || {};
		this.timeout = config.timeout || REQUEST_CONFIG.TIMEOUT;
		this.retryAttempts = config.retryAttempts || REQUEST_CONFIG.RETRY_ATTEMPTS;

		// 初始化服务层组件
		this.cacheManager = new CacheManager(config.serviceName);
		this.circuitBreaker = new CircuitBreaker(
			config.serviceName,
			config.circuitBreakerConfig?.failureThreshold || 5,
			config.circuitBreakerConfig?.recoveryTimeout || 60000
		);
		this.requestDeduplicator = new RequestDeduplicator();

		logger.log('ServiceClient', `Initialized service client for ${this.serviceName}`);
	}

	/**
	 * 发起HTTP请求
	 */
	async request<T = unknown>(
		endpoint: string,
		options: RequestOptions = {}
	): Promise<T> {
		const url = this.buildURL(endpoint);
		const cacheKey = options.cacheKey || this.generateCacheKey(url, options);

		try {
			// 1. 检查缓存
			if (!options.skipCache) {
				const cached = await this.cacheManager.get<T>(cacheKey);
				if (cached !== null) {
					logger.debug('ServiceClient', `Cache hit for ${url}`);
					return cached;
				}
			}

			// 2. 检查熔断器
			if (!options.skipCircuitBreaker && !this.circuitBreaker.canExecute()) {
				throw new Error(`Circuit breaker is OPEN for ${this.serviceName}`);
			}

			// 3. 请求去重
			if (!options.skipDeduplication) {
				return await this.requestDeduplicator.dedupe(cacheKey, () =>
					this.executeRequest<T>(url, options, cacheKey)
				);
			}

			return await this.executeRequest<T>(url, options, cacheKey);

		} catch (error) {
			logger.error('ServiceClient', `Request failed for ${url}:`, error);
			
			// 记录熔断器失败
			if (!options.skipCircuitBreaker) {
				this.circuitBreaker.recordFailure();
			}
			
			throw error;
		}
	}

	/**
	 * GET请求
	 */
	async get<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: 'GET' });
	}

	/**
	 * POST请求
	 */
	async post<T = unknown>(
		endpoint: string,
		body?: unknown,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: 'POST',
			body: body ? JSON.stringify(body) : undefined,
			skipCache: true // POST请求默认跳过缓存
		});
	}

	/**
	 * PUT请求
	 */
	async put<T = unknown>(
		endpoint: string,
		body?: unknown,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined,
			skipCache: true // PUT请求默认跳过缓存
		});
	}

	/**
	 * DELETE请求
	 */
	async delete<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: 'DELETE',
			skipCache: true // DELETE请求默认跳过缓存
		});
	}

	/**
	 * 执行实际的HTTP请求
	 */
	private async executeRequest<T>(
		url: string,
		options: RequestOptions,
		cacheKey: string
	): Promise<T> {
		const startTime = Date.now();

		try {
			const response = await this.fetchWithRetry(url, options);
			const data: T = await response.json();

			// 记录成功
			const duration = Date.now() - startTime;
			logger.debug('ServiceClient', `${options.method || 'GET'} ${url} completed in ${duration}ms`);
			
			this.circuitBreaker.recordSuccess();

			// 缓存结果
			if (!options.skipCache && response.ok) {
				const ttl = options.cacheTTL || this.getDefaultCacheTTL(url);
				await this.cacheManager.set(cacheKey, data, ttl);
			}

			return data;

		} catch (error) {
			const duration = Date.now() - startTime;
			logger.error('ServiceClient', `${options.method || 'GET'} ${url} failed after ${duration}ms:`, error);
			throw error;
		}
	}

	/**
	 * 带重试的fetch请求
	 */
	private async fetchWithRetry(url: string, options: RequestOptions): Promise<Response> {
		const requestOptions: RequestInit = {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...this.defaultHeaders,
				...options.headers
			},
			signal: AbortSignal.timeout(this.timeout)
		};

		let lastError: Error | null = null;

		for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
			try {
				const response = await fetch(url, requestOptions);

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`);
				}

				return response;

			} catch (error) {
				lastError = error as Error;
				
				if (attempt === this.retryAttempts) {
					break;
				}

				// 计算重试延迟（指数退避）
				const delay = REQUEST_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1);
				logger.warn('ServiceClient', `Attempt ${attempt} failed, retrying in ${delay}ms`);
				await this.sleep(delay);
			}
		}

		throw lastError || new Error('All retry attempts failed');
	}

	/**
	 * 构建完整URL
	 */
	private buildURL(endpoint: string): string {
		if (endpoint.startsWith('http')) {
			return endpoint;
		}
		return `${this.baseURL}${endpoint}`;
	}

	/**
	 * 生成缓存键
	 */
	private generateCacheKey(url: string, options: RequestOptions): string {
		const method = options.method || 'GET';
		const body = options.body ? JSON.stringify(options.body) : '';
		const queryParams = new URL(url).search;
		
		return `${this.serviceName}:${method}:${url}${queryParams}:${body}`;
	}

	/**
	 * 获取默认缓存TTL
	 */
	private getDefaultCacheTTL(url: string): number {
		if (url.includes('news') || url.includes('feed')) {
			return REQUEST_CONFIG.CACHE_TTL.news;
		} else if (url.includes('market') || url.includes('stock')) {
			return REQUEST_CONFIG.CACHE_TTL.market_data;
		} else if (url.includes('product')) {
			return REQUEST_CONFIG.CACHE_TTL.product_data;
		} else if (url.includes('trend')) {
			return REQUEST_CONFIG.CACHE_TTL.trend_data;
		} else {
			return REQUEST_CONFIG.CACHE_TTL.static_data;
		}
	}

	/**
	 * 延迟函数
	 */
	private sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	/**
	 * 获取服务状态
	 */
	getStatus(): {
		serviceName: string;
		circuitBreakerState: string;
		cacheStats: { hits: number; misses: number; size: number };
		activeRequests: number;
	} {
		return {
			serviceName: this.serviceName,
			circuitBreakerState: this.circuitBreaker.getState(),
			cacheStats: this.cacheManager.getStats(),
			activeRequests: this.requestDeduplicator.getActiveCount()
		};
	}

	/**
	 * 清理资源
	 */
	async cleanup(): Promise<void> {
		logger.log('ServiceClient', `Cleaning up service client for ${this.serviceName}`);
		
		await this.cacheManager.clear();
		this.requestDeduplicator.clear();
		this.circuitBreaker.reset();
	}

	/**
	 * 预热缓存
	 */
	async warmCache(endpoints: string[]): Promise<void> {
		logger.log('ServiceClient', `Warming cache for ${endpoints.length} endpoints`);
		
		const warmupPromises = endpoints.map(endpoint => 
			this.get(endpoint).catch(error => 
				logger.warn('ServiceClient', `Cache warmup failed for ${endpoint}:`, error)
			)
		);
		
		await Promise.allSettled(warmupPromises);
		logger.log('ServiceClient', 'Cache warmup completed');
	}

	/**
	 * 健康检查
	 */
	async healthCheck(): Promise<boolean> {
		try {
			// 尝试一个简单的请求来检查服务健康状态
			const testEndpoint = '/health';
			await this.get(testEndpoint, { 
				skipCache: true, 
				skipDeduplication: true,
				skipCircuitBreaker: true 
			});
			return true;
		} catch (error) {
			logger.error('ServiceClient', `Health check failed for ${this.serviceName}:`, error);
			return false;
		}
	}
}