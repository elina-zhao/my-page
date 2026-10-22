# Podcast Dashboard — 功能文档

> 文档对象：`index.html`（Podcast Dashboard 仪表板页面）  
> 编写日期：2026-08-31  
> 最后更新：2026-10-22 16:20

---

> ⚠️ **请注意**：本功能文档根据当前版本整理，可能存在遗漏或理解偏差。如与线上实际表现不一致，请再次确认。

## 1. 项目概述

`index.html` 是播客创作者后台仪表板。侧边栏共六个页面，其中三个是同一套引导步骤清单的不同场景，另外三个是同一套数据面板的不同状态：

| 页面（侧边栏入口）            | 内容                                                         |
| -------------------- | ---------------------------------------------------------- |
| Onboarding           | 新用户开播引导；已产生下载数据时，改为展示数据视图（与 Dashboard 相同的统计卡片、下载趋势图和单集表现表） |
| Onboarding (import)  | 已有播客的导入引导：导入现有播客、发布新单集、提交到播客平台                             |
| Onboarding (private) | 私有播客引导：基础设置、发布私有单集、分配私有成员                                  |
| Dashboard            | 数据总览基准页：统计卡片、下载趋势图、单集表现表、播客资源                              |
| Dashboard (v3)       | 与 Dashboard 布局一致，整页演示全新播客：数据全为 0，单集表现表为空状态                  |
| Dashboard (free)     | 与 Dashboard 布局一致；免费版状态，单集表现表被遮罩锁定，显示 "Upgrade to unlock" 按钮      |

三个引导页结构相同，都使用同一套步骤清单卡片，差异只在步骤内容；三个 Dashboard 页面结构相同，差异只在数据状态与单集表现表是否锁定。

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

免费版状态（Dashboard (free)）下，该表为付费功能，整块被遮罩锁定：表格保留原有结构但模糊、淡化且不可交互，遮罩中央显示锁图标、一行深色升级说明 —— "Upgrade your plan to see how every episode performs in its first week and first month." —— 以及 **Upgrade to unlock** 按钮。遮罩下的行是占位数据，并非创作者的真实单集；该状态下不显示 "View more →"。

### 2.4 成就（Achievements）

成就以「获得成就后的祝贺弹窗」呈现。Dashboard 页面不再展示成就卡片；用户获得新成就后，第一次进入 Dashboard 时会收到祝贺。

**触发时机**

- 用户获得新成就后，第一次进入 Dashboard 页面时弹出
- 同一会话内只弹一次：关闭后再次进入 Dashboard 不再出现
- 没有获得任何成就时不弹出

**弹窗内容**

| 区域 | 内容 |
| -- | -- |
| 海报图 | 成就对应的祝贺海报，当前示例为 "Congratulations on publishing 1 episode! Here's to the next 1!" |
| 标签 | **ACHIEVEMENT UNLOCKED** |
| 说明文案 | "You just published your first episode. Share the milestone with your listeners." |
| 分享 | Post（X）、Facebook、LinkedIn 三个分享按钮 |

**庆祝效果**

- 弹窗打开时播放彩纸动画

**关闭方式**

- 点击右上角关闭按钮、点击遮罩、按 Esc 均可关闭

### 2.5 评论（Comments）

Dashboard 页面不再展示 "Recent Comments" 卡片，评论入口统一收在设置层，共两处：

| 入口 | 位置 | 说明 |
| -- | -- | -- |
| Profile | 左侧边栏头像 / 个人资料 | 进入个人资料页面后管理评论 |
| 播客列表的更多操作 | 播客列表中该播客右侧的「⋮」更多操作 | 选择 **Manage Comments** 进入评论管理页 |

两处入口进入的都是同一个评论管理页面。评论功能关闭时，评论管理页内展示关闭状态说明。

### 2.6 播客资源（Podcast Resources）

Dashboard、Dashboard (v3) 与 Dashboard (free) 页面底部各有一组资源卡片，为创作者提供教程入口。

卡片以横向轮播展示：一屏显示 3 张半（第 4 张只露出半张，提示右侧还有内容），共 10 篇示例文章。区块标题右侧的左右箭头每次翻 3 张，翻到两端时对应箭头置灰；也支持触控板或触屏横向滑动。

每张卡片均为上图下文结构，整张卡片可点击（当前为占位链接）。卡片中的文章目前为占位内容，需要 BO 提供相应功能后进行配置和替换。

### 2.7 引导流程（Onboarding）

面向新用户的引导页，页面标题为 **"Get your podcast ready"**，副标题为 "Here are some useful tips to help you get started on your podcasting journey."。

**步骤视图**

| 步骤 | 标题与说明                                                                                               | 按钮      | 点击后进入                          |
| -- | --------------------------------------------------------------------------------------------------- | ------- | ------------------------------ |
| 1  | **Set up your podcast** — Set up your podcast’s basic details and briefly describe what it’s about. | Setup   | Settings > Podcast Info 页面     |
| 2  | **Publish your first episode** — Upload your first episode and make your show live.                 | Publish | Episodes 页面                    |
| 3  | **Submit to podcast platforms** — Reach listeners on Spotify, Apple Podcasts, and more.             | Submit  | Distribution > Podcast Apps 页面 |

- 第 1 步卡片内附 "Already have a show? Import existing podcast to Podbean" 链接，点击进入 Import to Podbean 页面。
- 点击各步骤的按钮会完成该步骤，并进入上表对应的页面。
- 页面不显示进度条，完成情况由三步各自的圆圈状态表示（未完成 / 已完成），圆圈本身不可点击。
- 用户通过该步骤的按钮完成操作，完成后圆圈状态随之更新。
- 未完成与已完成步骤的标题、圆圈和按钮样式见设计稿。
- 底部 "Skip the Guide →" 可跳过引导，直接进入 Dashboard。
- 提示文案 "You will see your podcast statistics here after you get a few downloads." 与 "Getting started resources" 资源区都位于步骤视图内，切换到数据视图时一并隐藏。
- "Getting started resources" 资源区与 Dashboard 的 Podcast Resources 采用同一种横向轮播（一屏 3 张半、共 10 篇示例文章、左右箭头翻页），同样需要 BO 新增相应功能来配置内容。

**数据视图**

已产生下载数据后，引导页切换为数据视图。

具体达到多少下载数据才会切换为数据视图，需要由开发确认。

### 2.8 导入引导（Onboarding (import)）

面向已有播客创作者的导入引导页，复用 Onboarding 的步骤清单卡片与页面结构，页面标题同为 **"Get your podcast ready"**，副标题同为 "Here are some useful tips to help you get started on your podcasting journey."。

| 步骤 | 标题与说明                                                                                                                           | 按钮      | 点击后进入                          |
| -- | ------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------ |
| 1  | **Import existing podcast to Podbean** — Bring your existing podcast or video series over in just 3 simple steps.               | Import  | Import to Podbean 页面           |
| 2  | **Publish new episodes** — Go to publish or schedule new episodes on Podbean. Your imported episodes will also be listed there. | Publish | Episodes 页面                    |
| 3  | **Submit to podcast platforms** — Reach listeners on Spotify, Apple Podcasts, and more.                                         | Submit  | Distribution > Podcast Apps 页面 |

### 2.9 私有播客引导（Onboarding (private)）

面向私有播客创作者的引导页，页面标题与副标题、步骤清单卡片、底部提示与资源区均与 Onboarding 一致。

| 步骤 | 标题与说明                                                                                                                                          | 按钮      | 点击后进入                               |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------- |
| 1  | **Set up your podcast** — Set up your podcast’s basic details and briefly describe what it’s about.                                            | Setup   | Settings > Podcast Info 页面          |
| 2  | **Publish private episodes** — Upload and publish your first private episode. Only your members can access your private podcast by logging in. | Publish | Episodes 页面（发布私有单集）                 |
| 3  | **Assign private members** — Add or manage the members who have access to your private podcast.                                                | Manage  | 私有成员管理页面（企业管理后台 private members 页面） |

---

## 3. 响应式设计

页面需适配不同屏幕尺寸，在各类设备上保持布局完整、内容清晰可读。
