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
| Dashboard v2（无评论变体） | `dashboard-v2-nc` | 与 v2 基本相同，但布局上移除了"最近评论"区块，成就区域改为通栏展示 |

页面当前使用**静态演示数据**（mock 数据），前端交互已完整实现，尚未接入后端 API。导航栏中的 "Dashboard v2"（无评论版）为同一数据面板的布局变体，用于对比评审。

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
| Dashboard v2 | `dashboard-v2-nc` | `#page-dashboard-v2-nc` |

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

展示播客里程碑徽章，包含"已解锁 / 锁定"状态：

| 徽章 | 图标色 | 状态 | 说明 |
|---|---|---|---|
| 1K Downloads | 绿 `#d1fae5` | ✅ 已解锁 | Feb 2026 |
| 100 Downloads | 蓝 `#dbeafe` | ✅ 已解锁 | Jan 2026 |
| First Episode | 黄 `#fef3c7` | ✅ 已解锁 | Dec 2025 |
| 10K Downloads | 灰（半透明） | 🔒 锁定 | 未达成，显示 "Locked" |

- 顶部大图为最新获得的徽章图片（`podcastbadge.png`），右侧带 **Share（分享）** 按钮，hover 时按钮背景加深（使用内联 `onmouseover/onmouseout` 实现）。
- 成就区域在 v2 中与"最近评论"并排（各占 1/2 宽）；在 v2-nc 中改为通栏显示。

### 4.5 最近评论（Recent Comments）

展示听众最新评论列表（仅存在于 `dashboard-v2` 视图）：

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
| Dashboard v2（侧边栏） | `#page-dashboard-v2-nc` | `switchDashboard('dashboard-v2-nc')` |
| Get Started / 导入播客 | → `dashboard-v2` | 引导页内链接 |
| Skip the Guide | → `dashboard-v2` | `skipOnboarding()` |
