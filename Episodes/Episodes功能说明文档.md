# Episodes 菜单功能说明文档

> 适用范围：`index.html`（Podbean Admin — Episodes）
> 文档版本：v2.104
> 说明：本文档为**功能 mockup**，逐页、逐控件描述 Episodes 菜单下的功能与交互逻辑。UI 文案保留英文原样。具体视觉样式由设计师另行确定，不在本文档范围内。

---

## 目录

1. [页面整体结构](#1-页面整体结构)
2. [Episodes 0 页面（空状态）](#2-episodes-0-页面空状态)
3. [Episodes 列表页面](#3-episodes-列表页面)
4. [Episodes (apple) 页面](#4-episodes-apple-页面apple-podcast-subscription-演示)
5. [Episodes (free plan) 页面（Free plan 自动删除演示）](#5-episodes-free-plan-页面free-plan-自动删除演示)
6. [New Episode 弹窗（Upload media file）](#6-new-episode-弹窗upload-media-file)
7. [Publish Episode 弹窗](#7-publish-episode-弹窗)
8. [AI Settings 弹窗](#8-ai-settings-弹窗)
9. [其他弹窗与独立页面](#9-其他弹窗与独立页面)
10. [Toast 通知](#10-toast-通知)
11. [数据与交互逻辑说明](#11-数据与交互逻辑说明)

---

## 1. 页面整体结构

**Episodes 0**、**Episodes**、**Episodes (apple)**、**Episodes (free plan)** 均为侧边栏一级菜单项（无子菜单）：

- **Episodes 0** — 空状态演示页面：展示用户**尚未创建/发布任何剧集**时的状态
- **Episodes** — 用户**已创建或发布剧集**后看到的完整 **Episodes 列表**页面
- **Episodes (apple)** — 演示页面，模拟用户开通 **Apple Podcast Subscription** 之后剧集列表多出一列 **Type** 的展示效果
- **Episodes (free plan)** — 演示页面，模拟 **Free plan** 用户的剧集列表：只显示 **Published / Draft** 状态的剧集，并在页面顶部提示 **Free 计划下剧集在创建 90 天后会被自动删除**、每集标题后内联显示删除倒计时（详见第 5 节）

同一 Episodes 页面在真实产品中根据用户是否有剧集数据，在"空状态"与"列表页"两种形态间切换；**Episodes 0** 与两个演示页（**Episodes (apple)** / **Episodes (free plan)**）均为演示这些形态/扩展形态的独立入口。

> **2026-10-09（v2.82）：两个演示页的**侧栏菜单名**由编号改成说明性名称** —— **`Episodes 2` → `Episodes (apple)`**、**`Episodes 3` → `Episodes (free plan)`**（用户要求）。改的是**侧栏那一行可见文字**；**页面 id 仍是 `episodelist2` / `episodelist3`**，`data-page`、路由、以及 `index.html` 里若干注释中写的「Episodes 2 / Episodes 3」都指的是这两页、**未动**（导航靠 `data-page` 切换，不依赖标签文字，所以改名不影响跳转与高亮）。命名风格与 `Episodes 0`（空状态演示）一脉相承——**用括号点出这个演示页演示的是什么**。

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

点击 Filter 按钮弹出筛选面板。筛选器按类别分为 5 个子面板，通过左侧导航切换：

| 子面板 | 筛选内容 | 选项 |
|---|---|---|
| **Status（状态）** | 剧集发布状态 | All Statuses（全选）、Published、Draft、Future、AI Processing、AI Finished、AI Failed |
| **Media Type（媒体类型）** | 音频/视频 | Audio、Video |
| **Season（季数）** | 所属季 | All Seasons + 用户已创建的 Seasons（数量根据用户创建的 seasons 动态生成，如 Season 1、Season 2……） |
| **Published（发布日期）** | 日期范围 | From / To 两个日期输入框 |
| **User（用户）** | 发布者 | All Users + 该播客下的用户（如 Creator E、Podcast Team）。**2026-10-09 v2.98 新增** —— 替代了原来表格里的 **User 列**（见 3.1 列说明） |

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
| When | 发布时间 / 状态（2026-10-09 v2.97 起 **Status 列已并入本列**；**表头可点击排序**，见下方说明） |
| Total Downloads | 累计下载量。**数字是链接**（2026-10-09 v2.102）：平时是普通文字，整行悬停时变主色 + 下划线，**点击跳 Statistics → Episodes**（列头 2026-10-09 v2.104 由 **Downloads (All time)** 改名） |
| （无表头） | 行操作列，表格最右侧，放 **「3个点」** 按钮（见下方「行操作菜单」，2026-09-30 新增） |

- **When / Total Downloads** 两列的值保持**单行不换行**，列宽按内容保证；仅 **Title** 列允许换行完整显示。

**状态值：** Published、Draft、Future、AI Processing、AI Finished、AI Failed。

**When 列（原 Status + When 合并，2026-10-09 v2.97）：**

- **Published** → 只显示发布时间（如 `Dec 16, 2025`）。日期本身就说明「已上线」，不再另挂一个 Published 徽标。
- **Future** → **色点 + `Future` + `· 排定时间`**（如 `● Future · Jun 26, 2026`）—— 光有日期分不出「还没到」还是「已经发过」。
- **Draft / AI Processing / AI Finished / AI Failed** → **色点 + 状态词**，不显示日期（它们还没有「发布时间」，数据里的 `when` 只是占位；Share 页对未发布也一律显示 `--/--/----`）。
- **形状 =「小色点 + 文字」（2026-10-09 v2.100 定稿）**：整列统一成一行文字，颜色交给色点。此前是**药丸**，而"乱"的主因正是**一列里混着三种形状**（纯文字 / 药丸+文字 / 只有药丸）、且药丸宽度参差。v2.99 试过"等宽药丸 + 颜色收敛到两种"，**当天即被这一版取代**：色点把色块由"面"缩成"点"，音量低到**可以把五种颜色全留下** —— 比收敛版信息更全、观感更安静，而且**不再需要 `min-width`**（v2.99 那 30px 的宽度代价随之消失）。五种色点：Draft `#64748b` / Future `#3b82f6` / AI Processing `#b45309` / AI Finished `#1d4ed8` / AI Failed `#b91c1c`。
- **实现**：色点**不写死颜色** —— 它套的还是 `.badge-*` 那套类，靠 `.ep-when-dot` 的 `background:currentColor` 取该状态自己的**文字色**（墨色），所以颜色仍只有一处定义；**`.ep-when-dot` 必须排在 `.badge-*` 之后**，否则会被它们的浅底盖掉。
- **表头可排序（2026-10-09 v2.103）**：`When` 表头是一颗 `<button>`（不是给 `th` 挂 onclick，这样键盘可达、读屏能念），**标签右侧跟一对小三角** —— 未排序时两个都淡显（提示"这列能排"），排过之后只留对应那一个、标签与箭头一起加深（顺带标出"现在按这列排"）。点一下 = **升序（早→晚）**，再点 = **降序**（**两态**切换，没有"回到默认顺序"的第三态）。三个列表页共用**同一个**排序状态；**排序只改渲染顺序** —— 行上动作仍按剧集在数据里的**原始下标**走，所以排完序点某行打开的仍是那一集（这是最容易写错的地方）。重排会重建整行，于是**顺带清空勾选**（与 Apply 筛选同一套处理）；Episodes (free plan) 页那条固定在最前的 demo 行**不参与**排序。
- **表头仍叫 When**（已知代价，用户明确选择保持）：合并后这一列里会出现 `AI Failed` 之类的状态词，表头与内容不再严格对应。

**行交互：**

- 整行可点击 → 打开 **Publish Episode** 弹窗（**标题始终为 Publish Episode**，不随状态变化），右上角主按钮文案随剧集状态变化：
  - **Published** → 主按钮 **Update**
  - **Draft / AI Finished / AI Failed** → 主按钮 **Publish Now**
  - **Future** → 主按钮 **Schedule Publish**（打开弹窗后即进入定时发布模式，可直接调度）；**主按钮左侧同一行显示当前排定时间**（见 7.1）
  - **AI Processing** → 整行**不可点击**；hover 或点击时显示提示 tooltip：`You cannot edit or delete the episode while it is undergoing AI processing. Please try again after the processing is complete.`。该行的多选复选框**禁用**（置灰不可勾选、无法参与批量操作），最右列的 **「3个点」** 按钮**不显示**。

**行操作菜单（表格最右列的「3个点」）：**

三个行内操作（**Edit Details** / **View Episode Page** / **Share & Embed**）原先挂在标题右侧、悬停才浮现，2026-09-30 起统一收进表格**最右列**的 **「3个点」** 下拉菜单：

- 每行最右列有一个 30×30 的圆形按钮，图标为竖向三点；平时浅灰，行悬停或菜单展开时加深。点击展开下拉菜单，**同一时刻只允许一个菜单展开**。
- 菜单项为 **图标 + 文字**，三项自上而下：
  - **Edit Details**（编辑详情，2026-10-09 v2.85 由 `Edit` 改名）→ 打开编辑弹窗
  - **View Episode Page**（查看剧集页，同日由 `View` 改名）→ 新窗口打开剧集网页
  - **Share & Embed**（分享/嵌入）→ 进入 **Share & Embed 页面**（见 9.3）
- 菜单向上/向下展开：默认向下，若下方空间不足（贴着视口底部）则翻转到按钮**上方**。
- 关闭方式：点菜单以外的任意位置、按 **Esc**、页面或表格滚动、或选中任一菜单项。
- 点击「3个点」与菜单项都**不会**冒泡触发行点击，因此不会误打开编辑弹窗；选中菜单项会先收起菜单再执行动作。
- 菜单项**不切换页面**，仅触发上述三个动作。
- **AI Processing 行的「3个点」不显示**（该行整体不可编辑，与复选框禁用一致）。
- **按钮的可见度（2026-10-09 v2.101）**：常态就看得见 —— 常态色 `#64748b`（对比度 4.76:1）、图标 18px（每颗点直径 3.30px）；**行悬停**时再加深一档（`--text`）并给它白底 + 描边，**按钮自身悬停 / 菜单已展开**时底色与描边再重一点。此前常态是 `#94a3b8`（2.56:1）、图标 16px（点 2.27px），几乎看不见。
- **它与 Downloads 列之间留出间距（2026-10-09 v2.102）**：操作列的左内边距 4 → 12px、列宽 52 → 58px，于是「数字 ↔ 3个点」由 **16px 加到 24px**。理由不是审美：**两边都是可点的东西**（Downloads 的数字是链接，见上表；3个点开菜单），16px 之间挤着两个可点目标容易点错。右侧内边距 16px 不动 —— 右侧只有表格边缘，没有可点对象。

> **2026-10-09（v2.85）：行操作菜单两项改名。** 用户：「episode 列表页面 3个点里面的 **Edit 改为 Edit Details**，**View 改为 View Episode Page**」。改的是 `rowMenuCell()` 里那两行的文字（图标 `MENU_ICONS.edit` / `MENU_ICONS.view` 与接线 `editEpisode()` / `viewEpisode()` **都没动**），所以**三处列表页（Episodes / Episodes (apple) / Episodes (free plan)）同时生效**——它们共用同一个 `rowMenuCell()`。**注意区别**：Transripts / Chapter Markers 工作区里那两颗 `Edit` 按钮**不是**行菜单项，**没有改**（仍是 `Edit`）。
- 标题列不再有任何操作图标；标题的悬停下划线（点击行的暗示）保留。

**多选逻辑：**

- 勾选任意行后，表格顶部出现替换表头（选中条）：显示全选复选框 + 选中数量（`N selected`），**Actions** 按钮紧随 `N selected` 之后，选中条最右侧为 **Clear selection** 链接（详见 3.2 ③）。
- 表头全选复选框支持全选/全不选及半选状态（indeterminate）。

### 3.4 分页

- 底部显示 `Showing 1 to 20 of 26 entries` 及页码按钮（1 / 2），当前页为激活态。

---

## 4. Episodes (apple) 页面（Apple Podcast Subscription 演示）

**背景**：此页面为演示页，模拟用户开通 **Apple Podcast Subscription** 之后 Episodes 列表的展示效果。开通后，剧集列表会多出一列 **Type**，用于标识每集的订阅类型。

与 Episodes 列表页面结构基本一致，区别在于：

- 表格多一列 **Type**，列顺序为：复选框 → Title → Type → When → Downloads → 行操作（「3个点」，无表头）。
- Type 值为每行剧集数据的订阅类型字段：Apple 的四种订阅类型（`Ad-free`、`Subscriber-only`、`Early access`、`Archive access`）照原样显示；**非 Apple 订阅剧集显示为 Public**（2026-10-09 v2.95 —— 数据里存的仍是 `Free`，只有列表这一格的显示文案换成 Public）。
- Type 徽标按「是不是 Apple 订阅类型」分两种颜色（2026-10-09 v2.96）：Apple 的四种类型用**紫色徽标**（`.badge-type.is-apple`），**Public 保持中性灰**。这样扫列表时先按「Public / Apple」分成两类，定睛看才是具体类型 —— 具体类型**始终显示**，不做 hover 提示（hover 在表格里一次只能看一行，而且截图里看不到）。紫色是刻意的：六个 Status 徽标已占掉绿/灰/蓝/琥珀/红，紫色与它们都不撞。
- 状态为 **AI Processing**、**AI Finished** 或 **AI Failed** 的剧集，其数据的 **type 字段即为 Free**（列表 Type 列显示 **Public**；编辑弹窗里对应的**勾选行不勾选**）。
- 在此页面点击行编辑或新建剧集时，Publish Episode 弹窗的 **Basic Info** 区块在最上方（**Media File 上方**）多显示一行 **Apple Podcast Subscription** 勾选框；**勾选后**才展开订阅相关设置（Episode will be 下拉 + 解释文字 + 按需的日期时间，选 **Ad-free** 时再加一个 **File for Subscriber** 上传字段——都在这同一块里）；编辑时按该行 Type 回填（Type 为 Free / 无值的剧集**不勾**），新建默认不勾（等于 Free）。详见 7.2。

工具栏、筛选弹窗、Actions 弹窗（含 Delete，位于表格选中条）、分页等与 Episodes 列表相同；其中 **Set Tags / Remove All Tags** 入口同样仅对**已安装 Tags app** 的用户显示。

---

## 5. Episodes (free plan) 页面（Free plan 自动删除演示）

**背景**：此页面为演示页，模拟 **Free plan** 用户的 Episodes 列表。Free 计划下，**剧集在创建 90 天后会被自动删除**。列表**只显示 status 为 Published / Draft 的剧集**（其余列与 Episodes 列表页一致，无 Type 列，见 3.3）。

### 5.1 页面头部

- **Free plan 提示条（位于标题上方）**：横幅，位于页面标题 **Episodes** 上方，由三部分组成：
  - **提示文案**：`Free plan — episodes are automatically deleted 90 days after creation.`
  - **Upgrade to keep them →** 按钮：点击打开升级提示弹窗（见 5.3）。
  - **删除风险摘要行**（横幅内、提示文案下方）：当存在即将被删除的剧集时显示，统计所有 Published / Draft 剧集中**剩余删除天数 ≤ 14 天**的数量，文案如 `2 episodes will be deleted within 14 days.`（单复数自适应）；无此类剧集时整行隐藏。

### 5.2 表格与删除倒计时

列结构与 Episodes 列表页一致：复选框 → Title → When → Total Downloads → 行操作（「3个点」，无表头）；仅渲染 **Published / Draft** 状态的剧集。

**Title 列 —— 删除倒计时内联展示：**

- 每集标题后**内联**显示删除倒计时小字（时钟图标 + 文案），不单独占用一列：
  - `Will be deleted in N days.`（剩余 N 天）
  - `Will be deleted in 1 day.`（剩余 1 天）
  - `Will be deleted today.`（剩余 0 天）
- 倒计时 = 该剧集 **创建时间（created，YYYY-MM-DD）+ 90 天 − 当前日期**。
- 剧集创建满 90 天（到期）后会被**自动删除**，不再出现在列表中。
- **剩余天数 ≤ 14 天**的剧集，倒计时文字用**暖橙色**（urgent）突出；其余为低调的灰色，避免列表整体过于醒目。
- 倒计时**始终显示**，悬停不再隐藏它（原先悬停是为了给标题右侧的 3 个操作图标腾位置，图标已搬去最右列的「3个点」菜单，见 3.3）。
- 行操作同样走最右列的 **「3个点」** 菜单（**Edit Details / View Episode Page / Share & Embed**），与 Episodes 列表页一致（见 3.3）。
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
  - **演示页按页面区分 plan**：打开 New Episode 弹窗时，按当前所在页面自动设置 `currentPlan` —— **Episodes 页 = Free**，**Episodes (apple) 页 = Unlimited Audio**（`index.html` 中 `openNewEpisodeModal()` 顶部按 `currentPage` 设置）。
  - **Free / Unlimited Audio** plan 时，格式提示下方额外显示视频升级提醒：`Video podcasting (MP4, M4V, MPG) is available on Unlimited Plus and above.` + **Upgrade** 链接（点击弹出升级提示框）；Unlimited Plus 及以上不显示。
- 上传当前 plan 不支持的格式时：
  - 若该格式为**更高 plan** 支持 → 弹出 **Upgrade Required** 提示框（说明需升级到的套餐），不继续流程（停留在上传弹窗）。
  - 若任何 plan 都不支持 → 弹出 **Unsupported Format** 提示框。
- 文件选择后（当前 plan 支持时）**分两种情况**（2026-10-09 v2.84 起）：
  - **AI Enhance 里两个开关都关着** → 系统先判断剩余积分是否足以用 AI 处理本集（不足时在 AI Enhance 面板显示警告），随后打开 **Publish Episode 弹窗**（见第 7 节），并将所选文件带入其 **Media File** 字段。
  - **任一开关开着** → **不在这一页弹 Publish 表单**，而是弹 **Podbean AI 处理弹框**（见下），并把上传的文件名显示在里面；不再进入 Publish Episode 弹窗（AI 会替你写剧集，没必要再让你填一遍）。
- **Or use a remote file**（仅当系统后台为该用户开放此选项时显示；该功能以产品文档为准，演示页 `remoteFileEnabled` 默认 `false`，即演示页默认不显示）：
  - 位于上传区域下方，包含 URL 输入框（placeholder `https://example.com/audio.mp3`）与 **Submit** 按钮（或按 Enter 提交）。
  - 提交后跳过上传，直接打开 Publish Episode 弹窗，其 **Media File** 显示为该 URL；每次打开弹窗时清空上次输入的 URL。**同样受 AI 开关影响**（2026-10-09 v2.84）：开了 AI 时改为弹 Podbean AI 处理弹框、URL 作为「文件名」显示。
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


#### Podbean AI 处理弹框（2026-10-09 v2.84）

- **什么时候出现**：在上传页 **AI Enhance 里任一开关处于开启状态**时，选择文件（或提交远程 URL）之后立即弹出，**取代**原本进入 Publish Episode 表单的流程。
- **长什么样**：深色遮罩上的一块白色面板（上限 840px），内容自上而下：
  - 标题 **Podbean AI**。
  - **两步 stepper**（两步的圆点之间有细连接线）：
    1. 黑色圆点 + 勾 → **File Uploaded**：下面是被上传的**文件名**（原样显示，含扩展名），再下面一条**黑色进度条**与右对齐的**百分比**（打开时从 0% 走到 100%）。
    2. 黑色圆点 + 数字 **2** → **AI Processing...**：说明段 `The AI is working on it! It might take a few minutes or more, depending on your file size. You'll get an email notification when it's done. You can also check the AI status on the episode list page.`
  - 底部一颗居中黑色胶囊按钮 **Check AI Status on the Episode List Page**。
- **按钮行为**：关闭弹框与上传页 → **补一条状态为 `AI Processing` 的剧集**（标题取上传的文件名）→ 回到进入前的那个列表页，于是列表里能立刻看到它（与已有的 AI Processing 示例行一致：不可点、不可编辑）。
- **注意**：这个弹框**没有取消/关闭**入口（与设计稿一致，唯一动作就是去列表）。

> **2026-10-09（v2.84）：上传页开了 AI 时，上传后弹「Podbean AI」处理弹框。** 用户给了设计稿截图并要求：「如果用户在 Upload media file 页面 enable 了 AI 功能，那么上传 file 后，则在 Upload media file 页面显示 AI Processing 弹框，类似截图内容」。动手前确认三件事（都按建议定）：**任一开关开着就算**、**取代跳转**（不进 Publish 表单）、**按钮去列表并补一条 `AI Processing` 记录**。
>
> **为什么要问「取代还是并列」**：这一页原本的流程是「选完文件 → 直接进 Publish Episode 表单」（`startNewEpisodeWithFile()` → `openNewEpisodeDetails()`），而设计稿里这个弹框**只有一颗去列表的按钮**、没有任何回表单的入口。两侧对不上，只能二选一；用户选了「取代」。
>
> **实现**：新增 `isAIEnabledOnUpload()`（判 `#toggleAudioOpt` / `#toggleContentAsst` 任一含 `on` 类）→ `startNewEpisodeWithFile()` 与 `submitRemoteFile()` 在打开表单之前先判一次，命中就 `openAiProcessingModal(fileName)` 并 return。**拖拽入口**（`handleDrop()`）本来就走 `startNewEpisodeWithFile()`，所以自动生效。新增 `openAiProcessingModal()`（填文件名 + 让进度条 0→100 走一遍，定时器到 100% 或关闭时清掉）、`closeAiProcessingModal()`、`createAiProcessingEpisode()`（补一条 `status:'AI Processing'` 的剧集、`buildRows()` 重渲列表）、`goToEpisodeListFromAi()`（关两个弹框 → 补记录 → 回列表）。
>
> **顺手做的一处小整理**：把「回到进来的那个列表」的判断抽成 **`currentListPage()`** —— v2.83 为 Publish 流程写过一次，这次 AI 流程也要用同一套（含「若在 Share 页则再退一层」），所以抽成函数、两处共用，避免同一逻辑写两遍。
>
> **没有做的事**：这个弹框**没有 Cancel**（设计稿里没有，且它是「处理中」而非「待确认」）；上传页那两个 AI 开关本身、积分判定、`setMediaFileState()` 都未动。文首版本号 → **v2.84**。

## 7. Publish Episode 弹窗

全屏弹窗，标题始终为 **Publish Episode**，用于新建或编辑剧集（右上角主按钮文案随剧集状态变化，见 7.1）。


### 7.1 顶栏

**布局**：左侧为 **Cancel** + **Save as Draft**（两者之间以细分隔线隔开）；中间为标题（居中）；右侧为排定时间行（仅 Future 剧集显示）+ **Publish 主按钮**（时间行位于主按钮左侧、同一行）。

| 控件 | 说明 |
|---|---|
| **Cancel** | 有未保存修改时弹出 "Unsaved Changes" 确认框；否则直接关闭 |
| **Save as Draft** | 保存草稿、关闭弹窗并**回到进入前的那个列表页**（Toast 提示 "Episode saved successfully!"） |
| **标题** | Publish Episode（固定不变） |
| **排定时间行** | 仅 Future 剧集显示：`Scheduled for Jun 26, 2026 2:00 PM`（纯展示，无 Change 链接），位于主按钮左侧同一行（详见下方规则） |
| **Publish 按钮** | 主按钮，文案随状态变化：Publish Now / Update / Schedule Publish |
| **下拉箭头** | 展开下拉菜单，可切换 **Schedule Publish**（定时发布） |

规则：

- **必填内容没填时，Publish 按钮仍是黑的、也点得动（2026-10-09 v2.88；v2.87 曾做成「灰底禁用外观 + 错误 Toast」，已被本版推翻）**。理由：变灰只会让人看不出缺什么、还以为页面坏了；而**用 `disabled` 属性连点击事件都不派发**，做不出「点一下就知道缺什么」。所以改成**点了就地报错**：
  - **缺的字段就地标红**：标题缺 → 输入框红色描边 + 下面一行 `Add a title to publish this episode.`（复用站内 `.field-error` 样式）；文件缺 → **Media File 那一行**变红（右侧同时是 `Upload` 链接，可再选一个文件）。⚠️ 这一行必须**按 id**（`#v2MediaFileRow`）取 —— 页面上有**两个** `.ed-v2-file-row`（另一个是仅 Ad-free 时显示的 File for Subscriber，且排在它**前面**），按类取会命中那个隐藏的行，红框就加在看不见的地方（详见 v2.89 注记）。
  - **滚动到第一个出错的位置并聚焦** —— 「第一个」按**页面上从上到下**的位置算（2026-10-09 v2.90）：两处都缺时报**更靠上**的那个，当前即 **Media File**（它在 Basic Info 里排在 Title **上方**）。顺序是**用 DOM 位置判断**的（`compareDocumentPosition`），不是写死「先文件后标题」，所以以后表单把这两个字段调个个儿，这里会自动跟着变。
  - **不弹 Toast**（同日要求去掉）—— 提示就落在出问题的控件上，不另开一处告诉用户。
  - 缺的那一项补上后，红框与那行小字**立刻撤掉**（不用等下次点发布）；打开弹窗（编辑 / 新建）时会先清一次，免得带上次的红框进来。
- **新建剧集**（New Episode → Upload later）打开弹窗时**默认即为 Publish Now（即时发布模式）**，下拉项为 Schedule Publish；可切换为定时发布。
- 点击 "Schedule Publish" 后按钮文案切换为 "Schedule Publish"，再次点击主按钮会打开 Schedule Publish 弹窗（见 9.1）。
- **Future** 状态的剧集打开弹窗时**默认即为 Schedule Publish**（主按钮直接显示 Schedule Publish，下拉项变为 Publish Now，可切回即时发布）。
- **排定时间展示与修改**：Future 剧集打开弹窗时，**主按钮左侧同一行显示当前排定时间**（如 `Scheduled for Jun 26, 2026 2:00 PM`，纯展示、无 Change 链接）；修改排定时间通过点击主按钮 **Schedule Publish** 打开 Schedule Publish 弹窗（Date/Time 预填当前排定值），确认修改后该时间行即时更新。
- **三个动作完成后的去向（2026-10-09 v2.83 统一）**：
  - **Publish Now** → Toast `Episode published successfully!`（更新已发布剧集时是 `Episode updated successfully!`），并**跳转到 Share & Embed 页面**（见 9.3）。**新建剧集也跳** —— 以前只在编辑已有剧集时才跳（`shareEpisode()` 按 `episodes[index]` 渲染，新建的还没有列表数据）；现在会先按表单填的内容**补一条剧集数据**再跳，所以发布后它也会正常出现在列表里。
  - **Save as Draft** → Toast `Episode saved successfully!`（原 `Episode saved as draft!`），并**回到进入前的那个列表页**。
  - **Schedule**（预约发布）→ Toast `Episode scheduled successfully!`（原 `Episode scheduled for <日期> <时间>`），并**回到进入前的那个列表页**。
  - **「进入前的那个列表页」**在打开弹窗时记下（`publishReturnPage`）：从 Episodes / Episodes (apple) / Episodes (free plan) 哪个列表进来就回哪个；若弹窗是在 **Share & Embed 页**上打开的，则再往回退一层到它记着的那个列表（与 Share 页的 `shareReturnPage` 同一套做法）。

> **2026-10-09（v2.104）：列头 **Downloads (All time)** 改名 `Total Downloads`。** 用户问「**Downloads (All time)** 改为 **All Time Downloads** 合理么」。判断：方向（去掉括号限定）可以理解，但**按他写的样子不合理** —— ① **缺连字符**：all-time 在这里是**定语形容词**（all-time high / all-time record 就是这个用法），放名词前必须连起来，否则 **All Time Downloads** 会变成三个并排的名词；② 它把限定词挪到最前，**列头的第一个词不再是名词**，破坏表头的扫读节奏；而且**房规本来就是「名词 + 括号限定」** —— 全站另一个带括号限定的可见文案是章节工作区里的 `Start Time (mm:ss)`。于是给了三条路（保留原样 / **All-Time Downloads** / **Total Downloads**），用户选 **`Total Downloads`**。
> **口径说明（已向用户点明）**：`Total` 与 all time 严格说不是一个意思 —— 前者是**合计**、后者是**统计范围（建站以来）**；本页这列本来就是「这一集自建站以来的总下载」，所以 `Total Downloads` 是**简化说法**、不是精确改写。用户确认采用。
> 落地：三个列表页的表头各改一处（`<th class="ep-dl-head">Total Downloads</th>`）；**类名 `ep-dl-head` / `ep-dl-cell` 不动**（从 downloads 派生，与文案无关）；v2.99 给它加的 `white-space:nowrap` 照旧 —— 新文案比原来短约 10%，正好少占一点 Title 的宽度。
> **校验**：html 里 all time 的残留已为 0（原来 3 处都在表头）；文档 3 处引用（列说明 / 单行不换行那条 / free plan 列结构）同步改名，**旧名一律用粗体、不加反引号**（加了会被文档/代码的字面校验当成「必须在 index.html 里出现的界面串」而假失败）。文首版本号 → **v2.104**。
>
> **2026-10-09（v2.103）：When 表头可排序，标签右侧加一对小三角。** 用户：「列表中 when 可以排序，在表头右侧加箭头」。落地：`When` 表头由纯文本变成一颗按钮（`class="ep-sort-btn"`）—— **不给 `th` 挂 onclick**，用 `<button>` 是为了键盘可达、读屏能念；`aria-sort` 按规范挂在 `th` 上（`none` / `ascending` / `descending`）。标签右侧是 `.ep-sort-ic`，里面上下两颗小三角：未排序时都淡显（`opacity:.4`，提示「这列能排」），排过之后只留对应那一个、标签与箭头一起加深到 `--text-secondary`（顺带标出「现在按这列排」）。**两态**切换：第一下**升序**（早→晚）—— 原数组顺序本来就接近「新→旧」，第一下若给降序会看着像「点了没反应」；再点降序。没有「回到默认顺序」的第三态。
> **最容易写错的一处**：行上的动作（`editEpisode` / `viewEpisode` / `shareEpisode` / 行菜单）用的都是剧集在 `episodes` 里的**原始下标**，所以排序**只能改渲染顺序** —— 实现是先算出 `order`（存原始下标）再 `order.forEach` 取 `ep` 与 `i`，**绝不能把下标换成排序后的位置**，否则点哪行都会打开别的集。
> 连带：重排会重建整行 → 勾选本来就丢了，所以 `toggleWhenSort()` 在 `buildRows()` 之后调 `clearSelection()` 把计数与 Actions 条复位（与 `applyFilter()` 同一套处理）。三个列表页的 When 表头是**逐字相同的 markup**，一次 replace_all 改完；排序状态**三页共用**。Episodes (free plan) 页那条固定在最前的 demo 行**不参与**排序。
> **没做**：Downloads 列没加排序（用户只点了 When）—— 同样的模式复制一份即可，但那是右对齐的数字列，箭头该放哪儿要另定。
> **校验**：抽真实 `buildRows()` 配桩 DOM，用四条不同日期的剧集跑「不排序 / 升序 / 降序」三遍 —— 日期顺序正确，**并且每一行 `id` 里的下标与该行渲染出的标题仍然指向同一条数据**（三遍都成立，说明排序没把索引串掉）；`class="ep-sort-btn"` 恰好 3 个、`aria-sort="none"` 3 个；内联脚本过 node --check。文首版本号 → **v2.103**。
>
> **2026-10-09（v2.102）：Downloads 与「3个点」之间加宽 + 把 Downloads 那格的假链接做成真链接。**
> ① 用户：「最右侧的 3 个点 和 downloads 这一类的距离是不是可以大一点」。量出来现状是：数字到点 = Downloads 右内边距 12 + 操作列左内边距 4 = **16px**；而点到表格右缘 = 操作列右内边距 **16px** —— 两边刚好一样。理由不是审美：**两边都是可点的东西**（数字那格有 `cursor:pointer` + 悬停变主色加下划线，点那格开菜单），16px 之间挤着两个可点目标容易点错。落地：操作列左内边距 4 → 12px、列宽 52 → 58px，**只加左边**（右侧只有表格边缘，没有可点对象），间距 16 → **24px**。代价照旧：这 6px 从 Title 拿（auto 布局里 Title 就是让位的列）—— 这是今天第三次动 Title 的宽度。
> ② **顺带发现一处假的「可点」暗示**：Downloads 那格 `cursor` 是 pointer、整行悬停还会变主色 + 加下划线，但它的 onclick **只有 `event.stopPropagation()`** —— 点了什么都不发生，连「点整行打开编辑」都被它拦掉；而标题那格同样悬停出下划线，点它**确实**会打开编辑。**用户的选择是「保留下划线、让它真的可点」**（不是去掉那个暗示），于是新增 `openEpisodeStats()`，点数字跳 **Statistics → Episodes**。
> **落点说明**：落在**本地**那个 `page-statsepisodes` 占位页（内容是「Statistics Episodes content coming soon.」），**刻意留在原型内** —— 侧栏的 Statistics 走的是 `window.location.href` 跳到**外部**站点；要跟侧栏一致，只改 `openEpisodeStats()` 里那一行。连带：这一页在侧栏没有自己的菜单项，所以照 Share & Embed 的老办法加了 `statsReturnPage`，`navigate()` 里让它保持**来源列表页**的高亮，否则进去之后侧栏全灭。
> **没做**：那一格仍是 `<td onclick>`，**键盘不可达**（不是 `<a>` / `<button>`）—— 与行内其它可点格子一致，要真做无障碍得换元素，本次未动。
> **校验**：`openEpisodeStats` 全文 6 处（1 处定义 + 4 处 DL 格调用 + 1 处 CSS 注释提及）；DL 格上的旧 `onclick="event.stopPropagation()"` 已为 0；操作列新 padding / width 已生效、旧 52px 无残留；落点页 `page-statsepisodes` 存在；内联脚本过 node --check。文首版本号 → **v2.102**。
>
> **2026-10-09（v2.101）：「3个点」行菜单按钮提可见度 —— 问题不在方向。** 用户问「最右侧的 3 个点，怎么能更明显一些？换成横着的 3 个点会更好么」。量出两个实打实的原因：① **点太小** —— 图标按 16px 渲染 24 viewBox、`r=1.7`，**每颗点直径只有 2.27px**；② **常态颜色太浅** —— 用的是 `--text-tertiary`(#94a3b8)，在白底上对比度 **2.56:1**，**低于 WCAG 对「非文字 UI 元件」要求的 3:1** —— 不只是不够显眼，是踩线。**方向不是杠杆**：竖点 ⋮ 是行内操作菜单的通行做法（Material `more_vert` / Gmail / GitHub / Linear / Notion 的行操作都是竖的），横点 ⋯ 更多用在顶栏、工具条的溢出；用户据此选了**保持竖点**。
> 落地两步（都不新增装饰）：常态色 `--text-tertiary` → `--text-secondary`（2.56:1 → 4.76:1）；图标 16→18px、`r` 1.7→2.2（每颗点 2.27px → 3.30px，约 +45%）。**连带**：原来的「行悬停色」正好就是 `--text-secondary` 这一档，提升之后行悬停就没有颜色变化了，所以那档一并提到 `--text`。
> **没做**：① 常态给浅底 + 描边（最显眼，但等于给每一行加一个可见方块，与「静默、删装饰」的取向相反）；② `:focus-visible`（键盘 Tab 到这个按钮目前没有任何视觉反馈）—— 已在对话里点出，等用户定。
> **校验**：SVG 的 width/height/r 已换、全文无 16px 与 r1.7 的残留；常态色与行悬停色两条规则已改；内联脚本过 node --check；另把真实按钮样式抄进静态预览页，渲了「常态 / 行悬停 / 按钮悬停」×「改前 / 改后」六格比对（改前的常态确实几乎看不见）。文首版本号 → **v2.101**。
>
> **2026-10-09（v2.100）：When 列由「药丸」改成「小色点 + 文字」，并把五种颜色全留下。** 承接 v2.99 的减噪：当时诊断出这列"乱"的三个来源，**最主要的是「一列里混着三种形状」**（纯文字 / 药丸+文字 / 只有药丸），我给了「只减噪」与「统一形状」两条路，用户先选减噪；随后要我把「统一形状」里的**色点 + 文字**版渲出来对比，看到结果后选了它，并选了**保留五种色**。
> 关键判断：**「颜色收敛」当初是被药丸逼出来的** —— 一大块饱和色填满格子、音量太高；色点把色块由"面"缩成"点"，音量低得多，于是不必再牺牲颜色，信息反而比 v2.99 更全。**顺带**：色点版不需要 `min-width:104px`，v2.99 那 30px 的宽度代价（与「收窄 Title」冲突的那笔）自动消失。
> 落地：`epWhenCell(ep)` 里把 `badge` 换成 `dot`；`.badge-future` / `.badge-ai-finished` 的颜色**恢复**为蓝；删掉 `.ep-table td.ep-when-cell .badge-status { min-width… }` 与 `ep-when-cell` 这个类；新增 `.ep-when-dot`。**注意：v2.99 的「颜色收敛」当天即被本版回退** —— 药丸那条减噪路线整个换成了色点。
> **实现要点**：色点不写死颜色 —— 它套的还是 `badgeClass(s)` 的 `.badge-*` 类，靠 `.ep-when-dot` 的 `background:currentColor` 取该状态自己的文字色；**该规则必须排在 `.badge-*` 之后**（同为单类选择器，排在后面才能盖掉它们的浅底）。这样颜色仍只有一处定义。
> **校验**：抽真实的 `epWhenCell(ep)` 跑过六种状态逐条核对（Published 裸日期；Future = 点 + 词 + `· 日期`；其余 = 点 + 词）；`ep-when-cell` 与 `min-width:104px` 均已清 0；`.ep-when-dot` 只定义一次、且位置在 `.badge-*` 之后；整段内联脚本过 node --check。文首版本号 → **v2.100**（继续往下走，不是 v2.1）。
>
> **2026-10-09（v2.99）：表格两处收尾 —— Downloads 表头不换行（顺带收窄 Title）+ When 列减噪。**
> ① 用户：「Title 这一列所占的宽度可以减少一点吧，当 downloads 这个表头可以不用换行」→ 只加了一条 `white-space:nowrap` 到 `.ep-table th.ep-dl-head`。**auto 布局下 Title 是唯一「能换行、能吸收富余宽度」的列**，所以表头不许断行之后，Downloads 列的最小宽度变成整串文字，多占的那点只能从 Title 让出来 —— 一条规则同时满足两件事。**没有**给 Title 另写宽度：auto 布局下给某一列设百分比不会「省下」空间，只会摊到其它自动列上。（真要钉死 Title 的量，得整表改 `table-layout:fixed`，是大一号的改动，先不做。）
> ② 用户：「when 这一列里面的内容有点乱，你有什么建议」→ 先诊断出三个来源：**一列里混了三种形状**（纯文字 / 药丸+文字 / 只有药丸）、**药丸宽度参差**（Draft 约 52px vs AI Processing 约 106px）、**颜色太集中**（Status 并入后，这一列成了全表颜色最重的地方）。给了两条路：**只减噪**（不动已定规则）与**统一形状**（全用药丸 / 全用色点+文字）；用户选**先减噪**。落地三件：药丸 `min-width:104px` + 居中（按 `td.ep-when-cell` 下钻，**不能改 `.badge-status` 基类** —— 它与 Type 列共用）；颜色收敛（Future、AI Finished 由蓝改灰，只留琥珀 / 红）；Future 的日期包一个 `.ep-when-date` 加固定间距，读作药丸的附注。**已知代价**：等宽那条把这列撑宽约 30px，宽度从 Title 拿 —— 与 ① 的「收窄 Title」方向相反，用户已知情（要撤就是删一条 CSS）。
> **校验**：把真实的 `epWhenCell(ep)` 配桩跑过六种状态，逐条核对输出（Published 裸日期；Future = 徽标 + `.ep-when-date` 包裹的日期；其余四种只有徽标）；`ep-when-cell` 恰好 3 个 td + 1 条 CSS；`.badge-future` / `.badge-ai-finished` 已改灰，并确认这两个类**只被 When 列用**（`badgeClass` 只在 `epWhenCell(ep)` 里调用）；内联脚本过 node --check。文首版本号 → **v2.99**。
>
> **2026-10-09（v2.98）：去掉 User 列，改为筛选弹层里的 User 子面板。** 用户：「将 User 这一列也去掉，如果用户有多个发布者的话，可以在 filter 里面增加 filter 去检索 episode」。判断是**赞成**，理由：① 这套原型里**已经有现成先例** —— **Season 与 Media Type 就是「只活在筛选里、不占表格列」的维度**，User 与它们同类（取值很少、用来把列表收窄，而不是逐行要去比较的事实）；② 这条列今天**每一行都是同一个值**（`Creator E`，只有 demo 行是 `Podcast Team`），一列全是重复内容就是纯噪声。
> **动手前必须说清的一件事**：这套原型的筛选**不会真的筛行** —— `applyFilter()` 只做「给按钮加 active、关弹层、点亮 ×、清空选中」四件事，`episodes` 一行都没动。所以这次加的 User 面板与现有四个一样是**装饰性**的；用户确认接受这点（要真筛是另一件大得多的事：得让 `buildRows()` 按筛选状态过滤，还得顺带把 Status / Season / Media Type / Published 一起做成真的，否则只有 User 能筛会很怪，并会牵到选中条批量与 N selected）。
> 落地：① 三个列表的 **User 列**去掉（3 个表头、3 条 `colspan`、行模板 `rowStart`、Episodes 3 的 demo 行），`colspan` 由 6/7/6 变 **5/6/5**；② 三个筛选弹层各加一颗 **User 导航项 + `#fp-user` 面板**（`All Users` / `Creator E` / `Podcast Team`，沿用 Season 那套「All 与子项互斥」写法）；③ **把 `fp-user` 接进三处 JS** —— `updateNavDots()` 的面板清单（**顺序必须与导航项的 DOM 顺序一致，它是按下标取 navItem 的**）、它的 dirty 判定分支、`clearCurrentPanel(el)` 的重置分支、`resetFilter()` 的清单 —— 少接任何一处，这个面板要么没有 dirty 点、要么 Reset / Reset all 清不掉它。
> **已知**：筛选弹层在三个列表页里**各有一份副本**，所以这是「一个面板改三遍」；这三个副本的对应片段逐字相同，用 replace_all 一次改完。
> **校验**：把真实的 `buildRows()` 配桩 DOM 跑三个列表，每行 `<td>` 数为 **5 / 6 / 5**、与表头 `<th>` 数一致，并逐格打印确认第 3 格已是 When、User 已无；`colspan` 5/6/5；`id="fp-user"` 与 `switchFilterPanel('user',this)` 各 3 处、五个导航项的顺序 status→media→season→published→user 三个弹层一致；`Creator E` / `Podcast Team` 现在**只出现在筛选面板里**（行模板中已无）；整段内联脚本过 node --check。文首版本号 → **v2.98**。
>
> **2026-10-09（v2.97）：Status 列合并进 When 列。** 用户：「episode 列表中的 status 这一列，能不能合并到 When 里面呢？如果是 published 则显示发布时间，如果是 future 则显示 future 加时间，如果是 draft / AI Processing / AI finished / AI failed 则直接显示这些词」。判断是**赞成**，而且代码本身就站在这一边：`shareEpisode` 里那句 `var date = isPublished ? (ep.when || '--/--/----') : '--/--/----'` 说明 **`ep.when` 一直是被当「发布时间」用的、只在已发布时才有意义** —— 反倒是列表给 Draft / AI Processing 也照着一个日期显示，**列表和 Share 页本来就自相矛盾**，这次一并统一。另外核过三件事：这套原型**没有列排序**（grep sortColumn / sortBy 之类无结果），所以不存在「合并后按哪列排」的问题；**也没有任何按 `<td>` 下标取值的代码**（`cells[]` / `children[]` / `nth-child` 全无），删一列不会带崩别处；「Published + Dec 16, 2025」今天是把同一句话说两遍，而一屏里大多是已发布、一列同款绿徽标本来就不携带信息。
> 落地：`rowStart` 里那个状态 `<td>` 删掉，三个列表变体（Episodes / Episodes (apple) / Episodes (free plan) 共用同一份行模板）里的 When 格改由一个函数 `epWhenCell(ep)` 生成 —— **Published** 返回 `ep.when`；**Future** 返回 **Future 徽标 + 日期**；**其余四种只返回彩色徽标**。**五种非 Published 状态全部保留原有徽标色**（Draft 灰 / Future 蓝 / AI Processing 琥珀 / AI Finished 蓝 / AI Failed 红），所以「一眼扫出异常」的能力没丢，只有已发布那一片安静下来。
> 连带改的：三个表头去掉 `<th>Status</th>`、三条选中条 `alt-header` 的 `colspan` 各减一（7/8/7 → 6/7/6）、Episodes 3 那条 demo 行也去掉状态格。
> **已知代价（用户明确选择接受）**：这一列表头**仍叫 When**。合并后列里会出现 `AI Failed` 这类状态词，表头与内容不再严格对应。
> **校验**：把真实的 `buildRows()`（连同 `badgeClass` / `epWhenCell` / `epTypeLabel` / `isAppleSubscriptionType`）抽出来配桩 DOM 真跑，用覆盖全部六种状态的剧集渲染三个列表 —— 每行 `<td>` 数与表头 `<th>` 数一致（6 / 7 / 6），六行 When 格的**实际输出**逐条核对无误；`colspan` 已是 6 / 7 / 6；整段内联脚本过 node --check。文首版本号 → **v2.97**。
>
> **2026-10-09（v2.96）：Type 列里 Apple 订阅类型的徽标加区分色（Public 保持中性灰）。** 用户问「如果是 apple 类型的 episode，是不是 type 就写 Apple，鼠标移上去再显示具体类型，你觉得哪种好？」—— 判断是**不建议改成 Apple + hover**，四条理由：① hover 在表格里是「一次看一行」，而列表的价值是**扫**和**比**；② 信息**净减少** —— 具体类型本身就包含「它是 Apple 剧集」这层意思，换成 Apple 等于把最该看的藏起来；③ **hover 出来的东西截不到图** —— 这套原型要拿去评审、贴进文档，tooltip 在静态图里永远不出现；④ 整页就是讲 Apple 订阅，「Apple」这个词几乎不携带信息。但**用户直觉指向的病根是对的**：`.badge-type` 今天所有值共用同一个中性灰徽标，而紧邻的 Status 列是**按状态上色**的 —— 这一列确实没有任何视觉线索能分出两类。所以用户选了「**具体类型 + 视觉标记**」。
> 落地：**只加了一个颜色** —— 新增 `.badge-type.is-apple`（`#f5f3ff` 底 / `#6d28d9` 字），Type 列那格按 `isAppleSubscriptionType(ep.type)` 决定挂不挂 `is-apple`；**文字仍是具体类型**。**紫色是刻意的**：六个 Status 徽标已经占掉绿/灰/蓝/琥珀/红，紫色与它们都不撞，也呼应 Apple Podcasts Subscriptions 的配色。顺带把「是不是 Apple 类型」收成一个函数 `isAppleSubscriptionType(type)`，`syncAppleSubscriptionFromType(type)` 里那句内联判断也改用它（同一判断原来在两处各写了一遍）。
> **校验**：把真实的两个函数抠出来在 Node 里跑过样本里出现过的全部 type 值 —— `Free` → Public / 中性灰，四个 Apple 类型 → 各自文字 / `is-apple`，空值 → Public；CSS 里 `.badge-type.is-apple` 排在 `.badge-type` 之后（同优先级后者胜）；整段内联脚本过 node --check。文首版本号 → **v2.96**。
>
> **2026-10-09（v2.95）：列表 Type 列里非 Apple 剧集改显示 Public（数据仍存 Free）。** 用户问「如果 episode 不是 apple 的类型，那么在 episode list 列表中 type 命名为 public 是不是更合理？」判断是**更合理**，理由：① 这套界面里 **Free 已经被 Free plan（定价计划）占用**（还专门有一个 Episodes (free plan) 演示页），同一个词再指「剧集类型」会撞车；② 另外四个值说的是「谁能听 / 什么时候能听」（`Subscriber-only` / `Early access` / `Archive access`）或「订阅者多拿到什么」（`Ad-free`），只有 `Free` 说的是钱，在一列叫 Type 的东西里是异类；③ v2.91 之后下拉里已经没有 Free 这个选项了，列表是唯一还在露 Free 的地方，改成 Public 正好和「不勾 = 不是订阅剧集」对齐。落地：**只改显示** —— 新增 `epTypeLabel(type)`（`!type || type === 'Free'` → `'Public'`，其余原样），Type 列那一格由渲染 `ep.type` 改成渲染 `epTypeLabel(ep.type)`；**`ep.type` 数据值不动**，`type !== 'Free'` 那些判断、26 条样本数据、AI 行的 type 全没碰。**已知偏离**：Podbean 线上那个「Episode will be」下拉里就是 Free，这里是有意偏离。
> **校验**：把真实的 `epTypeLabel` 抠出来在 Node 里跑过样本里出现过的全部 type 值 —— `Free` → `Public`、另外四个原样；整段内联 `<script>` 过 node --check；`epTypeLabel` 全文只有「定义 + Type 列」两处；没有别处再渲染 `ep.type`。文首版本号 → **v2.95**。
>
> **2026-10-09（v2.94）：勾选框文案去掉 "Episode"。** 用户：「名字 Apple podcast subscription episode 里面，把 Episode 去掉」。勾选框由 **Apple Podcast Subscription Episode** 改成 **Apple Podcast Subscription** —— 只动那一行可见文字，`#v2AppleSubscription` / `.ed-v2-check-row` / 所有 id 与 JS 逻辑都没碰。去掉之后它和这个功能本身的名字（文档里一直叫 **Apple Podcast Subscription**）统一了：多出来的那个 "Episode" 读起来像在说「一集」，而它标的是**功能**。
> **校验**：`index.html` 里旧串全文为 0；文档里旧串只剩 v2.91 那条历史记录，且**不加反引号**（历史引文若加反引号，会被 doc/ui 一致性校验当成「必须在 index.html 里出现的界面串」而假失败）。文首版本号 → **v2.94**。
>
> **2026-10-09（v2.93）：File for Subscriber 搬进订阅设置块 —— 它也算 Apple 订阅剧集的内容。** 用户：「当选择 ad-free 的时候，File for Subscriber 也是 Apple podcast subscription episode 中的内容」。原来它是 Media File 上方的一个**独立字段**（`#v2AdFreeFileField`），落在淡灰底**外面**；现在整段 DOM **移进 `#v2AppleSubscriptionSettings`**、排在 `#v2SubTypeTime` 之后，于是它跟着订阅块落在**同一个淡灰底**里，位置也正好接在那句 `You can upload a separate file (content without ads) for Apple Podcasts subscribers.` 下面，读起来就是「一句话 + 一个动作」。**零 JS 改动**：显隐仍由 `updateAdFreeFileField()` 按「勾选且 Ad-free」控制（未勾时父容器 `display:none`，本来就看不到）。它挪窝后**仍在 Media File 前面**，而 Media File 那一行一直是按 `#v2MediaFileRow` 取（v2.89 的教训），所以不受影响。
> 顺带把块内的上传行也纳入白底覆盖：`.ed-v2-file-row` 自身是 `#f8fafc`，不覆盖同样会跟淡灰底融色。
> **校验**：迁移后 `#v2AdFreeFileField` 全文仍**只有一处**、`.ed-v2-file-row` 仍是**两个**（Ad-free 那个 + Media File 那个）、`<div>` 开闭配平（701/701）、全文没有按类取 `.ed-v2-file-row` 的写法。文首版本号 → **v2.93**。
>
> **2026-10-09（v2.92）：给订阅块加淡灰底，和 Basic Info 其它字段区分开。** 用户：「Apple podcast subscription episode 的内容，能否加个背景色或线框之类的，和其他 basic info 的内容做一些区分？」给了四种做法并各自标了成本（**左侧竖色条**最轻 / **淡色底块** / **1px 描边卡片**最重、与 v2.18「弹框框太多」的收敛方向相反 / **独立成一个区块**最一致但要额外做「非 apple 页隐藏菜单项」），用户选 **淡色底块**。落地：`#v2SubscriptionTypeField`（勾选行 + 展开设置块整块）加淡灰底 `#f1f5f9` + 圆角 + 内边距；**块内的 `.ed-v2-input` / `.ed-v2-select` 改白底**。坑：底色**不能用 `#f8fafc`** —— 那是这两个控件静默态的底色，同色会融成一片、等价于控件消失；选 `#f1f5f9` 是因为它本来就在调色板里（侧栏激活项用的就是它）。整体刻意做得比一张实心卡片轻，不抢 Title / Description / Media File 的视觉重量（「看起来最重的要是最重要的」）。
> **校验**：把真实 CSS 抄进一个静态预览页，渲染「勾选态 / 默认不勾态」×「有底 / 无底」四格做对比 —— 浅灰底与块内白控件两个方向都分得开；未勾选时是一条只有勾选框的淡灰条。文首版本号 → **v2.92**。
>
> **2026-10-09（v2.91）：订阅类型入口由「五选一下拉」改为「顶部勾选框 + 展开设置块」。** 用户：「在 Publish Episode 页面会有一块内容询问 Episode will be，能否改为进入 Publish Episode 后顶部显示一个 **Apple Podcast Subscription Episode** 勾选框，勾选后再展示相关 settings」，并问这样是否比现在更友好、更明确。给的判断是**确实更清楚**，三条原因：① 原来那个五选一下拉（`Free` / `Ad-free` / `Subscriber-only` / `Early access` / `Archive access`）**全篇没出现 "Apple" 字样**，用户得自己知道这几个词是 Apple Podcasts 订阅专有的；② 下拉暗示「每集都得在五个里挑一个」，而绝大多数剧集并非订阅剧集，把 `Free` 也做成选项之一，反而让「普通」看起来像一个必须主动做的选择；③ 默认态只剩一行，不订阅的人根本不用理解那四个词。落地：
> ① **新增勾选行** `#v2AppleSubscription`（label 用 `.ed-v2-check-row`，文案 **Apple Podcast Subscription Episode**），仍是 **Basic Info 的第一个字段、Media File 上方**，仍**仅 Episodes (apple) 页**显示（`updateEpisodeTypeField()` 里判 `currentPage === 'episodelist2'`）。
> ② **下拉收进展开块** —— 原 `#v2SubscriptionType` 现在包在 `#v2AppleSubscriptionSettings` 里（默认 `display:none`），**并去掉了 `Free` 选项**，只剩 `Ad-free` / `Subscriber-only`（默认选中）/ `Early access` / `Archive access`。
> ③ **状态推导统一收口** —— 新增 `isAppleSubscriptionEpisode()`（读勾选框）与 `currentSubscriptionType()`（**不勾 = `Free`**，否则读下拉）；保存写 `ep.type`、列表 Type 列都改走 `currentSubscriptionType()`，**不再有地方把下拉的 value 直接当最终类型**。
> ④ **回填** —— 编辑调 `syncAppleSubscriptionFromType(ep.type)`（`type !== 'Free'` 才勾并选中该类型）；新建 `openNewEpisodeDetails()` 传 `'Free'` → 不勾。`toggleAppleSubscription(on)` 负责切展开块显隐、勾上时把空值兜底成默认类型，并刷新 File for Subscriber 的显隐。
> ⑤ **`File for Subscriber`（`#v2AdFreeFileField`）的显隐判据**随之改成「**勾选且类型为 `Ad-free`**」。
> **已知遗留（不在本次范围）**：`onSubscriptionTypeChange()` 里那段 `else if (v === 'Free')` 分支、与 `toggleAppleSubscription(on)` 里 `sel.value === 'Free'` 的兜底判断，在「下拉已无 Free」之后都属于**走不到的死代码**，本次保留未删。
> **校验**：核对 index.html 里勾选框 / 下拉 / 两个显隐函数 / 保存与回填四处接线，并同步第 4 章与 7.2 的 ①③。文首版本号 → **v2.91**。
>
> **2026-10-09（v2.90）：两个都缺时，报**页面上更靠上**的那个。** 用户：「media file 和 title 同时缺少的时候，按照内容从上往下的位置报错」。v2.88/2.89 时是写死「标题优先」，于是两个都缺时红框会落在**下面**的 Title 上，而上方空着的 Media File 没反应 —— 与「从上往下」相悖。改成新增 **`publishFieldOrder()`**：用 `compareDocumentPosition` 比这两个字段在 DOM 里的先后，返回 `['file','title']` 或 `['title','file']`，两个都缺时取第一个。**当前页面 Media File 在 Title 上方**，所以现在报 Media File；顺序若改，这里自动跟着走（拿不到 DOM 位置时有兜底）。
>
> **校验**：把 `publishBlockingField()` / `showPublishBlock()` 抽出来配桩 DOM 真跑，四种输入——只缺文件 / 只缺标题 / **两个都缺** / **把 DOM 顺序反过来**——分别确认返回的字段与红框落点（反序那次返回 `title`，证明它真的跟着 DOM 走）。文首版本号 → **v2.90**。
>
> **2026-10-09（v2.89）：修一个静默 bug —— Media File 为空时点发布毫无反应。** 用户报「media file 为空的时候，点击 publish 没有报错」。查下来是 v2.88 埋的：`showPublishBlock()` 里用 `document.querySelector('.ed-v2-file-row')` 找那一行，但**页面上有两个 `.ed-v2-file-row`** —— 另一个是仅 Ad-free 时显示的 **File for Subscriber**，而且它**排在 Media File 前面**；`querySelector` 取的是第一个，正是那个平时 `display:none` 的行。于是红框加在看不见的地方，`scrollIntoView` 对隐藏元素也无效 —— 表现就是「点了像什么都没发生」。而标题那条路径用的是 `#v2EpisodeTitle`（按 id），所以只有缺文件这一路是坏的。
>
> **修法**：给 Media File 那一行加 `id="v2MediaFileRow"`，`showPublishBlock()` 与 `clearMediaFileError()` 都改成按 id 取，全篇不再有按类取 `.ed-v2-file-row` 的写法。**教训：一个类被两处共用时，`querySelector` 会静默地取到第一个 —— 这类错误不报错、只是「没反应」，所以在这种地方一律按 id 取。**
>
> **校验**：把 `showPublishBlock()` 抽出来在 Node 里配桩 DOM **真跑**了一遍（桩里故意让按类取返回「另一行」），确认三种输入下红框分别落在 Media File 行 / 标题输入框 / 不拦；`check_v288.js` 里也钉住了「必须按 id 取」这条。文首版本号 → **v2.89**。
>
> **2026-10-09（v2.88）：缺必填内容时的处理改成「按钮保持黑色 + 就地标红」，并去掉 Toast。** 用户看 v2.87 的成品后要求：「schedule 按钮和 publish 按钮应该都是同样处理，如果有必填的内容没有填写的时候，按钮的颜色也为黑色。点击的时候在输入的位置红框报错，并且滑动到第一个错误的位置，不需要 toast 报错」。三处改动：
> ① **按钮不再变灰** —— 缺内容时也是**常态黑底**（`is-disabled` 类与其 CSS 一并删掉；只留 `:disabled` 那条作兜底）。也就是说按钮**永远可点**，「缺什么」全靠点了之后的红框回答。
> ② **去掉错误 Toast** —— 顺手清掉 `publishBlockReason()` 里那三条 message（toast 一去它们就没有去处了），函数改成只返回缺的字段名（`publishBlockingField()`）。
> ③ **Schedule 弹框同款** —— `confirmSchedule()` 里原来那句 `showToast('Please select date and time.', 'error')` 换成 `showScheduleBlock(!!date, !!time)`：缺哪个标哪个、各自一行红字、滚到并聚焦**第一个**缺的（先日期后时间）。为让这两个输入框能挂错误态，把它们**各写一份的长行内样式抽成了 `.confirm-field-input` 类**（否则行内 `border` 会盖过类）。
>
> **顺带改名**：`updatePublishBtn()` → **`onPublishFormChanged()`** —— 按钮不再有「禁用态」要更新，它现在只负责「必填项补上了就清掉红框」，旧名字已名不副实。
>
> **2026-10-09（v2.87，已被 v2.88 部分推翻）：缺标题 / 缺文件时给出反馈，不再默默无反应。** 用户问「没填 title 时发布按钮是灰的，怎么更好地提醒用户」——先指出一个关键事实：**`disabled` 的按钮不触发点击事件，所以用户点它连一点反馈都没有**；而且当时按钮被**两个**条件卡着（缺标题 || 缺文件），界面只对缺文件那件事有可见提示（文件名位置的灰字 `Please upload a file.`），**缺标题完全没信号**。给的建议里用户选了 **① 点一下就给反馈 + ② 就地报错**。
>
> 落地：把按钮的 `disabled` 属性换成 **`is-disabled` 类**（`updatePublishBtn()` 里 `classList.toggle`），外观与之前一模一样（灰底 + `not-allowed`）但**能接住点击**；新增 **`publishBlockReason()`**（缺什么返回什么，标题优先、文案随发布/预约模式变）与 **`showPublishBlock()`**（错误 toast + 标题红框 + `.field-error` 小字 + `scrollIntoView` + `focus`），在 `publishPublish()` 开头拦一道；标题输入框补上内容时 `clearTitleError()` 自动撤掉红框，打开弹窗时也清一次。
>
> **为什么用类而不是「外面套一层透明容器接住点击」**：`disabled` 元素的事件在多数浏览器里**根本不会派发**，连父容器的 click 也收不到，所以套容器是无效的；换类是最直接的解法（代价是语义上不再是 disabled，键盘用户按 Enter 也会走到这条提示——但那恰恰是更好的反馈）。**这条值得记：想让「看起来禁用」的按钮给出解释，就不能真的禁用。**
>
> **2026-10-09（v2.83）：三个动作的去向与 toast 文案统一。** 用户要求：「如果点击了 publish now，那么页面要跳转到 Share & Embed 页面。如果是 draft 或 schedule，则返回 episode list 列表，显示 toast 消息」。动手前确认了三件事（都按建议定）：**toast 用 `saved` / `scheduled`** 两种句式、**draft / schedule 回到「进来的那个列表」**、**新建剧集的 Publish Now 也要跳 Share 页**。
>
> **改了什么**：① **新建剧集也跳 Share & Embed** —— 以前 `publishPublish()` 里是 `if (editingIndex >= 0) shareEpisode(...)`，新建的剧集（`editingIndex === -1`）没有 index 可用、就留在原地；现在先调 `createEpisodeFromForm()` 按表单内容（标题取 `#v2EpisodeTitle`、`type` 取订阅类型下拉）**补一条 `episodes` 数据**再跳，于是它**发布后也会出现在列表里**（比原来更贴近真实行为）。② **存草稿 / 预约发布都回到列表**（以前都不跳转），返回页记在 **`publishReturnPage`**（在 `openEpisodeDetailsModal()` 里记，新建与编辑两条路都经过它；逻辑与 Share 页的 `shareReturnPage` 完全一致，含「若在 Share 页打开则再退一层」）。③ **两条 toast 文案**：`Episode saved as draft!` → **`Episode saved successfully!`**、`Episode scheduled for <日期> <时间>` → **`Episode scheduled successfully!`**；两者同时**由 `info` 改成默认的 `success`**（文案既然写 successfully，图标就该是绿勾，与 published / updated 一致）。**Publish Now 的两条 toast 未动**。
>
> **注意**：预约的**校验分支保持不跳转** —— 没填日期/时间时只 Toast 报错 `Please select date and time.` 并 return，不会把人踢回列表。

### 7.2 内容区 —— 左侧菜单 + 同页堆叠的五个区块

内容区左侧为竖向菜单，五项依次为 **Basic Info → Settings → Social Sharing → Transcripts → Chapter Markers**。

这五项**不是选项卡**，也不切换显隐：五个区块在同一页自上而下堆叠，相邻区块之间以细分隔线分隔。左侧菜单是**锚点**——点击某一项会平滑滚动到对应区块（区块顶边停在顶栏下方 88px 的锚点位置）；滚动页面时左侧高亮会自动跟随当前位置（scrollspy）。

> **2026-10-08：区块之间的分隔线删了又加回来。** 当天曾一度去掉相邻区块之间那条 `border-top: 1px solid #e2e8f0`，以及 Social Sharing 卡片内部（那排图标与 YouTube Video Settings 子面板之间）的那条；随后按用户要求**当天全部恢复**，间距也保持原值（区块之间 48px + 40px = 88px）。**注意**：卡片内部那条后来又在同一天被单独去掉（用户：「youtube video settings 上方的这个横线 是否可以去掉」）——**区块之间那条保留不动**，见下一条。

> **2026-10-08：弹框内控件「框太多」的视觉优化（纯样式，不改功能）。** 弹框里可见的描边盒子偏多，输入框、按钮、容器三类东西共用同一种描边语言，反而读不出层次。做了两件事：**① 统一描边色**——弹框内所有 1px 描边由 `#d1d5db` 统一为更浅的 `#e2e8f0`（覆盖表单控件、ghost 按钮、Description 编辑器外框、Logo 分裂按钮）。**② 输入框 / 下拉改「静默态」**——平时只有浅灰底（`#f8fafc`）、**不画描边**；鼠标**悬停**时浮出一条很浅的描边；**聚焦**（focus）时才变成绿色描边 + 白底 + 光晕（统一走 `.ed-v2-input` / `.ed-v2-select` 两个类）。好处是一屏里十来个输入控件在没被注视时几乎不占视觉重量，焦点位置反而更清楚。Episode Tags 输入框与 YouTube Settings 的下拉原本把描边写死在行内，这次一并改挂到这两个公共类上（圆角、下拉箭头等随之统一）。

> **末段留白（2026-09-30 修复）**：最后一个区块（Chapter Markers）本身很矮，整页可滚动的总长度不够，导致点它时区块顶不到锚点位置、只能停在中途，滚动联动还会因为「已经滚到底」把高亮甩到最后一个区块上。现在在内容末尾补了一段空高度（`.ed-v2-tail`，高度按视口与最后一个区块的高度实时计算），让最后一个区块也能滚到锚点位置；内容本来就不够长时为 0，不占地方。

#### Basic Info 区块

> 原「Episode Info」，2026-09-29 改名为 **Basic Info**（左侧菜单项与该区块标题同步改名）。

**① Apple Podcast Subscription（订阅剧集入口）**

- 位于 **Basic Info 最上方**（本区块第一个字段、**Media File 上方**）的一行**勾选框** `Apple Podcast Subscription`；**仅 Episodes (apple) 页面**（开通 Apple Podcast Subscription 的演示页）显示。
- **整块带淡灰底**（2026-10-09 v2.92 / v2.93）：勾选行 + 展开的设置块（以及 Ad-free 时的 **File for Subscriber**）**整块**包在一层淡灰底里（底色 `#f1f5f9`、圆角、内边距），用来和 Basic Info 其它字段区分开；块**内**的输入框 / 下拉 / 上传行都改成**白底**（否则它们静默态的浅灰底 `#f8fafc` 会跟底块融成一片）。未勾选时也带这层底，所以默认态是一条只有勾选框的淡灰条。
- **不勾（默认）**：只显示这一行，下方**不展开**任何订阅设置 —— 该集按 `Free` 处理；新建剧集默认不勾。
- **勾选**：下方展开订阅设置块，里面是 `Episode will be` 下拉、随类型变化的解释文字、以及按需出现的日期时间输入。
- 下拉 **`Episode will be`** 的选项为四个订阅类型：`Ad-free`、`Subscriber-only`（**默认选中**）、`Early access`、`Archive access` —— **不再含 `Free`**（取消勾选即等于 `Free`）。
- 该勾选框是「是否属于 Apple 订阅剧集」的**唯一来源**；保存时写入剧集 Type 的值由「勾选状态 + 下拉」共同决定（取消了勾选就是 `Free`）。
- 编辑剧集时按该行剧集数据的 **Type** 值回填：Type 为 `Free` 或无值时**不勾**；其余类型勾上并选中对应项。
- 在 Episodes 列表页（无订阅）打开弹窗时不显示此字段。
- 选择 **Early access** 时，下方显示解释文字 `Subscribers get early access to this episode. It becomes public at the date and time below.`，并出现 **Public release（公开上架时间）** 输入（单个日期 + 时间控件，datetime-local）。
- 选择 **Archive access** 时，下方显示解释文字 `After the "Archive date" date, the episode will be available only to your Apple Podcast subscribers.`，并出现 **Archive date（进入档案日期）** 输入（单个日期 + 时间控件，datetime-local，与 Early access 相同）。
- 上述 **Public release / Archive date** 输入框，**点击整行**（输入框任意位置）即通过 `showPicker()` 弹出时间选择器；浏览器不支持 `showPicker()` 时退化为聚焦输入框。
- 选择 **Subscriber-only**（默认选中）时，下方显示解释文字 `Apple Podcasts subscribers have exclusive access to the episode.`（无时间输入）。
- 选择 **Ad-free** 时，下方显示解释文字（无时间输入）：
  - `You can upload a separate file (content without ads) for Apple Podcasts subscribers.`
  - 同时在订阅设置块**里**（Episode will be 那一组下面）多显示一个 **File for Subscriber** 上传字段（见 ③）。

**② Media File**

- 显示当前文件名（如 `episode-audio.mp3`）；有文件时右侧为 **✕** 删除链接（与 File for Subscriber 的操作样式一致）。
- **文件名只显示一行**：太长时截断为 `…`，且省略号出现在**扩展名之前**（如 `a-very-long-episode-nam… .mp3`），**扩展名始终完整可见**，不会被一起省略掉。
- 点击 **✕** 清除文件后，文件名位置显示灰色提示 `Please upload a file.`，右侧链接变为 **Upload**，点击选择新文件。
- 未上传文件时 Publish 主按钮为禁用态。
- **AI Finished 剧集**（2026-10-09 v2.86）：文件名显示的是**优化后**的音频（`<剧集标题>_optimized.mp3`），并**去掉右侧的 ✕**、改成一个绿色 **Preview** 链接（同日再一轮：用户要求 Preview 右边不要有 ✕ —— 连它「移除文件」的功能一起拿掉，用 `display:none`）—— 点击打开**音频预览弹框**（见 7.3），上下对比**优化后音频**与**原始音频**。其它状态既没有 `_optimized` 后缀、也没有 Preview，**仍保留 ✕/Upload**（可移除或更换文件）。

**③ File for Subscriber（订阅者版本文件）**

- **仅当勾选 `Apple Podcast Subscription` 且订阅类型为 Ad-free 时**显示；2026-10-09（v2.93）起它**就在订阅设置块里面**（排在 Episode will be 那一组之后、跟着淡灰底走），不再是块外的独立字段。
- 行样式与 **Media File** 一致（文件图标 + 文件名 + 右侧操作链接），文件名同样单行显示、超长时在扩展名前截断。
- 未上传时，文件名位置显示提示文字 `Please upload a file.`（灰色），右侧操作链接为 **Upload**，点击选择本地音频文件。
- 选择文件后：提示文字变为该文件名，右侧操作链接变为 **✕**（删除）；点击 ✕ 清除文件并恢复 `Please upload a file.` + Upload。
- 每次打开弹窗时重置为未上传状态。

**④ Title**

- 剧集标题输入框，placeholder 为 `Enter episode title`。标题变化会实时同步更新 Publish 按钮可用状态。
- **AI Finished 剧集**（2026-10-09 v2.86）：**输入框内部右端**多出一颗绿色 **More** 链接（同日再一轮从「标签右侧」挪进框内，与 Media File 行里 Preview 的位置语言一致；输入框加了右内边距，文字不会压到它），点开是一个**下拉**，里面列 **3 条 AI 推荐标题**（每条下面一行小字说明推荐理由，如 `Adds the year — good for search`）。**点一条就填进输入框**（可以再手改）；点别处收起。推荐是**按当前标题派生**的（取冒号/破折号前的主干，套三种句式：`…: A Complete Guide for 2026` / `… — Everything You Need to Know` / `…: The Step-by-Step Walkthrough`），所以任何 AI Finished 剧集都有合适的三条。其它状态这个 More 不出现。

**⑤ Description（富文本编辑器）**

- 工具栏：B（加粗）、I（斜体）、U（下划线）、无序列表、有序列表。
- 内容区为可编辑区域，placeholder：`One or more sentences describing your episode to potential listeners.`
- **AI Finished 剧集**（2026-10-09 v2.86）：这里会**预填两段 AI 写好的正文**（首句嵌入该剧集的标题主干），可直接编辑；其它状态仍是空的。

**⑥ Episode Artwork（剧集封面）**

- **封面本身只作展示、不可点**：鼠标悬停在封面图上时，图上盖一层半透明遮罩，遮罩里居中显示一颗**拼接按钮**（键盘 Tab 聚焦时同样显示）。**点击封面其他任何区域都没有反应**——上传只有一个入口，就是下面那颗 Upload 按钮。
- **拼接按钮**：一颗按钮切成左右两半——**左半**是带文字的 **Upload**，点它打开本地文件选择；**右半**是只有一个 **▼** 箭头的小方块，点箭头展开账号已有 Logo 列表（Logo 1~4），从中选择一张作为封面；两半共享描边、中间一条细分隔线，下拉紧贴在封面下方展开。
- 图片规格说明 `1400–2048 px square · jpg or png` 放在**封面正下方**（13px 灰色小字，跟着封面一起约束在 200px 宽的左列里）。

> **2026-10-08：两个入口都搬到封面上，最终合成一颗拼接按钮、且封面本身不再可点。** 原来封面右侧是「Upload | ▾」一组拼接按钮（左半上传、右半展开图库）。先改成整张封面即上传区（悬停出遮罩、点击开文件选择）、图库入口是遮罩里一行下划线小字；再改成遮罩里竖排两颗按钮；再由用户定稿为**遮罩里一颗拼接按钮**——左半 **Upload** 带文字、右半一个只有 ▼ 的小方块（对齐线上生产站的 `choose-img-group`：**Upload image** 文字 + `arrow_drop_down` 图标按钮）；接着用户提出「按钮之外的区域应该去掉点击上传」，于是**整张封面的点击上传取消**，封面退回成不可点的展示元素（`<div>` 而非 `<button>`，也移出了 Tab 顺序）。
>
> **同日再一步：图片规格说明搬到封面正下方，右侧那一列整体删掉。** 原先说明句待在封面右侧一个 `flex:1` 的宽列里，可那一列除了这行字什么都没有（文件选择输入是隐藏的），等于白占半行宽。现在说明句移到封面下面、跟着封面一起只占 200px 宽，右列连同外层那行的 `display:flex` 一起删除——整个区块就只剩封面 + 底下一行小字。文案同时由 **Between 1400 and 2048 pixels square (jpg or png).** 收短成 `1400–2048 px square · jpg or png`（200px 宽下原本要折四行）。文件选择输入（`#v2LogoInput`）没动，只是换了位置（现在在左列内、说明句之后）。

**⑦ Social Sharing（社交分享）**

> 2026-09-30 已从此处**整体移出**，独立成 **Social Sharing 区块**（左侧菜单第三项，位于 Settings 之后，见下）。

#### Settings 区块

> 2026-09-30 **新增区块**。原 **More Options** 区块已删除，其中的字段整体并入本区块（More Options 不再存在）。

位于 **Basic Info 之后、Transcripts 之前**（左侧菜单第二项）。区块内自上而下分三段：

**① 基础设置（两列网格，默认全部可见）**

四项以**两列网格**排布：第 1 行为 Season NO. 与 Episode NO.，第 2 行为 Episode Type 与 Content Explicit。

| 字段 | 类型 | 说明 |
|---|---|---|
| **Season NO.** | 文本输入 | 季数，placeholder `e.g. 1` |
| **Episode NO.** | 文本输入 | 集数，placeholder `e.g. 12` |
| **Episode Type** | 下拉 | Full / Trailer / Bonus |
| **Content Explicit** | 下拉 | Clean / Explicit |

**② Episode Tags（紧跟基础设置之后）**

位于 Episode Type / Content Explicit 下方。输入框 placeholder `Select or type tags...`，支持输入即筛选、回车新建标签、退格删除末尾标签。

| 字段 | 类型 | 说明 |
|---|---|---|
| **Episode Tags** | 标签输入 | 可从已有标签中选择，也可直接键入新标签；已选标签在输入框上方以 chip 形式展示 |

**③ More options（默认收起）**

区块的最后一段是一条 **More options** 展开行（带向下箭头），**默认收起**；点击后箭头翻转并展开下面三项，再次点击收起。按钮文案始终是 "More options"（不切换成别的字样）。每次打开 Publish Episode 弹窗都回到收起状态。

| 字段 | 类型 | 说明 |
|---|---|---|
| **Author** | 文本输入 | 作者，placeholder `Enter author name` |
| **Duration** | 文本输入 | 时长，placeholder `e.g. 00:32:15` |
| **Alternative Episode Link** | 文本输入 | 自定义本集 RSS `<link>`；留空则用默认 Podbean 剧集链接 |

#### Social Sharing 区块

> 2026-09-30 **新增为独立区块**，原在 Basic Info 区块内的 ⑦ Social Sharing 整块（标题 + 说明 + 图标行 + YouTube Video Settings 子面板）整体搬到这里。位于 **Settings 之后、Transcripts 之前**（左侧菜单第三项）。

- 说明：`Give your episode more exposure — light up the platforms to auto-share it to your social media on publish.`（2026-10-08 由原来的 Auto-share after publishing — click icons to enable or disable. 换掉，改成先讲好处「给剧集拉更多曝光」、再说操作「点亮平台图标即会自动转发到你的社交账号、发布时生效」）
- 社交图标（点击切换启用/停用）：**Facebook、Tumblr、LinkedIn、YouTube、WordPress**（平台清单与顺序照线上；2026-09-30 把第二个图标由 X (Twitter) 换成 Tumblr）。默认 Facebook / Tumblr / LinkedIn / **YouTube** 为启用态（YouTube 为 2026-10-08 新增的默认点亮），**WordPress** 为停用态。点亮（启用）与鼠标悬停时，图标、描边与底色改用**各平台品牌色**（Facebook 蓝、Tumblr 深蓝、LinkedIn 蓝、YouTube 红、WordPress 蓝），不再统一用绿色；未点亮时仍是中性灰。图标是 **54×54px** 的圆角方块（圆角 13px），里面品牌图形 **24px**（2026-10-08 v2.39 整体放大，原为 42×42px / 图形 18px / 圆角 10px）。
- 点击 YouTube 图标激活时，展开 **YouTube Video Settings** 子面板（同一区块内，在图标行下方，与上面的图标行之间**只留间距、不画分隔线**；标题行**可折叠**、**默认收起**，点标题行才展开下面的字段；展开箭头**紧跟标题名右侧**（与 Settings 里 **More options** 同款，不是推到行末最右端）；子面板整体显隐只由上方 YouTube 图标开关控制）。字段排布为**上下结构**（label 在上、控件在下方占满整行，与弹框其它字段一致，但 label 用小号浅字 13px）。字段照线上（2026-10-08 由原来的 Visibility / Category / Language / Paid Promotion 四行改成下面这一组）：
  - **Title**：文本框，placeholder `YouTube video title. You can leave it blank to use the episode title.`（留空则用剧集标题）。
  - **Description**：多行文本框，placeholder `YouTube video description. You can leave it blank to use the episode description.`（留空则用剧集简介）。
  - **Category**：下拉，默认选中 `Entertainment`，其余为 YouTube 标准分类（Film &amp; Animation、Autos &amp; Vehicles、Music、Gaming、Education、Science &amp; Technology 等）。
  - **Visibility**：单选 Public / Unlisted / Private，默认选中 Public。
  - 图标行**下面**、YouTube Video Settings 子面板**上面**一句提示（在子面板**之外**——子面板收起时它仍然显示；**只在 YouTube 图标点亮时才出现**，图标未点亮时不显示）：`Share to YouTube with episode length in excess of 15 minutes requires YouTube account verification first.`，其中 **requires YouTube account verification** 链到 `https://www.youtube.com/verify`。

> **2026-10-08：YouTube Settings 改成照线上的「YouTube Video Settings」。** 用户贴了线上生产 markup，要求子面板内容照它对齐。两处变化：**① 标题**由「YouTube Settings」改成「YouTube Video Settings」。**② 字段集整体替换**——原来的 Visibility(下拉) / Category / Language / Paid Promotion(复选框) 四行，改成线上的 Title(文本框) / Description(多行文本框) / Category(下拉，默认 Entertainment) / Visibility(单选 Public / Unlisted / Private)，底部另加一句 YouTube 账号验证提示（**requires YouTube account verification** 链到 youtube.com/verify）。**Language 与 Paid Promotion 两个字段移除。** 输入框 / 下拉沿用弹框的「静默态」样式（`.ed-v2-input` / `.ed-v2-select`）。

> **2026-10-08：标题行改为可折叠（默认收起）。** 承接上一条——标题行最初选了不折叠，同日又改成**可折叠**：点标题行展开 / 收起下面的字段与说明句，默认**收起**（名字右侧紧跟的箭头默认向下，展开时翻转向上）；子面板整体仍只由上方 YouTube 图标开关控制显隐，且每次显隐都回到收起的默认态。

> **2026-10-08：点亮 / 悬停的社交图标改用各平台品牌色。** 原先无论哪个平台，图标启用（点亮）与悬停时一律用统一的绿色（描边 + 图标 + 浅绿底）。现在改为按平台取色：每个图标挂一个平台修饰类（`is-facebook` / `is-tumblr` / `is-linkedin` / `is-youtube` / `is-wordpress`），由 CSS 变量 `--sc`（描边与图标色）与 `--sc-bg`（浅色底）驱动——Facebook `#1877f2`、Tumblr `#36465d`、LinkedIn `#0a66c2`、YouTube `#ff0000`、WordPress `#21759b`。未点亮的图标仍是中性灰；点击切换启用/停用的行为不变。

> **2026-10-08：Title / Description 去掉 info 图标，placeholder 换成长句。** 两点变化：**① 去掉 info 图标**——原来 Title、Description 两个字段名右侧各有一个圆圈 i 的信息图标（承载「留空会怎样」的说明），现整体删除，label 退回纯文字（与 Category / Visibility 的标签写法一致）。**② placeholder 换成长句**——Title 由 `YouTube video title` 改成 `YouTube video title. You can leave it blank to use the episode title.`；Description 由 `YouTube video description` 改成 `YouTube video description. You can leave it blank to use the episode description.`。也就是把「留空则用剧集标题 / 简介」的说明从 info 图标挪进了 placeholder 本身。

> **2026-10-08：子面板字段改成上下结构。** 原来四个字段（Title / Description / Category / Visibility）都是「label 在左、固定 100px 宽 + 控件在右」的左右排布，是弹框里唯一这样排的一组——弹框其它字段（Basic Info 的 Title / Description、Settings、两个工作区）一律是 label 在上、控件占满整行。现统一改成**上下结构**：label 在上、控件在下方占满整行（控件本身走 `.ed-v2-input` / `.ed-v2-select` 的 `width:100%`，不再需要 `flex:1` 撑宽）。好处一是与弹框其它字段一致，二是刚加长的 placeholder 不再被左侧 100px 的标签列挤窄、更不容易截断。label 仍沿用子面板原来的小号浅字（13px、`margin-bottom:6px`），**没有**套用主表单那套 16px 加粗的 `.ed-v2-label`——让子面板在视觉上比主表单低一级。

> **2026-10-08：验证提示句移到子面板最上面。** 那句 `Share to YouTube with episode length in excess of 15 minutes requires YouTube account verification first.` 原先放在子面板**最下面**（Visibility 之后），现移到**最上面**——标题行下方、第一个字段（Title）之前，作为进面板第一眼看到的开场提醒（用户：「这句话应该放在上面，而不是最下面吧？」）。间距由 `margin-top:14px` 改成 `margin-bottom:14px`，与下面的字段拉开距离。（后来 v2.31 又把它移出折叠区，间距随之调整——见下一条。）

> **2026-10-08：验证提示句不随字段收起（移到折叠区之外）。** 承接上一条——上一版把提示句放在子面板最上面，但它仍落在可折叠的字段区 `#v2YouTubeSettingsBody` **内部**，默认收起时就看不见。用户指出这句提示**不应该被收起来**（「这句话不应该收起来吧？」）。现把它移到折叠区**外面**：在 `#v2YouTubeSettings` 里、标题行（`#v2YtSettingsToggle`）之下、`#v2YouTubeSettingsBody` 之上，作为与折叠区**平级的兄弟节点**。这样只要 YouTube 图标点亮、子面板显示出来，这句提示就**始终可见**——字段收起时看得到，展开时也仍在字段上方。间距改成 `margin:14px 0 0`（离标题行 14px；展开时折叠区还有自己的 `margin-top:14px` 顶着字段）。

> **2026-10-08：验证提示句再上一层，移到社交图标行下面。** 承接上一条——提示句移出折叠区后虽然常显了，但只要子面板展开它就常驻，导致子面板「收起」时看起来已是完整一块，收起与展开的对比反而不明显了（用户：「这样的话，是不是看起来 youtube video settings 的收起和展开不太明显了」）。用户提议把这句提示再往上放一层。现把它从 `#v2YouTubeSettings` 里搬出来，放进上面 `#v2SocialSharing`（图标行）的**末尾**——即社交图标行下面、YouTube Video Settings 子面板（当时那条横向分隔线）上面。这样两点同时满足：**① 提示句仍然常驻可见**（子面板收起或未显示时都在）；**② 子面板回归「标题行 + 字段」两层结构**，收起时只剩一行标题、展开时多出一组字段，收起 / 展开的对比重新明显。间距仍是 `margin:14px 0 0`。

> **2026-10-08：验证提示句只在 YouTube 点亮时显示。** 承接上一条——提示句搬到图标行下面后变成「只要区块在就显示」，连 YouTube 图标没点亮时也出现（用户在我给的选项里选了「**只在 YouTube 点亮时才显示**」）。实现：给那句 `<p>` 加 `id="v2YtVerifyNote"` 并默认 `display:none`；`toggleYouTubeSettings(connected)` 里除了切子面板，同时把它的 `display` 一起切（`connected ? 'block' : 'none'`）。它**仍留在图标行下面**（子面板之外，所以与标题行的折叠无关：展开 / 收起字段都不影响它，只要 YouTube 亮着它就在）。已发布剧集走 `#v2SocialPublished` 那条分支、图标行整块隐藏，提示自然也不出现。

> **2026-10-08：YouTube Video Settings 上方那条横线去掉。** 用户问「youtube video settings 上方的这个横线 是否可以去掉」，在 AskUserQuestion 里选了「**直接去掉**」。这条 `#v2YouTubeSettings` 行内的 `border-top:1px solid #e2e8f0` 是当天早些时候「删了又加回来」的那两条之一；现在提示句搬到了它上面，这条线就从「分隔图标行 / 子面板」变成了「夹在提示句与标题之间」，语义已经不对，故去掉。`margin-top:16px;padding-top:16px` 原样保留（内部留白不变，只是不再画线）。**注意**：五个区块之间那条 `.ed-v2-panel + .ed-v2-panel` 的横线**照旧保留**——用户只要求去掉卡片内部这条，别顺手把区块之间那条也删了（区块之间那条当天删过一次就被要求加回来过）。

> **2026-10-08：展开箭头挪到标题名右侧，跟 More options 同款。** 用户说「youtube video settings 右侧的箭头，紧跟在名字右侧更好一些吧？类似上面的 more options 的样式」。原来那颗 16px 的 chevron 带 `margin-left:auto`、被推到整行最右端（与标题名之间隔着一大片空白）；现在去掉 `margin-left:auto`，让它跟在标题名后面、只隔一个 8px 的 gap——与 Settings 区块里 **More options** 展开行（`inline-flex` + `gap:6px`，箭头紧跟在文字后）同一套读法。标题行按钮仍是整行宽（点整行都能开合，不只点箭头），箭头在展开时照旧翻转 180°。

> **2026-10-08：Social Sharing 区块的说明句换成「曝光导向」文案。** 原句（Auto-share after publishing — click icons to enable or disable.）只说「点击可启用/停用」，没讲清「点亮才会分享」，也没有点出好处。用户要求换一句更明确的——来回几轮后选定这一句：`Give your episode more exposure — light up the platforms to auto-share it to your social media on publish.`（先给好处「给剧集拉更多曝光」，再说动作「点亮平台图标」，最后说结果「发布时自动转发到你的社交账号」）。样式当时不变（13px 灰字、`margin-bottom:16px`），仍是图标行上方那行副标题；字号随后由 v2.37 调成 14px（见下一条）。

> **2026-10-08：三句说明句字号由 13px 调成 14px。** 用户说「Give your episode more exposure … / Add a transcript … / Add chapter markers … 这些字体大小改为 14」。涉及的正是这三句灰色说明句：**Social Sharing 副标题**（行内 style 改 `font-size:14px`）与 **Transcripts / Chapter Markers 两个入口的说明句**（同用一个类 `.ed-v2-entry-desc`，CSS 由 13px 改 14px）。只改字号，文案、颜色（`#64748b`）、间距（`margin-bottom:16px`）都不动。

> **2026-10-08：YouTube 图标也改为默认点亮。** 用户说「Social Sharing 中，youtube 也默认为点亮的状态」。两个改动：① YouTube 图标加上 `active` 类（默认点亮，与 Facebook / Tumblr / LinkedIn 一致；WordPress 仍默认关闭）。② 因为点亮的 YouTube 会带出下面的 **YouTube Video Settings 子面板**与那句**验证提示句**，打开弹窗时需要让它们的初始态跟着图标走——否则会出现「图标亮着、子面板却不见」的矛盾。做法是把 `setSocialSharingVariant(status)` 末尾那行（原来是「若已发布则 toggleYouTubeSettings(false)」）换成读图标自身的 `active` 类来定初始显隐：传给 `toggleYouTubeSettings()` 的参数改为「非已发布 **且** YouTube 图标带 active 类」。于是未发布剧集打开时子面板与提示句默认就是显示的（子面板内部仍默认折叠、只露标题行）；已发布时整排图标隐藏，子面板照旧收起。

> **2026-10-08：社交图标整体放大（外框 54px / 品牌图形 24px / 圆角 13px）。** 用户说「Social Sharing 中，icons 宽高改为 54」。图标外框原先是 42×42px 的圆角方块（圆角 10px），里面品牌图形 18px；现整体按比例放大——外框 54×54px、圆角 13px，区块内 5 个品牌 SVG 同步由 18px 改成 24px，图形与外框的比例基本不变（不是只放大外框、让图形显得空）。图标之间的间距仍是 10px，点亮 / 悬停改用各平台品牌色的规则、点击切换启用 / 停用的行为都不变。

- **区块本身始终显示**，不随剧集状态隐藏；但**区块内部按状态换内容**（2026-09-30 定稿）：
  - **未发布**（Draft / Future / AI Finished 等）→ 显示上面的图标行，用户可点选要自动分享到哪些渠道。
  - **已发布（Published）**→ 显示：`This episode is published. Check its sharing status and embed options on the Share &amp; Embed page.` + 一个 **`View Share & Embed`** 按钮；点击关闭 Publish Episode 弹窗并进入 **Share & Embed 页面**（见 9.3）。已发布的剧集分享渠道早已确定，这里不再给可点的图标；原先的图标行与 YouTube Video Settings 子面板一并隐藏。
  - 原来「编辑已发布剧集时隐藏**整个区块**」的行为已于 2026-09-30 取消（用户选择「不再隐藏，始终显示」）。

#### Transcripts 区块

**① 入口卡片（弹窗页内的唯一内容）**

弹窗页的 Transcripts 区块**不再包含播放器与编辑器**，只有一个入口；真正的编辑在**整屏工作区**中进行（见 ②）。区块标题就是干净的名词 **`Transcripts`**。结构与 **Social Sharing** 区块一致（扁平排版：标题下一行灰色说明，下面跟按钮），按是否已有内容呈现两种状态：

| 状态 | 展示 |
|---|---|
| **空状态**（默认） | 说明文案 `Add a transcript to improve your SEO and let listeners read along.`，下方**只有一个** **Add** 按钮（打开工作区） |
| **已有内容** | 说明文案**照旧显示**；下方一行是**只有一个** **Edit** 按钮（打开工作区继续编辑），状态文案 `Transcript added`（带回勾图标）跟在按钮**右侧**、与按钮同一行 |

- 说明文案**空态与满态都显示**（2026-10-08 v2.43 起；此前满态会把它藏掉）。自 v2.45 起，状态确认语不再是说明句下面独立的一行，而是**跟 Edit 按钮并排、落在按钮右侧**——满态于是收成「说明句 + 一行动作」两行。
- 打开编辑弹窗时该集若已有 transcript，区块直接呈现「已有内容」状态。
- **AI Finished 剧集**（2026-10-09 v2.86）：**进弹框时就是「已有内容」态** —— 工作区里已预填一段 AI 转写（带时间戳与说话人前缀的多行文本），卡片直接显示 `Transcript added`；其它状态仍回到空态。
- **满态不再有统计行**（2026-10-08 v2.44 起）：v2.42 曾在状态文案与按钮之间放过一行**统计**（转写报**字数**，如 **1,284 words**），现已连同容器、样式与渲染函数一起删除——满态只保留「说明句 + 一行动作（Edit · 状态确认语）」。刻意**不展示转写内容本身**的理由不变（拉取正文要多一次请求、还要解析 SRT/VTT 时间轴，成本高而收益有限）。

> **2026-09-30：标题不标 (Optional)。** 当天一度在标题后加过括号标注（**Transcripts (Optional)**，括号部分字号小一档、不加粗），随后撤掉，恢复成干净的名词。原因是三点：① 弹窗里真正必填的只有 Basic Info 的标题，只在最后两个区块挂 (Optional) 会反过来暗示其余区块是必填的；② 左侧锚点菜单用的是 **Transcripts**，同一个区块出现两个名字；③ 空卡片本身（一行说明 + 一个 Add 按钮、没有报错样式）已经表达了「不填也行」。**Chapter Markers** 同理。

> **2026-10-08：改成扁平结构，与 Social Sharing 对齐。** 原先这两块是「浅灰圆角卡片 + 左侧绿色图标徽章 + 右对齐按钮」；现在去掉外框、底色与图标徽章，改成与 Social Sharing 相同的节奏：标题下一行 14px 灰色说明（原先 13px，v2.37 调成 14px），下面跟一个按钮，外层同用 `.ed-v2-card`。两态（空状态 / 已有内容）与按钮接线都不变，仍由容器上的 `is-empty` / `is-filled` 切换。

**② Transcripts 工作区（整屏 overlay）**

点击 **Add** 或 **Edit** 打开，覆盖整个页面。顶栏：左侧 **Close**、中间标题 `Transcripts`、右侧 **Save**。

- **音频播放器**：播放/暂停按钮、文件名、当前时间、进度条、总时长；进度条可点击跳转。
- **Episode Transcripts 区块**：
  - **Upload SRT/VTT** 按钮：上传 .srt / .vtt 字幕文件，内容读入文本域。
  - **Download** 按钮 + 下拉：`Captions (.srt)` 或 `Plain Text (.txt)`。下载 .txt 时会自动剥离 SRT 时间轴编号。
  - **Transcript** 文本域：可粘贴/输入转写文本，placeholder：`Paste or write your episode transcript here...`
  - 底部提示：`Paste or type your transcript above, or upload a .srt or .vtt file.`
- **Save**：关闭工作区并把内容应用到当前剧集，Toast `Transcript saved and applied to your episode.`；**Close** 直接返回、不保存。

#### Chapter Markers 区块

**① 入口卡片（弹窗页内的唯一内容）**

与 Transcripts 区块同构（含 2026-10-08 起的扁平结构与 `.ed-v2-card` 容器），区块标题写作 **`Chapter Markers`**：

| 状态 | 展示 |
|---|---|
| **已有内容**（默认，2026-10-08 起） | 说明文案**照旧显示**；下方一行是**只有一个** **Edit** 按钮，状态文案 `Chapters added` 跟在按钮**右侧**、与按钮同一行 |
| **空状态** | 说明文案 `Add chapters so listeners can jump to the moments that matter.`，下方**只有一个** **Add** 按钮（把 3 条默认章节全删光后回到这一态） |

- **满态不再有统计行**（2026-10-08 v2.44 起）：v2.42 曾在状态文案下方放过一行**统计**——章节报**时间跨度**（最早与最晚两个章节的时间，如 **Covers 00:00 – 15:38**），现已与 Transcripts 同步删除。状态确认语本身也从 `N chapters added`（带章节数）改回固定的 `Chapters added`——用户要求「计数去掉」。
- **AI Finished 剧集**（2026-10-09 v2.86）：章节换成 **5 条 AI 生成的章节**（`00:00 Introduction` / `01:02 The short answer` / `02:47 Step by step` / `05:31 The one thing to remember` / `08:19 Wrap-up and show notes`）；其它状态用的是默认那 3 条演示章节（`Introduction` / `Setting the scene` / `Listener questions and wrap-up`）——两套都保留，切换剧集时会各自复位。
- 说明文案同样**空态与满态都显示**（2026-10-08 v2.43 起）；满态时为「说明句 + 一行动作（Edit · 状态确认语）」，两行——状态确认语与 Edit 并排、落在按钮右侧（v2.45 起，与 Transcripts 一致）。

**② Chapter Markers 工作区（整屏 overlay）**

点击 **Add** 或 **Edit** 打开。顶栏：左侧 **Close**、中间标题 `Chapter Markers`、右侧 **Save**。

- **音频播放器**：播放/暂停按钮、文件名、当前时间、进度条、总时长。两个工作区各有一个播放器 UI，共用一个隐藏的音频元素。播放时实时更新 **Add Chapter** 按钮上的当前时间标签。
- **Chapters 区块**：
  - 标题：`Chapters`，右侧显示总数（默认 `3 total`，增删后实时更新，如 `8 total`）。
  - 表格列：Time（点击可跳转播放到该时间点）、Title、删除按钮。
  - 空状态：`No chapters yet. Use the player or the form above to add one.`
  - **Add Chapter 按钮**：从播放器当前位置添加章节，打开 **Add Chapter** 弹窗：
    - **Start Time (mm:ss)**：播放器当前时间自动填入，可手动修改。
    - **Chapter Title**：章节标题。
    - Cancel / Add Chapter（Enter 也可提交）。
    - 时间格式校验：`mm:ss` 或 `hh:mm:ss`。
  - 章节按时间自动排序。
- **Save**：关闭工作区并应用，Toast `Chapters saved and applied to your episode.`；**Close** 直接返回、不保存。

> **2026-09-30：AI 生成流程已整体移除。** 原先两张入口卡片空状态下各有一个 **Generate with Podbean AI** 按钮，走「扣费确认弹窗 → 生成中三态 → 5 秒后自动写入一次生成的 Transcripts + Chapter Markers」这套流程；现已按用户要求**连同逻辑一起删干净**：两个按钮、扣费确认弹窗、入口卡片的「生成中」状态、相关函数与示例数据、两条 Toast、以及配套 CSS 全部移除。现在 Transcripts 与 Chapter Markers **只能手动添加**（`Add` → 整屏工作区；已有内容时是 `Edit`）。入口卡片由**三态回到两态**（空状态 / 已有内容）。原先「按钮写 Generate with Podbean AI、弹窗与状态文案写 AI Content Assistant」的有意不一致也随之作废。

> **2026-10-08：Chapter Markers 默认预置 3 条章节。** 用户说「Chapter Markers 默认写3个」。原先章节列表（`v2ChaptersList`）起手是空数组，打开工作区只看到空状态；现在预置 **3 条示例章节**——**00:00 Introduction** / **04:12 Setting the scene** / **15:38 Listener questions and wrap-up**，时间统一 `mm:ss` 格式且按时间升序排列。连带效果：弹窗页的入口卡片打开时就是**已有内容**态（状态文案 `Chapters added` + 只有一个 **Edit** 按钮；v2.40 当时写的是 **3 chapters added**，v2.44 去掉了数字），不再默认空状态；工作区里的总数也从 `0 total` 变成 `3 total`。把 3 条删光后仍会回到空状态与 **Add** 按钮（空态兜底没删）。**Add / Edit / Save / 删除 / 按时间排序** 等交互一概不变——填充 / 空两种态仍按「有没有章节」推导，没有为预置数据单开分支。

> **2026-10-08：入口卡片「已有内容」态那行统计删除——有内容只显示确认语。** 这一版之前走过两步弯路，一并记在这里。**第一步**按「露出内容本身」做：章节列前 3 条、转写取前 2 行，多于 3 条折成一行 **+N more**；用户追问「这样显示预览，会不会技术上比较复杂呢」——真正的成本不在渲染，而在**转写正文的获取**（详情接口若不带正文，就得在打开弹窗时单发一次请求，还要背上「加载中 / 空 / 失败」三个状态）与**字幕格式解析**（上传入口接受 .srt / .vtt，直接读文本框原文会把 `1` 和 `00:00:00,000 --> 00:00:04,000` 当成正文显示出来）。**第二步**改成「只显示统计」——转写报**字数**、章节报**时间跨度**，那一行排在状态行与按钮之间、默认 `display:none`、只有卡片带 `is-filled` 才显示。**第三步（本版）**：用户仍然要求「Transcripts 和 Chapter Markers 的计数去掉，如果有内容只显示 Transcript added 和 chapters added」，于是这行连同它的两个容器（`.ed-v2-entry-meta`）、两条 CSS 规则与四个渲染函数一起删除。**满态卡片回到最简：说明句 → 状态确认语 → Edit**；章节的状态确认语也从带数字的写法改回固定的 `Chapters added`（不再有 `1 chapter added` / `3 chapters added` 这种带数量的版本，写它的那行 JS 和那个元素 id 也一并删掉）。空状态不受影响。三步走下来，结论是**「已有内容」态的留白不是靠往卡片里加东西解决的**——最后是下一条「说明句常驻」（纯 CSS）搞定的。

> **2026-10-08：入口说明句改成空态 / 满态都显示。** 加了统计行之后用户仍觉得「还是感觉太空了」，提议「Add a transcript to improve your SEO and let listeners read along. 这种文字，不论是否为空，都显示呢」。原先满态靠 `.ed-v2-entry.is-filled .ed-v2-entry-desc { display: none }` 把这行说明句藏掉、让状态文案顶替它的位置；现在**这条规则整体删除**，说明句常驻，状态文案改成**追加**在它下面。状态行的 `margin-bottom` 当时由 16px 收到 **6px**（为的是跟下面那行统计挨紧；v2.44 把统计行删掉后又调回 **16px**）。于是满态卡片变成三行：说明句 → 状态行 → 按钮；空态不变（说明句 → Add）。（v2.45 又把这条状态确认语挪去跟 Edit 同排，三行随之收成两行；它自带的底边距也一并取消。）这不是 JS 的活儿——`entry-desc` 在脚本里一次都没出现过，纯粹是 CSS 显隐规则的删改。

> **2026-10-08：状态确认语挪到 Edit 按钮右侧。** 用户看完成品后提议「Chapters added 和 Transcript added 是不是可以放在 Edit 按钮的右侧？」。原先这行确认语（`Transcript added` / `Chapters added`）是说明句下面**独立的一行**，跟按钮分成两行；现在把它**搬进满态容器、排在 Edit 之后**，靠容器的 `gap` 与按钮隔开，两者落在同一行。它因此不再需要「只在满态显示」的显隐规则（外层 `.ed-v2-entry-filled` 本来就只在满态出现），也不再自带 `margin-bottom`。满态卡片由三行收成**两行**：说明句 →（Edit · 状态确认语）；空态完全不受影响（说明句 → Add）。两个区块（Transcripts 与 Chapter Markers）同步改动。

> **2026-10-09：统一章节术语——功能名 `Chapter Markers`，条目与计数一律 chapter(s)。** 用户问「Chapter Markers 和 Chapter 是同样的意思么，哪一个更好」，结论是二者不是同义替换、而是各管一层：**Chapter Markers** 是功能与区块名，指时间轴上用来标出章节起点的那类标记；**chapter** 是内容单元本身（一个带标题与时间范围的段落）。核对过线上与业界用法——Podbean 自己的 Publish Episode 页面那个区块就叫 **Episode Chapter Markers**、新增按钮是 **+ Add Chapter**，而 Apple Podcasts 与 Spotify 的界面及 RSS 规范（`podcast:chapters`、Podlove Simple Chapters）统一说 **chapters**。于是定下：**容器与功能名保留 `Chapter Markers`**（左侧菜单项、区块标题、工作区顶栏标题，以及 AI 功能列表里的 `Precisely Crafted Chapter Markers` 都不动），**凡是讲到「加 / 有几个章节」的正文一律用 chapter(s)**。本版共改五处：入口说明句 **Add chapter markers …** → `Add chapters so listeners can jump to the moments that matter.`；工作区空态（静态 markup 与 `renderChapterList()` 里各一份）**No chapter markers yet. …** → `No chapters yet. Use the player or the form above to add one.`；**Add Chapter Marker** 弹窗标题 → **Add Chapter**（与它自己那颗 `Add Chapter` 按钮、以及 `Chapter Title` 字段名对齐）；保存 Toast **Chapter markers saved and applied …** → `Chapters saved and applied to your episode.`；播放提示 **…to add chapter markers at current time.** → **…to add a chapter at the current time.**。本来就合规的 `Chapters` 区块标题、`Chapters added` 状态语、`Add Chapter` 按钮与 `Chapter Title` 字段名都未动。**判据**：`Chapter Markers` 只出现在「区块/菜单/工作区标题」这类位置；正文里一旦是「加 / 有几个」就用 chapter(s)。

---

### 7.3 音频预览弹框（AI Finished 专用）

Media File 行里的 **Preview** 打开它：一块居中白卡（上限 560px），**标题就是 `Preview and Select Your Preferred File`**（同日又一轮：把这句从句下 tagline 提成了标题，副标题整行去掉），下面**上下两条播放器**（**Optimized 在上、Original 在下**）：

| 顺序 | 标签 | 文件名 | 时长（演示值） |
|---|---|---|---|
| 上 | **Optimized audio** | `<剧集标题>_optimized.mp3` | 18:40 |
| 下 | **Original audio** | `<剧集标题>.mp3` | 18:42 |

- 两条各自独立：点播放键切换播放 / 暂停（图标换成暂停），进度条与两端时间往前走；**mockup 里没有真实音频文件，所以只是假计时**，用来表达「这里能试听」，不假装真的发声。
- **选一条应用到 Media File**：每条**标签行整行可点**，左侧一个**单选圆点** —— 点哪条就把那条**写回 Media File**（`<剧集标题>.mp3` 或 `<剧集标题>_optimized.mp3`）并关闭弹框；**当前 Media File 正在用的那一条圆点填实**（选中态，`aria-checked="true"`），所以重新打开时一眼看得出现在的选择。两条互斥，用单选而不是勾选。
- **没有 Close 按钮**（用户要求去掉右侧的 Close）：做选择就是离开这个弹框的正常方式；不想改就走 **点遮罩**或 **Esc**。
- 关闭时会清掉两条的计时器与进度（下次打开回到 0:00）。

> **2026-10-09（v2.86）：AI Finished 剧集在 Publish 弹框里带上四处 AI 内容。** 用户：「如果是点击 AI Finished episodes，那么在 Publish Episode 弹框页面，Title 要右侧要有 More，给 3 个推荐，让用户选择一个，Description 里面也要有文字。Transcripts 和 Chapter Markers 也要内容。Media File 里面显示的是优化后的音频，右侧显示一个 Preview 点击弹框显示原始音频和优化后的音频。」动手前确认四件事（都按建议定）：**More 点开是下拉列表**、**推荐按标题派生**、**预览里两条自绘 mock 播放器**、**只在 AI Finished 生效**。
>
> **落地**：新增 `applyAiFinishedContent(ep)` 一处进、一处出 —— AI Finished 时填 AI 内容，**其它状态整套复位**（弹框是复用的，不复位就会把上一集的 AI 内容留到下一集）。四个部分：
> ① **Title**：`.ed-v2-label-row` 把标签与右边那颗 `More`（`#v2TitleMore`）排一行，下面挂 `#v2TitleSuggestions` 下拉；`aiTitleSuggestions(ep)` 取标题冒号/破折号前的**主干**套三种句式生成 3 条，每条带一句推荐理由小字；点一条 `pickTitleSuggestion()` 回填输入框。点别处收起（与行菜单同一套做法）。
> ② **Description**：`aiDescriptionHtml(ep)` 两段 AI 正文（首句嵌入标题主干）。
> ③ **Transcripts / Chapter Markers**：`aiTranscriptText(ep)`（6 行带时间戳与说话人）填进工作区的 `#v2Transcript`，卡片因此直接是「已有内容」态；`aiChapters(ep)` 换成 5 条 AI 章节。**默认那 3 条章节抽成了 `V2_DEFAULT_CHAPTERS`**，就是为了能整套复位回来。
> ④ **Media File**：文件名变成 `<剧集标题>_optimized.mp3`，并在 ✕ **左侧**加一颗 `Preview`（`#v2AudioPreview`）→ 打开 **7.3 的音频预览弹框**。
>
> **两处顺带说明**：`More` 与 `Preview` 平时 `display:none`，只有 AI Finished 时加 `.show`（所以非 AI Finished 的剧集看不到这两样）；音频预览弹框的 `z-index:700`，比上传页（200）、确认框（500）、AI 处理弹框（650）都高。
>
> **同日追加（同属 v2.86）**：用户看过成品后要求「Audio Preview 弹框中，允许用户选择某一个音频应用到 media file 中；preview 右侧不要有 close」。于是**去掉右下角的 Close**，改成每条可选中并应用（`usePreviewAudio(kind)` → `setMediaFileState(...)` 写回 + 关闭；判断当前选择靠比对 `mediaFileBaseName()` 与这一条的名字）。没有 Close 之后，「不想改就走」的出口是**点遮罩或 Esc**（Esc 监听是在这次加的）。连带删掉 `.audio-preview-actions` 两条 CSS。
>
> **再一轮（同属 v2.86）：More 挪进 Title 框内、AI Finished 时去掉 Media File 的 ✕。** 用户：「Preview 文字右侧不要有 ✕ 的 icon 和功能。Title 框右侧的 More 能不能也像 Preview 一样，放在里面」。两处：
> ① **More 由「标签右侧」挪进输入框内部右端** —— 与 Media File 行里 Preview 的位置语言对齐；做法是把 More 绝对定位在输入框右端（`right:14px` + 垂直居中）、并给输入框加 `padding-right:62px` 让位，**输入框的静默态一律不动**；标签回到普通 `<div class="ed-v2-label">`，连带删掉为它加过的 `.ed-v2-label-row`（连同 CSS）。
> ② **AI Finished 时把 Media File 的 ✕ 隐藏**（`display:none`，图标与「移除文件」功能一起拿掉）—— **只针对 AI Finished**（用户确认过范围）：那时文件名旁边是 Preview，✕ 与它挤在一起；其它状态仍有 ✕/Upload，上传后可以移除或更换文件。管这三个控件（More / Preview / ✕）的 helper 顺势从 `setTitleMoreVisible()` 改名为 **`setAiFinishedControlsVisible()`**。
>
> **再一轮（同属 v2.86）：把那句 tagline 提成标题、去掉副标题。** 用户：「直接把 `Preview and Select Your Preferred File` 作为标题，不要 tagline 了」。落地：标题文案换成这句、`<div class="audio-preview-sub">` 整行删除，并把 `.audio-preview-sub` 那条 CSS **一并删掉**（没有使用者了）；原来 22px 的间隔是靠副标题撑的，副标题一走标题会贴住第一条播放器，所以**把 22px 并进 `.audio-preview-title` 的 `margin-bottom`**（字号 18px/700 不变）。
>
> **再一轮（同属 v2.86）：顺序与副标题。** 用户：「Optimized audio 要放在 original audio 上面。文字 `Compare the original upload with the AI Audio Optimization result.` 改为 `Preview and Select Your Preferred File`」。**两块是整段调换的**（`audioPrevPlayOptimized` / `audioPrevNameOptimized` 这些 id 跟着各自那块一起走，不是只把标签文字对调），副标题同时换掉。
>
> **再一轮：那两段文字也去掉，换成单选圆点。** 用户问「Use this audio、Applied 这两个可以不用文字么，有没有其他表现方式，例如勾选这类的？」——**改用单选圆点**（两条本来就是互斥的二选一，单选比勾选更贴语义）：每条标签行左侧一个圆点，**实心 = 当前 Media File 正在用的那条**（`aria-checked` 同步）；**整行都可点**（比一颗小控件好点中），点哪条就把那条写回并关闭；点当前已选中的那条也一样——不改内容、只是关闭。删掉了 `.audio-preview-use` 那一套（文字按钮）与它的 `disabled` / `Applied` 文案。
>
> **踩坑**：写 AI 文案时用 Python 往 JS 单引号字符串里塞带撇号的英文（`You'll` / `we're` / `I'll`），**转义在多层处理里丢了一次**，导致 JS 字符串提前结束、整段脚本语法错误（校验脚本第 0 条「整段内联脚本语法可解析」当场抓到）。修法是把这些字符串改成**双引号**，撇号就不用转义了。**含撇号的英文文案，别用单引号包。** 文首版本号 → **v2.86**。

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

## 9. 其他弹窗与独立页面

> 本章 9.1 / 9.2 是弹窗；**9.3 自 2026-09-30 起是「独立页面」而不是弹窗**（菜单里没有它的条目，从剧集列表或 Social Sharing 区块进入），保留原有编号以免改动全篇交叉引用。

### 9.1 Schedule Publish（定时发布）

模态弹窗：

- 标题：`Schedule Publish`；说明：`Choose the date and time to publish this episode.`
- **Current time 参考行**：位于 **Cancel / Schedule 按钮下方**（弹窗底部，以细分隔线隔开），显示 `Current time: …`（如 `Current time: Aug 14, 2026 9:41 PM EDT`），实时显示当前时间（每秒更新，仅弹窗打开时刷新）；时区由 **Settings → Podcast Info → Author & Region → Timezone** 控制。
- **Date**（日期输入框）、**Time**（时间输入框）：打开时预填**当前排定值**（编辑 Future 剧集时，从该剧集的 schedule 数据读取）；否则预填**当前时间**。
- 按钮：Cancel / **Schedule**。
- 未填日期或时间时**就地标红**（同发布按钮那一套，2026-10-09 v2.88 起）：缺哪个标哪个，两条红色小字分别是 `Select a date to schedule this episode.` / `Select a time to schedule this episode.`，**滚到并聚焦第一个缺的字段**（先日期后时间）；**不弹 Toast**，也**不跳转**。两个输入框一改动就清掉红框。成功则**关闭弹窗、回到进入前的那个列表页**，并 Toast 显示 `Episode scheduled successfully!`。

### 9.2 Unsaved Changes（未保存修改确认）

当从 Publish Episode 弹窗点击 Cancel/返回且存在未保存修改时弹出：

- 标题：`Unsaved Changes`；说明：`You have unsaved changes. Are you sure you want to leave?`
- 按钮：**Leave**（离开，回到 New Episode 弹窗）/ **Stay**（留在当前页）。

### 9.3 Share & Embed 页面（分享/嵌入）

> 2026-09-30：**由弹窗改为整页**。左侧菜单里**没有**这一项——它是从剧集列表的行操作菜单（`…` → **Share & Embed**）或 Publish Episode 弹窗的 **Social Sharing 区块**（已发布剧集里的 **View Share & Embed** 按钮）进入的独立页面。页面左上角有 **`← Back to Episodes`**，返回到**进入前的那个列表页**（Episodes / Episodes (apple) / Episodes (free plan)）。发布成功后也会自动跳到这里（见 11.2）。

页面顶部**没有**页标题，也**没有**剧集信息（封面 / 标题 / 状态徽章 / 日期）——整块已在 2026-10-09 v2.50 删除，页面从 **`← Back to Episodes`** 直接进入两个 Tab。内部含两个 Tab：

> **【已作废 · v2.50 已删整块】** **2026-10-09：顶部剧集 Logo 放大到 180×180。** 用户要求把 Share & Embed 页面顶部的剧集封面（`.share-episode-logo`）宽高由 **72px** 改成 **180px**。只改了这一条 CSS 的 `width` / `height`——圆角方框仍是 `border-radius:12px` + `overflow:hidden`、`flex-shrink:0` 不变，里面的 `<img>` 继续 `width/height:100%` + `object-fit:cover` 铺满并裁切，所以换尺寸不必动任何其它规则。右侧那列剧集信息（标题 / 状态 / 日期）仍是 `align-items:flex-start` 顶端对齐（同日的下一条把状态 / 日期那行改成了沉底对齐 + 16px，见下）。

> **【已作废 · v2.50 已删整块】** **2026-10-09：状态 / 日期那行沉到 Logo 底部对齐，字号统一 16px。** 用户要求「Future Jun 26, 2026 的文字…与 `.share-episode-logo` 的底部对齐…文字大小为 16px」。把右侧那一列 `.share-episode-meta` 加 `align-self: stretch` 撑满 Logo 的 180px 高、再配 `justify-content: space-between`——**标题留在顶部，状态徽章 `Future` 与日期 `Jun 26, 2026` 落到 Logo 底部对齐**（父级 `.share-episode-header` 仍是 `align-items: flex-start`，只让这一列拉高，不是把整行都撑开）。字号方面：状态徽章由 **11px**、日期由 **13px** 一起改成 **16px**（与标题同号，徽章仍是大写 + 字间距、颜色由 JS 按剧集状态给、无底色；日期仍是浅灰 `#94a3b8`）。`padding-top: 6px` 保留。

> **【已作废 · v2.50 已删整块】** **2026-10-09：拉开 Logo 与右侧信息列的左距，并放大标题行距。** 用户要求「`share-episode-title` 和 `share-episode-sub` 左侧距离 logo 远一点，`share-episode-title` 的行间距大一点」。落地两条：① `.share-episode-header` 的 `gap`（正是 Logo 与信息列之间的左距）由 **14px** 改成 **24px**；② `.share-episode-title` 的 `line-height` 由 **1.3** 改成 **1.5**（字号仍 16px、加粗 700 不变）。父级仍是 `align-items: flex-start`、标题仍贴顶、状态/日期仍沉底，只动了间距与行距。

> **2026-10-09（v2.50）：** **整个顶部信息块删除——页面从返回按钮直接进入两个 Tab。** 用户看完上面三处调整后的实际布局（拿一个真实的长标题剧集，像 `English Idioms in Everyday Life: A Complete Guide to Understanding and Using Common Expressions Naturally…` 这种），要求把顶部的 **页标题 `Share & Embed` + 剧集标题 + `Future Jun 26, 2026`** 一并去掉；确认范围时他选的是「顶部整块都去掉」。落地：删掉 `.dash-header`（那个 32px 的大标题）与整个 `.share-modal-header` 块（含封面、剧集标题、状态、日期）；CSS 侧连带移除 `.share-episode-header / -logo / -meta / -title / -sub / -status / -date` 全部规则、`.share-modal-header` 及其 60px 顶部留白、页面作用域的 `#page-shareembed .share-modal-header { padding: 0 }` 覆盖，以及早就没人用的 `.share-modal-header .share-title`；JS 侧删掉 `shareEpisode()` 里往 `#shareEpisodeTitle / #shareEpisodeDate / #shareEpisodeStatus` 写值的那三行与按状态取色的 `statusColors` 映射（元素没了再写会抛 null，必须一起删）。**上面三条 v2.47–v2.49 的调整随之全部作废**（180×180 封面、24px 左距、1.5 行距现在都不存在了），别再按那三条的记录加回来。剧集标题仍存在 `dataset.episodeTitle` 上，供分享/嵌入逻辑取用。文首版本号 → **v2.50**。

> **【已被 v2.76 改为 20px】** **2026-10-09（v2.51）：** 两个 Tab（`Share` / `Embed Player`）字号放大到 **24px**。用户要求「share-body-tab 的字体大小改为 24px」。只改 `.share-body-tab` 的 `font-size`（**16px → 24px**）；字重 600、默认灰字与 `.active` 时的深色字、`letter-spacing: .02em`、以及那颗 2px 绿色下划线指示条都不变。文首版本号 → **v2.51**。

> **2026-10-09（v2.52）：** Share tab 的分组与标题统一、链接块补标题、输入框收窄。用户问「shareBodyTab 里面的内容布局合理么」，我给了三条最小改动并获同意，本版就做这三条：① **链接块补上标题 `Link`**——原来三个块里只有 **Share to** 与 **Auto-share Status** 有标题，最重要的链接块反而是光秃秃三个药丸加一个输入框，层级不齐；② **输入框 field 加 `max-width: 600px`**——原先 `.share-url-input` 是 `flex:1`，在约 960px 宽的容器里撑满整行，那颗 32px 的复制图标被甩到几百像素之外、中间一大段空；③ **两个 Tab 共用 `.share-section` + `.share-section-title`**——Share 这边的分组原本是手写的行内 `div`（`margin-bottom:24px` + 行内 `13px/600/#1e293b` 标题），Embed 那边用的是 `.share-section`，而 CSS 里定义的 `.share-section-title`（`13px/600/#64748b` + 大写 + 字间距）**一个元素都没在用、属于死 CSS**。现在把它**复活成实际在用的那套取值**（13px / 600 / `#1e293b`、底距 10px，去掉大写与字间距），三个块统一改成 `.share-section` + `.share-section-title`。因为取值照搬原行内样式，**观感上只有「多了一个 Link 标题」与「输入框变短」两处变化**。
>
> 同一轮评审里**认可但本版没做**的几点，留档备查：④ 右半边仍然空（三个块都靠左、整页可用宽度只用了一半），彻底解决要收窄正文或排两列；⑤ 「Share to」那排按钮与 Publish 弹窗里的社媒图标长得像但含义不同（这里是「现在分享一次」，弹窗里是「发布时自动分享」开关，平台集合也不一样），有误读风险；⑥ **Auto-share Status** 是自动分享的第二处入口、且没有任何状态指示（只是一段灰字），可与弹窗里的 Social Sharing 合并或升级成带状态点的小卡；⑦ 三个药丸把 "URL" 重复了三遍；⑧ `.share-url-tab` 等控件描边仍是 `#d1d5db`，而弹框里已于 2026-10-08 统一成 `#e2e8f0`。

> **2026-10-09（v2.53）：** Share tab 的内容整体放大一档，配 24px 的 body tab。用户说「shareBodyTab 里面的内容太小了，要符合现在简洁大气的感觉」——v2.51 把两个 Tab 提到 24px 之后，下面 13px 的小节标题与控件就显得偏小，比例不搭。本版把 **Share tab 自己那几个类**统一放大：小节标题 **13px → 16px**（底距 10px → 14px）；三个 URL 类型药丸 **13px → 15px**（内边距 6px 14px → **9px 16px**、圆角 6px → 8px）；URL 输入框 **13px → 15px**（内边距 8px 12px → **11px 14px**、圆角 6px → 8px）；复制按钮 **32×32 → 38×38**（圆角 6px → 8px，图标 14px → **16px**）；四个社交方块 **60×60 → 72×72**（圆角 12px → 14px，品牌图形 20px → **24px**，标签 **11px → 13px**，间距 10px → 12px）；Auto-share 那段说明句 **12px → 14px**；链接字段上限 600px → **640px**（字号变大后免得 URL 被截太早）。**改的全是只在 Share tab 用的类**（Embed tab 用的是 `.share-section` / `.share-player-style` / `.share-opt-*`，一个没动，见下条）。图标尺寸是用 **CSS 覆盖 SVG 上的 `width`/`height` 属性**（表现属性优先级最低）实现的，所以 markup 一行没改。文首版本号 → **v2.53**。

> **2026-10-09（v2.54）：** Share tab 的**三个小节标题整体去掉**（`Link` / `Share to` / `Auto-share Status`）。用户问「是不是可以不要 Link、Share to 和 Auto-share Status 的标题」，确认后选了「三个标题全去掉」。判断依据：**这三个标题都在重复内容已经说了的信息**——链接块的三个药丸自己写着 `Episode URL / Download URL / Share URL`，社交那排图标各自带着 `Facebook / X / LinkedIn / Email` 的名字，Auto-share 那段话第一句就是 `Auto-share is not enabled.`；而**三个 16px 加粗标题是整个 Share tab 里最重的字**，去掉之后层级只剩「24px body tab → 正文」两层，更贴「简洁大气」的方向。落地：删掉三个 `<div class="share-section-title">`，连带把 `.share-section-title` 这条 CSS 规则**整条删除**（v2.52 才把它从死 CSS 里复活、v2.53 又放大过一次，现在它再次没有使用者）；**`.share-section` 保留**——三个块仍靠它那 `margin-bottom: 24px` 分组，分组感只是从「标题 + 间距」简化成「纯间距」。留一个已知副作用备查：社交那排图标少了 `Share to` 的引导，会更像 Publish 弹窗里那排社交渠道开关（即上一条的 ⑤ 点），日后若要处理，方向是加句内提示而不是把标题加回来。文首版本号 → **v2.54**。

> **2026-10-09（v2.55）：** 社交图标行补一句**句内提示**，与 Publish 弹窗里的自动分享开关区分开。这是上一条留下的已知副作用落地的处理：少了 `Share to` 之后，这排图标更像 Publish 弹窗 Social Sharing 里那排「发布时自动分享」的渠道开关。用户要求「改成像 `Share this episode` 这样的句内提示」，于是**在图标行上方补一句灰字**：`Share this episode — clicking a platform sends it to your account right now.`（14px / `#64748b`，只占一行）。
>
> **注意这不是把标题加回来**：v2.54 删标题是因为「标题在重复内容已经说了的信息」；而**这一句补的正是标题没说的信息**——**时间**。两边都是「分享到社交账号」，区别在于弹窗里是「**以后发布时**自动分享」，这里是「**点一下现在就发**」，所以句子落在 `right now` 上。另外两个块（链接、Auto-share）维持无标题。文首版本号 → **v2.55**。

> **2026-10-09（v2.56）：** Share tab 收成**一条 640px 的内容栏**，纵向节奏也对齐。用户说「shareBodyTab 里面的内容布局有点乱」。诊断出两件事：① **五块的右边缘各不相同**——三颗药丸约 400px、输入框（含复制按钮）640px、提示句约 610px、四个社交方块合计 324px、Auto-share 那句约 610px，在约 1220px 宽的画布上像一撮参差的内容贴在左边；② **纵向节奏没有规律**——输入框自带 `margin-bottom:8px`、图标行自带 `margin-bottom:12px`，叠在 `.share-section` 的底距上，于是块与块的间隔变成 32 / 12 / 36 忽大忽小。落地：给 **`#shareBodyTab` 加 `max-width: 640px`**（正好等于 URL 输入框的上限，输入框因此顶到栏边），**块间距 24px → 28px**（`.share-section`，Embed tab 因为只有一个 `.share-section`、命中的是 `:last-child`，不受影响），并**去掉 `.share-url-field` 与 `.share-social-icons` 自带的底距**——它俩都是所在块里最后一个元素。改完节奏是：Tab→药丸 28、药丸→输入框 10（同一个控件组）、输入框→提示句 28、提示句→图标 12（标签与内容，仍要紧）、图标→状态句 28。右半边现在是一整块整齐留白，而不是参差的边缘。文首版本号 → **v2.56**。

> **2026-10-09（v2.57）：** URL 类型的三颗药丸（`Episode URL` / `Download URL` / `Share URL`）尺寸与 Embed tab 的 **Player style** 药丸（Classic / Stylish）统一。用户说「这个 `share-url-tab` 有点大吧，是不是可以使用和 embed player tab 页面一样的大小」。两者本来就是**同一类控件**（一排小单选），却各写一份 CSS、尺寸还漂了：URL 这边是 **15px / `padding:7px 18px`**（v2.53 放大出来的），Player style 那边是 **13px / `padding:7px 18px`**。现在统一取 Player style 那套：`font-size: 13px`、`padding: 7px 18px`、`border-radius: 8px`（本来就是 8px）。**只统一尺寸，各自 hover / active 配色不动**；这也等于**把 v2.53 给这三颗药丸的放大回退掉**（那一版其余放大项——标题、输入框、复制按钮、社交方块——都保留）。文首版本号 → **v2.57**。

> **2026-10-09（v2.58）：** Share tab 的四个社交按钮改成**点亮态**——默认就是各平台的品牌色。用户说「`share-social-icons` 不应该是灰色的，应该是 active 带颜色的。用户点击后就会触发手动分享的弹框」。原先按钮默认是灰的（`color:#64748b`、无底色），**品牌色只在 hover 时才出现**；但点一下就是发起一次真实分享，所以它们本该是「一眼看得出能点的彩色入口」。落地：四个按钮各挂一个平台类（`is-facebook` / `is-x` / `is-linkedin` / `is-email`），用 **`--sc`（图标色）+ `--sc-bg`（浅色底）** 两个变量给出品牌色，基础规则改成 `color: var(--sc)` / `background: var(--sc-bg)` ——这套变量写法**与 Publish 弹窗里的 `.ed-v2-social-icon` 完全一致**（v2.27 那套）；hover 不再负责上色，只向上抬 2px 并把原色压深一点（`filter: brightness(.95)`），原先那 4 条 `[title="…"]:hover` 平台色规则随之删除；顺手清掉一个没人用的死类 `.email-s`。**标签文字仍保持灰色**（`.share-social-label` 的 `#64748b`）——按钮底色变成浅色后，13px 的彩色小字对比度不够（Facebook 的 `#1877f2` 压在 `#e8f1fe` 上约 3.2:1）。
>
> **点击行为本来就已经是好的，这一版没动它**：`onclick` → `shareToSocial(平台)` → 现场建一个模拟分享弹框（平台色标题栏 + 内容预览 + Cancel / 分享按钮），给遮罩打上 `share-overlay-sim` 类再挂到 `document.body`——三处关闭按钮都靠 `closest('.share-overlay-sim')` 工作。校验里把这条链路也一并反查了（见 `check16.js` §19），防止以后有人改类名把关闭按钮改哑。文首版本号 → **v2.58**。

> **2026-10-09（v2.59）：** Share tab 的 **Auto-share Status 从一句静态文案改成「据发布时点亮的平台」动态渲染**。原来那块的固定文案是 `Auto-share is not enabled. New episodes won't be automatically posted to your connected social accounts — click to enable.`（带一个跳 Distribution → Social Share 的外链），现已整段删除。用户的要求是：**状态由「发布那一刻在 Social Sharing 里点亮了哪些图标」决定**；点亮了就显示这些平台与其自动分享状态。实现分两头：
>
> **① 采集（Publish Episode 侧）**：新增 `captureSocialSharing()`，把 `#v2SocialSharing` 里带 `.active` 的图标收成平台 id 数组（`['facebook','tumblr','linkedin','youtube','wordpress']` 里筛），写进该剧集的 **`ep.socials`**；在 `publishPublish()`（即时发布）与 `confirmSchedule()`（预约发布）两处都调用。**图标行隐藏时跳过采集**——已发布的剧集在弹窗里显示的是「已发布」变体、图标行是隐藏的，发布时的选择不该被后续的「更新」覆盖。演示数据里给 4 条剧集补了 `socials`（含一条空数组）以便两种状态都看得到。
>
> **② 渲染（Share 页侧）**：新增 `renderShareAutoShare(ep)`，由 `shareEpisode()` 调用，按这一集的状态生成一句话，**两种状态都显示**：点亮了 → `Auto-share is on — this episode will go out to Facebook, LinkedIn and YouTube automatically.`（已发布的用过去时 `was on … went out to …`）；一个都没点亮 → `Auto-share is off for this episode — no platforms were switched on when it was published.`。多个平台用 `A, B and C` 并列。**on 用绿色 `#1a9a6c`、off 用灰色 `#94a3b8`**，一眼能分清。
>
> **为什么「一个都没点亮」时不把整块藏掉**（用户问过）：Publish Episode 里**已发布剧集那句说明正是「Check its sharing status and embed options on the Share & Embed page」**——这页就是来回答「这一集的分享状态是什么」的。整块消失会让人分不清「这集没开启自动分享」和「内容没加载出来」，而且会违背上一句的承诺。所以 off 态也显示，只是换成中性灰、并去掉了原来那个「去开启」的引导（开启入口在 Distribution → Social Share，不在这页）。**如果你更想让它彻底不显示，把 `renderShareAutoShare()` 里 off 分支改成把容器 `display:none` 即可**，但我不建议。文首版本号 → **v2.59**。

> **2026-10-09（v2.60）：** Auto Share Status 照线上改成**表格**。用户贴了线上那个组件的 HTML（`Destination Name` / `Share Date` / `Status` 三列表 + 状态徽章，示例行是 `YouTube` / `--/--/----` / `pending`），要求这块显示这些内容。于是「点亮了平台」时的呈现由 v2.59 的一句话改成表格：**一行一个点亮的平台**，三列分别是**目的地名**（Facebook / Tumblr / LinkedIn / YouTube / WordPress）、**分享日期**（已发布的写这一集的发布日期，尚未发布的仍是占位符 `--/--/----`——线上也是这个写法）、**状态徽章**（已发布 `shared`（绿）/ 尚未发布 `pending`（灰））。表头下压一条 `#e2e8f0` 的线、行间一条极浅的 `#f1f5f9` 分隔线——表格得先看得出是张表，这属于结构不是装饰；表头刻意**不做大写**（v2.54 刚把大写的小节标题拿掉）。**一个平台都没点亮时仍走空态**：藏起表格、显示 v2.59 那句灰字说明，不留一张只有表头的空表。
>
> 另外**没有把线上那个 `Auto Share Status` 标题加回来**——v2.54 已经决定这块不要小节标题（标题在复述内容），这次只搬了表格本身。线上组件里那个 `<h2 class="title">` 要加的话说一声。文首版本号 → **v2.60**。

> **2026-10-09（v2.61）：** Share tab 那条内容栏从「贴左 640」改成「**居中 760**」。用户说「share tab 的内容为什么都是居左的，应该类似 embed player tab 内容，应该是居中，宽度也应该适当调整吧」。先说明一个事实：**Embed tab 的内容其实不是居中的**——它的药丸行、播放器预览、Customizations 两列网格都是**铺满整个内容区**的；真正不同的是 Share tab，它是 v2.56 那条 640px、贴着左边的栏，所以右半边空出一大块看着不平衡。于是在 AskUserQuestion 里给了三条路（居中一条栏 / 跟 Embed tab 一样铺满 / 居中且连 Tab 行一起收栏），用户选了**居中一条栏**。落地：`#shareBodyTab` 的 `max-width` **640 → 760** 并加 **`margin: 0 auto`**；宽度取 760 是因为 Auto-share 那句说明句本身约 660px，在 640 下会折成两行。同时**去掉 `.share-url-field` 自己的 `max-width`**——宽度现在由那条栏统一管，输入框直接铺满栏、复制按钮落在栏的右缘（v2.52 加这个上限本来就是为了防止输入框撑满整页，那个职责已经交给栏了）。**上面那行 Tab（Share / Embed Player）仍保持整宽**，它是页级导航、下划线也照旧通栏；Embed tab 的宽度一点没动。文首版本号 → **v2.61**。

> **2026-10-09（v2.62）：** Share tab 的内容**铺满整宽、左对齐**——v2.61 那条居中栏撤掉。用户看完居中 760 的效果后说「内容宽度不对，并且内容要从左对齐，宽度要和整体中间宽度一致」。落地：**删掉 `#shareBodyTab` 的 `max-width: 760px; margin: 0 auto;` 整条规则**，Share tab 从此和 Embed tab 一样铺满 `.share-modal-body`、左对齐；`.share-url-field` 也不再自设上限（v2.61 已删），输入框与状态表都顶到内容区右缘。
>
> **这条线绕了一圈，留个记录**：v2.56 收成 640 贴左栏（为治「右边缘参差」）→ v2.61 改居中 760（因为「都居左」）→ v2.62 撤销、铺满。**最后这样右边缘反而是齐的**——v2.56 那种参差是「栏宽 640、而句子/表格各自宽窄不同」造成的；现在每一块都跟内容区同宽，右缘自然对齐，所以「参差」不再是问题。如果以后又要收窄，记住先确认是「整块同宽」还是「逐块不同宽」。文首版本号 → **v2.62**。

> **2026-10-09（v2.63）：** Share tab 有两处灰色字改成普通黑，另把表格第一列改了名。三处小改：① **Auto Share Status 表格的字体改成普通黑**——`.share-status-table th` 由 `#94a3b8` 改成 `#1e293b`（`td` 本来就是 `#1e293b`）；表头不再靠颜色、改为靠 12px + 600 与正文拉开层次。② **社交行上方那句句内提示也改成普通黑**——`Share this episode — clicking a platform sends it to your account right now.` 的 `color` 由 `#64748b` 改成 `#1e293b`（其余样式不变）。③ **第一列表头 `Destination Name` 改成 `Auto-sharing`**（`Share Date` / `Status` 不变）。徽章的颜色（`pending` 灰 / `shared` 绿）**没动**——那是状态本身的语义色。文首版本号 → **v2.63**。

> **2026-10-09（v2.64）：** Share tab 的复制按钮由**图标**改成**文字「Copy」+ 黑底**。用户说「`share-copy-btn` 这个 button 用文字 Copy 比图标更明确一点吧，另外可以将按钮颜色变为黑色，这样更明显一点吧」。落地：原先那颗 **38×38 的描边图标按钮**（`border:1px solid #e2e8f0` + 灰色图标）改成**黑底白字**——`background:#1b1b1b` / `color:#fff` / `height:42px` / `padding:0 18px` / `border-radius:8px` / `font-size:14px` / `font-weight:600`，高度与同一行的 URL 输入框对齐。**复制反馈也跟着改**：按钮上挂 `data-copied-label="Copied"`，`showCopyFeedback()` 见到这个属性就把**文字换成「Copied」**（底色转绿 `#1a9a6c`）；没有该属性的（Embed tab 那两个 **Copy Embed Code**）**仍旧换成对勾图标**，行为不变。于是三处复制按钮统一成黑底文字——Embed tab 那边本来就是 `.share-copy-btn.primary` 的黑底文字按钮，其尺寸由 `.primary` 覆盖，观感不受影响。随之删掉一条已经没人用的规则（`.share-url-field .share-copy-btn svg`，原先是给那颗图标定尺寸的）。文首版本号 → **v2.64**。

> **2026-10-09（v2.65）：** Share tab 里**社交分享块提到链接块之前**，同时把复制按钮**降噪**。用户否掉了我上一版「链接在上」的建议：「其实**重点动作应该是 Share this episode** 吧，URL 其实没有那么重要」——这是产品判断，按它改。**改了两件事，因为只换顺序不够**：
>
> **① 顺序**——社交分享（那句提示 + 四个平台图标）**打头**，链接块（三种 URL 药丸 + 输入框 + Copy）**跟在后面**，Auto Share Status 表仍在**最后**（它是状态报告，属于末位）。
>
> **② 份量**——`.share-copy-btn` 从 v2.64 的**黑底实心**退回**浅底描边**（`background:#fff` / `border:1px solid #e2e8f0` / `color:#1e293b` / 字重 600 → 500）。理由是**黑底实心是全页最重的样式**，留着它会把视觉重心压在次要的 URL 上、与优先级正好相反——**「哪个是重点」和「哪个看起来最重」必须一致**，否则顺序换了、版式还在替 URL 说话。复制反馈（文字变 `Copied`、底色转绿）**保持不变**；Embed tab 的两个 **Copy Embed Code** 带 `.primary`、自带黑底与尺寸，**不受影响**。文首版本号 → **v2.65**。

> **2026-10-09（v2.66）：** 三种 URL 类型的按钮由「三颗独立描边药丸」改成**连成一体的分段控件**。用户说「`Episode URL` / `Download URL` / `Share URL` 这 3 个按钮的样式能不能换一下……现在感觉和上面内容搭配起来有点拥挤」。**诊断**：上面那排是四个社交图标（一排方块），下面又是三颗药丸（一排方块），形状、体量、排布都像，中间只隔一个块间距，读起来像一坨密排的控件——**问题不在药丸本身好不好看，而在「又多了一排方块」**。给了三个备选（分段控件 / 下拉并入输入行 / 纯文字 + 下划线），用户选了**分段控件**。落地：加一层 **`.share-url-tabs`** 负责**唯一的外框与圆角**（`border:1px solid #e2e8f0` + `border-radius:8px` + `overflow:hidden` 裁掉内层的角），三颗药丸去掉自己的边框与圆角、改用 **`border-left` 当分隔线**（首颗不要左边线）；**选中态由「绿色描边」改成「浅灰底 + 深色字」**（与 Publish 弹窗左侧导航同一种「选中」语言，也跟页面上那两个大 Tab 的绿色下划线区分开）；描边色顺手由 `#d1d5db` 换成全站统一的 `#e2e8f0`。字号仍是 13px（v2.57 的结论保留）。**没选的两个备选**：下拉并入输入行（省一整行、最不拥挤，但另两种类型要点开才看得到，可发现性差一点）、纯文字 + 下划线（最轻，但与页面上方那两个大 Tab 是同一种「下划线」语言，同一页两层会混淆）。文首版本号 → **v2.66**。

> **2026-10-09（v2.67）：** 链接块**移回**社交块上方——把 v2.65 的顺序换回来。用户看过 v2.66 的分段控件之后说「这样看起来还是奇怪呀。要么还是把 `Episode URL` / `Download URL` / `Share URL` 放在 `Share this episode — …` 上方吧」。于是 Share tab 的顺序恢复成**链接 → 社交 → 状态表**。
>
> **为什么这样反而更顺**：那句提示句（`Share this episode — …`）现在夹在两类控件之间充当**一行文字分隔**——上面是 URL 药丸 + 输入框，下面是提示句 + 图标，两排控件之间隔着一行字，不再紧挨着。（顺序反过来时，社交图标排与分段控件之间没有任何文字，两排控件直接相邻，这正是「奇怪」的来源。）
>
> **只换顺序，份量不动**：Copy 按钮仍是 v2.65 降噪后的**浅底描边**——重点动作依然是「一键分享」，**顺序与份量是两件事**，顺序换回来不等于份量也要跟着换回来。文首版本号 → **v2.67**。

> **2026-10-09（v2.68）：** 剧集信息头（**封面 + 标题 + 状态/时间**）加回 Tab 上方——v2.50 删掉的那块又回来了，但换了尺寸。用户说「在 share and Embed player tab 的上方，放上 episode logo、title、和发布状态与时间」。先把两种做法渲染出来对比（现在的无头部 / 加回头部）再落地：**封面从 180px 缩到 96px**（≈两行标题的高度）、**文字块与封面用 `align-items: center` 居中对齐**、`.share-episode-meta` 补上 **`min-width: 0`**（当年漏了这条，长标题在 flex 里不会折行）。状态文案与日期取 **13px / 14px**（比当年那版 16px 收一档，配合更矮的头部）。
>
> **为什么这次能成、v2.50 那次不行**：当年删它的三条理由——① 封面 180 太高、把 Tab 与工具区推到首屏之外（竖向多占约 **208px**）；② 状态行用 `space-between` 沉底，封面右侧留一大片空白（约 110px）；③ 长标题会撑破。这次前两条随「缩小封面 + 居中对齐」解决了（竖向开销降到约 **120px**，空白消失）；**第三条现在也不再成立**——页面已铺满整宽（v2.62），那条 103 字的长标题正好一行装下（对比图里可见）。
>
> 注意：**页标题（那个 32px 的 `Share & Embed`）没有再回来**，页面上仍是「`← Back to Episodes` → 剧集信息头 → 两个 Tab」。文首版本号 → **v2.68**。

> **2026-10-09（v2.69）：** Share tab **减线**——三处去掉硬描边 / 分隔线。用户问「share tab 中的线框会不会感觉太多了，可以优化么」。数下来这一块有 **7 条线**：分段控件外框 + 2 条内线、URL 输入框一圈描边、Copy 按钮一圈描边、状态表表头线 + 2 条行线。渲染对比后用户选了「三处都改」：
>
> ① **只读输入框改成静默态**（`border: 1px solid transparent` + 浅灰底 `#f8fafc`；hover 才浮出 `#e2e8f0`；focus 变绿 + 白底 + 光晕）——取值照 `.ed-v2-input` 抄。**这不只是减一条线，还修了一处不一致**：它当时是全站**唯一一个不服从静默态约定的输入框**（弹框里所有 `.ed-v2-input` / `.ed-v2-select` 都是浅灰底无描边）。
>
> ② **Copy 按钮同样改静默**（描边透明 + 浅灰底，hover 才浮线；`copied` 态仍闪绿）——上面输入框变浅灰后，紧邻的按钮还留硬描边会读起来不搭。
>
> ③ **状态表去掉行与行之间的分隔线**，只留表头那条——只有 3 行、行高又大，行线帮不上忙；表头线 + 三列对齐已经足够说明这是张表。
>
> **保留不动的**：分段控件的外框与 2 条内线——那是它读作「**一个**控件」的依据（v2.66 刚为这个改过，删了就散回三颗药丸）。改完之后 Share tab 里的线由 **7 条降到 4 条**，且**除分段控件之外不再有任何硬描边**——正好回到全站「输入框静默、只在需要读成一个整体时才画框」的约定。文首版本号 → **v2.69**。

> **2026-10-09（v2.70）：** URL 只读展示框加**聚焦即全选**，并修掉「切类型后全选丢失」。用户要求：「给 share and embed 页面 episode URL 这个输入框加 `focus` 处理（1–2 行），外加 `switchShareUrl()` 里一句重选」。落地三处，合计不到十行：
>
> ① **input 上挂 `onfocus="selectShareUrl(this)"`**——点进这个框就把整条 URL 选上，省掉「三击 / Ctrl+A 才能复制」那一步（旁边虽然有 Copy 按钮，但这个框本身被人点开时，意图十有八九就是要复制）。
>
> ② **`selectShareUrl(el)` 函数**：`el.select()` 之后吞掉**紧随聚焦的那一次 `mouseup`**。这是必须处理的坑——浏览器在 `mouseup` 时会把 `focus` 里设好的选区收掉、改成落一个插入光标，不拦的话「点进去全选」在鼠标操作下**根本不生效**（键盘 Tab 聚焦反而正常，所以这类 bug 很容易漏测）。**为什么只挂 `focus`、不挂 `onclick`**：`onclick="this.select()"` 会让**每一次**点击都重新全选，于是「把光标放进 URL 中间」「拖选其中一段（比如只要 slug）」「双击选一个词」全部失效——挂 `focus` 只在「刚进入这个框」时全选一次，之后框内的正常选区操作都不受影响。吞 `mouseup` 之前**先确认全选还在**（`selectionStart === 0 && selectionEnd === value.length`）才 `preventDefault`，否则会拦着用户拖选；监听器是一次性的，用掉自己摘掉。
>
> ③ **`switchShareUrl()` 里加一句 `if (document.activeElement === input) input.select();`**——给 `input.value` 赋值会**清掉选区**，所以「点进去全选 → 切一个 URL 类型 → 全选没了」会让人以为坏了。**只在字段仍聚焦时重选**：用户若已经点到别处再切类型，不应该莫名其妙把焦点抢回这个框。
>
> 已知的边角（**无害，未处理**）：若字段是用键盘 Tab 聚焦的，不会触发 `mouseup`，那个一次性监听器会一直留到该元素的下一次 `mouseup` 才摘掉；它带「全选还在」的前置判断，且每次聚焦最多留一个，所以不会误拦操作。文首版本号 → **v2.70**。

> **2026-10-09：Share tab 的「分享」与「Auto-sharing」两块不加回标题（设计决定，未改代码）。** 用户问「Share this episode 和 Auto-sharing 板块，是否需要加标题」。**结论：不加。** 核心理由是**这两块都已经「自报名字」，标题只会变成同一句话上下说两遍**——① 分享块的第一句就是 `Share this episode — clicking a platform sends it to your account right now.`（**用户自己就是用这句话的前三个词来指代这一块的**，可见它已经在承担标题职责）；② Auto-sharing 块在「亮着平台」时是一张表，**第一列表头就叫 `Auto-sharing`**，上面再放一个同名词的标题就是同一个词紧挨着重复；没点亮时那句开头同样是 `Auto-share is off for this episode…`。
>
> 另外两条理由：**只给这两块加而 URL 块不加，层级反而更乱**——要加就得三块都加，那等于把 **v2.54 整体撤回**（v2.54 删掉的那三个 16px 加粗标题曾是整个 Share tab 里最重的字，删掉后层级才收成「24px 大 Tab → 正文」两层）；且三块的**形状**本来就各不相同（药丸行 + 输入框 / 一句话 + 图标排 / 一句话或一张表），**分组靠形状就够了，不必再叠一层文字**。
>
> **若日后仍想加**：正确做法不是「标题 + 原句」，而是「标题 + 删掉句子里自报名字的那半句」，否则每块都把名字说两遍；但分享块那句一旦砍到只剩 `Clicking a platform sends it to your account right now.`，唯一用来区分「这里点一下现在就发」和「发布时自动分享」的 `right now` 就失去落点，反而更弱。
>
> **附带提出、本次未采纳的一条**：若觉得这页「点进来像一坨、没有落点」，真正缺的可能是**页标题**——`Share & Embed` 那个 32px 标题自 v2.50 删除后一直没加回（v2.68 只把剧集信息头加回来了）。一个页级标题对「我在哪」的帮助大于三个区块标题，代价也小（一行字、不动任何区块）。**留档备查，本次未做。**
>
> **本次没有改任何代码，所以文首版本号不动，仍是 v2.70。**

> **2026-10-09（v2.71）：Embed Player tab 的 `Classic` / `Stylish` 也连成一个分段控件**（用户：「Embed Player tab 页面 classic 和 sylish 也连成一个分段控件」）。做法**完全照 v2.66 给 URL 类型药丸那一套**，一个字都没自创：
>
> ① 新增外层 **`.share-player-style-tabs`**——出**唯一**的外框与圆角（`display:inline-flex` + `overflow:hidden` 裁掉内层的角 + `border:1px solid #e2e8f0` + `border-radius:8px`），并接管原来那行行内样式的 `margin-bottom:12px`；② 内层 `.share-player-style` **去掉自己的整圈边框与圆角**（`border:none`），改用 **`border-left:1px solid #e2e8f0`** 当分隔线、首颗用 `:first-child { border-left:none }` 去掉左边线，并补 `background:#fff` 防止外框内透出父级底色；③ **选中态由「绿色描边 + 绿字」改成「浅灰底 `#f1f5f9` + 深色字 `#1e293b`」**，hover 也从「浮描边」改成「浮浅灰底」。
>
> **第 ③ 条不是额外改动，是合并的必然结果**：外框收成唯一一圈之后，里头再留一颗绿色描边的药丸会读成「**一个框里又套了一个框**」；而且选中态换成浅灰底之后，它与 Share tab 的 URL 分段控件、以及 Publish 弹窗左侧导航就统一成同一种「选中」语言了。
>
> **这次的动因与 v2.66 不同，值得记一句**：v2.66 的起因是「两排方块挨在一起显得拥挤」，而这里 Classic / Stylish 独自站在播放器预览上方，**并没有拥挤问题**——真正的动因是**同一类控件（一排小单选）在两个 Tab 里长得不一样**。所以这次是「对齐」而不是「解拥挤」。
>
> **尺寸一点没动、JS 一行没改**：内层仍是 `7px 18px` / `13px`（v2.57「与 URL 药丸同号」的结论保留），**去掉的那 1px 描边由外层补回，整块高度与原来完全相同**；`.share-player-style` 这个 **class 名保持不变**，所以 `switchPlayerStyle()` 与两处重置逻辑（`querySelectorAll('.share-player-style')`、`[data-style="classic"]`）全部照常工作。
>
> **留档：Embed tab 里还有两排同类小单选没跟上（v2.71）**——**Font color**（Auto / White / Black）与 **Height**（300px / 400px / 500px）走的是 `.share-color-opt`（`padding:4px 12px`、圆角 6px、描边仍是旧的 `#d1d5db`、选中是**绿色描边**）。它们比 Classic / Stylish **小一档**，而且藏在默认收起的 **Customizations** 面板里，所以本次没有一起动。**若要统一，先决定是「也连成分段控件」还是「只把选中态改成浅灰底」**——两条路的观感差别不小（前者会把面板里排得更密的一行做大）。文首版本号 → **v2.71**。

> **2026-10-09（v2.72）：播放器预览宽度由「铺满整宽」改为 **60%**（靠左）。** 用户：「Embed Player tab 页面 `share-embed-preview` 的宽度改为60%」。**只改 `.share-embed-preview` 的 `width` 这一个值（`100%` → `60%`）**，同一条规则里的 `border-radius:8px` 与 `margin-bottom:12px` 都没动；内层 `<img>` 仍是 `width:100%; height:auto`，所以图片跟着容器缩、**保持原比例、没有写死任何 px**。
>
> **摆法选的是「靠左」**（不加 `margin:0 auto`），依据是**本页 v2.62 已经定下的惯例**——Share tab 那次来回绕了三轮，最后的结论是「内容铺满整宽 + **左对齐**、宽度与整体内容区一致」。靠左之后播放器左缘与上面的 Classic / Stylish 药丸、下面的嵌入代码框对齐，右侧空出 40%。
>
> **同时渲染了三种摆法给用户挑**（100% 铺满 / 60% 靠左 / 60% 居中），并说明**改居中只需一行 `margin:0 auto`**。居中那版的问题是播放器跟上面的药丸、下面的代码框都不在一条起跑线上。**用户当时未表态，默认落在靠左**；若之后要改居中，把上一条注记里的 `margin` 断言一并翻面即可。
>
> 文首版本号 → **v2.72**。

> **2026-10-09（v2.73）：`Show embed code` 改名为 **View Embed Code**、挪到播放器预览下方、左对齐、改黑字。** 用户：「show Embed Code 改为 View Embed Code，放在 player preview 的下方，左对齐。字体颜色为黑色，」。
>
> **落地前先确认了一个结构问题**：这个名字在页面里其实**有两颗**（Classic / Stylish 各一颗，因为两份嵌入码内容不同），而**播放器预览只有一个**。放到预览下方，那个位置**只容得下一颗**——所以处理方式是**把两颗合并成一颗共享链接**，由 `toggleShareCode()` 去开合「当前显示的那个面板」里的代码框。**这也意味着 `toggleShareCode()` 必须重写**：旧写法 `el.parentElement.nextElementSibling` 要求链接待在卡片里（它的下一个兄弟才是代码框），链接一搬走这条**必然失效**。
>
> 具体四处改动：① markup 里加一颗共享的 `<span class="share-toggle-code">`，位置在 `.share-embed-preview` 之后、`#shareClassicOptions` 之前（`display:inline-block` 独占一行贴左 + `margin-bottom:12px`），颜色 `#1e293b`、文案 `View Embed Code`；② 删掉两个面板卡里的旧 span（那两行随之只剩 Copy 按钮一个子元素，`justify-content:space-between` 一并去掉，否则是死声明）；③ JS 新增 `activeShareOptionsPanel()` / `setShareCodeLabel()` / `syncShareCodeLabel()`，`toggleShareCode()` 改走「定位当前面板 → 开合它里面的 `.share-code-wrapper`」；④ `switchPlayerStyle()` 末尾加一句 `syncShareCodeLabel()`——**面板换了就要重新对文案**，否则会出现「框是开着的、链接却写着 View」。
>
> **展开态的文案同时从 `Hide embed code` 改成 `Hide Embed Code`**（用户只点了 `View Embed Code` 这一个名字，但两者是一对切换文案，只改一半会一半 Title Case 一半 sentence case）。**这是一处按惯例补的改动，如果只想要 View 大写、Hide 保持小写，说一声即可翻回去。**
>
> **两份代码框各自仍记住自己的开合状态**（没退化成「切风格就收起」）；链接文案只反映当前那一份。**代码框仍在原来那张卡片里**（挨着它自己的 Copy Embed Code 按钮），没有跟着链接一起搬——搬的话会把代码和它的复制按钮拆散。文首版本号 → **v2.73**。

> **2026-10-09（v2.74）：`Copy Embed Code` 放大——定为**本页最重要的按钮**。** 用户：「Copy Embed Code 按钮放大，这个作为这个页面最重要的按钮」。
>
> **动手前先量了一下，发现一处真实的倒挂**：它当时是 `13px` 字号 / `padding: 8px 18px`、**实际高约 34px**，而 Share tab 那颗**次要**的 Copy 是 `42px` 高——**这页的主按钮比另一页的次要按钮还小**。所以「放大」不只是审美，是把这个倒挂纠正过来。
>
> **只放大 `.primary` 这一层**（`13px → 15px`、`padding: 8px 18px → 13px 26px`、`gap: 6px → 8px`、图标 `14px → 16px`，黑底白字与 600 字重不动）。**基类 `.share-copy-btn` 一个字没动**，所以 Share tab 那颗被 v2.65 有意降噪的 Copy（浅底描边、42px）完全不受影响——**两个 Tab 不同时可见，各自的主次也不冲突**（Embed tab 的主操作就是复制代码，Share tab 的主操作是分享到社交平台、复制链接次要）。
>
> **图标走 CSS 覆盖 SVG 的 `width`/`height` 表现属性**（`.share-copy-btn.primary svg`），**不碰 markup**——文件里 `width="14" height="14"` 共 18 处，`replace_all` 必误伤（这是本项目第 2 次踩这条，第一次见 v2.53）。另外**没有把规则放宽成 `.share-copy-btn svg`**，那样会连 Share tab 的兜底图标一起放大。
>
> **同时渲染了三档给用户挑**（改前 13px/8·18 ≈ 34px ／ 已落地 15px/13·26 ≈ 47px ／ 再大一档 16px/15·30 ≈ 54px），**默认落在中间那档**；若想要更「主行动」的感觉，把 `font-size`/`padding`/图标换成第三档即可。文首版本号 → **v2.74**。

> **2026-10-09（v2.75）：展开的代码框挪到 `View Embed Code` 的**正下方**。** 用户：「点击 view embed code 后，展开的 code 跟在这按钮的下方，不要跑到 copy code 下面去」。此前代码框挂在 Copy Embed Code 按钮下面——**点的是上面那颗链接，展开的内容却出现在大按钮之下**，链接和它控制的东西被按钮隔开了。
>
> **做法：只把代码框在「自己的面板内」挪到最前面，没有搬出面板。** 这是这次的关键——`toggleShareCode()` 用 `panel.querySelector('.share-code-wrapper')`、`updateShareWidgetCode()` 是**按 id** 写值，两者都与 DOM 位置无关；只要**仍留在同一个面板里**，**JS 一行都不用改**。若为了方便把它搬到链接旁边（面板之外），就得同时改这两处、还要处理「两个面板共用一个位置」的问题——完全没必要。**这条值得记：挪元素之前先看 JS 是靠「相对位置」还是「选择器 / id」找它。**
>
> 由于它现在位于 Copy 按钮**之上**而不是之下，间距方向也跟着换：`margin-top:10px` → **`margin-bottom:12px`**。
>
> **展开后的顺序变成**：风格药丸 → 播放器预览 → `View Embed Code` → **代码框** → `Copy Embed Code` → Customizations。**一个连带结果**：代码框展开时会把 Copy 按钮往下推（约 100px）——这是「内容长在链接下面」的必然结果，用户要的就是这个；若日后觉得「主按钮被推走」是个问题，再议。
>
> 文首版本号 → **v2.75**。

> **2026-10-09（v2.76）：两个大 Tab（`Share` / `Embed Player`）字号 24px → **20px**。** 用户问「ShareEmbed Player tab 的文字大小是不是太大了，改为 20 呢？」——**是的，24px 确实过大**：它比页面里任何其它文字都大出一大截（正文与说明 13–14px、最重的 Copy Embed Code 按钮才 15px），两个 Tab 是**页级导航**却成了整页最抢眼的东西。这条是 v2.51 定的（16px → 24px），当时的起因是「下面的内容整体放大一档后，13px 的小节标题与 Tab 比例不搭」；内容那一档放大（v2.53）之后早已稳定，Tab 停在 24px 就显得孤立了。
>
> **只改 `font-size` 这一个值**：`padding: 6px 4px` / `margin: 0 12px` / 字重 600 / 默认灰字 `#94a3b8` / `.active` 深色 + 700 / 2px 绿色下划线 / `letter-spacing: .02em` **全部不动**。20px 仍在 16px 正文之上、层级没丢，只是不再压过全页。
>
> **顺带把 v2.51 那条注记标成「已被 v2.76 改为 20px」**，免得日后照着它把 24px 加回来。另外渲染了三档（24 / 20 / 16px，16px 是 v2.51 之前的原值）给用户看过。文首版本号 → **v2.76**。

> **2026-10-09（v2.77）：`Copy Embed Code` 改为胶囊圆角、去掉内层图标。** 用户：「Copy Embed Code 按钮，改为圆角，里面去掉 icon」。
>
> **圆角取 50px（胶囊）**：它原本是 **8px**——所以「改为圆角」只能理解为**做成胶囊形**。取 **50px 而不是随手一个数**，是为了**对齐本站深色实心按钮的既有惯例**：顶栏那颗 `.btn-create`（New Episode）、`Upgrade to keep them` 等都是 `border-radius:50px`。改完之后，本站两处深色实心按钮终于是同一种形状语言了——此前 Copy Embed Code 是这里**唯一一个圆角矩形的实心按钮**。
>
> **去掉图标**后连带清掉两处死代码：① `.primary` 上的 **`gap: 8px`**（按钮内已无第二个子元素）；② **v2.74 才加的 `.share-copy-btn.primary svg { width:16px; height:16px }`**（图标没了，这条规则再无使用者——与 v2.64 删掉 `.share-url-field .share-copy-btn svg` 是同一种清理）。**尺寸一律没动**：`padding: 13px 26px`、`font-size: 15px`、黑底白字、字重 600 全部保留。
>
> **基类 `.share-copy-btn`（8px 圆角）没动**，所以 Share tab 那颗 Copy 仍是原来的圆角矩形——两个 Tab 不同时可见，各自的形状也不冲突。文首版本号 → **v2.77**。

> **2026-10-09（v2.78）：`Customizations` 折叠区改成「Customize Your Player ↗」入口 + 一个自定义弹框。** 用户：「将 Customizations 改为 Customize Your Player ↗ 放在 Copy code 按钮的右侧，点击 customize 则打开新的弹框，里面左侧是 player preview，右侧是 customizations 工具栏，工具栏中分 Content Controls 和 Appearance and Layout，你要将 customizations 里面的设置，分别放进去」。
>
> **动手前先把三处歧义问清了**（AskUserQuestion），用户的选择决定了整个结构：
> ① **弹框里怎么处理 Classic / Stylish 两套设置** → 选「**跟随页面上已选的风格**」，弹框内**不放**切换器；
> ② **两组各放哪些** → 选**我提议的分法**（见下）；
> ③ **末尾那个 ↗ 与给出的网址** → 选「**只开弹框**」，↗ 仅作图标、**不接外链**。
>
> **分组**：**Content Controls** = `Share` / `Download` / `Logo link`（控制播放器里**出现什么**）；**Appearance and Layout** = `Player color` / `Button color` / `Font color` / `Font` / `Right-to-left text`（控制**长什么样**）。原先这些控件在 `Customizations` 里是**一串平铺**（Player color / Button color / Font color / Font / Share / Download / Logo link / Right-to-left text），现在按「内容 vs 外观」重排，**顺序也变了**：Content Controls 三项提到最前。
>
> **关键实现取舍：控件是「原样搬移」的，所以老逻辑一行都没改。** 所有控件 id（`shareFont` / `sharePlayerColorSwatches` / `shareButtonColorSwatches` / `shareButtonColorStylishSwatches` / …）与全部 `onclick`（`selectShareSwatch` / `selectShareFontColor` / `selectShareHeight`）**一个字节未改**，于是 `selectShareSwatch()` / `updateShareWidgetCode()` 那些函数完全不用动。两套控件（Classic / Stylish）都留在 DOM 里，打开弹框时按当前风格切显隐。
>
> **只新增了两件事的 JS**：`openCustomizeModal()` / `closeCustomizeModal()`；并**扩展 `updateSharePlayerPreview()`**——现在页面与弹框里各有一张预览图，一次刷两张（否则弹框里显示的还是切换前的旧图）。另外**删掉已成死代码的 `toggleShareCollapse()`** ——它唯一的调用者就是那两处折叠区标题（CSS 里的 8 条 `.share-collapse*` 规则同批删除）。
>
> **弹框外壳**照 `ai-settings-dialog` 那套（居中白卡 + `rgba(0,0,0,.3)` 遮罩 + 右上角 ✕，点遮罩也可关）。**预览与工具栏之间没有画竖线**——用户历来会删装饰性竖线（见他删侧栏竖线那次），两栏靠留白区分。
>
> **留档（已当面提出、待用户决定）**：弹框里这几个下拉仍是**旧的硬描边**样式（`1px solid #d1d5db`），而全站输入框/下拉早已统一成「静默态」（浅灰底、无描边、hover 才浮线）；弹框里六个下拉 + 两片色板，正是他当初说 Publish 弹框「框框太多」的那种场面。**要不要一并改成静默态，等他拍板。** 文首版本号 → **v2.78**。

> **2026-10-09（v2.79）：整个弹框按 **Distribution 项目 Embed Player 页的「Player Customization」**重写。** 用户：「这里 Player Customization 弹框的写法，要参照 project：Distribution 里面 Embed Player 页面，Customize Your Player 弹框的写法。你找一下，如果找不到的话，跟我说」。
>
> **先说「找」这一步**：挂载范围里当时只有 `Episodes` 一个文件夹，找不到 Distribution；线上那个 `elina-zhao.github.io/my-page/Distribution/` 又被网络策略挡了（`cowork-egress-blocked`，允许列表只有 127.0.0.1），搜索也零结果。按用户选择把本地项目文件夹挂上之后，参照物就在 **`/Users/zgy/Code/Distribution/index.html`**：入口链接在第 **4774** 行、弹框标记从第 **4792** 行起、其样式在其 CSS 第 **2961–3070** 行、相关 JS 在 **7679–7804** 行。
>
> **与 v2.78 那版的四处差别**（这次是**替换**、不是微调）：
> ① **外壳**：由「居中白卡 + 深色遮罩」改成 **全屏白底 overlay + 顶栏**（`position:fixed; inset:0; background:#fff`）；
> ② **右侧工具栏**：由「两组上下堆叠、各带小标题」改成 **两级导航**——主菜单 `Customizations` → 点条目进**子页**（子页带 `← CUSTOMIZATIONS` 返回与子标题）。**这一条纠正了我 v2.78 的理解偏差**：用户当初说「工具栏中分 Content Controls 和 Appearance and Layout」，那两个其实是**导航条目**，不是两个区块标题；
> ③ **控件布局**：由「标签在上、两列网格」改成 **标签在左、控件在右**的行式；**色板例外**——它太宽，仍保持标签在上（照它的 `.ep-swatch-section`）；
> ④ **新增 Cancel / Save 与脏标记**（见下）。
>
> **另外把入口链接也改回它的写法**：v2.78 我用的是「两端对齐、推到该行最右端」+ SVG 箭头；Distribution 那边是 **`display:flex; gap:24px`，链接紧贴 Copy 按钮右侧**，且 **↗ 是文字字符**。两处都照它改了。
>
> **脏标记照它的 `epDirty` 那套**：打开弹框时**快照**当前设置 → `Save` 初始禁用、有改动才亮 → 未保存时点 `Cancel` / `← Embed Player` 都先弹确认框（文案、按钮照它：`Cancel changes?` + No/Yes，`Exit without saving?` + Exit/Save）→ **Cancel 还原快照**，Save 保留并关闭。两处实现细节值得记：**脏的判定是「当前状态 vs 快照」每次都重算**（而不是设一个只升不降的 flag），所以「改了又改回去」能正确变回干净；**快照按 DOM 顺序收**（下拉的值 / 每个色板组里选中的第几块 / 每组值药丸里选中的第几颗），因此**不必给 Share / Download / Logo link / RTL 这四颗没有 id 的下拉补 id**。控件改动后的刷新用**冒泡委托**挂在 document 上，省掉给 30 多个控件逐个挂监听。确认框**复用本站已有的 `.confirm-overlay` / `.confirm-dialog` 样式**（参数化标题/说明/按钮，照它的 `epConfirmTitle/Desc/Actions` 写法），没有新造第三种弹框样式。
>
> **控件仍是一个字节没改**（id 与 onclick 原样），所以 `selectShareSwatch` / `updateShareWidgetCode` 那些逻辑一行未动。**注意到它的 Content Controls 里还有 `Episode Filter` / `No. of Episodes` / `Display Order` 三项，那是多集播放器特有的**，单集嵌入没有对应物，故**未搬**。文首版本号 → **v2.79**。
>
> > **2026-10-09（v2.80）：弹框里 Font color 由三颗值药丸改成**下拉**。** 用户：「Player Customization 弹框中，Font color的选项也改为下拉框」。改成与同栏 Font / Right-to-left text 同款的 `.share-opt-select`（`id="shareFontColor"`，选项值仍 `auto / white / black`、显示文字保持本站的 Title Case）——**Distribution 那页的 Font color 本来就是下拉**（`<select id="epFontColor">`，选项 `auto/white/black`），所以这也算对齐参照物。
>
> **顺着这次改动揪出并修掉了一个 v2.78 就埋下的隐形 bug（两个地方，都不是小事）**：
> ① **会导致报错的一处**：`shareEpisode()` 里有一段「重置 Font color」，原文是 `document.querySelector('.share-color-opt[data-value="auto"]').classList.add('active')`。药丸一没，这个查询返回 **null**，紧接着的 `.classList` 会**直接抛错** —— 而这段**每次打开 Share & Embed 页都会跑**。已改成重置下拉的值（并加了存在性判断）。
> ② **一直悄悄失效的一处**：`updateShareWidgetCode()` 与 `shareEpisode()` 里各有查询 `#shareStylishOptions` 的语句，而那个容器**自 v2.78 控件搬进弹框起就不存在了**（现名 `#shareCustomizeAppearanceStylish`）→ 生成嵌入码时读不到 Height（**恒退回 300px，改了不生效**）、重置 Height 也是空转。已一并改用新容器 id。**教训：搬控件时改了容器 id，一定要把所有按旧 id 取值的 JS 一起搜出来改**——这类失效不报错，只是「设置了没反应」，最难发现。
>
> **只删了一处死代码**：`selectShareFontColor()`（它唯一的使用者就是那三颗药丸）；`selectShareHeight()` **保留**（Stylish 的 Height 仍是值药丸），所以 `.share-color-row` / `.share-color-opt` 两条 CSS 也保留。脏标记的快照是**按 DOM 全量收** `select` 的，所以新下拉自动被覆盖，无需额外改动。文首版本号 → **v2.80**。
>
> **留档**：若要继续与 Distribution 完全对齐，**Height 在那边也是下拉**（我们的还是三颗药丸）；另外这些下拉仍用的旧硬描边样式，与「静默态」那笔待定事项是同一件。

> **2026-10-09（v2.81）：播放器预览不再用截图，改成**真写出来的播放器**。** 用户：「player preview 现在是图片，能不能不要用图片，就把这个 player 写出来」。动手前问了三个问题，用户都选了推荐项：**跟着设置实时变 / 两套风格都写 / 播放按钮可点**。
>
> **思路照 Distribution**：那边 Embed Player 的播放器也是 `renderVisualPlayer()` **拼标记 + CSS + 波形**、而不是贴图，所以这次是把同一套做法搬过来（这是第 3 次以 Distribution 为参照）。
>
> **做出来的东西**（新增约 40 条 CSS + 12 个 JS 函数）：
> - **两套布局**：`Classic` 浅色面板 + 左侧 180px 封面；`Stylish` 封面铺满 + 渐变暗角 + 白字叠加，**高度跟着 Height（300/400/500）**。
> - **跟着设置实时重渲**：颜色取自色板、其余取自弹框控件；`Font color = Auto` 按**面板色亮度**自动选深/白字；RTL 让标题与进度条两端时间右起；Share / Download 控制右上那两个图标。
> - **播放按钮可点**：切播放/暂停 + `setInterval` 假计时推进进度与两端时间，到头自动归零。
> - **一次渲染两处**（页面上的预览 + 弹框里的预览），沿用 v2.78 那个「两张一起刷」的思路。
> - **封面仍是图片**（`4_basssp.jpg`，仓库已有）——真实播放器里封面本来就是图，换掉的是**播放器本体**。
>
> **两处顺带修**：① **Button color 的默认选中由白改成绿**（`#8bbb4e`）——参照截图里播放按钮是绿圆（实测像素 `#95ba5d`，色板里 `#8bbb4e` 最接近）；不改的话默认会渲染成「白按钮压在 `#f6f6f6` 面板上」，几乎看不见。② 给**六个无 id 的下拉**（Share / Download / Logo link ×2 面板）补了 id（`shareCtrlShare` 等）——渲染必须能读到它们，而 v2.79 的脏标记是**按 DOM 顺序**收的、当时没暴露这个需求。
>
> **验证手法的升级（值得记）**：CSS 是盲写的，光看标记断言不能确认「长出来是什么样」。这次把 `sharePlayerMarkup()` **从文件里抽出来、在 Node 里配桩 DOM 真跑一遍**，拿到**真实输出**再拼成渲染页——渲染出来的就是运行时真正会生成的标记，不是我手抄的近似。也因此看见两处只在输出里才显形的小瑕疵（`font-family` 里字体名重复、非 RTL 时留了个空 `style=""`），当场清掉。
>
> **⚠️ 遗留**：原先那两张截图 `classicplayer.png`（294KB）与 `stylishplayer.png`（1.4MB）现在**没有任何引用**（已核对：index.html 0 处、目录内其它文件 0 处），共约 **1.7MB**。**留着还是删，等用户说**——删文件我不擅自动手。

> **⚠️ v2.79 踩了一个真坑（不是断言问题，是代码真的坏了）**：我用脚本从文件里抽「色板组 + 紧随其后的色值行」时，找下一个 `<div>` 的起点算错（从错的偏移开始搜 `>`，再从那之后找 `<div`），结果**把隔壁控件的整块当成了色值行**一起搬进去，等于复制了一份——色板总数从 42 涨到 **56**、id 出现重复。**教训：脚本搬 DOM 时，抽「元素 + 它的下一个兄弟」这类组合，起点必须取「前一个块结束的位置」，而不是任何靠 `indexOf('>')` 猜出来的位置。** 修法：把坏块整个删掉，改从**改动前的干净备份**（`/tmp/index.before-v278.html`）里抽取控件重建 —— **动手改大结构之前先留一份备份，这次救了场**。

> **2026-10-09：三种 URL 维持「一个框 + 类型药丸」，不拆成三个框（设计决定，未改代码）。** 用户问「`Episode URL` / `Download URL` / `Share URL` 是共用一个展示框，还是改为一个 URL 一个展示框」。我把两版都渲染出来并排对比过（三条一框那版还试了「类型名在左」和「类型名在上、URL 在下」两种排法），最后**维持现状**。理由记在这里，免得日后翻烧饼：① 三条 URL 只差最后一段路径（`/e/…`、`/media/…/download`、`/share/…`），共用前缀在整行宽度下会被重复三遍；② 现在药丸里的 **`Episode URL` 是默认选中**的，隐含「你要的通常是这个」的层次感，三个框会把主链接与两个次要链接拉平成等权的三行；③ 只有一个输入框配一个复制按钮，**复制不会点错**；④ 三个框会让「链接」这块变成整页最重的一块（上下结构那版整块高约多 150px），压过下面那张 Auto Share Status 表。**唯一需要重新评估的信号**：如果后台数据显示「一次要复制多条链接」是常见动作，那就该改成三个框。**本次没有改任何代码，所以文首版本号不动，仍是 v2.63。**

#### Share 选项卡

**① 链接区（URL）**

- 三种 URL 类型切换按钮：`Episode URL` / `Download URL` / `Share URL`，基于剧集标题生成的 slug 拼接：
  - Episode：`https://podcastingsmarter.podbean.com/e/<slug>`
  - Share：`https://podcastingsmarter.podbean.com/share/<slug>`
  - Download：`https://podcastingsmarter.podbean.com/media/<slug>/download`
- 只读输入框 + 复制按钮（点击后短暂显示复制成功反馈）。
- **焦点行为**：点进输入框即**全选整条 URL**（键盘 Tab 聚焦同样全选）；切换 URL 类型时，若字段仍处于聚焦状态则**保持全选**，否则不动焦点。选区一旦进入，框内的正常选区操作（放置光标、拖选一段、双击选词）不受影响。

**② Share to（社交分享）**

- Facebook / X (Twitter) / LinkedIn / Email 四个社交按钮。
- 点击打开对应平台的模拟分享窗口，确认后通过真实分享 URL 新窗口打开（Facebook、Twitter、LinkedIn）或唤起邮件（Email）。

**③ Auto-share Status（自动分享状态）**

- 说明：自动分享未启用，新剧集不会自动发布到已关联社交账号，附 `click to enable` 链接（跳转 Distribution → Social Share 页面）。

#### Embed Player 选项卡

- **播放器风格**：`Classic` / `Stylish`，切换时更新播放器预览与嵌入代码。两颗按钮**连成一个分段控件**（2026-10-09 v2.71，做法与 Share tab 的 URL 分段控件完全一致：只有一圈外框、中间一条分隔线；选中态是**浅灰底 + 深色字**，不再是绿色描边）。
- **播放器预览**：**真写出来的播放器**（不是截图；2026-10-09 v2.81 起），宽度为内容区的 **60%**、**靠左**摆放（v2.72 由「铺满整宽」改为 60%）。两套风格各有自己的布局：
  - **Classic**：浅色面板（底色 = Player color，默认 `#f6f6f6`）、**封面在左 180px 方块**、右侧为节目名 / 剧集标题（20px 粗体）、播放按钮（48px 圆，颜色 = Button color）+ 两端夹着时间的进度条、底部波形。
  - **Stylish**：**封面铺满整块当背景**（另压一层渐变暗角保证白字可读）、文字白字叠在照片上、播放按钮与进度条压在底部、波形在最下缘；**整块高度跟着 Height 设置（300 / 400 / 500px）**。
  - 两个风格右上角都有 `Podbean` 字样与四个图标（信息 / WiFi / 下载 / 分享）；**下载与分享两个图标受 Content Controls 里的 Share / Download 开关控制**。
  - **播放按钮可点**：点一下切播放 / 暂停（图标换成暂停），播放时进度条与两端时间（`0:00` / `-3:24`）往前走；走到头自动归零停下。
  - **跟着自定义设置实时重渲**：改 Player color / Button color / Font color / Font / Share / Download / Right-to-left text / Height，预览当场变（颜色取自色板，其余取自弹框里的控件）。`Font color = Auto` 时按**面板色的亮度**自动选深字或白字；`Right-to-left text = Yes` 时标题与进度条两端时间改为右起。
  - **封面仍是图片**（真实播放器里封面本来就是图，复用仓库里已有的 `4_basssp.jpg`）——换掉的是**播放器本体**，不是封面。
  - ⚠️ 原用的两张截图 `classicplayer.png`（294KB）与 `stylishplayer.png`（1.4MB）**已不再被引用**，可删。
- **View Embed Code**：播放器预览**正下方**的一颗文字链接（**左对齐、黑色**，2026-10-09 v2.73 由卡片里挪到这里并改名，原名 `Show embed code`、绿色、被推到按钮那一行的最右端）。点击展开 / 收起嵌入代码框，文案在 `View Embed Code` 与 `Hide Embed Code` 之间切换。**展开的代码框出现在这颗链接的正下方**（2026-10-09 v2.75 起；此前它挂在 Copy Embed Code 按钮下面，点上面的链接、内容却出现在按钮之下）。Classic 与 Stylish **各有独立代码框**，但这颗链接是**两者共享**的——它开合的是**当前所选风格**那一份，文案也跟着那一份走。
- **Copy Embed Code** 按钮：复制 iframe 嵌入代码。这是**本页最重要的按钮**（Embed tab 上除它之外只有「查看代码」与自定义项），黑底白字、尺寸明显大于页面其它按钮（2026-10-09 v2.74 放大：字号 13 → 15px、内边距 8·18 → 13·26px），**形状为 50px 胶囊圆角、按钮内没有图标**（2026-10-09 v2.77：圆角由 8px 改成胶囊，并去掉原先那枚复制图标）。Classic 与 Stylish **各有一颗**（各自复制自己那份代码）。
- **Customize Your Player ↗**：**紧贴** Copy Embed Code 按钮右侧的一颗文字链接（16px / 600、黑色无下划线、不换行；末尾 ↗ 是**文字字符**）。点击打开 **Player Customization** 全屏弹框（2026-10-09 v2.78 由本页的 `Customizations` 折叠区收成这颗入口；v2.79 照 Distribution 项目的同名弹框重写了整个弹框）。链接每面板各一颗（Classic / Stylish 各一，与各自的 Copy 按钮同行、间距 24px）。
- **Player Customization 弹框**（2026-10-09 v2.79 照 Distribution 重写）：**全屏白底 overlay**（不是居中卡片），结构自上而下：
  - **顶栏**：左 `← Embed Player`（返回 Embed Player 页）、中标题 **Player Customization**、右 **Cancel** 与 **Save**（Save 为深色胶囊主按钮，**初始禁用**，有改动才亮）。
  - **左侧**：播放器预览（浅灰底 `#f8fafc` 居中，图上限 800px）；**右侧**：固定 **460px** 的设置工具栏（左侧一条分隔线）。
  - **工具栏是两级导航**：主菜单标题 `Customizations`，下面两个条目 **Content Controls** 与 **Appearance and Layout**（各带一个 `›`）；点进去是**子页**，子页顶部有 `← CUSTOMIZATIONS` 返回链接与子标题。
  - **Content Controls 子页**（控制播放器里出现什么）：**Share**（Show / Hide）、**Download**（Show / Hide）、**Logo link**（Episode page / Podcast page / None）。
  - **Appearance and Layout 子页**（控制长什么样）：**Player color / Button color**（预设色板，选中后更新色值显示；标签在上、色板在下）、**Font color**（**下拉**：Auto / White / Black；2026-10-09 v2.80 由三颗值药丸改成下拉，与同栏的 Font / Right-to-left text 同款）、**Font**（Arial / Helvetica / Georgia / Times New Roman / Verdana）、**Right-to-left text**（No / Yes）；**Stylish 时换成 Button color + Height**（300px / 400px / 500px）。
  - 控件为**行式布局**：标签在左、控件在右。
  - 弹框**跟随页面上已选的风格**，内部**不放** Classic / Stylish 切换器。
  - **未保存改动**：Save 变亮；此时点 Cancel 或左上 `← Embed Player` 都会**先弹确认框**（`Cancel changes?` / `Exit without saving?`，文案与按钮照 Distribution）。**Cancel 会还原打开时的设置**，Save 则保留并关闭。
- 底部链接：获取多集嵌入播放器请前往 `Distribution → Embed Player` 页面。

---

## 10. Toast 通知

自动消失的全局通知，支持 success / info / error 三种类型（带不同图标）。

常见触发场景：

| 场景 | 文案 |
|---|---|
| 发布成功 | `Episode published successfully!` |
| 更新成功 | `Episode updated successfully!` |
| 保存草稿 | `Episode saved successfully!` |
| 定时成功 | `Episode scheduled successfully!` |
| 表单校验失败 | ~~`Please select date and time.`~~ **（2026-10-09 v2.88 起改为就地标红，不再用 Toast）** |
| 批量设置季数 | `Set N episode(s) to Season X` |
| 批量清除季数 | `Removed all seasons from N episode(s).` |
| 批量设置标签 | `Tagged N episode(s) with: <标签列表>` |
| 批量清除标签 | `Cleared all tags from N episode(s).` |
| 批量删除 | `Deleted N episode(s).` |
| 批量校验失败 | `No episodes selected.`（Set Season 季数校验、Set Tags 未选标签校验均为弹窗内**内联错误**，不用 Toast） |

---

## 11. 数据与交互逻辑说明

### 11.1 数据源

- 剧集数据为前端硬编码数组 `episodes`（26 条模拟数据），字段：`title`、`status`、`when`、`dl`（下载量）、`tags`、`season`、`type`、`created`（创建时间，YYYY-MM-DD，用于 Free plan 删除倒计时与风险摘要计算）。其中 `type` 为非 Apple 剧集时存 `Free`，但**列表里显示成 `Public`**（2026-10-09 v2.95，见第 4 节）。
- 可用标签列表：`interview, solo, monetization, audio, video, tutorial, news, story, music, review`（运行时可新增）。

### 11.2 状态与数据流

- **状态切换**：Publish Episode 弹窗**标题始终为 Publish Episode**；右上角主按钮文案根据剧集当前 status 切换（新建剧集 / Published / Draft / AI Finished / AI Failed → Publish Now 或 Update；Future → Schedule Publish；**AI Processing** 不可编辑，不进入弹窗）。新建剧集与 Draft / AI Finished / AI Failed 均默认 Publish Now（即时发布），Future 默认 Schedule Publish。
- **三个动作的去向**（2026-10-09 v2.83 统一，详见 7.1）：
  - **Publish Now**（含**新建剧集**）→ 结束在 **Share & Embed 页面**（见 9.3），方便立即分享或复制嵌入代码；页面左上角的 `← Back to Episodes` 可回到进入前的列表页。新建剧集发布时会先按表单内容补一条 `episodes` 数据，因此它随后也会出现在列表里。
  - **Save as Draft** / **Schedule** → 结束在**进入前的那个列表页**（`publishReturnPage`），分别 Toast `Episode saved successfully!` / `Episode scheduled successfully!`。
  - 三者都在完成时 Toast：`Episode published successfully!` / `Episode updated successfully!`（更新已发布剧集）。
- **Free plan 删除倒计时**：`daysUntilDeletion()` 按 `created + 90 天 − 当前日期` 计算剩余天数；剩余 ≤ 14 天视为"即将删除"（标题后倒计时用暖橙色，并计入顶部风险摘要，见 5.2）。
- **布局版本**：当前只使用 V2 布局，旧版侧边栏布局（V1）已移除。V2 为左侧竖向锚点菜单 + 五个区块同页堆叠（不再是选项卡切换显隐）。

---

## 附：快速操作路径

| 目标操作 | 操作路径 |
|---|---|
| 新建剧集并上传音频 | 工具栏 **New Episode** → 上传/拖拽文件 → 填写标题与描述 → Publish Episode |
| 编辑已有剧集 | 列表点击行 / 行尾 **「3个点」** → **Edit Details** → 修改各区块内容 → Update |
| 批量设置季数/标签 | 勾选多行 → **Actions** → Set Season / Set Tags（标签相关入口需已安装 Tags app） |
| 分享单集 | 行尾 **「3个点」** → Share & Embed → Share / Embed Player |
| 设置 AI 参数 | New Episode → AI Enhance 区 → 对应 **Settings** 链接 |
| 查看某集的数据 | 列表 **Downloads** 那格的数字 → **Statistics → Episodes**（2026-10-09 v2.102） |
| 按发布时间排序 | 列表 **When** 表头 → 点击切换 升序 / 降序（2026-10-09 v2.103） |
| 查看 Free plan 剧集删除倒计时 | 侧边栏 **Episodes (free plan)** → 顶部风险摘要 / 标题后倒计时 |
