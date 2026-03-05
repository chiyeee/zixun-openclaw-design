/**
 * 电商情报平台 TypeScript 类型定义
 */

// 基础新闻类别 (电商化)
export type NewsCategory = 
	| 'ecommerce_news'
	| 'amazon_intel' 
	| 'platform_updates'
	| 'industry_analysis'
	| 'ecommerce_tech'
	| 'supply_chain';

// 电商新闻条目
export interface EcommerceNewsItem {
	id: string;
	title: string;
	description: string;
	url: string;
	source: string;
	category: NewsCategory;
	published_date: string;
	keywords: string[];
	sentiment: 'positive' | 'negative' | 'neutral';
	urgency: 'critical' | 'high' | 'medium' | 'low';
	platforms: string[]; // Amazon, Shopify, eBay etc.
	product_categories: string[];
	regions: string[];
	analysis_score: number; // 0-100
	related_items: string[]; // Related news item IDs
}

// 市场数据项 (电商化)
export interface EcommerceMarketItem {
	symbol: string;
	name: string;
	platform: string;
	type: 'ecommerce_stock' | 'platform_metric' | 'category_index';
	price: number;
	change: number;
	change_percent: number;
	volume?: number;
	market_cap?: number;
	last_updated: string;
}

// 产品类别表现
export interface CategoryPerformance {
	category_id: string;
	category_name: string;
	amazon_node?: string;
	growth_rate: number; // YoY growth percentage
	market_size: number; // USD millions
	competition_level: 'low' | 'medium' | 'high' | 'very_high';
	avg_profit_margin: number;
	seasonal_factor: number; // -1 to 1
	trend_direction: 'up' | 'down' | 'stable';
	top_products: ProductInsight[];
}

// 产品洞察
export interface ProductInsight {
	asin?: string;
	name: string;
	brand?: string;
	category: string;
	price: number;
	price_change_30d: number;
	sales_rank?: number;
	review_count: number;
	avg_rating: number;
	availability: 'in_stock' | 'out_of_stock' | 'limited';
	competitor_count: number;
	profit_opportunity: 'high' | 'medium' | 'low';
	trend_status: 'rising' | 'falling' | 'stable';
	last_updated: string;
}

// 平台指标
export interface PlatformMetric {
	platform_id: string;
	platform_name: string;
	metric_name: string;
	metric_value: number;
	metric_unit: string;
	change_1d?: number;
	change_7d?: number;
	change_30d?: number;
	benchmark?: number;
	status: 'normal' | 'warning' | 'critical';
	description: string;
	last_updated: string;
}

// 供应链状态
export interface SupplyChainStatus {
	region: string;
	category: string;
	status: 'normal' | 'delay' | 'shortage' | 'disrupted';
	severity: 'low' | 'medium' | 'high' | 'critical';
	affected_products: string[];
	estimated_recovery_days?: number;
	alternative_sources: string[];
	price_impact_percent?: number;
	description: string;
	source_url?: string;
	reported_date: string;
}

// 竞争对手动态
export interface CompetitorActivity {
	id: string;
	competitor_name: string;
	activity_type: 'product_launch' | 'price_change' | 'promotion' | 'partnership' | 'acquisition';
	title: string;
	description: string;
	impact_level: 'low' | 'medium' | 'high' | 'critical';
	affected_categories: string[];
	market_response?: 'positive' | 'negative' | 'neutral';
	actionable_insights: string[];
	source_url?: string;
	detected_date: string;
}

// 趋势分析
export interface TrendAnalysis {
	id: string;
	trend_name: string;
	trend_type: 'product' | 'technology' | 'consumer_behavior' | 'market_shift';
	confidence_score: number; // 0-100
	growth_stage: 'emerging' | 'growing' | 'mature' | 'declining';
	market_potential: 'low' | 'medium' | 'high' | 'very_high';
	time_to_mainstream_months?: number;
	key_indicators: string[];
	supporting_data: {
		search_volume_change?: number;
		social_mentions_change?: number;
		sales_growth?: number;
		competitor_adoption?: number;
	};
	recommendations: string[];
	related_products: string[];
	geographic_spread: string[];
	detected_date: string;
	last_updated: string;
}

// 预警信息
export interface EcommerceAlert {
	id: string;
	alert_type: 'policy_change' | 'supply_disruption' | 'competitor_move' | 'trend_spike' | 'regulatory';
	severity: 'critical' | 'high' | 'medium' | 'low';
	title: string;
	description: string;
	affected_platforms: string[];
	affected_categories: string[];
	impact_timeline: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
	recommended_actions: string[];
	related_news_ids: string[];
	expires_at?: string;
	created_at: string;
	acknowledged: boolean;
}

// 分析结果
export interface AnalysisResult {
	id: string;
	analysis_type: 'correlation' | 'narrative' | 'entity' | 'sentiment' | 'trend';
	confidence: number; // 0-100
	summary: string;
	detailed_findings: string[];
	data_sources: string[];
	methodology: string;
	limitations: string[];
	created_at: string;
	expires_at?: string;
}

// 仪表板配置
export interface DashboardPanel {
	id: string;
	title: string;
	type: 'news_feed' | 'market_data' | 'alerts' | 'trends' | 'competitors' | 'analytics';
	size: 'small' | 'medium' | 'large' | 'extra_large';
	position: { x: number; y: number };
	enabled: boolean;
	refresh_interval_minutes: number;
	config: Record<string, unknown>;
}

// 用户设置 (为未来付费功能预留)
export interface UserSettings {
	user_id: string;
	notification_preferences: {
		email: boolean;
		push: boolean;
		sms: boolean;
	};
	alert_thresholds: {
		critical: boolean;
		high: boolean;
		medium: boolean;
		low: boolean;
	};
	monitored_platforms: string[];
	monitored_categories: string[];
	monitored_keywords: string[];
	dashboard_layout: DashboardPanel[];
	timezone: string;
	language: string;
	subscription_tier: 'free' | 'pro' | 'enterprise';
	created_at: string;
	last_active: string;
}

// API 响应类型
export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	timestamp: string;
	request_id: string;
}

// 分页响应
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		page: number;
		per_page: number;
		total: number;
		total_pages: number;
		has_next: boolean;
		has_prev: boolean;
	};
}

// 搜索过滤器
export interface SearchFilters {
	categories?: string[];
	platforms?: string[];
	date_from?: string;
	date_to?: string;
	sentiment?: ('positive' | 'negative' | 'neutral')[];
	urgency?: ('critical' | 'high' | 'medium' | 'low')[];
	keywords?: string[];
	sources?: string[];
	min_score?: number;
	regions?: string[];
}

// 统计数据
export interface Statistics {
	total_news_items: number;
	total_alerts: number;
	total_trends: number;
	most_active_category: string;
	most_mentioned_platform: string;
	avg_sentiment_score: number;
	data_freshness_minutes: number;
	system_health: 'healthy' | 'warning' | 'error';
	last_updated: string;
}

// 导出数据格式
export interface ExportData {
	format: 'json' | 'csv' | 'excel' | 'pdf';
	data_type: 'news' | 'alerts' | 'trends' | 'analytics' | 'all';
	filters: SearchFilters;
	generated_at: string;
	file_size_bytes?: number;
	download_url?: string;
	expires_at: string;
}

// WebSocket 事件类型
export interface WebSocketEvent {
	type: 'news_update' | 'alert_created' | 'trend_detected' | 'market_update' | 'system_status';
	data: unknown;
	timestamp: string;
	source: string;
}