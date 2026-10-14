# Podcast Dashboard — 功能文档

> 文档对象：`index.html`（Podcast Dashboard 仪表板页面）
> 编写日期：2026-08-31

---

## 1. 项目概述

`index.html` 是 Podcast Dashboard 的主页面，定位为**播客创作者后台仪表板**。页面围绕播客数据运营场景，提供三大核心视图：

| 视图 | 标识 | 用途 |
|---|---|---|
| Onboarding（引导页） | `dashboard` | 新播客创建引导，帮助新用户完成开播前的基础步骤 |
| Dashboard（数据分析页） | `dashboard-v2` | 播客数据总览：下载统计、趋势图表、单集表现、成就、评论 |
| Dashboard v2（评论关闭变体） | `dashboard-v2-nc` | 与 v2 布局一致，成就与"最近评论"仍并排（各占 1/2 宽），但评论卡片为**空状态**：账号已关闭评论功能，因此不展示任何评论数据。页面标题与 v2 页一致，只显示 "Dashboard" |
| Dashboard v3（无评论默认空态） | `dashboard-v3` | 与 v2 布局一致，评论卡片同样为空状态，但语义是**默认空态**："No comments yet / Your latest comments will show up here."（功能正常，只是还没有评论）。页面标题与 v2 页一致，只显示 "Dashboard" |
| Dashboard v4（无徽章空态） | `dashboard-v4` | 与 v2 完全一致（含真实评论列表、图表、单集表现），**唯一区别是徽章进度为 0**：成就卡片走零徽章空状态（空态大图、无 Share、只剩两个目标格）。用来单独评审成就空态，变量只有"有没有徽章" |

页面当前使用**静态演示数据**（mock 数据），前端交互已完整实现，尚未接入后端 API。导航栏中的 "Dashboard (v2)"、"Dashboard (v3)"、"Dashboard (v4)" 都是同一数据面板的**变体页**：v2 是基准页；v2-nc 评审"评论功能已关闭"的空态；v3 评审"还没有评论"的默认空态；v4 评审"还没有徽章"的空态。

---

## 2. 技术栈与依赖

### 2.1 技术构成

| 类别 | 技术 | 说明 |
|---|---|---|
| 核心 | 原生 HTML5 + CSS3 + JavaScript | 无前端框架，零构建步骤 |
| 图表 | Chart.js v4.5.0 | 迷你趋势图（sparkline）与下载趋势折线图 |
| 图表 | ECharts v5.5.0 | 已通过 CDN 引入备用，当前页面 JS 未调用 |
| 字体 | Google Fonts — Roboto | 全站默认字体 |
| 样式 | `podbean-base.css`（本地文件） | 布局框架与设计变量（详见 §8） |

### 2.2 CDN 依赖

- `https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.js`
- `https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js`
- `https://fonts.googleapis.com`（Roboto 字体）

### 2.3 本地资源

- `podbean-base.css` — 基础样式框架
- `podcastbadge.png` — 成就徽章图片

> ⚠️ 注意：页面中有一个指向 `podcast-website.html` 的外链（顶栏"查看站点"图标），但当前项目目录中**不存在**该文件，点击会 404。若需上线，应补建该文件或移除链接。

---

## 3. 页面整体布局

```
┌─────────────────────────────────────────────────────────┐
│ Topbar 顶栏（64px）：菜单按钮 · Logo · 站点名 · 查看站点 │
│              · [+ New Episode] · 🔔 · 用户头像(EZ)       │
├────────────┬────────────────────────────────────────────┤
│ Sidebar    │  Content 内容区（max-width: 1320px）        │
│ 侧边栏     │  ・ page-dashboard-v2    （默认显示）       │
│ (230px)    │  ・ page-dashboard-v2-nc （隐藏）           │
│ ・Onboarding│  ・ page-dashboard       （隐藏）           │
│ ・Dashboard │                                            │
│ ・Dashboard │                                            │
│  v2        │                                            │
└────────────┴────────────────────────────────────────────┘
```

### 3.1 顶栏（Topbar）

| 元素 | 功能 |
|---|---|
| 汉堡菜单按钮 | 仅移动端（≤768px）显示，点击开合侧边栏（`toggleSidebar()`） |
| Logo + 站点名 | 品牌标识区，站点名 "Podcasting Smarter" |
| 查看站点图标 | 外链跳转 `podcast-website.html`（新窗口打开） |
| `+ New Episode` 按钮 | 新建单集入口（当前为静态按钮，无动作） |
| 通知铃铛 | 通知入口（静态，无动作） |
| 用户头像 | 显示 "EZ"，当前用户标识（静态） |

### 3.2 侧边栏（Sidebar）

包含三个导航项，通过 `data-page` 属性与页面 ID 关联，点击调用 `switchDashboard(page)` 切换视图：

| 导航项 | data-page | 目标页面 |
|---|---|---|
| Onboarding | `dashboard` | `#page-dashboard` |
| Dashboard | `dashboard-v2` | `#page-dashboard-v2`（默认高亮） |
| Dashboard (v2) | `dashboard-v2-nc` | `#page-dashboard-v2-nc` |

---

## 4. 核心功能模块

### 4.1 统计卡片（Stat Cards）

每个视图顶部均有一行 4 张统计卡片，展示不同时间维度的下载量：

| 卡片 | 数值（当前 mock） | 迷你趋势图（sparkline） |
|---|---|---|
| Yesterday | 342 | 20 点日趋势，绿色 `#10b981` |
| 7 Days | 2,847 | 7 点趋势，蓝色 `#3b82f6` |
| 30 Days | 12,560 | 30 点趋势，黄色 `#eab308` |
| All Time | 48,293 | 30 点累计趋势，粉色 `#ec4899` |

- 迷你趋势图由 `initSparkline(id, color, data)` 生成，Chart.js line 图，隐藏坐标轴与提示，仅显示曲线。
- 同一组卡片在三个视图中分别渲染（v2 用 `sparkYesterday` 等；v2-nc 用 `sparkYesterday2` 等；onboarding 数据视图用 `sparkOnboardYesterday` 等）。

### 4.2 下载趋势图（Downloads Trending）

位于主内容区顶部的大幅折线图，核心数据图表。

**数据内容**
- 横轴：最近 30 天日期（格式 `M/D`，动态生成）
- 2026 系列：实线绿色 `#1a9a6c`，带浅色填充，当前年数据
- 2025 系列：灰色虚线 `#cbd5e1`，去年同期对比数据

**图表头部摘要**
- 大号数字 `5,846`：近 14 天下载总量
- 绿色趋势徽章 `+6.2%`：环比上一 14 天
- "vs previous 14 days" 说明文字

**交互**
- Tooltip 跟随鼠标（`interaction.mode: 'index'`，暗色样式）
- 点击 "View more →" 跳转详情页（当前为空链接占位）

### 4.3 单集表现表（Episode Performance）

表格列出各单集的下载表现，两列指标：**First Week**（首周）与 **First Month**（首月）。

| 单集标题 | First Week | First Month |
|---|---|---|
| 英文里的"奇妙日常"：旅馆为何被拼布大会订满？ | — | — |
| How to Start a Podcast in 9 Steps (2026) | 245 | 892 |
| Hometown Heroes Expanded: Florida First-Time Buyers | 186 | 673 |
| How_to_Record_and_Convert_Zoom_Calls... | 412 | 1,540 |
| Born on the Seven-Mile Miracle: John John Florence | 367 | 1,250 |
| this is video episode 2 | 523 | 2,100 |

- 数据来源：JS 常量数组 `epPerfData`（硬编码）。
- 渲染逻辑：`buildEpPerfTable()` 将同一份数据同时填充到三个视图的表格 `#epPerfBody`、`#epPerfBody2`、`#epPerfBodyOnboard`。
- 数值为 0 时显示占位符 `—`（如首条记录）。
- 表格行有 hover 高亮；标题列 hover 变绿、可点击（跳转动作尚未实现）。

### 4.4 成就系统（Achievements）

卡片结构：顶部一张大图（最新徽章图片 `podcastbadge.png`）+ **Share（分享）** 按钮，下方是 4 个徽章格子。

#### 徽章家族

徽章分两个家族，各自的阈值阶梯如下（数据在 `BADGE_DATA`，见下）：

| 家族 | 阈值阶梯 | 命名 |
|---|---|---|
| downloads（下载类） | 100 / 1K / 10K / 100K | `100 Downloads`、`1K Downloads`… |
| publishing（发布类） | 1 / 5 / 10 / 25 / 50 | 1 → `First Episode`，其余 `N Episodes` |

#### 格子规则（两个格子，一个家族一个）

两格固定对应两个家族，**发布类在前**（episode badge 最好达成 —— 发 1 集就有），下载类在后。格子状态直接体现明暗：

| 位置 | 家族 | 判定条件 |
|---|---|---|
| 第 1 格 | 发布类 | 该家族**有**已解锁徽章 → 显示最新那一枚（`thresholds ≤ current` 中最大者），**亮**、meta 为解锁月份；该家族**一枚都没有** → 显示它的第一枚（即 `thresholds[0]`），**灰**、meta 为 `当前 / 目标`（如 `0 / 1`） |
| 第 2 格 | 下载类 | 同上（如 `0 / 100`） |

也就是"解锁了就是亮的，没解锁就是灰的"：亮的格子里是那个家族的最新成就，灰的格子告诉你哪个家族还空着、还差多少。同一个家族里更早的徽章不占格子（收进 "View more →" 的完整成就页）。

当前 mock 数据：两格都亮 —— `10 Episodes`（Mar 2026）、`1K Downloads`（Feb 2026）。

**这个简化的代价**：某家族一旦有了解锁的徽章，该家族的"下一枚目标"（例如 `10K Downloads 3,240 / 10,000`）就不再出现在卡片上了，要看进度得进完整成就页。若要保留，可在亮格里补一行小字进度。

#### 两格可切换，切换后顶部大图跟着变

- 两个格子是**可点选**的开关：点亮的格子点击后，顶部大图换成那一枚徽章（同时该格出现绿色描边表示"当前正在展示"）。
- 灰色的格子**不可点**（没有 `cursor:pointer`、没有 hover 效果、不绑 onclick）：它代表的徽章还没拿到，没有可展示的图。
- 选中状态**每个页面各自独立**（`ACH_SELECTED` 以 hero 容器 id 为键），默认选中"第一个点亮的格子"，也就是有发布类徽章时默认展示 episode badge。
- 顶部大图同时是**分享对象**：Share 面板里的文案跟着当前选中的徽章走（`selectedBadgeName(heroId)`），不会再出现"图是 A、分享文案写 B"的情况。

#### 数据与实现

- `BADGE_DATA`（`index.html` 末尾脚本内）是两个家族的数据源：`thresholds` 阈值列表、`current` 当前进度（累计已发布单集数 / 累计下载量）、`unlocked` 各已解锁徽章的解锁月份。**原型里它是硬编码的，真实实现应来自后端**（下载量每日 T+1 更新，单集数在发布成功时更新）。
- `BADGE_DATA_EMPTY` 是同结构的零进度数据（`current: 0`、无 `unlocked`），供 v4 页演示零徽章状态用。
- `ACH_PAGES` 是"哪个页面用哪份数据"的映射：v2 / v2-nc / v3 → `BADGE_DATA`，v4 → `BADGE_DATA_EMPTY`。`renderAchievements()` 遍历它，分别写入各页的 `#achHero*`（大图/空态）与 `#achTiles*`（格子）容器。**改徽章只需改 `BADGE_DATA` 一处**，用到的页面同时生效；要再加一个演示变体，加一行 `ACH_PAGES` 即可。
- 格子配色按家族区分（不再按单枚徽章）：发布类黄 `#fef3c7`/`#d97706`，下载类蓝 `#dbeafe`/`#2563eb`，灰色 `#f1f5f9`/`#cbd5e1` + 整格 `opacity:.5`。图标：发布类用麦克风，下载类用走势线。

#### 徽章大图的来源

顶部大图的图片有两级来源，见 `heroArtwork()`：

1. `BADGE_ART` 里登记的名字 → 用真图。目前只有 `{ '10 Episodes': 'podcastbadge.png' }` 这一条（那是设计给的唯一一张徽章图，文字是烤进图片里的）。
2. 其它徽章 → 用 `badgeSVG()` **现场生成 SVG**，风格照着 `podcastbadge.png` 做：胶囊底 + 左侧圆形徽记（麦克风 / 走势线）+ 月桂 + 星点 + 名称（数字与词用 `<tspan>` 分两色，整串居中）+ 分隔线与星 + 一行描述文字。配色见 `BADGE_PALETTE`（发布类紫、下载类蓝）。

**尺寸必须对齐**：真图 `podcastbadge.png` 是 1820×571（长宽比 **3.19**），所以大图统一放在一个固定盒子里 —— `.ach-hero .ach-art { width:414px; height:130px; }`（`<img>` 用 `object-fit:contain`），生成模板的画布也做成同一比例 `viewBox="0 0 827 260"`（3.18）。这样切换徽章时**两类的图片宽度完全一致**，旁边的 Share 按钮也不会左右挪动。以后往 `BADGE_ART` 加真图时，图片得是同一比例，否则宽高会又对不上。

有真图后，往 `BADGE_ART` 里加一条 `'100 Downloads': 'xxx.png'` 即可自动替换，无需改别处。生成模板里名称字号按长度自适应（≤11 字 72px，≤14 字 62px，更长 56px），保证 `100K Downloads` 这种最长名字也放得下。

> 注意：生成徽章用 `<tspan>` 做双色名称，浏览器渲染没问题，但 ImageMagick 的 SVG 渲染器会把两个 tspan 叠在一起 —— 用 `convert` 预览模板时别被这个假象误导。要单独验证，可把名称临时改成一个 `<text>` 单色再看字号与位置。
> 另外 `build_preview.py` 要把徽章图内联成 data URL 时，**markup 与 JS 字符串两种写法都要替换**（`src="podcastbadge.png"` 和 `'podcastbadge.png'`），否则面板里大图会裂。

#### 解锁时机（真实实现的语义）

- **发布类**徽章在单集成功上线那一刻解锁，可实时刷新；日期 = 发布日。
- **下载类**徽章依赖下载统计，而下载数据是 T+1 的，因此某日达标实际在**次日**解锁。解锁日期字段要记"达标次日"，不要写当天。

#### 零徽章（空状态）

用户一枚徽章都没有时（`earnedCount() === 0`，即两个家族的 `current` 都低于第一个阈值）。这个状态在 **Dashboard (v4)** 页可以直接看到（该页数据来自 `BADGE_DATA_EMPTY`）：

- **顶部大图换成空状态**：灰色圆形徽章轮廓图标 + `No badges yet` + `Publish your first episode to unlock your first badge.`，整块保持 `min-height:130px`，与有大图时高度一致，卡片不会突然变矮。
- **Share 按钮隐藏**（不是置灰）：没有可分享的徽章，而它分享的对象就是"最新那枚"，此时指向的内容并不存在。
- **两格都变成灰的、都不可点**：`First Episode`（`0 / 1`）和 `100 Downloads`（`0 / 100`）。格子数量不变（永远两格），只是两格都没亮 —— 新用户此刻唯一有价值的信息就是"做什么能解锁"，所以这两格必须保留。顺序仍是家族固定顺序（发布类在前），位置在各种状态下都稳定、不会错位。

#### 边界情况

- 某家族一枚都没解锁（新播客）：该格变灰、显示该家族第一枚与进度，不可点击。
- 某家族全部解锁：该格显示最高阈值那枚（亮的），没有"下一枚"可显示，也不会出现 `All unlocked` 之类的特殊状态。
- 同一家族一次解锁多枚（批量导入）：只占一格，取阈值最高的那枚。
- 顶部大图与格子可能显示同一枚徽章（例如都亮着 `10 Episodes`），这是预期内的：大图是"炫耀 + 分享位"且可被点击切换，格子是"两类进度对照位"。
- 成就区域在 v2 / v2-nc / v3 / v4 四个页面里都与"最近评论"并排（各占 1/2 宽），布局一致。

### 4.5 最近评论（Recent Comments）

三个 Dashboard 视图都有该卡片，区别在于卡片内容：

| 视图 | 卡片内容 |
|---|---|
| `dashboard-v2` | 评论列表（3 条 mock 评论） |
| `dashboard-v2-nc` | **空状态**：账号已关闭评论功能，不展示评论数据 |
| `dashboard-v3` | **空状态**：还没有任何评论，提示新评论会出现在这里 |

卡片标题栏统一为 "Recent Comments"：`dashboard-v2` 保留 "View more →" 链接，两个空状态（v2-nc、v3）**都没有该链接**（无评论可跳转）。

空状态（`dashboard-v2-nc`）自上而下为：灰色圆形对话框图标 → 标题 "No comments" → 说明文字 "Commenting is turned off for your account."。**没有按钮、没有跳转链接**——只做状态陈述。说明文字为**中性陈述**：只说明该账号的评论功能处于关闭状态，不写明是谁关的（既不说"You turned it off"，也不暗示是平台限制）。

空状态（`dashboard-v3`）结构完全相同，仅文案不同：标题 "No comments yet"，说明文字 "Your latest comments will show up here."。与 v2-nc 的区别是**语义方向相反**：v2-nc 说的是"功能被关掉了"，v3 说的是"功能正常、只是目前还没有评论"，属于更中性的默认空态。

空状态在卡片内**垂直居中**（卡片为 `display:flex;flex-direction:column`，`.comments-empty` 占满剩余高度），因此在与成就卡片等高时视觉居中。样式类为 `.comments-empty` / `.comments-empty-icon` / `.comments-empty-title` / `.comments-empty-text`；早期版本的 `.comments-empty-btn`（"Manage comment settings" 按钮）已随按钮一起删除。

> 维护提示：v2-nc 与 v3 两页是**从 `dashboard-v2` 页整体复制**出来的变体，结构完全一致，只改了页面 id、元素 id 后缀（`2` / `V3`）和评论卡片内容。要再加减变体，请复制 v2 页（它是结构最干净的一份）再套用同样的三处改动，不要手工改副本——曾经因此出现过标签不配对、新页被嵌进隐藏页里的问题。每页的 `sparkYesterday*` / `downloadChart*` / `epPerfBody*` id 必须唯一，否则该页图表与单集表格会静默留空（初始化脚本在文末的 `DOMContentLoaded` 里，新页要在那里补调用）。

评论列表（`dashboard-v2`）：

| 用户 | 评论摘要 | 关联单集 | 时间 |
|---|---|---|---|
| Jessica M. (JM) | 关于播客 SEO 的感谢反馈 | "How to Start a Podcast in 9 Steps" | 2h ago |
| Robert K. (RK) | 对冲浪嘉宾采访的评价 | "Born on the Seven-Mile Miracle" | 5h ago |
| Amanda L. (AL) | 佛州购房单集帮助 | "Hometown Heroes Expanded" | 1d ago |

- 头像为双字母圆形头像，各用不同背景色（紫/粉/橙）。
- 评论正文最多显示 2 行（CSS `-webkit-line-clamp: 2` 截断）。
- 每条评论含作者名、正文、所属单集及时间。
- "View more →" 跳转入口（占位）。

### 4.6 播客资源（Podcast Resources）

底部资源卡片网格，为引导创作者的教程内容入口。**Dashboard 与 Dashboard v2 各有一份，内容相同。**

当前**只保留前两张**（Guide / Strategy），两列布局：

| 分类 | 标题 | 配图 / 底色 |
|---|---|---|
| Guide | How to Start a Podcast in 2026: The Complete Guide | 火箭 + 清单（绿） |
| Strategy | Podcast SEO: How to Get Your Show Discovered | 柱状图 + 放大镜（蓝） |

- 每张卡片为**上下结构**：顶部 16:9 配图（`.resource-thumb`），下方标题。
- 配图为按标题定制的内联 SVG 插画，底色由 `.thumb-*` 渐变类提供；早先的 `resource-icon` 图标方案已废弃。
- 卡片已不含分类标签与摘要（`.resource-tag`、`.resource-desc` 及其 CSS 均已移除）。
- 整卡可点击（`<a>`），当前 `href="#"` 占位。

### 4.7 引导流程（Onboarding，Dashboard v1）

面向新用户的"开播三步"引导，分为两种状态视图。

#### 步骤视图（`#onboardStepsView`，无数据时）

| 步骤 | 标题 | 操作 |
|---|---|---|
| 1 | Create your podcast（创建播客） | "Get Started" 按钮 → 跳转 Dashboard v2；内含"导入已有播客到 Podbean"链接 |
| 2 | Publish your first episode（发布首个单集） | "Create Episode" 按钮（占位） |
| 3 | Submit to podcast platforms（提交分发平台） | "Start Distribution" 按钮（占位） |

**进度机制**
- 页面不显示进度条，完成情况只通过三个步骤各自的圆圈状态体现。
- 步骤前方的圆形勾选框是**状态指示器，本身不可点击**。用户必须通过该步骤自己的操作按钮前往对应位置完成操作，完成后圆圈才变为绿色对勾（`completeOnboardStep(step)`），并**持久化到 localStorage**（键名 `podbean_onboard_steps`，值形如 `[true,false,false]`）。
- 已完成的步骤条目：标题划线变灰、勾选框变绿色、操作按钮变灰禁用。
- 底部 "Skip the Guide →"（`skipOnboarding()`）：将三步全部标记完成，直接跳转 Dashboard v2。
- 提示文案 `#onboardHint`（"You will see your podcast statistics here after you get a few downloads."）紧跟在 "Skip the Guide →" 下方，位于步骤视图**内部**，因此数据视图显示时会一同隐藏。
- "Getting started resources" 区块（`.onboard-section`）也在步骤视图内，含两张资源卡片（同上 4.6 的上下结构，两列布局）。
- 当前"完成"的触发点：第 1 步由 "Get Started" 按钮触发，第 2、3 步由 "Create Episode"/"Start Distribution" 占位按钮触发。接入真实流程后，应改为依据真实状态（已创建播客 / 已发布单集 / 已提交分发）来判定，而不是点击按钮即完成。

#### 数据视图（`#onboardDataView`，有下载数据时）

- 与 Dashboard v2 相同：4 张统计卡片 + 下载趋势图 + 单集表现表。
- 提示文案 `#onboardHint` 不在此视图内，它位于步骤视图里 "Skip the Guide →" 的下方。

> 说明：两视图的切换逻辑当前为静态实现——HTML 中数据视图默认隐藏，`#onboardDataView` 基于真实数据的自动显示条件尚未接入。`#onboardHint` 现已归入步骤视图，会随数据视图显示而自动隐藏。

---

## 5. 交互逻辑与 JavaScript 函数

### 5.1 页面切换 — `switchDashboard(page)`

```
流程：
1. 隐藏所有 .page-content
2. 显示目标 #page-<page>
3. 侧边栏对应导航项添加 .active（并移除其他项）
4. 关闭移动端侧边栏与遮罩
5. 若切到 dashboard（引导页），延迟 50ms 刷新步骤完成态
```

### 5.2 侧边栏开合 — `toggleSidebar()`

- 切换 `.sidebar` 的 `open` 类与 `.sidebar-overlay` 的 `show` 类。
- 移动端生效；遮罩点击也可关闭（`onclick="toggleSidebar()"`）。

### 5.3 图表函数

| 函数 | 作用 |
|---|---|
| `initSparkline(id, color, data)` | 渲染无坐标轴的迷你趋势线图 |
| `initDownloadChart()` | 渲染 `#downloadChart` 的 30 天双系列对比图 |
| `initDownloadChart2()` / `initDownloadChartOnboard()` | 分别渲染 v2-nc 与 onboarding 视图的同款图表（IIFE 内联实现，逻辑与主图一致） |

### 5.4 表格与引导

| 函数 | 作用 |
|---|---|
| `buildEpPerfTable()` | 依据 `epPerfData` 生成三个视图的单集表现表 |
| `updateOnboardProgress()` | 依据 `onboardSteps` 更新三个步骤的圆圈勾选与完成态样式 |
| `completeOnboardStep(step)` | 将指定步骤标记为已完成（幂等）并写入 localStorage；由该步骤的操作按钮调用，圆圈本身不可点击 |
| `skipOnboarding()` | 完成全部步骤并跳转 Dashboard v2 |

### 5.5 数据持久化

| 键名 | 类型 | 说明 |
|---|---|---|
| `podbean_onboard_steps` | JSON 数组 `[bool,bool,bool]` | 引导三步的完成状态，页面刷新后保留 |

> ⚠️ 注意：文档当前使用的 `localStorage` 在浏览器环境运行正常，但本项目若嵌入到禁止浏览器存储的受限环境（如某些沙盒预览），需要改用内存状态。

### 5.6 初始化流程

页面加载（`DOMContentLoaded`）后依次执行：

1. `buildEpPerfTable()` — 填充表格
2. 初始化全部 sparkline 迷你图（v2 / v2-nc / onboarding 共 12 个）
3. `initDownloadChart()` — 主视图下载趋势图
4. IIFE 初始化 v2-nc 与 onboarding 的下载趋势图
5. `updateOnboardProgress()` — 恢复引导进度

---

## 6. 响应式设计

页面在 4 个断点下自适应，核心规则：

| 断点 | 调整内容 |
|---|---|
| ≤1200px | `.dash-layout` 由左右并排改为纵向堆叠 |
| ≤1024px | 统计卡片 4 列 → 2 列；内容与顶栏内边距缩小 |
| ≤768px | 统计卡片保持 2 列；资源网格变 1 列；引导条目改纵向；**侧边栏转为固定抽屉式**（汉堡按钮出现，默认滑出隐藏，遮罩层显示） |
| ≤480px | 统计卡片 1 列 |

移动端侧边栏行为：`position: fixed`，`translateX(-100%)` 隐藏，`.open` 类滑入；配合半透明遮罩（`.sidebar-overlay.show`）。

---

## 7. 数据说明

当前所有数据均为**前端硬编码的静态演示数据**，分布在：

| 数据 | 位置 |
|---|---|
| 统计卡片数值 | HTML 中直接写死 |
| 下载趋势（2026/2025） | `initDownloadChart()` 内数组 |
| 单集表现 | `epPerfData` 常量数组 |
| 评论、成就、资源 | HTML 静态结构 |
| 引导进度 | `localStorage`（唯一可持久化状态） |

**接入真实数据的建议**：未来应将 `epPerfData`、图表数组、统计数值等抽象为从 API 拉取；引导步骤的"数据视图/步骤视图"切换也应依据"是否已有下载数据"这一真实条件自动判断。

---

## 8. 设计系统（podbean-base.css）

`index.html` 依赖的 `podbean-base.css` 提供统一的设计变量与基础组件：

| 项 | 值 |
|---|---|
| 主色 `--primary` | `#1a9a6c`（绿色） |
| 背景/表面 `--bg` / `--surface` | `#ffffff` |
| 文本色阶 `--text / --text-secondary / --text-tertiary` | `#1e293b` / `#64748b` / `#94a3b8` |
| 边框 `--border` | `#e2e8f0` |
| 圆角 `--radius-sm` | 8px |
| 字体 | Roboto（Google Fonts） |

提供的可复用组件类：`.topbar`、`.sidebar`、`.sidebar-nav`、`.btn`、`.btn-copy`、`.link-input`、`.url-tab`、`.section`、`.avatar` 等。

---

## 9. 已知问题与待办事项

1. **`podcast-website.html` 缺失**：顶栏"查看站点"外链目标文件不存在，点击会 404。
2. **空链接占位**：所有 "View more →"、"Read more →"、资源卡片、表格行点击均 `href="#"`，未绑定实际跳转。
3. **静态按钮**：`+ New Episode`、通知铃铛无交互逻辑；"Create Episode"、"Start Distribution" 目前仅把对应引导步骤标记为完成，尚未跳转到真实的创建 / 分发流程。
4. **ECharts 冗余引入**：ECharts 库已加载但未使用，若无需可移除以减小页面体积。
5. **引导视图切换未自动化**：步骤视图/数据视图仍为静态切换，未根据数据自动判断。
6. **图表代码重复**：三处下载趋势图代码几乎一致（主图、v2-nc、onboarding），建议抽成可复用函数，消除重复。

---

## 10. 页面清单（便于 QA）

| 入口 | 目标页面 | 触发方式 |
|---|---|---|
| Onboarding（侧边栏） | `#page-dashboard` | `switchDashboard('dashboard')` |
| Dashboard（侧边栏，默认） | `#page-dashboard-v2` | `switchDashboard('dashboard-v2')` |
| Dashboard (v2)（侧边栏） | `#page-dashboard-v2-nc` | `switchDashboard('dashboard-v2-nc')` |
| Get Started / 导入播客 | → `dashboard-v2` | 引导页内链接 |
| Skip the Guide | → `dashboard-v2` | `skipOnboarding()` |
