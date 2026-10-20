# Podcast Dashboard — 功能文档

> 文档对象：`index.html`（Podcast Dashboard 仪表板页面）
> 编写日期：2026-08-31
> 最后更新：2026-10-19

---

> ⚠️ **请注意**：本功能文档根据当前版本整理，可能存在遗漏或理解偏差。如与线上实际表现不一致，请再次确认。

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
| Dashboard (v2) | 用户关闭评论功能时的空状态：灰色对话框图标 + "No comments" + "Commenting is turned off for your account."，没有按钮或链接 |
| Dashboard (v3) | 空状态：灰色对话框图标 + "No comments yet" + "Your latest comments will show up here." |

两个空状态在卡片内垂直居中。

### 2.6 播客资源（Podcast Resources）

Dashboard 与 Dashboard (v2) 页面底部各有一组资源卡片，为创作者提供教程入口，两列布局。

该内容块为新增内容块，卡片中的文章目前为占位内容，需要 BO 提供相应功能后进行配置和替换。

每张卡片均为上图下文结构，整张卡片可点击（当前为占位链接）。

### 2.7 引导流程（Onboarding）

面向新用户的引导页，页面标题为 **"Get your podcast ready"**，副标题为 "Complete the key steps to publish, distribute, and grow your show."。

**步骤视图**

| 步骤 | 标题与说明 | 按钮 | 点击后进入 |
|---|---|---|---|
| 1 | **Set up your podcast** — Set up your podcast profile and basic information. | Setup | Settings > Podcast Info 页面 |
| 2 | **Publish your first episode** — Upload your first episode and make your show live. | Publish | Episodes 页面 |
| 3 | **Submit to podcast platforms** — Reach listeners on Spotify, Apple Podcasts, and more. | Submit | Distribution > Podcast Apps 页面 |

- 第 1 步卡片内附 "Already have a show? Import existing podcast to Podbean" 链接，点击进入 Import to Podbean 页面。
- 点击各步骤的按钮会完成该步骤，并进入上表对应的页面。
- 页面不显示进度条，完成情况由三步各自的圆圈状态表示（未完成 / 已完成），圆圈本身不可点击。
- 用户通过该步骤的按钮完成操作，完成后圆圈状态随之更新。
- 未完成与已完成步骤的标题、圆圈和按钮样式见设计稿。
- 底部 "Skip the Guide →" 可跳过引导，直接进入 Dashboard。
- 提示文案 "You will see your podcast statistics here after you get a few downloads." 与 "Getting started resources" 资源区都位于步骤视图内，切换到数据视图时一并隐藏。
- "Getting started resources" 资源区需要 BO 新增相应功能来配置内容。

**数据视图**

已产生下载数据后，引导页切换为数据视图。

具体达到多少下载数据才会切换为数据视图，需要由开发确认。

---

## 3. 响应式设计

页面需适配不同屏幕尺寸，在各类设备上保持布局完整、内容清晰可读。
