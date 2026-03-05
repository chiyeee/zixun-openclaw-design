/**
 * 电商市场数据配置
 * 替换股票/商品数据为电商平台和产品数据
 */

export interface EcommerceMarket {
	symbol: string;
	name: string;
	platform: string;
	type: 'stock' | 'metric' | 'index';
}

export interface ProductCategory {
	id: string;
	name: string;
	amazon_node?: string;
	shopify_category?: string;
	trend_keywords: string[];
}

export interface EcommercePlatform {
	id: string;
	name: string;
	symbol?: string; // 如果是上市公司
	api_endpoint?: string;
	market_share?: number;
}

// 电商相关上市公司股票 (替代传统指数)
export const ECOMMERCE_STOCKS: EcommerceMarket[] = [
	{ symbol: 'AMZN', name: 'Amazon', platform: 'Amazon', type: 'stock' },
	{ symbol: 'SHOP', name: 'Shopify', platform: 'Shopify', type: 'stock' },
	{ symbol: 'EBAY', name: 'eBay', platform: 'eBay', type: 'stock' },
	{ symbol: 'ETSY', name: 'Etsy', platform: 'Etsy', type: 'stock' },
	{ symbol: 'SE', name: 'Sea Limited (Shopee)', platform: 'Shopee', type: 'stock' },
	{ symbol: 'MELI', name: 'MercadoLibre', platform: 'MercadoLibre', type: 'stock' },
	{ symbol: 'JD', name: 'JD.com', platform: 'JD', type: 'stock' },
	{ symbol: 'PDD', name: 'PDD Holdings (Temu)', platform: 'Temu', type: 'stock' },
	{ symbol: 'BABA', name: 'Alibaba Group', platform: 'Alibaba', type: 'stock' },
	{ symbol: 'BIGC', name: 'BigCommerce', platform: 'BigCommerce', type: 'stock' }
];

// 电商相关ETF和行业指数
export const ECOMMERCE_ETFS: EcommerceMarket[] = [
	{ symbol: 'IBUY', name: 'Amplify Online Retail ETF', platform: 'Multiple', type: 'index' },
	{ symbol: 'ONLN', name: 'ProShares Online Retail ETF', platform: 'Multiple', type: 'index' },
	{ symbol: 'EWEB', name: 'Global X E-commerce ETF', platform: 'Multiple', type: 'index' },
	{ symbol: 'FDN', name: 'First Trust Dow Jones Internet Index', platform: 'Internet', type: 'index' },
	{ symbol: 'QTUM', name: 'Defiance Quantum ETF', platform: 'Tech', type: 'index' }
];

// 主要电商平台配置
export const ECOMMERCE_PLATFORMS: EcommercePlatform[] = [
	{
		id: 'amazon',
		name: 'Amazon',
		symbol: 'AMZN',
		api_endpoint: 'https://webservices.amazon.com/paapi5',
		market_share: 37.8
	},
	{
		id: 'shopify',
		name: 'Shopify',
		symbol: 'SHOP', 
		api_endpoint: 'https://api.shopify.com',
		market_share: 10.3
	},
	{
		id: 'woocommerce',
		name: 'WooCommerce',
		api_endpoint: 'https://woocommerce.com/wp-json/wc/v3',
		market_share: 6.6
	},
	{
		id: 'squarespace',
		name: 'Squarespace',
		api_endpoint: 'https://api.squarespace.com',
		market_share: 2.3
	},
	{
		id: 'bigcommerce',
		name: 'BigCommerce',
		symbol: 'BIGC',
		api_endpoint: 'https://api.bigcommerce.com',
		market_share: 1.2
	},
	{
		id: 'ebay',
		name: 'eBay',
		symbol: 'EBAY',
		api_endpoint: 'https://api.ebay.com',
		market_share: 4.1
	},
	{
		id: 'etsy',
		name: 'Etsy',
		symbol: 'ETSY',
		api_endpoint: 'https://openapi.etsy.com/v3',
		market_share: 2.7
	}
];

// 热门产品类别 (替代商品期货)
export const PRODUCT_CATEGORIES: ProductCategory[] = [
	{
		id: 'electronics',
		name: '电子产品',
		amazon_node: '172282',
		trend_keywords: ['smartphone', 'laptop', 'headphones', 'smartwatch']
	},
	{
		id: 'home_garden',
		name: '家居园艺',
		amazon_node: '1055398',
		trend_keywords: ['home decor', 'furniture', 'gardening', 'kitchen']
	},
	{
		id: 'clothing_accessories',
		name: '服装配饰',
		amazon_node: '1036592',
		trend_keywords: ['fashion', 'shoes', 'jewelry', 'bags']
	},
	{
		id: 'sports_outdoors',
		name: '运动户外',
		amazon_node: '3375251',
		trend_keywords: ['fitness', 'camping', 'sports equipment', 'outdoor gear']
	},
	{
		id: 'health_beauty',
		name: '健康美容',
		amazon_node: '3760901',
		trend_keywords: ['skincare', 'makeup', 'supplements', 'wellness']
	},
	{
		id: 'toys_games',
		name: '玩具游戏',
		amazon_node: '165793011',
		trend_keywords: ['educational toys', 'board games', 'video games', 'puzzles']
	},
	{
		id: 'automotive',
		name: '汽车用品',
		amazon_node: '15684181',
		trend_keywords: ['car accessories', 'car parts', 'motorcycle', 'automotive tools']
	},
	{
		id: 'books_media',
		name: '图书媒体',
		amazon_node: '283155',
		trend_keywords: ['ebooks', 'audiobooks', 'magazines', 'movies']
	},
	{
		id: 'pet_supplies',
		name: '宠物用品',
		amazon_node: '2619533011',
		trend_keywords: ['dog supplies', 'cat supplies', 'pet food', 'pet toys']
	},
	{
		id: 'office_supplies',
		name: '办公用品',
		amazon_node: '1064954',
		trend_keywords: ['office furniture', 'stationery', 'electronics', 'organization']
	}
];

// 关键电商指标 (替代传统经济指标)
export interface EcommerceMetric {
	id: string;
	name: string;
	description: string;
	unit: string;
	source: string;
	update_frequency: string;
}

export const ECOMMERCE_METRICS: EcommerceMetric[] = [
	{
		id: 'global_ecommerce_growth',
		name: '全球电商增长率',
		description: '全球电商市场年增长率',
		unit: 'percentage',
		source: 'Statista',
		update_frequency: 'quarterly'
	},
	{
		id: 'mobile_commerce_share',
		name: '移动端商务占比',
		description: '移动端电商交易占总电商交易比例',
		unit: 'percentage',
		source: 'Adobe Analytics',
		update_frequency: 'monthly'
	},
	{
		id: 'average_order_value',
		name: '平均订单价值',
		description: '全球电商平均订单价值',
		unit: 'USD',
		source: 'Multiple Platforms',
		update_frequency: 'weekly'
	},
	{
		id: 'cart_abandonment_rate',
		name: '购物车放弃率',
		description: '全球平均购物车放弃率',
		unit: 'percentage',
		source: 'Baymard Institute',
		update_frequency: 'monthly'
	},
	{
		id: 'return_rate',
		name: '退货率',
		description: '电商平台平均退货率',
		unit: 'percentage',
		source: 'National Retail Federation',
		update_frequency: 'monthly'
	},
	{
		id: 'customer_acquisition_cost',
		name: '客户获取成本',
		description: '平均客户获取成本 (CAC)',
		unit: 'USD',
		source: 'Industry Reports',
		update_frequency: 'quarterly'
	},
	{
		id: 'social_commerce_growth',
		name: '社交商务增长',
		description: '社交媒体电商销售增长率',
		unit: 'percentage',
		source: 'Meta/TikTok Reports',
		update_frequency: 'quarterly'
	},
	{
		id: 'cross_border_share',
		name: '跨境电商占比',
		description: '跨境电商占总电商交易比例',
		unit: 'percentage',
		source: 'Cross-border Commerce Reports',
		update_frequency: 'quarterly'
	}
];

// API 端点配置
export const API_ENDPOINTS = {
	// 免费数据源
	amazon_bestsellers: 'https://www.amazon.com/gp/rss/bestsellers',
	google_trends: 'https://trends.google.com/trends/api',
	reddit_ecommerce: 'https://www.reddit.com/r/ecommerce.json',
	
	// 付费数据源 (需要API密钥)
	keepa: 'https://api.keepa.com',
	jungle_scout: 'https://api.junglescout.com/v1',
	helium10: 'https://api.helium10.com/v2',
	
	// 平台官方API (需要认证)
	amazon_paapi: 'https://webservices.amazon.com/paapi5',
	shopify_admin: 'https://api.shopify.com/admin/api/2023-10',
	ebay_finding: 'https://svcs.ebay.com/services/search/FindingService/v1',
	
	// 股票和ETF数据 (Finnhub替代)
	finnhub_stock: 'https://finnhub.io/api/v1/quote',
	alpha_vantage: 'https://www.alphavantage.co/query'
};