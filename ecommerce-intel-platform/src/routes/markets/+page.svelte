<script lang="ts">
	import { onMount } from 'svelte';
	import {
		stockData,
		stocksByCategory,
		marketStats,
		marketSentiment,
		marketStatus,
		selectedSymbols,
		selectedTimeframe,
		isLoading,
		error,
		loadMarketData,
		addSymbol,
		removeSymbol,
		setTimeframe
	} from '$lib/stores/markets';

	onMount(() => {
		loadMarketData();
	});

	const timeframes = [
		{ value: '1D', label: '日线' },
		{ value: '1W', label: '周线' },
		{ value: '1M', label: '月线' },
		{ value: '3M', label: '季线' },
		{ value: '1Y', label: '年线' }
	];

	function formatNumber(num: number): string {
		if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
		if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
		if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
		if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
		return num.toFixed(0);
	}

	function formatPercent(num: number): string {
		return (num >= 0 ? '+' : '') + num.toFixed(2) + '%';
	}

	function formatPrice(price: number): string {
		return '$' + price.toFixed(2);
	}

	function getSentimentColor(sentiment: string): string {
		switch (sentiment) {
			case 'bullish': return 'text-green-400';
			case 'bearish': return 'text-red-400';
			default: return 'text-blue-400';
		}
	}

	function getSentimentIcon(sentiment: string): string {
		switch (sentiment) {
			case 'bullish': return '🐂';
			case 'bearish': return '🐻';
			default: return '⚖️';
		}
	}

	function getChangeClass(change: number): string {
		return change >= 0 ? 'positive' : 'negative';
	}

	let newSymbol = '';

	function handleAddSymbol() {
		if (newSymbol.trim()) {
			addSymbol(newSymbol.toUpperCase());
			newSymbol = '';
		}
	}
</script>

<svelte:head>
	<title>市场分析 - 全球电商智能情报平台</title>
</svelte:head>

<div class="markets-page fade-in">
	<div class="page-header">
		<h1 class="page-title gradient-text">📈 市场分析</h1>
		<p class="page-description">实时监控电商相关股票和市场指标</p>
	</div>

	<!-- 市场概览 -->
	<div class="market-overview">
		<div class="overview-card card">
			<h3 class="overview-title">市场情绪</h3>
			<div class="sentiment-display">
				<span class="sentiment-icon">{getSentimentIcon($marketSentiment)}</span>
				<span class="sentiment-text {getSentimentColor($marketSentiment)}">
					{$marketSentiment === 'bullish' ? '看涨' : $marketSentiment === 'bearish' ? '看跌' : '中性'}
				</span>
			</div>
			<div class="market-status">
				状态: {$marketStatus}
			</div>
		</div>

		<div class="overview-card card">
			<h3 class="overview-title">涨跌统计</h3>
			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-number positive">{$marketStats.gainers}</span>
					<span class="stat-label">上涨</span>
				</div>
				<div class="stat-item">
					<span class="stat-number negative">{$marketStats.losers}</span>
					<span class="stat-label">下跌</span>
				</div>
			</div>
		</div>

		<div class="overview-card card">
			<h3 class="overview-title">平均涨幅</h3>
			<div class="avg-change">
				<span class="change-number {getChangeClass($marketStats.avgChange)}">
					{formatPercent($marketStats.avgChange)}
				</span>
			</div>
		</div>

		<div class="overview-card card">
			<h3 class="overview-title">市值总计</h3>
			<div class="total-value">
				<span class="value-number">
					{formatNumber($marketStats.totalValue)}
				</span>
			</div>
		</div>
	</div>

	<!-- 控制面板 -->
	<div class="controls-panel card">
		<div class="controls-row">
			<!-- 时间框架选择 -->
			<div class="timeframe-group">
				<label>时间框架:</label>
				<div class="timeframe-buttons">
					{#each timeframes as tf}
						<button
							class="btn btn-sm {$selectedTimeframe === tf.value ? 'btn-primary' : 'btn-ghost'}"
							on:click={() => setTimeframe(tf.value)}
						>
							{tf.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- 添加股票 -->
			<div class="add-symbol-group">
				<input
					type="text"
					placeholder="添加股票代码 (如: TSLA)"
					class="input symbol-input"
					bind:value={newSymbol}
					on:keydown={(e) => e.key === 'Enter' && handleAddSymbol()}
				/>
				<button class="btn btn-primary" on:click={handleAddSymbol}>
					➕ 添加
				</button>
			</div>
		</div>
	</div>

	<!-- 股票列表 -->
	<div class="stocks-content">
		{#if $isLoading}
			<div class="loading-state card">
				<div class="spinner-lg"></div>
				<p>正在加载市场数据...</p>
			</div>
		{:else if $error}
			<div class="error-state card notification-error">
				<h3>加载失败</h3>
				<p>{$error}</p>
				<button class="btn btn-primary" on:click={() => loadMarketData()}>重试</button>
			</div>
		{:else if $stockData.length === 0}
			<div class="empty-state card">
				<span class="empty-icon">📈</span>
				<h3>暂无市场数据</h3>
				<p>请检查网络连接或稍后重试</p>
			</div>
		{:else}
			<!-- 分类显示 -->
			{#each Object.entries($stocksByCategory) as [category, stocks]}
				{#if stocks.length > 0}
					<div class="category-section">
						<h2 class="category-title">
							{category === 'ecommerce' ? '🛒 电商平台' :
							 category === 'payment' ? '💳 支付服务' :
							 category === 'logistics' ? '📦 物流配送' :
							 category === 'saas' ? '⚙️ SaaS工具' : category}
						</h2>
						<div class="stocks-grid">
							{#each stocks as stock}
								<div class="stock-card card slide-up">
									<div class="stock-header">
										<div class="stock-info">
											<h3 class="stock-symbol">{stock.symbol}</h3>
											<span class="stock-exchange">{stock.exchange}</span>
										</div>
										<button
											class="remove-btn btn-ghost"
											on:click={() => removeSymbol(stock.symbol)}
											title="移除监控"
										>
											✕
										</button>
									</div>

									<div class="stock-price">
										<span class="current-price">{formatPrice(stock.current_price)}</span>
										<span class="price-change {getChangeClass(stock.change_percent)}">
											{formatPercent(stock.change_percent)}
										</span>
									</div>

									<div class="stock-details">
										<div class="detail-row">
											<span class="detail-label">开盘:</span>
											<span class="detail-value">{formatPrice(stock.open_price)}</span>
										</div>
										<div class="detail-row">
											<span class="detail-label">最高:</span>
											<span class="detail-value">{formatPrice(stock.high_price)}</span>
										</div>
										<div class="detail-row">
											<span class="detail-label">最低:</span>
											<span class="detail-value">{formatPrice(stock.low_price)}</span>
										</div>
										<div class="detail-row">
											<span class="detail-label">成交量:</span>
											<span class="detail-value">{formatNumber(stock.volume)}</span>
										</div>
										<div class="detail-row">
											<span class="detail-label">市值:</span>
											<span class="detail-value">{formatNumber(stock.market_cap)}</span>
										</div>
									</div>

									<div class="stock-indicators">
										<div class="indicator">
											<span class="indicator-label">52周最高:</span>
											<span class="indicator-value">{formatPrice(stock.year_high || stock.high_price)}</span>
										</div>
										<div class="indicator">
											<span class="indicator-label">52周最低:</span>
											<span class="indicator-value">{formatPrice(stock.year_low || stock.low_price)}</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</div>

	<!-- 市场热门股票 -->
	{#if $marketStats.topGainer && $marketStats.topLoser}
		<div class="market-leaders card">
			<h2 class="section-title">📊 市场领涨领跌</h2>
			<div class="leaders-grid">
				<div class="leader-card gain">
					<h4>📈 最大涨幅</h4>
					<div class="leader-info">
						<span class="leader-symbol">{$marketStats.topGainer.symbol}</span>
						<span class="leader-change positive">
							{formatPercent($marketStats.topGainer.change_percent)}
						</span>
					</div>
					<div class="leader-price">
						{formatPrice($marketStats.topGainer.current_price)}
					</div>
				</div>

				<div class="leader-card loss">
					<h4>📉 最大跌幅</h4>
					<div class="leader-info">
						<span class="leader-symbol">{$marketStats.topLoser.symbol}</span>
						<span class="leader-change negative">
							{formatPercent($marketStats.topLoser.change_percent)}
						</span>
					</div>
					<div class="leader-price">
						{formatPrice($marketStats.topLoser.current_price)}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.markets-page {
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.page-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}

	.page-description {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0 0 2rem 0;
	}

	.market-overview {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.overview-card {
		text-align: center;
		padding: 1.5rem;
	}

	.overview-title {
		font-size: 1rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 1rem 0;
	}

	.sentiment-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.sentiment-icon {
		font-size: 2rem;
	}

	.sentiment-text {
		font-size: 1.2rem;
		font-weight: 600;
	}

	.market-status {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.6);
		margin-top: 0.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.stat-label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.avg-change {
		text-align: center;
	}

	.change-number {
		font-size: 2rem;
		font-weight: 700;
	}

	.total-value {
		text-align: center;
	}

	.value-number {
		font-size: 2rem;
		font-weight: 700;
		color: #00d4ff;
	}

	.controls-panel {
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.controls-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.timeframe-group {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.timeframe-group label {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
		white-space: nowrap;
	}

	.timeframe-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.add-symbol-group {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.symbol-input {
		width: 200px;
	}

	.loading-state,
	.error-state,
	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
	}

	.empty-icon {
		font-size: 4rem;
		display: block;
		margin-bottom: 1rem;
	}

	.category-section {
		margin-bottom: 3rem;
	}

	.category-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 1.5rem 0;
		color: #fff;
	}

	.stocks-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.stock-card {
		padding: 1.5rem;
		transition: all 0.3s ease;
	}

	.stock-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
	}

	.stock-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.stock-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stock-symbol {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0;
		color: #fff;
	}

	.stock-exchange {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.remove-btn {
		padding: 0.25rem 0.5rem;
		font-size: 0.8rem;
		opacity: 0.6;
		transition: opacity 0.2s;
	}

	.remove-btn:hover {
		opacity: 1;
	}

	.stock-price {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.current-price {
		display: block;
		font-size: 1.8rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.25rem;
	}

	.price-change {
		font-size: 1rem;
		font-weight: 600;
	}

	.stock-details {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
		margin-bottom: 1rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 8px;
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail-label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.detail-value {
		font-size: 0.8rem;
		font-weight: 600;
		color: #fff;
	}

	.stock-indicators {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.indicator {
		text-align: center;
		flex: 1;
	}

	.indicator-label {
		display: block;
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.5);
		margin-bottom: 0.25rem;
	}

	.indicator-value {
		font-size: 0.8rem;
		font-weight: 600;
		color: #fff;
	}

	.market-leaders {
		padding: 2rem;
		margin-top: 3rem;
	}

	.section-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 1.5rem 0;
		text-align: center;
	}

	.leaders-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.leader-card {
		text-align: center;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.leader-card.gain {
		border-color: rgba(16, 185, 129, 0.3);
		background: rgba(16, 185, 129, 0.05);
	}

	.leader-card.loss {
		border-color: rgba(239, 68, 68, 0.3);
		background: rgba(239, 68, 68, 0.05);
	}

	.leader-card h4 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: rgba(255, 255, 255, 0.8);
	}

	.leader-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.leader-symbol {
		font-size: 1.1rem;
		font-weight: 700;
		color: #fff;
	}

	.leader-change {
		font-size: 1rem;
		font-weight: 600;
	}

	.leader-price {
		font-size: 1.2rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
	}

	@media (max-width: 768px) {
		.page-title {
			font-size: 2rem;
		}

		.controls-row {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}

		.timeframe-group {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.timeframe-buttons {
			width: 100%;
			justify-content: space-between;
		}

		.add-symbol-group {
			flex-direction: column;
		}

		.symbol-input {
			width: 100%;
		}

		.stocks-grid {
			grid-template-columns: 1fr;
		}

		.stock-details {
			grid-template-columns: 1fr;
		}

		.stock-indicators {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>