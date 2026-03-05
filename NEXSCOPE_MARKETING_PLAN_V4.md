# Nexscope Marketing Execution Plan v4.0
## 可执行计划书 · 纯清单 · 纯动作

> Nexscope · Amazon卖家数据智能平台 · 欧美市场
> 2026-03-05

---

## 0. 一页总览

```
┌─────────────────────────────────────────────────────────┐
│                    BEFORE （让人知道我们）                │
│  1. 目标客户        2. 核心信息          3. 投放渠道      │
├─────────────────────────────────────────────────────────┤
│                    DURING （让人试用）                    │
│  4. 线索获取        5. 培育转化          6. 成交机制      │
├─────────────────────────────────────────────────────────┤
│                    AFTER  （让人留下+推荐）               │
│  7. 交付体验        8. 增购扩展          9. 转介绍系统    │
└─────────────────────────────────────────────────────────┘
```

---

## 1. 目标客户

| 维度 | 定义 |
|------|------|
| **谁** | Base在欧美的Amazon卖家（不含中国出海卖家） |
| **规模** | 月销$5K-$500K的中腰部卖家 |
| **痛点** | 用5个工具但数据割裂；竞品动态靠手动查；关键词调研耗时 |
| **在哪** | Reddit r/FulfillmentByAmazon · Facebook FBA Groups · YouTube Amazon教程 · LinkedIn |
| **已在付费** | Jungle Scout ($49/mo) · Helium 10 ($39/mo) · Keepa · Sellerboard |
| **决策人** | 卖家本人或运营负责人 |

---

## 2. 核心信息

| 元素 | 内容 |
|------|------|
| **一句话定位** | "You use 5 tools. We make them talk to each other." |
| **USP** | 唯一一个整合多SaaS + Amazon前台数据的统一分析平台 |
| **电梯说辞** | "Amazon sellers use Jungle Scout, Helium 10, Keepa, and more — but none of these tools share data. Nexscope pulls it all into one place, cross-references everything, and shows you insights none of them can alone." |
| **信任素材** | 开源monitor项目(GitHub stars) · 免费分析报告 · 数据准确度对比 |

---

## 3. 投放渠道 × 执行清单

### 渠道总表

| # | 渠道 | 类型 | 启动周 | 人力/周 | 自动化率 | 目标产出 |
|---|------|------|--------|---------|---------|---------|
| A | GitHub开源 | 信任建设 | W1 | 3h | 20% | Stars + Waitlist |
| B | Reddit | 社区渗透 | W1 | 4h | 40% | 精准卖家流量 |
| C | YouTube | 内容资产 | W3 | 6h | 60% | 长尾搜索流量 |
| D | LinkedIn | B2B获客 | W2 | 3h | 80% | 品牌卖家触达 |
| E | 冷邮件 | 直接获客 | W3 | 3h | 70% | 注册转化 |
| F | SEO/Blog | 长尾流量 | W4 | 4h | 85% | 搜索排名 |
| G | Facebook Groups | 社区获客 | W2 | 2h | 40% | 卖家信任 |
| H | OpenClaw生态 | 开发者渠道 | W3 | 2h | 30% | 技术用户 |
| I | Podcast/Webinar | 权威建设 | W6 | 4h | 20% | 行业认知 |
| J | 免费小工具 | 产品引流 | W5 | 8h(一次) | 95% | 自动获客 |
| K | 行业报告/PR | 外链+品牌 | W8 | 6h | 70% | 媒体曝光 |
| L | Discord/TG社区 | 用户运营 | W2 | 2h | 60% | 留存+口碑 |

---

### 渠道A：GitHub开源

| 步骤 | 动作 | 交付物 | 负责 | 截止 |
|------|------|--------|------|------|
| A1 | 重写nexscope-monitor README | 新README.md(含截图模板) | 开发 | W1D2 |
| A2 | 截图：全屏仪表盘 + 地图交互GIF | `docs/screenshot-*.png/gif` | 设计 | W1D3 |
| A3 | 添加docker-compose.yml + Dockerfile | 一键部署文件 | 开发 | W1D3 |
| A4 | 设置仓库description + 18个topics | GitHub Settings | 任何人 | W1D1 |
| A5 | 添加Vercel Deploy按钮 | README中按钮 | 开发 | W1D3 |
| A6 | 建GitHub Organization `nexscope` | org主页 | 创始人 | W1D1 |
| A7 | 创建awesome-amazon-seller-tools仓库 | 工具清单README | 内容 | W2 |
| A8 | Monitor内嵌4个导流触点 | 代码改动 | 开发 | W2 |
| A9 | Hacker News "Show HN" 发帖 | 帖子 | 创始人 | W3D1 |
| A10 | Product Hunt Launch | PH页面 | 营销 | W3D3 |

**周维护**：每周发1个Release · 24h内回复所有Issue · 每月加1个小功能

---

### 渠道B：Reddit

| 步骤 | 动作 | 子Reddit | 频率 |
|------|------|---------|------|
| B1 | 养号：回答卖家问题，不推产品 | r/FulfillmentByAmazon, r/AmazonSeller | 每天2-3条评论，持续2周 |
| B2 | 数据洞察帖（90%价值+10%工具提及） | r/FulfillmentByAmazon | 每周1帖 |
| B3 | 开源工具分享帖 | r/selfhosted, r/SideProject | 发布时各1帖 |
| B4 | "Free ASIN Analysis"互动帖 | r/FulfillmentByAmazon | 每2周1帖 |
| B5 | 行业趋势帖 | r/ecommerce, r/Entrepreneur | 每周1帖 |

**帖子格式**：
```
标题: I analyzed [数量] Amazon listings in [品类]. Here's what I found.
正文: [300+字的数据分析] + 底部一行: "Built an open-source tool for this → [GitHub链接]"
```

**禁止**: 自动发帖 · 硬广 · 多账号 · 每帖都推产品

---

### 渠道C：YouTube

| 步骤 | 动作 | 频率 | 视频时长 |
|------|------|------|---------|
| C1 | 创建频道"Nexscope — Amazon Seller Intelligence" | 一次 | — |
| C2 | Series A: "Amazon Data Deep Dive" — 用数据分析品类 | 每周 | 8-12min |
| C3 | Series B: "Competitor Teardown" — 拆解top seller策略 | 双周 | 10-15min |
| C4 | Series C: "Tool Setup" — monitor部署教程 | 月更 | 5-8min |
| C5 | 每个视频描述放GitHub + waitlist链接 | 每个 | — |

**制作流程**：
```
Cron生成数据+脚本草稿(自动) → 人工审核脚本 → 录屏monitor操作 → 剪辑 → 发布
```

**SEO标题格式**: `[数字] + [结果] + [时间]` → "5 Amazon Niches Making $10K/Month in 2026"

---

### 渠道D：LinkedIn

| 步骤 | 动作 | 频率 |
|------|------|------|
| D1 | 优化Profile标题和Banner | 一次 |
| D2 | 数据洞察帖 — "Just analyzed X listings..." | 每周2帖 |
| D3 | 开源分享帖 — "We open-sourced..." | 每月1帖 |
| D4 | 用Sales Navigator筛选目标卖家 | 每周 |
| D5 | 发送连接请求(附个性化消息) | 每天20-30个 |
| D6 | 连接后第3次互动分享分析报告 | 持续 |

**自动化**: Cron每周生成3篇帖子草稿 → 人工微调 → 手动发布

---

### 渠道E：冷邮件

| 步骤 | 动作 | 数量 |
|------|------|------|
| E1 | 筛选线索：LinkedIn/Reddit/YouTube中的Amazon卖家 | 每周50个 |
| E2 | 用Nexscope自动分析每个卖家的listing | 自动 |
| E3 | 生成个性化分析报告PDF | 自动 |
| E4 | 发送5封邮件序列 | 自动 |
| E5 | 人工跟进回复者 | 手动 |

**5封邮件序列**：

| 天数 | 主题 | 目的 |
|------|------|------|
| Day 0 | "Your listing for {product} is leaving money on the table" | 免费价值钩子 |
| Day 3 | "Your {product} analysis — as promised" | 发送报告PDF |
| Day 7 | "How {similar_seller} increased sales 23%" | 案例证明 |
| Day 14 | "Early access to our analytics platform" | 试用邀请 |
| Day 21 | "Last spot in our beta group" | 紧迫感+社交证明 |

**工具**: SendGrid或Resend发送 · 每人最多5封/月 · 每封含退订链接

---

### 渠道F：SEO / Blog

| 步骤 | 动作 | 数量 |
|------|------|------|
| F1 | 建立关键词库（3个层级） | 200+词 |
| F2 | 批量生成品类分析页(programmatic SEO) | 每周5页 |
| F3 | 深度文章（手动编辑） | 每周1篇 |
| F4 | 技术SEO审计（seo-audit skill） | 每月 |
| F5 | 外链建设（行业报告被引用） | 持续 |

**关键词分层**：

| 层级 | 示例 | 竞争 | 意向 |
|------|------|------|------|
| Tier 1 工具词 | "amazon keyword research tool" | 高 | 高 |
| Tier 2 教程词 | "how to find profitable amazon niches" | 中 | 中 |
| Tier 3 对比词 | "jungle scout alternative free" | 中 | 极高 |

---

### 渠道G：Facebook Groups

| 步骤 | 动作 | 目标群组 |
|------|------|---------|
| G1 | 加入4个核心FBA群组 | Amazon FBA Competitive Edge · FBA High Rollers · Seller Central Tips · Private Label Masters |
| G2 | 前2周：纯回答问题 | — |
| G3 | 每2周发"Free ASIN Analysis"帖 | 轮换群组 |
| G4 | 收集ASIN → Nexscope分析 → 回复结果 → 导流 | — |

---

### 渠道H：OpenClaw生态

| 步骤 | 动作 | 平台 |
|------|------|------|
| H1 | 创建nexscope-skills GitHub仓库 | GitHub |
| H2 | 发布5个skill到skills.sh | skills.sh |
| H3 | 在OpenClaw Discord #showcase发帖 | Discord |
| H4 | 部署Nexscope Agent服务（Telegram + Discord Bot） | 自有VPS |
| H5 | 设置Cron自动推送市场简报到Discord社区 | OpenClaw Gateway |

**Skills列表**:

| Skill名称 | 功能 |
|-----------|------|
| `amazon-keyword-scout` | 关键词调研 |
| `amazon-competitor-radar` | 竞品追踪 |
| `amazon-listing-audit` | Listing审计 |
| `amazon-niche-finder` | 选品分析 |
| `amazon-price-tracker` | 价格监控 |

---

### 渠道I：Podcast & Webinar

| 步骤 | 动作 | 时间 |
|------|------|------|
| I1 | 准备独家数据报告作为嘉宾素材 | W5 |
| I2 | 联系5个目标Podcast主持人 | W6 |
| I3 | 录制2-3个Podcast | W7-W10 |
| I4 | 举办月度Webinar "Data-Driven Niche Selection" | W8起每月 |

**目标Podcast**: AM/PM Podcast · Serious Sellers · The Amazing Seller · Ecommerce Fuel · My Wife Quit Her Job

**Webinar流程**: 注册(收邮箱) → 直播演示Nexscope → 回放放YouTube → 3天后邮件跟进

---

### 渠道J：免费小工具

| 工具 | 功能 | 免费给什么 | 收费给什么 |
|------|------|-----------|-----------|
| ASIN Analyzer | 输入ASIN → 竞品概览 | 基础数据(价格/排名/评分) | 完整竞品报告 |
| Keyword Gap Finder | 你的ASIN vs 竞品ASIN | Top 5差距关键词 | 完整差距列表+建议 |
| Listing Scorer | 输入listing URL → 打分 | 总分+3个问题 | 详细优化方案 |
| Price Tracker | 追踪ASIN价格 | 7天趋势图 | 告警+长期追踪 |

每个工具 = 1个单页Web App · 后端调Nexscope API · 结果页底部CTA: "Unlock Full Report"

---

### 渠道K：行业报告 / PR

| 步骤 | 动作 | 频率 |
|------|------|------|
| K1 | 生成季度报告 "Amazon Marketplace Report" | 每季度 |
| K2 | 提交到电商媒体(Marketplace Pulse等) | 每季度 |
| K3 | LinkedIn Thread形式发布摘要 | 随报告 |
| K4 | 博客发布完整报告(收邮箱下载) | 随报告 |

---

### 渠道L：Discord / Telegram社区

| 频道 | 用途 | 自动化 |
|------|------|--------|
| #announcements | 产品更新 | 手动 |
| #daily-intel | 每日市场简报 | Cron 100%自动 |
| #free-analysis | 用户丢ASIN → Bot返回分析 | Webhook自动 |
| #general | 卖家讨论 | 手动 |
| #feature-requests | 需求收集 | 手动 |

---

## 4. 线索获取机制

| 触点 | 收集方式 | 存储 |
|------|---------|------|
| Monitor Footer | 邮箱输入框 "Notify Me" | Formspree → Google Sheet |
| Monitor Welcome Modal | 首次访问弹窗 | 同上 |
| Monitor WorldMap CTA | "Unlock with Nexscope" | 同上 |
| 免费小工具 | "Unlock Full Report" 需邮箱 | 同上 |
| YouTube描述 | Waitlist链接 | 同上 |
| Reddit帖子 | GitHub → README → Waitlist | 同上 |
| LinkedIn | DM/帖子引流到Waitlist | 同上 |
| Webinar | 注册需邮箱 | 同上 |
| 行业报告 | 下载需邮箱 | 同上 |

---

## 5. 培育序列（自动邮件）

| 阶段 | 触发 | 邮件内容 | 延迟 |
|------|------|---------|------|
| Welcome | 注册 | 感谢+产品介绍+如果提供了ASIN则附分析 | 立即 |
| Value 1 | — | "5 keywords your competitors rank for but you don't" | +3天 |
| Value 2 | — | 同品类卖家成功案例 | +7天 |
| Nudge | — | "Your competitors changed prices this week" | +14天 |
| Convert | — | Beta试用邀请(14天免费) | +21天 |
| Win-back | 未激活 | "Still interested? Here's what you're missing" | +30天 |

---

## 6. 成交机制

| 层级 | 价格 | 包含 | 目标用户 |
|------|------|------|---------|
| Free | $0 | Monitor + 免费小工具(日限) | 所有人 |
| Starter | $29/mo | 5个ASIN监控 + 基础关键词 | 小卖家 |
| Pro | $79/mo | 50个ASIN + 完整关键词+竞品+Listing优化 | 中腰部卖家 |
| Enterprise | $199/mo | 无限ASIN + API + 团队协作 | 品牌/团队 |

---

## 7. 交付体验

| 环节 | 标准 |
|------|------|
| 注册→首个报告 | < 5分钟（自动） |
| 数据更新频率 | 每日 |
| 客户支持响应 | < 4小时 |
| Discord社区 | 每日活跃简报 |
| 竞品异动告警 | 实时推送(Discord/TG/Email) |

---

## 8. 增购路径

| 触发 | 动作 |
|------|------|
| 用户ASIN数接近上限 | 自动邮件："You're tracking 4/5 ASINs. Upgrade for unlimited." |
| 用户频繁使用某功能 | 展示Pro功能预览："See what Pro users see" |
| 季度数据峰值(Q4) | 限时优惠："Peak season prep — 20% off Pro" |
| 用户使用1个月后 | 发送ROI报告："Nexscope saved you X hours this month" |

---

## 9. 转介绍系统

| 机制 | 实现 |
|------|------|
| 推荐码 | 每用户唯一referral link |
| 奖励 | 推荐人: 1个月免费 · 被推荐人: 7天免费延长 |
| 触发推荐请求 | 用户使用满30天 + 活跃 → 自动邮件："Know someone who'd love this?" |
| 社交分享 | 分析报告底部 "Share this insight" 按钮 |

---

## 10. 自动化配置清单

| 任务 | Cron表达式 | 推送渠道 | 内容 |
|------|-----------|---------|------|
| 每日市场简报 | `0 8 * * * America/New_York` | Discord #daily-intel | Amazon US Top3品类变化 |
| 每周博客草稿 | `0 6 * * 1 America/New_York` | workspace/blog-drafts/ | 1500字SEO文章 |
| 每周LinkedIn草稿 | `0 7 * * 1,3,5` | workspace/linkedin/ | 200字数据帖 |
| 每周YouTube脚本 | `0 6 * * 1` | workspace/youtube/ | 视频脚本+数据 |
| 季度行业报告 | `0 8 1 1,4,7,10 *` | workspace/reports/ | 市场分析报告草稿 |
| 竞品告警扫描 | `*/30 * * * *` | 用户选择的渠道 | 价格/排名异动 |

**设置命令**:
```bash
openclaw cron add --name "Daily Brief" --cron "0 8 * * *" --tz "America/New_York" --session isolated --message "生成Amazon US市场每日简报，300字内" --announce --channel discord --to "channel:daily-intel"

openclaw cron add --name "Blog Draft" --cron "0 6 * * 1" --tz "America/New_York" --session isolated --message "从关键词库选1个未覆盖长尾词，写1500字SEO文章，保存到workspace/blog-drafts/"

openclaw cron add --name "LinkedIn" --cron "0 7 * * 1,3,5" --session isolated --message "生成LinkedIn数据洞察帖，含具体数字，200字内，保存到workspace/linkedin/"
```

---

## 11. 12周执行日历

### Week 1
| 天 | 任务 |
|----|------|
| D1 | 设置GitHub仓库元数据(description+topics) · 建nexscope org |
| D2 | 重写README · 截图制作 |
| D3 | Docker + Vercel部署 · 创建Discord服务器 |
| D4 | Reddit养号开始(r/FBA每天2-3评论) |
| D5 | LinkedIn Profile优化 · 首帖发布 |

### Week 2
| 天 | 任务 |
|----|------|
| D1 | Monitor加入4个导流触点(开发) |
| D2 | 设置邮箱收集后端(Formspree) |
| D3 | 加入4个Facebook FBA群组 |
| D4 | LinkedIn连接请求开始(每天20个) |
| D5 | Discord设置完成 · Cron自动推送配置 |

### Week 3
| 天 | 任务 |
|----|------|
| D1 | **Hacker News "Show HN" 发帖** |
| D2 | Reddit r/selfhosted + r/SideProject 发帖 |
| D3 | **Product Hunt Launch** |
| D4 | 冷邮件第一批(50封) |
| D5 | 开始OpenClaw Skills开发 |

### Week 4
| 天 | 任务 |
|----|------|
| D1-3 | SEO内容启动：关键词库建立 + 首批10篇文章 |
| D4 | YouTube频道设置 + 第1个视频录制 |
| D5 | Cron自动化全部配置完成 |

### Week 5-6
| 任务 |
|------|
| 发布5个OpenClaw Skills |
| 3个免费小工具开发上线 |
| YouTube发布首批3个视频 |
| Reddit首个"Free ASIN Analysis"帖 |
| 冷邮件第二批(100封) |

### Week 7-8
| 任务 |
|------|
| SEO累计50篇文章 |
| 第一份行业报告发布 |
| 联系5个Podcast主持人 |
| 邮件培育序列优化(看数据调整) |
| 首次Webinar举办 |

### Week 9-12
| 任务 |
|------|
| Podcast录制2-3期 |
| awesome-amazon-seller-tools发布 |
| 免费小工具迭代(看使用数据) |
| 冷邮件持续(每周50封) |
| 所有渠道数据复盘 · 砍掉低效渠道 · 加码高效渠道 |

---

## 12. KPI追踪表

| 指标 | W4 | W8 | W12 | 追踪工具 |
|------|-----|-----|------|---------|
| GitHub Stars | 500 | 1,500 | 3,000 | GitHub |
| Waitlist邮箱 | 200 | 800 | 2,000 | Google Sheet |
| Discord成员 | 100 | 300 | 800 | Discord |
| 网站月UV | — | 3,000 | 10,000 | Plausible/PostHog |
| YouTube订阅 | 50 | 300 | 1,000 | YouTube |
| Reddit Karma | 500 | 2,000 | 5,000 | Reddit |
| 冷邮件回复率 | 3% | 5% | 5% | SendGrid |
| 注册用户 | 30 | 200 | 800 | 产品数据库 |
| 付费用户 | — | 20 | 100 | Stripe |
| MRR | — | $1,000 | $5,000 | Stripe |

---

## 13. 所需资源

| 资源 | 用途 | 成本 |
|------|------|------|
| VPS (2核4G) | OpenClaw Gateway + Nexscope Agent | ~$20/mo |
| Vercel | Monitor部署 | Free |
| SendGrid/Resend | 邮件发送 | Free tier |
| Formspree | 邮箱收集 | Free tier |
| Plausible | 网站分析 | $9/mo |
| 域名 nexscope.ai | 品牌 | ~$30/yr |
| Canva Pro | 设计素材 | $13/mo |
| **总计** | | **~$60/mo** |

---

## 附录：相关文档

| 文档 | 内容 |
|------|------|
| [NEXSCOPE_MONITOR_PLAYBOOK.md](./NEXSCOPE_MONITOR_PLAYBOOK.md) | Monitor开源项目运营手册（README重写、导流设计、代码片段） |
| [NEXSCOPE_MARKETING_PLAN_V3.md](./NEXSCOPE_MARKETING_PLAN_V3.md) | V3版策略文档（含渠道原理说明，作为参考） |

---

> 阿霞 · 2026-03-05
