/**
 * 电商 API 配置
 * 基于 situation-monitor 的 API 架构，专门为电商数据源设计
 */

// 环境变量配置 (类似原项目)
export const ECOMMERCE_API_KEYS = {
	// 电商专用 API Keys
	AMAZON_PAAPI_KEY: import.meta.env.VITE_AMAZON_PAAPI_KEY || '',
	AMAZON_PAAPI_SECRET: import.meta.env.VITE_AMAZON_PAAPI_SECRET || '',
	AMAZON_ASSOCIATE_TAG: import.meta.env.VITE_AMAZON_ASSOCIATE_TAG || '',
	
	KEEPA_API_KEY: import.meta.env.VITE_KEEPA_API_KEY || '',
	JUNGLE_SCOUT_API_KEY: import.meta.env.VITE_JUNGLE_SCOUT_API_KEY || '',
	HELIUM10_API_KEY: import.meta.env.VITE_HELIUM10_API_KEY || '',
	
	// 平台 API Keys
	SHOPIFY_ACCESS_TOKEN: import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN || '',
	EBAY_APP_ID: import.meta.env.VITE_EBAY_APP_ID || '',
	ETSY_API_KEY: import.meta.env.VITE_ETSY_API_KEY || '',
	
	// 数据分析 API Keys
	GOOGLE_TRENDS_API_KEY: import.meta.env.VITE_GOOGLE_TRENDS_API_KEY || '',
	SEMRUSH_API_KEY: import.meta.env.VITE_SEMRUSH_API_KEY || '',
	
	// 股票数据 (复用原项目)
	FINNHUB_API_KEY: import.meta.env.VITE_FINNHUB_API_KEY || '',
	ALPHA_VANTAGE_API_KEY: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || ''
};

// API 基础 URL 配置
export const API_BASE_URLS = {
	// Amazon APIs
	AMAZON_PAAPI: 'https://webservices.amazon.com/paapi5/searchitems',
	AMAZON_BESTSELLERS: 'https://www.amazon.com/gp/rss/bestsellers',
	
	// 第三方电商数据
	KEEPA_API: 'https://api.keepa.com',
	JUNGLE_SCOUT_API: 'https://developer-api.junglescout.com/v1',
	HELIUM10_API: 'https://api.helium10.com/v2',
	
	// 平台官方 APIs
	SHOPIFY_ADMIN_API: 'https://api.shopify.com/admin/api/2023-10',
	EBAY_FINDING_API: 'https://svcs.ebay.com/services/search/FindingService/v1',
	ETSY_OPENAPI: 'https://openapi.etsy.com/v3',
	BIGCOMMERCE_API: 'https://api.bigcommerce.com/stores',
	
	// 趋势和分析
	GOOGLE_TRENDS: 'https://trends.google.com/trends/api/explore',
	SEMRUSH_API: 'https://api.semrush.com',
	
	// 社交媒体
	REDDIT_API: 'https://www.reddit.com/r',
	TWITTER_API: 'https://api.twitter.com/2',
	
	// 股票和金融数据 (复用)
	FINNHUB_API: 'https://finnhub.io/api/v1',
	ALPHA_VANTAGE: 'https://www.alphavantage.co/query',
	
	// RSS 代理服务 (免费)
	RSS_PROXY: 'https://api.rss2json.com/v1/api.json',
	CORS_PROXY: 'https://cors-anywhere.herokuapp.com'
};

// 请求配置
export const REQUEST_CONFIG = {
	// 超时设置 (毫秒)
	TIMEOUT: 15000,
	
	// 重试配置
	RETRY_ATTEMPTS: 3,
	RETRY_DELAY: 1000, // 基础延迟
	
	// 并发控制
	MAX_CONCURRENT: 5,
	
	// 缓存配置
	CACHE_TTL: {
		news: 5 * 60 * 1000,        // 5分钟
		market_data: 2 * 60 * 1000,  // 2分钟
		product_data: 10 * 60 * 1000, // 10分钟
		trend_data: 30 * 60 * 1000,  // 30分钟
		static_data: 24 * 60 * 60 * 1000 // 24小时
	},
	
	// 速率限制
	RATE_LIMITS: {
		amazon_paapi: { requests: 8640, period: 86400000 }, // 8640/day
		keepa: { requests: 100, period: 60000 },            // 100/min
		jungle_scout: { requests: 1000, period: 86400000 }, // 1000/day
		helium10: { requests: 500, period: 86400000 },      // 500/day
		finnhub: { requests: 60, period: 60000 },           // 60/min
		google_trends: { requests: 100, period: 86400000 }, // 100/day
		free_apis: { requests: 10, period: 60000 }          // 10/min
	}
};

// 默认请求头
export const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	'User-Agent': 'EcommerceIntelPlatform/1.0 (https://github.com/ecommerce-intel)'
};

// API 端点映射
export const API_ENDPOINTS = {
	// 新闻和内容
	news: {
		ecommerce_feeds: '/api/news/ecommerce',
		amazon_news: '/api/news/amazon',
		platform_updates: '/api/news/platforms',
		industry_analysis: '/api/news/industry'
	},
	
	// 市场数据
	markets: {
		ecommerce_stocks: '/api/markets/stocks',
		platform_metrics: '/api/markets/metrics',
		category_performance: '/api/markets/categories'
	},
	
	// 产品数据
	products: {
		amazon_products: '/api/products/amazon',
		trending_products: '/api/products/trending',
		price_tracking: '/api/products/prices',
		product_research: '/api/products/research'
	},
	
	// 竞争情报
	competition: {
		competitor_tracking: '/api/competition/tracking',
		market_analysis: '/api/competition/analysis',
		brand_monitoring: '/api/competition/brands'
	},
	
	// 趋势分析
	trends: {
		product_trends: '/api/trends/products',
		search_trends: '/api/trends/search',
		social_trends: '/api/trends/social',
		seasonal_analysis: '/api/trends/seasonal'
	},
	
	// 供应链
	supply_chain: {
		disruption_alerts: '/api/supply/disruptions',
		supplier_intelligence: '/api/supply/suppliers',
		logistics_tracking: '/api/supply/logistics'
	},
	
	// 分析和洞察
	analytics: {
		correlation_analysis: '/api/analytics/correlations',
		narrative_tracking: '/api/analytics/narratives',
		entity_recognition: '/api/analytics/entities',
		sentiment_analysis: '/api/analytics/sentiment'
	},
	
	// 预警系统
	alerts: {
		active_alerts: '/api/alerts/active',
		create_alert: '/api/alerts/create',
		alert_history: '/api/alerts/history',
		alert_settings: '/api/alerts/settings'
	}
};

// Logger 配置 (复用原项目)
export const logger = {
	log: (category: string, message: string, ...args: unknown[]) => {
		if (import.meta.env.DEV) {
			console.log(`[${category}]`, message, ...args);
		}
	},
	
	error: (category: string, message: string, error?: unknown) => {
		console.error(`[${category}] ERROR:`, message, error);
	},
	
	warn: (category: string, message: string, ...args: unknown[]) => {
		if (import.meta.env.DEV) {
			console.warn(`[${category}] WARNING:`, message, ...args);
		}
	},
	
	debug: (category: string, message: string, ...args: unknown[]) => {
		if (import.meta.env.DEV && import.meta.env.VITE_DEBUG === 'true') {
			console.debug(`[${category}] DEBUG:`, message, ...args);
		}
	}
};

// 代理请求函数 (复用并改进)
export async function fetchWithProxy(url: string, options: RequestInit = {}): Promise<Response> {
	const proxyUrl = `${API_BASE_URLS.RSS_PROXY}?rss_url=${encodeURIComponent(url)}`;
	
	const requestOptions: RequestInit = {
		...options,
		headers: {
			...DEFAULT_HEADERS,
			...options.headers
		},
		signal: AbortSignal.timeout(REQUEST_CONFIG.TIMEOUT)
	};
	
	logger.debug('API', `Fetching via proxy: ${url}`);
	
	try {
		const response = await fetch(proxyUrl, requestOptions);
		
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		
		return response;
	} catch (error) {
		logger.error('API', `Proxy request failed for ${url}:`, error);
		throw error;
	}
}

// 直接请求函数 (用于支持 CORS 的 API)
export async function fetchDirect(url: string, options: RequestInit = {}): Promise<Response> {
	const requestOptions: RequestInit = {
		...options,
		headers: {
			...DEFAULT_HEADERS,
			...options.headers
		},
		signal: AbortSignal.timeout(REQUEST_CONFIG.TIMEOUT)
	};
	
	logger.debug('API', `Direct fetch: ${url}`);
	
	try {
		const response = await fetch(url, requestOptions);
		
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		
		return response;
	} catch (error) {
		logger.error('API', `Direct request failed for ${url}:`, error);
		throw error;
	}
}

// 带重试的请求函数
export async function fetchWithRetry(
	url: string, 
	options: RequestInit = {}, 
	retries: number = REQUEST_CONFIG.RETRY_ATTEMPTS
): Promise<Response> {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			return await fetchDirect(url, options);
		} catch (error) {
			if (attempt === retries) {
				logger.error('API', `All ${retries} attempts failed for ${url}`);
				throw error;
			}
			
			const delay = REQUEST_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1);
			logger.warn('API', `Attempt ${attempt} failed, retrying in ${delay}ms`);
			await new Promise(resolve => setTimeout(resolve, delay));
		}
	}
	
	throw new Error('Unexpected error in fetchWithRetry');
}

// API 健康检查
export async function checkApiHealth(): Promise<Record<string, boolean>> {
	const healthStatus: Record<string, boolean> = {};
	
	// 检查关键 API 端点
	const criticalApis = [
		{ name: 'RSS_PROXY', url: API_BASE_URLS.RSS_PROXY },
		{ name: 'FINNHUB', url: `${API_BASE_URLS.FINNHUB_API}/quote?symbol=AAPL&token=${ECOMMERCE_API_KEYS.FINNHUB_API_KEY}` },
		{ name: 'REDDIT', url: `${API_BASE_URLS.REDDIT_API}/ecommerce.json?limit=1` }
	];
	
	for (const api of criticalApis) {
		try {
			const response = await fetch(api.url, { 
				method: 'HEAD', 
				signal: AbortSignal.timeout(5000) 
			});
			healthStatus[api.name] = response.ok;
		} catch (error) {
			logger.error('Health Check', `${api.name} failed:`, error);
			healthStatus[api.name] = false;
		}
	}
	
	return healthStatus;
}

// 速率限制管理器
class RateLimiter {
	private requests: Map<string, { count: number; resetTime: number }> = new Map();
	
	canMakeRequest(apiKey: string): boolean {
		const limit = REQUEST_CONFIG.RATE_LIMITS[apiKey as keyof typeof REQUEST_CONFIG.RATE_LIMITS];
		if (!limit) return true;
		
		const now = Date.now();
		const current = this.requests.get(apiKey) || { count: 0, resetTime: now + limit.period };
		
		if (now > current.resetTime) {
			current.count = 0;
			current.resetTime = now + limit.period;
		}
		
		if (current.count >= limit.requests) {
			return false;
		}
		
		current.count++;
		this.requests.set(apiKey, current);
		return true;
	}
	
	getWaitTime(apiKey: string): number {
		const current = this.requests.get(apiKey);
		if (!current) return 0;
		
		return Math.max(0, current.resetTime - Date.now());
	}
}

export const rateLimiter = new RateLimiter();