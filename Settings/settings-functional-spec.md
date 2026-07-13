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
6. [全局交互规则](#6-全局交互规则)
   - [6.1 Save Bar（底部保存栏）](#61-save-bar底部保存栏)
   - [6.2 修改检测](#62-修改检测)
   - [6.3 自定义下拉选择器](#63-自定义下拉选择器)
   - [6.5 页面切换](#65-页面切换)
7. [数据校验规则](#7-数据校验规则)
   - [7.1 必填字段](#71-必填字段)
   - [7.2 格式校验](#72-格式校验)
   - [7.3 保存前校验流程](#73-保存前校验流程)
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

### 4.4 Feed Website URL（Feed 中的播客网站地址）

| 属性 | 说明 |
|---|---|
| **名称** | 原名为 "Podcast Website"，现改为 **Feed Website URL** |
| **类型** | URL 输入 |
| **默认值** | 用户的 Podbean 播客网站 URL |
| **占位提示** | 用户的 Podbean 播客网站 URL |
| **必填** | 是 |
| **校验规则** | 不能为空 |
| **错误提示** | "Please enter a Feed Website URL" |
| **辅助说明** | "Use your own website URL to be displayed on Apple Podcasts instead of your Podbean website URL." |

**URL 输入规则：**

- 标准 URL 输入框，用户需输入完整地址（含 `https://`）
- 输入框聚焦时下划线高亮

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

## 6. 全局交互规则

### 6.1 Save Bar（底部保存栏）

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

### 6.2 修改检测

以下操作均会触发 Save bar 显示：

| 控件类型 | 监听事件 |
|---|---|
| 文本输入框（.pb-input, .pb-url-input） | input / change |
| 富文本编辑器（.pb-editor-body） | input |
| 自定义下拉选择器（.pb-vs） | change（选中新选项时） |
| 单选按钮（.pb-radio input） | change |
| Toggle 开关（.pb-switch input） | change |

### 6.3 自定义下拉选择器

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

### 6.5 页面切换

| 操作 | 行为 |
|---|---|
| 侧边栏点击子菜单 | 切换主内容区页面 |
| 切换页面 | 自动重置到该页面的第一个 Tab |
| 未保存修改时切换 | 弹出确认弹框，标题 **"Unsaved Changes"**，文字 "You have unsaved changes. Do you want to leave without saving?"；**Stay** 停留在当前页，**Leave** 丢弃修改并切换；点击弹框之外区域或按 Esc 键同 Stay 行为 |

---

## 7. 数据校验规则

### 7.1 必填字段

| 页面 | 字段 | 校验规则 | 错误提示 |
|---|---|---|---|
| Podcast Info | Podcast Title | 不能为空 | 见 3.1.1 |
| Podcast Info | Brief Description | 不能为空，也不能为默认值 "New podcast weblog" | 见 3.1.2 |
| Podcast Info | Podcast Category | 至少选择一个分类 | 见 3.1.3 |
| Podcast Info | Podcast Logo | 必须有图片 | 见 3.1.4 |
| Feed | Feed Website URL | 不能为空 | 见 4.4 |

### 7.2 格式校验

| 字段 | 规则 | 错误提示示例 |
|---|---|---|
| Ownership Verification Email | 合法 email 格式 | "Please enter a valid email address" |
| Feed Website URL | 合法域名格式 | "Please enter a valid Website URL" |
| Redirect URL | 合法 URL 格式（https） | "Please enter a valid feed URL" |
| Podcast Logo 上传 | 通过文件选择器过滤，不支持的格式无法选中 | — |
| Episode Number Limit | 必须为整数且不超过当前套餐上限 | "Please enter a whole number"（含小数时）；"Please enter a number between 1 and {limit}"（超过上限时） |

### 7.3 保存前校验流程

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

| 字段 | 新 Mockup | 非 Business Plan 老页面 | Business Plan 老页面 |
|---|---|---|---|
| **Podcast Feed URL** | 有（只读 + 复制） | 有 | 有 |
| **Content Explicit** | **移入 Podcast Info → Content Classification Tab** | 有 | 有 |
| **Apple Podcasts Summary** | **已移除**（删除前台独立输入框；已填写过历史内容的用户仍可见，字段设为只读，并标注功能已停用；提供"Use Podcast Description"操作，用户确认后删除独立 Summary，让 `<itunes:summary>` 跟随 Podcast Description，不再提供修改旧 Summary 的能力；底层可暂时继续自动输出以最大化兼容性） | 有 | 有 |
| **Podcast Website** | 改名为 **Feed Website URL** | 有 | 有 |
| **Episode Link** | **已移除**（转移到 Episode 发布页面，名称为 "Episode link in RSS feed"） | 有 | 有 |
| **Episode Number Limit** | 有 | 有 | 有 |
| **Episode Artwork Tag** | **已移除**（Podbean 将自动使用 `<itunes:image>` 标签输出单集封面，用户无需再选择具体的 RSS 标签类型。Media Content Tag → 已发布单集暂时保留现有 Feed 输出，新建单集或更新封面后改用 `<itunes:image>`；Not Set → 已发布单集继续不输出单集封面标签；New Episodes → 上传自定义封面时自动使用 `<itunes:image>`） | 有 | 有 |
| **Ownership Verification Email** | 有 | 有 | 有 |
| **Apple Podcasts Verification** | **移出**（转移到 Apple Podcasts 提交页面） | 有 | 有 |
| **Remove from Apple Directory** | **已移除**（从普通设置中移除；为已开启的用户提供"关闭并移除标签"的过渡机制，已启用 `<itunes:block>` 的用户保留一个临时关闭入口） | 有 | 有 |
| **Set Podcast New Feed URL** | **已移除**（改为迁移流程中的自动步骤：用户完成导入旧 Feed；平台自动将正确的 `<itunes:new-feed-url>` 添加到新 Feed。可长期保留。⚠ 用户更改 subdomain 时是否也自动添加此 tag，需技术确认） | 有 | 有 |
| **Redirect to a New Feed** | 有（Toggle + 条件 URL 输入 + 危险警告） | — | — |

**新 Mockup Feed 页面字段总数从 13 个精简为 5 个。**


> **说明**：本文档基于现有前端 Mockup（index.html）编写，部分说明标记为「待扩展」表示当前 Mockup 中未完整实现但应纳入最终产品的功能，需产品团队进一步确认。
