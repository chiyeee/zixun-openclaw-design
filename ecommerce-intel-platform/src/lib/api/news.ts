/**
 * 电商新闻数据获取 API
 * 基于 situation-monitor 架构，专门获取电商相关新闻
 */

import { ECOMMERCE_FEEDS, PREMIUM_INTEL_SOURCES, REGIONAL_ECOMMERCE_SOURCES, DATA_FEEDS } from '$lib/config/feeds';
import { ECOMMERCE_ALERT_KEYWORDS, CATEGORY_KEYWORDS, SENTIMENT_KEYWORDS, URGENCY_KEYWORDS } from '$lib/config/keywords';
import type { EcommerceNewsItem, NewsCategory } from '$lib/types';
import { fetchWithProxy, fetchDirect, logger, API_BASE_URLS } from '$lib/config/api';

interface RSSFeedItem {
	title: string;
	description: string;
	link: string;
	pubDate: string;
	source?: string;
	guid?: string;
}

interface RSSFeedResponse {
	status: string;
	feed: {
		title: string;
		link: string;
		description: string;
	};
	items: RSSFeedItem[];
}

/**
 * 从RSS源获取电商新闻
 */
export async function fetchEcommerceNews(category?: NewsCategory): Promise<EcommerceNewsItem[]> {
	const allNews: EcommerceNewsItem[] = [];
	
	try {
		logger.log('Ecommerce News API', `Fetching news for category: ${category || 'all'}`);
		
		// 选择要获取的新闻源
		const feedSources = category 
			? ECOMMERCE_FEEDS[category] || []
			: Object.values(ECOMMERCE_FEEDS).flat();
		
		// 限制并发请求数量以避免API限制
		const maxConcurrent = 5;
		const feedBatches = [];
		
		for (let i = 0; i < feedSources.length; i += maxConcurrent) {
			feedBatches.push(feedSources.slice(i, i + maxConcurrent));
		}
		
		// 逐批处理RSS源
		for (const batch of feedBatches) {
			const batchPromises = batch.map(async (source) => {
				try {
					const rssData = await fetchRSSFeed(source.url);
					return rssData.map(item => processNewsItem(item, source.name, category));
				} catch (error) {
					logger.error('Ecommerce News API', `Error fetching ${source.name}:`, error);
					return [];
				}
			});
			
			const batchResults = await Promise.all(batchPromises);
			batchResults.forEach(items => allNews.push(...items));
			
			// 在批次之间添加小延迟以避免速率限制
			if (feedBatches.indexOf(batch) < feedBatches.length - 1) {
				await new Promise(resolve => setTimeout(resolve, 500));
			}
		}
		
		// 按发布时间排序并去重
		const uniqueNews = deduplicateNews(allNews);
		const sortedNews = uniqueNews.sort((a, b) => 
			new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
		);
		
		logger.log('Ecommerce News API', `Successfully fetched ${sortedNews.length} unique news items`);
		return sortedNews.slice(0, 100); // 限制返回数量
		
	} catch (error) {
		logger.error('Ecommerce News API', 'Error fetching ecommerce news:', error);
		return [];
	}
}

/**
 * 获取单个RSS源的数据
 */
async function fetchRSSFeed(url: string): Promise<RSSFeedItem[]> {
	try {
		// 使用RSS2JSON服务转换RSS为JSON
		const proxyUrl = `${API_BASE_URLS.RSS_PROXY}?rss_url=${encodeURIComponent(url)}&api_key=&count=20`;
		const response = await fetchDirect(proxyUrl);
		
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		
		const data: RSSFeedResponse = await response.json();
		
		if (data.status !== 'ok') {
			throw new Error(`RSS parsing failed: ${data.status}`);
		}
		
		return data.items || [];
		
	} catch (error) {
		logger.error('RSS Feed', `Error fetching RSS from ${url}:`, error);
		return [];
	}
}

/**
 * 处理单个新闻条目
 */
function processNewsItem(
	item: RSSFeedItem, 
	sourceName: string, 
	category?: NewsCategory
): EcommerceNewsItem {
	const title = cleanText(item.title || '');
	const description = cleanText(item.description || '');
	const content = `${title} ${description}`.toLowerCase();
	
	// 分析新闻内容
	const keywords = extractKeywords(content);
	const sentiment = analyzeSentiment(content);
	const urgency = analyzeUrgency(content, title);
	const platforms = extractPlatforms(content);
	const productCategories = extractProductCategories(content);
	const regions = extractRegions(content);
	const analysisScore = calculateAnalysisScore(content, keywords, sentiment, urgency);
	
	return {
		id: generateNewsId(item.link || item.guid || title),
		title,
		description,
		url: item.link || '',
		source: sourceName,
		category: category || inferCategory(content),
		published_date: parseDate(item.pubDate),
		keywords,
		sentiment,
		urgency,
		platforms,
		product_categories: productCategories,
		regions,
		analysis_score: analysisScore,
		related_items: [] // 将在后处理中填充
	};
}

/**
 * 清理文本内容
 */
function cleanText(text: string): string {
	return text
		.replace(/<[^>]*>/g, '') // 移除HTML标签
		.replace(/&[a-z]+;/gi, ' ') // 移除HTML实体
		.replace(/\s+/g, ' ') // 合并空白字符
		.trim();
}

/**
 * 提取关键词
 */
function extractKeywords(content: string): string[] {
	const keywords: string[] = [];
	
	// 检查预定义的关键词
	Object.entries(ECOMMERCE_ALERT_KEYWORDS).forEach(([category, categoryKeywords]) => {
		categoryKeywords.forEach(keyword => {
			if (content.includes(keyword.toLowerCase())) {
				keywords.push(keyword);
			}
		});
	});
	
	return [...new Set(keywords)]; // 去重
}

/**
 * 分析情感倾向
 */
function analyzeSentiment(content: string): 'positive' | 'negative' | 'neutral' {
	let positiveScore = 0;
	let negativeScore = 0;
	
	SENTIMENT_KEYWORDS.positive.forEach(keyword => {
		if (content.includes(keyword.toLowerCase())) {
			positiveScore++;
		}
	});
	
	SENTIMENT_KEYWORDS.negative.forEach(keyword => {
		if (content.includes(keyword.toLowerCase())) {
			negativeScore++;
		}
	});
	
	if (positiveScore > negativeScore) return 'positive';
	if (negativeScore > positiveScore) return 'negative';
	return 'neutral';
}

/**
 * 分析紧急程度
 */
function analyzeUrgency(content: string, title: string): 'critical' | 'high' | 'medium' | 'low' {
	const combinedText = `${title} ${content}`.toLowerCase();
	
	// 检查关键词的紧急程度
	for (const [urgencyLevel, keywords] of Object.entries(URGENCY_KEYWORDS)) {
		for (const keyword of keywords) {
			if (combinedText.includes(keyword.toLowerCase())) {
				return urgencyLevel as 'critical' | 'high' | 'medium' | 'low';
			}
		}
	}
	
	return 'low';
}

/**
 * 提取相关平台
 */
function extractPlatforms(content: string): string[] {
	const platforms: string[] = [];
	const platformKeywords = {
		'Amazon': ['amazon', 'aws', 'prime', 'kindle', 'alexa'],
		'Shopify': ['shopify'],
		'eBay': ['ebay'],
		'Etsy': ['etsy'],
		'BigCommerce': ['bigcommerce'],
		'WooCommerce': ['woocommerce'],
		'Alibaba': ['alibaba', 'aliexpress', 'taobao'],
		'Shopee': ['shopee'],
		'Lazada': ['lazada'],
		'Mercado Libre': ['mercadolibre', 'mercado libre'],
		'Temu': ['temu'],
		'Shein': ['shein']
	};
	
	Object.entries(platformKeywords).forEach(([platform, keywords]) => {
		if (keywords.some(keyword => content.includes(keyword))) {
			platforms.push(platform);
		}
	});
	
	return platforms;
}

/**
 * 提取产品类别
 */
function extractProductCategories(content: string): string[] {
	const categories: string[] = [];
	
	Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
		if (keywords.some(keyword => content.includes(keyword))) {
			categories.push(category);
		}
	});
	
	return categories;
}

/**
 * 提取地理区域
 */
function extractRegions(content: string): string[] {
	const regions: string[] = [];
	const regionKeywords = {
		'North America': ['usa', 'united states', 'canada', 'mexico', 'north america'],
		'Europe': ['europe', 'eu', 'uk', 'germany', 'france', 'italy', 'spain'],
		'Asia Pacific': ['asia', 'china', 'japan', 'korea', 'singapore', 'australia', 'india'],
		'Latin America': ['brazil', 'argentina', 'chile', 'colombia', 'latin america'],
		'Middle East': ['uae', 'saudi arabia', 'israel', 'turkey', 'middle east'],
		'Africa': ['south africa', 'nigeria', 'kenya', 'egypt', 'africa']
	};
	
	Object.entries(regionKeywords).forEach(([region, keywords]) => {
		if (keywords.some(keyword => content.includes(keyword))) {
			regions.push(region);
		}
	});
	
	return regions;
}

/**
 * 推断新闻类别
 */
function inferCategory(content: string): NewsCategory {
	const categoryKeywords = {
		amazon_intel: ['amazon', 'aws', 'prime', 'seller central'],
		platform_updates: ['shopify', 'ebay', 'etsy', 'update', 'feature'],
		supply_chain: ['supply chain', 'shipping', 'logistics', 'manufacturing'],
		ecommerce_tech: ['ai', 'machine learning', 'technology', 'innovation'],
		industry_analysis: ['market', 'analysis', 'research', 'forecast']
	};
	
	for (const [category, keywords] of Object.entries(categoryKeywords)) {
		if (keywords.some(keyword => content.includes(keyword))) {
			return category as NewsCategory;
		}
	}
	
	return 'ecommerce_news';
}

/**
 * 计算分析评分
 */
function calculateAnalysisScore(
	content: string, 
	keywords: string[], 
	sentiment: string, 
	urgency: string
): number {
	let score = 50; // 基础分数
	
	// 关键词权重
	score += keywords.length * 5;
	
	// 紧急程度权重
	const urgencyWeights = { critical: 30, high: 20, medium: 10, low: 0 };
	score += urgencyWeights[urgency as keyof typeof urgencyWeights];
	
	// 情感权重
	const sentimentWeights = { positive: 5, negative: 10, neutral: 0 };
	score += sentimentWeights[sentiment as keyof typeof sentimentWeights];
	
	// 内容质量权重
	if (content.length > 500) score += 10;
	if (content.length > 1000) score += 10;
	
	return Math.min(100, Math.max(0, score));
}

/**
 * 生成新闻ID
 */
function generateNewsId(source: string): string {
	const hash = source.split('').reduce((a, b) => {
		a = ((a << 5) - a) + b.charCodeAt(0);
		return a & a;
	}, 0);
	return `news_${Math.abs(hash)}_${Date.now()}`;
}

/**
 * 解析日期
 */
function parseDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		return date.toISOString();
	} catch {
		return new Date().toISOString();
	}
}

/**
 * 去重新闻条目
 */
function deduplicateNews(news: EcommerceNewsItem[]): EcommerceNewsItem[] {
	const seen = new Set<string>();
	return news.filter(item => {
		const key = `${item.title}_${item.source}`.toLowerCase();
		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});
}

/**
 * 获取特定平台的新闻
 */
export async function fetchPlatformNews(platform: string): Promise<EcommerceNewsItem[]> {
	try {
		logger.log('Platform News API', `Fetching news for platform: ${platform}`);
		
		const allNews = await fetchEcommerceNews();
		const platformNews = allNews.filter(item => 
			item.platforms.includes(platform) || 
			item.title.toLowerCase().includes(platform.toLowerCase()) ||
			item.description.toLowerCase().includes(platform.toLowerCase())
		);
		
		logger.log('Platform News API', `Found ${platformNews.length} news items for ${platform}`);
		return platformNews;
		
	} catch (error) {
		logger.error('Platform News API', `Error fetching platform news for ${platform}:`, error);
		return [];
	}
}

/**
 * 获取趋势新闻
 */
export async function fetchTrendingNews(limit: number = 20): Promise<EcommerceNewsItem[]> {
	try {
		logger.log('Trending News API', 'Fetching trending ecommerce news');
		
		const allNews = await fetchEcommerceNews();
		
		// 根据分析评分和发布时间排序
		const trendingNews = allNews
			.sort((a, b) => {
				const scoreWeight = 0.7;
				const timeWeight = 0.3;
				
				const aScore = (a.analysis_score * scoreWeight) + 
					((Date.now() - new Date(a.published_date).getTime()) / 86400000 * timeWeight);
				const bScore = (b.analysis_score * scoreWeight) + 
					((Date.now() - new Date(b.published_date).getTime()) / 86400000 * timeWeight);
				
				return bScore - aScore;
			})
			.slice(0, limit);
		
		logger.log('Trending News API', `Returning ${trendingNews.length} trending news items`);
		return trendingNews;
		
	} catch (error) {
		logger.error('Trending News API', 'Error fetching trending news:', error);
		return [];
	}
}