<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { loadNews, startAutoRefresh as startNewsRefresh, stopAutoRefresh as stopNewsRefresh } from '$lib/stores/news';
	import { loadMarketData, startAutoRefresh as startMarketsRefresh, stopAutoRefresh as stopMarketsRefresh } from '$lib/stores/markets';
	import { logger } from '$lib/config/api';

	// 导航项目
	const navItems = [
		{ path: '/', label: '仪表板', icon: '📊' },
		{ path: '/news', label: '新闻情报', icon: '📰' },
		{ path: '/markets', label: '市场分析', icon: '📈' },
		{ path: '/analytics', label: '深度分析', icon: '🔍' },
		{ path: '/alerts', label: '智能预警', icon: '🚨' },
		{ path: '/trends', label: '趋势洞察', icon: '📉' }
	];

	let sidebarOpen = false;
	let currentTime = new Date();

	onMount(() => {
		logger.log('App', 'Application starting up');
		
		// 初始化数据加载
		loadNews();
		loadMarketData();
		
		// 启动自动刷新
		startNewsRefresh(15); // 每15分钟刷新新闻
		startMarketsRefresh(5); // 每5分钟刷新市场数据
		
		// 更新时间显示
		const timeInterval = setInterval(() => {
			currentTime = new Date();
		}, 1000);
		
		return () => {
			clearInterval(timeInterval);
		};
	});

	onDestroy(() => {
		stopNewsRefresh();
		stopMarketsRefresh();
	});

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	// 格式化时间显示
	$: timeString = currentTime.toLocaleString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<div class="app">
	<!-- 顶部导航栏 -->
	<header class="header">
		<div class="header-left">
			<button class="menu-btn" on:click={toggleSidebar} aria-label="Toggle menu">
				<span class="hamburger"></span>
			</button>
			<div class="logo">
				<span class="logo-icon">🌐</span>
				<h1>全球电商智能情报平台</h1>
			</div>
		</div>
		
		<div class="header-center">
			<nav class="main-nav">
				{#each navItems as item}
					<a 
						href={item.path} 
						class="nav-item" 
						class:active={$page.url.pathname === item.path}
						on:click={closeSidebar}
					>
						<span class="nav-icon">{item.icon}</span>
						<span class="nav-label">{item.label}</span>
					</a>
				{/each}
			</nav>
		</div>
		
		<div class="header-right">
			<div class="time-display">
				<span class="time-label">系统时间</span>
				<span class="time-value">{timeString}</span>
			</div>
			<div class="status-indicator online" title="系统在线">●</div>
		</div>
	</header>

	<!-- 侧边栏 (移动端) -->
	<aside class="sidebar" class:open={sidebarOpen}>
		<div class="sidebar-header">
			<div class="sidebar-logo">
				<span class="logo-icon">🌐</span>
				<span>电商情报</span>
			</div>
			<button class="close-btn" on:click={closeSidebar} aria-label="Close menu">×</button>
		</div>
		
		<nav class="sidebar-nav">
			{#each navItems as item}
				<a 
					href={item.path} 
					class="sidebar-item" 
					class:active={$page.url.pathname === item.path}
					on:click={closeSidebar}
				>
					<span class="nav-icon">{item.icon}</span>
					<span class="nav-label">{item.label}</span>
				</a>
			{/each}
		</nav>
	</aside>

	<!-- 侧边栏遮罩 -->
	{#if sidebarOpen}
		<div 
			class="sidebar-overlay" 
			on:click={closeSidebar} 
			on:keydown={(e) => e.key === 'Escape' && closeSidebar()}
			role="button" 
			tabindex="0"
			aria-label="关闭侧边栏"
		></div>
	{/if}

	<!-- 主内容区域 -->
	<main class="main-content">
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
		color: #ffffff;
		font-family: 'Inter', sans-serif;
	}

	/* 顶部导航栏 */
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
		padding: 0 2rem;
		background: rgba(26, 26, 46, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.menu-btn {
		display: none;
		background: none;
		border: none;
		color: #fff;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		transition: background 0.2s;
	}

	.menu-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.hamburger {
		display: block;
		width: 20px;
		height: 2px;
		background: currentColor;
		position: relative;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background: currentColor;
		transition: all 0.3s;
	}

	.hamburger::before {
		top: -6px;
	}

	.hamburger::after {
		bottom: -6px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo-icon {
		font-size: 2rem;
		filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
	}

	.logo h1 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		background: linear-gradient(135deg, #00d4ff, #7c3aed);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.header-center {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.main-nav {
		display: flex;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.05);
		padding: 0.5rem;
		border-radius: 12px;
		backdrop-filter: blur(10px);
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		text-decoration: none;
		color: rgba(255, 255, 255, 0.7);
		border-radius: 8px;
		transition: all 0.2s;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.nav-item:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-1px);
	}

	.nav-item.active {
		color: #00d4ff;
		background: rgba(0, 212, 255, 0.1);
		box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
	}

	.nav-icon {
		font-size: 1rem;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.time-display {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-size: 0.8rem;
	}

	.time-label {
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 2px;
	}

	.time-value {
		color: #00d4ff;
		font-weight: 500;
		font-family: 'Monaco', 'Menlo', monospace;
	}

	.status-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		box-shadow: 0 0 10px currentColor;
	}

	.status-indicator.online {
		color: #10b981;
	}

	/* 侧边栏 */
	.sidebar {
		position: fixed;
		top: 0;
		left: -300px;
		width: 300px;
		height: 100vh;
		background: rgba(26, 26, 46, 0.98);
		backdrop-filter: blur(20px);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		transition: left 0.3s ease;
		z-index: 200;
		overflow-y: auto;
	}

	.sidebar.open {
		left: 0;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.sidebar-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}

	.close-btn {
		background: none;
		border: none;
		color: #fff;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 4px;
		transition: background 0.2s;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.sidebar-nav {
		padding: 1rem 0;
	}

	.sidebar-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
		text-decoration: none;
		color: rgba(255, 255, 255, 0.7);
		transition: all 0.2s;
		font-weight: 500;
	}

	.sidebar-item:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
	}

	.sidebar-item.active {
		color: #00d4ff;
		background: rgba(0, 212, 255, 0.1);
		border-right: 2px solid #00d4ff;
	}

	.sidebar-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 150;
	}

	/* 主内容区域 */
	.main-content {
		flex: 1;
		padding: 2rem;
		min-height: calc(100vh - 70px);
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.header {
			padding: 0 1rem;
		}

		.menu-btn {
			display: block;
		}

		.main-nav {
			display: none;
		}

		.header-right .time-display {
			display: none;
		}

		.main-content {
			padding: 1rem;
		}

		.logo h1 {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.header {
			height: 60px;
			padding: 0 0.75rem;
		}

		.main-content {
			padding: 0.75rem;
		}
	}
</style>