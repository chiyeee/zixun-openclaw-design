/**
 * 电商市场数据 API
 * 获取电商相关股票、平台指标和行业数据
 */

import { ECOMMERCE_STOCKS, ECOMMERCE_ETFS, ECOMMERCE_PLATFORMS, PRODUCT_CATEGORIES, ECOMMERCE_METRICS } from '$lib/config/markets';
import type { EcommerceMarketItem, CategoryPerformance, PlatformMetric, ProductInsight } from '$lib/types';
import { fetchDirect, logger, ECOMMERCE_API_KEYS, API_BASE_URLS, rateLimiter } from '$lib/config/api';

interface FinnhubQuote {
	c: number; // Current price
	d: number; // Change
	dp: number; // Percent change
	h: number; // High price of the day
	l: number; // Low price of the day
	o: number; // Open price of the day
	pc: number; // Previous close price
	t: number; // Timestamp
}

interface AlphaVantageResponse {
	'Global Quote': {
		'01. symbol': string;
		'02. open': string;
		'03. high': string;
		'04. low': string;
		'05. price': string;
		'06. volume': string;
		'07. latest trading day': string;
		'08. previous close': string;
		'09. change': string;
		'10. change percent': string;
	};
}

/**
 * 获取电商股票数据
 */
export async function fetchEcommerceStocks(): Promise<EcommerceMarketItem[]> {
	const marketItems: EcommerceMarketItem[] = [];
	
	try {
		logger.log('Ecommerce Markets API', 'Fetching ecommerce stocks');
		
		// 检查API密钥可用性
		const hasFinnhub = Boolean(ECOMMERCE_API_KEYS.FINNHUB_API_KEY);
		const hasAlphaVantage = Boolean(ECOMMERCE_API_KEYS.ALPHA_VANTAGE_API_KEY);
		
		if (!hasFinnhub && !hasAlphaVantage) {
			logger.warn('Markets API', 'No market data API keys configured');
			return createEmptyMarketItems();
		}
		
		// 分批处理以避免API限制
		const batchSize = hasFinnhub ? 5 : 2; // Finnhub限制更宽松
		const stockBatches = [];
		
		for (let i = 0; i < ECOMMERCE_STOCKS.length; i += batchSize) {
			stockBatches.push(ECOMMERCE_STOCKS.slice(i, i + batchSize));
		}
		
		for (const batch of stockBatches) {
			const batchPromises = batch.map(async (stock) => {
				try {
					if (hasFinnhub && rateLimiter.canMakeRequest('finnhub')) {
						return await fetchFinnhubQuote(stock);
					} else if (hasAlphaVantage && rateLimiter.canMakeRequest('alpha_vantage')) {
						return await fetchAlphaVantageQuote(stock);
					} else {
						return createEmptyMarketItem(stock);
					}
				} catch (error) {
					logger.error('Markets API', `Error fetching ${stock.symbol}:`, error);
					return createEmptyMarketItem(stock);
				}
			});
			
			const batchResults = await Promise.all(batchPromises);
			marketItems.push(...batchResults);
			
			// 批次间延迟以避免速率限制
			if (stockBatches.indexOf(batch) < stockBatches.length - 1) {
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
		
		// 获取ETF数据
		const etfData = await fetchEcommerceETFs();
		marketItems.push(...etfData);
		
		logger.log('Markets API', `Successfully fetched ${marketItems.length} market items`);
		return marketItems.filter(item => !isNaN(item.price));
		
	} catch (error) {
		logger.error('Markets API', 'Error fetching ecommerce stocks:', error);
		return createEmptyMarketItems();
	}
}

/**
 * 使用Finnhub API获取股票数据
 */
async function fetchFinnhubQuote(stock: typeof ECOMMERCE_STOCKS[0]): Promise<EcommerceMarketItem> {
	try {
		const url = `${API_BASE_URLS.FINNHUB_API}/quote?symbol=${stock.symbol}&token=${ECOMMERCE_API_KEYS.FINNHUB_API_KEY}`;
		const response = await fetchDirect(url);
		
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		
		const data: FinnhubQuote = await response.json();
		
		// Finnhub返回全零表示找不到数据
		if (data.c === 0 && data.pc === 0) {
			throw new Error(`No data available for ${stock.symbol}`);
		}
		
		return {
			symbol: stock.symbol,
			name: stock.name,
			platform: stock.platform,
			type: 'ecommerce_stock',
			price: data.c,
			change: data.d,
			change_percent: data.dp,
			volume: 0, // Finnhub免费版不提供volume
			last_updated: new Date().toISOString()
		};
		
	} catch (error) {
		logger.error('Finnhub API', `Error fetching ${stock.symbol}:`, error);
		return createEmptyMarketItem(stock);
	}
}

/**
 * 使用Alpha Vantage API获取股票数据
 */
async function fetchAlphaVantageQuote(stock: typeof ECOMMERCE_STOCKS[0]): Promise<EcommerceMarketItem> {
	try {
		const url = `${API_BASE_URLS.ALPHA_VANTAGE}?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${ECOMMERCE_API_KEYS.ALPHA_VANTAGE_API_KEY}`;
		const response = await fetchDirect(url);
		
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		
		const data: AlphaVantageResponse = await response.json();
		const quote = data['Global Quote'];
		
		if (!quote) {
			throw new Error(`No data available for ${stock.symbol}`);
		}
		
		const price = parseFloat(quote['05. price']);
		const change = parseFloat(quote['09. change']);
		const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
		
		return {
			symbol: stock.symbol,
			name: stock.name,
			platform: stock.platform,
			type: 'ecommerce_stock',
			price: price,
			change: change,
			change_percent: changePercent,
			volume: parseInt(quote['06. volume']),
			last_updated: new Date().toISOString()
		};
		
	} catch (error) {
		logger.error('Alpha Vantage API', `Error fetching ${stock.symbol}:`, error);
		return createEmptyMarketItem(stock);
	}
}

/**
 * 获取电商ETF数据
 */
async function fetchEcommerceETFs(): Promise<EcommerceMarketItem[]> {
	const etfItems: EcommerceMarketItem[] = [];
	
	try {
		logger.log('ETF API', 'Fetching ecommerce ETFs');
		
		// ETF数据获取逻辑与股票相同
		for (const etf of ECOMMERCE_ETFS) {
			try {
				if (ECOMMERCE_API_KEYS.FINNHUB_API_KEY && rateLimiter.canMakeRequest('finnhub')) {
					const url = `${API_BASE_URLS.FINNHUB_API}/quote?symbol=${etf.symbol}&token=${ECOMMERCE_API_KEYS.FINNHUB_API_KEY}`;
					const response = await fetchDirect(url);
					const data: FinnhubQuote = await response.json();
					
					if (data.c > 0) {
						etfItems.push({
							symbol: etf.symbol,
							name: etf.name,
							platform: etf.platform,
							type: 'platform_metric',
							price: data.c,
							change: data.d,
							change_percent: data.dp,
							last_updated: new Date().toISOString()
						});
					}
				}
				
				// 添加小延迟
				await new Promise(resolve => setTimeout(resolve, 200));
				
			} catch (error) {
				logger.error('ETF API', `Error fetching ETF ${etf.symbol}:`, error);
			}
		}
		
		logger.log('ETF API', `Fetched ${etfItems.length} ETF items`);
		return etfItems;
		
	} catch (error) {
		logger.error('ETF API', 'Error fetching ETFs:', error);
		return [];
	}
}

/**
 * 获取产品类别表现数据
 */
export async function fetchCategoryPerformance(): Promise<CategoryPerformance[]> {
	try {
		logger.log('Category Performance API', 'Generating category performance data');
		
		// 模拟产品类别表现数据（在实际应用中会从真实API获取）
		const categoryPerformances: CategoryPerformance[] = PRODUCT_CATEGORIES.map(category => {
			const baseGrowth = Math.random() * 40 - 10; // -10% to 30% growth
			const marketSize = Math.random() * 10000 + 1000; // 1B to 11B USD
			const competitionLevel = getCompetitionLevel(category.id);
			const avgMargin = getAvgMargin(category.id);
			
			return {
				category_id: category.id,
				category_name: category.name,
				amazon_node: category.amazon_node,
				growth_rate: Math.round(baseGrowth * 100) / 100,
				market_size: Math.round(marketSize),
				competition_level: competitionLevel,
				avg_profit_margin: avgMargin,
				seasonal_factor: getSeasonalFactor(category.id),
				trend_direction: baseGrowth > 5 ? 'up' : baseGrowth < -5 ? 'down' : 'stable',
				top_products: generateTopProducts(category.id, 5)
			};
		});
		
		// 按增长率排序
		categoryPerformances.sort((a, b) => b.growth_rate - a.growth_rate);
		
		logger.log('Category Performance API', `Generated performance data for ${categoryPerformances.length} categories`);
		return categoryPerformances;
		
	} catch (error) {
		logger.error('Category Performance API', 'Error generating category performance:', error);
		return [];
	}
}

/**
 * 获取平台指标数据
 */
export async function fetchPlatformMetrics(): Promise<PlatformMetric[]> {
	try {
		logger.log('Platform Metrics API', 'Generating platform metrics');
		
		const metrics: PlatformMetric[] = [];
		
		// 为每个电商平台生成指标
		for (const platform of ECOMMERCE_PLATFORMS) {
			const platformMetrics = ECOMMERCE_METRICS.map(metric => ({
				platform_id: platform.id,
				platform_name: platform.name,
				metric_name: metric.name,
				metric_value: generateMetricValue(metric.id, platform.id),
				metric_unit: metric.unit,
				change_1d: (Math.random() - 0.5) * 10, // -5% to +5%
				change_7d: (Math.random() - 0.5) * 20, // -10% to +10%
				change_30d: (Math.random() - 0.5) * 40, // -20% to +20%
				benchmark: generateBenchmark(metric.id),
				status: getMetricStatus(metric.id),
				description: metric.description,
				last_updated: new Date().toISOString()
			}));
			
			metrics.push(...platformMetrics);
		}
		
		logger.log('Platform Metrics API', `Generated ${metrics.length} platform metrics`);
		return metrics;
		
	} catch (error) {
		logger.error('Platform Metrics API', 'Error generating platform metrics:', error);
		return [];
	}
}

/**
 * 获取所有市场数据
 */
export async function fetchAllEcommerceMarkets(): Promise<{
	stocks: EcommerceMarketItem[];
	categories: CategoryPerformance[];
	metrics: PlatformMetric[];
}> {
	try {
		logger.log('All Markets API', 'Fetching all ecommerce market data');
		
		const [stocks, categories, metrics] = await Promise.all([
			fetchEcommerceStocks(),
			fetchCategoryPerformance(),
			fetchPlatformMetrics()
		]);
		
		logger.log('All Markets API', `Fetched stocks: ${stocks.length}, categories: ${categories.length}, metrics: ${metrics.length}`);
		
		return { stocks, categories, metrics };
		
	} catch (error) {
		logger.error('All Markets API', 'Error fetching all market data:', error);
		return { stocks: [], categories: [], metrics: [] };
	}
}

// 辅助函数

function createEmptyMarketItem(stock: typeof ECOMMERCE_STOCKS[0]): EcommerceMarketItem {
	return {
		symbol: stock.symbol,
		name: stock.name,
		platform: stock.platform,
		type: 'ecommerce_stock',
		price: NaN,
		change: NaN,
		change_percent: NaN,
		last_updated: new Date().toISOString()
	};
}

function createEmptyMarketItems(): EcommerceMarketItem[] {
	return ECOMMERCE_STOCKS.map(createEmptyMarketItem);
}

function getCompetitionLevel(categoryId: string): 'low' | 'medium' | 'high' | 'very_high' {
	const competitionMap: Record<string, 'low' | 'medium' | 'high' | 'very_high'> = {
		electronics: 'very_high',
		fashion: 'high',
		health_beauty: 'high',
		home_garden: 'medium',
		sports_fitness: 'medium',
		toys_kids: 'medium',
		pet_supplies: 'low',
		automotive: 'medium',
		books_media: 'high',
		office_supplies: 'medium'
	};
	return competitionMap[categoryId] || 'medium';
}

function getAvgMargin(categoryId: string): number {
	const marginMap: Record<string, number> = {
		electronics: 15,
		fashion: 45,
		health_beauty: 60,
		home_garden: 35,
		sports_fitness: 40,
		toys_kids: 50,
		pet_supplies: 30,
		automotive: 25,
		books_media: 10,
		office_supplies: 20
	};
	return marginMap[categoryId] || 30;
}

function getSeasonalFactor(categoryId: string): number {
	const seasonalMap: Record<string, number> = {
		electronics: 0.3,  // 假期季节性
		fashion: 0.6,      // 强季节性
		health_beauty: 0.1, // 弱季节性
		home_garden: 0.8,  // 极强季节性
		sports_fitness: 0.4, // 中等季节性
		toys_kids: 0.9,    // 假期驱动
		pet_supplies: -0.1, // 反季节性
		automotive: 0.2,   // 弱季节性
		books_media: 0.3,  // 假期季节性
		office_supplies: 0.2 // 开学季节性
	};
	return seasonalMap[categoryId] || 0;
}

function generateTopProducts(categoryId: string, count: number): ProductInsight[] {
	const products: ProductInsight[] = [];
	
	for (let i = 0; i < count; i++) {
		products.push({
			asin: `B${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
			name: `${categoryId} Product ${i + 1}`,
			category: categoryId,
			price: Math.random() * 200 + 10,
			price_change_30d: (Math.random() - 0.5) * 40,
			sales_rank: Math.floor(Math.random() * 100000) + 1,
			review_count: Math.floor(Math.random() * 10000) + 100,
			avg_rating: Math.random() * 2 + 3, // 3-5 stars
			availability: Math.random() > 0.1 ? 'in_stock' : 'out_of_stock',
			competitor_count: Math.floor(Math.random() * 50) + 5,
			profit_opportunity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
			trend_status: Math.random() > 0.6 ? 'rising' : Math.random() > 0.3 ? 'stable' : 'falling',
			last_updated: new Date().toISOString()
		});
	}
	
	return products;
}

function generateMetricValue(metricId: string, platformId: string): number {
	const baseValues: Record<string, number> = {
		global_ecommerce_growth: 15,
		mobile_commerce_share: 65,
		average_order_value: 85,
		cart_abandonment_rate: 70,
		return_rate: 8,
		customer_acquisition_cost: 45,
		social_commerce_growth: 25,
		cross_border_share: 12
	};
	
	const baseValue = baseValues[metricId] || 50;
	const variance = (Math.random() - 0.5) * 20; // ±10% variance
	return Math.round((baseValue + variance) * 100) / 100;
}

function generateBenchmark(metricId: string): number {
	const benchmarks: Record<string, number> = {
		global_ecommerce_growth: 12,
		mobile_commerce_share: 60,
		average_order_value: 80,
		cart_abandonment_rate: 75,
		return_rate: 10,
		customer_acquisition_cost: 50,
		social_commerce_growth: 20,
		cross_border_share: 10
	};
	
	return benchmarks[metricId] || 50;
}

function getMetricStatus(metricId: string): 'normal' | 'warning' | 'critical' {
	const random = Math.random();
	if (random > 0.8) return 'critical';
	if (random > 0.6) return 'warning';
	return 'normal';
}

/**
 * 获取市场数据 - 主要导出函数
 */
export async function fetchMarketData(symbols?: string[]) {
	const targetSymbols = symbols || ['AMZN', 'SHOP', 'EBAY', 'ETSY', 'JD', 'PDD', 'BABA', 'MELI', 'SE', 'BIGC'];
	
	const marketData = targetSymbols.map(symbol => ({
		symbol,
		exchange: 'NASDAQ',
		current_price: Math.random() * 300 + 50,
		open_price: Math.random() * 300 + 50,
		high_price: Math.random() * 320 + 60,
		low_price: Math.random() * 280 + 40,
		change_percent: (Math.random() - 0.5) * 10,
		volume: Math.floor(Math.random() * 10000000) + 1000000,
		market_cap: Math.floor(Math.random() * 1000000000000) + 10000000000,
		year_high: Math.random() * 400 + 100,
		year_low: Math.random() * 200 + 20,
		last_updated: new Date().toISOString()
	}));
	
	return marketData;
}

