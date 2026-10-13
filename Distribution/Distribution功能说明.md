# Distribution 模块功能说明

> 本文档说明 Podbean 后台 **Distribution（分发）** 菜单及其下属子菜单页面的功能。
> 适用范围：功能验收、使用说明、回归测试参考。

---

## 一、模块概述

**Distribution** 是侧边栏主菜单项，点击后展开其子菜单（sub-menu）。该模块的核心目标是：**帮助用户把播客分发到各大平台、做好分发前准备、并在分发后管理网站与社交渠道**。

子菜单共 7 项（从上到下）：

| # | 子菜单 | 页面 ID | 功能定位 |
|---|--------|---------|----------|
| 1 | Podcast Apps | `page-podcast-apps` | 分发平台总览列表 |
| 2 | Podcast Apps 2 | `page-podcast-apps-2` | 分发平台列表（Apple 已批准视角） |
| 3 | Podcast apps-upgrade | `page-podcast-apps-upgrade` | 分发功能升级推广页 |
| 4 | Podcast apps-preaction | `page-podcast-apps-preaction` | 分发前准备清单 |
| 5 | Social Share | `page-social-share` | 社交平台自动分享 |
| 6 | Podcast Website | `page-podcast-website` | 播客网站管理 |
| 7 | Embed Player | `page-embeddable-player` | 多集嵌入播放器 |

> 说明：从 **Podcast Apps** 平台列表点击部分平台卡片，会进入独立的提交子页面：
> **Apple Podcasts 提交页**、**Spotify 提交页**、**YouTube 提交页**、**Amazon Music/Audible 提交页**、**iHeartRadio 提交页**、**Player FM 提交页**、**Listen Notes 提交页**、**Podchaser 提交页**、**Boomplay 提交页**（见下文）。**Podbean App** 为宿主平台，卡片常驻显示"已上线"，点击进入 **Podbean App 信息页**（下载推荐 + Badge 推广代码生成器）。

---

## 二、子菜单页面功能说明

### 1. Podcast Apps（分发平台总览）

**定位**：分发到各大平台的入口列表。

- 页面标题下方有一句引导文案："Distribute your podcast to every major platform and reach millions of listeners worldwide."
- 平台列表（`distPlatformData`，共 10 个平台卡片）：
  1. **Apple Podcasts**
  2. **Spotify**
  3. **YouTube**
  4. **Podbean App**
  5. **Amazon Music / Audible**
  6. **iHeartRadio**
  7. **Player FM**
  8. **Podchaser**
  9. **Boomplay**
  10. **Listen Notes**
- 每个卡片展示：平台图标 + 平台名 + 右侧操作区。
- **卡片外观**：卡片之间无独立边框，用**横向分割线**分隔；鼠标悬停时卡片整行显示**淡灰色底色**。
- **卡片操作**：
  - **未提交**状态：右侧显示 **Submit** 按钮，代表待办操作。
  - **Apple Podcasts / Spotify / YouTube / Amazon Music/Audible / iHeartRadio / Player FM / Listen Notes / Podchaser / Boomplay**：点击卡片任意位置（包括 Submit 按钮）打开对应提交页：
    - Apple Podcasts → 打开 **Apple 提交页**（Submit tab）。
    - Spotify → 打开 **Spotify 提交页**。
    - YouTube → 打开 **YouTube 提交页**。
    - Amazon Music/Audible → 打开 **Amazon 提交页**（阅读并接受 Content License Agreement 后提交）。
    - iHeartRadio → 打开 **iHeartRadio 提交页**（勾选 6 项要求/条款后提交）。
    - Player FM → 打开 **Player FM 提交页**（勾选 3 项要求/条款后提交）。
    - Listen Notes → 打开 **Listen Notes 提交页**（两步流程：复制 RSS Feed，用户自行到 Listen Notes 网站提交；收到 URL 后粘贴保存）。
    - Podchaser → 打开 **Podchaser 提交页**（勾选 3 项要求/条款后提交）。
    - Boomplay → 打开 **Boomplay 提交页**（勾选 3 项要求/条款后提交）。
    - Submit 按钮与整卡点击行为一致。
  - **Podbean App**：宿主平台，播客天然已在其 App 上线——卡片**常驻显示"已提交"（绿色对勾）**，无 Submit 按钮；但**整卡可点击**，进入 **Podbean App 信息页**（自动上线说明 + 下载推荐 + Badge 推广代码生成器），悬停显示 **Manage** 提示。
  - **待审核（Pending）**状态：通过提交页底部 **Submit** 提交后（Apple / Spotify / Amazon Music / iHeartRadio / Player FM / Podchaser / Boomplay），该平台进入"待平台审核"状态：
    - **点击 Submit 后停留在提交页**，不自动跳回列表，让用户查看 pending 状态。
    - 提交页立即切换为琥珀色 **"Submission Pending Approval"** 横幅（与 Apple Podcasts 的 pending 状态一致），隐藏提交表单与 URL 区块、隐藏底部操作栏；通过面包屑返回 Podcast Apps。
    - 列表卡片右侧不再显示绿色对勾，改为**琥珀色时钟图标 + Pending 文案**（悬停仍显示 **Manage**，可重新进入提交页）。
    - **不提供"Check Approval Status"演示按钮**——审核通过后的 Live 状态已在 **Podcast Apps 2** 页面演示（见第 2 节），页面 1 的 Pending 即为终态。
  - **已提交/已上线**状态：右侧显示对勾（✓）。
    - **有提交页的平台**（Apple / Spotify / YouTube / Amazon / iHeartRadio / Player FM / Listen Notes / Podchaser / Boomplay）：鼠标悬停卡片时显示 **Manage** 提示，表明卡片可点击重新打开提交页管理。
    - **Podbean App**：同样显示对勾 + **Manage** 提示（常驻），点击进入信息页。
  - 已提交的 **Apple Podcasts** 卡片整体可点击 → 重新打开 Apple 提交页（批准后进入 approved 视图）。

**状态模型**：`distSubmitted = { key: true/false }` 记录"已提交"，`distPending = { key: true/false }` 记录"待审核（已提交但未通过平台审核）"。提交页 Submit 后 → `submitted=true, pending=true`（卡片显示 Pending）；保存已有 URL 或模拟审核通过后 → `pending=false`（卡片显示绿色对勾 + Live 视图）。**Podbean App 不依赖该状态**，渲染时强制常驻显示"已提交"。

---

### 2. Podcast Apps 2（全平台已提交视角）

**定位**：与 Podcast Apps 相同的平台列表，但以"**所有平台均已提交**"为前提的视角。

- 列表内容与 Podcast Apps 基本一致（同一 `renderDistList` 渲染，渲染到独立的 `paDistList2` 容器）。
- **差异点**：
  - **所有平台在此页始终显示为"已提交"（绿色对勾）**，不依赖实际 `distSubmitted` 状态（`isSubmitted2` 恒为 true）。
  - 无 Submit 按钮；有提交页的平台（含 Apple / Spotify / YouTube / Amazon / iHeartRadio / Player FM / Listen Notes / Podchaser / Boomplay）悬停显示 Manage 提示，可点击重新进入对应提交页管理。
  - **Apple Podcasts** 卡片点击 → 打开 Apple 提交页并进入 **approved（已批准）视图**（`openAppleApprovedView`）。
  - **其他提交页平台从本页打开时，显示"已上线"状态详情**（`applyDistView` / `openListenNotesModal` / `openYouTubeModal`）：
    - 顶部 **Live 状态卡**：平台图标 + 平台名 + 绿色 **Live** 徽标 + "Your podcast is live on {平台}." 文案（`XxxLiveCard`，随已提交视图显示/隐藏）。
    - 隐藏提交表单（`XxxSubmitWrap` / Step 1 / Step 2 URL 输入框）与 "Already submitted? Save your existing URL here" 链接。
    - 下方显示 **Your podcast URL in {平台}** + 该平台 URL（无已存 URL 时使用各平台默认/示例 URL，见 `distPlatformData.url`）+ **View→**。
    - URL 下方显示 **Delete the podcast URL from Podbean** 链接（从本页删除后保持已提交视图并恢复默认 URL，不弹回表单）。

---

### 3. Podcast apps-upgrade（分发升级推广页）

**定位**：面向未升级用户的推广落地页，引导用户升级后启用分发。

- 顶部 **"Distribute to"** 平台信任网格：展示 10 个主流平台 logo（Apple Podcasts、Spotify、YouTube、Podbean App、Amazon Music、iHeartRadio、Player FM、Podchaser、Boomplay、Listen Notes）。
- 中部推广横幅：
  - 标题："Your voice deserves to be heard everywhere."
  - 副文案：说明一键发布到各大平台、触达更多听众。
  - **"Upgrade to Distribute"** 按钮 → 跳转到 Podcast Apps 列表页。

---

### 4. Podcast apps-preaction（分发前准备清单）

**定位**：在正式分发前，引导用户完成 5 项通用准备。

- 同样有 "Distribute to" 平台信任网格。
- **"Complete these items before distributing."** 清单，共 5 步：
  1. **Podcast title & description**（播客标题与描述）— 默认已完成（显示对勾）
  2. **Upload podcast cover art**（上传封面）— 点击 **Upload** 标记完成
  3. **Podcast category**（选择分类）— 点击 **Add** 标记完成
  4. **First episode**（发布第一集）— 点击 **Publish** 标记完成
  5. **Podcast language**（选择语言）— 默认已完成（显示对勾）
- 每步有编号（01-05）、图标、名称；未完成步骤提供动作按钮，点击后切换为对勾（`completeStepPreaction`）。
- 顶部显示计数："Complete all 5 steps"。
- **不含 MP3 步骤（2026-08-07 移除）**："Generate MP3 for Video Episodes" 不再作为分发前通用步骤——它是条件性设置（仅 feed 含视频单集时相关），改由 Spotify / Amazon / iHeartRadio 提交时的门槛弹窗与 Podcast Apps 页的下架预警横幅按需引导。

---

### 5. Social Share（社交分享）

**定位**：将播客单集自动分享到社交平台，需先连接账号。

- 页面说明："Auto-share your podcast episodes to social platforms. Click **Connect** to link your account."
- **平台列表**（`platformData`）：
  - **Facebook**
  - **LinkedIn**
  - **YouTube**
  - **Tumblr**
  - **WordPress**
- **连接流程**：
  1. 点击平台卡片的 **Connect** → 打开授权模态框（OAuth 风格）：
     - 显示平台图标、标题"Connect to {平台}"、副标题、3 条权限说明。
     - 点击 **Authorize** → 切换为成功视图（显示对勾 + 成功文案），约 1.5 秒后自动关闭。
  2. 连接成功后：卡片按钮变为 **Remove**，同时出现 **Edit** 按钮。
  3. 点击 **Edit** → 打开 {平台} Settings 模态框（Save Settings）。
  4. 点击 **Remove** → 断开连接，按钮恢复为 Connect。

---

### 6. Podcast Website（播客网站管理）

**定位**：管理播客官网的主题、域名、页面。

#### 6.1 三个 Tab
- **Theme Templates**（主题模板，默认）
- **Website URL**（网站域名）
- **Pages**（页面管理）

#### 6.2 Theme Templates
- 顶部展示当前主题 **DoubleTree 1.0**（by Podbean）：
  - **预览图** + **Web / Mobile** 视图切换按钮（切换不同截图）。
  - 主题介绍文案。
  - **Customize** 按钮（自定义主题设置）。
  - **Visit Website ↗** 链接 → 打开网站（域名已保存时打开自定义域名，否则弹出提示）。
- **Alternative Templates** 备选主题区：
  - **Vertex** 主题卡片 + **Activate Now** 按钮（激活）。
  - 占位卡片："More designs coming soon"（更多设计即将上线）。

#### 6.3 Website URL
两种域名方案，互斥切换（`toggleUrlSection`）：

1. **Built-in Domain（内建域名，默认）**
   - 说明：始终可通过该域名访问，永不过期；修改会影响播客 feed URL。
   - 编辑：`{前缀}.podbean.com` 前缀可编辑。
2. **Use a domain I own（自定义域名，可选）**
   - 需完成两步：**① 设置 CNAME DNS 记录**（映射到 `pbcdn2.podbean.com`，附 FAQ 链接）；**② 输入并连接自有域名**。
   - 保存成功后显示 **Connected** 徽标 + 可断开连接（带确认模态框）。

- 底部 **Save** 按钮 → 保存当前域名方案并弹窗确认。

#### 6.4 Pages
- 顶部子 Tab：**V1**（空模板视图）/ **V2**（列表视图）+ **"+ New Page"** 按钮。
- **V1（空视图）**：无页面内容时的空状态提示，可"Learn more"。
- **V2（列表视图）**：
  - 表格列：全选勾选、Title（含可见性眼睛图标）、Author、Page Order（可编辑排序）、When（创建时间）。
  - 点击行 → 编辑页面（`editPage`）。
  - Page Order 可打开模态框修改排序数字。
  - 顶部有全选 checkbox。

---

### 7. Embed Player（嵌入播放器）

**定位**：生成可在外部网站嵌入的多集播放器代码。

- **左侧预览区**：
  - 可视化播放器预览（加载时显示 "Loading player preview..."）。
  - **View Embed Code** 切换 → 显示/隐藏嵌入代码 textarea。
- **操作按钮**：
  - **Copy Embed Code** → 复制嵌入代码。
  - **Customize Your Player ↗** → 打开自定义面板。
- **自定义面板（Player Customization overlay）**：
  - 顶栏：返回 / 标题 / **Cancel** / **Save**（Save 在无改动时禁用）。
  - 左侧：实时预览（`epPlayerCustom`）。
  - 右侧工具栏：
    - **Content Controls（内容控制）**：
      - Episode Filter：All / Publish Time / Season NO. / Tags；按选择显示对应条件（日期区间 / 季度 / 标签）。
    - **Appearance and Layout（外观与布局）**：主题色、布局等设置。
  - 修改后实时更新预览；点击 **Save** 保存并返回。
  - 离开时若存在未保存改动，弹出 **Leave/Stay 确认对话框**（`epConfirmOverlay`），防止误丢改动。

---

## 三、分发提交子页面

以下子页面从 **Podcast Apps** 列表点击对应平台卡片进入，均使用"面包屑返回 Podcast Apps + 底部浮动操作栏"的布局。

> **提交后状态（Pending）**：通过底部 **Submit** 提交的平台（Apple / Spotify / Amazon Music / iHeartRadio / Player FM / Podchaser / Boomplay）会进入**待审核（Pending）**状态——**提交后停留在提交页**，顶部显示琥珀色 **"Submission Pending Approval"** 横幅，卡片显示琥珀色时钟 + **Pending**；审核通过后的 Live 状态（绿色对勾 + Live 状态卡 + 平台 URL 视图）在 **Podcast Apps 2** 页面演示。**Listen Notes / YouTube** 为自助提交平台，保存 URL 即视为已上线，不经过 Pending。

### 4.1 Apple Podcasts 提交页

**三个并行 Tab**（`switchAppleTab`）：**Submit | Enable HLS Video | Apple Podcast Subscription**。

#### Tab 1 — Submit
- **已提交场景**："Already submitted your podcast to Apple Podcasts?" → **Save your existing URL here** 模态（输入 URL 保存；保存后显示 URL + View→ + 删除链接）。
- **未提交表单**（`appleSubmitWrap`）：
  - **Show Information（必填）**：
    - Content Rights（内容版权声明）：两个选项下拉。
    - Update Frequency（更新频率）：Weekly / Daily / Biweekly / Monthly / No Set Schedule。
  - **同意条款**：顶部为一个**确认勾选框**（`appleAgree`），勾选框文字即条款标题「I agree to the Apple Podcasts content requirements」；其下为 3 项条款明细**纯文本**（无独立勾选框）：请求 Podbean 代提交并同意服务条款；确认符合 Apple 内容要求；确认拥有音乐授权。勾选确认框后 Submit 才可点击（2026-08-07 改为单一确认勾选框，取代 Select all + 逐项勾选）。
  - 底部栏 **Submit** 按钮：所有下拉已选 + 确认勾选框已勾选才可点击。
- **提交后状态**：
  - **Pending**（待审核）横幅："Submission Pending Approval"，审核约 1–5 个工作日。
  - **Approved**（已批准）横幅 + 显示 Apple 播客 URL（View→）。
- **Claim 你的播客**（`appleClaimSection`，批准后出现）：
  - 标题 "Next, claim your podcast" + 说明（claim 后可启用 HLS Video 与 Subscriptions）。
  - 输入 **Apple Podcasts claim token**（附 "How to get claim token? →" 帮助链接）。
  - 底部栏 **Save** → 保存 token，显示成功横幅。
  - **Token 持久化**：保存后 token 仍保留在输入框，claim 区域保持可见，便于 Apple 验证失败时重新输入保存。

#### Tab 2 — Enable HLS Video
- **未批准/未 claim**：显示功能介绍卡片（图标 + 说明），不显示具体步骤。
- **已批准且已 claim**：直接显示 6 步设置步骤（登录 Apple Podcasts Connect → Account > Keys → + → 命名 → Generate/Download → 上传 API Key 文件），底部 **Choose File** 选择 `.p8/.json/.txt/.key` 文件；底部栏 **Save** 保存（选中文件后才可点击）。

#### Tab 3 — Apple Podcast Subscription
- 同样先显示功能介绍（未批准/未 claim）。
- 已批准且已 claim 后，直接显示 4 步设置步骤（发布至少一集 → 注册订阅 → 下载 API Key → 上传 API Key），**Choose File** + 底部栏 **Save**。

#### 底部栏（Apple）
- 同一底部栏按当前 Tab / 状态切换按钮：Cancel + Submit（表单）/ Save（claim）/ Save（HLS）/ Save（Subs）。

---

### 4.2 Spotify 提交页

- **已提交场景**：可保存已有 Spotify URL（View→ / 删除）。
- **未提交表单**：
  - **同意条款**：顶部为一个**确认勾选框**（`spotifyAgree`），勾选框文字即条款标题「I agree to the Spotify content requirements」；其下为 3 项条款明细**纯文本**（无独立勾选框）。勾选确认框后 Submit 才可点击（2026-08-07 改为单一确认勾选框，取代 Select all + 逐项勾选）。
  - 底部栏 **Submit**：勾选确认框即可点击。
  - **提交时 MP3 门槛（三个仅音频平台统一，2026-08-07 由常驻要求卡改为提交时弹窗）**：当 feed 含视频单集（`feedHasVideo`，Podcast Apps 页顶部 **Feed** 演示开关切换）且全局 **Generate MP3 for Video Episodes**（`mp3ForVideoEnabled`）未开启时，点击 **Submit** 弹出 **mp3GateModal** 提醒：「Your feed includes video episodes. Audio-only platforms require an MP3 audio version of video episodes」。弹窗内**直接展示 "Generate MP3 for Video Episodes" 的说明文字**（说明自动为视频单集生成 MP3 以兼容仅音频平台、并为支持视频的平台提供 HLS 视频流），**无 Off 徽标、无 What's this? 链接**。按钮 **Cancel**（关闭弹窗、不提交、无 toast；再点 Submit 仍会弹窗）与 **Enable**（调用 `enableMp3AndSubmit()` 就地开启全局设置 + 成功 toast，并**自动继续完成被拦截的本次提交**，无需再次点击 Submit）。纯音频 feed（无视频单集）不弹窗，可直接提交。
  - 全局设置 `mp3ForVideoEnabled` 由 `enableMp3ForVideo()` 统一开启（信息弹窗 / 预警横幅的 Enable 调用它；门槛弹窗的 Enable 调用 `enableMp3AndSubmit()`，开启后自动继续提交）。

---

### 4.3 YouTube 提交页

- **Step 1 — 提交 RSS feed 到 YouTube**：引导在 YouTube Studio 中 **Create New podcast** → **Submit RSS feed**；附 **Ownership Verification Email**（所有权验证邮箱）说明模态；**Open YouTube Studio** 按钮跳转。
- **Step 2 — 保存你的 YouTube podcast URL**：在 YouTube Studio 获取播放列表地址并粘贴保存。
- 已提交场景可保存已有 URL。

---

### 4.4 Amazon Music / Audible 提交页

- **已提交场景**：可保存已有 Amazon Music/Audible URL（View→ / 删除）。
- **未提交表单**：
  - **Content License Agreement（内容授权协议）**：展示 Amazon Music/Audible 的完整授权协议文本（可滚动阅读）。
  - 勾选 **"I accept Amazon Music/Audible agreement"** 表示接受该协议。
  - 底部栏 **Submit**：勾选接受协议即可点击；若 feed 含视频单集且 `mp3ForVideoEnabled` 关闭，点击时同样弹出 **mp3GateModal** 拦截（Cancel 不提交；Enable 就地开启并**自动继续完成本次提交**）；提交后进入 Pending 待审核状态并停留在提交页。
- **与 Apple / Spotify / YouTube 一致**：整卡可点击进入；已提交后悬停卡片显示 Manage 提示。

---

### 4.5 iHeartRadio 提交页

- **已提交场景**：可保存已有 iHeartRadio URL（View→ / 删除）。
- **未提交表单**：
  - **6 项要求/条款**：顶部为一个**确认勾选框**（`iheartradioAgree`），勾选框文字即条款标题「I agree to the iHeartRadio content requirements」；其下为 6 项条款明细**纯文本**（无独立勾选框）：请求 Podbean 代提交 + 同意服务条款；已查阅内容要求；确认音乐授权；已知晓 iHeartMedia 不保证内容采用/发布且可能随时移除；同意 Content License Agreement / Terms of Use 且不违反内容政策；同意遵守 DMCA 并保证提交信息真实授权（2026-08-07 改为单一确认勾选框，取代 Select all + 逐项勾选）。
  - 底部栏 **Submit**：勾选确认框即可点击；若 feed 含视频单集且 `mp3ForVideoEnabled` 关闭，点击时同样弹出 **mp3GateModal** 拦截（Cancel 不提交；Enable 就地开启并**自动继续完成本次提交**）；提交后进入 Pending 待审核状态并停留在提交页。
  - 页面底部说明：上线后 iHeartRadio URL 会显示在此处，并会邮件通知。
- **与 Apple / Spotify / YouTube 一致**：整卡可点击进入；已提交后悬停卡片显示 Manage 提示。

---

### 4.6 Player FM 提交页

- **已提交场景**：可保存已有 Player FM URL（View→ / 删除）。
- **未提交表单**：
  - **3 项要求/条款**：顶部为一个**确认勾选框**（`playerfmAgree`），勾选框文字即条款标题「I agree to the Player FM content requirements」；其下为 3 项条款明细**纯文本**（无独立勾选框）：请求 Podbean 代提交 + 同意服务条款；已查阅内容要求；确认音乐授权（2026-08-07 改为单一确认勾选框）。
  - 底部栏 **Submit**：勾选确认框后才可点击；提交后该平台标记为"已提交"并返回列表。
- **与 Apple / Spotify / YouTube 一致**：整卡可点击进入；已提交后悬停卡片显示 Manage 提示。

---

### 4.7 Listen Notes 提交页

参考 **YouTube 提交页** 的两步流程，**两步在页面上同时展示**：

- **Step 1 — 提交到 Listen Notes（用户自助提交）**：
  - 引导文案明确说明：**需要用户自己到 Listen Notes 网站提交播客，Podbean 不能代为提交**（"Listen Notes requires you to submit your podcast yourself — Podbean can't do it on your behalf"）。
  - 展示 **Your Podcast Feed**（只读输入框，显示当前播客 RSS Feed URL）+ **Copy** 按钮（一键复制 feed URL，成功后按钮短暂变为 "Copied!"）。
  - 说明提交时 Listen Notes 会要求填写播客信息 + RSS Feed，并提示粘贴上方复制的 feed。
  - **Submit on Listen Notes** 按钮 → 新标签页打开 Listen Notes 提交页。
  - 说明：审核可能需要数周，通过后收到确认邮件；上线后把 Listen Notes URL 粘贴到 Step 2。
- **Step 2 — 保存你的 Listen Notes URL**：
  - 文案："Once you've received your URL, copy + paste it here to access it in the future."
  - 输入 **Your podcast URL in Listen Notes**（必填，附示例 URL）。
  - 输入 URL 后底部栏显示 **Save**；保存后该平台标记为"已提交"并返回列表。
- **已提交场景**：可保存已有 Listen Notes URL（View→ / 删除）。
- **"Already submitted"** 链接：直接滚动定位到 Step 2 的 URL 输入框。
- **与 Apple / Spotify / YouTube 一致**：整卡可点击进入；已提交后悬停卡片显示 Manage 提示。

---

### 4.8 Podchaser 提交页

- **已提交场景**：可保存已有 Podchaser URL（View→ / 删除）。
- **未提交表单**：
  - **3 项要求/条款**：顶部为一个**确认勾选框**（`podchaserAgree`），勾选框文字即条款标题「I agree to the Podchaser content requirements」；其下为 3 项条款明细**纯文本**（无独立勾选框）：请求 Podbean 代提交 + 同意服务条款；已查阅内容要求；确认音乐授权（2026-08-07 改为单一确认勾选框）。
  - 底部栏 **Submit**：勾选确认框后才可点击；提交后该平台标记为"已提交"并返回列表。
- **页面底部说明**：上线后 Podchaser URL 会显示在此处，并会邮件通知。
- **与 Apple / Spotify / YouTube 一致**：整卡可点击进入；已提交后悬停卡片显示 Manage 提示。

---

### 4.9 Boomplay 提交页

- **已提交场景**：可保存已有 Boomplay URL（View→ / 删除）。
- **未提交表单**：
  - **3 项要求/条款**：顶部为一个**确认勾选框**（`boomplayAgree`），勾选框文字即条款标题「I agree to the Boomplay content requirements」；其下为 3 项条款明细**纯文本**（无独立勾选框）：请求 Podbean 代提交 + 同意服务条款；已查阅 Boomplay 内容要求（链接至 `https://www.boomplay.com/term/`）；确认音乐授权（2026-08-07 改为单一确认勾选框）。
  - 底部栏 **Submit**：勾选确认框后才可点击；提交后该平台标记为"已提交"并返回列表。
- **页面底部说明**：上线后 Boomplay URL 会显示在此处，并会邮件通知。
- **与 Apple / Spotify / YouTube 一致**：整卡可点击进入；已提交后悬停卡片显示 Manage 提示。

---

### 4.10 Podbean App 信息页

**定位**：宿主平台，播客自动在 Podbean App 上线，**无需提交动作**；点击卡片进入信息页，用于品牌展示与推广。

- **顶部介绍**："Your podcast will be submitted to Podbean App automatically."（说明播客自动上线）。
- **Badge options 标题下方**："Point people to your podcast page from around the web. Just copy and paste the code to embed them anywhere on your blog or website."（引导用户复制代码嵌入博客/网站）。
- **下载推荐**：提示"Listen on the Podbean App"（下载 App 听播客），附 **Get the App** 按钮（新标签页打开下载页）。
- **Badge 推广代码生成器**（参考 Podbean 官方 badge）：
  - **Color**：白 / 黑 两种 badge 缩略图（点击切换，选中高亮边框）。
  - **Size**：150x56 (small) / 300x111 (medium) / 600x222 (large) 三档切换。
  - **实时预览**：按所选颜色与尺寸展示 badge 预览。
  - **Grab the code**：生成 HTML 嵌入代码（`<a href="播客页"><img src="badge 图"></a>`）；**Copy** 一键复制（成功后短暂变为 Copied!）。
- 无底部操作栏；面包屑返回 Podcast Apps。
- 整卡可点击进入；已提交后悬停卡片显示 Manage 提示。

---

## 四、状态与数据要点

| 概念 | 说明 |
|------|------|
| `distSubmitted` | 各平台"已提交"标记（内存对象），决定卡片是否进入已提交/Pending 状态 |
| `distPending` | 各平台"待审核"标记（内存对象）；`submitted=true, pending=true` → 卡片 Pending + 提交页 amber 横幅；`pending=false` → 绿色对勾 + Live 视图。保存已有 URL / `simulateDistApproval` / `simulateAppleApproval` 都会清除 |
| `mp3ForVideoEnabled` | Feed 层全局设置"为视频单集生成 MP3 音频"。由 `enableMp3ForVideo()` 开启（信息弹窗 / 预警横幅的 Enable 按钮），开启后弹出成功 toast；门槛弹窗的 Enable 走 `enableMp3AndSubmit()`，就地开启并自动继续完成被拦截的提交。仅在 `feedHasVideo`（feed 含视频单集）时成为 Spotify / Amazon Music / iHeartRadio Submit 的门槛 |
| `feedHasVideo` | 演示状态（Podcast Apps 页顶部 **Feed** 开关：Audio-only / With video），模拟 RSS feed 是否含视频单集。`true` 且 `mp3ForVideoEnabled=false` 时：向音频平台提交会被 `mp3GateModal` 拦截；若已提交过 Spotify / Amazon / iHeartRadio 任一平台，Podcast Apps 页顶部显示琥珀色下架预警横幅、对应平台卡片显示琥珀色警示图标 |
| `appleSubmitted / appleApproved / appleClaimed` | Apple 提交流程状态机：未提交 → 提交待审 → 已批准 → 已 claim |
| `appleClaimViaToken` | 是否通过 token 完成 claim；为 true 时 claim 区域保留以便重新输入 |
| `currentAppleTab` | Apple 提交页当前 Tab（submit / hls / subs） |
| `connectedPlatforms` | Social Share 各平台连接状态（内存对象） |
| `domainSaved / domainValue` | Podcast Website 自定义域名保存状态 |
| 底部栏模式 | 依据当前页与状态显示 Submit / Save 按钮，统一"Cancel + 主操作"结构 |

---

## 五、交互与边界情况

1. **页面切换**：切换子菜单时，Apple / Spotify / Amazon / iHeartRadio / Player FM / Listen Notes / Podchaser / Boomplay 底部栏会被强制隐藏，避免残留。
2. **Apple claim 失败场景**：token 保存后仍可见、可编辑、可再次保存；编辑 token 时成功横幅自动隐藏。
3. **HLS / Subscriptions 门槛**：必须先 **已批准且已 claim** 才显示设置步骤；否则只显示功能介绍。
4. **Apple 表单校验**：Content Rights、Update Frequency、3 个条款全部完成，Submit 才可点击。
5. **Spotify 表单校验**：3 个条款全部勾选即可点击 Submit；若 feed 含视频且 MP3 关闭，点击时弹出 `mp3GateModal` 拦截（Cancel 不提交；Enable 就地开启并**自动继续完成本次提交**）。
6. **Amazon 表单校验**：勾选接受 Content License Agreement 即可点击 Submit；同样受提交时 MP3 门槛约束（feed 含视频 + MP3 关闭 → 弹窗拦截）。
6b. **iHeartRadio 表单校验**：6 项条款全部勾选即可点击 Submit；同样受提交时 MP3 门槛约束。
6c. **MP3 门槛在提交时，无每页开关**：`mp3ForVideoEnabled` 是 Feed 层唯一全局设置，由 `enableMp3ForVideo()` 开启（成功 toast，约 2.2 秒自动消失）。三个仅音频平台不再有常驻开关/要求条；门槛移到点击 Submit 时的 `mp3GateModal`——弹窗直接展示 "Generate MP3 for Video Episodes" 的说明文字（无 Off 徽标 / What's-this 链接）。弹窗 **Enable** 调用 `enableMp3AndSubmit()`：就地开启全局设置并**自动继续完成被拦截的本次提交**（`mp3GatePendingSubmit` 记住被拦截的平台 key，Cancel 时清除）。判据为内容驱动：仅 `feedHasVideo && !mp3ForVideoEnabled` 才拦截，纯音频 feed 完全不受影响。
6d. **发布视频后的下架预警**：当 `feedHasVideo=true`、`mp3ForVideoEnabled=false`、且已提交过 Spotify / Amazon / iHeartRadio 任一平台时，Podcast Apps 页顶部显示琥珀色预警横幅（「Video published, MP3 for video episodes off」+ 说明音频平台可能下架 + **Enable now** 一键开启），对应平台卡片显示琥珀色警示图标（含 title 提示）；预警在解决前持续显示，开启 MP3 后自动消失。
6e. **preaction 不含 MP3**：preaction 清单回到 5 步通用项；MP3 不再作为分发前通用步骤（仅当 feed 有视频时由提交流程与预警横幅按需引导）。
7. **自定义域名**：未输入域名时 Save 会提示；断开域名需经确认模态框。
8. **Embed Player**：有未保存改动时离开会弹出 Leave/Stay 确认，防止丢失。
9. **单一确认勾选框（确认式条款）**：多勾选平台提交页（Apple / Spotify / iHeartRadio / Player FM / Podchaser / Boomplay）的条款区为**一个确认勾选框**（`label.check-row`，勾选框文字即条款标题并加粗，采用第一人称确认句「I agree to the {平台} content requirements」，如 `appleAgree` / `spotifyAgree` / `iheartradioAgree` / `playerfmAgree` / `podchaserAgree` / `boomplayAgree`），标题下方为条款明细**无序列表**（`ul.agree-terms`，灰色圆点 + 14px `#475569` 文字，无边框无容器，2026-08-07 样式优化）。各页 `checkXxxAgreements` 仅校验该确认框与必填项，勾选后 Submit 才可点击。底部操作栏**有交互才出现**（勾选确认框 / 操作表单字段时才显示）。Amazon 为单协议接受勾选框（`amazonAcceptCheck`），结构一致。
