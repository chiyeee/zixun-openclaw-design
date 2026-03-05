# 🌐 全球电商智能情报平台

> 专门用于网页预览和设计展示的仓库

## 📊 在线演示

**访问地址**: https://chiyeee.github.io/zixun-openclaw-design/

## 🚀 功能特色

### 📊 智能仪表板
- 实时市场情绪指标 (看涨/看跌/中性)
- 新闻情报统计和紧急预警显示
- 系统健康监控和平台覆盖展示

### 📰 新闻情报页面
- 多维度智能筛选 (分类/紧急程度/情感倾向)
- 实时搜索和预警模式切换
- 情感分析和分页浏览功能

### 📈 市场分析页面
- 电商股票分类监控 (电商平台/支付服务/物流配送/SaaS工具)
- 实时股价和涨跌幅显示
- 市场领涨领跌分析

## 🔧 技术架构

- **前端框架**: SvelteKit + Svelte 5
- **样式系统**: 自定义CSS + 深色主题
- **状态管理**: Svelte stores with intelligent caching
- **部署方式**: GitHub Pages 静态部署
- **响应式设计**: 完美支持PC和移动设备

## 📂 项目结构

```
/
├── ecommerce-intel-platform/    # 完整的SvelteKit项目
│   ├── src/
│   │   ├── lib/
│   │   │   ├── api/             # API层
│   │   │   ├── config/          # 配置文件
│   │   │   ├── services/        # 服务层
│   │   │   └── stores/          # 状态管理
│   │   └── routes/              # 页面路由
│   ├── package.json
│   └── svelte.config.js
├── index.html                   # 主页静态文件
├── markets.html                 # 市场分析页面
├── news.html                    # 新闻情报页面
├── _app/                        # 应用资产文件
└── .github/workflows/           # GitHub Actions自动部署
```

## 🎯 设计特色

- **零运营成本** - 完全静态部署
- **模拟数据驱动** - 智能生成真实感数据
- **现代化UI设计** - 深色主题 + 渐变效果
- **完整业务链路** - 从数据分析到用户界面的端到端体验

## 🔄 开发流程

1. **开发环境**: 在 `ecommerce-intel-platform/` 目录下运行 `npm run dev`
2. **构建部署**: `npm run build` 生成静态文件
3. **自动部署**: 推送到main分支触发GitHub Actions自动部署

---

**项目编号**: 2005-E (全球电商咨询整合站点)  
**基于架构**: situation-monitor  
**开发时间**: 2026年3月  
**部署状态**: ✅ 在线运行