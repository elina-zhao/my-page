# Podcast Dashboard — Settings 模块功能说明文档

> 版本：v1.3  
> 最后更新：2026-10-22  
> 状态：产品需求说明

> ⚠️ **请注意：** 本功能文档根据当前版本整理，可能存在遗漏或理解偏差。如与线上实际表现不一致，请再次确认。

---

## 目录

1. [产品概述](#1-产品概述)
2. [导航与页面结构](#2-导航与页面结构)
   - [2.1 侧边栏层级](#21-侧边栏层级)
   - [2.2 交互逻辑](#22-交互逻辑)
     - [2.2.1 未保存修改时切换页面](#221-未保存修改时切换页面)
3. [页面一：General（通用设置）](#3-页面一general通用设置)
   - [3.0 页面结构](#30-页面结构)
     - [Tab 切换规则](#tab-切换规则)
     - [Tab 切换与未保存状态](#tab-切换与未保存状态)
     - [Save 校验与错误提示](#save-校验与错误提示)
   - [3.1 Basic 标签页（基础信息）](#31-basic-标签页基础信息)
     - [3.1.1 Podcast Title（播客标题）](#311-podcast-title播客标题)
     - [3.1.2 Brief Description（简介）](#312-brief-description简介)
     - [3.1.3 Podcast Category（播客分类）](#313-podcast-category播客分类)
     - [3.1.4 Podcast Logo（播客封面）](#314-podcast-logo播客封面)
     - [3.1.5 Author（作者）](#315-author作者)
   - [3.2 Region 标签页（区域）](#32-region-标签页区域)
     - [3.2.1 Language（语言）](#321-language语言)
     - [3.2.2 Country of Origin（原产国/分发区域）](#322-country-of-origin原产国分发区域)
     - [3.2.3 Timezone（时区）](#323-timezone时区)
   - [3.3 Content 标签页（内容）](#33-content-标签页内容)
     - [3.3.1 Podcast Type（播客类型）](#331-podcast-type播客类型)
     - [3.3.2 Content Explicit（内容分级）](#332-content-explicit内容分级)
     - [3.3.3 Copyright（版权信息）](#333-copyright版权信息)
   - [3.4 Feed 标签页（RSS 源管理）](#34-feed-标签页rss-源管理)
     - [3.4.1 Podcast Feed URL（RSS 源地址）](#341-podcast-feed-urlrss-源地址)
     - [3.4.2 Episode Number Limit（剧集数量限制）](#342-episode-number-limit剧集数量限制)
     - [3.4.3 Ownership Verification Email（所有者验证邮箱）](#343-ownership-verification-email所有者验证邮箱)
     - [3.4.4 Alternative Website URL](#344-alternative-website-url)
     - [3.4.5 Generate audio-only feed（生成纯音频 feed）](#345-generate-audio-only-feed生成纯音频-feed)
     - [3.4.6 Redirect to a New Feed（Feed 重定向）](#346-redirect-to-a-new-feedfeed-重定向)
4. [页面二：Plugins（插件管理）](#4-页面二plugins插件管理)
   - [4.0 页面结构](#40-页面结构)
   - [4.1 插件列表](#41-插件列表)
   - [4.2 插件操作](#42-插件操作)
   - [4.3 插件编辑弹窗](#43-插件编辑弹窗)
   - [4.4 Get More Plugins](#44-get-more-plugins)
5. [页面三：Import（导入）](#5-页面三import导入)
   - [5.0 页面结构](#50-页面结构)
   - [5.1 入口：选择来源](#51-入口选择来源)
   - [5.2 步骤一：填写地址](#52-步骤一填写地址)
   - [5.3 步骤二：范围与输出类型](#53-步骤二范围与输出类型)
   - [5.4 步骤三：格式与可选设置](#54-步骤三格式与可选设置)
   - [5.5 导入状态（Import 之后）](#55-导入状态import-之后)
   - [5.6 301 Redirect 校验与完成态](#56-301-redirect-校验与完成态)
   - [5.7 免费账号（Free plan）：不能开始导入](#57-免费账号free-plan不能开始导入)
   - [5.8 Unlimited Audio 账号（audio plan）：视频播客需要 Plus](#58-unlimited-audio-账号audio-plan视频播客需要-plus)
   - [5.9 导入下载数据（Import data）](#59-导入下载数据import-data)
6. [全局交互规则](#6-全局交互规则)
   - [6.1 Save Bar（底部保存栏）](#61-save-bar底部保存栏)
   - [6.2 修改检测](#62-修改检测)
   - [6.3 自定义下拉选择器](#63-自定义下拉选择器)
   - [6.4 页面切换](#64-页面切换)
7. [数据校验规则](#7-数据校验规则)
   - [7.1 必填字段](#71-必填字段)
   - [7.2 格式与长度校验](#72-格式与长度校验)
   - [7.3 保存前校验流程](#73-保存前校验流程)
8. [附录：新老页面对比](#附录新老页面对比)
   - [General 页面变化说明](#general-页面变化说明)
   - [Feed 标签页变化说明](#feed-标签页变化说明)

---

## 1. 产品概述

**Settings** 是播客仪表盘的核心配置模块，包含三个子页面：General（节目基本信息、元数据与 Feed 配置）、Plugins（插件集成管理）、Import（从其他平台导入节目）。

---

## 2. 导航与页面结构

### 2.1 侧边栏层级

```
Settings                              ← 一级导航（带箭头展开/收起）
├── General（通用设置）               ← 默认页，active 状态
├── Plugins（插件管理）
└── Import（导入）
```

- Settings 是一级导航条目，点击后展开 / 收起其子菜单。
- 三个子页面在同一内容区内切换，不发生整页跳转。
- 进入 Settings 时默认展示 **General**。

### 2.2 交互逻辑

#### 2.2.1 未保存修改时切换页面

General 有一个 Save bar，四个 Tab 共用（Plugins、Import 没有 Save bar）。当用户在当前页面有未保存的修改（Save bar 可见）时，直接点击其他页面菜单，弹出居中确认对话框：

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

## 3. 页面一：General（通用设置）

### 3.0 页面结构

```
┌──────────────────────────────────────────────┐
│  General                                      │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │  Basic │ Region │ Content │ Feed          │  ← 横向 Tab
│  └──────────────────────────────────────────┘ │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │  表单内容区域（随 Tab 切换）              │ │
│  │                                          │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

#### Tab 切换规则

- 四个 Tab 横向排列，底部有下划线指示当前激活项
- 点击 Tab 只切换面板内容，不触发页面跳转
- 切换页面后自动回到第一个 Tab（Basic）

#### Tab 切换与未保存状态

四个 Tab 同属 General 页面，共享同一个 Save bar。Tab 切换时处理策略如下：

| 场景 | 处理方式 |
|---|---|
| Tab A 有未保存的修改 → 点击 Tab B | 修改**保留在表单状态中**，不会丢失；Tab B 展示其字段（默认值或之前已保存的值） |
| Tab B 继续修改 → 再切回 Tab A | Tab A 中之前的修改依然保留 |
| 任意 Tab 有修改 | Save bar 保持显示 |
| 点击 Save | 校验**所有 Tab** 的必填字段 → 见下文 [Save 校验与错误提示](#save-校验与错误提示) |
| 点击 Cancel | 清空所有 Tab 的未保存修改，恢复至上次保存值 |

#### Save 校验与错误提示

点击 Save 时，系统校验 General 页面下的所有四个 Tab 的必填字段：

| 步骤 | 行为 |
|---|---|
| 1. 校验 | 遍历四个 Tab 的所有可见字段，执行校验规则 |
| 2. 有错误 | 自动切换到**第一个包含错误**的 Tab；该 Tab 内第一个错误字段下方显示错误提示，并滚动到可视区域；所有包含错误的 Tab 标签变为红色 |
| 3. 全部通过 | 一次性提交所有 Tab 的字段值，Toast 提示 **"Saved successfully"**，Save bar 隐藏 |

**错误标识：** 有错误的 Tab 标签变红，点击可切换到该 Tab 查看原因；修复后由下次 Save 重新判定；点击 Cancel 一并清除。

---

### 3.1 Basic 标签页（基础信息）

#### 3.1.1 Podcast Title（播客标题）

| 属性 | 说明 |
|---|---|
| **类型** | 单行文本输入 |
| **必填** | 是（标有红色 *） |
| **产品默认值** | `The {subdomain}'s Podcast` — 创建播客频道时自动生成，其中 `{subdomain}` 为用户注册时分配的子域名 |
| **占位提示** | "Make a clear, concise name for your title" |
| **输入样式** | 下划线输入框，聚焦时高亮 |
| **校验规则** | 不能为空，且最多 200 字符（见 7.2） |
| **错误提示** | 为空："Please enter a podcast title"；超长："Please enter no more than 200 characters" |

示例：子域名为 `elinazplus`，默认标题为 `The elinazplus's Podcast`。

#### 3.1.2 Brief Description（简介）

| 属性 | 说明 |
|---|---|
| **类型** | 富文本编辑器 |
| **必填** | 是（标有红色 *） |
| **产品默认值** | "New podcast weblog" — 频道创建时自动填入 |
| **工具栏** | Undo / Redo；Bold / Italic / Underline；Link — 共 7 个按钮 |
| **校验规则** | 不能为空，不能保留默认值 "New podcast weblog"，且最多 50,000 字符（见 7.2） |
| **错误提示** | 为空或仍是默认值："Please enter a brief description"；超长："Please enter no more than 50,000 characters" |

#### 3.1.3 Podcast Category（播客分类）

| 属性 | 说明 |
|---|---|
| **类型** | 分类下拉选择器 + 「+」按钮 |
| **必填** | 是（标有红色 *）；第 1 行必须选择分类 |
| **占位文字** | "Select a category"（未选择时） |
| **提示文字** | "Apple Podcasts only recognizes the first category and subcategory." |
| **选项** | 产品分类列表共 110 项，二级分类以「Parent:Child」形式与一级分类同列；下拉最高 280px，超出滚动；选项内容以线上产品为准，<span style="color:#a16207;font-weight:700;">待开发确认</span> |
| **去重** | 已被其他行选中的分类，在该行下拉中置灰不可选 |
| **分类数量** | 默认显示 1 行；点击「+」增加一行，**最多 3 行**，达到上限后「+」隐藏 |
| **删除分类** | 第 2、3 行各有一个删除按钮，可单独移除；第 1 行不可删除；删除中间行时，下方分类依次上移 |
| **校验规则** | Save 时第 1 行必须选择分类；其余行可选，未选择的行不参与保存 |
| **错误提示** | "Please select a podcast category" |

#### 3.1.4 Podcast Logo（播客封面）

| 属性 | 说明 |
|---|---|
| **类型** | 图片预览 + 模板下拉 + 上传按钮 |
| **必填** | 是（标有红色 *）；默认已带封面，只能更换、不能删除，不存在为空的情况 |
| **预览** | 正方形图片展示当前封面 |
| **模板选择** | 下拉展示内置模板；选择模板后预览随之更新 |
| **上传按钮** | "Upload image"；点击打开文件选择器，只接受 JPG / PNG；选中合法图片后打开编辑弹窗，确认上传后预览更新为新图片 |
| **编辑弹窗** | 三步：**Upload image**（预览 + 尺寸 / 文件大小；Upload 直接使用原图，Customize 进入裁剪）→ **Crop image**（正方形裁剪框，可拖动、可四角缩放，Continue）→ **Customize text**（Text / Horizontal / Vertical / Color / Font Size / Font Family，Upload 合成后上传）；可返回上一步，关闭则放弃 |
| **文件信息** | 预览下方显示 `{宽}x{高}px, {大小}`，大小以 KB / MB 显示并保留两位小数 |
| **3MB 上限** | 原图超过 3MB：弹窗内报错、Upload 禁用，Customize 仍可点击；裁剪后的文件按同一规则校验 |
| **图片要求** | `Recommended: 1400–2048 px square (jpg or png). Apple requires original artwork.` 后面跟一个 **Details** 链接，在新标签页打开 `https://podcasters.apple.com/artwork-guide` |
| **校验规则** | 选择文件时过滤格式：非 JPG / PNG 提示错误且预览不变；封面不参与「为空」校验（见 7.1） |
| **错误提示** | 格式错误："Please upload a JPG or PNG image"；超限："This image is larger than 3 MB. Customize it to reduce the file size before uploading." |

#### 3.1.5 Author（作者）

| 属性 | 说明 |
|---|---|
| **类型** | 单行文本输入 |
| **必填** | 否 |
| **占位提示** | "Author name" |
| **产品默认值** | `{subdomain}` — 频道创建时自动填入用户的子域名 |
| **校验规则** | 最多 225 字符；超过时 Save 拦截并提示 "Please enter no more than 225 characters" |
| **对单集的影响** | 发布新单集时自动填入 Episode Settings 的 Author；修改后只影响之后新建的单集，已创建的单集（published / draft / future / AI 生成中等）保持 episode 创建时的 Author |
| **展示位置** | 该名称会出现在播客的 RSS feed 中 |

---

### 3.2 Region 标签页（区域）

#### 3.2.1 Language（语言）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器 |
| **必填** | 是，但产品中始终有预设值，不会出现未选中的空状态 |
| **默认值** | `English [en]`；是否按账号 / 浏览器语言预选，<span style="color:#a16207;font-weight:700;">待开发确认</span> |
| **选项** | 产品的语言列表，共 242 条：首条为 **Select Language**，其后 241 种语言，顺序与产品一致；格式 `Name [code]`（如 `English [en]`、`Chinese (Simplified) [zh-cn]`），代码取自产品数据；选项内容以线上产品为准，<span style="color:#a16207;font-weight:700;">待开发确认</span> |
| **行为** | 点击展开选项列表，选中后更新触发器文字，并触发 Save bar 显示；列表可滚动，展开时定位到当前选中项 |

#### 3.2.2 Country of Origin（原产国/分发区域）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器 + 条件显示的多选控件 |
| **解释文字** | Defines the intended market/territory where the podcast is relevant to the consumer. |
| **选项** | **Global**、**Specific countries** |
| **默认值** | Global |
| **交互** | 选择 **Global** 时不显示额外控件；选择 **Specific countries** 时出现国家多选框，支持输入 **Search countries** 过滤、以标签（chip）形式多选、可逐个移除 |
| **选项数据** | Specific countries 的国家列表与线上产品一致，按字母序排列；具体内容<span style="color:#a16207;font-weight:700;">待开发确认</span> |
| **必填规则** | 选择 Specific countries 时，**至少选择一个国家**；Global 不受此约束 |
| **错误提示** | "Please select at least one country"（出现在多选框下方） |

#### 3.2.3 Timezone（时区）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器 |
| **必填** | 是，但产品中始终有预设值，不会出现未选中的空状态 |
| **选项** | 线上产品时区列表共 82 项，格式 `(GMT±HH:MM) 城市…`，按偏移量从西到东排列；部分项在列表内附 **Daylight Time** 副标题（仅列表显示，触发器只显示主文字）；下拉最高 340px，超出滚动；选项内容以线上产品为准，<span style="color:#a16207;font-weight:700;">待开发确认</span> |
| **默认值** | <span style="color:#a16207;font-weight:700;">待开发确认</span>：默认值与是否按 IP 自动判断均未定；mockup 暂按账号所在时区显示 `(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi` |
| **辅助提示** | `Current time: Jun 16, 2026, 10:21 AM` |
| **行为** | 当前时间按所选时区显示并实时更新；切换时区后立即按新时区刷新 |
| **与定时单集的关系** | 已排期（scheduled）的单集按当前时区计算发布时间；修改时区后，这些单集的发布日期也随之改变 |

---

### 3.3 Content 标签页（内容）

#### 3.3.1 Podcast Type（播客类型）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器 |
| **选项** | Episodic、Serial |
| **默认值** | Episodic |
| **辅助说明** | "Choose how episodes are ordered on your podcast website and in your RSS feed." |

**Podcast Type** 决定内容如何组织，以及单集在 Podbean 网站和播客 RSS feed 中的展示顺序。Podbean 提供两种选项：

**Episodic**（默认）：单集从最新到最早展示（last to first）。

**Serial**：单集从最早到最新展示（first to last）。

#### 3.3.2 Content Explicit（内容分级）

| 属性 | 说明 |
|---|---|
| **类型** | 下拉选择器 |
| **选项** | Clean / False、Explicit / True |
| **默认值** | Clean / False |
| **辅助说明** | "Specify whether your podcast contains explicit content." |

**Explicit Tag in RSS Feed**：默认值为 "Clean/False"。对应 RSS feed 中的 `<itunes:explicit>` 标签，用于声明播客的家长指导（parental advisory）信息。

#### 3.3.3 Copyright（版权信息）

| 属性 | 说明 |
|---|---|
| **类型** | 单行文本输入 |
| **必填** | 否 |
| **占位提示** | "Copyright 2026 All rights reserved." |
| **产品默认值** | "Copyright {currentYear} All rights reserved." — 年份取频道创建时的当前年份 |
| **校验规则** | 最多 200 字符；超过时 Save 拦截并提示 "Please enter no more than 200 characters" |
| **展示位置** | 用户前台站点的 footer |

---

### 3.4 Feed 标签页（RSS 源管理）

**保存规则：** Feed 标签页与其余三个 Tab 共用 General 的同一个 Save bar（见 6.1）。

字段顺序：Podcast Feed URL → Episode Number Limit → Ownership Verification Email → Alternative Website URL → Generate audio-only feed → Redirect to a New Feed。

#### 3.4.1 Podcast Feed URL（RSS 源地址）

| 属性 | 说明 |
|---|---|
| **类型** | 只读展示 + 复制按钮 |
| **内容** | 当前播客的 RSS feed 地址（只读） |
| **交互** | 点击 **Copy** 把 URL 写入剪贴板，按钮短暂显示 **Copied!** 作为反馈 |
| **说明** | 当用户更改 subdomain 或设置自己的域名后，Feed URL 会立即同步更新 |

#### 3.4.2 Episode Number Limit（剧集数量限制）

| 属性 | 说明 |
|---|---|
| **类型** | 数字输入 |
| **必填** | 否。<span style="color:#a16207;font-weight:700;">留空行为待开发确认</span>：留空 Episode Number Limit 后保存不会报错，但保存完成后输入框会自动回填为 `20`。该回填逻辑（是否应回填、回填值取 `20` 还是默认值 `100`）<span style="color:#a16207;font-weight:700;">待开发确认</span>。 |
| **默认值** | 100 |
| **辅助说明** | "Limit the number of episodes included in your RSS feed." |
| **校验规则** | 非空值必须是整数，且落在 `1` 到当前套餐上限之间；空值不报错 |
| **错误提示** | "Please enter a whole number between 1 and {plan limit}" |

**套餐上限：**

| 套餐 | 上限值 |
|---|---|
| Unlimited Audio Plan | 999 |
| Unlimited Plus Plan | 1999 |
| Business Plan | 2999 |

<span style="color:#a16207;font-weight:700;">留空行为待开发确认</span>：留空 Episode Number Limit 后保存不会报错，但保存完成后输入框会自动回填为 `20`。该回填逻辑（是否应回填、回填值取 `20` 还是默认值 `100`）<span style="color:#a16207;font-weight:700;">待开发确认</span>。

#### 3.4.3 Ownership Verification Email（所有者验证邮箱）

| 属性 | 说明 |
|---|---|
| **类型** | Toggle 开关 + 条件显示文本输入框 |
| **默认状态** | 关闭；关闭时不显示输入框 |
| **说明文字** | "Temporarily add an email address to your RSS feed for 48 hours so podcast directories can verify your podcast."（放在 Toggle 行的说明位） |
| **必填** | 开启后必填；关闭时无需填写 |
| **校验** | 开启后为空（含仅空格）→ 报错；非空时校验 email 格式，不合法 → 报错 |
| **错误提示** | 为空："Please enter your verification email"；格式错误："Please enter a valid email address" |
| **自动过期** | 48 小时后，email 自动从 RSS feed 中移除，输入框内容清空 |
| **手动移除** | 用户关闭 Toggle 并保存，email 立即从 feed 中移除 |

#### 3.4.4 Alternative Website URL

| 属性 | 说明 |
|---|---|
| **类型** | Toggle 开关 + 条件显示 URL 输入 |
| **默认状态** | 关闭；关闭时不显示输入框，使用默认 Podbean 播客网站 URL |
| **占位提示** | "https://your-website.com" |
| **必填** | 开启后必填；关闭时无需填写（使用默认 Podbean 播客网站 URL） |
| **校验** | 开启后为空（含仅空格）→ 报错；非空时校验 URL 格式（要求主机名带点，允许省略协议），不合法 → 报错 |
| **错误提示** | 为空："Please enter your website URL"；格式错误："Please enter a valid URL" |
| **辅助说明** | "Set your custom podcast website URL in the RSS feed."（放在 Toggle 行的说明位） |

**说明**：该字段原名为 **Podcast Website**。用户不填写时，feed 中使用的是用户在 Podbean 的 website URL；开启 Toggle 后用户需填写一个 URL，保存后 feed 中使用这个保存的 URL。

#### 3.4.5 Generate audio-only feed（生成纯音频 feed）

| 属性 | 说明 |
|---|---|
| **类型** | Toggle 开关 + 条件展示的只读 feed 地址 + Copy |
| **默认状态** | 关闭；关闭时不展示地址 |
| **说明文字** | "Create an audio-only version of your video feed for Spotify, Amazon Music, and other apps that don't accept video. Your video feed stays as it is." |
| **展开内容** | 一行 "Your audio-only feed is:"，下面是系统生成的音频 feed 地址与 **Copy** 按钮；复制后给出与 4.1 一致的 **Copied!** 反馈 |
| **行为** | 该开关只控制这一段的展示，不影响 Feed 标签页其他字段 |

**功能说明**：Generate audio-only feed 会自动创建视频播客 feed 的纯音频版本。开启后，Podbean 会生成一个纯音频 feed，并在该设置下方展示其 URL。通过纯音频 feed 分发的单集，其播放量（plays）会计入对应的原始视频单集。

#### 3.4.6 Redirect to a New Feed（Feed 重定向）

| 属性 | 说明 |
|---|---|
| **类型** | Toggle 开关 + 条件显示 URL 输入 + 危险警告 |
| **说明文字** | "Only enter your new podcast feed URL when you're ready to move away from Podbean." |
| **默认状态** | 关闭 |
| **占位提示** | "https://" |

**开启后展示：**

```
┌──────────────────────────────────────────────┐
│  ⚠ Warning! Your Podbean feed will be         │
│  redirected to the new feed URL immediately.   │
│                                              │
│  [___________________________]  ← URL 输入框  │
└──────────────────────────────────────────────┘
```

**功能说明**：在该设置中填入新的 feed URL 后，你的 Podbean feed 会重定向到该新 feed URL。

**安全机制：**

| 状态 | 行为 |
|---|---|
| Toggle 开启 | 显示警告条 + URL 输入框 |
| 输入为空时保存 | 阻止保存并提示 **"Please enter your new feed URL"** |
| 重定向 URL 格式 | 必须是显式 `https://` 的合法 URL；不符合时提示 **"Please enter a valid HTTPS URL"** |

---

## 4. 页面二：Plugins（插件管理）

### 4.0 页面结构

```
┌──────────────────────────────────────────────┐
│  Plugins                  [Get more plugins] │
│                                              │
│  [logo] Episode Endnote              ✎  ✕    │
│         描述文字…                            │
│  ──────────────────────────────────────────── │
│  [logo] Episode Tags                       ✕  │
│         描述文字…                            │
└──────────────────────────────────────────────┘
```

页面没有 Save bar：插件操作即时生效（编辑走弹窗，删除走确认弹窗）。

**空状态（默认）**：页面默认为空，不展示任何插件行，居中显示 "Take your podcast to the next level by adding popular plugins and services."。

### 4.1 插件列表

Plugins 页面展示账号已安装的插件，每条插件包含 logo、名称、描述与操作按钮。

| 插件 | 描述 | 可编辑 | 可删除 |
|---|---|---|---|
| **Episode Endnote** | Add a customizable endnote that appears at the end of your episode descriptions, ideal for including social media links, promotional details. | 是 | 是 |
| **Episode Tags** | Episode Tags can be used to organize the episodes on your podcast site. You can add tags in Podbean when creating or editing an episode. | **否**（只有删除按钮） | 是 |
| **Import Files from Dropbox** | Import files directly from your Dropbox account to your Podbean Media Manager. | 是 | 是 |
| **FTP Upload** | Upload audio and video files to your Podbean account directly from any FTP client. | 是 | 是 |
| **SEO Meta Tags** | This plugin makes it very easy for you to manage SEO titles, keywords and descriptions for your podcast site. | 是 | 是 |
| **Google Analytics** | Google Analytics is the enterprise-class web analytics solution gives you rich insights into your podcast site traffic and marketing effectiveness. | 是 | 是 |
| **Mailchimp** | Automatically send emails to your Mailchimp subscribers when you publish new episodes. | <span style="color:#a16207;font-weight:700;">待开发确认</span> | 是 |

**说明**：上表仅列举部分插件示例，`apps.podbean.com` 中还有更多插件，具体插件数量与范围<span style="color:#a16207;font-weight:700;">待开发确认</span>。

- **空状态**：页面默认为空；删除全部插件后同样回到空状态，列表隐藏、显示居中的 "Take your podcast to the next level by adding popular plugins and services."。

### 4.2 插件操作

| 按钮 | 出现在 | 行为 |
|---|---|---|
| **Edit（铅笔）** | Episode Endnote / Import Files from Dropbox / FTP Upload / SEO Meta Tags / Google Analytics | 打开对应编辑弹窗（见 4.3） |
| **Delete（×）** | 全部七行 | 打开 **Delete Plugin** 确认弹窗 |
| **Get more plugins** | Plugins 页面 | 打开 `https://apps.podbean.com`（当前标签页） |

**删除确认弹窗：**

| 元素 | 内容 |
|---|---|
| 标题 | **Delete Plugin** |
| 正文 | `Are you sure you want to delete “{插件名}”? Its settings will be removed from your podcast. This action cannot be undone.` |
| 按钮 | 左 **Cancel**、右 **Delete** |
| 关闭方式 | Cancel、点击遮罩、Esc 都只关闭、不删除；打开时焦点落在 **Delete** |
| 确认后 | 移除该行 → toast **`{插件名} deleted`** → 若列表已空，显示空状态 |

### 4.3 插件编辑弹窗 <span style="color:#a16207;font-weight:700;">（每个插件的编辑功能可能不同，待开发确认）</span>

各插件共用同一套弹窗外壳（尺寸、标题栏、底部操作区），编辑内容各不相同。**Dropbox 与 FTP Upload 是例外**：Refresh 按钮位于表格内，弹窗没有底部操作区。

| 插件 | 弹窗标题 | 内容 | 底部操作 |
|---|---|---|---|
| **Episode Endnote** | Episode Endnote | 富文本编辑器（与 Brief Description 同一套工具栏：Undo/Redo、Bold/Italic/Underline、Link）；下方一条信息提示 **Saving will apply this endnote to all episodes.** | **Cancel** / **Save**；Save 关闭弹窗并 toast `Endnote saved to all episodes` |
| **Import Files from Dropbox** | Import Files from Dropbox | 说明面板：`Click on the button below to import files from your Dropbox to your Podbean Media Manager.` + **Select Files from Dropbox** 按钮 + `Max allowed file size is 3GB.`；下方表格 Filename / Size / Status，空态 `No importing dropbox files.`，表格内 **Refresh** | **无底部操作区** |
| **FTP Upload** | FTP Upload | 弹窗始终为同一布局：顶部 **FTP Account Information** 面板 + 下方 **FTP files** 区，仅面板内容随状态变化。面板**默认展开**，标题行右侧按钮可收起 / 展开（每次打开重置为展开）。未激活：面板显示说明文字（<span style="color:#a16207;font-weight:700;">文案待确认</span>）、**Inactive** 状态与 **Activate FTP** 按钮；点击后状态变为 **Processing**，显示 `Your FTP account is being processed and will be available in 10 minutes.`；账号就绪后状态变为 **Active**，显示 **FTP Server Name** / **Username** / **Password** / **Max size** 四项 label–value，以及一行 `Notice: Explicit TLS is required for FTP uploads. Please choose Explicit TLS when connecting.`。**FTP files** 区始终显示：标题 + 副标题 `Your FTP uploaded files will be listed below. Please select them and import to your Podbean account.`；**文件表每页 6 条**，超出时表格底部显示 `{起}–{止} of {总数}` 与上一页 / 下一页按钮（首页禁用「上一页」、末页禁用「下一页」）；表头与选择条的全选作用于全部文件（跨页）；文件夹为空时显示 `Your FTP Folder is empty`；勾选文件后表格上方出现选择条 **`{n} selected`** / **Import**，点击 Import 将选中文件导入账号（mockup 中导入后从列表移除；线上是否保留，以及 Status 列的内容，<span style="color:#a16207;font-weight:700;">待开发确认</span>）；表格列为复选框 / Filename / Size / Status。**Refresh 固定在弹窗底部**，不随内容滚动，账号未激活时禁用（置灰），激活后读取 FTP 目录中的文件 | 底部固定 **Refresh** 底栏；通过标题栏 **×**（或点击遮罩 / Esc）关闭 |
| **SEO Meta Tags** | **Custom Meta Tags** | **Meta Tags** 字段为多行文本框，文本框内以文本形式展示一段 `<meta name="keywords" …>` 示例 | 只有 **Save**（无 Cancel），保存后关闭并 toast `Meta tags saved` |
| **Google Analytics** | Google Analytics | **Google Analytics Tracking ID** 字段：label + 单行输入框，输入框下方一句解释 `You can find your tracking ID in your Google Analytics account.` | 只有 **Save**（无 Cancel），保存后关闭并 toast `Google Analytics tracking ID saved`；Tracking ID 的格式与校验规则<span style="color:#a16207;font-weight:700;">待开发确认</span> |

- 各编辑弹窗都能用 ×、点击遮罩、Esc 关闭。
- Meta Tags 的弹窗标题与行名不同（行叫 **SEO Meta Tags**，弹窗叫 **Custom Meta Tags**）。

### 4.4 Get More Plugins

**Get more plugins** 是外部链接，指向 `https://apps.podbean.com`，在当前标签页打开。

---

## 5. 页面三：Import（导入）

把一个已有的播客（或视频系列）连同剧集导入 Podbean。页面只负责选择来源，随后的三步在居中弹窗内逐屏完成；点 **Import** 后弹窗关闭，页面接管导入状态、重定向校验与完成态。

### 5.0 页面结构

```
【页面】
┌────────────────────────────────────────────────────┐
│  Import                                            │
│  Import an existing podcast or video series…       │
│                                                    │
│  [ RSS Feed URL → ]      [ Video to Podcast → ]    │
│                                                    │
│  （Import 之后：来源卡片隐藏，改为导入结果区）     │
└────────────────────────────────────────────────────┘

【弹窗】
┌────────────────────────────────────────────────────┐
│  1 / 3                                           × │
│                                                    │
│  Enter your feed URL                               │
│                                                    │
│  RSS Feed URL                                      │
│  ────────────────────────────────────────          │
│  Example: https://feeds.example.com/…              │
│                                                    │
│                        [ Back ]   [ Next ]         │
└────────────────────────────────────────────────────┘
```

| 属性 | 说明 |
|---|---|
| **承载方式** | **三步在弹窗内逐屏切换**，一次只显示一步 |
| **步骤标记** | 头部左侧 `1 / 3`，随步骤更新 |
| **步骤标题** | 随步骤与来源变化（见 5.2–5.4）；它只是标题，**不是可点击的步骤导航** |
| **返回** | 页脚左下 **Back**，步骤一不显示；× / 点击遮罩 / Esc 关闭整个向导并回到来源选择 |
| **前进** | 页脚右下 **Next**，步骤三变为 **Import**；**YouTube 路径在 Search 之前整个页脚隐藏**（见 5.2） |
| **关闭后的焦点** | 回到打开弹窗的那张来源卡片 |
| **导入开始后** | 弹窗关闭，页面进入导入结果区（见 5.5），来源卡片同时隐藏 |

### 5.1 入口：选择来源

来源是**两张并排的按钮卡片**，不是单选组：点哪一张，就以哪个来源直接打开向导的步骤一。

| 卡片 | 说明文字 |
|---|---|
| **RSS Feed URL** | You have a podcast hosted on another platform, or a collection of episodes in an RSS feed. |
| **Video to Podcast** | You have video content that you want to publish as a podcast. |

- 页面上**没有 Next**：选择来源 = 打开弹窗，向导里不再有「选择来源」这一步。
- 付费 / Unlimited Audio 账号：点击进入步骤一（见 5.2）。
- **免费账号**：点击不打开弹窗，先弹升级提示（见 5.7）。
- 关掉弹窗后来源卡片仍在原处，可以换一个来源重来；已填过的地址在本次会话内保留。

### 5.2 步骤一：填写地址

步骤标题：RSS → **Enter your feed URL**；Video → **Choose your video source**。

**来源为 RSS Feed URL**

| 元素 | 内容 |
|---|---|
| 字段标签 | RSS Feed URL |
| 占位符 | `https://feeds.example.com/myshow.xml` |
| 提示 | `Example: https://feeds.example.com/your-podcast/feed.xml` |
| 必填 | 是 |
| 错误提示 | **"Please enter your RSS feed URL"**（字段下方，聚焦输入框） |

**来源为 Video to Podcast**

视频内部还有两个来源，用一行 **Content Source** 下拉框切换，切换后下方字段整体替换。

| Content Source | 字段 | 说明 |
|---|---|---|
| **YouTube Playlist**（默认） | **YouTube channel handle** 输入框，占位符 `e.g. @podbean`，右侧 **Search** 按钮 | 提示：`Search for your YouTube channel and choose the playlist you want to convert.` |
| | **YouTube Playlist** 下拉框 —— **只有点过 Search 之后才出现** | 提示：We will retrieve **the latest 10 videos** and sync future content as you prefer. |
| **RSS Feed URL** | **RSS Feed** 输入框，占位符 `Enter your RSS feed URL` | 提示：We will retrieve **the latest 10 videos**, convert them into MP3 and sync future content as you prefer. |

- **Search 是必经步骤，检索前 Next 不出现**：handle 为空时点 Search → **"Please enter your YouTube channel handle"**；handle 有值 → 播放列表下拉与页脚同时出现，并 toast `Playlists loaded`。
- **检索之前整个页脚隐藏**（步骤一没有 Back）。
- Search 会把播放列表重置为第一个结果；handle、播放列表在步骤间往返与切换 Content Source 时保留。
- video + RSS Feed 路径：空值报 **"Please enter your video RSS feed URL"**。
- **行结构**：弹窗内带标签的行统一为标签在上、控件在下，控件占满内容列宽。
- **输入即清错**：字段一旦有内容，行内错误立刻消失。

### 5.3 步骤二：范围与输出类型

步骤二问什么，取决于来源：

| 来源 | 步骤标题 | 内容 |
|---|---|---|
| **RSS Feed URL** | **What should we bring over?** | 导入范围二选一 |
| **Video to Podcast → RSS Feed URL** | **What should we bring over?** | 同上（同一个组） |
| **Video to Podcast → YouTube Playlist** | **What kind of podcast should this become?** | 输出类型二选一 |

**导入范围（单选，默认第一项）**

| 选项 | 选项下方说明 |
|---|---|
| **Podcast details and episodes**（默认） | Bring over your podcast information along with its episodes. |
| **Episodes only** | Import episodes and keep your current podcast details. |

**输出类型（单选，默认第一项）**

| 选项 | 说明 |
|---|---|
| **Convert to Audio Podcasts**（默认） | 转成音频播客 |
| **Convert to Video Podcasts** | 转成视频播客 |

- **单列排列**，说明文字直接显示在选项标题下方，不放 ⓘ。
- **组内没有可见 legend**：步骤标题就是问题本身；单选组以同一句问句作为可访问名称。
- 「What should we bring over?」这一组由 **RSS 与 video + RSS 共用**，选择在两条路径间共享。
- **Unlimited Audio 限制**：YouTube 路径选 **Convert to Video Podcasts** 时，两个选项下方出现提示 **Converting to a video podcast needs Unlimited Plus.** + 链接 **See upgrade plans**，右下角 Next 保留原位但 **禁用**（见 5.8）。

### 5.4 步骤三：格式与可选设置

步骤三的内容随来源变化，三条路径共用同一个条款勾选框。

| 来源 | 步骤标题 | 内容 |
|---|---|---|
| **RSS Feed URL** | **What audio format should we use?** | 音频格式二选一 |
| **Video to Podcast → YouTube** | **Optional settings** | 两个独立勾选项 |
| **Video to Podcast → RSS** | **Optional settings** | 一个独立勾选项（Sync future content） |

**音频格式（仅 RSS 来源）**

| 选项 | 选项下方说明 |
|---|---|
| **Convert to .mp3**（默认） | Convert imported audio files to the MP3 format. |
| **Use original format** | Keep imported audio files in their existing format. |

**可选设置（仅 video 来源）**

| 选项 | 默认 | ⓘ 提示 |
|---|---|---|
| **Sync future content** | 不勾选 | Automatically import and publish newly added content from your connected content source. |
| **Import YouTube Thumbnail as podcast and episode logos** | 不勾选 | Note: The YouTube Thumbnail may not fit the square podcast and episode logo.（只保留方形适配提醒） |

- 缩略图这一项**只在 YouTube 路径出现**；video + RSS 路径只有 Sync future content。
- 两条提示都只在悬停 / 键盘聚焦时出现。

**条款与按钮（三条路径共用）**

| 项目 | 说明 |
|---|---|
| 条款文案 | 三选一：RSS → "…rights to **this podcast**…"；video + YouTube → "…rights to **this YouTube Content**…"；video + RSS → "…rights to **this content**…" |
| 必勾 | 是。未勾选就点 **Import**，条款行显示错误并滚动到可见区域，不开始导入 |
| 按钮 | 页脚左 **Back**、右 **Import** |

选择在步骤间往返时保留（格式、两个勾选项都不重置）。

### 5.5 导入状态（Import 之后）

点 **Import** 后：弹窗关闭、页面 toast `Import started`、来源卡片隐藏，页面下方出现导入结果区。

**RSS 路径：状态卡片 + 重定向三步**

状态卡片只承载状态与刷新：

| 状态 | 卡片里显示 |
|---|---|
| 复制中 | 一段话：`Importing your episode info. Depending on how many episodes your feed has, it can take a few minutes. You can leave this page while it works.` + 下方的 **Refresh status** 按钮 |
| 剧集信息已复制 | **整段换成一句** `Set redirect to complete the import.`，Refresh 退场，**Check redirect 解锁** |

- 页面在导入期间自动轮询导入状态；用户也可以点击 **Refresh status** 手动刷新。
- 卡片无标题、无关闭按钮。

卡片下方是 **Next, set up the redirect** 区块：

| # | 内容 |
|---|---|
| 1 | Wait for the import to finish. |
| 2 | Copy your new Podbean feed URL and set it as the redirect target in your old hosting platform.（下方为新 feed 地址与 **Copy** 按钮；复制后 toast `Feed URL copied`） |
| 3 | Come back and run the redirect check once your host has applied it. |

- 若步骤三选了 **Convert to .mp3**，三步之后多一句：`Your episodes are converted to .mp3 as soon as the redirect is live, so the podcast is ready to submit to Spotify.`；选 Use original format 时不显示。
- 区块底部是 **Check redirect** 按钮：导入未完成前 `disabled`，状态变为 `Set redirect to complete the import.` 后可点。

**Video 路径：没有状态卡片、没有重定向区块**

Import 之后直接进入「正在导入」：

| 元素 | 内容 |
|---|---|
| **状态条**（最上方） | `Importing your media files — we'll email you once they're done.` |
| **已连接的内容源** | `Connected Content Source: <链接>`——YouTube 路径显示所选**播放列表名**，video + RSS 显示填的 **feed 地址** |
| **设置开关** | `Sync future content`（YouTube 与 RSS 都有）与 `Import YouTube Thumbnail as podcast and episode logos`（仅 YouTube）；默认状态与步骤三一致，开关与勾选项双向同步 |

- 开关和步骤三的勾选项是**同一个设置**：渲染时对齐，切换开关即写回步骤三的选项。
- 视频导入完成后通过邮件通知用户；页面内不再提供额外出口。

### 5.6 301 Redirect 校验与完成态

**重定向是触发真实音频文件导入的标志**——不设置重定向，音频文件不会被导入。

**Check redirect 的两种结果：**

| 结果 | 界面表现 |
|---|---|
| **未检测到重定向** | 弹出居中报错弹框：标题 **Redirect not detected**；正文 `We couldn't find your old feed pointing at this Podbean feed. Check the redirect is live on your old hosting platform, then try again — a new redirect can take a few minutes to propagate.`；单个 **OK** 关闭（遮罩 / Esc 亦可）；打开时焦点在 OK |
| **检测成功** | toast `Redirect is working`；重定向区块整体替换为完成态；同时隐藏状态卡片 |

**校验成功后的完成态：**

| 元素 | 内容 |
|---|---|
| **状态条**（最上方） | `Importing your media files — we'll email you once they're done.` |
| **建议说明** | We recommend keeping your old feed/site in place for a few weeks to ensure all content/subscribers have moved across. |

- 这一状态**没有出口**：没有 Next，也没有重新导入入口；状态卡片隐藏。

**文件全部导完（Import complete 状态）：**

| 元素 | 内容 |
|---|---|
| 状态条 | `Import complete — 16 successful, 0 failed.` |
| 建议说明 | 与上一状态同一句 |
| **What you can do next** | 两条建议 + 一条可折叠项：<br>1. You can review the **podcast information** and adjust the show settings.<br>2. You can review the **episode list** and edit any episodes.<br>3. **Optionally, import downloads.**（默认收起；展开后含 CSV 导入说明、`Import CSV File` 按钮与两段合规声明；规则见 5.9） |
| 重新导入 | Click **here** if you want to re-import content. —— 点击回到 Import 页面 |

### 5.7 免费账号（Free plan）：不能开始导入

免费账号在**来源卡片处即被拦截**：点击任一来源卡片不打开向导，先弹出升级提示。

| 点击的卡片 | 结果（免费账号） |
|---|---|
| `RSS Feed URL` | 弹升级弹框，正文点名 **Unlimited Audio** |
| `Video to Podcast` | 弹升级弹框，正文点名 **Unlimited Audio** 与 **Unlimited Plus** |
| 任意卡片（paid / audio 账号） | 直接进入弹窗步骤一 |

- **弹框内容**：标题 **Upgrade to import to Podbean**；正文按来源切换（RSS：`RSS imports are available on the Unlimited Audio plan, which brings your episodes and show details into Podbean.`；video：`Video imports are available on Unlimited Audio, or Unlimited Plus for publishing as a video podcast.`）；正文下方一枚 **Enjoy a 14-day free trial** 标签；按钮左 **Not now**、右 **See upgrade plans**，弹框宽度保证按钮不换行。
- **动作**：`Not now`、遮罩、Esc 都只关闭；`See upgrade plans` 关闭后 toast `Opening upgrade plans…`（本页不承载计费流程）。关闭后焦点回到触发的那张来源卡片。

### 5.8 Unlimited Audio 账号（audio plan）：视频播客需要 Plus

**能力边界**：Unlimited Audio 可以导入 RSS 与视频，但只能发布为**音频**播客。

| 路径 | audio 账号行为 |
|---|---|
| `RSS Feed URL` | 正常进入弹窗，全流程可用 |
| `Video to Podcast` → YouTube → `Convert to Audio Podcasts` | 正常继续到步骤三 |
| `Video to Podcast` → YouTube → `Convert to Video Podcasts` | 步骤二出现升级提示，右下角 **Next 禁用** |
| `Video to Podcast` → RSS Feed URL | 不受影响（视频 RSS 一律转 MP3，输出本来就是音频） |

- **步骤二的提示**：紧跟在两张输出卡片下面，文案 `Converting to a video podcast needs Unlimited Plus.` + 文字链接 `See upgrade plans`。
- **禁用而不是隐藏**：**Next** 保留原位并置为 `disabled`，不隐藏。
- **状态联动**：该限制由「套餐为 Unlimited Audio + 步骤二 + 视频来源 + 已选 Convert to Video Podcasts」共同决定；退回步骤一、换来源或改选音频都会立即解除。
- **链接打开同一个升级弹框**，正文换成：`Converting to a video podcast needs Unlimited Plus. Unlimited Audio publishes imported videos as audio.`；关闭后焦点回到这条链接。

### 5.9 导入下载数据（Import data）

入口：Import complete 状态 → **What you can do next** → **Optionally, import downloads.**（见 5.6）。展开后导入每集的下载总量。

**Please note：**

- The function is only used when users switch their podcasts to Podbean.
- The detailed stats such as download source, geo, and dates etc. CANNOT be imported and the imported stats are not IAB verified.
- Importing the download number for the same episode repeatedly will not increase its total number of downloads. Duplicate imports will be ignored and failed.
- Stats can only be imported within a 30-day period from feed import.

<span style="color:#a16207;font-weight:700;">待开发确认</span>：30 天窗口的起算时刻（feed 导入开始还是完成）；重复导入失败时对用户的提示方式。

---

## 6. 全局交互规则

### 6.1 Save Bar（底部保存栏）

General 页面包含一个 Save bar，四个 Tab 共用。Plugins 与 Import 页面不包含 Save bar。

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
| **定位** | 固定在内容区底部；左侧让开侧边栏宽度 |
| **默认状态** | 隐藏 |
| **显示条件** | 当前页面的表单任意字段发生更改时变为可见 |
| **子项** | Cancel 按钮、Save 按钮（右对齐） |

**按钮行为：**

| 按钮 | 动作 |
|---|---|
| Cancel | 隐藏当前页面的 Save bar，当前页面所有字段恢复到上次保存时的值 |
| Save | 校验当前页面的必填、格式与长度规则（见 7.1 / 7.2）；有错误则定位到错误字段；全部通过则提交成功，Toast 提示 **"Saved successfully"**，Save bar 隐藏 |

**各页面范围：**

- **General**：校验四个 Tab 的必填与长度规则（见 7.2）；有错时切到第一个出错 Tab，字段与 Tab 标签标红
- **General · Feed 标签页**：校验三个开关开启后的必填项与格式，以及 Episode Number Limit 的整数与上限（见 7.2）
- **Plugins / Import**：无 Save bar，插件操作即时生效，导入状态由结果区承担

### 6.2 修改检测

以下操作均会触发 Save bar 显示：

| 控件类型 | 监听事件 |
|---|---|
| 文本输入框 | input / change |
| 富文本编辑器 | input |
| 自定义下拉选择器 | change（选中新选项时） |
| 单选按钮 | change |
| Toggle 开关 | change |

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
| **打开 / 关闭** | 点击触发器展开；点击页面其他位置关闭；同一时间只展开一个下拉 |
| **选中反馈** | 被选项高亮，触发器文字更新为选中项 |
| **保存联动** | 选中后触发当前页面的 Save bar 显示 |
| **键盘操作** | 触发器与选项均可通过键盘聚焦与选择，Esc 关闭当前下拉 |

### 6.4 页面切换

| 操作 | 行为 |
|---|---|
| 侧边栏点击子菜单 | 切换主内容区页面，并重置到该页面的第一个 Tab |
| 未保存修改时切换 | 弹出 **Unsaved Changes** 确认弹框（见 2.2.1） |

---

## 7. 数据校验规则

### 7.1 必填字段

| 页面 | 字段 | 校验规则 | 错误提示 |
|---|---|---|---|
| General · Basic | Podcast Title | 去空格后不能为空 | Please enter a podcast title |
| General · Basic | Brief Description | 去空格后不能为空，也不能是默认值 "New podcast weblog" | Please enter a brief description |
| General · Basic | Podcast Category | 第 1 行必须选择分类，不能为空或占位文字 "Select a category"；其余行可选 | Please select a podcast category |
| General · Region | Country of Origin | 仅当选择 **Specific countries** 时：至少选一个国家 | Please select at least one country |
| General · Feed | Ownership Verification Email | 仅开关开启时：不能为空（仅空格也算空） | Please enter your verification email |
| General · Feed | Alternative Website URL | 仅开关开启时：不能为空 | Please enter your website URL |
| General · Feed | Redirect to a New Feed | 仅开关开启时：不能为空 | Please enter your new feed URL |

Podcast Logo 默认已带封面，只能更换、不能删除，不存在为空的状态，因此不参与必填校验。

### 7.2 格式与长度校验

| 字段 | 校验要求 | 错误提示 |
|---|---|---|
| Podcast Title | 最多 200 字符 | Please enter no more than 200 characters |
| Brief Description | 最多 50,000 字符 | Please enter no more than 50,000 characters |
| Author | 最多 225 字符 | Please enter no more than 225 characters |
| Copyright | 最多 200 字符 | Please enter no more than 200 characters |
| Ownership Verification Email | 合法 email 格式 | Please enter a valid email address |
| Alternative Website URL | 合法域名/URL 格式；允许省略协议 | Please enter a valid URL |
| Redirect URL | 合法 URL，必须显式 `https://` | Please enter a valid HTTPS URL |
| Episode Number Limit | 整数，且在套餐上限内（999 / 1999 / 2999） | Please enter a whole number between 1 and {plan limit} |
| Podcast Logo 上传 | 仅接受 JPG / PNG 文件 | Please upload a JPG or PNG image |

> 「错误提示」统一为 `Please enter …` / `Please upload …` 句式，句末不加句号，长度类只替换数字；`{plan limit}` 随套餐替换为 999 / 1999 / 2999。校验失败时字段标红并聚焦第一个错误字段，General 还会把出错 Tab 标红。

### 7.3 保存前校验流程

General 的四个 Tab 在同一次保存中一起校验。

**General（四个 Tab 一起校验）：**

```
用户点击 Save（General 页面）
       │
       ▼
┌──────────────────────────────┐
│ 遍历所有 Tab 的必填字段       │
│ 执行 7.1 / 7.2 中的规则       │
└─────────────┬────────────────┘
              │
         ┌────┴────┐
         │ 通过？   │
         └────┬────┘
              │
    ┌─────────┴──────────┐          ┌─────────────────────────────────────────────────┐
    │ 是 → 提交所有 Tab     │          │ 否 → 自动切换到第一个有错的 Tab                │
    │ Toast:              │          │ 定位到第一个错误字段并聚焦                     │
    │ "Saved successfully"│          │ 用户修完后再次点击 Save                        │
    │ Save bar 隐藏        │          └─────────────────────────────────────────────────┘
    └──────────────────────┘
```

- **错误标识**：Tab 内错误字段变红、下方显示行内提示并聚焦。
- **修完后**：下一次 Save 前重新判定；点击 Cancel 一并清除。

**Feed 标签页无独立校验：** 其字段（三个开关的条件必填、Episode Number Limit 的整数与上限）随同一次 Save 一起校验；失败时切换到 Feed 标签页并显示行内提示。

---

## 附录：新老页面对比

### General 页面变化说明

老版是单个 **Podcast Settings** 页，字段纵向排列；新版按功能拆成 4 个 Tab（Basic / Region / Content / Feed）。

改动只有三类：字段换位置（位置调整）、字段改名（Author / Owner → Author）、四个 Business 字段（Episode Download Link、Share on Podcast Site、Comments、Removing Podbean Brand）从 General 移除。其余字段功能不变。

| 字段 | 变化 | 老版位置 | 新版位置 |
|---|---|---|---|
| **Podcast Title** | 位置调整 | Podcast Settings 单页 | Basic Tab |
| **Brief Description** | 位置调整 | Podcast Settings 单页 | Basic Tab |
| **Podcast Category** | 位置调整 | Podcast Settings 单页 | Basic Tab |
| **Podcast Logo** | 位置调整 | Podcast Settings 单页 | Basic Tab |
| **Author / Owner** | 改名 + 位置调整 | Podcast Settings 单页，字段名为 **Author / Owner** | Basic Tab，Podcast Logo 下方；字段名改为 **Author** |
| **Language** | 位置调整 | Podcast Settings 单页 | Region Tab |
| **Country of Origin** | 位置调整 | Podcast Settings 单页 | Region Tab |
| **Timezone** | 位置调整 | Podcast Settings 单页，只显示 `Current time: …` | Region Tab |
| **Podcast Type** | 位置调整 | Podcast Settings 单页 | Content Tab |
| **Copyright** | 位置调整 | Podcast Settings 单页 | Content Tab |
| **Content Explicit** | 位置调整 | **Feed 页面**，不在 Podcast Settings 页 | Content Tab |
| **Episode Download Link** | 移除 | 非 Business：页面显示 Show，不可改；Business：页面显示 Show，Advanced Options 中可改 | 无 |
| **Share on Podcast Site** | 移除 | 非 Business：页面显示 Show，不可改；Business：页面显示 Hidden，Advanced Options 中可改 | 无 |
| **Comments** | 移除 | 非 Business：页面显示 Enable，不可改；Business：页面显示 Enable，Advanced Options 中可改 | 无 |
| **Removing Podbean Brand** | 移除 | 非 Business：页面显示 No，带升级按钮；Business：页面显示 No，Advanced Options 中可改 | 无 |

### Feed 标签页变化说明

> **注：** Business Plan 用户的 Private Channel 默认不显示 Feed 标签页。

| 字段 | 新版页面 | 非 Business Plan 老页面 | Business Plan 老页面 |
|---|---|---|---|
| **Podcast Feed URL** | 有（只读 + 复制） | 有 | 有 |
| **Content Explicit** | **移入 General → Content 标签页** | 有 | 有 |
| **Apple Podcasts Summary** | **已移除**（历史内容用户仍可见，字段只读并标注已停用；提供 "Use Podcast Description"，确认后独立 Summary 删除，`<itunes:summary>` 跟随 Podcast Description） | 有 | 有 |
| **Podcast Website** | 改名为 **Alternative Website URL**（原默认填入 Podbean website URL；现改为 **Toggle + 条件输入**：关闭则使用 Podbean website URL，开启后显示输入框，填写的值生效） | 有 | 有 |
| **Episode Link** | **已移除**（转移到 Episode 发布页面，名称为 "Alternative Episode Link"） | 有 | 有 |
| **Episode Number Limit** | 有 | 有 | 有 |
| **Generate audio-only feed** | **新增**（Toggle + 条件展示只读 feed 地址与 Copy） | 无 | 无 |
| **Episode Artwork Tag** | **已移除**（统一用 `<itunes:image>` 输出单集封面，用户无需再选 RSS 标签类型） | 有 | 有 |
| **Ownership Verification Email** | 有（**Toggle + 条件输入**） | 有 | 有 |
| **Apple Podcasts Verification** | **移出**（转移到 Apple Podcasts 提交页面） | 有 | 有 |
| **Remove from Apple Directory** | **已移除**（从普通设置中移除；为已开启的用户提供"关闭并移除标签"的过渡机制，已启用 `<itunes:block>` 的用户保留一个临时关闭入口） | 有 | 有 |
| **Set Podcast New Feed URL** | **已移除**（改为迁移流程自动写入 `<itunes:new-feed-url>`，可长期保留。⚠ 更改 subdomain 是否也自动写入，<span style="color:#a16207;font-weight:700;">需技术确认</span>） | 有 | 有 |
| **Redirect to a New Feed** | 有（Toggle + 条件 URL 输入 + 危险警告） | 有 | 有 |

**新版 Feed 标签页字段总数从 13 个精简为 6 个**（5 个原有字段 + 新增的 Generate audio-only feed）。标注**黄色加粗**的「待确认」条目需产品团队进一步确认。
