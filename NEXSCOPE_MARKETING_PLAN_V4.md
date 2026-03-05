# Nexscope Marketing Execution Plan v4.2
## 可执行清单 · 渠道×动作×节奏

> Nexscope · Amazon卖家数据智能平台 · 欧美市场
> 2026-03-05

---

## 0. 一页总览

```
BEFORE （让人知道）        →  DURING （让人试用）    →  AFTER （让人留下+推荐）
                              
OpenClaw生态 + NexClaw       Waitlist邮箱收集         交付体验标准
GitHub开源运营               邮件培育序列             竞品告警推送
Reddit社区                   冷邮件直接获客           增购触发机制
YouTube KOL + 自制           免费→付费转化            转介绍奖励系统
LinkedIn内容                 
SEO/Blog + GEO              
TikTok短视频                
X (Twitter)                 
Facebook Groups             
免费小工具                  
行业报告/PR                 
Discord/TG社区              
Podcast/Webinar (低优先级)   
```

---

## 1. 目标客户

- Base在欧美的Amazon卖家（不含中国出海卖家）
- 月销$5K-$500K的中腰部卖家
- 已经在用Jungle Scout / Helium 10 / Keepa等工具，有付费习惯
- 主要出没在：Reddit r/FulfillmentByAmazon · Facebook FBA Groups · YouTube · LinkedIn
- **已有资产**: SellerPic产品积累的4万+海外电商用户注册邮箱

**一句话定位**: "You use 5 tools. We make them talk to each other."

---

## 2. 渠道执行

---

### 渠道A：OpenClaw生态 + NexClaw产品（优先级最高）

**目标**: 借OpenClaw热度，推出"NexClaw"——一个预部署好的、内置电商skills的OpenClaw云服务，类似MiniMax的MaxClaw模式

**参考模型**: MiniMax做了MaxClaw（maxclaw.ai），是OpenClaw的云托管版本，用户10秒部署，零运维。我们做NexClaw，同样基于OpenClaw，但专注电商卖家场景。

**A1. 产品定义：NexClaw**
- 基于OpenClaw框架的云托管电商AI Agent
- 预装全部电商相关skills（关键词调研、竞品分析、选品分析、Listing优化、价格监控）
- 用户注册后10秒内可用，通过Discord/Telegram/WhatsApp直接对话
- 免费版：每天5次ASIN分析；付费版：无限制
- 和MaxClaw的区别：MaxClaw是通用Agent，NexClaw是电商垂直Agent

**A2. OpenClaw Skills发布**
- 创建 `nexscope/nexscope-skills` GitHub仓库
- 开发5个Amazon分析skill，每个包含SKILL.md
- 通过 `npx skills publish` 发布到skills.sh
- skill命名全部包含"amazon"关键词，确保 `npx skills find amazon` 能搜到
- skills列表：amazon-keyword-scout / amazon-competitor-radar / amazon-listing-audit / amazon-niche-finder / amazon-price-tracker

**A3. OpenClaw Discord社区参与**
- 加入OpenClaw官方Discord（"Friends of the Crustacean 🦞🤝"）
- 在#showcase发帖展示NexClaw：做一个30秒演示GIF，WhatsApp输入ASIN → 返回竞品分析
- 在#help回答电商相关问题，建立"电商AI Agent专家"形象
- 日常互动：对别人的showcase给反馈，参与功能讨论

**A4. NexClaw部署**
- VPS上部署OpenClaw Gateway + Nexscope Agent
- 配置多渠道Bot（Discord + Telegram + WhatsApp）
- 预安装全部电商skills + 数据源对接
- 设置使用配额和付费验证

**A5. Cron自动化内容生产**
- 每日市场简报 → 推送到Discord社区
- 每周博客/LinkedIn/YouTube草稿自动生成
- 具体配置见第4节

**A6. 蹭OpenClaw热度做内容**
- 写"How to build an Amazon seller agent on OpenClaw"教程文章
- 录"OpenClaw for e-commerce sellers"教程视频
- 在Medium/Dev.to发布，吸引OpenClaw+电商交叉用户

**启动周**: W1 · **持续投入**: 每周3小时

---

### 渠道B：GitHub运营

**目标**: 通过开源项目建立技术信任，用Stars和waitlist积累种子用户

**B1. 创建官方GitHub Organization**
- 组织名：`nexscope`
- 设置Organization Profile README，写清Nexscope是什么、NexClaw是什么、monitor链接、waitlist链接

**B2. 仓库矩阵**

核心仓库：
- `nexscope-monitor` — 开源电商仪表盘（从 `hhw19970223` 迁移或fork到org下）
- `nexscope-skills` — OpenClaw电商技能包（5个Amazon分析skill）
- `nexscope-examples` — 使用示例和集成教程

引流型仓库（类awesome列表模式）：
- `awesome-amazon-seller-tools` — Amazon卖家工具精选列表（涵盖选品/关键词/PPC/库存/物流/Review等分类）
- `amazon-seller-resources` — Amazon卖家学习资源（课程/博客/播客/社区/书籍合集）
- `ecommerce-api-directory` — 电商API汇总（Amazon SP-API、各SaaS的API文档、示例代码）
- `amazon-category-data` — 公开的Amazon品类数据集（品类树、BSR变化趋势、节点ID映射）
- `openclaw-ecommerce-templates` — OpenClaw电商Agent模板（开箱即用的Agent配置+SOUL.md+技能预设）

**B3. nexscope-monitor仓库整理**
- 重写README：产品截图/GIF + 一句话介绍 + 一键部署 + 功能列表 + Roadmap + waitlist CTA
- 截图制作：全屏仪表盘图 + 地图交互GIF
- 添加docker-compose.yml和Dockerfile
- 添加Vercel Deploy按钮
- 设置仓库description和topics
- 添加CONTRIBUTING.md、CHANGELOG.md、Issue模板

**B4. 日常运营节奏**
- 每周发1个Release（哪怕是小更新）
- 24小时内首次回复所有Issue
- 每两周发1个Discussion帖
- 每月写1篇Release Blog

**启动周**: W1-W2 · **持续投入**: 每周3小时

---

### 渠道C：Reddit

**目标**: 在Amazon卖家最集中的社区建立存在感，获取精准用户

**C1. 目标Subreddit**
- r/FulfillmentByAmazon（主阵地）
- r/AmazonSeller
- r/ecommerce
- r/Entrepreneur
- r/selfhosted（monitor开源项目发布用）
- r/SideProject（产品发布用）

**C2. 养号阶段（前2周）**
- 每天在r/FBA和r/AmazonSeller回答2-3个卖家问题
- 纯帮忙，不提任何产品，不带任何链接
- 目标积累500+ karma

**C3. 内容阶段（第3周起）**
- 每周在r/FBA发1个数据洞察帖（90%价值内容，底部一行提monitor）
- 每2周发1个"Free ASIN Analysis"互动帖
- monitor发布时在r/selfhosted和r/SideProject各发1帖
- 链接放评论区（有人问才发），不放帖子正文

**C4. 防封号规则**
- 新号不发帖不带链接，只回复评论
- 积累500+ karma后再开始发帖
- 不在多帖中重复推同一个链接
- 不用同IP开多个号（如果之前封过号，换IP）
- 考虑Reddit Premium（$7/mo），付费账号被误封几率低
- 如果帖子被删，不要重新发布，换个角度下周再试

**启动周**: W1 · **持续投入**: 每周4小时

---

### 渠道D：YouTube

**目标**: 通过KOL合作快速获取流量，同时储备自制内容能力

**D1. KOL红人推广（主线）**

筛选标准：
- 粉丝1万-50万的中腰部Amazon卖家频道（太大的要价高、太小的没效果）
- 内容以工具测评、卖家教程为主
- 近3个月有更新，互动率>2%

合作方式：
- 免费产品测评：提供NexClaw免费Pro账号，换一期视频
- 付费植入：在其教程视频中15-30秒提到Nexscope/NexClaw
- 联合内容：共同制作"用AI分析Amazon竞品"类教程
- Affiliate分佣：给KOL专属注册链接，按注册/付费分佣

执行节奏：
- W3-W4: 筛选20个目标KOL，列出联系方式
- W5-W6: 发送合作邀请（冷邮件或DM），目标回复率10-15%
- W7起: 每月合作2-3个KOL

**D2. 自制内容（辅线，后期提升自动化后扩大）**
- 频道名："Nexscope — Amazon Seller Intelligence"
- 初期每月1-2个视频即可（数据分析类、工具教程类）
- 后期探索用Cron生成脚本 + AI配音 + 录屏自动化的制作流程

**启动周**: W3(KOL筛选) · **持续投入**: 每周4小时

---

### 渠道E：LinkedIn

**目标**: 触达品牌型Amazon卖家和团队决策者

**E1. Profile优化**
- 标题写清价值主张
- Banner放Nexscope品牌
- Featured放monitor GitHub链接和最新分析文章

**E2. 内容发布**
- 每周发2-3篇帖子：数据洞察帖为主，偶尔穿插开源分享帖和行业观点帖
- 用Cron自动生成草稿，人工微调后手动发布

**E3. 主动触达**
- 用Sales Navigator筛选Title含"Amazon"/"FBA"/"E-commerce"的Profile
- 每天发20-30个连接请求，附个性化消息
- 连接后不立即推销，先互动2-3次再分享分析报告

**启动周**: W2 · **持续投入**: 每周3小时

---

### 渠道F：冷邮件

**目标**: 直接触达已有付费习惯的Amazon卖家

**F1. 第一批目标：SellerPic已有用户（4万+邮箱）**
- 这是成本最低、转化率最高的渠道——用户已经注册过你的电商产品
- 从SellerPic用户库中筛选活跃用户（最近6个月登录过）
- 分批发送，每批500-1000封，观察打开率和退订率后调整

**F2. SellerPic用户专属邮件序列**
- Email 1: "We're building something new for Amazon sellers"（产品预告+waitlist）
- Email 2: "Here's what Nexscope can do that SellerPic couldn't"（差异化说明）
- Email 3: "Early access for SellerPic users"（优先试用邀请）

**F3. 外部线索邮件序列（第二批）**
- 从LinkedIn、Reddit、YouTube评论区筛选Amazon卖家
- 每周收集50个目标
- 用Nexscope自动分析卖家listing → 生成1页PDF报告 → 作为邮件钩子
- 5封邮件跨21天：免费分析→报告PDF→成功案例→Beta邀请→最后机会

**F4. 工具和合规**
- 用SendGrid或Resend发送
- 每封邮件含退订链接
- 遵守CAN-SPAM和GDPR

**启动周**: W2(SellerPic批次) / W4(外部批次) · **持续投入**: 每周3小时

---

### 渠道G：SEO / Blog + GEO

**目标**: 长尾关键词覆盖Amazon卖家搜索需求 + 优化AI引擎引用

**G1. 传统SEO**
- 建立200+关键词库（工具词/教程词/对比词三层级）
- 用programmatic-seo skill批量生成品类分析页，每周5页
- 每周1篇手动编辑的深度文章
- 每月用seo-audit skill检查技术SEO

**G2. 蹭热点内容**
- OpenClaw生态相关："Best OpenClaw skills for Amazon sellers"、"How to use OpenClaw for e-commerce"、"NexClaw vs MaxClaw for sellers"
- AI Agent热点："AI agents for Amazon FBA"、"ChatGPT for Amazon sellers"
- 工具对比蹭流量："Jungle Scout vs Helium 10 vs Nexscope 2026"

**G3. GEO（Generative Engine Optimization）**

GEO的目标不是传统Google排名，而是让ChatGPT/Gemini/AI Overview在回答"best amazon seller tools"时引用和推荐Nexscope。

具体做法：
- **结构化内容**: 每篇文章用清晰的H2/H3层级、FAQ schema、定义列表。AI更容易解析结构化内容
- **权威声明**: 在内容中明确说明数据来源和方法论。AI引擎倾向引用有明确来源的内容
- **问答格式**: 围绕用户会问AI的问题组织内容。比如"What is the best tool for Amazon keyword research?" → 直接回答 → 再展开
- **实体关联**: 确保Nexscope在Wikipedia/Wikidata/Crunchbase等知识库中有条目（后期），AI引擎从这些地方构建实体认知
- **多平台提及**: 让Nexscope被尽可能多的第三方页面提到（GitHub、Reddit帖子、Medium文章、Product Hunt、G2/Capterra评测）——AI引擎通过多源交叉验证来决定是否引用
- **定期测试**: 每月在ChatGPT/Gemini/Perplexity中搜索目标关键词，检查Nexscope是否出现在回答中
- **OpenClaw文档贡献**: 如果能在docs.openclaw.ai的showcase或provider页面中出现，AI训练数据更可能包含

**G4. Skills/OpenClaw SEO关键词补充**
- "openclaw amazon skills"
- "openclaw ecommerce agent"
- "AI agent for amazon sellers"
- "NexClaw ecommerce"
- 这些长尾词目前竞争极低，容易排名

**启动周**: W4 · **持续投入**: 每周4小时

---

### 渠道H：TikTok

**目标**: 品牌认知和顶部漏斗——触达大量Amazon卖家（尤其新卖家和年轻卖家）

**说明**: #amazonfba标签在TikTok上有数十亿播放量，Amazon FBA内容非常活跃。但受众偏年轻/新手卖家，和核心目标客户（中腰部$5K-$500K）有偏差。适合做品牌曝光，不适合直接转化。

**H1. 内容方向**
- "数据揭秘"类短视频：30秒内用Nexscope数据展示某个品类的意外发现
- "对比"类：工具对比、竞品对比
- "教程片段"：从YouTube长视频中剪出15-60秒的精华片段复用

**H2. KOL合作**
- 在TikTok上同步找Amazon FBA类KOL合作
- 可以和YouTube KOL同步谈（很多KOL同时有TikTok和YouTube）

**H3. 执行节奏**
- 初期从YouTube内容中剪辑复用，不单独制作
- 每周2-3条短视频
- 观察数据后决定是否加大投入

**启动周**: W5（依赖YouTube内容启动后） · **持续投入**: 每周1-2小时

---

### 渠道I：X (Twitter)

**目标**: 在SaaS/AI/电商创业圈建立品牌，触达工具型买家和行业KOL

**说明**: Amazon卖家在X上不如Reddit/Facebook活跃，但电商SaaS圈（Jungle Scout创始人、独立开发者、AI agent社区）都在X上。适合B2B品牌建设。

**I1. 账号定位**
- 以Nexscope品牌号运营
- 内容：产品更新 + 数据洞察 + AI/OpenClaw相关 + 行业评论

**I2. 内容策略**
- 发布monitor项目更新和数据洞察
- 分享AI agent demo（GIF/视频）
- 参与OpenClaw社区讨论（转发、评论官方推文）
- 在#AmazonFBA #ecommerce #AIAgent等话题下互动

**I3. 执行节奏**
- 每天1-2条推文
- 每天互动5-10条（评论/转发行业内容）
- 内容可以和LinkedIn复用

**启动周**: W2 · **持续投入**: 每周2小时

---

### 渠道J：Facebook Groups

**目标**: 在Amazon卖家聚集的FB群组建立信任

**J1. 加入核心群组**
- Amazon FBA Competitive Edge
- Amazon FBA High Rollers
- Seller Central Tips & Strategies
- Private Label Masters

**J2. 操作节奏**
- 前2周纯回答问题
- 第3周起每2周发1个"Free ASIN Analysis"互动帖（轮换群组）
- 收集到ASIN后用Nexscope分析，结果回复到评论

**启动周**: W2 · **持续投入**: 每周2小时

---

### 渠道K：免费小工具

**目标**: 做几个独立的小工具，每个都是一个获客入口

**K1. 工具列表**
- ASIN Analyzer: 输入ASIN → 基础竞品数据 → 完整报告需注册
- Keyword Gap Finder: 你的ASIN vs 竞品 → Top5差距 → 完整列表需注册
- Listing Scorer: 输入URL → 打分 → 优化方案需注册
- Price Tracker: ASIN价格追踪 → 7天趋势 → 告警需注册

**K2. 技术实现**
- 每个是一个单页Web App
- 后端调Nexscope API
- 展示部分结果 + "Unlock Full Report"按钮引导注册

**启动周**: W5 · **一次性投入**: 8小时开发 · **后续**: 根据数据迭代

---

### 渠道L：行业报告 / PR

**目标**: 用独家数据报告获取媒体引用和高权重外链（同时利好GEO）

**L1. 报告**
- 每季度出1份Amazon市场报告
- 用Nexscope数据生成独家洞察

**L2. 分发**
- 提交到电商媒体（Marketplace Pulse等）
- LinkedIn Thread形式发布摘要
- 博客发布完整版（下载需邮箱）

**启动周**: W8 · **持续投入**: 每季度6小时

---

### 渠道M：Discord / Telegram社区

**目标**: 建立自有用户社区，提高留存和口碑

**M1. 创建Nexscope Discord服务器**
- #announcements — 产品更新
- #daily-intel — 每日市场简报（Cron自动推送）
- #free-analysis — 用户丢ASIN，Bot自动返回分析
- #general — 卖家讨论
- #feature-requests — 需求收集

**M2. 同步运营Telegram群**

**M3. 从其他渠道导流到社区**

**启动周**: W2 · **持续投入**: 每周2小时

---

### 渠道N：Podcast & Webinar（低优先级）

**说明**: 中国团队直接做英文Podcast难度大，暂不作为主线。后期如果有了英文内容负责人或者找到合适的co-host再启动。

**备选动作**：
- 作为嘉宾参与（而非自己主持），准备独家数据报告作为嘉宾素材
- 用Webinar形式做产品演示（可以用屏幕共享+打字交流代替口语）
- 目标Podcast: AM/PM Podcast · Serious Sellers · The Amazing Seller

**启动周**: W8+ · **按机会触发**

---

## 3. 线索获取 → 培育 → 转化

### 线索获取触点
- **SellerPic存量邮箱（4万+）** ← 优先级最高，零获取成本
- Monitor Footer/Welcome Modal邮箱收集
- NexClaw注册
- 免费小工具注册
- YouTube/Reddit/LinkedIn/TikTok/X引流到waitlist
- 行业报告下载

### 邮件培育序列
- 注册后立即: Welcome + 产品介绍（如提供了ASIN则附分析）
- +3天: 价值内容（竞品关键词洞察）
- +7天: 成功案例
- +14天: 竞品异动通知
- +21天: Beta试用邀请
- +30天: Win-back（如未激活）

### 定价层级
- Free: Monitor + NexClaw免费版（每天5次分析）
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

## 5. 14周执行日历

**W1**: GitHub org创建 · 仓库矩阵搭建 · Monitor README重写 · Reddit养号开始 · NexClaw产品定义
**W2**: OpenClaw Skills开发 · Discord/TG社区创建 · LinkedIn启动 · X账号启动 · Facebook Groups加入 · SellerPic冷邮件第一批
**W3**: NexClaw部署 · OpenClaw Discord发帖 · YouTube KOL筛选(20个目标) · Reddit继续养号 · HN "Show HN"发帖
**W4**: Product Hunt发布 · SEO内容启动+关键词库 · KOL合作邀请发送 · 外部冷邮件第一批 · Cron自动化配置
**W5-W6**: 免费小工具开发上线 · 首批KOL合作视频 · TikTok开始(复用YouTube内容) · awesome列表发布 · 引流型仓库陆续创建
**W7-W8**: SEO累计30+篇 · GEO优化启动 · 蹭热点内容批量发布 · 第一份行业报告
**W9-W10**: KOL合作持续 · 邮件序列优化 · 所有渠道数据复盘
**W11-W14**: 砍掉低效渠道 · 加码高效渠道 · 探索Podcast机会 · NexClaw产品迭代

---

## 6. KPI

| 指标 | W4 | W8 | W14 |
|------|-----|-----|------|
| GitHub Stars (monitor) | 500 | 1,500 | 3,000 |
| Waitlist邮箱 | 200 | 800 | 2,000 |
| NexClaw注册 | 50 | 300 | 1,000 |
| Discord成员 | 100 | 300 | 800 |
| 网站月UV | — | 3,000 | 10,000 |
| KOL合作视频 | — | 3 | 10 |
| 注册用户 | 30 | 200 | 800 |
| 付费用户 | — | 20 | 100 |
| MRR | — | $1,000 | $5,000 |

---

## 7. 启动成本

| 资源 | 成本 |
|------|------|
| VPS (OpenClaw Gateway + NexClaw) | ~$20/mo |
| 域名 nexscope.ai / nexclaw.ai | ~$60/yr |
| Vercel (Monitor部署) | Free |
| SendGrid (邮件) | Free tier |
| Formspree (邮箱收集) | Free tier |
| Plausible (分析) | $9/mo |
| Reddit Premium | $7/mo |
| **月总计** | **~$40/mo** |

---

## 附录

- [NEXSCOPE_MONITOR_PLAYBOOK.md](./NEXSCOPE_MONITOR_PLAYBOOK.md) — Monitor运营手册（README模板、部署方案）
- [NEXSCOPE_MARKETING_PLAN_V3.md](./NEXSCOPE_MARKETING_PLAN_V3.md) — V3策略文档（含每个渠道的原理说明）

---

> 阿霞 · 2026-03-05
