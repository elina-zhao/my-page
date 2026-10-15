# Podcast Dashboard — Settings 模块功能说明文档

> 版本：v1.0  
> 最后更新：2026-07-10  
> 状态：初稿 / 待评审

---

## 目录

1. [产品概述](#1-产品概述)
2. [导航与页面结构](#2-导航与页面结构)
   - [2.1 侧边栏层级](#21-侧边栏层级)
   - [2.2 交互逻辑](#22-交互逻辑)
     - [2.3.1 Settings 菜单点击行为](#231-settings-菜单点击行为核心规则)
     - [2.3.2 通用规则](#232-通用规则)
     - [2.3.3 未保存修改时切换页面](#233-未保存修改时切换页面)
3. [页面一：Podcast Info（播客信息）](#3-页面一podcast-info播客信息)
   - [3.0 页面结构](#30-页面结构)
     - [Tab 切换规则](#tab-切换规则)
     - [Tab 切换与未保存状态](#tab-切换与未保存状态)
   - [3.1 Basic 标签页](#31-basic-标签页基础信息)
     - [3.1.1 Podcast Title](#311-podcast-title播客标题)
     - [3.1.2 Brief Description](#312-brief-description简介)
     - [3.1.3 Podcast Category](#313-podcast-category播客分类)
     - [3.1.4 Podcast Logo](#314-podcast-logo播客封面)
   - [3.2 Author & Region 标签页](#32-author--region-标签页作者与区域)
     - [3.2.1 Author](#321-author作者)
     - [3.2.2 Copyright](#322-copyright版权信息)
     - [3.2.3 Language](#323-language语言)
     - [3.2.4 Country of Origin](#324-country-of-origin原产国分发区域)
     - [3.2.5 Timezone](#325-timezone时区)
   - [3.3 Content Classification 标签页](#33-content-classification-标签页内容分类)
     - [3.3.1 Podcast Type](#331-podcast-type播客类型)
     - [3.3.2 Content Explicit](#332-content-explicit内容分级)
4. [页面二：Feed（RSS 源管理）](#4-页面二feedrss-源管理)
   - [4.0 页面结构](#40-页面结构)
   - [4.1 Podcast Feed URL](#41-podcast-feed-urlrss-源地址)
   - [4.2 Ownership Verification Email](#42-ownership-verification-email所有者验证邮箱)
   - [4.3 Episode Number Limit](#43-episode-number-limit剧集数量限制)
   - [4.4 Feed Website URL](#44-feed-website-urlfeed-中的播客网站地址)
   - [4.5 Redirect to a New Feed](#45-redirect-to-a-new-feedfeed-重定向)
5. [页面三：Plugin（插件管理）](#5-页面三plugin插件管理)
   - [5.0 页面结构](#50-页面结构)
   - [5.1 插件列表](#51-插件列表)
   - [5.2 插件操作](#52-插件操作)
   - [5.3 Episode Endnote 编辑弹窗](#53-episode-endnote-编辑弹窗)
   - [5.4 Get More Plugins](#54-get-more-plugins)
6. [页面四：Import to Podbean（导入）](#6-页面四import-to-podbean导入)
   - [6.0 页面结构](#60-页面结构)
   - [6.1 步骤一：选择来源](#61-步骤一选择来源)
   - [6.2 步骤二：填写地址](#62-步骤二填写地址)
   - [6.3 步骤三：确认并开始](#63-步骤三确认并开始)
   - [6.4 导入状态](#64-导入状态)
   - [6.5 301 Redirect 校验](#65-301-redirect-校验)
   - [6.6 校验成功后的完成态](#66-校验成功后的完成态)
7. [全局交互规则](#7-全局交互规则)
   - [7.1 Save Bar（底部保存栏）](#71-save-bar底部保存栏)
   - [7.2 修改检测](#72-修改检测)
   - [7.3 自定义下拉选择器](#73-自定义下拉选择器)
   - [7.5 页面切换](#75-页面切换)
8. [数据校验规则](#8-数据校验规则)
   - [8.1 必填字段](#81-必填字段)
   - [8.2 格式校验](#82-格式校验)
   - [8.3 保存前校验流程](#83-保存前校验流程)
8. [附录：新老页面对比](#附录新老页面对比)
   - [Podcast Info 页面变化说明](#新-mockup-变化说明)
   - [Feed 页面变化说明](#feed-页面变化说明)

---

## 1. 产品概述

**Settings** 是播客仪表盘的核心配置模块，为用户提供对播客节目的全方位管理能力。模块涵盖三个子页面：Podcast Info（节目基本信息与元数据）、Feed（RSS 源与分发配置）、Plugin（插件集成管理）。

---

## 2. 导航与页面结构

### 2.1 侧边栏层级

```
Settings                              ← 一级导航（带箭头展开/收起）
├── Podcast Info（播客信息）           ← 默认页，active 状态
├── Feed（RSS 源管理）
└── Plugin（插件管理）
```

### 2.2 交互逻辑

#### 2.3.1 Settings 菜单点击行为（核心规则）

| 当前状态 | 点击 Settings 一级菜单 | 结果 |
|---|---|---|
| 在**非 Settings 页面**（如 Dashboard、Episodes 等） | 展开子菜单 + 默认选中 **Podcast Info** + 右侧内容切换到 Podcast Info 页面 | 子菜单展开，Podcast Info 高亮 |
| 已在 **Settings 子页面**（Podcast Info / Feed / Plugin） | 仅切换子菜单的展开/收起状态，**右侧页面内容不变** | 子菜单收起或展开，内容不动 |

#### 2.3.2 通用规则

- 点击子菜单项：切换主内容区页面，高亮对应菜单项
- 切换页面时自动重置到该页面的第一个 Tab

#### 2.3.3 未保存修改时切换页面

各 Settings 子页面（Podcast Info、Feed）拥有独立的 Save bar。当用户在当前页面有未保存的修改（Save bar 可见）时，直接点击其他页面菜单，弹出居中确认对话框：

```
┌─────────────────────────────────────┐
│                                     │
│         Unsaved Changes             │
│                                     │
│  You have unsaved changes. Do you   │
│  want to leave without saving?      │
│                                     │
│           [ Stay ]  [ Leave ]       │
│                                     │
└─────────────────────────────────────┘
```

| 元素 | 文字 |
|---|---|
| 标题 | **Unsaved Changes** |
| 提示文案 | You have unsaved changes. Do you want to leave without saving? |
| Stay 按钮 | **Stay** |
| Leave 按钮 | **Leave** |

| 操作 | 行为 |
|---|---|
| 点击 **Stay** | 关闭弹窗，停留在当前页面，所有未保存修改保留 |
| 点击 **Leave** | 丢弃所有未保存修改，切换到目标页面，Save bar 隐藏 |
| 点击遮罩 / 按 Esc | 同 Stay，不切换页面 |

---

## 3. 页面一：Podcast Info（播客信息）

### 3.0 页面结构

```
┌──────────────────────────────────────────────┐
│  Podcast Info                                 │
│  Configure your podcast basic settings here.  │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │  Basic  │ Author & Region │ Content Classification │  ← 横向 Tab
│  └──────────────────────────────────────────┘ │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │  表单内容区域（随 Tab 切换）              │ │
│  │                                          │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

#### Tab 切换规则

- 三个 Tab 横向排列，底部有下划线指示当前激活项
- 点击 Tab 只切换面板内容，不触发页面跳转
- 切换页面后自动回到第一个 Tab（Basic）

#### Tab 切换与未保存状态

三个 Tab 同属 Podcast Info 页面，共享同一个 Save bar。Tab 切换时处理策略如下：

| 场景 | 处理方式 |
|---|---|
| Tab A 有未保存的修改 → 点击 Tab B | 修改**保留在表单状态中**，不会丢失；Tab B 展示其字段（默认值或之前已保存的值） |
| Tab B 继续修改 → 再切回 Tab A | Tab A 中之前的修改依然保留 |
| 任意 Tab 有修改 | Save bar 保持显示 |
| 点击 Save | 校验**所有 Tab** 的必填字段 → 见下文 [Save 校验与错误提示](#save-校验与错误提示) |
| 点击 Cancel | 清空所有 Tab 的未保存修改，恢复至上次保存值 |

**原则：跨 Tab 累积更改（Accumulate Changes）。** 所有 Tab 的修改共享同一个表单上下文，不因 Tab 切换而丢失。Save / Cancel 作用于整个页面而非单个 Tab。

#### Save 校验与错误提示

点击 Save 时，系统校验 Podcast Info 页面下的所有三个 Tab 的必填字段：

| 步骤 | 行为 |
|---|---|
| 1. 校验 | 遍历三个 Tab 的所有可见字段，执行校验规则 |
| 2. 有错误 | 自动切换到**第一个包含错误**的 Tab；该 Tab 内第一个错误字段下方显示错误提示，并滚动到可视区域；所有包含错误的 Tab 标签上显示 ⚠ 标识 |
| 3. 全部通过 | 一次性提交所有 Tab 的字段值，Toast 提示 **"Saved successfully"**，Save bar 隐藏 |

**错误标识说明：**

```
Tab 标签状态：
[ Basic ⚠ ]  [ Author & Region ]  [ Content Classification ]
       ↑ Basic Tab 有错误，显示 ⚠
```

- 点击包含错误的 Tab 标签可手动切换到该 Tab 查看错误详情
- 用户修复错误后，⚠ 标识和字段错误提示自动消失（在下次 Save 校验时重新检测）
- 点击 Cancel 时，所有错误标识和错误提示一并清除

---

### 3.1 Basic 标签页（基础信息）

#### 3.1.1 Podcast Title（播客标题）

| 属性 | 说明 |
|---|---|
| **类型** | 单行文本输入 |
| **必填** | 是（标有红色 *） |
| **默认值** | `The {subdomain}'s Podcast` — 创建播客频道时自动生成，其中 `{subdomain}` 为用户注册时分配的子域名 |
| **占位提示** | "Make a clear, concise name for your title" |
| **输入样式** | 下划线边框（border-bottom），聚焦时变色 |
| **校验规则** | 不能为空；最多 200 字符 |
| **错误提示** | "Please enter a podcast title" |

**业务逻辑：**

- 新频道创建完成后，系统自动将标题设为 `The {subdomain}'s Podcast`
- 用户可在后续编辑中自行修改
- 例如：子域名为 `elinazplus`，则默认标题为 `The elinazplus's Podcast`

#### 3.1.2 Brief Description（简介）

| 属性 | 说明 |
|---|---|
| **类型** | 富文本编辑器（contenteditable） |
| **必填** | 是（标有红色 *） |
| **默认值** | "New podcast weblog" — 频道创建时自动填入 |
| **交互说明** | 输入区域可扩展高度；支持基本的富文本格式 |
| **校验规则** | 不能为空，不能为默认值 "New podcast weblog"，最多 50000 字符 |
| **错误提示** | "Please enter a brief description" |

#### 3.1.3 Podcast Category（播客分类）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器 |
| **必填** | 是（标有红色 *） |
| **分类选择** | 点击展开下拉列表，选中后关闭 |
| **分类新增** | 点击「+」按钮新增一行分类选择器 |
| **占位文字** | "Select a category" |
| **提示文字** | "Apple Podcasts only recognizes the first category and subcategory." |
| **错误提示** | "Please select a podcast category" |

**行为规则：**

- 至少选择一个分类
- 点击「+」按钮新增一行分类选择器，最多**额外添加 2 个**（含默认共 3 行）
- 到达上限后，加号按钮隐藏
- 每个分类行可独立删除（待扩展「-」按钮或行内删除）
- 首次进入时默认展示一行分类选择器，不预选具体分类（显示占位文字）

#### 3.1.4 Podcast Logo（播客封面）

| 属性 | 说明 |
|---|---|
| **类型** | 图片预览 + 上传控件 |
| **必填** | 是（标有红色 *） |
| **默认值** | 频道创建时由系统自动分配默认封面图 |
| **预览** | 正方形图片展示 |
| **Logo 模板选择** | 下拉选择内置模板 |
| **上传按钮** | "Upload image"，点击触发文件选择 |
| **图片要求** | Recommended: 1400–2048 px square (jpg or png). Apple requires original artwork. [Learn more](https://elina-zhao.github.io/my-page/Settings/#) |
| **错误提示** | "Please upload a podcast logo" |

**上传后行为：** 选择图片后弹出 Podbean 的 Image Editor 弹框，用户编辑确认后预览区域更新为新图片。

---

### 3.2 Author & Region 标签页（作者与区域）

#### 3.2.1 Author（作者）

| 属性 | 说明 |
|---|---|
| **类型** | 单行文本输入 |
| **必填** | 否 |
| **默认值** | `{subdomain}` — 频道创建时自动填入用户的子域名 |
| **校验规则** | 最多 100 字符 |

#### 3.2.2 Copyright（版权信息）

| 属性 | 说明 |
|---|---|
| **类型** | 单行文本输入 |
| **必填** | 否 |
| **默认值** | "Copyright {currentYear} All rights reserved." — 年份取频道创建时的当前年份 |
| **占位提示** | "Copyright {currentYear} All rights reserved." |
| **校验规则** | 最多 200 字符 |

#### 3.2.3 Language（语言）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器，默认有预设值，用户可切换为其他选项，不会出现未选中的空状态 |
| **默认值** | "English [en]" |
| **选项数据** | 支持播客的常见语言列表（待扩展完整 ISO 语言代码） |

#### 3.2.4 Country of Origin（原产国/分发区域）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器，默认有预设值，用户可切换为其他选项，不会出现未选中的空状态 |
| **解释文字** | Defines the intended market/territory where the podcast is relevant to the consumer. |
| **选项** | **Global**、**Specific countries** |
| **默认值** | Global |
| **交互** | 选择 "Global" 时不显示额外控件；选择 "Specific countries" 时出现国家多选下拉框，用户可选择一个或多个国家 |

#### 3.2.5 Timezone（时区）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器，默认有预设值，用户可切换为其他选项，不会出现未选中的空状态 |
| **默认值** | 待技术确认 — 需确认是否会根据用户所在 IP 自动设置默认时区 |
| **辅助提示** | 显示当前时间："Current time: Jun 16, 2026, 10:21 AM" |
| **交互** | 切换时区时，当前时间提示同步更新 |

---

### 3.3 Content Classification 标签页（内容分类）

#### 3.3.1 Podcast Type（播客类型）

| 属性 | 说明 |
|---|---|
| **选项** | Episodic、Serial |
| **默认值** | Episodic |
| **辅助说明** | "Choose how episodes are ordered on your podcast website and in your RSS feed." |

**业务说明：**

- **Episodic**：剧集按发布时间倒序排列，最新在前
- **Serial**：剧集按发布顺序排列，最早在前

#### 3.3.2 Content Explicit（内容分级）

| 属性 | 说明 |
|---|---|
| **选项** | Clean / False、Explicit / True |
| **默认值** | Clean / False |
| **辅助说明** | "Specify whether your podcast contains explicit content." |

---

## 4. 页面二：Feed（RSS 源管理）

### 4.0 页面结构

```
┌──────────────────────────────────────────────┐
│  Feed                                         │
│  Manage your podcast feed and Apple Podcasts  │
│  settings.                                    │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │  表单内容区域（无 Tab，单面板）           │ │
│  │                                          │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

**保存规则：** Feed 页面拥有独立的 Save bar，与 Podcast Info 页面的 Save bar 互不影响。修改 Feed 字段后 Save bar 在该页面底部显示，保存时仅校验和提交 Feed 页面的字段。

### 4.1 Podcast Feed URL（RSS 源地址）

| 属性 | 说明 |
|---|---|
| **类型** | 只读展示 + 复制按钮 |
| **示例值** | `https://feed.podbean.org/elinazplus/feed.xml` |
| **交互** | 点击 Copy 按钮将 URL 复制到剪贴板，可显示 "Copied!" 短暂反馈 |
| **说明** | 当用户更改 subdomain 或设置自己的域名后，Feed URL 会立即同步更新 |

**复制反馈：** 点击 Copy 后按钮文字切换为 "Copied!"，1.5 秒后恢复（待扩展）。

### 4.2 Ownership Verification Email（所有者验证邮箱）

| 属性 | 说明 |
|---|---|
| **类型** | 文本输入框（无需 Toggle，直接显示） |
| **必填** | 否 |
| **说明文字** | "Temporarily add an email address to your RSS feed for 48 hours so podcast directories can verify your podcast." |
| **输入验证** | 标准 email 格式校验 |
| **自动过期** | 48 小时后，email 自动从 RSS feed 中移除，输入框内容清空 |
| **手动移除** | 用户清空输入框并保存，email 立即从 feed 中移除 |

### 4.3 Episode Number Limit（剧集数量限制）

| 属性 | 说明 |
|---|---|
| **类型** | 数字输入 |
| **必填** | 否 |
| **默认值** | 100 |
| **辅助说明** | "Limit the number of episodes included in your RSS feed." |
| **输入校验** | 必须为整数，且不能超过当前套餐上限 |
| **错误提示** | "Please enter a number between 1 and {limit}" |

**说明：** The episode number limit varies based on the subscription plan:

| 套餐 | 上限值 |
|---|---|
| Unlimited Audio Plan | 999 |
| Unlimited Plus Plan | 1999 |
| Business Plan | 2999 |

**校验逻辑：** 用户输入的值必须为整数，超过当前套餐上限时提示 **"Please enter a number between 1 and {limit}"**（`{limit}` 替换为对应套餐的上限值）；输入非整数时提示 **"Please enter a whole number"**。

### 4.4 Custom Website URL

| 属性 | 说明 |
|---|---|
| **名称** | 原名为 "Podcast Website"，后改为 **Feed Website URL**，现改为 **Custom Website URL** |
| **类型** | URL 输入 |
| **占位提示** | "Leave this field blank to use your Podbean podcast website URL." |
| **必填** | 否（留空则使用默认 Podbean 播客网站 URL） |
| **校验规则** | 可选 |
| **辅助说明** | "Use your own website URL as the podcast website link in your RSS feed." |

### 4.5 Redirect to a New Feed（Feed 重定向）

| 属性 | 说明 |
|---|---|
| **类型** | Toggle 开关 + 条件显示 URL 输入 + 危险警告 |
| **说明文字** | "Only enter your new podcast feed URL when you're ready to move away from Podbean." |
| **默认状态** | 关闭 |

**开启后展示：**

```
┌──────────────────────────────────────────────┐
│  ⚠ Warning! Your Podbean feed will be         │
│  redirected to the new feed URL immediately.   │
│  Only enter your new podcast feed URL when     │
│  you're ready to move away from Podbean.       │
│                                              │
│  [___________________________]  ← URL 输入框  │
└──────────────────────────────────────────────┘
```

**安全机制：**

| 状态 | 行为 |
|---|---|
| Toggle 开启 | 显示警告条 + URL 输入框 |
| 输入为空时保存 | 应阻止保存并提示 "Please enter a feed URL" |
| 重定向 URL 格式 | 需校验合法的 URL 格式 |

---

## 5. 页面三：Plugin（插件管理）

### 5.0 页面结构

```
┌──────────────────────────────────────────────┐
│  Plugin                                       │
│  Manage your podcast plugins and integrations │
│                                               │
│  ┌───── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐  │
│  │ Get more plugins →                        │  │
│  └──────────────────────────────────────────┘  │
│                                               │
│  ┌──────────────────────────────────────────┐  │
│  │  Take your podcast to the next level by   │  │
│  │  adding popular plugins and services.     │  │
│  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### 5.1 插件列表

| 属性 | 说明 |
|---|---|
| **布局** | 页面默认为空状态 |
| **空状态** | 显示 "Take your podcast to the next level by adding popular plugins and services." |

### 5.2 插件操作

当用户安装插件后，每行显示图标 + 名称 + 描述 + 操作按钮，按钮如下：

| 按钮 | 功能 |
|---|---|
| Edit | 打开编辑弹窗（如 Episode Endnote 的富文本编辑器） |
| Delete | 点击弹出 confirm 确认框，确认后移除该行 |

### 5.3 Episode Endnote 编辑弹窗

特定插件（如 Episode Endnote）的编辑操作通过弹窗完成，弹窗内包含富文本编辑器。具体交互细节参考插件文档（待补充）。

### 5.4 Get More Plugins

| 属性 | 说明 |
|---|---|
| **类型** | 外部链接按钮 |
| **链接目标** | `https://apps.podbean.com` |
| **打开方式** | 当前标签页打开 |

---

## 6. 页面四：Import to Podbean（导入）

把一个已有的播客（或视频系列）连同剧集导入 Podbean。整条流程是**单页三步向导**：导入开始后不跳转到二级页面，而是在同一页内进入状态流转。

### 6.0 页面结构

```
① Choose a source  →  ② 填写地址  →  ③ Review and start
```

步骤二的标题随来源而变：RSS 为「Enter your feed URL」，Video 为「Choose your video source」。

| 属性 | 说明 |
|---|---|
| **承载方式** | 三个步骤自上而下排列在同一列内；当前步骤的内容展开在其标题下方，缩进对齐步骤名 |
| **已完成步骤** | 折叠为一行标题（带勾选标记） |
| **未到步骤** | 仅显示标题，不可点击 |
| **返回** | **没有 Back 按钮**——返回只通过点击上一步的标题完成（见下条）。底部永远只有前进按钮 |
| **步骤冻结** | 点击 **Start import** 之后，**步骤 1 与步骤 2 不可再返回编辑**；点击其标题只展开一行只读信息（步骤 1 → 所选来源名，步骤 2 → 已填写的地址；Video 路径下为 `YouTube Playlist · 播放列表名` 或视频 RSS 地址） |

### 6.1 步骤一：选择来源

来源互斥，单选。当前提供两项（原「Blog to Podcast」方案已移除）：

| 选项 | 说明 |
|---|---|
| **RSS Feed URL** | 播客托管在其它平台，或已有一份 RSS feed |
| **Video to Podcast** | 有视频内容，希望以播客形式发布 |

Continue 是唯一的入口按钮：未选择时点击 Continue，在列表下方显示行内错误「Please choose an import source」并聚焦第一个单选项，不进入下一步。

### 6.2 步骤二：填写地址

步骤二的表单内容与标题都随步骤一的来源而变：RSS → 「Enter your feed URL」，Video → 「Choose your video source」。

**来源为 RSS Feed URL**：单个下划线输入框。

| 字段 | 必填 | 说明 |
|---|---|---|
| RSS Feed URL | 是 | 提示：Example: https://feeds.podbean.org/elinazplus/feed.xml |

**来源为 Video to Podcast**：视频本身也有两个来源，用一行「Content Source」下拉框切换，切换后下方字段整体替换。

| Content Source | 字段 | 说明 |
|---|---|---|
| **YouTube Playlist**（默认） | YouTube channel handle：无字段标签，占位符 “Your YouTube channel handle (e.g. @podbean)”，右侧贴一枚 **Search** 按钮 | 提示：「Search for your YouTube channel and choose the playlist you want to convert.」 |
| | YouTube Playlist 下拉框 —— **只有点过 Search 之后才出现** | 提示：「We will retrieve **the latest 10 videos** and sync future content as you prefer.」 |
| **RSS Feed URL** | RSS Feed 输入框 | 提示：「We will retrieve **the latest 10 videos**, convert them into MP3 and sync future content as you prefer.」 |

- **Search 是必经步骤，而且 Continue 按钮在检索之前根本不出现**（2026-10-15）：点 Search 出结果后，播放列表下拉与 **Continue** 同时出现——在此之前没有可继续的东西。切换 Content Source 到 RSS Feed URL 时按钮立刻恢复显示；已经检索过的状态下在步骤间往返，按钮保持显示（检索结果不会因为来回切步骤而丢失）。
  - handle 为空时点 Search → 「Please enter your YouTube channel handle」。
  - 「Click Search to load the playlists for this channel」这条校验仍留在代码里作为兜底；按钮隐藏后正常路径下已经触发不到，保留是为了将来按钮若被别的方式显示出来也不会跳过播放列表。
- Search 会把播放列表重置为第一个结果（换一个 channel 就是另一组播放列表）；handle 与已选播放列表在步骤间往返、以及来回切换 Content Source 时都会保留。
- 三个带标签的行（Content Source / YouTube Playlist / RSS Feed）共用 150px 的标签列，因此控件起始位置对齐；handle 一行没有标签，输入框占满宽度、Search 贴在右侧。
- 字段未填写时点击 Continue，在字段下方显示行内错误提示，不进入下一步。

### 6.3 步骤三：确认并开始

步骤三的内容同样随步骤一的来源而变：两个路径各自一组选项，共用一个条款勾选框（文字随来源变化）与底部按钮。

**来源为 RSS Feed URL**

导入范围（单选，二选一）

| 选项 | 说明 |
|---|---|
| **Podcast details and episodes**（默认） | 剧集与节目资料（标题、简介、封面、分类及 Apple Podcasts 设置）均从 feed 带入，**覆盖当前节目资料** |
| **Episodes only** | 只带入剧集，现有节目资料保持不变 |

「Podcast details and episodes」右侧的 ⓘ 文案：**「Brings over the episodes, the show details and Apple Podcasts settings.」**（2026-10-15 统一：这一组在 RSS 路径与 video + RSS Feed URL 路径共用，此前两条路径各写一版——video 那版写的是「…and the video titles and artwork.」，用户要求两条路径统一。代码里改成**只定义一次**（`SCOPE_INFO` 常量，两处 `scopeInfo` 引用它），避免以后改一边漏一边。）

音频格式（单选，二选一）

| 选项 | 说明 |
|---|---|
| **Convert to .mp3**（默认） | 重编码为 .mp3。Spotify 只接受 .mp3，此选项供需要提交到 Spotify 的用户使用；转换在重定向完成后进行（ⓘ 提示） |
| **Use original format** | 保持原有音频格式 |

**来源为 Video to Podcast**

video 的步骤三还要再按步骤二所选的 **Content Source** 分成两种形态。两者**共用「Sync future content」**一项，其余各不相同，且都**没有输出类型以外的「导入范围」组**（video 导入没有"现有节目资料"可覆盖，与真实产品一致）。

**① Content Source = YouTube Playlist**

输出类型（单选，二选一，**有可见组标题**：「What kind of podcast should this become?」）

| 选项 | 说明 |
|---|---|
| **Convert to Audio Podcasts**（默认） | 转成音频播客 |
| **Convert to Video Podcasts** | 转成视频播客 |

**选项下面不带 tagline**（2026-10-15 删除）。原先跟组挂在下面、随选择切换的一句说明（音频 → 「Reach a wider audience and attract new listeners by leveraging popular directories such as Apple Podcasts, Spotify, and more.」；视频 → 「Reach viewers as well as listeners…」）被去掉了。理由：两个选项名本身已经说清结果，而在步骤三这个位置——来源、范围、格式都已经定完——再补一句"选音频有什么好处"也影响不了任何决定。这一步的选项一律不带 tagline。

两个互相独立的勾选项（各带 ⓘ 提示），共用一个**轻标题「Options」**：

| 选项 | 默认 | ⓘ 提示文案 |
|---|---|---|
| **Sync future content** | **不勾选** | 「Automatically import and publish newly added content from your connected content source.」（**真实产品文案**，2026-10-15 由自拟文案替换）——对应步骤二提示里的 "sync future content as you prefer" |
| **Import YouTube Thumbnail as podcast and episode logos** | 不勾选 | 「Note: The YouTube Thumbnail may not fit the square podcast and episode logo.」——选项名本身已经写明缩略图会成为播客与剧集的 logo，所以 ⓘ 收窄为只保留这条方形适配提醒（2026-10-15） |

**② Content Source = RSS Feed URL**

视频 RSS 源一律转成 MP3 音频播客，所以**没有输出类型可选**，改为导入前的一句陈述：

> We will retrieve **the latest 10 videos and convert them into MP3** audio format for your podcasts, automatically publishing them。

然后接**与 RSS 路径完全相同的那一组**「What should we bring over?」（Podcast details and episodes / Episodes only），最后是「Options」下的 **Sync future content**。

- **这一组是和 RSS 路径共用的同一个组，不是复制一份。** 两条路径问的是同一个问题——勾选/不勾选正好对应「Podcast details and episodes」/「Episodes only」。复制还会带来一个真实故障：两组会共用 `name="wizScope"`，浏览器把它们当成同一组，选中一边会清掉另一边。
- 副作用是选择在两条路径间共享（在 RSS 路径选了 Episodes only，切到 video + RSS 仍是 Episodes only）。这是想要的行为。
- **「Import podcast info and Apple Podcast settings from the RSS feed.」这个勾选项已删除**（2026-10-15）——它就是上面那一组，同一个问题不该在同一步里以两种形态出现。原来那条 ⓘ 自拟文案随之移除。

**排版规则（三条路径统一，2026-10-15 定稿）**

- 每个组都有**加粗组标题**（15px/600）：互斥选择用问句（What should we bring over? / What audio format should we use? / What kind of podcast should this become?），各自独立的开关用标题「Options」——轻重的差别是刻意想做的，但目前两者其实用的是同一个 `.wiz-choice-legend` 样式，**并未真正做出差别**，待定。
  - 组标题统一**只点出维度（axis）**，由选项去说结果。所以音频/视频这一组问的是 kind（What kind of podcast should this become?），而不是重复选项里的 audio / video——原先的「What should we publish?」正是因为 publish 既不指向 audio 也不指向 video 而被换掉（2026-10-15）。
- 并排单选组的宽度上限 **760px**（`.wiz-choice-items`），组说明句用同一量度。此前每列被拉到 656px，而标签只有 100–200px，右半页全空。
- 选项标题维持 14px/400，勾选项标签 14px `--text`；条款行用细线与上方隔开，作为页脚。
- **JS 用 `[hidden]` 切换显隐的元素，若自身带 `display`，必须补一条 `[hidden] { display: none }` 守卫**：作者样式会盖过 `[hidden]` 的 UA `display:none`。`.pb-check-line`（`display:flex`）此前就漏了这条，导致 video + RSS 路径上本该隐藏的 **Import YouTube Thumbnail 一直显示**（2026-10-15 修）。

两条提示都只在悬停 / 键盘聚焦时出现。缩略图这一项影响的是**播客与剧集两处 logo**——选项名本身已写明（2026-10-15 从「Import YouTube Thumbnail」改过来），所以 ⓘ 里只留「缩略图可能不适配方形的 logo」这一条提醒。

**条款与按钮（三条路径共用）**

| 项目 | 说明 |
|---|---|
| 条款文案 | 三选一：来源 RSS → "…rights to **this podcast**…"；video + YouTube Playlist → "…rights to **this YouTube Content**…"；video + RSS Feed URL → "…rights to **this content**…"。勾选框必勾，未勾选时点击按钮给该行加红 |
| 按钮 | 底部**只有前进按钮**：步骤 1 / 2 为 Continue，步骤 3 为 **Start import**。没有 Back 按钮，返回靠点击上一步标题 |
| 条款位置 | 在按钮**下方**（2026-10-15 改），与真实产品一致：按钮是选项列表的收尾，条款作为其下的法务行，上面用一条细线隔开。它仍是必勾项——未勾选就点按钮，会在按钮下方的这一行标红提示 |

### 6.4 导入状态

开始导入后，页面顶部显示导入状态卡片，并在重定向步骤旁重复同一状态：

**Video 路径：点 Start import 后直接进入「正在导入」页，没有状态卡片**（2026-10-15 定稿）。视频导入没有 301 重定向，也就不需要「Refresh status / Check redirect」那一套，所以视频路径**不显示** `RSS import / Video import` 那张状态卡片，也不显示重定向区块。它的结果区只有：

| 元素 | 内容 |
|---|---|
| **状态条**（琥珀，最上方） | `Importing your media files — we'll email you once they're done.`——与 RSS 流内完成态同一句、同一组件，**不带 ×** |
| **已连接的内容源** | `Connected Content Source: <链接>`（14px / 正文色），位置在状态条**下面**（2026-10-15 从上面调下来）。YouTube Playlist 路径显示用户选的**播放列表名**；video + RSS Feed URL 路径显示他填的 **feed 地址**。值取自 `video.ytPlaylist` / `video.rss`，不是固定文案 |
| **两个设置开关** | `Sync future content` 与 `Import YouTube Thumbnail as podcast and episode logos`，各带 ⓘ，行间距 `margin-top: 18px`；**开关紧跟在标签之后（12px）**，不推到行尾——12px 读起来是「一个控件」，撑满整行读起来是「两栏」；标签字号 **14px**，与上面的已连接内容源一致（2026-10-15 两处调整，均为用户指出） |

**这一屏四段文字统一为 14px**（琥珀条、已连接内容源、两个开关标签），颜色为正文色 `--text`。`.wiz-option-row` 必须显式写 `font-size: 14px`——**不写会继承到 16px**，与上面一行看起来不齐。

- **开关与步骤三的勾选框是同一个设置**：每次渲染时 `syncResultSwitches()` 把开关对齐到对应勾选框，点击开关写回勾选框（`data-mirrors` 指明镜像哪个 id）。一个设置、一个状态、两处可见。
- video + RSS Feed URL 路径**不显示缩略图那一行**（该路径的步骤三没有这个选项）。`.wiz-option-row` 带 `display:flex`，所以必须靠 `.wiz-option-row[hidden]` 守卫才能真正隐藏。
- **放什么、不放什么**（2026-10-15 逐项定稿）：**保留**「已连接的内容源」这一行（用户明确要求在这一屏看到自己连的是哪个播放列表）；**不放**来源 logo、绿色对勾角标与 `Video to Podcast` 来源名。曾按真实产品的参考图放过完整版（logo + 角标 + 来源名 + 已连接内容源），同日删掉了前三项、只把内容源那行加了回来。
- **区块内容与页面大标题左对齐**：这一屏是完成态面板而不是向导里的某一步，所以去掉 `.wiz-body` 的 36px 缩进——**那 36px 本来就是用来对齐步骤标记的**，而标记在这一屏已经隐藏，对照物没了，缩进就成了凭空的偏移。`applyDoneState()` 用一个 `finishedPanel` 标志同时推导这两件事（隐藏标记、去掉缩进）：**有标记才需要缩进，两者必须同进退**。RSS 结果页仍保留缩进，因为它还显示着步骤标记。
- **步骤标记在这一屏整块隐藏**（2026-10-15，用户指出）：视频结果页和 RSS 完成态在屏幕上其实是同一种东西——一块「已完成/进行中」的面板，不是向导里的某一步，所以两者都隐藏步骤标记。判定条件写在 `applyDoneState()` 里：`#wizSteps.hidden = inCompletion || (isVideo && step === 'result')`。
  - **`&& step === 'result'` 这半句不能少**：只写 `isVideo` 会让视频路径在步骤 1–3 上也隐藏标记，用户就点不到步骤标题、无法返回上一步。这是实际写错过一次、被探针当场抓到的。


| 状态 | 文案 | 表现 |
|---|---|---|
| 复制中 | `Copying episodes…` | 状态胶囊；Check redirect 保持禁用 |
| 复制完成 | `Episodes copied` | 状态胶囊；**Check redirect 变为可点击** |

| 控件 | 位置 | 说明 |
|---|---|---|
| **Refresh status** | 第 1 步「Wait for the import to finish.」旁 | 点击后状态变为 `Episodes copied`（Mockup 中以一次点击代表轮询到完成） |
| **状态命名原则** | — | 状态文案必须**指明范围**（是「复制完成」而非笼统的「完成」）——因为音频文件要等重定向之后才真正导入，笼统的“完成”会被误解为整件事已经结束 |

> 导入复制完成之前，页面上**不出现任何重新导入的入口**。

### 6.5 301 Redirect 校验

**为什么必须做**：在 Podbean 上，**重定向就是触发真实音频文件导入的标志**——不设置重定向，音频文件不会被导入。

区块标题为 **Next, set up the redirect**，下方三步：

| # | 内容 |
|---|---|
| 1 | Wait for the import to finish.（旁有状态胶囊与 Refresh status） |
| 2 | Copy your new Podbean feed URL and set it as the redirect target in your old hosting platform.（下方为新 feed 地址与 Copy 按钮） |
| 3 | Come back and run the redirect check once your host has applied it. |

**Check redirect 的两种结果：**

| 结果 | 界面表现 |
|---|---|
| **未检测到重定向** | 弹出居中报错弹框：标题 `Redirect not detected`；正文说明未检测到旧 feed 指向该 Podbean feed 的重定向，提示确认重定向已在旧托管平台生效，并说明**新设置的重定向可能需要几分钟才能传播**；单个 `OK` 按钮关闭（点击遮罩或按 Esc 亦可关闭）；弹框打开时焦点落在 `OK` |
| **检测成功** | Toast 提示 `Redirect is working`；「Next, set up the redirect」区块整体替换为完成态内容（见 6.6） |

**弹框复用站内既有组件**（`modal-overlay` / `modal-confirm`），与其他四个弹框的遮罩、圆角、按钮样式一致。

> **Mockup 说明**：当前只演示**成功路径**，报错弹框保留在页面中但不触发。需要查看该状态时，在控制台执行
> `document.getElementById('redirectErrorModal').classList.add('open')`。

### 6.6 校验成功后的完成态

重定向校验通过后，整个「Next, set up the redirect」区块被以下内容替换。**顺序是「状态条 → 建议」**（2026-10-15 调整）：

| 元素 | 内容 |
|---|---|
| **状态条**（琥珀底、无边框，**最上方**） | `Importing your media files — we'll email you once they're done.` —— **状态在前、后续说明在后**，因为这条现在是**唯一的状态面**（见下）。深色文字、14px，`margin-bottom: 36px` |
| **建议说明** | We recommend keeping your old feed/site in place for a few weeks to ensure all content/subscribers have moved across.<br>**用正文色**（14px / `--text`，2026-10-15 由 `--text-secondary` 改为正文色）：这是要求用户继续照做的建议，不是小字补充 |

**这一状态没有出口**（2026-10-15）：Next 列表与「重新导入」入口都已从这里删除，用户走到这里就到头了；那两项只保留在 `Import to Podbean (complete)` 页面。删除时 `#wizReimport` 与它的 click 处理器一并移除——只删 markup 留下处理器会让 `getElementById(...).addEventListener` 抛错，把后面的初始化全部带崩。

**2026-10-15：状态从小标题并入琥珀条。** 此前状态被说了两遍——小标题说一次（`Importing your media files…` / `Import complete.`），琥珀条再说一次（邮件承诺 / `16 Successful`）。合并后只剩一个状态面：**琥珀条**。连带三点：

- 琥珀条文案改成**状态在前**，否则它当不了状态面（流内那条原来是纯未来时的承诺）。
- **两条琥珀条都不再有 ×**：它现在是常驻状态，只在下一个状态到来时被替换文字。此前只有页面那条带 ×，而关掉之后页面上就没有任何一句说明结果了。
- 状态卡片在完成态整张隐藏（见下表），小标题的 CSS 类、× 的按钮样式与它的 click 处理器都随之删除。
- **同一天还短暂加过一行「来源行」（`From <类型> · <地址>`），随后按用户要求删除。** 当时的理由是「只写类型没信息量、地址才让用户确认导的是哪条」，但最终判断是这一屏不需要它：状态条已经说明发生了什么，建议说明负责下一步，来源属于步骤二的输入，不必回述。`#wizDoneSource`、它的 CSS 与 `render()` 里的填充语句都已一并删除。

进入完成态时同时发生三处调整：

| 调整 | 原因 |
|---|---|
| **隐藏整张状态卡片** | 卡片标题（`RSS import`）与胶囊都随「小标题并入状态条」一起去掉了，卡片会变成空壳。**注意这是双向设置的**：非完成态（导入进行中）卡片仍是运行状态面，显示 `RSS import` + `Copying episodes…`，所以不能只隐藏一次 |
| **隐藏状态胶囊**（`Episodes copied`） | 同上，状态已由琥珀条承载 |
| **内容与页面标题左对齐**（去掉步骤内容的 36px 缩进） | 完成态不再显示步骤标记，缩进失去对齐对象；导入中的状态保留缩进，因为它对齐的是步骤名 |

**文件导入完成后的状态**（比上一状态更晚一步）：

| 元素 | 内容 |
|---|---|
| **状态条**（琥珀底，**最上方**） | `Import complete — 16 successful, 0 failed.`（2026-10-15 由 `File Import Completed: 16 Successful. 0 Failed.` 改写为状态在前） |
| **建议说明** | 与流内完成态同一句、同一位置、同一颜色（已在上一节说明） |
| **What you can do next** | 与上方建议说明的间距 **36px**（`.wiz-done-title` 的 `margin: 36px 0 20px`，2026-10-15 从 20px 调大）——它是一处**段落分隔**而不是建议的下一行；36px 也和琥珀条自身的下边距同值，页面只有一套纵向节奏。相邻边距会合并，所以实际间距就是 36px。<br>标题 + **两条**带深色图标与链接的后续建议：<br>1. You can review the **podcast information** and adjust the show settings.<br>2. You can review the **episode list** and edit any episodes.<br>两句尾巴**动词不同**（adjust / edit）——拆条时两句各带一遍 "making any necessary adjustments" 读起来重复，故不再沿用同一句收尾。<br>标题 2026-10-15 由参考图的 `Next:` 改成本句：`Next:` 只有一个冒号加一个最泛的词，没说下面是什么性质，而且它是命令式的光杆标签，与下面几行「You can review the…」的语气不搭。也没有选 `Next steps`——"steps" 会暗示这是一串按顺序要做的事，而这三项实际是平行且可选的。<br>~~提交到 podcast apps / 加入 Ads Marketplace~~ 两条同批删除 |
| **Next 列表第 3 项** | **Optionally, import downloads.**（可折叠，**默认收起**——2026-10-15 从「Add Downloads to Imported Episodes」改名，并把默认从展开改为收起；收起时箭头朝下 ▼、展开时朝上 ▲，箭头紧跟标题右侧）：可把旧主机上每集的下载量导入 Podbean；含 CSV 导入说明、`Import CSV File` 按钮，以及两段合规声明（导入数据须真实、虚报历史数据违反 Terms of Use 可能被停用账号） |
| **重新导入** | Click **here** if you want to re-import content.（`#wizReimportComplete`）—— 点击返回步骤一重新开始 |

> **Mockup 入口说明**：侧边栏 Settings 下另有一项 **Import to Podbean (complete)**，直接展示上述「文件导入完成后」的页面状态——仅为便于评审，**不属于最终产品的菜单项**。

> **第二个 Mockup 入口：导入状态说明**（2026-10-15）。侧边栏 Settings 下新增一项同名条目，把导入相关的**三种状态**并排放在一页上供对照，方便评审。同样是 **mockup 专用、不属于最终产品的菜单项**。三种状态：① RSS 正在导入（流内完成态）② YouTube Playlist 正在导入（视频结果页）③ 已完成（文件全部导完）。实现要点：
> - 三张卡片（`.state-card` / `.state-tag`）各自复刻一屏的**整个内容区**，含三屏共用的页面大标题与 tagline（用户要求完整复刻）。
> - **卡片内容由脚本从真实区块克隆而来**（`#importPageHead`、`#wizResultDone`、`#wizResultVideo`、`#page-import-complete .wiz-done`），不是手抄的 markup——这一页被改了十几次的文案很容易手抄过期，克隆让它在结构上不可能过期。
> - 视频那张卡片的「已连接内容源」值是运行时才写入的，克隆出来会是空的，所以要手工填一个示例值（`Podbean Amplified Season 2`）。
> - 克隆时会**剥掉所有 `id` 与 `aria-controls`**：重复 id 会让 `getElementById` 指到克隆体上，把真实页面的连线弄坏。折叠行与开关分别复用 `wireCollapsible(toggle, panel)` 和 `wireSwitch(el)`——**这两个都必须做成可复用的函数**，因为克隆体是在页面初始化之后才生成的，`querySelectorAll(...)` 那一轮永远够不到它们。
> - **这个 `.page-section` 必须是 `.content` 的子元素**，不能是它的兄弟——放进 `</div>` 之后会拿到错误的列宽（`x230..1737` 而正确值为 `x352..1616`）。验证方式是对同一个元素做**差分测量**：把已知正确页面激活后量一次，再量新页面，两者必须一致。

---

## 7. 全局交互规则

### 7.1 Save Bar（底部保存栏）

Podcast Info 和 Feed 页面各自拥有独立的 Save bar，互不影响。Plugin 页面不包含 Save bar。

```
┌──────────────────────────────────────────────┐
│  …页面内容…                                   │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │                              Cancel   Save│  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

| 属性 | 说明 |
|---|---|
| **定位** | sticky，吸附在每个页面底部 |
| **默认状态** | 隐藏（display: none） |
| **显示条件** | 当前页面的表单任意字段发生更改时变为可见 |
| **子项** | Cancel 按钮、Save 按钮 |

**按钮行为（各页面独立）：**

| 按钮 | 动作 |
|---|---|
| Cancel | 隐藏当前页面的 Save bar，当前页面所有字段恢复到上次保存时的值 |
| Save | 校验当前页面的必填字段；有错误则定位到错误字段；全部通过则提交成功，Toast 提示 **"Saved successfully"**，Save bar 隐藏 |

**补充说明：**

- **Podcast Info 页面 Save**：校验该页面下所有三个 Tab 的必填字段。有错误时自动切换到第一个出错 Tab、高亮错误字段、有错 Tab 标签显示 ⚠
- **Feed 页面 Save**：校验 Feed 页面的必填字段（Feed Website URL），格式校验（Verification Email、Episode Number Limit、Redirect URL）
- **Plugin 页面**：无表单字段，无需 Save bar

### 7.2 修改检测

以下操作均会触发 Save bar 显示：

| 控件类型 | 监听事件 |
|---|---|
| 文本输入框（.pb-input, .pb-url-input） | input / change |
| 富文本编辑器（.pb-editor-body） | input |
| 自定义下拉选择器（.pb-vs） | change（选中新选项时） |
| 单选按钮（.pb-radio input） | change |
| Toggle 开关（.pb-switch input） | change |

### 7.3 自定义下拉选择器

```
┌─────────────────────┐
│  Selected Option  ▼ │  ← 触发器
└─────────┬───────────┘
          │ 点击展开
    ┌─────┴───────────┐
    │ Option 1  (选中) │  ← 激活项高亮
    │ Option 2        │
    │ Option 3        │
    └─────────────────┘  ← 点击外部关闭
```

| 属性 | 说明 |
|---|---|
| **选中反馈** | 激活项高亮或有选中标识，触发器文字更新为选中项 |
| **保存联动** | 选中后触发 Save bar 显示 |

### 7.5 页面切换

| 操作 | 行为 |
|---|---|
| 侧边栏点击子菜单 | 切换主内容区页面 |
| 切换页面 | 自动重置到该页面的第一个 Tab |
| 未保存修改时切换 | 弹出确认弹框，标题 **"Unsaved Changes"**，文字 "You have unsaved changes. Do you want to leave without saving?"；**Stay** 停留在当前页，**Leave** 丢弃修改并切换；点击弹框之外区域或按 Esc 键同 Stay 行为 |

### 7.6 版本提示（mockup 专用，不属于产品功能）

这个 mockup 会被分享给团队其他人看。两个原因会让他们看到旧版本：

1. **GitHub Pages 把 HTML 缓存 10 分钟**（`cache-control: max-age=600`，前面还有一层 CDN），而且**不允许自定义响应头**，所以这一层关不掉；
2. **已经打开的标签页永远不会自己重新请求**——这才是"不知道有更新"的主因。

对策是页面自己定时去问：

| 元素 | 行为 |
|---|---|
| **顶栏版本号**（`.build-stamp`，12px / 三级色） | 加载时读 `version.json`，显示 `Updated <时间>`；点击跳到该目录的 commit 历史，方便看"改了什么" |
| **更新横幅**（`.update-banner`，右下角深色卡片） | 每 90 秒带 `no-store` 重新取一次 `version.json`；一旦 `built` 与本次加载时不同，就弹出来，带 **Reload** 与关闭 ×。关掉后同一个版本不再打扰，但**下一个新版本会再次弹出** |

- `version.json`（放在 `Settings/` 下）由同步步骤写入，内容形如 `{ "built": "…Z", "label": "…" }`——`built` 用于比对，`label` 用于显示，**刻意不做日期解析**，避免时区与格式差异。
- **读取失败一律静默**（设计预览面板、直接双击打开文件都会失败），不报错、不显示任何东西。
- **已知局限**：检测脚本只存在于加了它之后的版本里，所以改动**之前**就被打开的旧页面不会收到通知——第一次上线这个机制时需要在群里说一声。

---

## 8. 数据校验规则

### 8.1 必填字段

| 页面 | 字段 | 校验规则 | 错误提示 |
|---|---|---|---|
| Podcast Info | Podcast Title | 不能为空 | 见 3.1.1 |
| Podcast Info | Brief Description | 不能为空，也不能为默认值 "New podcast weblog" | 见 3.1.2 |
| Podcast Info | Podcast Category | 至少选择一个分类 | 见 3.1.3 |
| Podcast Info | Podcast Logo | 必须有图片 | 见 3.1.4 |
| Feed | Feed Website URL | 不能为空 | 见 4.4 |

### 8.2 格式校验

| 字段 | 规则 | 错误提示示例 |
|---|---|---|
| Ownership Verification Email | 合法 email 格式 | "Please enter a valid email address" |
| Feed Website URL | 合法域名格式 | "Please enter a valid Website URL" |
| Redirect URL | 合法 URL 格式（https） | "Please enter a valid feed URL" |
| Podcast Logo 上传 | 通过文件选择器过滤，不支持的格式无法选中 | — |
| Episode Number Limit | 必须为整数且不超过当前套餐上限 | "Please enter a whole number"（含小数时）；"Please enter a number between 1 and {limit}"（超过上限时） |

### 8.3 保存前校验流程

各页面独立执行校验。以下为 Podcast Info 页面（含多 Tab）的校验流程：

```
用户点击 Save（Podcast Info 页面）
       │
       ▼
┌──────────────────────────────┐
│ 遍历所有 Tab 的必填字段       │
│ 执行校验规则                 │
└─────────────┬────────────────┘
              │
         ┌────┴────┐
         │ 通过？   │
         └────┬────┘
              │
    ┌─────────┴──────────┐          ┌─────────────────────────────────────────────────┐
    │ 是 → 提交所有 Tab     │          │ 否 → 自动切换到第一个有错的 Tab                │
    │                 │          │ 定位到第一个错误字段，显示错误提示           │
    │ Toast:          │          │ 滚动到该字段可视区域                       │
    │ "Saved success…" │          │ 有错 Tab 标签显示 ⚠ 标识                   │
    │ Save bar 隐藏    │          │ 用户修完后再次点击 Save                    │
    └──────────────────┘          └─────────────────────────────────────────────────┘
```

Feed 页面校验流程类似，但无 Tab，校验失败时直接在错误字段下方显示错误提示，定位到第一个错误字段。

---

## 附录：新老页面对比

### 新 Mockup 变化说明

| 字段 | 新 Mockup | 非 Business Plan 用户老页面 | Business Plan 用户老页面 |
|---|---|---|---|
| **布局** | 分为 3 个 Tab：**Basic**、**Author & Region**、**Content Classification** | 单页纵向排列，所有字段一次性展示 | 单页纵向排列，所有字段一次性展示 |
| **Podcast Title** | Basic Tab | 有 | 有 |
| **Brief Description** | Basic Tab | 有 | 有 |
| **Podcast Category** | Basic Tab（最多 3 个分类） | 有 | 有 |
| **Podcast Logo** | Basic Tab | 有 | 有 |
| **Author / Owner** | Author & Region Tab，重命名为 **Author** | 有 | 有 |
| **Language** | Author & Region Tab | 有 | 有 |
| **Copyright** | Author & Region Tab | 有 | 有 |
| **Country Of Origin** | Author & Region Tab（Global / Specific countries 下拉） | 有 | 有 |
| **Timezone** | Author & Region Tab（仅 "Current time: ..."）| 有 | 有 |
| **Podcast Type** | Content Classification Tab | 有 | 有 |
| **Content Explicit** | Content Classification Tab（从 Feed 页面移入） | 有（Feed 页面） | 有（Feed 页面） |
| **Episode Download Link** | **已移除**（非 Business，Show（不可控）；Business 在 Advanced Options 中控制） | Show | Show |
| **Share on Podcast Site** | **已移除**（非 Business，Show（不可控）；Business 在 Advanced Options 中控制） | Show（不可控） | Hidden |
| **Comments** | **已移除**（非 Business，Enable（不可控）；Business 在 Advanced Options 中控制） | Enable（不可控） | Enable |
| **Removing Podbean Brand** | **已移除**（非 Business，No（不可控）；Business 在 Advanced Options 中控制） | No（有控制按钮，点击升级） | No（有控制按钮） |

### Feed 页面变化说明

> **注：** Business Plan 用户的 Private Channel 默认不显示 Feed 页面及其菜单项。

| 字段 | 新 Mockup | 非 Business Plan 老页面 | Business Plan 老页面 |
|---|---|---|---|
| **Podcast Feed URL** | 有（只读 + 复制） | 有 | 有 |
| **Content Explicit** | **移入 Podcast Info → Content Classification Tab** | 有 | 有 |
| **Apple Podcasts Summary** | **已移除**（删除前台独立输入框；已填写过历史内容的用户仍可见，字段设为只读，并标注功能已停用；提供"Use Podcast Description"操作，用户确认后删除独立 Summary，让 `<itunes:summary>` 跟随 Podcast Description，不再提供修改旧 Summary 的能力；底层可暂时继续自动输出以最大化兼容性） | 有 | 有 |
| **Podcast Website** | 改名为 **Custom Website URL**（原默认填入 Podbean website URL；现改为用户留空则使用 Podbean website URL，用户填写则使用填写的值） | 有 | 有 |
| **Episode Link** | **已移除**（转移到 Episode 发布页面，名称为 "Custom Episode Link"） | 有 | 有 |
| **Episode Number Limit** | 有 | 有 | 有 |
| **Episode Artwork Tag** | **已移除**（Podbean 将自动使用 `<itunes:image>` 标签输出单集封面，用户无需再选择具体的 RSS 标签类型。Media Content Tag → 已发布单集暂时保留现有 Feed 输出，新建单集或更新封面后改用 `<itunes:image>`；Not Set → 已发布单集继续不输出单集封面标签；New Episodes → 上传自定义封面时自动使用 `<itunes:image>`） | 有 | 有 |
| **Ownership Verification Email** | 有 | 有 | 有 |
| **Apple Podcasts Verification** | **移出**（转移到 Apple Podcasts 提交页面） | 有 | 有 |
| **Remove from Apple Directory** | **已移除**（从普通设置中移除；为已开启的用户提供"关闭并移除标签"的过渡机制，已启用 `<itunes:block>` 的用户保留一个临时关闭入口） | 有 | 有 |
| **Set Podcast New Feed URL** | **已移除**（改为迁移流程中的自动步骤：用户完成导入旧 Feed；平台自动将正确的 `<itunes:new-feed-url>` 添加到新 Feed。可长期保留。⚠ 用户更改 subdomain 时是否也自动添加此 tag，需技术确认） | 有 | 有 |
| **Redirect to a New Feed** | 有（Toggle + 条件 URL 输入 + 危险警告） | 有 | 有 |

**新 Mockup Feed 页面字段总数从 13 个精简为 5 个。**


> **说明**：本文档基于现有前端 Mockup（index.html）编写，部分说明标记为「待扩展」表示当前 Mockup 中未完整实现但应纳入最终产品的功能，需产品团队进一步确认。
