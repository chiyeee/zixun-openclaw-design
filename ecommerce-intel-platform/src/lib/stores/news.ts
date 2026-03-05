/**
 * 新闻数据存储
 * 管理电商新闻的状态、过滤和搜索
 */

import { writable, derived, get } from 'svelte/store';
import { fetchEcommerceNews, fetchPlatformNews, fetchTrendingNews } from '$lib/api/news';
import type { EcommerceNewsItem, NewsCategory } from '$lib/types';
import { logger } from '$lib/config/api';

// 基础状态
export const newsItems = writable<EcommerceNewsItem[]>([]);
export const isLoading = writable(false);
export const error = writable<string | null>(null);
export const lastUpdated = writable<Date | null>(null);

// 过滤器状态
export const selectedCategory = writable<NewsCategory | 'all'>('all');
export const selectedPlatform = writable<string | 'all'>('all');
export const selectedUrgency = writable<'critical' | 'high' | 'medium' | 'low' | 'all'>('all');
export const selectedSentiment = writable<'positive' | 'negative' | 'neutral' | 'all'>('all');
export const searchQuery = writable<string>('');
export const showOnlyAlertsMode = writable(false);

// 分页状态
export const currentPage = writable(1);
export const itemsPerPage = writable(20);

// 缓存设置
const NEWS_CACHE_DURATION = 5 * 60 * 1000; // 5分钟
let lastFetchTime = 0;

// 派生状态：过滤后的新闻
export const filteredNews = derived(
	[newsItems, selectedCategory, selectedPlatform, selectedUrgency, selectedSentiment, searchQuery, showOnlyAlertsMode],
	([items, category, platform, urgency, sentiment, query, alertsOnly]) => {
		let filtered = items;

		// 只显示预警模式
		if (alertsOnly) {
			filtered = filtered.filter(item => 
				item.urgency === 'critical' || item.urgency === 'high'
			);
		}

		// 按类别过滤
		if (category !== 'all') {
			filtered = filtered.filter(item => item.category === category);
		}

		// 按平台过滤
		if (platform !== 'all') {
			filtered = filtered.filter(item => 
				item.platforms.includes(platform)
			);
		}

		// 按紧急程度过滤
		if (urgency !== 'all') {
			filtered = filtered.filter(item => item.urgency === urgency);
		}

		// 按情感过滤
		if (sentiment !== 'all') {
			filtered = filtered.filter(item => item.sentiment === sentiment);
		}

		// 按搜索查询过滤
		if (query.trim()) {
			const queryLower = query.toLowerCase();
			filtered = filtered.filter(item => 
				item.title.toLowerCase().includes(queryLower) ||
				item.description.toLowerCase().includes(queryLower) ||
				item.keywords.some(keyword => 
					keyword.toLowerCase().includes(queryLower)
				)
			);
		}

		return filtered;
	}
);

// 派生状态：分页新闻
export const paginatedNews = derived(
	[filteredNews, currentPage, itemsPerPage],
	([filtered, page, perPage]) => {
		const start = (page - 1) * perPage;
		const end = start + perPage;
		return filtered.slice(start, end);
	}
);

// 派生状态：分页信息
export const paginationInfo = derived(
	[filteredNews, currentPage, itemsPerPage],
	([filtered, page, perPage]) => {
		const totalItems = filtered.length;
		const totalPages = Math.ceil(totalItems / perPage);
		const start = (page - 1) * perPage + 1;
		const end = Math.min(page * perPage, totalItems);

		return {
			totalItems,
			totalPages,
			currentPage: page,
			itemsPerPage: perPage,
			start,
			end,
			hasNext: page < totalPages,
			hasPrev: page > 1
		};
	}
);

// 派生状态：统计信息
export const newsStats = derived(
	newsItems,
	(items) => {
		const stats = {
			total: items.length,
			byCategory: {} as Record<string, number>,
			byPlatform: {} as Record<string, number>,
			byUrgency: {} as Record<string, number>,
			bySentiment: {} as Record<string, number>,
			avgScore: 0
		};

		if (items.length === 0) return stats;

		// 计算各维度统计
		items.forEach(item => {
			// 按类别统计
			stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1;

			// 按平台统计
			item.platforms.forEach(platform => {
				stats.byPlatform[platform] = (stats.byPlatform[platform] || 0) + 1;
			});

			// 按紧急程度统计
			stats.byUrgency[item.urgency] = (stats.byUrgency[item.urgency] || 0) + 1;

			// 按情感统计
			stats.bySentiment[item.sentiment] = (stats.bySentiment[item.sentiment] || 0) + 1;
		});

		// 计算平均分析评分
		stats.avgScore = items.reduce((sum, item) => sum + item.analysis_score, 0) / items.length;

		return stats;
	}
);

// 派生状态：热门平台
export const topPlatforms = derived(
	newsStats,
	(stats) => {
		return Object.entries(stats.byPlatform)
			.sort(([,a], [,b]) => b - a)
			.slice(0, 10)
			.map(([platform, count]) => ({ platform, count }));
	}
);

// 派生状态：最新高优先级新闻
export const criticalNews = derived(
	newsItems,
	(items) => {
		return items
			.filter(item => item.urgency === 'critical' || item.urgency === 'high')
			.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
			.slice(0, 5);
	}
);

/**
 * 获取电商新闻
 */
export async function loadNews(category?: NewsCategory, forceRefresh = false): Promise<void> {
	const now = Date.now();
	
	// 检查是否需要刷新缓存
	if (!forceRefresh && (now - lastFetchTime) < NEWS_CACHE_DURATION && get(newsItems).length > 0) {
		logger.log('News Store', 'Using cached news data');
		return;
	}

	isLoading.set(true);
	error.set(null);

	try {
		logger.log('News Store', `Loading news${category ? ` for category: ${category}` : ''}`);
		
		const news = await fetchEcommerceNews(category);
		
		newsItems.set(news);
		lastUpdated.set(new Date());
		lastFetchTime = now;
		
		logger.log('News Store', `Loaded ${news.length} news items`);
		
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Failed to load news';
		logger.error('News Store', 'Error loading news:', err);
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}

/**
 * 获取特定平台的新闻
 */
export async function loadPlatformNews(platform: string): Promise<void> {
	isLoading.set(true);
	error.set(null);

	try {
		logger.log('News Store', `Loading news for platform: ${platform}`);
		
		const news = await fetchPlatformNews(platform);
		
		newsItems.set(news);
		lastUpdated.set(new Date());
		
		logger.log('News Store', `Loaded ${news.length} platform news items`);
		
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Failed to load platform news';
		logger.error('News Store', 'Error loading platform news:', err);
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}

/**
 * 获取趋势新闻
 */
export async function loadTrendingNews(limit = 20): Promise<void> {
	isLoading.set(true);
	error.set(null);

	try {
		logger.log('News Store', 'Loading trending news');
		
		const news = await fetchTrendingNews(limit);
		
		newsItems.set(news);
		lastUpdated.set(new Date());
		
		logger.log('News Store', `Loaded ${news.length} trending news items`);
		
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Failed to load trending news';
		logger.error('News Store', 'Error loading trending news:', err);
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}

/**
 * 重置过滤器
 */
export function resetFilters(): void {
	selectedCategory.set('all');
	selectedPlatform.set('all');
	selectedUrgency.set('all');
	selectedSentiment.set('all');
	searchQuery.set('');
	showOnlyAlertsMode.set(false);
	currentPage.set(1);
}

/**
 * 设置搜索查询
 */
export function setSearchQuery(query: string): void {
	searchQuery.set(query);
	currentPage.set(1); // 重置到第一页
}

/**
 * 设置过滤器
 */
export function setFilter(
	filterType: 'category' | 'platform' | 'urgency' | 'sentiment',
	value: string
): void {
	switch (filterType) {
		case 'category':
			selectedCategory.set(value as NewsCategory | 'all');
			break;
		case 'platform':
			selectedPlatform.set(value);
			break;
		case 'urgency':
			selectedUrgency.set(value as 'critical' | 'high' | 'medium' | 'low' | 'all');
			break;
		case 'sentiment':
			selectedSentiment.set(value as 'positive' | 'negative' | 'neutral' | 'all');
			break;
	}
	currentPage.set(1); // 重置到第一页
}

/**
 * 切换预警模式
 */
export function toggleAlertsMode(): void {
	showOnlyAlertsMode.update(mode => !mode);
	currentPage.set(1);
}

/**
 * 分页导航
 */
export function goToPage(page: number): void {
	const info = get(paginationInfo);
	if (page >= 1 && page <= info.totalPages) {
		currentPage.set(page);
	}
}

export function nextPage(): void {
	const info = get(paginationInfo);
	if (info.hasNext) {
		currentPage.update(page => page + 1);
	}
}

export function prevPage(): void {
	const info = get(paginationInfo);
	if (info.hasPrev) {
		currentPage.update(page => page - 1);
	}
}

/**
 * 自动刷新设置
 */
let refreshInterval: NodeJS.Timeout | null = null;

export function startAutoRefresh(intervalMinutes = 15): void {
	stopAutoRefresh(); // 清除现有的定时器
	
	refreshInterval = setInterval(() => {
		logger.log('News Store', 'Auto-refreshing news');
		loadNews(get(selectedCategory) === 'all' ? undefined : get(selectedCategory));
	}, intervalMinutes * 60 * 1000);
	
	logger.log('News Store', `Started auto-refresh every ${intervalMinutes} minutes`);
}

export function stopAutoRefresh(): void {
	if (refreshInterval) {
		clearInterval(refreshInterval);
		refreshInterval = null;
		logger.log('News Store', 'Stopped auto-refresh');
	}
}

/**
 * 清理资源
 */
export function cleanup(): void {
	stopAutoRefresh();
	newsItems.set([]);
	error.set(null);
	lastUpdated.set(null);
	resetFilters();
}