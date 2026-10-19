# Podcast Dashboard — 功能文档

> 文档对象：`index.html`（Podcast Dashboard 仪表板页面）
> 编写日期：2026-08-31
> 最后更新：2026-10-19

---

## 1. 项目概述

`index.html` 是播客创作者后台仪表板。侧边栏共四个页面，其中三个是同一套数据面板的不同状态：

| 页面（侧边栏入口） | 内容 |
|---|---|
| Onboarding | 新用户开播引导；已产生下载数据时，改为展示数据视图（与 Dashboard 相同的统计卡片、下载趋势图和单集表现表） |
| Dashboard | 数据总览基准页：统计卡片、下载趋势图、单集表现表、成就、最近评论、播客资源 |
| Dashboard (v2) | 与 Dashboard 布局一致；评论卡片为空状态（账号已关闭评论功能） |
| Dashboard (v3) | 与 Dashboard 布局一致，整页演示全新播客：数据全为 0、徽章为空、没有评论 |

三个 Dashboard 页面结构相同，差异只在数据状态和评论卡片的内容。

---

## 2. 核心功能模块

### 2.1 统计卡片（Stat Cards）

页面顶部一行 4 张卡片：**Yesterday、7 Days、30 Days、All Time**，分别展示对应时间范围的下载量，并配一条迷你趋势线。全新播客状态下（Dashboard (v3)）四个数字均为 0，趋势线为平线。

### 2.2 下载趋势图（Downloads Trending）

主内容区顶部的大幅折线图，展示最近 14 天的下载趋势：

- 标题下方左侧显示近 14 天下载总量（标注 "Last 14 days"）与环比变化，旁边标注 "vs previous 14 days"
- 鼠标悬停可查看对应日期的数值
- 点击右上角 "View more →" 进入 Stats Overview（数据总览）页面

全新播客状态（Dashboard (v3)）下，头部数字为 0、环比为 +0%，图表只画一条贴着 0 的平线。

### 2.3 单集表现表（Episode Performance）

表格列出各单集的下载表现，两列指标：**First Week**（首周）与 **First Month**（首月）。没有数据的单集显示占位符 "—"。表格行悬停有高亮。

- 点击单集标题进入 Stats Episodes Trending 页面，并在该页面选中对应的 Episode
- 点击卡片右上角 "View more →" 进入 Stats Episodes Performance 页面

全新播客状态（Dashboard (v3)）下没有单集，表格位置显示空状态（图标 + "No data found."），并隐藏 "View more →"。

### 2.4 成就系统（Achievements）

卡片顶部展示当前选中徽章的大图，旁边是 **Share（分享）** 按钮；下方是两个徽章格子，分别对应两个徽章家族。

**两个徽章家族**

徽章分为发布类和下载类两个家族，按照实际 Badge 阶梯进行展示。

**格子的显示规则**

- 发布类固定在前，下载类在后。
- 某家族已解锁徽章：显示该家族**最新**的一枚（亮），并标注解锁月份。
- 某家族还没有徽章：显示该家族的第一枚（灰）。

**切换与分享**

- 两个格子可点选：点击已点亮的格子，顶部大图切换为那一枚徽章。
- 选中状态每个页面各自独立，默认展示第一个点亮的格子。
- 点击 Share 打开分享菜单，菜单中显示 Facebook 与 X 图标。
- 点击图标即可分享，分享内容会自动带上当前徽章的图片和文字；分享对象始终跟随顶部大图展示的徽章。

**零徽章状态**

两个家族都没有徽章时（新播客）：顶部改为 "No badges yet" 空状态并隐藏 Share；两个格子都变灰、都不可点，分别显示两个家族的第一枚徽章，提示用户如何解锁第一枚徽章。

**其他规则**

- 某家族全部解锁时，显示最高阈值那一枚，不再显示"下一枚"。
- 同一家族一次解锁多枚时只占一格，取阈值最高的那枚。

### 2.5 最近评论（Recent Comments）

三个 Dashboard 页面的右下角都有该卡片，标题统一为 "Recent Comments"，内容按页面状态区分：

| 页面 | 卡片内容 |
|---|---|
| Dashboard | 评论列表：头像、作者、评论正文（最多 2 行）、关联单集与时间；右上角 "View more →" 进入评论详情 |
| Dashboard (v2) | 空状态：灰色对话框图标 + "No comments" + "Commenting is turned off for your account."，没有按钮或链接 |
| Dashboard (v3) | 空状态：灰色对话框图标 + "No comments yet" + "Your latest comments will show up here." |

两个空状态在卡片内垂直居中。

### 2.6 播客资源（Podcast Resources）

Dashboard 与 Dashboard (v2) 页面底部各有一组资源卡片，为创作者提供教程入口，两列布局：

| 分类 | 标题 |
|---|---|
| Guide | How to Start a Podcast in 2026: The Complete Guide |
| Strategy | Podcast SEO: How to Get Your Show Discovered |

每张卡片为上图下文结构：顶部 16:9 配图，下方标题；整张卡片可点击（当前为占位链接）。

### 2.7 引导流程（Onboarding）

面向新用户的"开播三步"引导：

| 步骤 | 标题 | 操作 |
|---|---|---|
| 1 | Create your podcast（创建播客） | "Get Started" 按钮，进入 Dashboard；卡片内附"导入已有播客到 Podbean"链接 |
| 2 | Publish your first episode（发布首个单集） | "Create Episode" 按钮 |
| 3 | Submit to podcast platforms（提交分发平台） | "Start Distribution" 按钮 |

**进度与状态**

- 页面不显示进度条，完成情况只通过三步各自的圆圈体现。
- 圆圈是状态指示器，本身不可点击；用户需通过该步骤的按钮完成操作，完成后圆圈变为绿色对勾。
- 已完成的步骤：标题划线变灰、圆圈变绿、操作按钮变为禁用状态。
- 底部 "Skip the Guide →" 可跳过引导，直接进入 Dashboard。
- 提示文案 "You will see your podcast statistics here after you get a few downloads." 与 "Getting started resources" 资源区都位于步骤视图内，切换到数据视图时一并隐藏。

**数据视图**

已产生下载数据后，引导页切换为数据视图，包含与 Dashboard 相同的统计卡片、下载趋势图和单集表现表。

---

## 3. 响应式设计

页面在 4 个断点下自适应：

| 断点 | 调整内容 |
|---|---|
| ≤1200px | 成就与最近评论由左右并排改为上下堆叠 |
| ≤1024px | 统计卡片由 4 列改为 2 列；内容与顶栏边距缩小 |
| ≤768px | 统计卡片保持 2 列；资源网格改为 1 列；引导条目改为纵向排列；侧边栏收起为抽屉，由顶栏汉堡按钮唤出，并带半透明遮罩 |
| ≤480px | 统计卡片改为 1 列 |
