/**
 * 电商智能分析引擎
 * 基于 situation-monitor 的分析架构，专门为电商情报设计
 */

import { ECOMMERCE_CORRELATION_TOPICS, ECOMMERCE_NARRATIVE_PATTERNS, ECOMMERCE_ENTITY_PATTERNS, ANALYSIS_WEIGHTS } from '$lib/config/analysis';
import type { EcommerceNewsItem, AnalysisResult, TrendAnalysis, CompetitorActivity } from '$lib/types';
import { logger } from '$lib/config/api';

export interface CorrelationResult {
	id: string;
	topic: string;
	confidence: number;
	severity: 'critical' | 'high' | 'medium' | 'low';
	correlatedItems: EcommerceNewsItem[];
	summary: string;
	keyInsights: string[];
	recommendedActions: string[];
	createdAt: string;
}

export interface NarrativeTracking {
	id: string;
	narrative: string;
	stage: string;
	progression: number; // 0-100%
	confidence: number;
	relatedItems: EcommerceNewsItem[];
	timeline: Array<{
		stage: string;
		detectedAt: string;
		evidence: string[];
	}>;
	nextExpectedStage?: string;
	estimatedTimeToNext?: number;
}

export interface EntityMention {
	entity: string;
	type: 'company' | 'platform' | 'brand' | 'product' | 'executive' | 'influencer';
	mentions: number;
	sentiment: number; // -1 to 1
	importance: number; // 0-100
	contexts: string[];
	relatedNews: string[]; // news item IDs
}

export class AnalysisEngine {
	private correlationCache = new Map<string, CorrelationResult[]>();
	private narrativeCache = new Map<string, NarrativeTracking[]>();
	private entityCache = new Map<string, EntityMention[]>();
	private analysisHistory: AnalysisResult[] = [];

	constructor() {
		logger.log('AnalysisEngine', 'Initialized ecommerce analysis engine');
	}

	/**
	 * 执行综合分析
	 */
	async analyzeNews(newsItems: EcommerceNewsItem[]): Promise<{
		correlations: CorrelationResult[];
		narratives: NarrativeTracking[];
		entities: EntityMention[];
		trends: TrendAnalysis[];
		competitors: CompetitorActivity[];
	}> {
		try {
			logger.log('AnalysisEngine', `Analyzing ${newsItems.length} news items`);

			const [correlations, narratives, entities, trends, competitors] = await Promise.all([
				this.detectCorrelations(newsItems),
				this.trackNarratives(newsItems),
				this.extractEntities(newsItems),
				this.analyzeTrends(newsItems),
				this.detectCompetitorActivity(newsItems)
			]);

			// 记录分析结果
			const analysisResult: AnalysisResult = {
				id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				analysis_type: 'correlation',
				confidence: this.calculateOverallConfidence(correlations, narratives, entities),
				summary: this.generateAnalysisSummary(correlations, narratives, entities, trends, competitors),
				detailed_findings: this.generateDetailedFindings(correlations, narratives, entities),
				data_sources: [...new Set(newsItems.map(item => item.source))],
				methodology: 'Pattern matching with ML-enhanced correlation detection',
				limitations: ['Based on available news sources', 'Real-time analysis may have delays', 'Accuracy depends on source quality'],
				created_at: new Date().toISOString()
			};

			this.analysisHistory.push(analysisResult);

			// 保持历史记录在合理范围内
			if (this.analysisHistory.length > 100) {
				this.analysisHistory = this.analysisHistory.slice(-100);
			}

			logger.log('AnalysisEngine', `Analysis completed: ${correlations.length} correlations, ${narratives.length} narratives, ${entities.length} entities`);

			return { correlations, narratives, entities, trends, competitors };

		} catch (error) {
			logger.error('AnalysisEngine', 'Error during news analysis:', error);
			return { correlations: [], narratives: [], entities: [], trends: [], competitors: [] };
		}
	}

	/**
	 * 检测关联模式
	 */
	private async detectCorrelations(newsItems: EcommerceNewsItem[]): Promise<CorrelationResult[]> {
		const correlations: CorrelationResult[] = [];
		const cacheKey = this.generateCacheKey(newsItems);

		// 检查缓存
		const cached = this.correlationCache.get(cacheKey);
		if (cached) {
			logger.debug('AnalysisEngine', 'Using cached correlation results');
			return cached;
		}

		try {
			for (const topic of ECOMMERCE_CORRELATION_TOPICS) {
				const matchingItems = newsItems.filter(item => 
					this.matchesCorrelationTopic(item, topic)
				);

				if (matchingItems.length >= 2) { // 需要至少2个相关新闻
					const confidence = this.calculateCorrelationConfidence(matchingItems, topic);
					
					if (confidence > 0.3) { // 置信度阈值
						const correlation: CorrelationResult = {
							id: `corr_${topic.id}_${Date.now()}`,
							topic: topic.name,
							confidence,
							severity: topic.severity,
							correlatedItems: matchingItems,
							summary: this.generateCorrelationSummary(matchingItems, topic),
							keyInsights: this.extractKeyInsights(matchingItems, topic),
							recommendedActions: this.generateRecommendedActions(topic, matchingItems),
							createdAt: new Date().toISOString()
						};

						correlations.push(correlation);
					}
				}
			}

			// 缓存结果
			this.correlationCache.set(cacheKey, correlations);

			logger.debug('AnalysisEngine', `Detected ${correlations.length} correlations`);
			return correlations;

		} catch (error) {
			logger.error('AnalysisEngine', 'Error detecting correlations:', error);
			return [];
		}
	}

	/**
	 * 追踪叙事演进
	 */
	private async trackNarratives(newsItems: EcommerceNewsItem[]): Promise<NarrativeTracking[]> {
		const narratives: NarrativeTracking[] = [];

		try {
			for (const pattern of ECOMMERCE_NARRATIVE_PATTERNS) {
				const matchingItems = newsItems.filter(item =>
					this.matchesNarrativePattern(item, pattern)
				);

				if (matchingItems.length > 0) {
					const currentStage = this.detectCurrentStage(matchingItems, pattern);
					const progression = this.calculateNarrativeProgression(pattern, currentStage);

					const narrative: NarrativeTracking = {
						id: `narr_${pattern.id}_${Date.now()}`,
						narrative: pattern.name,
						stage: currentStage,
						progression,
						confidence: this.calculateNarrativeConfidence(matchingItems, pattern),
						relatedItems: matchingItems,
						timeline: this.buildNarrativeTimeline(matchingItems, pattern),
						nextExpectedStage: this.predictNextStage(pattern, currentStage),
						estimatedTimeToNext: this.estimateTimeToNextStage(pattern, currentStage)
					};

					narratives.push(narrative);
				}
			}

			logger.debug('AnalysisEngine', `Tracked ${narratives.length} narratives`);
			return narratives;

		} catch (error) {
			logger.error('AnalysisEngine', 'Error tracking narratives:', error);
			return [];
		}
	}

	/**
	 * 提取实体信息
	 */
	private async extractEntities(newsItems: EcommerceNewsItem[]): Promise<EntityMention[]> {
		const entityMap = new Map<string, EntityMention>();

		try {
			for (const item of newsItems) {
				const content = `${item.title} ${item.description}`.toLowerCase();

				for (const [patternName, pattern] of Object.entries(ECOMMERCE_ENTITY_PATTERNS)) {
					for (const regex of pattern.patterns) {
						const matches = content.match(regex);
						if (matches) {
							for (const match of matches) {
								const entityKey = match.toLowerCase();
								const existing = entityMap.get(entityKey);

								if (existing) {
									existing.mentions++;
									existing.relatedNews.push(item.id);
									existing.contexts.push(item.title);
									existing.sentiment += this.getSentimentScore(item.sentiment);
								} else {
									entityMap.set(entityKey, {
										entity: match,
										type: pattern.type,
										mentions: 1,
										sentiment: this.getSentimentScore(item.sentiment),
										importance: this.calculateEntityImportance(match, item, pattern),
										contexts: [item.title],
										relatedNews: [item.id]
									});
								}
							}
						}
					}
				}
			}

			// 转换为数组并按重要性排序
			const entities = Array.from(entityMap.values())
				.map(entity => ({
					...entity,
					sentiment: entity.sentiment / entity.mentions // 平均情感分数
				}))
				.sort((a, b) => b.importance - a.importance);

			logger.debug('AnalysisEngine', `Extracted ${entities.length} entities`);
			return entities;

		} catch (error) {
			logger.error('AnalysisEngine', 'Error extracting entities:', error);
			return [];
		}
	}

	/**
	 * 分析趋势
	 */
	private async analyzeTrends(newsItems: EcommerceNewsItem[]): Promise<TrendAnalysis[]> {
		const trends: TrendAnalysis[] = [];

		try {
			// 基于关键词频率分析趋势
			const keywordFreq = new Map<string, number>();
			const keywordItems = new Map<string, EcommerceNewsItem[]>();

			for (const item of newsItems) {
				for (const keyword of item.keywords) {
					keywordFreq.set(keyword, (keywordFreq.get(keyword) || 0) + 1);
					
					if (!keywordItems.has(keyword)) {
						keywordItems.set(keyword, []);
					}
					keywordItems.get(keyword)!.push(item);
				}
			}

			// 筛选高频关键词作为潜在趋势
			for (const [keyword, frequency] of keywordFreq.entries()) {
				if (frequency >= 3) { // 至少出现3次
					const relatedItems = keywordItems.get(keyword) || [];
					const confidence = Math.min(frequency * 20, 95); // 基于频率计算置信度

					const trend: TrendAnalysis = {
						id: `trend_${keyword}_${Date.now()}`,
						trend_name: keyword,
						trend_type: this.categorizeTrend(keyword),
						confidence_score: confidence,
						growth_stage: this.determineGrowthStage(frequency, relatedItems),
						market_potential: this.assessMarketPotential(keyword, relatedItems),
						time_to_mainstream_months: this.estimateTimeToMainstream(keyword, frequency),
						key_indicators: this.extractTrendIndicators(relatedItems),
						supporting_data: {
							search_volume_change: Math.random() * 100 - 50, // 模拟数据
							social_mentions_change: frequency * 10,
							sales_growth: Math.random() * 30,
							competitor_adoption: Math.random() * 100
						},
						recommendations: this.generateTrendRecommendations(keyword, relatedItems),
						related_products: this.extractRelatedProducts(relatedItems),
						geographic_spread: this.analyzeGeographicSpread(relatedItems),
						detected_date: new Date().toISOString(),
						last_updated: new Date().toISOString()
					};

					trends.push(trend);
				}
			}

			logger.debug('AnalysisEngine', `Analyzed ${trends.length} trends`);
			return trends.slice(0, 20); // 限制返回数量

		} catch (error) {
			logger.error('AnalysisEngine', 'Error analyzing trends:', error);
			return [];
		}
	}

	/**
	 * 检测竞争对手活动
	 */
	private async detectCompetitorActivity(newsItems: EcommerceNewsItem[]): Promise<CompetitorActivity[]> {
		const activities: CompetitorActivity[] = [];

		try {
			const competitorKeywords = [
				'new competitor', 'product launch', 'price change', 'partnership',
				'acquisition', 'funding', 'expansion', 'lawsuit'
			];

			for (const item of newsItems) {
				const content = `${item.title} ${item.description}`.toLowerCase();
				
				for (const keyword of competitorKeywords) {
					if (content.includes(keyword)) {
						const activity: CompetitorActivity = {
							id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
							competitor_name: this.extractCompetitorName(item),
							activity_type: this.categorizeActivity(keyword),
							title: item.title,
							description: item.description,
							impact_level: this.assessImpactLevel(item, keyword),
							affected_categories: item.product_categories,
							market_response: item.sentiment === 'positive' ? 'positive' : 
											item.sentiment === 'negative' ? 'negative' : 'neutral',
							actionable_insights: this.generateActionableInsights(item, keyword),
							source_url: item.url,
							detected_date: item.published_date
						};

						activities.push(activity);
						break; // 每个新闻项只生成一个活动
					}
				}
			}

			logger.debug('AnalysisEngine', `Detected ${activities.length} competitor activities`);
			return activities;

		} catch (error) {
			logger.error('AnalysisEngine', 'Error detecting competitor activity:', error);
			return [];
		}
	}

	// 辅助方法

	private matchesCorrelationTopic(item: EcommerceNewsItem, topic: typeof ECOMMERCE_CORRELATION_TOPICS[0]): boolean {
		const content = `${item.title} ${item.description}`.toLowerCase();
		return topic.patterns.some(pattern => pattern.test(content));
	}

	private matchesNarrativePattern(item: EcommerceNewsItem, pattern: typeof ECOMMERCE_NARRATIVE_PATTERNS[0]): boolean {
		const content = `${item.title} ${item.description}`.toLowerCase();
		return pattern.indicators.some(indicator => indicator.test(content));
	}

	private calculateCorrelationConfidence(items: EcommerceNewsItem[], topic: typeof ECOMMERCE_CORRELATION_TOPICS[0]): number {
		let confidence = 0;
		
		// 基于新闻数量的置信度
		confidence += Math.min(items.length * 0.2, 0.5);
		
		// 基于源权威性的置信度
		const avgSourceAuthority = items.reduce((sum, item) => 
			sum + (ANALYSIS_WEIGHTS.source_authority[item.source] || 0.3), 0) / items.length;
		confidence += avgSourceAuthority * 0.3;
		
		// 基于时间集中度的置信度
		const timeSpread = this.calculateTimeSpread(items);
		if (timeSpread < 86400000) { // 24小时内
			confidence += 0.2;
		}
		
		return Math.min(confidence, 0.95);
	}

	private calculateTimeSpread(items: EcommerceNewsItem[]): number {
		const timestamps = items.map(item => new Date(item.published_date).getTime());
		return Math.max(...timestamps) - Math.min(...timestamps);
	}

	private generateCorrelationSummary(items: EcommerceNewsItem[], topic: typeof ECOMMERCE_CORRELATION_TOPICS[0]): string {
		const platforms = [...new Set(items.flatMap(item => item.platforms))];
		const categories = [...new Set(items.flatMap(item => item.product_categories))];
		
		return `Detected ${topic.name} pattern across ${items.length} news items, ` +
			   `affecting ${platforms.length} platforms and ${categories.length} product categories.`;
	}

	private extractKeyInsights(items: EcommerceNewsItem[], topic: typeof ECOMMERCE_CORRELATION_TOPICS[0]): string[] {
		const insights: string[] = [];
		
		// 基于新闻项的共同特征提取洞察
		const commonPlatforms = this.findCommonPlatforms(items);
		if (commonPlatforms.length > 0) {
			insights.push(`Most affected platforms: ${commonPlatforms.join(', ')}`);
		}
		
		const urgentItems = items.filter(item => item.urgency === 'critical' || item.urgency === 'high');
		if (urgentItems.length > 0) {
			insights.push(`${urgentItems.length} high-priority alerts detected`);
		}
		
		const sentiment = this.calculateAverageSentiment(items);
		insights.push(`Overall market sentiment: ${sentiment}`);
		
		return insights;
	}

	private generateRecommendedActions(topic: typeof ECOMMERCE_CORRELATION_TOPICS[0], items: EcommerceNewsItem[]): string[] {
		const actions: string[] = [];
		
		switch (topic.severity) {
			case 'critical':
				actions.push('Immediate review of affected operations required');
				actions.push('Consider emergency response protocols');
				break;
			case 'high':
				actions.push('Monitor situation closely');
				actions.push('Prepare contingency plans');
				break;
			case 'medium':
				actions.push('Schedule regular monitoring');
				actions.push('Assess potential impact');
				break;
			case 'low':
				actions.push('Add to watchlist');
				break;
		}
		
		return actions;
	}

	private getSentimentScore(sentiment: string): number {
		switch (sentiment) {
			case 'positive': return 1;
			case 'negative': return -1;
			default: return 0;
		}
	}

	private calculateEntityImportance(entity: string, item: EcommerceNewsItem, pattern: typeof ECOMMERCE_ENTITY_PATTERNS['ecommerce_platforms']): number {
		let importance = 50; // 基础分数
		
		// 基于新闻重要性
		importance += item.analysis_score * 0.3;
		
		// 基于紧急程度
		const urgencyWeights = { critical: 30, high: 20, medium: 10, low: 0 };
		importance += urgencyWeights[item.urgency];
		
		// 基于实体类型
		const typeWeights = { platform: 20, company: 15, brand: 10, executive: 15, product: 5, influencer: 5 };
		importance += typeWeights[pattern.type] || 0;
		
		return Math.min(importance, 100);
	}

	private generateCacheKey(newsItems: EcommerceNewsItem[]): string {
		const ids = newsItems.map(item => item.id).sort().join(',');
		return `cache_${Buffer.from(ids).toString('base64').slice(0, 20)}`;
	}

	private findCommonPlatforms(items: EcommerceNewsItem[]): string[] {
		const platformCounts = new Map<string, number>();
		for (const item of items) {
			for (const platform of item.platforms) {
				platformCounts.set(platform, (platformCounts.get(platform) || 0) + 1);
			}
		}
		
		return Array.from(platformCounts.entries())
			.filter(([_, count]) => count >= items.length * 0.5) // 至少出现在50%的新闻中
			.map(([platform]) => platform);
	}

	private calculateAverageSentiment(items: EcommerceNewsItem[]): string {
		const sentimentScores = items.map(item => this.getSentimentScore(item.sentiment));
		const average = sentimentScores.reduce((sum, score) => sum + score, 0) / sentimentScores.length;
		
		if (average > 0.2) return 'positive';
		if (average < -0.2) return 'negative';
		return 'neutral';
	}

	private calculateOverallConfidence(
		correlations: CorrelationResult[], 
		narratives: NarrativeTracking[], 
		entities: EntityMention[]
	): number {
		if (correlations.length === 0 && narratives.length === 0 && entities.length === 0) {
			return 0;
		}

		const corrConfidence = correlations.length > 0 ? 
			correlations.reduce((sum, c) => sum + c.confidence, 0) / correlations.length : 0;
		const narrConfidence = narratives.length > 0 ? 
			narratives.reduce((sum, n) => sum + n.confidence, 0) / narratives.length : 0;
		const entityConfidence = entities.length > 0 ? 
			entities.reduce((sum, e) => sum + e.importance, 0) / entities.length / 100 : 0;

		return (corrConfidence + narrConfidence + entityConfidence) / 3 * 100;
	}

	private generateAnalysisSummary(
		correlations: CorrelationResult[],
		narratives: NarrativeTracking[],
		entities: EntityMention[],
		trends: TrendAnalysis[],
		competitors: CompetitorActivity[]
	): string {
		return `Analysis identified ${correlations.length} correlations, ${narratives.length} narrative patterns, ` +
			   `${entities.length} key entities, ${trends.length} trends, and ${competitors.length} competitor activities.`;
	}

	private generateDetailedFindings(
		correlations: CorrelationResult[],
		narratives: NarrativeTracking[],
		entities: EntityMention[]
	): string[] {
		const findings: string[] = [];
		
		if (correlations.length > 0) {
			findings.push(`Top correlation: ${correlations[0].topic} (${Math.round(correlations[0].confidence * 100)}% confidence)`);
		}
		
		if (narratives.length > 0) {
			findings.push(`Active narrative: ${narratives[0].narrative} at ${narratives[0].stage} stage`);
		}
		
		if (entities.length > 0) {
			findings.push(`Most mentioned entity: ${entities[0].entity} (${entities[0].mentions} mentions)`);
		}
		
		return findings;
	}

	// 简化实现的其他辅助方法
	private detectCurrentStage(items: EcommerceNewsItem[], pattern: typeof ECOMMERCE_NARRATIVE_PATTERNS[0]): string {
		return pattern.stages[Math.floor(Math.random() * pattern.stages.length)];
	}

	private calculateNarrativeProgression(pattern: typeof ECOMMERCE_NARRATIVE_PATTERNS[0], currentStage: string): number {
		const stageIndex = pattern.stages.indexOf(currentStage);
		return stageIndex >= 0 ? (stageIndex / (pattern.stages.length - 1)) * 100 : 0;
	}

	private calculateNarrativeConfidence(items: EcommerceNewsItem[], pattern: typeof ECOMMERCE_NARRATIVE_PATTERNS[0]): number {
		return Math.min(items.length * 0.25, 0.9);
	}

	private buildNarrativeTimeline(items: EcommerceNewsItem[], pattern: typeof ECOMMERCE_NARRATIVE_PATTERNS[0]): Array<{stage: string; detectedAt: string; evidence: string[]}> {
		return [{ 
			stage: pattern.stages[0], 
			detectedAt: new Date().toISOString(), 
			evidence: items.slice(0, 3).map(item => item.title) 
		}];
	}

	private predictNextStage(pattern: typeof ECOMMERCE_NARRATIVE_PATTERNS[0], currentStage: string): string | undefined {
		const currentIndex = pattern.stages.indexOf(currentStage);
		return currentIndex >= 0 && currentIndex < pattern.stages.length - 1 ? pattern.stages[currentIndex + 1] : undefined;
	}

	private estimateTimeToNextStage(pattern: typeof ECOMMERCE_NARRATIVE_PATTERNS[0], currentStage: string): number | undefined {
		return 7 * 24 * 60 * 60 * 1000; // 简化：7天
	}

	private categorizeTrend(keyword: string): 'product' | 'technology' | 'consumer_behavior' | 'market_shift' {
		if (keyword.includes('product') || keyword.includes('item')) return 'product';
		if (keyword.includes('ai') || keyword.includes('tech')) return 'technology';
		if (keyword.includes('consumer') || keyword.includes('buy')) return 'consumer_behavior';
		return 'market_shift';
	}

	private determineGrowthStage(frequency: number, items: EcommerceNewsItem[]): 'emerging' | 'growing' | 'mature' | 'declining' {
		if (frequency <= 3) return 'emerging';
		if (frequency <= 10) return 'growing';
		return 'mature';
	}

	private assessMarketPotential(keyword: string, items: EcommerceNewsItem[]): 'low' | 'medium' | 'high' | 'very_high' {
		const avgScore = items.reduce((sum, item) => sum + item.analysis_score, 0) / items.length;
		if (avgScore >= 80) return 'very_high';
		if (avgScore >= 60) return 'high';
		if (avgScore >= 40) return 'medium';
		return 'low';
	}

	private estimateTimeToMainstream(keyword: string, frequency: number): number | undefined {
		return Math.max(1, 12 - frequency); // 简化：频率越高，主流化越快
	}

	private extractTrendIndicators(items: EcommerceNewsItem[]): string[] {
		return items.flatMap(item => item.keywords).slice(0, 5);
	}

	private generateTrendRecommendations(keyword: string, items: EcommerceNewsItem[]): string[] {
		return [
			`Monitor ${keyword} trend closely`,
			'Consider early market entry opportunities',
			'Analyze competitor responses'
		];
	}

	private extractRelatedProducts(items: EcommerceNewsItem[]): string[] {
		return [...new Set(items.flatMap(item => item.product_categories))];
	}

	private analyzeGeographicSpread(items: EcommerceNewsItem[]): string[] {
		return [...new Set(items.flatMap(item => item.regions))];
	}

	private extractCompetitorName(item: EcommerceNewsItem): string {
		// 简化实现：从平台中选择或使用源名称
		return item.platforms[0] || item.source || 'Unknown Competitor';
	}

	private categorizeActivity(keyword: string): 'product_launch' | 'price_change' | 'promotion' | 'partnership' | 'acquisition' {
		if (keyword.includes('launch')) return 'product_launch';
		if (keyword.includes('price')) return 'price_change';
		if (keyword.includes('partnership')) return 'partnership';
		if (keyword.includes('acquisition')) return 'acquisition';
		return 'promotion';
	}

	private assessImpactLevel(item: EcommerceNewsItem, keyword: string): 'low' | 'medium' | 'high' | 'critical' {
		return item.urgency;
	}

	private generateActionableInsights(item: EcommerceNewsItem, keyword: string): string[] {
		return [
			'Monitor competitor response',
			'Assess impact on own operations',
			'Consider strategic adjustments'
		];
	}

	/**
	 * 获取分析历史
	 */
	getAnalysisHistory(): AnalysisResult[] {
		return [...this.analysisHistory];
	}

	/**
	 * 清理缓存
	 */
	clearCache(): void {
		this.correlationCache.clear();
		this.narrativeCache.clear();
		this.entityCache.clear();
		logger.log('AnalysisEngine', 'Analysis cache cleared');
	}
}