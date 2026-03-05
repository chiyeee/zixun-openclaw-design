/**
 * 电商智能分析引擎配置
 * 替换地缘政治分析为电商趋势分析和竞品分析
 */

// 电商关联分析主题 (替代冲突关联)
export interface EcommerceCorrelationTopic {
	id: string;
	name: string;
	patterns: RegExp[];
	severity: 'critical' | 'high' | 'medium' | 'low';
	category: 'platform' | 'supply_chain' | 'competition' | 'trend' | 'regulatory';
	notify: boolean;
}

export const ECOMMERCE_CORRELATION_TOPICS: EcommerceCorrelationTopic[] = [
	// 平台政策变化 - 关键业务影响
	{
		id: 'amazon_policy_changes',
		name: 'Amazon政策变更',
		patterns: [
			/amazon.*policy.*chang/i,
			/seller.*agreement.*updat/i,
			/fee.*structur.*chang/i,
			/commission.*increas/i,
			/account.*suspend.*polic/i
		],
		severity: 'critical',
		category: 'platform',
		notify: true
	},

	// 供应链中断预警
	{
		id: 'supply_chain_disruption',
		name: '供应链中断预警',
		patterns: [
			/supply.*chain.*disrupt/i,
			/manufacturer.*shutdown/i,
			/shipping.*delay.*sever/i,
			/raw.*material.*shortag/i,
			/factory.*closur.*covid/i,
			/port.*congest.*caus/i
		],
		severity: 'high',
		category: 'supply_chain',
		notify: true
	},

	// 新兴产品趋势识别
	{
		id: 'trending_product_emergence',
		name: '新兴产品趋势',
		patterns: [
			/viral.*product.*emergin/i,
			/trending.*item.*social/i,
			/influencer.*promot.*produc/i,
			/tiktok.*mad.*popula/i,
			/sudden.*demand.*increas/i,
			/search.*volum.*spik/i
		],
		severity: 'medium',
		category: 'trend',
		notify: true
	},

	// 竞争对手动态监控
	{
		id: 'competitor_major_moves',
		name: '竞争对手重大动态',
		patterns: [
			/major.*competitor.*launch/i,
			/market.*leader.*acquir/i,
			/new.*player.*enter.*market/i,
			/price.*war.*start/i,
			/exclusiv.*deal.*sign/i,
			/patent.*lawsuit.*fil/i
		],
		severity: 'high',
		category: 'competition',
		notify: true
	},

	// 平台算法更新
	{
		id: 'algorithm_updates',
		name: '平台算法更新',
		patterns: [
			/amazon.*algorithm.*updat/i,
			/search.*rank.*chang/i,
			/buy.*box.*algorithm/i,
			/organic.*result.*affect/i,
			/seo.*ranking.*factor/i,
			/google.*shopping.*updat/i
		],
		severity: 'high',
		category: 'platform',
		notify: true
	},

	// 监管和合规变化
	{
		id: 'regulatory_compliance',
		name: '监管合规变化',
		patterns: [
			/product.*safety.*regulat/i,
			/consumer.*protect.*law/i,
			/import.*restrict.*new/i,
			/tariff.*chang.*affect/i,
			/tax.*polic.*ecommerc/i,
			/gdpr.*compliance.*requir/i
		],
		severity: 'high',
		category: 'regulatory',
		notify: true
	},

	// 季节性趋势分析
	{
		id: 'seasonal_trends',
		name: '季节性趋势变化',
		patterns: [
			/holiday.*shopping.*trend/i,
			/black.*friday.*prepare/i,
			/back.*to.*school.*season/i,
			/summer.*product.*demand/i,
			/winter.*item.*popular/i,
			/gift.*guid.*trend/i
		],
		severity: 'medium',
		category: 'trend',
		notify: false
	},

	// 支付和金融变化
	{
		id: 'payment_fintech_changes',
		name: '支付金融科技变化',
		patterns: [
			/payment.*method.*new/i,
			/cryptocurrency.*payment/i,
			/buy.*now.*pay.*later/i,
			/digital.*wallet.*adopt/i,
			/fintech.*ecommerce.*partner/i,
			/payment.*processor.*chang/i
		],
		severity: 'medium',
		category: 'platform',
		notify: false
	},

	// 技术创新影响
	{
		id: 'tech_innovation_impact',
		name: '技术创新对电商影响',
		patterns: [
			/ai.*personaliz.*shopping/i,
			/voice.*commerce.*growth/i,
			/ar.*vr.*shopping.*experi/i,
			/chatbot.*customer.*servic/i,
			/blockchain.*supply.*chain/i,
			/iot.*smart.*commerce/i
		],
		severity: 'medium',
		category: 'trend',
		notify: false
	},

	// 社交商务发展
	{
		id: 'social_commerce_evolution',
		name: '社交商务演进',
		patterns: [
			/social.*media.*shopping/i,
			/instagram.*shopping.*featur/i,
			/tiktok.*commerce.*launch/i,
			/live.*streaming.*sell/i,
			/influencer.*marketplace/i,
			/user.*generat.*content.*shop/i
		],
		severity: 'medium',
		category: 'trend',
		notify: false
	}
];

// 电商叙事演进模式 (替代政治叙事)
export interface EcommerceNarrativePattern {
	id: string;
	name: string;
	description: string;
	stages: string[];
	indicators: RegExp[];
	severity_progression: ('low' | 'medium' | 'high' | 'critical')[];
}

export const ECOMMERCE_NARRATIVE_PATTERNS: EcommerceNarrativePattern[] = [
	{
		id: 'product_viral_cycle',
		name: '产品病毒式传播周期',
		description: '产品从小众到主流的传播路径分析',
		stages: ['小众发现', '影响者推荐', '社交媒体传播', '主流媒体报道', '市场饱和'],
		indicators: [
			/niche.*community.*discover/i,
			/influencer.*review.*recommend/i,
			/social.*media.*viral.*spread/i,
			/mainstream.*media.*cover/i,
			/market.*saturation.*reach/i
		],
		severity_progression: ['low', 'medium', 'high', 'high', 'medium']
	},

	{
		id: 'competitor_disruption_cycle',
		name: '竞争对手颠覆周期',
		description: '新竞争者进入市场的典型模式',
		stages: ['市场进入', '价格竞争', '功能差异化', '市场份额争夺', '市场重新平衡'],
		indicators: [
			/new.*competitor.*enter.*market/i,
			/price.*war.*compet.*start/i,
			/unique.*feature.*different/i,
			/market.*share.*battl/i,
			/competitive.*landscap.*stabl/i
		],
		severity_progression: ['medium', 'high', 'medium', 'high', 'low']
	},

	{
		id: 'platform_policy_reaction',
		name: '平台政策反应链',
		description: '平台政策变化引发的连锁反应分析',
		stages: ['政策宣布', '卖家反应', '市场调整', '竞争重构', '新平衡'],
		indicators: [
			/platform.*announc.*policy.*chang/i,
			/seller.*react.*concern.*express/i,
			/market.*adjust.*strategy.*shift/i,
			/competitive.*advantag.*shift/i,
			/new.*equilibrium.*establish/i
		],
		severity_progression: ['high', 'medium', 'medium', 'high', 'low']
	},

	{
		id: 'supply_crisis_evolution',
		name: '供应危机演进模式',
		description: '供应链问题的发展和解决过程',
		stages: ['初始短缺', '价格上涨', '替代方案寻找', '供应多元化', '危机解决'],
		indicators: [
			/supply.*shortag.*report/i,
			/price.*increas.*supply.*chain/i,
			/alternativ.*supplier.*seek/i,
			/diversif.*supply.*sourc/i,
			/supply.*chain.*stabil.*restor/i
		],
		severity_progression: ['medium', 'high', 'high', 'medium', 'low']
	}
];

// 电商实体识别模式 (替代政治人物)
export interface EcommerceEntityPattern {
	type: 'company' | 'platform' | 'brand' | 'product' | 'executive' | 'influencer';
	patterns: RegExp[];
	importance_indicators: RegExp[];
}

export const ECOMMERCE_ENTITY_PATTERNS: Record<string, EcommerceEntityPattern> = {
	ecommerce_platforms: {
		type: 'platform',
		patterns: [
			/\b(Amazon|Shopify|eBay|Etsy|BigCommerce|WooCommerce|Magento)\b/gi,
			/\b(Alibaba|AliExpress|DHgate|Wish|Temu|Shein)\b/gi,
			/\b(Shopee|Lazada|Tokopedia|Mercado\s?Libre)\b/gi
		],
		importance_indicators: [
			/CEO.*announc/i,
			/platform.*updat/i,
			/policy.*chang/i,
			/acquisition.*deal/i,
			/earning.*report/i
		]
	},

	ecommerce_brands: {
		type: 'brand',
		patterns: [
			/\b(Apple|Samsung|Nike|Adidas|Zara|H&M|Uniqlo)\b/gi,
			/\b(Anker|RAVPower|Aukey|TaoTronics|Mpow)\b/gi,
			/\b(Private\s?Label|Amazon\s?Basics|Kirkland)\b/gi
		],
		importance_indicators: [
			/product.*launch/i,
			/brand.*partnership/i,
			/exclusiv.*deal/i,
			/trademark.*lawsuit/i,
			/counterfeit.*issue/i
		]
	},

	ecommerce_executives: {
		type: 'executive',
		patterns: [
			/Jeff\s+Bezos/gi,
			/Andy\s+Jassy/gi,
			/Tobias\s+Lütke/gi,
			/Jack\s+Ma/gi,
			/Daniel\s+Zhang/gi
		],
		importance_indicators: [
			/CEO.*statement/i,
			/executive.*interview/i,
			/leadership.*chang/i,
			/strategic.*vision/i,
			/company.*direction/i
		]
	},

	ecommerce_influencers: {
		type: 'influencer',
		patterns: [
			/\@[a-zA-Z0-9_]{3,}/g, // Social media handles
			/influencer/gi,
			/content\s+creator/gi,
			/brand\s+ambassador/gi
		],
		importance_indicators: [
			/viral.*post/i,
			/product.*review/i,
			/brand.*collaboration/i,
			/follower.*count/i,
			/engagement.*rate/i
		]
	},

	product_categories: {
		type: 'product',
		patterns: [
			/\b(iPhone|Galaxy|MacBook|Surface|iPad|AirPods)\b/gi,
			/\b(Nike\s+Air|Adidas\s+Ultra|Jordan|Yeezy)\b/gi,
			/\b(Echo|Alexa|Google\s+Home|Nest)\b/gi
		],
		importance_indicators: [
			/best.*seller/i,
			/trending.*product/i,
			/out.*of.*stock/i,
			/price.*drop/i,
			/limited.*edition/i
		]
	},

	ecommerce_tools: {
		type: 'company',
		patterns: [
			/\b(Jungle\s?Scout|Helium\s?10|Keepa|CamelCamelCamel)\b/gi,
			/\b(Klaviyo|Mailchimp|Gorgias|Zendesk)\b/gi,
			/\b(Oberlo|Spocket|Printful|Gooten)\b/gi
		],
		importance_indicators: [
			/tool.*updat/i,
			/new.*featur/i,
			/pricing.*chang/i,
			/integration.*launch/i,
			/user.*growth/i
		]
	}
};

// 电商分析严重程度配置
export const SEVERITY_CONFIG = {
	critical: {
		weight: 10,
		color: '#dc2626', // red-600
		notify: true,
		email: true,
		retention_hours: 168 // 7 days
	},
	high: {
		weight: 7,
		color: '#ea580c', // orange-600
		notify: true,
		email: false,
		retention_hours: 72 // 3 days
	},
	medium: {
		weight: 4,
		color: '#ca8a04', // yellow-600
		notify: false,
		email: false,
		retention_hours: 48 // 2 days
	},
	low: {
		weight: 1,
		color: '#65a30d', // lime-600
		notify: false,
		email: false,
		retention_hours: 24 // 1 day
	}
};

// 电商分析权重系数
export const ANALYSIS_WEIGHTS = {
	// 内容来源权重
	source_authority: {
		'Digital Commerce 360': 0.9,
		'Marketplace Pulse': 0.85,
		'eCommerce Times': 0.8,
		'Practical Ecommerce': 0.8,
		'TechCrunch': 0.75,
		'VentureBeat': 0.7,
		'Reddit': 0.6,
		'Twitter': 0.5,
		'Blog': 0.4,
		'Unknown': 0.3
	},

	// 关键词类别权重
	keyword_category: {
		platform_policy: 1.0,
		supply_chain: 0.9,
		competition: 0.8,
		trend: 0.7,
		regulatory: 0.9,
		technology: 0.6,
		seasonal: 0.5
	},

	// 时间敏感度权重
	time_sensitivity: {
		'breaking': 1.0,
		'urgent': 0.9,
		'important': 0.8,
		'regular': 0.7,
		'archived': 0.3
	},

	// 影响范围权重
	impact_scope: {
		'global': 1.0,
		'multi_platform': 0.9,
		'single_platform': 0.8,
		'category_specific': 0.7,
		'niche': 0.5,
		'local': 0.4
	}
};