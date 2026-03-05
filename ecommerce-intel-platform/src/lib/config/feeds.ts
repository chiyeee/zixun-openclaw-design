/**
 * 电商新闻源和数据源配置
 * 基于 situation-monitor 架构，专门为电商情报设计
 */

import type { NewsCategory } from '$lib/types';

export interface FeedSource {
	name: string;
	url: string;
}

export interface EcommerceFeed extends FeedSource {
	type: 'news' | 'blog' | 'industry' | 'platform' | 'data';
	topics: string[];
	region?: string;
	language?: string;
}

// 电商新闻源分类
export const ECOMMERCE_FEEDS: Record<NewsCategory, FeedSource[]> = {
	// 电商综合新闻
	ecommerce_news: [
		{ name: 'Digital Commerce 360', url: 'https://www.digitalcommerce360.com/feed/' },
		{ name: 'Practical Ecommerce', url: 'https://www.practicalecommerce.com/feed' },
		{ name: 'eCommerce Times', url: 'https://www.ecommercetimes.com/rss/perl/story/ECOMMERCE-RSS20.xml' },
		{ name: 'Internet Retailer', url: 'https://www.digitalcommerce360.com/feed/' },
		{ name: 'Retail Dive', url: 'https://www.retaildive.com/feeds/news/' }
	],
	
	// Amazon 专门新闻
	amazon_intel: [
		{ name: 'Marketplace Pulse', url: 'https://www.marketplacepulse.com/feed' },
		{ name: 'eCommerceBytes', url: 'https://www.ecommercebytes.com/index.rss' },
		{ name: 'Tamebay', url: 'https://tamebay.com/feed' },
		{ name: 'WebRetailer', url: 'https://www.webretailer.com/rss.xml' },
		{ name: 'SellerCentral Updates', url: 'https://sellercentral.amazon.com/forums/rss.jspa?forumID=196' }
	],
	
	// 平台官方博客
	platform_updates: [
		{ name: 'Shopify Blog', url: 'https://www.shopify.com/blog.atom' },
		{ name: 'BigCommerce Blog', url: 'https://www.bigcommerce.com/blog/rss.xml' },
		{ name: 'WooCommerce News', url: 'https://woocommerce.com/feed/' },
		{ name: 'eBay for Business', url: 'https://www.ebay.com/sellercenter/feed/' },
		{ name: 'Etsy Seller Handbook', url: 'https://blog.etsy.com/feed/' }
	],
	
	// 行业分析
	industry_analysis: [
		{ name: 'eMarketer', url: 'https://www.emarketer.com/RSS' },
		{ name: 'Forrester Retail', url: 'https://www.forrester.com/rss/research/retail.rss' },
		{ name: 'McKinsey Retail', url: 'https://www.mckinsey.com/industries/retail/rss.xml' },
		{ name: 'Deloitte Consumer', url: 'https://www2.deloitte.com/us/en/insights/industry/retail-distribution.rss' },
		{ name: 'PwC Retail', url: 'https://www.pwc.com/us/en/industries/retail-consumer.rss' }
	],
	
	// 技术创新
	ecommerce_tech: [
		{ name: 'TechCrunch Commerce', url: 'https://techcrunch.com/category/e-commerce/feed/' },
		{ name: 'VentureBeat Commerce', url: 'https://venturebeat.com/category/commerce/feed/' },
		{ name: 'The Information Commerce', url: 'https://www.theinformation.com/topics/commerce.rss' },
		{ name: 'Modern Retail', url: 'https://www.modernretail.co/feed/' },
		{ name: 'Chain Store Age', url: 'https://chainstoreage.com/rss.xml' }
	],
	
	// 供应链物流
	supply_chain: [
		{ name: 'Supply Chain Dive', url: 'https://www.supplychaindive.com/feeds/news/' },
		{ name: 'Logistics Management', url: 'https://www.logisticsmgmt.com/rss/topic/8-Transportation' },
		{ name: 'FreightWaves', url: 'https://www.freightwaves.com/feed' },
		{ name: 'JOC.com', url: 'https://www.joc.com/rss.xml' },
		{ name: 'Transport Topics', url: 'https://www.ttnews.com/rss.xml' }
	]
};

// 高价值电商情报源 (付费/稀缺信息)
export const PREMIUM_INTEL_SOURCES: EcommerceFeed[] = [
	{
		name: 'Amazon Seller Central Forums',
		url: 'https://sellercentral.amazon.com/forums/rss.jspa',
		type: 'platform',
		topics: ['amazon', 'seller-issues', 'policy-updates']
	},
	{
		name: 'FBA Subreddit',
		url: 'https://www.reddit.com/r/FulfillmentByAmazon/.rss',
		type: 'community',
		topics: ['amazon', 'fba', 'seller-discussion']
	},
	{
		name: 'Shopify Partners Blog',
		url: 'https://www.shopify.com/partners/blog.atom',
		type: 'platform',
		topics: ['shopify', 'development', 'partner-news']
	},
	{
		name: 'BigCommerce Developer Blog',
		url: 'https://developer.bigcommerce.com/changelog.rss',
		type: 'platform',
		topics: ['bigcommerce', 'api-updates', 'developer-news']
	},
	{
		name: 'Alibaba.com Blog',
		url: 'https://seller.alibaba.com/businessblog/rss.xml',
		type: 'platform',
		topics: ['alibaba', 'b2b', 'sourcing', 'global-trade']
	},
	{
		name: 'DHgate Seller Blog',
		url: 'https://www.dhgate.com/blog/feed/',
		type: 'platform',
		topics: ['dhgate', 'wholesale', 'dropshipping']
	},
	{
		name: 'AliExpress Seller Center',
		url: 'https://sellercenter.aliexpress.com/blog/rss.xml',
		type: 'platform',
		topics: ['aliexpress', 'dropshipping', 'seller-resources']
	}
];

// 区域特定电商新闻源
export const REGIONAL_ECOMMERCE_SOURCES: Record<string, EcommerceFeed[]> = {
	'APAC': [
		{
			name: 'Tech in Asia Commerce',
			url: 'https://www.techinasia.com/rss/commerce',
			type: 'news',
			topics: ['apac', 'southeast-asia'],
			region: 'APAC'
		},
		{
			name: 'Nikkei Asia Retail',
			url: 'https://asia.nikkei.com/rss/Business/Retail',
			type: 'news',
			topics: ['japan', 'retail'],
			region: 'APAC'
		}
	],
	'Europe': [
		{
			name: 'RetailX',
			url: 'https://retailx.net/feed/',
			type: 'news',
			topics: ['europe', 'uk-retail'],
			region: 'Europe'
		},
		{
			name: 'Internet Retailing Europe',
			url: 'https://internetretailing.net/feed/',
			type: 'news',
			topics: ['europe', 'online-retail'],
			region: 'Europe'
		}
	],
	'LATAM': [
		{
			name: 'eCommerce Brasil',
			url: 'https://www.ecommercebrasil.com.br/feed/',
			type: 'news',
			topics: ['brazil', 'latin-america'],
			region: 'LATAM',
			language: 'pt'
		}
	]
};

// 专门的数据源 RSS (非新闻类)
export const DATA_FEEDS: EcommerceFeed[] = [
	{
		name: 'Amazon Best Sellers Updates',
		url: 'https://www.amazon.com/rss/bestsellers',
		type: 'data',
		topics: ['amazon', 'bestsellers', 'trending-products']
	},
	{
		name: 'Google Shopping Insights',
		url: 'https://shopping.google.com/rss/insights',
		type: 'data', 
		topics: ['google-shopping', 'trends', 'consumer-behavior']
	},
	{
		name: 'Facebook Commerce Updates',
		url: 'https://www.facebook.com/business/news/rss',
		type: 'platform',
		topics: ['facebook', 'social-commerce', 'advertising']
	}
];

// 电商工具和服务提供商新闻
export const ECOMMERCE_TOOLS_FEEDS: EcommerceFeed[] = [
	{
		name: 'Klaviyo Blog',
		url: 'https://www.klaviyo.com/blog/rss.xml',
		type: 'blog',
		topics: ['email-marketing', 'automation']
	},
	{
		name: 'Yotpo Blog', 
		url: 'https://www.yotpo.com/blog/feed/',
		type: 'blog',
		topics: ['reviews', 'user-generated-content']
	},
	{
		name: 'Gorgias Blog',
		url: 'https://www.gorgias.com/blog/rss.xml',
		type: 'blog',
		topics: ['customer-service', 'helpdesk']
	},
	{
		name: 'ReCharge Blog',
		url: 'https://rechargepayments.com/blog/rss.xml',
		type: 'blog',
		topics: ['subscriptions', 'recurring-payments']
	}
];

// 聚合所有电商信息源
export const ALL_ECOMMERCE_SOURCES = [
	...Object.values(ECOMMERCE_FEEDS).flat(),
	...PREMIUM_INTEL_SOURCES,
	...Object.values(REGIONAL_ECOMMERCE_SOURCES).flat(),
	...DATA_FEEDS,
	...ECOMMERCE_TOOLS_FEEDS
];