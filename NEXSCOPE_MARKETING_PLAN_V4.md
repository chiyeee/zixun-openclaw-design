# Nexscope Marketing Execution Plan v4.1
## 可执行清单 · 渠道×动作×节奏

> Nexscope · Amazon卖家数据智能平台 · 欧美市场
> 2026-03-05

---

## 0. 一页总览

```
BEFORE （让人知道）    →  DURING （让人试用）    →  AFTER （让人留下+推荐）
                           
GitHub开源              Waitlist邮箱收集         交付体验标准
Reddit社区              邮件培育序列             竞品告警推送
YouTube视频             免费→付费转化            增购触发机制
LinkedIn内容            冷邮件直接获客           转介绍奖励系统
SEO/Blog文章            
Facebook Groups         
OpenClaw生态            
Podcast/Webinar         
免费小工具              
行业报告/PR             
Discord/TG社区          
```

---

## 1. 目标客户

- Base在欧美的Amazon卖家（不含中国出海卖家）
- 月销$5K-$500K的中腰部卖家
- 已经在用Jungle Scout / Helium 10 / Keepa等工具，有付费习惯
- 主要出没在：Reddit r/FulfillmentByAmazon · Facebook FBA Groups · YouTube · LinkedIn

**一句话定位**: "You use 5 tools. We make them talk to each other."

---

## 2. 渠道执行

---

### 渠道A：GitHub运营

**目标**: 通过开源项目建立技术信任，用Stars和waitlist积累种子用户

**A1. 创建官方GitHub Organization**
- 组织名：`nexscope`
- 设置Organization Profile README，写清Nexscope是什么、monitor项目链接、waitlist链接

**A2. 仓库矩阵**
- `nexscope-monitor` — 现有的开源仪表盘项目（从 `hhw19970223` 迁移或fork到org下）
- `nexscope-skills` — OpenClaw技能包（5个Amazon分析skill）
- `awesome-amazon-seller-tools` — Amazon卖家工具精选列表（SEO引流用）
- `nexscope-examples` — 使用示例和集成教程（后期）

**A3. nexscope-monitor仓库整理**
- 重写README：产品截图/GIF + 一句话介绍 + 一键部署 + 功能列表 + Roadmap + waitlist CTA
- 截图制作：全屏仪表盘图 + 地图交互GIF
- 添加docker-compose.yml和Dockerfile，支持一键部署
- 添加Vercel Deploy按钮
- 设置仓库description和18个topics（ecommerce, amazon, dashboard, analytics等）
- 添加CONTRIBUTING.md、CHANGELOG.md、Issue模板

**A4. Monitor产品内导流改造**
- WorldMap面板底部加CTA卡片："Want keyword data for this country? → Join Nexscope"
- NewsPanel加一个"Seller Alerts" Tab，点进去是waitlist引导
- Footer加邮箱收集输入框
- 首次访问弹出Welcome Modal，引导填邮箱

**A5. awesome-amazon-seller-tools**
- 一个纯README仓库，整理Amazon卖家常用的所有工具分类
- 分类：关键词工具、选品工具、PPC管理、库存管理、Review管理、物流工具等
- Nexscope自然出现在列表中
- 设置topics，让搜"amazon seller tools github"能找到

**A6. 日常运营节奏**
- 每周发1个Release（哪怕是小更新）
- 24小时内首次回复所有Issue
- 每两周发1个Discussion帖（功能讨论或数据洞察）
- 每月写1篇Release Blog

**启动周**: W1-W2 · **持续投入**: 每周3小时

---

### 渠道B：Reddit

**目标**: 在Amazon卖家最集中的社区建立存在感，获取精准用户

**B1. 目标Subreddit**
- r/FulfillmentByAmazon（主阵地）
- r/AmazonSeller
- r/ecommerce
- r/Entrepreneur
- r/selfhosted（monitor开源项目发布用）
- r/SideProject（产品发布用）

**B2. 养号阶段（前2周）**
- 每天在r/FBA和r/AmazonSeller回答2-3个卖家问题
- 纯帮忙，不提任何产品
- 积累karma和社区信任

**B3. 内容阶段（第3周起）**
- 每周在r/FBA发1个数据洞察帖（90%价值内容，底部一行提monitor）
- 每2周发1个"Free ASIN Analysis"互动帖（卖家丢ASIN，你回复分析结果）
- monitor发布时在r/selfhosted和r/SideProject各发1帖

**B4. 规则**
- 绝不自动发帖
- 绝不硬广
- 每帖的产品提及不超过全文10%

**启动周**: W1 · **持续投入**: 每周4小时

---

### 渠道C：YouTube

**目标**: 建立长尾搜索流量入口，通过视频展示Nexscope数据分析能力

**C1. 频道设置**
- 频道名："Nexscope — Amazon Seller Intelligence"
- 封面和头像品牌统一
- About放monitor GitHub链接和waitlist链接

**C2. 内容系列规划**
- 系列A: 品类数据分析（周更，8-12分钟）
- 系列B: 竞品策略拆解（双周更，10-15分钟）
- 系列C: 工具教程（月更，5-8分钟）

**C3. 制作流程**
- 用Cron自动生成数据和脚本草稿
- 人工审核脚本
- 录屏monitor/Nexscope操作过程
- 简单剪辑后发布
- 每个视频描述放GitHub链接和waitlist链接

**C4. SEO优化**
- 标题用"数字+结果+时间"格式
- 描述前3行包含核心关键词
- 打Tags

**启动周**: W3 · **持续投入**: 每周6小时

---

### 渠道D：LinkedIn

**目标**: 触达品牌型Amazon卖家和团队决策者

**D1. Profile优化**
- 标题写清价值主张
- Banner放Nexscope品牌
- Featured放monitor GitHub链接和最新分析文章

**D2. 内容发布**
- 每周发2-3篇帖子：数据洞察帖为主，偶尔穿插开源分享帖和行业观点帖
- 用Cron自动生成草稿，人工微调后手动发布

**D3. 主动触达**
- 用Sales Navigator筛选Title含"Amazon"/"FBA"/"E-commerce"的Profile
- 每天发20-30个连接请求，附个性化消息
- 连接后不立即推销，先互动2-3次再分享分析报告

**启动周**: W2 · **持续投入**: 每周3小时

---

### 渠道E：冷邮件

**目标**: 直接触达已有付费习惯的Amazon卖家，用免费分析报告钩住

**E1. 线索收集**
- 从LinkedIn、Reddit、YouTube评论区筛选Amazon卖家
- 每周收集50个目标

**E2. 个性化报告生成**
- 拿到卖家的listing信息后，用Nexscope自动分析
- 自动生成1页PDF分析报告

**E3. 邮件序列**
- 5封邮件，跨21天
- Day 0: 免费价值钩子（指出listing的具体问题）
- Day 3: 发送分析报告PDF
- Day 7: 同品类成功案例
- Day 14: Beta试用邀请
- Day 21: 最后机会+社交证明

**E4. 工具和合规**
- 用SendGrid或Resend发送
- 每封邮件含退订链接
- 每人最多5封/月
- 遵守CAN-SPAM和GDPR

**E5. 人工跟进**
- 回复者由人工接手对话

**启动周**: W3 · **持续投入**: 每周3小时

---

### 渠道F：SEO / Blog

**目标**: 用长尾关键词文章覆盖Amazon卖家的搜索需求

**F1. 关键词库建立**
- 3个层级：工具词（高竞争高意向）、教程词（中竞争）、对比词（高意向）
- 目标200+关键词

**F2. 批量内容生成**
- 用programmatic-seo skill批量生成品类分析页
- 每周5页，目标6个月200+页
- 人工审核后发布

**F3. 深度文章**
- 每周1篇手动编辑的深度文章（1500-2000字）

**F4. 技术SEO**
- 每月用seo-audit skill检查一次
- 用backlink-analyzer规划外链策略

**启动周**: W4 · **持续投入**: 每周4小时

---

### 渠道G：Facebook Groups

**目标**: 在Amazon卖家聚集的FB群组建立信任

**G1. 加入核心群组**
- Amazon FBA Competitive Edge
- Amazon FBA High Rollers
- Seller Central Tips & Strategies
- Private Label Masters

**G2. 操作节奏**
- 前2周纯回答问题
- 第3周起每2周发1个"Free ASIN Analysis"互动帖（轮换群组）
- 收集到ASIN后用Nexscope分析，结果回复到评论

**启动周**: W2 · **持续投入**: 每周2小时

---

### 渠道H：OpenClaw生态

**目标**: 借OpenClaw热度获取技术型用户，同时把Nexscope做成可通过聊天使用的Agent服务

**H1. 发布Skills**
- 创建nexscope-skills仓库，包含5个Amazon分析skill
- 通过 `npx skills publish` 发布到skills.sh
- skill命名全部包含"amazon"关键词

**H2. Discord社区参与**
- 加入OpenClaw官方Discord
- 在#showcase发帖展示Nexscope
- 在#help回答电商相关问题

**H3. Agent服务部署**
- 在VPS上部署OpenClaw Gateway
- 配置Nexscope Agent + Discord Bot + Telegram Bot
- 用户可以通过聊天直接使用Nexscope分析功能

**H4. Cron自动化**
- 配置每日市场简报自动推送到Discord社区
- 配置每周博客/LinkedIn/YouTube草稿自动生成

**启动周**: W3 · **持续投入**: 每周2小时

---

### 渠道I：Podcast & Webinar

**目标**: 通过行业节目建立专家权威

**I1. Podcast**
- 准备一份独家数据报告作为嘉宾素材
- 联系5个Amazon卖家领域的Podcast主持人
- 目标录制2-3期

**I2. Webinar**
- 每月举办1次线上分享
- 注册需邮箱（导入waitlist）
- 直播中演示Nexscope
- 回放放到YouTube复用

**启动周**: W6 · **持续投入**: 每月4小时

---

### 渠道J：免费小工具

**目标**: 做几个独立的小工具，每个都是一个获客入口

**J1. 工具列表**
- ASIN Analyzer: 输入ASIN → 基础竞品数据 → 完整报告需注册
- Keyword Gap Finder: 你的ASIN vs 竞品 → Top5差距 → 完整列表需注册
- Listing Scorer: 输入URL → 打分 → 优化方案需注册
- Price Tracker: ASIN价格追踪 → 7天趋势 → 告警需注册

**J2. 技术实现**
- 每个是一个单页Web App
- 后端调Nexscope API
- 展示部分结果 + "Unlock Full Report"按钮引导注册

**启动周**: W5 · **一次性投入**: 8小时开发 · **后续**: 根据数据迭代

---

### 渠道K：行业报告 / PR

**目标**: 用独家数据报告获取媒体引用和高权重外链

**K1. 报告**
- 每季度出1份Amazon市场报告
- 用Nexscope数据生成独家洞察

**K2. 分发**
- 提交到电商媒体（Marketplace Pulse等）
- LinkedIn Thread形式发布摘要
- 博客发布完整版（下载需邮箱）

**启动周**: W8 · **持续投入**: 每季度6小时

---

### 渠道L：Discord / Telegram社区

**目标**: 建立自有用户社区，提高留存和口碑

**L1. 创建Nexscope Discord服务器**
- #announcements — 产品更新
- #daily-intel — 每日市场简报（Cron自动推送）
- #free-analysis — 用户丢ASIN，Bot自动返回分析
- #general — 卖家讨论
- #feature-requests — 需求收集

**L2. 同步运营Telegram群**
- 覆盖不用Discord的卖家
- 内容与Discord同步

**L3. 从其他渠道导流到社区**
- Reddit帖子、YouTube视频、冷邮件中都放Discord邀请链接

**启动周**: W2 · **持续投入**: 每周2小时

---

## 3. 线索获取 → 培育 → 转化

### 线索获取触点
- Monitor Footer邮箱输入框
- Monitor Welcome Modal
- Monitor WorldMap CTA
- 免费小工具注册
- YouTube/Reddit/LinkedIn引流到waitlist
- Webinar注册
- 行业报告下载

### 邮件培育序列
- 注册后立即: Welcome + 产品介绍（如提供了ASIN则附分析）
- +3天: 价值内容（竞品关键词洞察）
- +7天: 成功案例
- +14天: 竞品异动通知
- +21天: Beta试用邀请
- +30天: Win-back（如未激活）

### 定价层级
- Free: Monitor + 免费小工具（日限额）
- Starter $29/mo: 5个ASIN监控 + 基础关键词
- Pro $79/mo: 50个ASIN + 完整功能
- Enterprise $199/mo: 无限 + API + 团队

### 增购触发
- ASIN数接近上限 → 自动提示升级
- 高频使用某功能 → 展示Pro功能预览
- Q4旺季 → 限时优惠
- 使用满1个月 → 发送ROI报告

### 转介绍
- 每用户唯一referral link
- 推荐人: 1个月免费 · 被推荐人: 7天延长
- 使用满30天+活跃 → 自动邮件邀请推荐

---

## 4. 自动化Cron配置

```bash
# 每日市场简报 → Discord
openclaw cron add --name "Daily Brief" \
  --cron "0 8 * * *" --tz "America/New_York" \
  --session isolated \
  --message "生成Amazon US市场每日简报，300字内" \
  --announce --channel discord --to "channel:daily-intel"

# 每周博客草稿
openclaw cron add --name "Blog Draft" \
  --cron "0 6 * * 1" --tz "America/New_York" \
  --session isolated \
  --message "从关键词库选1个未覆盖长尾词，写1500字SEO文章，保存到workspace/blog-drafts/"

# 每周一三五LinkedIn草稿
openclaw cron add --name "LinkedIn" \
  --cron "0 7 * * 1,3,5" --session isolated \
  --message "生成LinkedIn数据洞察帖，含具体数字，200字内，保存到workspace/linkedin/"

# 每周YouTube脚本
openclaw cron add --name "YouTube Script" \
  --cron "0 6 * * 1" --session isolated \
  --message "生成本周YouTube视频脚本和数据，保存到workspace/youtube/"

# 季度行业报告草稿
openclaw cron add --name "Quarterly Report" \
  --cron "0 8 1 1,4,7,10 *" --session isolated \
  --message "生成本季度Amazon市场报告草稿，保存到workspace/reports/"
```

---

## 5. 12周执行日历

**W1**: GitHub仓库整理 · 建org · README重写 · 截图制作 · Docker部署 · Reddit养号开始
**W2**: Monitor导流改造 · 邮箱收集设置 · Discord服务器 · LinkedIn启动 · Facebook Groups加入
**W3**: **HN + PH发布monitor** · Reddit发帖 · 冷邮件第一批 · OpenClaw Skills开发 · YouTube频道设置
**W4**: SEO内容启动 · YouTube第1个视频 · Cron自动化配置完成 · awesome列表创建
**W5-6**: 免费小工具开发上线 · Skills发布 · YouTube持续更新 · Reddit互动帖 · 冷邮件第二批
**W7-8**: SEO累计50篇 · 第一份行业报告 · 联系Podcast · 首次Webinar · 邮件序列优化
**W9-12**: Podcast录制 · 所有渠道持续运营 · 数据复盘 · 砍掉低效渠道 · 加码高效渠道

---

## 6. KPI

| 指标 | W4 | W8 | W12 |
|------|-----|-----|------|
| GitHub Stars | 500 | 1,500 | 3,000 |
| Waitlist邮箱 | 200 | 800 | 2,000 |
| Discord成员 | 100 | 300 | 800 |
| 网站月UV | — | 3,000 | 10,000 |
| 注册用户 | 30 | 200 | 800 |
| 付费用户 | — | 20 | 100 |
| MRR | — | $1,000 | $5,000 |

---

## 7. 启动成本

| 资源 | 成本 |
|------|------|
| VPS (OpenClaw + Agent) | ~$20/mo |
| 域名 nexscope.ai | ~$30/yr |
| Vercel (Monitor部署) | Free |
| SendGrid (邮件) | Free tier |
| Formspree (邮箱收集) | Free tier |
| Plausible (分析) | $9/mo |
| **月总计** | **~$30/mo** |

---

## 附录

- [NEXSCOPE_MONITOR_PLAYBOOK.md](./NEXSCOPE_MONITOR_PLAYBOOK.md) — Monitor运营手册（README模板、导流代码、部署方案）
- [NEXSCOPE_MARKETING_PLAN_V3.md](./NEXSCOPE_MARKETING_PLAN_V3.md) — V3策略文档（含每个渠道的原理说明）

---

> 阿霞 · 2026-03-05
