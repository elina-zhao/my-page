# Episodes 菜单功能说明文档

> 适用范围：`index.html`（Podbean Admin — Episodes）
> 文档版本：v2.4
> 说明：本文档为**功能 mockup**，逐页、逐控件描述 Episodes 菜单下的功能与交互逻辑。UI 文案保留英文原样。具体视觉样式由设计师另行确定，不在本文档范围内。

---

## 目录

1. [页面整体结构](#1-页面整体结构)
2. [Episodes 0 页面（空状态）](#2-episodes-0-页面空状态)
3. [Episodes 列表页面](#3-episodes-列表页面)
4. [Episodes 2 页面](#4-episodes-2-页面)
5. [Episodes 3 页面（Free plan 自动删除演示）](#5-episodes-3-页面free-plan-自动删除演示)
6. [New Episode 弹窗（Upload media file）](#6-new-episode-弹窗upload-media-file)
7. [Publish Episode 弹窗](#7-publish-episode-弹窗)
8. [AI Settings 弹窗](#8-ai-settings-弹窗)
9. [其他弹窗](#9-其他弹窗)
10. [Toast 通知](#10-toast-通知)
11. [数据与交互逻辑说明](#11-数据与交互逻辑说明)

---

## 1. 页面整体结构

**Episodes 0**、**Episodes**、**Episodes 2**、**Episodes 3** 均为侧边栏一级菜单项（无子菜单）：

- **Episodes 0** — 空状态演示页面：展示用户**尚未创建/发布任何剧集**时的状态
- **Episodes** — 用户**已创建或发布剧集**后看到的完整 **Episodes 列表**页面
- **Episodes 2** — 演示页面，模拟用户开通 **Apple Podcast Subscription** 之后剧集列表多出一列 **Type** 的展示效果
- **Episodes 3** — 演示页面，模拟 **Free plan** 用户的剧集列表：只显示 **Published / Draft** 状态的剧集，并在页面顶部提示 **Free 计划下剧集在创建 90 天后会被自动删除**、每集标题后内联显示删除倒计时（详见第 5 节）

同一 Episodes 页面在真实产品中根据用户是否有剧集数据，在"空状态"与"列表页"两种形态间切换；Episodes 0 / 2 / 3 均为演示这些形态/扩展形态的独立入口。

本文档覆盖这些页面；其余菜单（Dashboard、Distribution、Statistics、Settings 等）在当前版本为占位页，不在本文档范围内。

---

## 2. Episodes 0 页面（空状态）

展示用户**尚未创建/发布任何剧集**时的状态。

### 2.1 页面头部

- **标题**：`Episodes`（此状态下不显示 New Episode 工具栏按钮以外的批量操作入口）。

### 2.2 空状态内容

页面中部展示空状态引导：

- 图标（与"无数据"语义对应的示意图形）。
- 主文案：`No episodes yet`。
- 说明文字：`You haven't published any episodes. When you upload your first episode, it will show up here.`
- **New Episode 按钮**：点击打开 New Episode 弹窗（见第 6 节），与列表页一致。

此状态下不显示搜索框、筛选、批量操作、表格与分页。

### 2.3 推荐内容

空状态引导下方展示两个推荐入口（用于引导新用户创建首个剧集），标题为 "Ready to create your first episode? Try these"：

**① Podbean AI Podcast Creator**

- 描述：`Turn your ideas into a full episode — AI writes the script, generates realistic voices, and creates show notes automatically.`
- 操作链接：`Try AI Podcast Creator →`。

**② Podbean App 录制**

- 描述：`Record high-quality episodes right from your phone with the Podbean App, then upload and publish directly.`
- 操作链接：`Learn more →`。

---

## 3. Episodes 列表页面

用户**已创建或发布剧集**后看到的列表页（与 Episodes 0 空状态互为两种形态）。

### 3.1 页面头部

- **标题**：`Episodes`
- **New Episode 按钮**：带 `+` 图标；点击打开 New Episode 弹窗（见第 6 节）。

### 3.2 工具栏

工具栏包含两个控件：

**① 搜索框（Search episodes）**

- 文本输入框，placeholder 为 `Search episodes`。

**② Filter 按钮 + 筛选弹窗**

点击 Filter 按钮弹出筛选面板。筛选器按类别分为 4 个子面板，通过左侧导航切换：

| 子面板 | 筛选内容 | 选项 |
|---|---|---|
| **Status（状态）** | 剧集发布状态 | All Statuses（全选）、Published、Draft、Future、AI Processing、AI Finished、AI Failed |
| **Media Type（媒体类型）** | 音频/视频 | Audio、Video |
| **Season（季数）** | 所属季 | All Seasons + 用户已创建的 Seasons（数量根据用户创建的 seasons 动态生成，如 Season 1、Season 2……） |
| **Published（发布日期）** | 日期范围 | From / To 两个日期输入框 |

交互规则：

- 每个子面板的 "All" 选项与子选项互斥：勾选子选项时自动取消全选；取消全部子选项时自动勾回全选。
- 面板底部仅保留 `Reset`（将当前面板重置为默认选项），不显示选中数量；侧边导航底部有 `Reset all`（将全部筛选重置为默认）。
- 老版 AI generator 的 **Pending / Pending Review** 状态在新后台不再适用，已删除，筛选器与剧集数据中均不再出现。
- 已修改但未应用的筛选项，其导航项会显示 dirty 标记。
- 点击底部 **Apply** 按钮应用筛选，Filter 按钮进入激活状态；应用筛选时会**清空当前选中态**（若有勾选的剧集则取消勾选、收起 Actions 菜单），避免筛选后可见行变化导致选中项被隐藏的困惑。
- **快速清除筛选**：Apply 后 Filter 按钮旁出现 `×` 清除按钮，点击一键将所有筛选重置为默认并关闭筛选弹窗（无需重新打开弹窗），同时 Filter 按钮退出激活状态。

**③ Actions 按钮 + 批量操作弹窗（位于表格选中条）**

Actions 按钮不在工具栏中，而是位于**表格选中条（alt-header-bar）**上：勾选剧集后，表格顶部出现替换表头（全选复选框 + 选中数量 `N selected`），**Actions** 按钮紧跟在 `N selected` 文字右侧，点击弹出操作菜单（**纯菜单**，无二级子面板）；选中条最右侧为 **Clear selection** 链接，点击清空所有勾选：

- 菜单入口：
  - **Set Season**（批量设置季数）→ 打开 **Set Season** 对话框
  - **Set Tags**（批量设置标签）→ 打开 **Set Tags** 对话框
  - **Remove All Seasons** / **Remove All Tags**（普通色）→ 打开对应的**确认弹窗**（与 Delete 确认弹窗同套路）
  - **Delete Episodes**（危险操作，红色显示）→ 打开 **Delete** 确认弹窗；与前一组操作以一条分隔线隔开
- **Tags app 依赖**：**Set Tags** 与 **Remove All Tags** 两个入口仅对**已安装 Tags app** 的用户显示；未安装的用户，Actions 菜单中不出现这两项（菜单仅剩 Set Season / Remove All Seasons / Delete Episodes）。
- **Set Season** / **Set Tags** / **Delete Episodes** / **Remove All Seasons** / **Remove All Tags** 弹出的对话框均为**模态弹窗**，与 Delete 确认弹窗同一套样式（居中卡片、遮罩层、底部操作按钮）；打开弹窗时自动收起 Actions 菜单。

**Delete 确认弹窗：**

- 标题：`Delete selected N episode(s)`（N 为勾选数量，单数/复数自适应）。
- 说明：`Are you sure you want to delete the selected episode(s)? This action cannot be undone and will also permanently delete the attached media files.`
- 按钮：**Cancel**（取消，关闭弹窗）/ **Delete**（红色，确认删除勾选剧集）。
- 确认删除后：从表格移除勾选的行，弹出 Toast：`Deleted N episode(s).`。

**互斥规则**：Filter 筛选弹窗与 Actions 批量操作弹窗互斥——打开其中一个时自动收起另一个。

**Set Season 弹窗：**

- 说明文字：`Set or change the season number for all selected episodes.`
- **Season No.** 文本输入框，手动输入季数（placeholder：`e.g. 1`）；支持 Enter 快捷提交。
- 校验：需为不小于 1 的整数，否则在**输入框下方显示内联错误**（红色文字 + 输入框红框）：`Please enter a valid season number (e.g. 1).`；开始输入或关闭弹窗时自动清除（不用 Toast）。
- 底部按钮：**Cancel**（取消，关闭弹窗）与 **Set Season**（主按钮）并排放置；**Set Season** 将所填季数应用（设置/更改）到所有勾选剧集，成功后弹出 Toast：`Set N episode(s) to Season X`。
- 未勾选剧集时弹出 error 类型 Toast：`No episodes selected.`
- 批量清除季数改由 **Actions 菜单中的 Remove All Seasons** 执行（会弹出确认框，见下方说明），本弹窗不再提供移除按钮。
- 关闭方式：点击右上角 **×**、点击弹窗以外区域，或点击 **Cancel**；打开弹窗时自动收起 Actions 菜单。

**Set Tags 弹窗：**（仅 **Tags app 已安装**用户的 Actions 菜单入口可打开，见 3.2 ③）

- 已选标签以 chip 形式显示，可点击 `×` 移除。
- 输入框支持搜索/创建标签（placeholder：`Select or type tags...`）。
- 下拉列表展示可用标签及其使用数量（如 `interview` + `3 episodes`）；可勾选多个。
- 输入新标签名且不存在时，出现 `+ Create "xxx"` 选项。
- 支持快捷键：Enter 添加当前输入为标签；Backspace（输入框为空时）删除最后一个已选标签。
- 底部按钮：**Cancel**（取消，关闭弹窗）与 **Set Tags**（主按钮）并排放置；**Set Tags** 将所选标签应用到所有勾选剧集，成功后弹出 Toast：`Tagged N episode(s) with: <标签列表>`。
- 未勾选剧集时弹出 error 类型 Toast：`No episodes selected.`
- 未选择任何标签时，在**标签选择区下方显示内联错误**（红色文字 + 输入框红框）：`Please select at least one tag.`；选择/添加标签、输入内容或关闭弹窗时自动清除（不用 Toast）。
- 批量清除标签改由 **Actions 菜单中的 Remove All Tags** 执行（会弹出确认框，见下方说明），本弹窗不再提供移除按钮。
- 关闭方式：点击右上角 **×**、点击弹窗以外区域，或点击 **Cancel**；打开弹窗时自动收起 Actions 菜单；操作完成后自动关闭。

**Remove All Seasons / Remove All Tags（菜单直接操作项 + 确认弹窗）：**

- 这两个入口是 **Actions 菜单中的直接操作项**（普通色），点击**无需选择具体值**，对当前勾选的所有剧集生效；但执行前会先弹出**确认弹窗**（与 Delete 确认弹窗同套路），确认后再清除（其中 **Remove All Tags** 同样仅 **Tags app 已安装**用户可见，见 3.2 ③）：
  - **Remove All Seasons** → 确认弹窗 → 确认后清除勾选剧集的全部季数，Toast：`Removed all seasons from N episode(s).`
  - **Remove All Tags** → 确认弹窗 → 确认后清除勾选剧集的全部标签，Toast：`Cleared all tags from N episode(s).`
- 确认弹窗标题为 `Remove All Seasons` / `Remove All Tags`；说明文字带勾选数量（如 `Are you sure you want to remove the season number from N selected episode(s)?`）；按钮为 **Cancel**（关闭）/ **Remove**（主按钮色，确认执行）。
- 点击后自动收起 Actions 菜单；未勾选剧集时弹出 error 类型 Toast：`No episodes selected.`
- **配色语义**：Remove 项与 Delete Episodes 之间以一条分隔线隔开，且**Remove 用普通色、Delete Episodes 用红色**，呼应"元数据修改"（可逆、普通操作）与"删除剧集"（永久、危险操作）的区分——红色只保留给真正不可逆的删除。

### 3.3 剧集表格

**列结构：**

| 列 | 说明 |
|---|---|
| 复选框 | 用于多选（列头为全选复选框） |
| Title | 剧集标题（标题过长时**自动换行、完整显示**，行高随标题行数变长；不做单行/多行截断） |
| User | 用户（显示 **Settings → Podcast Info → Author & Region** 中 **Author** 的值） |
| Status | 状态徽章 |
| When | 发布时间 |
| Downloads (All time) | 累计下载量 |

- **User / Status / Downloads (All time)** 三列的值保持**单行不换行**，列宽按内容保证；仅 **Title** 列允许换行完整显示。

**状态值：** Published、Draft、Future、AI Processing、AI Finished、AI Failed。

**行交互：**

- 整行可点击 → 打开 **Publish Episode** 弹窗（**标题始终为 Publish Episode**，不随状态变化），右上角主按钮文案随剧集状态变化：
  - **Published** → 主按钮 **Update**
  - **Draft / AI Finished / AI Failed** → 主按钮 **Publish Now**
  - **Future** → 主按钮 **Schedule Publish**（打开弹窗后即进入定时发布模式，可直接调度）；**主按钮左侧同一行显示当前排定时间**（见 7.1）
  - **AI Processing** → 整行**不可点击**；hover 或点击时显示提示 tooltip：`You cannot edit or delete the episode while it is undergoing AI processing. Please try again after the processing is complete.`。该行的多选复选框**禁用**（置灰不可勾选、无法参与批量操作），行内 **Edit / View / Share & Embed** 操作按钮**不显示**。
- 悬停行时，标题旁浮现 3 个行内操作按钮：
  - **Edit**（编辑）→ 打开编辑弹窗（AI Processing 行例外，见上）
  - **View**（查看）→ 新窗口打开剧集网页
  - **Share & Embed**（分享/嵌入）→ 打开 Share Episode 弹窗

**多选逻辑：**

- 勾选任意行后，表格顶部出现替换表头（选中条）：显示全选复选框 + 选中数量（`N selected`），**Actions** 按钮紧随 `N selected` 之后，选中条最右侧为 **Clear selection** 链接（详见 3.2 ③）。
- 表头全选复选框支持全选/全不选及半选状态（indeterminate）。

### 3.4 分页

- 底部显示 `Showing 1 to 20 of 26 entries` 及页码按钮（1 / 2），当前页为激活态。

---

## 4. Episodes 2 页面（Apple Podcast Subscription 演示）

**背景**：此页面为演示页，模拟用户开通 **Apple Podcast Subscription** 之后 Episodes 列表的展示效果。开通后，剧集列表会多出一列 **Type**，用于标识每集的订阅类型。

与 Episodes 列表页面结构基本一致，区别在于：

- 表格多一列 **Type**，列顺序为：复选框 → Title → User → Type → Status → When → Downloads。
- Type 值为每行剧集数据的订阅类型字段（如 Free、Ad-free、Subscriber-only、Early access、Archive access）。
- 状态为 **AI Processing**、**AI Finished** 或 **AI Failed** 的剧集，其数据的 **type 字段即为 Free**（列表 Type 列与编辑弹窗预填均为 Free）。
- 在此页面点击行编辑或新建剧集时，Publish Episode 弹窗的 **Basic Info** 区块在 **Media File 上方**多显示一个 **Episode will be（订阅类型）** 下拉，编辑时预填该行 Type 值、新建默认 Free；订阅类型选 **Ad-free** 时，**Episode will be 下方**还会出现 **File for Subscriber** 上传字段（详见 7.2）。

工具栏、筛选弹窗、Actions 弹窗（含 Delete，位于表格选中条）、分页等与 Episodes 列表相同；其中 **Set Tags / Remove All Tags** 入口同样仅对**已安装 Tags app** 的用户显示。

---

## 5. Episodes 3 页面（Free plan 自动删除演示）

**背景**：此页面为演示页，模拟 **Free plan** 用户的 Episodes 列表。Free 计划下，**剧集在创建 90 天后会被自动删除**。列表**只显示 status 为 Published / Draft 的剧集**（其余列与 Episodes 列表页一致，无 Type 列，见 3.3）。

### 5.1 页面头部

- **Free plan 提示条（位于标题上方）**：横幅，位于页面标题 **Episodes** 上方，由三部分组成：
  - **提示文案**：`Free plan — episodes are automatically deleted 90 days after creation.`
  - **Upgrade to keep them →** 按钮：点击打开升级提示弹窗（见 5.3）。
  - **删除风险摘要行**（横幅内、提示文案下方）：当存在即将被删除的剧集时显示，统计所有 Published / Draft 剧集中**剩余删除天数 ≤ 14 天**的数量，文案如 `2 episodes will be deleted within 14 days.`（单复数自适应）；无此类剧集时整行隐藏。

### 5.2 表格与删除倒计时

列结构与 Episodes 列表页一致：复选框 → Title → User → Status → When → Downloads (All time)；仅渲染 **Published / Draft** 状态的剧集。

**Title 列 —— 删除倒计时内联展示：**

- 每集标题后**内联**显示删除倒计时小字（时钟图标 + 文案），不单独占用一列：
  - `Will be deleted in N days.`（剩余 N 天）
  - `Will be deleted in 1 day.`（剩余 1 天）
  - `Will be deleted today.`（剩余 0 天）
- 倒计时 = 该剧集 **创建时间（created，YYYY-MM-DD）+ 90 天 − 当前日期**。
- 剧集创建满 90 天（到期）后会被**自动删除**，不再出现在列表中。
- **剩余天数 ≤ 14 天**的剧集，倒计时文字用**暖橙色**（urgent）突出；其余为低调的灰色，避免列表整体过于醒目。
- 鼠标**悬停行**时，倒计时隐藏，切换显示 **Edit / View / Share & Embed** 操作图标（与 Episodes 列表页行为一致，见 3.3）。
- 顶部"删除风险摘要行"显示的即为此类（≤ 14 天）剧集的数量。

**演示首行（长标题换行）**：列表首行为一条**演示行**，标题为超长文案，用于演示 Title 列**长标题自动换行、完整显示**的效果（标题过长不截断；该行为 mockup 演示元素，非真实剧集）。

### 5.3 升级提示弹窗（Upgrade to keep your episodes）

点击 Free plan 提示条中的 **Upgrade to keep them →** 按钮弹出升级弹框。

---

## 6. New Episode 弹窗（Upload media file）

全屏弹窗，标题 `Upload media file`，左上角为 Cancel（关闭弹窗）。上传文件（或 Upload later / 远程文件）后打开 **Publish Episode 弹窗**（见第 7 节）填写剧集信息并发布。

### 上传媒体文件

**左侧 —— 上传区域（Upload Zone）：**

- 大区域，支持点击浏览或拖拽文件上传。
- 标题：`Upload Media File`；提示：`Drag & drop your media file here, or click to browse`（通用文案，不随 plan 变化，便于多语言翻译）。
- 支持的格式（**Supported file formats** 提示）根据**用户当前 plan** 动态显示：
  - **Free plan**：`mp3, m4a`
  - **Unlimited Audio Plan**：`mp3, m4a, ogg, zip, pdf, ppt, docx, xml`
  - **Unlimited Plus and above**：`mp3, m4a, ogg, zip, pdf, ppt, docx, xml, mp4, m4v, mpg`
  - **演示页按页面区分 plan**：打开 New Episode 弹窗时，按当前所在页面自动设置 `currentPlan` —— **Episodes 页 = Free**，**Episodes 2 页 = Unlimited Audio**（`index.html` 中 `openNewEpisodeModal()` 顶部按 `currentPage` 设置）。
  - **Free / Unlimited Audio** plan 时，格式提示下方额外显示视频升级提醒：`Video podcasting (MP4, M4V, MPG) is available on Unlimited Plus and above.` + **Upgrade** 链接（点击弹出升级提示框）；Unlimited Plus 及以上不显示。
- 上传当前 plan 不支持的格式时：
  - 若该格式为**更高 plan** 支持 → 弹出 **Upgrade Required** 提示框（说明需升级到的套餐），不继续流程（停留在上传弹窗）。
  - 若任何 plan 都不支持 → 弹出 **Unsupported Format** 提示框。
- 文件选择后（当前 plan 支持时）：系统先判断剩余积分是否足以用 AI 处理本集（不足时在 AI Enhance 面板显示警告），随后打开 **Publish Episode 弹窗**（见第 7 节），并将所选文件带入其 **Media File** 字段。
- **Or use a remote file**（仅当系统后台为该用户开放此选项时显示；该功能以产品文档为准，演示页 `remoteFileEnabled` 默认 `false`，即演示页默认不显示）：
  - 位于上传区域下方，包含 URL 输入框（placeholder `https://example.com/audio.mp3`）与 **Submit** 按钮（或按 Enter 提交）。
  - 提交后跳过上传，直接打开 Publish Episode 弹窗，其 **Media File** 显示为该 URL；每次打开弹窗时清空上次输入的 URL。
- 底部链接：**Upload later →**（跳过上传，直接打开 Publish Episode 弹窗）。

### AI Enhance 面板

- 标题：**AI Enhance**
- **剩余积分（Remaining Credits）**：显示 `2,800`；悬停整行（"Remaining Credits" 文字与积分数字）弹出 tooltip，说明文字（英文）：
  - `You have 2,800 out of 2,800 credits left. This equals roughly:`
  - `280 minutes of AI Audio Optimization`
  - `OR`
  - `560 minutes of AI Content Assistant`
  - `AI Content Assistant · 300 credits/hour`
  - `AI Audio Optimization · 600 credits/hour`
- **积分不足（demo）**：演示页默认演示「积分不足」场景。Remaining Credits 下方显示警告：`Insufficient credits to process this episode with AI.` + **Buy more credits** 按钮。
  - **触发条件（需技术确认）**：积分不足警告出现的条件，由**系统根据用户之前的使用情况预测**本集 AI 处理所需积分，当预测所需 ＞ 剩余积分时显示。具体预测逻辑（如何依据历史使用/文件信息得出所需积分）**需要技术对照旧版功能代码确认**。演示页以固定值模拟不足场景（剩余 `2,800` ＜ 预测所需 `3,200`）。
  - **上传文件时**：用户选择并上传文件（格式校验通过）后，系统会**判断剩余积分是否足以用 AI 处理本集**，不足时显示上述警告（demo 中 `evaluateCreditsForUpload()` 复用 `updateCreditsWarning()` 同一判断）。
  - 点击 **Buy more credits**（演示）→ 页面跳转到**购买页面**；购买完成返回后，页面显示**最新的剩余积分**（Remaining Credits 数字与悬停 tooltip 内容同步更新）。

- **Free plan 用户**：AI Audio Optimization 与 AI Content Assistant 两个区块**没有开关**，区块行右侧显示 **Activate** 按钮；点击弹出升级提示（`Upgrade Required`），说明文字：`{功能名} is available on Unlimited Audio and above plans. Upgrade to activate it.`；区块内容保持禁用不可交互。
- **演示升级行为**：点击升级弹窗中的 **Upgrade** 模拟升级成功 —— 当前 plan 切换为 `Unlimited Audio`，关闭弹窗后回到 AI Enhance 面板，两个区块显示**开关**（初始状态为**关闭**，用户可手动打开），上传格式提示同步更新；点击 **Cancel** 则不升级、保持 Free plan。
- **非 Free plan 用户**：显示开关。

- **AI Audio Optimization** 区块（非 Free plan 带开关）：
  - 功能列表：Noise Reduction、Intelligent Leveler、Cut Filler Words and Silence、Filtering & AutoEQ
  - 链接：`How it works →`、`Settings`（打开 AI Audio Optimization Settings 弹窗）
  - 开关关闭后，该区块内容不可交互

- **AI Content Assistant** 区块（非 Free plan 带开关）：
  - 功能列表：Automated Title and Show Notes、Precisely Crafted Chapter Markers、AI Enhanced Transcripts
  - 链接：`How it works →`、`Settings`（打开 AI Content Assistant Settings 弹窗）
  - 开关关闭后，该区块内容不可交互

- **开关状态记忆**：AI Enhance 面板初始状态为**关闭**（两个区块开关默认关闭）。AI Audio Optimization 与 AI Content Assistant 两个区块的开关会**继承用户上次发布时**的状态 —— 用户点击 **Publish** 时记录当时两个开关的状态，下次打开 New Episode 弹窗时自动恢复该状态。

---

## 7. Publish Episode 弹窗

全屏弹窗，标题始终为 **Publish Episode**，用于新建或编辑剧集（右上角主按钮文案随剧集状态变化，见 7.1）。

### 7.1 顶栏

**布局**：左侧为 **Cancel** + **Save as Draft**（两者之间以细分隔线隔开）；中间为标题（居中）；右侧为排定时间行（仅 Future 剧集显示）+ **Publish 主按钮**（时间行位于主按钮左侧、同一行）。

| 控件 | 说明 |
|---|---|
| **Cancel** | 有未保存修改时弹出 "Unsaved Changes" 确认框；否则直接关闭 |
| **Save as Draft** | 保存草稿并关闭（Toast 提示 "Episode saved as draft!"） |
| **标题** | Publish Episode（固定不变） |
| **排定时间行** | 仅 Future 剧集显示：`Scheduled for Jun 26, 2026 2:00 PM`（纯展示，无 Change 链接），位于主按钮左侧同一行（详见下方规则） |
| **Publish 按钮** | 主按钮，文案随状态变化：Publish Now / Update / Schedule Publish |
| **下拉箭头** | 展开下拉菜单，可切换 **Schedule Publish**（定时发布） |

规则：

- 标题或文件名未填时，Publish 按钮为禁用态。
- **新建剧集**（New Episode → Upload later）打开弹窗时**默认即为 Publish Now（即时发布模式）**，下拉项为 Schedule Publish；可切换为定时发布。
- 点击 "Schedule Publish" 后按钮文案切换为 "Schedule Publish"，再次点击主按钮会打开 Schedule Publish 弹窗（见 9.1）。
- **Future** 状态的剧集打开弹窗时**默认即为 Schedule Publish**（主按钮直接显示 Schedule Publish，下拉项变为 Publish Now，可切回即时发布）。
- **排定时间展示与修改**：Future 剧集打开弹窗时，**主按钮左侧同一行显示当前排定时间**（如 `Scheduled for Jun 26, 2026 2:00 PM`，纯展示、无 Change 链接）；修改排定时间通过点击主按钮 **Schedule Publish** 打开 Schedule Publish 弹窗（Date/Time 预填当前排定值），确认修改后该时间行即时更新。
- 发布/更新成功时显示 Toast，并（编辑已发布剧集时）自动打开 Share Episode 弹窗。

### 7.2 内容区 —— 左侧菜单 + 同页堆叠的四个区块

内容区左侧为竖向菜单，四项依次为 **Basic Info → Transcripts → Chapter Markers → More Options**。

这四项**不是选项卡**，也不切换显隐：四个区块在同一页自上而下堆叠，相邻区块之间以细分隔线分隔。左侧菜单是**锚点**——点击某一项会平滑滚动到对应区块；滚动页面时左侧高亮会自动跟随当前位置（scrollspy）。

#### Basic Info 区块

> 原「Episode Info」，2026-09-29 改名为 **Basic Info**（左侧菜单项与该区块标题同步改名）。

**① Episode will be（订阅类型）**

- 位于 **Media File 上方**（本区块第一个字段）的下拉选择器；**仅 Episodes 2 页面**（开通 Apple Podcast Subscription 的演示页）显示。
- 选项为订阅类型：`Free`、`Ad-free`、`Subscriber-only`、`Early access`、`Archive access`。
- 编辑剧集时预填该行剧集数据的 **Type** 值；新建剧集默认 `Free`。
- 在 Episodes 列表页（无订阅）打开弹窗时不显示此字段。
- 选择 **Early access** 时，下方显示解释文字 `Subscribers get early access to this episode. It becomes public at the date and time below.`，并出现 **Public release（公开上架时间）** 输入（单个日期 + 时间控件，datetime-local）。
- 选择 **Archive access** 时，下方显示解释文字 `After the "Archive date" date, the episode will be available only to your Apple Podcast subscribers.`，并出现 **Archive date（进入档案日期）** 输入（单个日期 + 时间控件，datetime-local，与 Early access 相同）。
- 上述 **Public release / Archive date** 输入框，**点击整行**（输入框任意位置）即通过 `showPicker()` 弹出时间选择器；浏览器不支持 `showPicker()` 时退化为聚焦输入框。
- 选择 **Subscriber-only** 时，下方显示解释文字 `Apple Podcasts subscribers have exclusive access to the episode.`（无时间输入）。
- 选择 **Ad-free** 时，下方显示解释文字（无时间输入）：
  - `You can upload a separate file (content without ads) for Apple Podcasts subscribers.`
  - 同时 **Episode will be 下方**（Media File 上方）多显示一个 **File for Subscriber** 上传字段（见 ③）。
- 选择 **Free** 时，下方显示解释文字 `The episode will be public and available to all listeners and displayed in your podcast feed.`（无时间输入；新建剧集默认为此选项）。

**② Media File**

- 显示当前文件名（如 `episode-audio.mp3`）；有文件时右侧为 **✕** 删除链接（与 File for Subscriber 的操作样式一致）。
- 点击 **✕** 清除文件后，文件名位置显示灰色提示 `Please upload a file.`，右侧链接变为 **Upload**，点击选择新文件。
- 未上传文件时 Publish 主按钮为禁用态。

**③ File for Subscriber（订阅者版本文件）**

- **仅当订阅类型为 Ad-free 时**显示，位于 **Episode will be 下方**（Media File 上方）。
- 行样式与 **Media File** 一致（文件图标 + 文件名 + 右侧操作链接）。
- 未上传时，文件名位置显示提示文字 `Please upload a file.`（灰色），右侧操作链接为 **Upload**，点击选择本地音频文件。
- 选择文件后：提示文字变为该文件名，右侧操作链接变为 **✕**（删除）；点击 ✕ 清除文件并恢复 `Please upload a file.` + Upload。
- 每次打开弹窗时重置为未上传状态。

**④ Title**

- 剧集标题输入框，placeholder 为 `Enter episode title`。标题变化会实时同步更新 Publish 按钮可用状态。

**⑤ Description（富文本编辑器）**

- 工具栏：B（加粗）、I（斜体）、U（下划线）、无序列表、有序列表。
- 内容区为可编辑区域，placeholder：`One or more sentences describing your episode to potential listeners.`

**⑥ Episode Artwork（剧集封面）**

- 封面预览图。
- 提示：`Between 1400 and 2048 pixels square (jpg or png).`
- **Upload** 按钮 + 下拉箭头：点击下拉可从账号已有 Logo 中选择（Logo 1~4），或直接上传本地图片。

**⑦ Social Sharing（社交分享）**

- 标题：`Social Sharing`；说明：`Auto-share after publishing — click icons to enable or disable.`
- **编辑已发布（Published）剧集时，Basic Info 区块中隐藏整个 Social Sharing 功能**（新建或编辑其他状态剧集时显示）。
- 社交图标（点击切换启用/停用）：Facebook、X (Twitter)、LinkedIn、**YouTube**、WordPress。
- 点击 YouTube 图标激活时，展开 **YouTube Settings** 子面板：
  - **Visibility**：Public / Unlisted
  - **Category**：Education / Entertainment / Technology
  - **Language**：English / Spanish / Chinese
  - **Paid Promotion**：复选框 `Contains paid promotion`

#### Transcripts 区块

**① 入口卡片（弹窗页内的唯一内容）**

弹窗页的 Transcripts 区块**不再包含播放器与编辑器**，只有一个入口卡片；真正的编辑在**整屏工作区**中进行（见 ②）。卡片按是否已有内容呈现三种状态：

| 状态 | 展示 |
|---|---|
| **空状态**（默认） | 说明文案 `Add a transcript to improve your SEO and let listeners read along.`，下方两个按钮：**Generate with Podbean AI**（走 AI 生成，见「AI 生成流程」）、**Add manually**（打开工作区） |
| **已有内容** | 左侧状态文案 `Transcript added`（带回勾图标），右侧**只有一个** **Edit** 按钮（打开工作区继续编辑） |
| **生成中** | 转圈图标 + 状态文案 `Generating with AI Content Assistant. It will display and applied to your episode once it is completed.` |

- 说明文案**仅在空状态显示**；已有内容与生成中都不显示。
- 打开编辑弹窗时该集若已有 transcript，卡片直接呈现「已有内容」状态。

**② Transcripts 工作区（整屏 overlay）**

点击 **Add manually** 或 **Edit** 打开，覆盖整个页面。顶栏：左侧 **Close**、中间标题 `Transcripts`、右侧 **Save**。

- **音频播放器**：播放/暂停按钮、文件名、当前时间、进度条、总时长；进度条可点击跳转。
- **Episode Transcripts 区块**：
  - **Upload SRT/VTT** 按钮：上传 .srt / .vtt 字幕文件，内容读入文本域。
  - **Download** 按钮 + 下拉：`Captions (.srt)` 或 `Plain Text (.txt)`。下载 .txt 时会自动剥离 SRT 时间轴编号。
  - **Transcript** 文本域：可粘贴/输入转写文本，placeholder：`Paste or write your episode transcript here...`
  - 底部提示：`Paste or type your transcript above, or upload a .srt or .vtt file.`
- **Save**：关闭工作区并把内容应用到当前剧集，Toast `Transcript saved and applied to your episode.`；**Close** 直接返回、不保存。

#### Chapter Markers 区块

**① 入口卡片（弹窗页内的唯一内容）**

与 Transcripts 区块同构：

| 状态 | 展示 |
|---|---|
| **空状态**（默认） | 说明文案 `Add chapter markers so listeners can jump to the moments that matter.`，下方 **Generate with Podbean AI** / **Add manually** 两个按钮 |
| **已有内容** | 左侧状态文案 `N chapters added`（N 为章节数，1 个时显示 `1 chapter added`），右侧**只有一个** **Edit** 按钮 |
| **生成中** | 转圈图标 + 与 Transcripts 相同的生成中文案 |

**② Chapter Markers 工作区（整屏 overlay）**

点击 **Add manually** 或 **Edit** 打开。顶栏：左侧 **Close**、中间标题 `Chapter Markers`、右侧 **Save**。

- **音频播放器**：播放/暂停按钮、文件名、当前时间、进度条、总时长。两个工作区各有一个播放器 UI，共用一个隐藏的音频元素。播放时实时更新 **Add Chapter** 按钮上的当前时间标签。
- **Chapters 区块**：
  - 标题：`Chapters`，右侧显示总数（如 `8 total`）。
  - 表格列：Time（点击可跳转播放到该时间点）、Title、删除按钮。
  - 空状态：`No chapter markers yet. Use the player or the form above to add one.`
  - **Add Chapter 按钮**：从播放器当前位置添加章节，打开 Add Chapter Marker 弹窗：
    - **Start Time (mm:ss)**：播放器当前时间自动填入，可手动修改。
    - **Chapter Title**：章节标题。
    - Cancel / Add Chapter（Enter 也可提交）。
    - 时间格式校验：`mm:ss` 或 `hh:mm:ss`。
  - 章节按时间自动排序。
- **Save**：关闭工作区并应用，Toast `Chapter markers saved and applied to your episode.`；**Close** 直接返回、不保存。

#### More Options 区块

| 字段 | 类型 | 说明 |
|---|---|---|
| **Season NO.** | 文本输入 | 季数，placeholder `e.g. 1`（与 Episode NO. 同一行） |
| **Episode NO.** | 文本输入 | 集数，placeholder `e.g. 12` |
| **Episode Type** | 下拉 | Full / Trailer / Bonus |
| **Content Explicit** | 下拉 | Clean / Explicit |
| **Author** | 文本输入 | 作者名 |
| **Duration** | 文本输入 | 时长，placeholder `e.g. 00:32:15` |
| **Alternative Episode Link** | 文本输入 | 自定义 RSS 链接；placeholder `Leave this field blank to use the default Podbean episode URL.`；提示：设置后该 URL 将用于 RSS feed 的 `<link>` 标签，替代默认 Podbean 剧集页 |
| **Episode Tags** | 标签选择器 | 搜索/创建标签，与工具栏 Tags 选择器交互一致（已选 chip、下拉多选、Enter 添加、Backspace 移除、`+ Create "xxx"`） |

#### AI 生成流程（Transcripts / Chapter Markers 共用）

两张入口卡片空状态下的 **Generate with Podbean AI** 走同一条流程，**一次生成同时产出转写文本与章节标记**，不需要分别触发：

1. **点击按钮** → 打开扣费确认弹窗 `Generate with AI Content Assistant`，说明两点：一次生成同时产出 Transcripts 与 Chapter Markers；单价 **5 credits/分钟**（300 credits/hour）。弹窗底部另有一行提示：积分在生成开始时扣除，过程可能需几分钟、期间可继续其他操作。**不展示**本集时长与预计扣费总额。Cancel / Confirm。
2. **Confirm** → 两张卡片同时进入「生成中」状态（转圈 + 状态文案），并弹出一条信息 Toast。
3. **约 5 秒后自动应用**：转写文本与章节标记写入当前剧集，两张卡片切回「已有内容」，并弹出成功 Toast `AI Content Assistant is done. Transcripts and chapter markers have been applied to your episode.`。**生成完成即已应用到剧集，无需用户再点 Publish。**
4. 生成期间关掉再打开该弹窗，两张卡片仍显示「生成中」。

> 按钮文案与弹窗/状态文案有意不一致（2026-09-29 用户指定「只改 2 个按钮」）：入口卡片上的两个按钮写 **Generate with Podbean AI**，确认弹窗、生成中状态文案、两条 Toast 仍写 **AI Content Assistant**。不要"顺手统一"。

---

## 8. AI Settings 弹窗

两个独立的模态弹窗，均由 New Episode 弹窗中的 Settings 链接触发。

### 8.1 AI Audio Optimization Settings

标题：`AI Audio Optimization`，右上角 `×` 关闭。

| 控件 | 说明 |
|---|---|
| **Denoising Method（下拉）** | 降噪方式：`Static`（仅移除恒定噪声）/ `Dynamic`（保留人声和音乐，移除其他，默认）/ `Speech Isolation`（保留人声，移除其他） |
| Denoising Method 解释 | 说明 AI 应只移除静态噪声还是也包括快速变化噪声，以及是否保留/消除音乐 |
| **Cut Silence（开关）** | 移除静音段落；解释：检测并移除录音中的静音片段（可能由停顿、呼吸、设备调整导致），视频文件除外 |
| **Cut Fillers（开关）** | 移除口头填充词；解释：检测并移除 "um"、"uh"、"mh"、德语 "ähm"、法语 "euh"、西班牙语 "eh" 等填充词，视频文件除外 |
| 底部说明 | 提示：`The changes you made will be applied when you publish new episodes using AI Audio Optimization.` |
| **Save 按钮** | 保存并关闭 |

### 8.2 AI Content Assistant Settings

标题：`AI Content Assistant`，右上角 `×` 关闭。

| 控件 | 说明 |
|---|---|
| **Description Style（下拉）** | 描述风格：`Standard`（简洁清晰的剧集描述，默认）/ `Informative`（概述主题、嘉宾和要点）/ `Conversational`（随意友好的语气）/ `Storytelling`（叙事风格吸引听众） |
| **Description Length（下拉）** | 描述长度：`Brief`（简洁，突出要点，默认）/ `Comprehensive`（详细，覆盖各方面） |
| **Transcript Speaker Diarization（开关）** | 说话人分离；解释：自动为说话人添加标识（如 Speaker 1），并允许在剧集转写编辑框中修改这些名称以实现个性化 |
| 底部说明 | 提示：`The changes you made will be applied when you publish new episodes using AI Content Assistant.` |
| **Save 按钮** | 保存并关闭 |

---

## 9. 其他弹窗

### 9.1 Schedule Publish（定时发布）

模态弹窗：

- 标题：`Schedule Publish`；说明：`Choose the date and time to publish this episode.`
- **Current time 参考行**：位于 **Cancel / Schedule 按钮下方**（弹窗底部，以细分隔线隔开），显示 `Current time: …`（如 `Current time: Aug 14, 2026 9:41 PM EDT`），实时显示当前时间（每秒更新，仅弹窗打开时刷新）；时区由 **Settings → Podcast Info → Author & Region → Timezone** 控制。
- **Date**（日期输入框）、**Time**（时间输入框）：打开时预填**当前排定值**（编辑 Future 剧集时，从该剧集的 schedule 数据读取）；否则预填**当前时间**。
- 按钮：Cancel / **Schedule**。
- 未填日期或时间时 Toast 报错 `Please select date and time.`；成功则 Toast 显示 `Episode scheduled for <date> <time>`。

### 9.2 Unsaved Changes（未保存修改确认）

当从 Publish Episode 弹窗点击 Cancel/返回且存在未保存修改时弹出：

- 标题：`Unsaved Changes`；说明：`You have unsaved changes. Are you sure you want to leave?`
- 按钮：**Leave**（离开，回到 New Episode 弹窗）/ **Stay**（留在当前页）。

### 9.3 Share Episode（分享/嵌入弹窗）

弹窗顶部展示剧集 Logo、标题、状态徽章和日期。内部含两个 Tab：

#### Share 选项卡

**① 链接区（URL）**

- 三种 URL 类型切换按钮：`Episode URL` / `Download URL` / `Share URL`，基于剧集标题生成的 slug 拼接：
  - Episode：`https://podcastingsmarter.podbean.com/e/<slug>`
  - Share：`https://podcastingsmarter.podbean.com/share/<slug>`
  - Download：`https://podcastingsmarter.podbean.com/media/<slug>/download`
- 只读输入框 + 复制按钮（点击后短暂显示复制成功反馈）。

**② Share to（社交分享）**

- Facebook / X (Twitter) / LinkedIn / Email 四个社交按钮。
- 点击打开对应平台的模拟分享窗口，确认后通过真实分享 URL 新窗口打开（Facebook、Twitter、LinkedIn）或唤起邮件（Email）。

**③ Auto-share Status（自动分享状态）**

- 说明：自动分享未启用，新剧集不会自动发布到已关联社交账号，附 `click to enable` 链接（跳转 Distribution → Social Share 页面）。

#### Embed Player 选项卡

- **播放器风格**：`Classic` / `Stylish`，切换时更新播放器预览图和嵌入代码。
- **Copy Embed Code** 按钮：复制 iframe 嵌入代码。
- **Show/Hide embed code**：展开/收起代码框。Classic 与 Stylish 各有独立代码框。
- **Customizations**（可折叠）：
  - **Player color / Button color**：预设色板，选中后更新色值显示。
  - **Font color**：Auto / White / Black。
  - **Font**：Arial / Helvetica / Georgia / Times New Roman / Verdana。
  - **Share / Download**：Show / Hide。
  - **Logo link**：Episode page / Podcast page / None。
  - **Right-to-left text**：No / Yes。
  - Stylish 额外有 **Height**：300px / 400px / 500px。
- 底部链接：获取多集嵌入播放器请前往 `Distribution → Embed Player` 页面。

---

## 10. Toast 通知

自动消失的全局通知，支持 success / info / error 三种类型（带不同图标）。

常见触发场景：

| 场景 | 文案 |
|---|---|
| 发布成功 | `Episode published successfully!` |
| 更新成功 | `Episode updated successfully!` |
| 保存草稿 | `Episode saved as draft!` |
| 定时成功 | `Episode scheduled for <日期> <时间>` |
| 表单校验失败 | `Please select date and time.` |
| 批量设置季数 | `Set N episode(s) to Season X` |
| 批量清除季数 | `Removed all seasons from N episode(s).` |
| 批量设置标签 | `Tagged N episode(s) with: <标签列表>` |
| 批量清除标签 | `Cleared all tags from N episode(s).` |
| 批量删除 | `Deleted N episode(s).` |
| 批量校验失败 | `No episodes selected.`（Set Season 季数校验、Set Tags 未选标签校验均为弹窗内**内联错误**，不用 Toast） |

---

## 11. 数据与交互逻辑说明

### 11.1 数据源

- 剧集数据为前端硬编码数组 `episodes`（26 条模拟数据），字段：`title`、`status`、`when`、`dl`（下载量）、`tags`、`season`、`type`、`created`（创建时间，YYYY-MM-DD，用于 Free plan 删除倒计时与风险摘要计算）。
- 可用标签列表：`interview, solo, monetization, audio, video, tutorial, news, story, music, review`（运行时可新增）。

### 11.2 状态与数据流

- **状态切换**：Publish Episode 弹窗**标题始终为 Publish Episode**；右上角主按钮文案根据剧集当前 status 切换（新建剧集 / Published / Draft / AI Finished / AI Failed → Publish Now 或 Update；Future → Schedule Publish；**AI Processing** 不可编辑，不进入弹窗）。新建剧集与 Draft / AI Finished / AI Failed 均默认 Publish Now（即时发布），Future 默认 Schedule Publish。
- **发布联动**：发布成功后自动打开 Share Episode 弹窗，方便立即分享或复制嵌入代码。
- **Free plan 删除倒计时**：`daysUntilDeletion()` 按 `created + 90 天 − 当前日期` 计算剩余天数；剩余 ≤ 14 天视为"即将删除"（标题后倒计时用暖橙色，并计入顶部风险摘要，见 5.2）。
- **布局版本**：当前只使用 V2 布局，旧版侧边栏布局（V1）已移除。V2 为左侧竖向锚点菜单 + 四个区块同页堆叠（不再是选项卡切换显隐）。

---

## 附：快速操作路径

| 目标操作 | 操作路径 |
|---|---|
| 新建剧集并上传音频 | 工具栏 **New Episode** → 上传/拖拽文件 → 填写标题与描述 → Publish Episode |
| 编辑已有剧集 | 列表点击行 / 悬停 Edit → 修改各区块内容 → Update |
| 批量设置季数/标签 | 勾选多行 → **Actions** → Set Season / Set Tags（标签相关入口需已安装 Tags app） |
| 分享单集 | 悬停行 **Share & Embed** → Share / Embed Player |
| 设置 AI 参数 | New Episode → AI Enhance 区 → 对应 **Settings** 链接 |
| 查看 Free plan 剧集删除倒计时 | 侧边栏 **Episodes 3** → 顶部风险摘要 / 标题后倒计时 |
