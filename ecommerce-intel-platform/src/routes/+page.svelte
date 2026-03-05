<script lang="ts">
	import { onMount } from 'svelte';
	import { 
		newsItems, 
		isLoading as newsLoading, 
		criticalNews, 
		newsStats, 
		loadNews 
	} from '$lib/stores/news';
	import { 
		stockData, 
		marketStats, 
		marketSentiment, 
		marketStatus, 
		isLoading as marketsLoading, 
		loadMarketData 
	} from '$lib/stores/markets';

	onMount(() => {
		// 确保数据已加载
		loadNews();
		loadMarketData();
	});

	// 格式化数字显示
	function formatNumber(num: number): string {
		if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
		if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
		if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
		return num.toFixed(0);
	}

	// 格式化百分比
	function formatPercent(num: number): string {
		return (num >= 0 ? '+' : '') + num.toFixed(2) + '%';
	}

	// 格式化时间
	function formatTime(date: string): string {
		const d = new Date(date);
		const now = new Date();
		const diff = now.getTime() - d.getTime();
		
		if (diff < 60000) return '刚刚';
		if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
		if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
		return Math.floor(diff / 86400000) + '天前';
	}
</script>

<svelte:head>
	<title>仪表板 - 全球电商智能情报平台</title>
	<meta name="description" content="实时监控全球电商市场动态、新闻情报和数据分析" />
</svelte:head>

<div class="dashboard fade-in">
	<div class="dashboard-header">
		<h1 class="dashboard-title gradient-text">智能仪表板</h1>
		<p class="dashboard-subtitle">实时监控全球电商市场动态与智能分析</p>
	</div>

	<!-- 关键指标概览 -->
	<div class="metrics-grid">
		<div class="metric-card card">
			<div class="metric-header">
				<span class="metric-icon">📰</span>
				<div>
					<h3 class="metric-title">实时新闻</h3>
					<p class="metric-subtitle">今日情报更新</p>
				</div>
			</div>
			<div class="metric-value">
				{#if $newsLoading}
					<div class="spinner"></div>
				{:else}
					<span class="stat-number">{$newsStats.total}</span>
					<span class="stat-label">条新闻</span>
				{/if}
			</div>
			<div class="metric-breakdown">
				<div class="breakdown-item">
					<span class="breakdown-label">高优先级</span>
					<span class="breakdown-value badge-danger">{$newsStats.byUrgency?.high || 0}</span>
				</div>
				<div class="breakdown-item">
					<span class="breakdown-label">关键警报</span>
					<span class="breakdown-value badge-warning">{$newsStats.byUrgency?.critical || 0}</span>
				</div>
			</div>
		</div>

		<div class="metric-card card">
			<div class="metric-header">
				<span class="metric-icon">📈</span>
				<div>
					<h3 class="metric-title">市场状态</h3>
					<p class="metric-subtitle">{$marketStatus}</p>
				</div>
			</div>
			<div class="metric-value">
				{#if $marketsLoading}
					<div class="spinner"></div>
				{:else}
					<span class="stat-number {$marketSentiment === 'bullish' ? 'positive' : $marketSentiment === 'bearish' ? 'negative' : 'neutral'}">
						{$marketSentiment === 'bullish' ? '看涨' : $marketSentiment === 'bearish' ? '看跌' : '中性'}
					</span>
					<span class="stat-label">市场情绪</span>
				{/if}
			</div>
			<div class="metric-breakdown">
				<div class="breakdown-item">
					<span class="breakdown-label">上涨</span>
					<span class="breakdown-value badge-success">{$marketStats.gainers}</span>
				</div>
				<div class="breakdown-item">
					<span class="breakdown-label">下跌</span>
					<span class="breakdown-value badge-danger">{$marketStats.losers}</span>
				</div>
			</div>
		</div>

		<div class="metric-card card">
			<div class="metric-header">
				<span class="metric-icon">🌐</span>
				<div>
					<h3 class="metric-title">覆盖平台</h3>
					<p class="metric-subtitle">监控范围</p>
				</div>
			</div>
			<div class="metric-value">
				<span class="stat-number">15+</span>
				<span class="stat-label">主流平台</span>
			</div>
			<div class="metric-breakdown">
				<div class="breakdown-item">
					<span class="breakdown-label">Amazon</span>
					<span class="breakdown-value badge-primary">✓</span>
				</div>
				<div class="breakdown-item">
					<span class="breakdown-label">Shopify</span>
					<span class="breakdown-value badge-primary">✓</span>
				</div>
			</div>
		</div>

		<div class="metric-card card">
			<div class="metric-header">
				<span class="metric-icon">⚡</span>
				<div>
					<h3 class="metric-title">系统状态</h3>
					<p class="metric-subtitle">服务健康</p>
				</div>
			</div>
			<div class="metric-value">
				<span class="stat-number positive">正常</span>
				<span class="stat-label">所有服务</span>
			</div>
			<div class="metric-breakdown">
				<div class="breakdown-item">
					<span class="breakdown-label">API响应</span>
					<span class="breakdown-value badge-success">&lt;200ms</span>
				</div>
				<div class="breakdown-item">
					<span class="breakdown-label">可用性</span>
					<span class="breakdown-value badge-success">99.9%</span>
				</div>
			</div>
		</div>
	</div>

	<!-- 主要内容区域 -->
	<div class="main-grid">
		<!-- 紧急情报 -->
		<div class="panel card">
			<div class="panel-header">
				<h2 class="panel-title">🚨 紧急情报</h2>
				<a href="/alerts" class="panel-action">查看全部</a>
			</div>
			<div class="panel-content">
				{#if $newsLoading}
					<div class="loading-state">
						<div class="spinner-lg"></div>
						<p>加载紧急情报中...</p>
					</div>
				{:else if $criticalNews.length === 0}
					<div class="empty-state">
						<span class="empty-icon">✨</span>
						<p>当前无紧急情报</p>
					</div>
				{:else}
					<div class="news-list">
						{#each $criticalNews as news}
							<div class="news-item">
								<div class="news-header">
									<span class="urgency-badge badge badge-{news.urgency === 'critical' ? 'danger' : 'warning'}">
										{news.urgency === 'critical' ? '关键' : '重要'}
									</span>
									<span class="news-time">{formatTime(news.published_date)}</span>
								</div>
								<h3 class="news-title">{news.title}</h3>
								<p class="news-description">{news.description}</p>
								<div class="news-meta">
									<div class="news-platforms">
										{#each news.platforms.slice(0, 3) as platform}
											<span class="platform-tag">{platform}</span>
										{/each}
									</div>
									<span class="sentiment-indicator sentiment-{news.sentiment}">
										{news.sentiment === 'positive' ? '📈' : news.sentiment === 'negative' ? '📉' : '➖'}
									</span>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- 市场动态 -->
		<div class="panel card">
			<div class="panel-header">
				<h2 class="panel-title">📈 市场动态</h2>
				<a href="/markets" class="panel-action">详细分析</a>
			</div>
			<div class="panel-content">
				{#if $marketsLoading}
					<div class="loading-state">
						<div class="spinner-lg"></div>
						<p>加载市场数据中...</p>
					</div>
				{:else if $stockData.length === 0}
					<div class="empty-state">
						<span class="empty-icon">📊</span>
						<p>暂无市场数据</p>
					</div>
				{:else}
					<div class="stocks-grid">
						{#each $stockData.slice(0, 6) as stock}
							<div class="stock-card">
								<div class="stock-header">
									<span class="stock-symbol">{stock.symbol}</span>
									<span class="stock-exchange">{stock.exchange}</span>
								</div>
								<div class="stock-price">
									<span class="price">${stock.current_price.toFixed(2)}</span>
									<span class="change {stock.change_percent >= 0 ? 'positive' : 'negative'}">
										{formatPercent(stock.change_percent)}
									</span>
								</div>
								<div class="stock-details">
									<span class="volume">成交量: {formatNumber(stock.volume)}</span>
									<span class="market-cap">市值: ${formatNumber(stock.market_cap)}</span>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- 趋势分析 -->
		<div class="panel card full-width">
			<div class="panel-header">
				<h2 class="panel-title">📊 趋势分析</h2>
				<a href="/trends" class="panel-action">深度分析</a>
			</div>
			<div class="panel-content">
				<div class="trends-overview">
					<div class="trend-item">
						<h4>热门关键词</h4>
						<div class="keyword-cloud">
							<span class="keyword hot">Black Friday</span>
							<span class="keyword">跨境电商</span>
							<span class="keyword">AI推荐</span>
							<span class="keyword hot">直播带货</span>
							<span class="keyword">供应链</span>
							<span class="keyword">元宇宙购物</span>
						</div>
					</div>
					
					<div class="trend-item">
						<h4>平台表现</h4>
						<div class="platform-performance">
							<div class="perf-item">
								<span class="platform">Amazon</span>
								<div class="perf-bar">
									<div class="perf-fill" style="width: 85%"></div>
								</div>
								<span class="perf-score">85%</span>
							</div>
							<div class="perf-item">
								<span class="platform">Shopify</span>
								<div class="perf-bar">
									<div class="perf-fill" style="width: 78%"></div>
								</div>
								<span class="perf-score">78%</span>
							</div>
							<div class="perf-item">
								<span class="platform">eBay</span>
								<div class="perf-bar">
									<div class="perf-fill" style="width: 72%"></div>
								</div>
								<span class="perf-score">72%</span>
							</div>
						</div>
					</div>
					
					<div class="trend-item">
						<h4>区域热度</h4>
						<div class="region-heat">
							<div class="region-item">
								<span class="region">北美</span>
								<span class="heat-indicator high">🔥</span>
							</div>
							<div class="region-item">
								<span class="region">亚太</span>
								<span class="heat-indicator high">🔥</span>
							</div>
							<div class="region-item">
								<span class="region">欧洲</span>
								<span class="heat-indicator medium">🌡️</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard {
		max-width: 1400px;
		margin: 0 auto;
	}

	.dashboard-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.dashboard-title {
		font-size: 3rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
	}

	.dashboard-subtitle {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.metric-card {
		padding: 2rem;
	}

	.metric-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.metric-icon {
		font-size: 2rem;
		filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
	}

	.metric-title {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
		color: #fff;
	}

	.metric-subtitle {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
	}

	.metric-value {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.metric-breakdown {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.breakdown-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.breakdown-label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.breakdown-value {
		font-size: 0.9rem;
		font-weight: 600;
	}

	.main-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 2rem;
		align-items: start;
	}

	.panel {
		height: fit-content;
	}

	.full-width {
		grid-column: 1 / -1;
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.panel-title {
		font-size: 1.3rem;
		font-weight: 600;
		margin: 0;
	}

	.panel-action {
		color: #00d4ff;
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
		transition: opacity 0.2s;
	}

	.panel-action:hover {
		opacity: 0.8;
	}

	.loading-state, .empty-state {
		text-align: center;
		padding: 2rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.empty-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: 1rem;
	}

	.news-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.news-item {
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.2s;
	}

	.news-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.news-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.news-time {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.news-title {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		color: #fff;
		line-height: 1.4;
	}

	.news-description {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0 0 1rem 0;
		line-height: 1.4;
	}

	.news-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.news-platforms {
		display: flex;
		gap: 0.5rem;
	}

	.platform-tag {
		font-size: 0.7rem;
		padding: 0.2rem 0.5rem;
		background: rgba(0, 212, 255, 0.1);
		color: #00d4ff;
		border-radius: 4px;
		border: 1px solid rgba(0, 212, 255, 0.2);
	}

	.stocks-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.stock-card {
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.2s;
	}

	.stock-card:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	.stock-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.stock-symbol {
		font-weight: 700;
		font-size: 1rem;
		color: #fff;
	}

	.stock-exchange {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.stock-price {
		margin-bottom: 0.75rem;
	}

	.price {
		font-size: 1.2rem;
		font-weight: 600;
		color: #fff;
	}

	.change {
		font-size: 0.85rem;
		font-weight: 600;
		margin-left: 0.5rem;
	}

	.stock-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stock-details span {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.trends-overview {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.trend-item h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: #fff;
	}

	.keyword-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.keyword {
		padding: 0.4rem 0.8rem;
		background: rgba(124, 58, 237, 0.1);
		color: #a855f7;
		border-radius: 20px;
		font-size: 0.85rem;
		border: 1px solid rgba(124, 58, 237, 0.2);
		transition: all 0.2s;
	}

	.keyword.hot {
		background: rgba(0, 212, 255, 0.1);
		color: #00d4ff;
		border-color: rgba(0, 212, 255, 0.3);
		box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
	}

	.platform-performance {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.perf-item {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.platform {
		font-size: 0.9rem;
		font-weight: 500;
		min-width: 60px;
	}

	.perf-bar {
		flex: 1;
		height: 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		overflow: hidden;
	}

	.perf-fill {
		height: 100%;
		background: linear-gradient(90deg, #00d4ff, #7c3aed);
		transition: width 0.3s ease;
	}

	.perf-score {
		font-size: 0.85rem;
		font-weight: 600;
		color: #00d4ff;
		min-width: 35px;
	}

	.region-heat {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.region-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.region {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.heat-indicator {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		.dashboard-title {
			font-size: 2rem;
		}

		.dashboard-subtitle {
			font-size: 1rem;
		}

		.metrics-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.main-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.metric-card {
			padding: 1.5rem;
		}

		.trends-overview {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>