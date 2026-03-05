<script lang="ts">
	import { onMount } from 'svelte';
	import {
		paginatedNews,
		filteredNews,
		newsStats,
		selectedCategory,
		selectedUrgency,
		selectedSentiment,
		searchQuery,
		showOnlyAlertsMode,
		paginationInfo,
		isLoading,
		error,
		loadNews,
		setFilter,
		setSearchQuery,
		toggleAlertsMode,
		goToPage,
		nextPage,
		prevPage,
		resetFilters
	} from '$lib/stores/news';

	onMount(() => {
		loadNews();
	});

	const categories = [
		{ value: 'all', label: '全部分类' },
		{ value: 'platform-updates', label: '平台更新' },
		{ value: 'market-analysis', label: '市场分析' },
		{ value: 'competitive-intel', label: '竞争情报' },
		{ value: 'supply-chain', label: '供应链' },
		{ value: 'regulations', label: '政策法规' },
		{ value: 'technology', label: '技术创新' }
	];

	const urgencyLevels = [
		{ value: 'all', label: '全部级别' },
		{ value: 'critical', label: '关键' },
		{ value: 'high', label: '重要' },
		{ value: 'medium', label: '中等' },
		{ value: 'low', label: '一般' }
	];

	const sentiments = [
		{ value: 'all', label: '全部情感' },
		{ value: 'positive', label: '积极' },
		{ value: 'negative', label: '消极' },
		{ value: 'neutral', label: '中性' }
	];

	function handleSearch(event: Event) {
		const target = event.target as HTMLInputElement;
		setSearchQuery(target.value);
	}

	function formatTime(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		
		if (diff < 60000) return '刚刚';
		if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
		if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
		return Math.floor(diff / 86400000) + '天前';
	}

	function getUrgencyColor(urgency: string): string {
		switch (urgency) {
			case 'critical': return 'badge-danger';
			case 'high': return 'badge-warning';
			case 'medium': return 'badge-primary';
			case 'low': return 'badge-secondary';
			default: return 'badge-secondary';
		}
	}

	function getSentimentIcon(sentiment: string): string {
		switch (sentiment) {
			case 'positive': return '📈';
			case 'negative': return '📉';
			case 'neutral': return '➖';
			default: return '❓';
		}
	}
</script>

<svelte:head>
	<title>新闻情报 - 全球电商智能情报平台</title>
</svelte:head>

<div class="news-page fade-in">
	<div class="page-header">
		<h1 class="page-title gradient-text">📰 新闻情报</h1>
		<p class="page-description">实时监控全球电商新闻动态与市场情报</p>
	</div>

	<!-- 控制面板 -->
	<div class="controls-panel card">
		<div class="controls-row">
			<!-- 搜索 -->
			<div class="search-group">
				<input
					type="text"
					placeholder="搜索新闻标题、内容、关键词..."
					class="input search-input"
					value={$searchQuery}
					on:input={handleSearch}
				/>
			</div>

			<!-- 预警模式开关 -->
			<button
				class="btn btn-{$showOnlyAlertsMode ? 'danger' : 'secondary'}"
				on:click={toggleAlertsMode}
			>
				{$showOnlyAlertsMode ? '🚨 预警模式' : '📋 普通模式'}
			</button>

			<!-- 重置按钮 -->
			<button class="btn btn-ghost" on:click={resetFilters}>
				🔄 重置筛选
			</button>
		</div>

		<div class="filters-row">
			<!-- 分类过滤 -->
			<div class="filter-group">
				<label>分类：</label>
				<select
					class="input"
					bind:value={$selectedCategory}
					on:change={(e) => setFilter('category', e.currentTarget.value)}
				>
					{#each categories as category}
						<option value={category.value}>{category.label}</option>
					{/each}
				</select>
			</div>

			<!-- 紧急程度过滤 -->
			<div class="filter-group">
				<label>紧急程度：</label>
				<select
					class="input"
					bind:value={$selectedUrgency}
					on:change={(e) => setFilter('urgency', e.currentTarget.value)}
				>
					{#each urgencyLevels as level}
						<option value={level.value}>{level.label}</option>
					{/each}
				</select>
			</div>

			<!-- 情感过滤 -->
			<div class="filter-group">
				<label>情感倾向：</label>
				<select
					class="input"
					bind:value={$selectedSentiment}
					on:change={(e) => setFilter('sentiment', e.currentTarget.value)}
				>
					{#each sentiments as sentiment}
						<option value={sentiment.value}>{sentiment.label}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- 统计信息 -->
	<div class="stats-bar">
		<div class="stat-item">
			<span class="stat-value">{$filteredNews.length}</span>
			<span class="stat-label">篇新闻</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{$newsStats.byUrgency?.critical || 0}</span>
			<span class="stat-label">关键警报</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{$newsStats.byUrgency?.high || 0}</span>
			<span class="stat-label">重要新闻</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{Object.keys($newsStats.byPlatform).length}</span>
			<span class="stat-label">覆盖平台</span>
		</div>
	</div>

	<!-- 新闻列表 -->
	<div class="news-content">
		{#if $isLoading}
			<div class="loading-state card">
				<div class="spinner-lg"></div>
				<p>正在加载最新新闻...</p>
			</div>
		{:else if $error}
			<div class="error-state card notification-error">
				<h3>加载失败</h3>
				<p>{$error}</p>
				<button class="btn btn-primary" on:click={() => loadNews()}>重试</button>
			</div>
		{:else if $paginatedNews.length === 0}
			<div class="empty-state card">
				<span class="empty-icon">📰</span>
				<h3>暂无符合条件的新闻</h3>
				<p>请尝试调整筛选条件或搜索关键词</p>
				<button class="btn btn-secondary" on:click={resetFilters}>重置筛选</button>
			</div>
		{:else}
			<div class="news-list">
				{#each $paginatedNews as news}
					<article class="news-card card slide-up">
						<div class="news-header">
							<div class="news-meta">
								<span class="urgency-badge badge {getUrgencyColor(news.urgency)}">
									{news.urgency === 'critical' ? '关键' :
									 news.urgency === 'high' ? '重要' :
									 news.urgency === 'medium' ? '中等' : '一般'}
								</span>
								<span class="category-tag">{news.category}</span>
								<span class="news-time">{formatTime(news.published_date)}</span>
							</div>
							<div class="sentiment-indicator">
								{getSentimentIcon(news.sentiment)}
							</div>
						</div>

						<h2 class="news-title">{news.title}</h2>
						<p class="news-description">{news.description}</p>

						<div class="news-details">
							<div class="keywords">
								{#each news.keywords.slice(0, 5) as keyword}
									<span class="keyword-tag">{keyword}</span>
								{/each}
							</div>
							<div class="analysis-score">
								<span class="score-label">分析评分:</span>
								<span class="score-value">{(news.analysis_score * 100).toFixed(0)}%</span>
							</div>
						</div>

						<div class="news-footer">
							<div class="platforms">
								<span class="platforms-label">相关平台:</span>
								{#each news.platforms.slice(0, 4) as platform}
									<span class="platform-tag">{platform}</span>
								{/each}
								{#if news.platforms.length > 4}
									<span class="more-platforms">+{news.platforms.length - 4}</span>
								{/if}
							</div>
							<div class="news-actions">
								<a href={news.url} target="_blank" rel="noopener" class="btn btn-sm btn-primary">
									查看原文
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<!-- 分页控件 -->
			{#if $paginationInfo.totalPages > 1}
				<div class="pagination card">
					<div class="pagination-info">
						显示 {$paginationInfo.start}-{$paginationInfo.end} 条，
						共 {$paginationInfo.totalItems} 条新闻
					</div>
					<div class="pagination-controls">
						<button
							class="btn btn-sm btn-secondary"
							disabled={!$paginationInfo.hasPrev}
							on:click={prevPage}
						>
							← 上一页
						</button>
						
						{#if $paginationInfo.totalPages <= 7}
							{#each Array($paginationInfo.totalPages) as _, i}
								<button
									class="btn btn-sm {i + 1 === $paginationInfo.currentPage ? 'btn-primary' : 'btn-ghost'}"
									on:click={() => goToPage(i + 1)}
								>
									{i + 1}
								</button>
							{/each}
						{:else}
							<span class="pagination-summary">
								第 {$paginationInfo.currentPage} 页，共 {$paginationInfo.totalPages} 页
							</span>
						{/if}

						<button
							class="btn btn-sm btn-secondary"
							disabled={!$paginationInfo.hasNext}
							on:click={nextPage}
						>
							下一页 →
						</button>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.news-page {
		max-width: 1200px;
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

	.controls-panel {
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.controls-row {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		align-items: center;
	}

	.search-group {
		flex: 1;
	}

	.search-input {
		width: 100%;
	}

	.filters-row {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 150px;
	}

	.filter-group label {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
		white-space: nowrap;
	}

	.filter-group select {
		flex: 1;
		min-width: 100px;
	}

	.stats-bar {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.8rem;
		font-weight: 700;
		color: #00d4ff;
	}

	.stat-label {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.6);
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

	.news-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.news-card {
		padding: 1.5rem;
		transition: all 0.3s ease;
	}

	.news-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
	}

	.news-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.news-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.category-tag {
		font-size: 0.8rem;
		padding: 0.3rem 0.6rem;
		background: rgba(124, 58, 237, 0.1);
		color: #a855f7;
		border-radius: 4px;
		border: 1px solid rgba(124, 58, 237, 0.2);
	}

	.news-time {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.sentiment-indicator {
		font-size: 1.2rem;
	}

	.news-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
		color: #fff;
		line-height: 1.4;
	}

	.news-description {
		font-size: 0.95rem;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}

	.news-details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.keywords {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.keyword-tag {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		background: rgba(0, 212, 255, 0.1);
		color: #00d4ff;
		border-radius: 12px;
		border: 1px solid rgba(0, 212, 255, 0.2);
	}

	.analysis-score {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.score-label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.score-value {
		font-size: 0.8rem;
		font-weight: 600;
		color: #00d4ff;
	}

	.news-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		flex-wrap: wrap;
		gap: 1rem;
	}

	.platforms {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.platforms-label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.platform-tag {
		font-size: 0.7rem;
		padding: 0.2rem 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.8);
		border-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.more-platforms {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.pagination {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.pagination-info {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.7);
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.pagination-summary {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0 0.5rem;
	}

	@media (max-width: 768px) {
		.page-title {
			font-size: 2rem;
		}

		.controls-row {
			flex-direction: column;
			align-items: stretch;
		}

		.filters-row {
			flex-direction: column;
			gap: 1rem;
		}

		.filter-group {
			min-width: auto;
		}

		.stats-bar {
			flex-wrap: wrap;
			gap: 1rem;
			text-align: center;
		}

		.news-details {
			flex-direction: column;
			align-items: flex-start;
		}

		.news-footer {
			flex-direction: column;
			align-items: flex-start;
		}

		.pagination {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>