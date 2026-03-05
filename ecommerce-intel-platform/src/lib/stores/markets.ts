/**
 * 市场数据存储
 * 管理电商股票、ETF和平台指标数据
 */

import { writable, derived, get } from 'svelte/store';
import { fetchMarketData, fetchPlatformMetrics } from '$lib/api/markets';
import type { StockData, MarketSummary, PlatformMetrics } from '$lib/types';
import { logger } from '$lib/config/api';

// 基础状态
export const stockData = writable<StockData[]>([]);
export const marketSummary = writable<MarketSummary | null>(null);
export const platformMetrics = writable<PlatformMetrics[]>([]);
export const isLoading = writable(false);
export const error = writable<string | null>(null);
export const lastUpdated = writable<Date | null>(null);

// 选择状态
export const selectedSymbols = writable<string[]>(['AMZN', 'SHOP', 'EBAY']);
export const selectedTimeframe = writable<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
export const showExtendedHours = writable(false);

// 缓存设置
const MARKET_CACHE_DURATION = 2 * 60 * 1000; // 2分钟
let lastFetchTime = 0;

// 派生状态：按类别分组的股票
export const stocksByCategory = derived(stockData, (stocks) => {
	const categories = {
		ecommerce: [] as StockData[],
		payment: [] as StockData[],
		logistics: [] as StockData[],
		saas: [] as StockData[]
	};

	stocks.forEach(stock => {
		const symbol = stock.symbol;
		
		// 根据股票代码分类
		if (['AMZN', 'EBAY', 'ETSY', 'JD', 'PDD', 'BABA', 'MELI', 'SE'].includes(symbol)) {
			categories.ecommerce.push(stock);
		} else if (['SHOP', 'SQ', 'PYPL', 'ADYEN'].includes(symbol)) {
			categories.payment.push(stock);
		} else if (['UPS', 'FDX', 'STMP'].includes(symbol)) {
			categories.logistics.push(stock);
		} else if (['BIGC', 'WIX', 'GDDY'].includes(symbol)) {
			categories.saas.push(stock);
		}
	});

	return categories;
});

// 派生状态：选中的股票数据
export const selectedStockData = derived(
	[stockData, selectedSymbols],
	([stocks, symbols]) => {
		return stocks.filter(stock => symbols.includes(stock.symbol));
	}
);

// 派生状态：市场统计
export const marketStats = derived(stockData, (stocks) => {
	if (stocks.length === 0) {
		return {
			totalValue: 0,
			gainers: 0,
			losers: 0,
			avgChange: 0,
			topGainer: null as StockData | null,
			topLoser: null as StockData | null
		};
	}

	const gainers = stocks.filter(s => s.change_percent > 0);
	const losers = stocks.filter(s => s.change_percent < 0);
	const avgChange = stocks.reduce((sum, s) => sum + s.change_percent, 0) / stocks.length;
	
	const topGainer = stocks.reduce((top, current) => 
		current.change_percent > (top?.change_percent || -Infinity) ? current : top
	);
	
	const topLoser = stocks.reduce((bottom, current) => 
		current.change_percent < (bottom?.change_percent || Infinity) ? current : bottom
	);

	return {
		totalValue: stocks.reduce((sum, s) => sum + s.market_cap, 0),
		gainers: gainers.length,
		losers: losers.length,
		avgChange,
		topGainer,
		topLoser
	};
});

// 派生状态：热门平台指标
export const topPlatformMetrics = derived(
	platformMetrics,
	(metrics) => {
		return metrics
			.sort((a, b) => b.growth_rate - a.growth_rate)
			.slice(0, 10);
	}
);

// 派生状态：市场情绪
export const marketSentiment = derived(
	[stockData, marketStats],
	([stocks, stats]) => {
		if (stocks.length === 0) return 'neutral';
		
		const bullishRatio = stats.gainers / stocks.length;
		
		if (bullishRatio >= 0.7) return 'bullish';
		if (bullishRatio <= 0.3) return 'bearish';
		return 'neutral';
	}
);

/**
 * 获取市场数据
 */
export async function loadMarketData(symbols?: string[], forceRefresh = false): Promise<void> {
	const now = Date.now();
	
	// 检查是否需要刷新缓存
	if (!forceRefresh && (now - lastFetchTime) < MARKET_CACHE_DURATION && get(stockData).length > 0) {
		logger.log('Markets Store', 'Using cached market data');
		return;
	}

	isLoading.set(true);
	error.set(null);

	try {
		const symbolsToFetch = symbols || get(selectedSymbols);
		logger.log('Markets Store', `Loading market data for: ${symbolsToFetch.join(', ')}`);
		
		const data = await fetchMarketData(symbolsToFetch);
		
		stockData.set(data);
		lastUpdated.set(new Date());
		lastFetchTime = now;
		
		logger.log('Markets Store', `Loaded ${data.length} stock records`);
		
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Failed to load market data';
		logger.error('Markets Store', 'Error loading market data:', err);
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}

/**
 * 获取平台指标
 */
export async function loadPlatformMetrics(platforms?: string[]): Promise<void> {
	try {
		logger.log('Markets Store', 'Loading platform metrics');
		
		const metrics = await fetchPlatformMetrics(platforms);
		
		platformMetrics.set(metrics);
		
		logger.log('Markets Store', `Loaded ${metrics.length} platform metrics`);
		
	} catch (err) {
		logger.error('Markets Store', 'Error loading platform metrics:', err);
		// 不设置全局错误，因为这是次要数据
	}
}

/**
 * 添加股票到监控列表
 */
export function addSymbol(symbol: string): void {
	selectedSymbols.update(symbols => {
		if (!symbols.includes(symbol.toUpperCase())) {
			return [...symbols, symbol.toUpperCase()];
		}
		return symbols;
	});
}

/**
 * 从监控列表移除股票
 */
export function removeSymbol(symbol: string): void {
	selectedSymbols.update(symbols => 
		symbols.filter(s => s !== symbol.toUpperCase())
	);
}

/**
 * 设置时间框架
 */
export function setTimeframe(timeframe: '1D' | '1W' | '1M' | '3M' | '1Y'): void {
	selectedTimeframe.set(timeframe);
	// 触发数据重新获取
	loadMarketData(get(selectedSymbols), true);
}

/**
 * 切换盘前盘后交易显示
 */
export function toggleExtendedHours(): void {
	showExtendedHours.update(show => !show);
}

/**
 * 获取特定股票的详细信息
 */
export function getStockDetails(symbol: string): StockData | undefined {
	return get(stockData).find(stock => stock.symbol === symbol);
}

/**
 * 自动刷新设置
 */
let refreshInterval: NodeJS.Timeout | null = null;

export function startAutoRefresh(intervalMinutes = 5): void {
	stopAutoRefresh(); // 清除现有的定时器
	
	refreshInterval = setInterval(() => {
		logger.log('Markets Store', 'Auto-refreshing market data');
		loadMarketData(get(selectedSymbols));
		loadPlatformMetrics();
	}, intervalMinutes * 60 * 1000);
	
	logger.log('Markets Store', `Started auto-refresh every ${intervalMinutes} minutes`);
}

export function stopAutoRefresh(): void {
	if (refreshInterval) {
		clearInterval(refreshInterval);
		refreshInterval = null;
		logger.log('Markets Store', 'Stopped auto-refresh');
	}
}

/**
 * 检查市场是否开放
 */
export function isMarketOpen(): boolean {
	const now = new Date();
	const day = now.getDay(); // 0 = Sunday, 6 = Saturday
	const hour = now.getHours();
	
	// 简单的美国市场时间检查 (周一到周五, 9:30-16:00 EST)
	if (day === 0 || day === 6) return false; // 周末
	if (hour < 9 || hour >= 16) return false; // 休市时间
	
	return true;
}

/**
 * 获取市场状态文本
 */
export const marketStatus = derived(
	lastUpdated,
	() => {
		if (isMarketOpen()) {
			return 'Market Open';
		}
		
		const now = new Date();
		const day = now.getDay();
		const hour = now.getHours();
		
		if (day === 0 || day === 6) {
			return 'Weekend';
		} else if (hour < 9) {
			return 'Pre-Market';
		} else {
			return 'After Hours';
		}
	}
);

/**
 * 清理资源
 */
export function cleanup(): void {
	stopAutoRefresh();
	stockData.set([]);
	platformMetrics.set([]);
	marketSummary.set(null);
	error.set(null);
	lastUpdated.set(null);
}