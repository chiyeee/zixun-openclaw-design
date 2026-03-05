/**
 * 电商关键词和分析配置
 * 替换地缘政治关键词为电商相关关键词
 */

// 电商预警关键词 (替代冲突监控)
export const ECOMMERCE_ALERT_KEYWORDS: Record<string, string[]> = {
	// 平台政策变化 (高优先级)
	platform_policy: [
		'policy change', 'terms of service', 'seller agreement',
		'account suspension', 'fee increase', 'commission change',
		'restricted products', 'category gating', 'brand registry',
		'intellectual property', 'counterfeit', 'trademark violation'
	],

	// Amazon 特定关键词
	amazon_alerts: [
		'amazon suspended', 'account deactivated', 'asin removed',
		'buy box', 'search rank', 'organic rank', 'sponsored ads',
		'fba fees', 'storage fees', 'long term storage',
		'stranded inventory', 'unfulfillable', 'customer return',
		'a-to-z guarantee', 'performance notification', 'voice of customer'
	],

	// 供应链预警
	supply_chain: [
		'supply shortage', 'raw material', 'manufacturing delay',
		'shipping delay', 'port congestion', 'container shortage',
		'customs hold', 'import restriction', 'tariff increase',
		'factory closure', 'labor shortage', 'quality control'
	],

	// 市场趋势和机会
	market_opportunity: [
		'trending product', 'viral product', 'seasonal demand',
		'emerging niche', 'untapped market', 'low competition',
		'high profit margin', 'product launch', 'new category',
		'consumer behavior', 'buying pattern', 'search volume spike'
	],

	// 竞争情报
	competitor_intel: [
		'new competitor', 'price war', 'patent filing',
		'product recall', 'brand acquisition', 'market expansion',
		'funding round', 'partnership', 'exclusive deal',
		'celebrity endorsement', 'influencer marketing', 'viral campaign'
	],

	// 技术和创新
	ecommerce_tech: [
		'ai shopping', 'voice commerce', 'ar try-on', 'vr shopping',
		'blockchain payment', 'crypto commerce', 'nft marketplace',
		'social commerce', 'live streaming', 'shoppable video',
		'personalization', 'recommendation engine', 'chatbot'
	],

	// 监管和合规
	regulatory: [
		'gdpr compliance', 'privacy policy', 'data protection',
		'consumer protection', 'product safety', 'recall notice',
		'class action', 'regulatory fine', 'investigation',
		'antitrust', 'monopoly', 'unfair competition'
	]
};

// 产品类别关键词检测
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
	electronics: [
		'smartphone', 'laptop', 'tablet', 'headphones', 'smartwatch',
		'gaming', 'console', 'graphics card', 'processor', 'monitor',
		'camera', 'drone', 'smart home', 'alexa', 'google home'
	],
	
	fashion: [
		'clothing', 'shoes', 'dress', 'jeans', 'sneakers',
		'jewelry', 'watch', 'handbag', 'sunglasses', 'accessories',
		'sustainable fashion', 'fast fashion', 'luxury brand'
	],
	
	health_beauty: [
		'skincare', 'makeup', 'cosmetics', 'anti-aging', 'sunscreen',
		'supplement', 'vitamin', 'protein', 'wellness', 'organic',
		'clean beauty', 'k-beauty', 'men grooming'
	],
	
	home_garden: [
		'furniture', 'home decor', 'kitchen', 'appliance', 'mattress',
		'gardening', 'plants', 'smart home', 'organization', 'cleaning',
		'interior design', 'diy', 'home improvement'
	],
	
	sports_fitness: [
		'fitness equipment', 'yoga', 'running', 'gym', 'workout',
		'outdoor gear', 'camping', 'hiking', 'cycling', 'swimming',
		'activewear', 'athletic shoes', 'sports nutrition'
	],
	
	toys_kids: [
		'educational toys', 'stem toys', 'board games', 'puzzles',
		'baby products', 'stroller', 'car seat', 'diapers',
		'kids clothing', 'school supplies', 'learning resources'
	],

	pet_supplies: [
		'dog food', 'cat food', 'pet toys', 'pet bed', 'leash',
		'pet grooming', 'aquarium', 'bird cage', 'veterinary',
		'pet insurance', 'pet training', 'pet accessories'
	],

	automotive: [
		'car accessories', 'car parts', 'tires', 'car care',
		'motorcycle', 'rv', 'boat', 'automotive tools',
		'dash cam', 'car audio', 'performance parts'
	]
};

// 地区市场关键词
export const REGIONAL_KEYWORDS: Record<string, string[]> = {
	north_america: ['usa', 'canada', 'mexico', 'usmca', 'nafta'],
	europe: ['eu', 'uk', 'germany', 'france', 'brexit', 'gdpr', 'vat'],
	asia_pacific: ['china', 'japan', 'korea', 'singapore', 'australia', 'india'],
	latin_america: ['brazil', 'argentina', 'colombia', 'mercosur'],
	middle_east: ['uae', 'saudi arabia', 'israel', 'turkey'],
	africa: ['south africa', 'nigeria', 'kenya', 'egypt']
};

// 季节性关键词
export const SEASONAL_KEYWORDS: Record<string, string[]> = {
	q1_winter: [
		'new year', 'valentine', 'winter sale', 'clearance',
		'tax season', 'spring cleaning', 'fitness resolution'
	],
	q2_spring: [
		'easter', 'mothers day', 'graduation', 'spring fashion',
		'outdoor activities', 'gardening season', 'wedding season'
	],
	q3_summer: [
		'fathers day', 'summer sale', 'vacation', 'beach',
		'camping', 'back to school', 'labor day'
	],
	q4_holiday: [
		'halloween', 'black friday', 'cyber monday', 'christmas',
		'holiday shopping', 'gift guide', 'year end sale', 'winter gear'
	]
};

// 情感分析关键词
export const SENTIMENT_KEYWORDS = {
	positive: [
		'love', 'amazing', 'excellent', 'perfect', 'recommend',
		'best product', 'high quality', 'fast shipping', 'great value',
		'works perfectly', 'exceeded expectations', 'will buy again'
	],
	negative: [
		'disappointed', 'waste of money', 'poor quality', 'broken',
		'defective', 'scam', 'fake', 'counterfeit', 'slow shipping',
		'bad customer service', 'not as described', 'regret buying'
	],
	neutral: [
		'okay', 'average', 'decent', 'fine', 'works', 'standard',
		'as expected', 'nothing special', 'reasonable price'
	]
};

// 紧急程度关键词
export const URGENCY_KEYWORDS = {
	critical: [
		'lawsuit', 'recall', 'banned', 'suspended', 'investigation',
		'patent lawsuit', 'class action', 'regulatory action', 'FDA warning'
	],
	high: [
		'policy change', 'fee increase', 'algorithm update', 'api change',
		'new competitor', 'funding', 'acquisition', 'partnership'
	],
	medium: [
		'trend', 'seasonal', 'promotion', 'sale', 'discount',
		'new product', 'feature update', 'market expansion'
	],
	low: [
		'blog post', 'interview', 'conference', 'research', 'survey',
		'opinion', 'prediction', 'analysis', 'commentary'
	]
};

// 电商专业术语
export const ECOMMERCE_TERMINOLOGY = {
	metrics: [
		'conversion rate', 'click through rate', 'ctr', 'roas', 'acos',
		'ltv', 'cac', 'churn rate', 'retention rate', 'aov', 'cart abandonment',
		'bounce rate', 'page views', 'sessions', 'organic traffic'
	],
	
	marketing: [
		'ppc', 'seo', 'sem', 'social media marketing', 'influencer marketing',
		'email marketing', 'affiliate marketing', 'content marketing',
		'retargeting', 'lookalike audience', 'custom audience', 'pixel tracking'
	],
	
	operations: [
		'inventory management', 'drop shipping', 'fulfillment', 'logistics',
		'supply chain', 'warehousing', 'pick and pack', 'last mile delivery',
		'returns management', 'customer service', 'quality control'
	],
	
	platforms: [
		'marketplace', 'storefront', 'shopping cart', 'payment gateway',
		'checkout process', 'product catalog', 'search functionality',
		'mobile app', 'responsive design', 'user experience'
	],
	
	analytics: [
		'attribution', 'cohort analysis', 'funnel analysis', 'heat map',
		'user journey', 'segmentation', 'a/b testing', 'conversion optimization',
		'data visualization', 'predictive analytics', 'machine learning'
	]
};

// 关键词优先级权重
export const KEYWORD_WEIGHTS: Record<string, number> = {
	// 平台政策 (最高优先级)
	'policy change': 10,
	'account suspension': 10,
	'terms update': 9,
	'fee increase': 9,
	
	// 供应链问题
	'supply shortage': 8,
	'shipping delay': 8,
	'factory closure': 8,
	
	// 竞争情报
	'new competitor': 7,
	'price war': 7,
	'product launch': 6,
	
	// 市场机会
	'trending product': 6,
	'viral product': 6,
	'low competition': 5,
	
	// 技术创新
	'ai shopping': 4,
	'voice commerce': 4,
	'ar shopping': 4,
	
	// 一般新闻
	'interview': 2,
	'opinion': 1,
	'prediction': 1
};