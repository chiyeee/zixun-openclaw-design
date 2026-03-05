/**
 * 缓存管理器
 * 提供内存缓存功能，支持TTL和自动清理
 */

import { logger } from '$lib/config/api';

interface CacheItem<T> {
	value: T;
	expiry: number;
	lastAccessed: number;
}

interface CacheStats {
	hits: number;
	misses: number;
	size: number;
}

export class CacheManager {
	private cache = new Map<string, CacheItem<unknown>>();
	private serviceName: string;
	private stats: CacheStats = { hits: 0, misses: 0, size: 0 };
	private cleanupInterval: NodeJS.Timeout;
	private maxSize: number;
	private defaultTTL: number;

	constructor(
		serviceName: string,
		maxSize: number = 1000,
		defaultTTL: number = 5 * 60 * 1000, // 5分钟
		cleanupIntervalMs: number = 60 * 1000 // 1分钟
	) {
		this.serviceName = serviceName;
		this.maxSize = maxSize;
		this.defaultTTL = defaultTTL;

		// 启动自动清理
		this.cleanupInterval = setInterval(() => {
			this.cleanup();
		}, cleanupIntervalMs);

		logger.log('CacheManager', `Initialized cache for ${serviceName} (maxSize: ${maxSize}, defaultTTL: ${defaultTTL}ms)`);
	}

	/**
	 * 获取缓存值
	 */
	async get<T>(key: string): Promise<T | null> {
		const item = this.cache.get(key) as CacheItem<T> | undefined;

		if (!item) {
			this.stats.misses++;
			return null;
		}

		// 检查是否过期
		const now = Date.now();
		if (now > item.expiry) {
			this.cache.delete(key);
			this.stats.misses++;
			this.updateSize();
			return null;
		}

		// 更新最后访问时间
		item.lastAccessed = now;
		this.stats.hits++;

		logger.debug('CacheManager', `Cache hit for ${key}`);
		return item.value;
	}

	/**
	 * 设置缓存值
	 */
	async set<T>(key: string, value: T, ttl?: number): Promise<void> {
		const now = Date.now();
		const effectiveTTL = ttl || this.defaultTTL;
		const expiry = now + effectiveTTL;

		// 如果缓存已满，删除一些过期或最久未使用的条目
		if (this.cache.size >= this.maxSize) {
			await this.evictLRU();
		}

		this.cache.set(key, {
			value,
			expiry,
			lastAccessed: now
		});

		this.updateSize();
		logger.debug('CacheManager', `Cached ${key} (TTL: ${effectiveTTL}ms)`);
	}

	/**
	 * 删除缓存条目
	 */
	async delete(key: string): Promise<boolean> {
		const result = this.cache.delete(key);
		if (result) {
			this.updateSize();
			logger.debug('CacheManager', `Deleted cache entry: ${key}`);
		}
		return result;
	}

	/**
	 * 检查缓存是否存在
	 */
	async has(key: string): Promise<boolean> {
		const item = this.cache.get(key);
		if (!item) return false;

		// 检查是否过期
		if (Date.now() > item.expiry) {
			this.cache.delete(key);
			this.updateSize();
			return false;
		}

		return true;
	}

	/**
	 * 清空所有缓存
	 */
	async clear(): Promise<void> {
		this.cache.clear();
		this.updateSize();
		this.resetStats();
		logger.log('CacheManager', `Cleared all cache for ${this.serviceName}`);
	}

	/**
	 * 获取缓存统计信息
	 */
	getStats(): CacheStats {
		return { ...this.stats };
	}

	/**
	 * 获取缓存大小
	 */
	getSize(): number {
		return this.cache.size;
	}

	/**
	 * 获取缓存命中率
	 */
	getHitRate(): number {
		const total = this.stats.hits + this.stats.misses;
		return total === 0 ? 0 : this.stats.hits / total;
	}

	/**
	 * 获取所有缓存键
	 */
	getKeys(): string[] {
		return Array.from(this.cache.keys());
	}

	/**
	 * 获取过期的缓存键
	 */
	getExpiredKeys(): string[] {
		const now = Date.now();
		const expiredKeys: string[] = [];

		for (const [key, item] of this.cache.entries()) {
			if (now > item.expiry) {
				expiredKeys.push(key);
			}
		}

		return expiredKeys;
	}

	/**
	 * 手动清理过期条目
	 */
	cleanup(): number {
		const now = Date.now();
		let cleaned = 0;

		for (const [key, item] of this.cache.entries()) {
			if (now > item.expiry) {
				this.cache.delete(key);
				cleaned++;
			}
		}

		if (cleaned > 0) {
			this.updateSize();
			logger.debug('CacheManager', `Cleaned up ${cleaned} expired entries for ${this.serviceName}`);
		}

		return cleaned;
	}

	/**
	 * LRU驱逐策略
	 */
	private async evictLRU(count: number = 1): Promise<void> {
		if (this.cache.size === 0) return;

		// 先清理过期条目
		const expiredCount = this.cleanup();
		if (expiredCount >= count || this.cache.size < this.maxSize) {
			return;
		}

		// 按最后访问时间排序，删除最久未使用的条目
		const entries = Array.from(this.cache.entries());
		entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);

		const toEvict = Math.min(count, Math.floor(this.maxSize * 0.1)); // 最多驱逐10%
		for (let i = 0; i < toEvict; i++) {
			const [key] = entries[i];
			this.cache.delete(key);
		}

		this.updateSize();
		logger.debug('CacheManager', `Evicted ${toEvict} LRU entries for ${this.serviceName}`);
	}

	/**
	 * 更新缓存大小统计
	 */
	private updateSize(): void {
		this.stats.size = this.cache.size;
	}

	/**
	 * 重置统计信息
	 */
	private resetStats(): void {
		this.stats = { hits: 0, misses: 0, size: 0 };
	}

	/**
	 * 获取内存使用量估算 (粗略估算)
	 */
	getMemoryUsage(): { estimated: number; unit: string } {
		let totalSize = 0;

		for (const [key, item] of this.cache.entries()) {
			// 估算键的大小
			totalSize += key.length * 2; // UTF-16 字符

			// 估算值的大小（这是粗略估算）
			try {
				const valueStr = JSON.stringify(item.value);
				totalSize += valueStr.length * 2;
			} catch {
				totalSize += 100; // 无法序列化的对象使用固定大小
			}

			// 元数据大小
			totalSize += 16; // expiry + lastAccessed
		}

		// 转换为合适的单位
		if (totalSize < 1024) {
			return { estimated: totalSize, unit: 'bytes' };
		} else if (totalSize < 1024 * 1024) {
			return { estimated: Math.round(totalSize / 1024 * 100) / 100, unit: 'KB' };
		} else {
			return { estimated: Math.round(totalSize / (1024 * 1024) * 100) / 100, unit: 'MB' };
		}
	}

	/**
	 * 预热缓存
	 */
	async warmup(entries: Array<{ key: string; value: unknown; ttl?: number }>): Promise<void> {
		logger.log('CacheManager', `Warming up cache with ${entries.length} entries`);

		for (const entry of entries) {
			await this.set(entry.key, entry.value, entry.ttl);
		}

		logger.log('CacheManager', `Cache warmup completed for ${this.serviceName}`);
	}

	/**
	 * 导出缓存数据
	 */
	export(): Array<{ key: string; value: unknown; expiry: number; lastAccessed: number }> {
		const now = Date.now();
		const exported: Array<{ key: string; value: unknown; expiry: number; lastAccessed: number }> = [];

		for (const [key, item] of this.cache.entries()) {
			// 只导出未过期的条目
			if (now <= item.expiry) {
				exported.push({
					key,
					value: item.value,
					expiry: item.expiry,
					lastAccessed: item.lastAccessed
				});
			}
		}

		return exported;
	}

	/**
	 * 导入缓存数据
	 */
	async import(data: Array<{ key: string; value: unknown; expiry: number; lastAccessed: number }>): Promise<void> {
		const now = Date.now();
		let imported = 0;

		for (const item of data) {
			// 只导入未过期的条目
			if (now <= item.expiry) {
				this.cache.set(item.key, {
					value: item.value,
					expiry: item.expiry,
					lastAccessed: item.lastAccessed
				});
				imported++;
			}
		}

		this.updateSize();
		logger.log('CacheManager', `Imported ${imported} cache entries for ${this.serviceName}`);
	}

	/**
	 * 销毁缓存管理器
	 */
	destroy(): void {
		if (this.cleanupInterval) {
			clearInterval(this.cleanupInterval);
		}
		this.cache.clear();
		this.updateSize();
		logger.log('CacheManager', `Destroyed cache manager for ${this.serviceName}`);
	}
}