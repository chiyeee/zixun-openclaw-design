# Nexscope Marketing Execution Plan v4.5
## 可执行清单 · 渠道×动作×节奏

> Nexscope · AI-Native Agent平台 · 美国Amazon卖家
> 基于Linkfox Agent出海化 · 结合OpenClaw趋势红利
> 2026-03-06

---

## 1. 产品定义 & 目标客户

### 产品本质

Nexscope是Linkfox Agent的出海版本，是一款专为美国电商卖家（以Amazon生态为主）打造的AI-Native Agent平台，覆盖三大能力场景：

- **洞察 (Insights)**: 市场趋势、竞品分析、关键词研究、选品机会
- **运营 (Operations)**: Listing优化、库存建议、价格策略、Review监控
- **营销 (Marketing)**: 广告优化、站外引流、社交内容、邮件策略

**核心打法**: 免部署 + 电商Skill + 垂类数据源 + Agent——借OpenClaw趋势红利，用零门槛的Agent体验获客

**市场时机**: 海外卖家正在积极拥抱AI但充满焦虑——传统岗位（运营助理、数据分析师、广告投手）的工作流正在被AI效能工具改写释放。Nexscope切入的是高频、碎片化的日常场景，成为连接卖家需求、网页数据与行动建议的AI能力中枢。

### 目标客户

- Base在美国和欧洲的Amazon卖家（不含中国出海卖家）
- 月销$5K-$500K的中腰部卖家
- 已经在用Jungle Scout / Helium 10 / Keepa等工具，有付费习惯
- 正在经历"AI焦虑"——知道AI能提效但不知道怎么用到自己的电商业务中
- 主要出没在：Reddit r/FulfillmentByAmazon · Facebook FBA Groups · YouTube · LinkedIn
- **已有资产**: SellerPic产品积累的4万+注册邮箱

### 定位

**一句话**: "The AI command center for Amazon sellers — insights, operations, and marketing in one agent."

**vs 竞品卡位**:
- Jungle Scout / Helium 10 = 传统SaaS工具，人去操作工具
- Nexscope = AI-Native Agent，Agent主动给你洞察和建议，你和Agent对话完成工作

---

## 2. 渠道执行

> 渠道编号按优先级排序：A-F = 🔴P0核心发力 · G-L = 🟡P1日常持续 · M-N = 🟢P2新尝试 · O-P = ⚪P3后续探索

---

### 渠道A：OpenClaw生态 + Nexscope Agent

**优先级**: 🔴 P0 · **目标**: 借OpenClaw趋势红利，用"免部署+电商Skill+垂类数据源+Agent"组合获客

**参考模型**: MiniMax做了MaxClaw（maxclaw.ai），是OpenClaw的通用云托管Agent，10秒部署零运维。Nexscope做的是同一件事，但垂直到电商——底层是Linkfox Agent的能力（洞察/运营/营销三大场景），通过OpenClaw框架免部署交付给用户。

> **核心逻辑**: 推广分两条线——线1面向OpenClaw现有用户（用skills和社区拉他们进来），线2面向Amazon卖家（他们不知道也不在乎OpenClaw是什么，只关心"能不能帮我多赚钱"）。skills是获客入口，Agent是留存产品。

#### A1. Nexscope Agent产品形态
- 基于OpenClaw框架 + Linkfox Agent核心能力的云托管电商AI Agent
- 预装全部电商skills + 对接垂类数据源（Amazon前台、SP-API、H10 API、Jungle Scout API等）

**统一产品形态：云托管Web端**（类MaxClaw模式）
- 所有用户都通过 nexscope.ai 使用，无需自己部署
- OpenClaw用户和Amazon卖家用的是同一个产品，区别只在获客路径和文案包装

**线1：面向OpenClaw用户**（知道OpenClaw，想找电商垂直Agent）

这些人已经理解Agent的价值，不需要教育"什么是AI Agent"，只需要告诉他们"电商场景有现成的"。

渠道和推广方式：
- **skills.sh冲榜**：发布5-8个`amazon-`开头的skill，`npx skills find amazon`全是Nexscope的（详见A2）
- **OpenClaw Discord**：每周#showcase发demo，#help回答电商问题，成为"电商AI代表"（详见A3）
- **OpenClaw官方文档/clawhub.ai**：提PR到showcase页面，作为OpenClaw应用案例展示
- **GitHub**：`openclaw-ecommerce-templates`仓库，提供开箱即用的电商Agent配置模板（SOUL.md + skills预设 + 数据源配置），让OpenClaw用户可以参考或直接用Nexscope云托管版
- **MaxClaw对比内容**："MaxClaw vs Nexscope"文章，发Medium/Dev.to/Reddit r/selfhosted（详见A4）
- **技术教程**：在Medium/Dev.to写"How to build an Amazon seller agent on OpenClaw"，YouTube录教程（详见A5）
- **HN / Product Hunt**：首波技术流量来源（详见A5）
- **X/Twitter**：每周发Agent demo GIF，tag @OpenClaw官方账号

文案方向：
- "OpenClaw's e-commerce agent — Amazon insights, operations, and marketing built in"
- "Like MaxClaw, but purpose-built for Amazon sellers"
- 强调：预装电商skills + 垂类数据源 + 免部署，比自己搭省时间

转化路径：skills.sh/Discord/GitHub/教程 → 发现Nexscope → nexscope.ai注册 → 免费试用 → 付费

**线2：面向Amazon卖家**（不知道/不在乎OpenClaw）

这些人的决策逻辑是"能不能帮我省时间/多赚钱"，不关心底层技术。

渠道和推广方式：
- **Reddit**：r/FulfillmentByAmazon · r/AmazonSeller · r/AmazonFBA，先养号再发数据帖和"Free ASIN Analysis"互动帖（详见渠道G）
- **YouTube KOL**：找1万-50万粉的Amazon卖家频道做测评/植入（详见渠道C）
- **Facebook Groups**：FBA Competitive Edge等群组回答问题+互动帖（详见渠道O）
- **LinkedIn**：数据洞察帖+Sales Navigator主动触达品牌卖家（详见渠道H）
- **冷邮件**：SellerPic 4万+邮箱是第一批，外部线索是第二批（详见渠道I）
- **SEO/GEO**：长尾关键词覆盖"amazon seller tools"等搜索+AI引擎引用优化（详见渠道D）
- **付费广告**：Google Ads搜索词+Reddit Ads按subreddit+Facebook lookalike（详见渠道E）
- **免费小工具**：ASIN Analyzer等单页工具，部分结果免费，完整需注册（详见渠道K）
- **"Drop your ASIN"免费分析活动**：Reddit/Facebook每周1次，背后Agent自动跑，看到结果→引导注册（详见A6）

文案方向：
- ❌ "Nexscope is an OpenClaw-based agent with pre-installed e-commerce skills"
- ✅ "Nexscope is your AI assistant for Amazon — ask it anything about your competitors, keywords, or listings"
- 卖家不需要知道底层是OpenClaw，就像用ChatGPT不需要知道它跑在Azure上

转化路径：Reddit/YouTube/广告/SEO → nexscope.ai → 免费分析体验 → 注册 → 付费

#### A2. OpenClaw Skills发布 + skills.sh冲榜
- 创建 nexscope-ai/nexscope-skills GitHub仓库
- 开发5-8个skill，每个解决一个具体痛点（不做大而全）：
  - `amazon-keyword-scout` — 关键词挖掘+搜索量
  - `amazon-competitor-radar` — ASIN竞品分析
  - `amazon-listing-audit` — Listing质量评分+优化建议
  - `amazon-niche-finder` — 品类机会发现
  - `amazon-price-tracker` — 价格监控+趋势
  - `amazon-review-analyzer` — Review情感分析+痛点提取
  - `amazon-bsr-monitor` — BSR排名变化追踪
  - `amazon-ppc-optimizer` — 广告关键词建议
- **命名策略**: 全部以 `amazon-` 开头，确保 `npx skills find amazon` 搜到的全是Nexscope的
- 每个skill的SKILL.md写清usage example，一眼看懂能干嘛
- README底部加引导："Part of the Nexscope suite — [try the full agent](链接)"
- **冲安装量**：
  - 每篇教程/文章里都写安装命令 `npx skills add nexscope-ai/nexscope-skills@amazon-keyword-scout -g`
  - 在OpenClaw Discord回答问题时自然提到："you can use the amazon-keyword-scout skill for this"
  - GitHub README放安装命令
  - 团队内部OpenClaw实例也安装（初始安装量不为零）
- **当前竞争环境**: 电商类skills基本空白——最高的 `apify-ecommerce` 才1.1K安装，而营销类 `seo-audit` 有33K。蓝海窗口期。

#### A3. OpenClaw Discord社区深度参与
目标不是发一帖就走，而是**成为社区里"电商AI"方向的代表人物**。

- **每周在 #showcase 发1个短demo**（GIF或30秒视频）：
  - "输入ASIN → 30秒出竞品报告"
  - "问Agent：这个品类还能做吗？→ 给出数据分析"
  - "对比两个ASIN的关键词覆盖"
- **在 #help 主动回答**和电商/数据分析相关的问题
- **在 #general 参与讨论**时自然带出使用场景
- **不硬推**——目标是让人觉得"这个人在电商AI这块做得很深"，而不是"又来打广告了"
- 提PR到 docs.openclaw.ai 的showcase页面，展示Nexscope作为应用案例
- 在 clawhub.ai 提交展示（如有展示位）

#### A4. MaxClaw差异化对比内容
MaxClaw是通用Agent，Nexscope是电商垂直Agent。天然的对比素材：

- 写一篇 **"MaxClaw vs Nexscope: Which OpenClaw agent for Amazon sellers?"**
- 不踩MaxClaw，而是说"MaxClaw很好但它是通用的，如果你是卖家，Nexscope预装了电商数据和skills"
- 这篇文章本身就是SEO资产——搜 "maxclaw alternative" 或 "openclaw for ecommerce" 能找到

#### A5. OpenClaw生态内容矩阵
面向OpenClaw用户和开发者的内容，让他们发现Nexscope：

| 平台 | 内容 | 目标受众 |
|------|------|---------|
| Medium/Dev.to | "How I built an Amazon seller agent on OpenClaw" 完整教程 | 开发者 + SEO |
| Medium/Dev.to | "OpenClaw for e-commerce — connecting AI to Amazon data" | OpenClaw用户 |
| YouTube | "OpenClaw for e-commerce sellers — full setup tutorial" 长视频 | 长尾搜索 |
| YouTube | "Build your own Amazon AI agent in 10 minutes" 短教程 | 开发者 |
| Reddit r/selfhosted | "Show: open-source Amazon seller intelligence agent" | 技术用户 |
| HN "Show HN" | "Nexscope — OpenClaw-based e-commerce AI agent" | 首波技术流量 |
| X/Twitter | 每周1个Agent demo GIF + tag @OpenClaw | OpenClaw社区 |
| Dev.to | "AI is replacing your Amazon VA — here's what's actually happening" | 切中AI焦虑 |

#### A6. 面向卖家的"免费体验"驱动口碑
让卖家零门槛体验Agent能力，是最强的推广方式——背后就是OpenClaw Agent在跑，但卖家不需要知道：

- **Reddit/Facebook "Drop your ASIN" 活动**：
  - 在r/FulfillmentByAmazon发帖："I built an AI that analyzes Amazon products — drop your ASIN and I'll send you a free report"
  - 背后是Nexscope Agent自动跑分析
  - 卖家看到结果 → "这怎么用？" → 引导到Nexscope注册/waitlist
  - 每周做1次，轮换Reddit和Facebook
- **KOL演示脚本**：
  1. 打开Nexscope
  2. 输入一个ASIN
  3. 30秒收到完整竞品分析
  4. "就这么简单。"
  - 核心是让KOL自己体验到价值——自己觉得好，才会真心推荐

#### A7. 自动化Cron配置
- 每日市场简报 → Discord #daily-intel
- 每周博客/LinkedIn/YouTube草稿自动生成
- （详见第4节Cron配置）

**启动周**: W1 · **持续投入**: 每周5小时（含社区互动+内容+skills维护）

---

### 渠道B：GitHub运营

**优先级**: 🔴 P0 · **目标**: 通过开源项目建立技术信任，用Stars和waitlist积累种子用户

**B1. 创建官方GitHub Organization**
- 组织名：nexscope-ai (<https://github.com/nexscope-ai>)
- 设置Organization Profile README，写清Nexscope定位、Agent产品形态、monitor链接、waitlist链接

**B2. 仓库矩阵**

核心仓库：
- `nexscope-monitor` — 开源电商仪表盘（从 hhw19970223 迁移或fork到org下）
- `nexscope-skills` — OpenClaw电商技能包（多个Amazon分析skill）
- `nexscope-examples` — 使用示例和集成教程

引流型仓库（类awesome列表模式 - 文章）：
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

### 渠道C：YouTube

**优先级**: 🔴 P0 · **目标**: 通过KOL合作快速获取流量，同时储备自制内容能力

**C1. KOL红人推广（主线）**

筛选标准：
- 粉丝1万-50万的中腰部Amazon卖家频道（太大的要价高、太小的没效果）
- 内容以工具测评、卖家教程为主
- 近3个月有更新，互动率>2%

**C2. 自制内容（辅线，后期提升自动化后扩大）**
- 频道名："Nexscope — Amazon Seller Intelligence"
- 初期每月1-2个视频即可（数据分析类、工具教程类）
- 后期探索用Cron生成脚本 + AI配音 + 录屏自动化的制作流程

**启动周**: W3(KOL筛选) · **持续投入**: 每周4小时

---

### 渠道D：SEO / Blog + GEO

**优先级**: 🔴 P0 · **目标**: 长尾关键词覆盖Amazon卖家搜索需求 + 优化AI引擎引用

**D1. 传统SEO**
- 电商/openclaw相关的关键词研究
- 用programmatic-seo skill批量生成品类分析页，每周5页
  - nexscope.ai/insights/amazon-electronics-us-2026
  - nexscope.ai/insights/amazon-home-kitchen-us-2026
  - nexscope.ai/insights/amazon-beauty-de-2026
  - ...
- 每周1篇手动编辑的深度文章
- 每月用seo-audit skill检查技术SEO

**D2. 蹭热点内容**
- OpenClaw生态相关："Best OpenClaw skills for Amazon sellers"、"How to use OpenClaw for e-commerce"、"Nexscope vs MaxClaw for Amazon sellers"、"openclaw ecommerce agent"、"openclaw amazon skills"
- AI Agent热点："AI agents for Amazon FBA"、"ChatGPT for Amazon sellers"、"AI agent for amazon sellers"
- 工具对比蹭流量："Jungle Scout vs Helium 10 vs Nexscope 2026"

**D3. GEO（Generative Engine Optimization）**

GEO的目标不是传统Google排名，而是让ChatGPT/Gemini/AI Overview在回答"best amazon seller tools"时引用和推荐Nexscope。

具体做法：
- **结构化内容**: 每篇文章用清晰的H2/H3层级、FAQ schema、定义列表。AI更容易解析结构化内容
- **权威声明**: 在内容中明确说明数据来源和方法论。AI引擎倾向引用有明确来源的内容
- **问答格式**: 围绕用户会问AI的问题组织内容。比如"What is the best tool for Amazon keyword research?" → 直接回答 → 再展开
- **实体关联**: 确保Nexscope在Wikipedia/Wikidata/Crunchbase等知识库中有条目（后期），AI引擎从这些地方构建实体认知
- **多平台提及**: 让Nexscope被尽可能多的第三方页面提到（GitHub、Reddit帖子、Medium文章、Product Hunt、G2/Capterra评测）——AI引擎通过多源交叉验证来决定是否引用

**启动周**: W4 · **持续投入**: 每周4小时

---

### 渠道E：付费广告

**优先级**: 🔴 P0 · **目标**: 精准触达高意向Amazon卖家，加速获客

**E1. Google Ads（搜索广告）**
- 投放关键词："amazon seller tools"、"amazon keyword research tool"、"amazon competitor analysis tool"、"jungle scout alternative"
- 这些词CPC较高（$3-$10），但意向极强——搜这些词的人正在找工具
- 先小预算测试（$20-$30/天），看注册成本，再决定是否放大
- 落地页直接进Nexscope Agent注册/waitlist

**E2. Reddit Ads**
- Reddit支持按subreddit精准投放，直接投r/FulfillmentByAmazon、r/AmazonSeller
- 比Google Ads便宜，CPC通常$1-$3
- 用"Free ASIN Analysis"作为广告钩子，点击后进分析工具页
- 注意：Reddit用户反感硬广，广告素材要像自然帖子（数据洞察风格）

**E3. YouTube Ads**
- 投放到Amazon FBA教程类视频的前贴片（in-stream ads）
- 素材：15-30秒演示Nexscope Agent分析ASIN的过程
- 按观看付费（CPV $0.05-$0.15），比较划算
- 可以和KOL合作内容复用为广告素材

**E4. Facebook/Instagram Ads**
- 用自定义受众（SellerPic邮箱列表）创建lookalike audience
- SellerPic 4万+邮箱是极有价值的种子受众——Facebook能据此找到相似人群
- 投放到Feed和Reels
- 素材：数据可视化截图 + 短文案

**E5. 预算规划**
- Phase 1 (W4-W8): $500/月，测试各平台，找到CPA最低的渠道
- Phase 2 (W9+): 集中预算到表现最好的1-2个平台，$1000-$2000/月
- 目标CPA: 注册<$5，付费转化<$50

**启动周**: W4（产品可用后） · **持续投入**: 每周2小时优化 + 广告预算

---

### 渠道F：红人/KOL合作（跨平台）

**优先级**: 🔴 P0 · **目标**: 通过红人背书快速建立信任，获取精准卖家流量

**说明**: YouTube KOL在渠道C中已单独写了。这里是跨平台的红人策略总览。

**F1. 红人类型和平台**

Tier 1 · Amazon卖家KOL（核心）：
- YouTube: 工具测评、FBA教程频道（1万-50万粉）
- TikTok: Amazon FBA tips类账号
- Instagram: 电商生活方式类账号
- Podcast: AM/PM Podcast、Serious Sellers等（作为嘉宾或赞助）

Tier 2 · AI/SaaS类KOL（品牌扩展）：
- YouTube/X: AI工具测评、SaaS产品评测频道
- 切入角度："AI agent for Amazon sellers"是新品类，科技KOL有兴趣
- 适合做Nexscope vs MaxClaw、AI agent工作流之类的内容

Tier 3 · 电商行业媒体（权威背书）：
- Marketplace Pulse、eCommerce Fuel、Seller Sessions
- 合作形式：独家数据报告 → 媒体引用 → 品牌曝光

**F2. 合作方式**
- 免费Pro账号换测评（零成本，适合冷启动）
- 付费植入（$200-$2000/条，看粉丝量）
- Affiliate分佣（给红人专属链接，按注册$5/付费15%分佣）
- 联合内容（共同制作教程或数据分析视频）
- 赞助播客（$500-$3000/期，看听众量）

**F3. 执行流程**
- 建一个红人数据库（Google Sheet：名字/平台/粉丝量/互动率/联系方式/合作状态）
- W3-W4: 筛选50个目标红人
- W5起: 每周发送10封合作邀请
- 目标回复率10-15%，每月落地3-5个合作

**F4. 素材支持**
- 准备一个"KOL合作包"：产品介绍one-pager + demo视频 + 数据截图 + talking points
- 给每个合作红人创建专属landing page（`nexscope.ai/partner/[name]`）

**启动周**: W3 · **持续投入**: 每周3小时 + 合作预算

---

### 渠道G：Reddit

**优先级**: 🟡 P1 · **目标**: 在Amazon卖家最集中的社区建立存在感，获取精准用户

**G1. 目标Subreddit**
- r/FulfillmentByAmazon（主阵地）
- r/AmazonSeller
- r/AmazonFBA
- r/ecommerce
- r/SideProject（产品发布用）

**G2. 养号阶段（前2周）**
- 每天在r/FBA和r/AmazonSeller回答2-3个卖家问题
- 纯帮忙，不提任何产品，不带任何链接
- 目标积累500+ karma

**G3. 内容阶段（第3周起）**
- 每周在r/FBA发1个数据洞察帖（90%价值内容，底部一行提monitor）
- 每2周发1个"Free ASIN Analysis"互动帖
- 链接放评论区（有人问才发），不放帖子正文

**G4. 防封号规则**
- 新号不发帖不带链接，只回复评论
- 积累500+ karma后再开始发帖
- 不在多帖中重复推同一个链接
- 不用同IP开多个号（如果之前封过号，换IP）
- 考虑Reddit Premium（$7/mo），付费账号被误封几率低
- 如果帖子被删，不要重新发布，换个角度下周再试

**启动周**: W1 · **持续投入**: 每周4小时

---

### 渠道H：LinkedIn

**优先级**: 🟡 P1 · **目标**: 触达品牌型Amazon卖家和团队决策者

**H1. Profile优化**
- 标题写清价值主张
- Banner放Nexscope品牌

**H2. 内容发布**
- 每周发2-3篇帖子：数据洞察帖为主，偶尔穿插开源分享帖和行业观点帖
- 用Cron自动生成草稿，人工微调后手动发布

**H3. 主动触达**
- 用Sales Navigator筛选Title含"Amazon"/"FBA"/"E-commerce"的Profile
- 每天发20-30个连接请求，附个性化消息
- 连接后不立即推销，先互动2-3次再分享分析报告

**启动周**: W2 · **持续投入**: 每周3小时

---

### 渠道I：冷邮件

**优先级**: 🟡 P1 · **目标**: 直接触达已有付费习惯的Amazon卖家

**I1. 第一批目标：SellerPic已有用户（4万+邮箱）**
- 这是成本最低、转化率最高的渠道——用户已经注册过你的电商产品
- 从SellerPic用户库中筛选活跃用户（最近6个月登录过）
- 分批发送，每批500-1000封，观察打开率和退订率后调整

**I2. SellerPic用户专属邮件序列**
- Email 1: "We're building something new for Amazon sellers"（产品预告+waitlist）
- Email 2: "Here's what Nexscope can do that SellerPic couldn't"（差异化说明）
- Email 3: "Early access for SellerPic users"（优先试用邀请）

**I3. 外部线索邮件序列（第二批）**
- 从LinkedIn、Reddit、YouTube评论区筛选Amazon卖家
- 每周收集50个目标
- 用Nexscope自动分析卖家listing → 生成1页PDF报告 → 作为邮件钩子
- 5封邮件跨21天：免费分析→报告PDF→成功案例→Beta邀请→最后机会

**启动周**: W2(SellerPic批次) / W4(外部批次) · **持续投入**: 每周3小时

---

### 渠道J：X (Twitter)

**优先级**: 🟡 P1 · **目标**: 在SaaS/AI/电商创业圈建立品牌，触达工具型买家和行业KOL

**说明**: Amazon卖家在X上不如Reddit/Facebook活跃，但电商SaaS圈（Jungle Scout创始人、独立开发者、AI agent社区）都在X上。适合B2B品牌建设。

**J1. 账号定位**
- 以Nexscope品牌号运营
- 内容：产品更新 + 数据洞察 + AI/OpenClaw相关 + 行业评论

**J2. 内容策略**
- 发布monitor项目更新和数据洞察
- 分享AI agent demo（GIF/视频）
- 参与OpenClaw社区讨论（转发、评论官方推文）
- 在#AmazonFBA #ecommerce #AIAgent等话题下互动

**J3. 执行节奏**
- 每天1-2条推文
- 每天互动5-10条（评论/转发行业内容）
- 内容可以和LinkedIn复用

**启动周**: W2 · **持续投入**: 每周2小时

---

### 渠道K：免费小工具

**优先级**: 🟡 P1 · **目标**: 做几个独立的小工具，每个都是一个获客入口

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

### 渠道L：Discord / Telegram社区

**优先级**: 🟡 P1 · **目标**: 建立自有用户社区，提高留存和口碑

**L1. 创建Nexscope Discord服务器**
- #announcements — 产品更新
- #daily-intel — 每日市场简报（Cron自动推送）
- #free-analysis — 用户丢ASIN，Bot自动返回分析
- #general — 卖家讨论
- #feature-requests — 需求收集

**L2. 同步运营Telegram群**

**L3. 从其他渠道导流到社区**

**启动周**: W2 · **持续投入**: 每周2小时

---

### 渠道M：TikTok

**优先级**: 🟢 P2 · **目标**: 品牌认知和顶部漏斗——触达大量Amazon卖家（尤其新卖家和年轻卖家）

**说明**: #amazonfba标签在TikTok上有数十亿播放量，Amazon FBA内容非常活跃。但受众偏年轻/新手卖家，和核心目标客户（中腰部$5K-$500K）有偏差。适合做品牌曝光，不适合直接转化。

**M1. 内容方向**
- "数据揭秘"类短视频：30秒内用Nexscope数据展示某个品类的意外发现
- "对比"类：工具对比、竞品对比
- "教程片段"：从YouTube长视频中剪出15-60秒的精华片段复用

**M2. KOL合作**
- 在TikTok上同步找Amazon FBA类KOL合作
- 可以和YouTube KOL同步谈（很多KOL同时有TikTok和YouTube）

**M3. 执行节奏**
- 初期从YouTube内容中剪辑复用，不单独制作
- 每周2-3条短视频
- 观察数据后决定是否加大投入

**启动周**: W5（依赖YouTube内容启动后） · **持续投入**: 每周1-2小时

---

### 渠道N：行业报告 / PR

**优先级**: 🟢 P2 · **目标**: 用独家数据报告获取媒体引用和高权重外链（同时利好GEO）

**N1. 报告**
- 每季度出1份Amazon市场报告
- 用Nexscope数据生成独家洞察

**N2. 分发**
- 提交到电商媒体（Marketplace Pulse等）
- LinkedIn Thread形式发布摘要
- 博客发布完整版（下载需邮箱）

**启动周**: W8 · **持续投入**: 每季度6小时

---

### 渠道O：Facebook Groups

**优先级**: ⚪ P3 · **目标**: 在Amazon卖家聚集的FB群组建立信任

**O1. 加入核心群组**
- Amazon FBA Competitive Edge
- Amazon FBA High Rollers
- Seller Central Tips & Strategies
- Private Label Masters

**O2. 操作节奏**
- 前2周纯回答问题
- 第3周起每2周发1个"Free ASIN Analysis"互动帖（轮换群组）
- 收集到ASIN后用Nexscope分析，结果回复到评论

**启动周**: W2 · **持续投入**: 每周2小时

---

### 渠道P：Podcast & Webinar

**优先级**: ⚪ P3 · **目标**: 行业权威（低优先级）

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
- Nexscope Agent注册
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
- Free: Monitor + Nexscope Agent免费版（每天5次分析）
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

**W1**: GitHub org创建 · 仓库矩阵搭建 · Monitor README重写 · Reddit养号开始 · Nexscope Agent产品定义
**W2**: OpenClaw Skills开发 · Discord/TG社区创建 · LinkedIn启动 · X账号启动 · Facebook Groups加入 · SellerPic冷邮件第一批
**W3**: Nexscope Agent部署 · OpenClaw Discord发帖 · 红人数据库建立 · 筛选50个目标KOL · Reddit继续养号 · HN "Show HN"发帖
**W4**: Product Hunt发布 · SEO内容启动+关键词库 · KOL合作邀请发送 · 外部冷邮件第一批 · Cron自动化配置 · **付费广告测试启动**（$500/月）
**W5-W6**: 免费小工具开发上线 · 首批KOL合作视频 · TikTok开始(复用YouTube内容) · awesome列表发布 · 引流型仓库陆续创建
**W7-W8**: SEO累计30+篇 · GEO优化启动 · 蹭热点内容批量发布 · 第一份行业报告 · 广告数据复盘
**W9-W10**: KOL合作持续（每月3-5个） · 邮件序列优化 · 所有渠道数据复盘 · 付费广告集中到最优渠道
**W11-W14**: 砍掉低效渠道 · 加码高效渠道 · 探索Podcast机会 · Nexscope Agent产品迭代 · 红人Affiliate计划扩大

---

## 6. KPI

| 指标 | W4 | W8 | W14 |
|------|-----|-----|------|
| GitHub Stars (monitor) | 500 | 1,500 | 3,000 |
| Waitlist邮箱 | 200 | 800 | 2,000 |
| Nexscope Agent注册 | 50 | 300 | 1,000 |
| Discord成员 | 100 | 300 | 800 |
| 网站月UV | — | 3,000 | 10,000 |
| KOL合作视频 | — | 3 | 10 |
| 付费用户 | — | 20 | 100 |
| MRR | — | $1,000 | $5,000 |

---

## 7. 预算

| 项目 | 月成本 |
|------|--------|
| VPS (OpenClaw Gateway + Agent) | ~$20 |
| 域名 nexscope.ai | ~$3 (年均) |
| Plausible分析 | $9 |
| Reddit Premium | $7 |
| 付费广告 | $500-$2,000 |
| 红人合作 | $500-$2,000 |
| **月总计** | **$1,000-$4,000** |

---

## 附录

- [NEXSCOPE_MONITOR_PLAYBOOK.md](./NEXSCOPE_MONITOR_PLAYBOOK.md) — Monitor运营手册（README模板、部署方案）
- [NEXSCOPE_MARKETING_PLAN_V4_TABLE.md](./NEXSCOPE_MARKETING_PLAN_V4_TABLE.md) — 表格精简版

---

> 阿霞 · 2026-03-06
