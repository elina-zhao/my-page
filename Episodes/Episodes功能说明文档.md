# Episodes 菜单功能说明文档

> 适用范围：`index.html`（Podbean Admin — Episodes）
> 文档版本：v1.9
> 说明：本文档为**功能 mockup**，逐页、逐控件描述 Episodes 菜单下的功能与交互逻辑。UI 文案保留英文原样。具体视觉样式由设计师另行确定，不在本文档范围内。

---

## 目录

1. [页面整体结构](#1-页面整体结构)
2. [Episodes 0 页面（空状态）](#2-episodes-0-页面空状态)
3. [Episodes 列表页面](#3-episodes-列表页面)
4. [Episodes 2 页面](#4-episodes-2-页面)
5. [New Episode 弹窗（Upload media file）](#5-new-episode-弹窗upload-media-file)
6. [Publish Episode 弹窗](#6-publish-episode-弹窗)
7. [AI Settings 弹窗](#7-ai-settings-弹窗)
8. [其他弹窗](#8-其他弹窗)
9. [Toast 通知](#9-toast-通知)
10. [数据与交互逻辑说明](#10-数据与交互逻辑说明)

---

## 1. 页面整体结构

**Episodes 0**、**Episodes**、**Episodes 2** 均为侧边栏一级菜单项（无子菜单）：

- **Episodes 0** — 空状态演示页面：展示用户**尚未创建/发布任何剧集**时的状态
- **Episodes** — 用户**已创建或发布剧集**后看到的完整 **Episodes 列表**页面
- **Episodes 2** — 演示页面，模拟用户开通 **Apple Podcast Subscription** 之后剧集列表多出一列 **Type** 的展示效果

同一 Episodes 页面在真实产品中根据用户是否有剧集数据，在"空状态"与"列表页"两种形态间切换；Episodes 0 与 Episodes 2 均为演示这两种形态/扩展形态的独立入口。

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
- **New Episode 按钮**：点击打开 New Episode 弹窗（见第 5 节），与列表页一致。

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
- **New Episode 按钮**：带 `+` 图标；点击打开 New Episode 弹窗（见第 5 节）。

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
- 点击底部 **Apply** 按钮应用筛选，Filter 按钮进入激活状态。
- **快速清除筛选**：Apply 后 Filter 按钮旁出现 `×` 清除按钮，点击一键将所有筛选重置为默认并关闭筛选弹窗（无需重新打开弹窗），同时 Filter 按钮退出激活状态。

**③ Actions 按钮 + 批量操作弹窗（位于表格选中条）**

Actions 按钮不在工具栏中，而是位于**表格选中条（alt-header-bar）**上：勾选剧集后，表格顶部出现替换表头（全选复选框 + 选中数量 `N selected`），**Actions** 按钮紧跟在 `N selected` 文字右侧，点击弹出操作菜单（**纯菜单**，无二级子面板）；选中条最右侧为 **Clear selection** 链接，点击清空所有勾选：

- 菜单入口：
  - **Set Season**（批量设置季数）→ 打开 **Set Season** 对话框
  - **Set Tags**（批量设置标签）→ 打开 **Set Tags** 对话框
  - **Delete**（危险操作，红色显示）→ 打开 **Delete** 确认弹窗
- 各入口弹出的对话框均为**模态弹窗**，与 Delete 确认弹窗同一套样式（居中卡片、遮罩层、底部 Cancel / 主操作按钮）；打开弹窗时自动收起 Actions 菜单。

**Delete 确认弹窗：**

- 标题：`Delete selected N episode(s)`（N 为勾选数量，单数/复数自适应）。
- 说明：`Are you sure you want to delete the selected episode(s)? This action cannot be undone and will also permanently delete the attached media files.`
- 按钮：**Cancel**（取消，关闭弹窗）/ **Delete**（红色，确认删除勾选剧集）。
- 确认删除后：从表格移除勾选的行，弹出 Toast：`Deleted N episode(s).`。

**互斥规则**：Filter 筛选弹窗与 Actions 批量操作弹窗互斥——打开其中一个时自动收起另一个。

**Set Season 弹窗：**

- 说明文字：`Set or change the season number for all selected episodes.`
- **Season No.** 文本输入框，手动输入季数（placeholder：`e.g. 1`）；支持 Enter 快捷提交。
- 校验：需为不小于 1 的整数，否则弹出 error 类型 Toast：`Please enter a valid season number (e.g. 1).`
- **Set Season**（主按钮）与 **Remove Season**（红色按钮）**并排**放置（左：Remove，右：Set），等宽。
- **Set Season**：将所填季数应用（设置/更改）到所有勾选剧集；成功后弹出 Toast：`Set N episode(s) to Season X`。
- **Remove Season**：点击**直接**批量清除勾选剧集的季数（无需二次确认）；完成后弹出 Toast：`Removed season from N episode(s).`。
- 未勾选剧集时弹出 error 类型 Toast：`No episodes selected.`
- 关闭方式：点击右上角 **×**，或点击弹窗以外区域；打开弹窗时自动收起 Actions 菜单。
- 弹窗规格：宽 520px、`min-height:300px`，与 Set Tags 弹窗一致；高度不足时底部按钮沉底对齐，内容超出自然撑高。

**Set Tags 弹窗：**

- 已选标签以 chip 形式显示，可点击 `×` 移除。
- 输入框支持搜索/创建标签（placeholder：`Select or type tags...`）。
- 下拉列表展示可用标签及其使用数量（如 `interview` + `3 episodes`）；可勾选多个。
- 输入新标签名且不存在时，出现 `+ Create "xxx"` 选项。
- 支持快捷键：Enter 添加当前输入为标签；Backspace（输入框为空时）删除最后一个已选标签。
- **Set Tags**（主按钮）与 **Remove Tags**（红色按钮）**并排**放置（左：Remove，右：Set），等宽。
- **Set Tags**：将所选标签应用到所有勾选剧集；成功后弹出 Toast：`Tagged N episode(s) with: <标签列表>`。
- **Remove Tags**：点击**直接**批量清除勾选剧集的全部标签（无需二次确认）；完成后弹出 Toast：`Cleared all tags from N episode(s).`。
- 校验失败时弹出 error 类型 Toast：未勾选剧集 → `No episodes selected.`；未选择任何标签 → `Please select at least one tag.`
- 关闭方式：点击右上角 **×**，或点击弹窗以外区域；打开弹窗时自动收起 Actions 菜单；操作完成后自动关闭。

### 3.3 剧集表格

**列结构：**

| 列 | 说明 |
|---|---|
| 复选框 | 用于多选（列头为全选复选框） |
| Title | 剧集标题 |
| User | 用户 |
| Status | 状态徽章 |
| When | 发布时间 |
| Downloads (All time) | 累计下载量 |

**状态值：** Published、Draft、Future、AI Processing、AI Finished、AI Failed。

**行交互：**

- 整行可点击 → 打开 **Publish Episode** 弹窗（编辑模式，标题为 Edit Episode / 按钮为 Update）。
- 悬停行时，标题旁浮现 3 个行内操作按钮：
  - **Edit**（编辑）→ 打开编辑弹窗
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

工具栏、筛选弹窗、Actions 弹窗（含 Delete，位于表格选中条）、分页等与 Episodes 列表相同。

---

## 5. New Episode 弹窗（Upload media file）

全屏弹窗，标题 `Upload media file`，左上角为 Cancel（关闭弹窗）。弹窗分两步：

### Step 1：上传媒体文件

**左侧 —— 上传区域（Upload Zone）：**

- 大区域，支持点击浏览或拖拽文件上传。
- 标题：`Upload Media File`；提示：`Drag & drop your audio or video file here, or click to browse`。
- 支持的格式：`mp3, m4a, ogg, mp4, m4v, mpg, zip, pdf, ppt, docx, xml`。
- 文件选择后进入 **Step 2**（并记录文件名）。
- 底部链接：**Skip for now →**（跳过上传，直接打开 Publish Episode 弹窗）。

**右侧 —— AI Enhance 面板：**

- 标题：**AI Enhance**
- **剩余积分（Remaining Credits）**：显示 `2,800`；悬停弹出 tooltip，说明：
  - 剩余 2,800 / 2,800 积分
  - 约等于 280 分钟 AI Audio Optimization，或 560 分钟 AI Content Assistant
  - AI Content Assistant 300 积分/小时；AI Audio Optimization 600 积分/小时

- **AI Audio Optimization** 区块（带开关）：
  - 功能列表：Noise Reduction、Intelligent Leveler、Cut Filler Words and Silence、Filtering & AutoEQ
  - 链接：`How it works →`、`Settings`（打开 AI Audio Optimization Settings 弹窗）
  - 开关关闭后，该区块内容不可交互

- **AI Content Assistant** 区块（带开关）：
  - 功能列表：Automated Title and Show Notes、Precisely Crafted Chapter Markers、AI Enhanced Transcripts
  - 链接：`How it works →`、`Settings`（打开 AI Content Assistant Settings 弹窗）
  - 开关关闭后，该区块内容不可交互

### Step 2：剧集详情

**左侧：**

- 返回按钮（← Back）回到 Step 1。
- 文件信息行：显示所选文件名。
- **Episode Title** 输入框。
- **Description** 文本域。
- **Publish Episode** 按钮：发布并自动打开分享弹窗（针对最新一条剧集）。

**右侧 —— Podbean AI 状态面板：**

- 标题 `Podbean AI`，副标题 `AI settings for this episode`。
- **AI Audio Optimization** 状态项：显示 `Enabled` / `Disabled`（取决于 Step 1 开关）。
- **AI Content Assistant** 状态项：同理。
- 提示文字：`You can adjust AI settings before publishing.`
- 链接：`← Back to AI Settings`（回到 Step 1）。

---

## 6. Publish Episode 弹窗

全屏弹窗，用于新建（草稿状态时标题为 Publish Episode）或编辑（已发布时标题为 Edit Episode）剧集。

### 6.1 顶栏

| 控件 | 说明 |
|---|---|
| **Cancel** | 有未保存修改时弹出 "Unsaved Changes" 确认框；否则直接关闭 |
| **标题** | Publish Episode / Edit Episode |
| **Save as Draft** | 保存草稿并关闭（Toast 提示 "Episode saved as draft!"） |
| **Publish 按钮** | 主按钮，文案随状态变化：Publish Now / Update / Schedule Publish |
| **下拉箭头** | 展开下拉菜单，可切换 **Schedule Publish**（定时发布） |

规则：

- 标题或文件名未填时，Publish 按钮为禁用态。
- 点击 "Schedule Publish" 后按钮文案切换为 "Schedule Publish"，再次点击主按钮会打开 Schedule Publish 弹窗（见 8.1）。
- 发布/更新成功时显示 Toast，并（编辑已发布剧集时）自动打开 Share Episode 弹窗。

### 6.2 内容区 —— 选项卡

Tab 顺序：**Episode Info → Transcripts → Chapter Markers → More Options**。

#### Episode Info 选项卡

**① File Name**

- 显示当前文件名（如 `episode-audio.mp3`），带 `Change` 链接，点击选择新文件。

**② Title**

- 剧集标题输入框，placeholder 为 `Enter episode title`。标题变化会实时同步更新 Publish 按钮可用状态。

**③ Description（富文本编辑器）**

- 工具栏：B（加粗）、I（斜体）、U（下划线）、无序列表、有序列表。
- 内容区为可编辑区域，placeholder：`One or more sentences describing your episode to potential listeners.`

**④ Episode Artwork（剧集封面）**

- 封面预览图。
- 提示：`Between 1400 and 2048 pixels square (jpg or png).`
- **Upload** 按钮 + 下拉箭头：点击下拉可从账号已有 Logo 中选择（Logo 1~4），或直接上传本地图片。

**⑤ Social Sharing（社交分享）**

- 标题：`Social Sharing`；说明：`Auto-share after publishing — click icons to enable or disable.`
- 社交图标（点击切换启用/停用）：Facebook、X (Twitter)、LinkedIn、**YouTube**、WordPress。
- 点击 YouTube 图标激活时，展开 **YouTube Settings** 子面板：
  - **Visibility**：Public / Unlisted
  - **Category**：Education / Entertainment / Technology
  - **Language**：English / Spanish / Chinese
  - **Paid Promotion**：复选框 `Contains paid promotion`

#### Transcripts 选项卡

**① 音频播放器（与 Chapter Markers 共享同一播放器）**

- 播放/暂停按钮、文件名、当前时间、进度条、总时长。进度条可点击跳转。

**② Episode Transcripts 区块**

- 标题：`Episode Transcripts`。
- **Upload SRT/VTT** 按钮：上传 .srt / .vtt 字幕文件，内容读入文本域。
- **Download** 按钮 + 下拉：`Captions (.srt)` 或 `Plain Text (.txt)`。下载 .txt 时会自动剥离 SRT 时间轴编号。
- **Transcript** 文本域：可粘贴/输入转写文本，placeholder：`Paste or write your episode transcript here...`
- 底部提示：`Paste or type your transcript above, or upload a .srt or .vtt file.`

#### Chapter Markers 选项卡

**① 音频播放器**

- 播放时实时更新 `Add Chapter` 按钮上的当前时间标签。

**② Chapters 列表**

- 标题：`Chapters`，右侧显示总数（如 `8 total`）。
- 表格列：Time（点击可跳转播放到该时间点）、Title、删除按钮。
- 空状态：显示 "No chapter markers yet..." 提示。
- **Add Chapter 按钮**：从播放器当前位置添加章节，弹出 Add Chapter Marker 弹窗：
  - **Start Time (mm:ss)**：播放器当前时间自动填入，可手动修改。
  - **Chapter Title**：章节标题。
  - Cancel / Add Chapter（Enter 也可提交）。
  - 时间格式校验：`mm:ss` 或 `hh:mm:ss`。
- 章节按时间自动排序。

#### More Options 选项卡

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

---

## 7. AI Settings 弹窗

两个独立的模态弹窗，均由 New Episode 弹窗中的 Settings 链接触发。

### 7.1 AI Audio Optimization Settings

标题：`AI Audio Optimization`，右上角 `×` 关闭。

| 控件 | 说明 |
|---|---|
| **Denoising Method（下拉）** | 降噪方式：`Static`（仅移除恒定噪声）/ `Dynamic`（保留人声和音乐，移除其他，默认）/ `Speech Isolation`（保留人声，移除其他） |
| Denoising Method 解释 | 说明 AI 应只移除静态噪声还是也包括快速变化噪声，以及是否保留/消除音乐 |
| **Cut Silence（开关）** | 移除静音段落；解释：检测并移除录音中的静音片段（可能由停顿、呼吸、设备调整导致），视频文件除外 |
| **Cut Fillers（开关）** | 移除口头填充词；解释：检测并移除 "um"、"uh"、"mh"、德语 "ähm"、法语 "euh"、西班牙语 "eh" 等填充词，视频文件除外 |
| 底部说明 | 提示：`The changes you made will be applied when you publish new episodes using AI Audio Optimization.` |
| **Save 按钮** | 保存并关闭 |

### 7.2 AI Content Assistant Settings

标题：`AI Content Assistant`，右上角 `×` 关闭。

| 控件 | 说明 |
|---|---|
| **Description Style（下拉）** | 描述风格：`Standard`（简洁清晰的剧集描述，默认）/ `Informative`（概述主题、嘉宾和要点）/ `Conversational`（随意友好的语气）/ `Storytelling`（叙事风格吸引听众） |
| **Description Length（下拉）** | 描述长度：`Brief`（简洁，突出要点，默认）/ `Comprehensive`（详细，覆盖各方面） |
| **Transcript Speaker Diarization（开关）** | 说话人分离；解释：自动为说话人添加标识（如 Speaker 1），并允许在剧集转写编辑框中修改这些名称以实现个性化 |
| 底部说明 | 提示：`The changes you made will be applied when you publish new episodes using AI Content Assistant.` |
| **Save 按钮** | 保存并关闭 |

---

## 8. 其他弹窗

### 8.1 Schedule Publish（定时发布）

模态弹窗：

- 标题：`Schedule Publish`；说明：`Choose the date and time to publish this episode.`
- **Date**（日期输入框，默认当天）、**Time**（时间输入框，默认当前时间）。
- 按钮：Cancel / **Schedule**。
- 未填日期或时间时 Toast 报错 `Please select date and time.`；成功则 Toast 显示 `Episode scheduled for <date> <time>`。

### 8.2 Unsaved Changes（未保存修改确认）

当从 Publish Episode 弹窗点击 Cancel/返回且存在未保存修改时弹出：

- 标题：`Unsaved Changes`；说明：`You have unsaved changes. Are you sure you want to leave?`
- 按钮：**Leave**（离开，回到 New Episode 弹窗）/ **Stay**（留在当前页）。

### 8.3 Share Episode（分享/嵌入弹窗）

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

## 9. Toast 通知

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
| 批量清除季数 | `Removed season from N episode(s).` |
| 批量设置标签 | `Tagged N episode(s) with: <标签列表>` |
| 批量清除标签 | `Cleared all tags from N episode(s).` |
| 批量删除 | `Deleted N episode(s).` |
| 批量校验失败 | `No episodes selected.` / `Please select at least one tag.` / `Please enter a valid season number (e.g. 1).` |

---

## 10. 数据与交互逻辑说明

### 10.1 数据源

- 剧集数据为前端硬编码数组 `episodes`（26 条模拟数据），字段：`title`、`status`、`when`、`dl`（下载量）、`tags`、`season`、`type`。
- 可用标签列表：`interview, solo, monetization, audio, video, tutorial, news, story, music, review`（运行时可新增）。

### 10.2 状态与数据流

- **状态切换**：Publish Episode 弹窗会根据剧集当前 status 切换标题与主按钮文案（Published → Edit Episode / Update；其他 → Publish Episode / Publish Now）。
- **发布联动**：发布成功后自动打开 Share Episode 弹窗，方便立即分享或复制嵌入代码。
- **布局版本**：当前只使用选项卡布局（V2），旧版侧边栏布局（V1）已移除。

---

## 附：快速操作路径

| 目标操作 | 操作路径 |
|---|---|
| 新建剧集并上传音频 | 工具栏 **New Episode** → 上传/拖拽文件 → 填写标题与描述 → Publish Episode |
| 编辑已有剧集 | 列表点击行 / 悬停 Edit → 修改各 Tab 内容 → Update |
| 批量设置季数/标签 | 勾选多行 → **Actions** → Set Season / Set Tags |
| 分享单集 | 悬停行 **Share & Embed** → Share / Embed Player |
| 设置 AI 参数 | New Episode → AI Enhance 区 → 对应 **Settings** 链接 |
