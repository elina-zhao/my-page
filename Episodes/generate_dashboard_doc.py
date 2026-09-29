#!/usr/bin/env python3
"""Generate Podcast Dashboard functional specification document."""

from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml
import datetime

doc = Document()

# ── Page setup ──
section = doc.sections[0]
section.page_width = Cm(21)
section.page_height = Cm(29.7)
section.top_margin = Cm(2.54)
section.bottom_margin = Cm(2.54)
section.left_margin = Cm(2.54)
section.right_margin = Cm(2.54)

# ── Styles ──
style = doc.styles['Normal']
font = style.font
font.name = 'Microsoft YaHei'
font.size = Pt(11)
style.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')

GREEN = RGBColor(0x1a, 0x9a, 0x6c)
DARK = RGBColor(0x1e, 0x29, 0x3b)
GRAY = RGBColor(0x64, 0x74, 0x8b)
LIGHT_GRAY = RGBColor(0x94, 0xa3, 0xb8)

def add_heading_custom(text, level=1):
    """Add a heading with custom styling."""
    h = doc.add_heading(text, level=level)
    for run in h.runs:
        if level == 1:
            run.font.color.rgb = GREEN
        else:
            run.font.color.rgb = DARK
        run.font.name = 'Microsoft YaHei'
        run.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')
    return h

def add_para(text, bold=False, italic=False, size=11, color=None, alignment=None, spacing_after=6, indent_level=None):
    """Add a paragraph with optional formatting."""
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = bold
    run.italic = italic
    run.font.size = Pt(size)
    run.font.name = 'Microsoft YaHei'
    run.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')
    if color:
        run.font.color.rgb = color
    if alignment:
        p.alignment = alignment
    p.paragraph_format.space_after = Pt(spacing_after)
    return p

def add_bullet(text, level=0):
    """Add a bullet point."""
    p = doc.add_paragraph(text, style='List Bullet')
    for run in p.runs:
        run.font.size = Pt(11)
        run.font.name = 'Microsoft YaHei'
        run.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')
    p.paragraph_format.space_after = Pt(3)
    return p

def add_table(headers, rows, col_widths=None):
    """Add a formatted table."""
    table = doc.add_table(rows=1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = 'Table Grid'

    # Header row
    hdr_cells = table.rows[0].cells
    for i, header in enumerate(headers):
        hdr_cells[i].text = header
        for paragraph in hdr_cells[i].paragraphs:
            paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
            for run in paragraph.runs:
                run.bold = True
                run.font.size = Pt(10)
                run.font.name = 'Microsoft YaHei'
                run.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')
        shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="f0fdf6"/>')
        hdr_cells[i]._tc.get_or_add_tcPr().append(shading)

    # Data rows
    for row_data in rows:
        row_cells = table.add_row().cells
        for i, cell_text in enumerate(row_data):
            row_cells[i].text = str(cell_text)
            for paragraph in row_cells[i].paragraphs:
                for run in paragraph.runs:
                    run.font.size = Pt(10)
                    run.font.name = 'Microsoft YaHei'
                    run.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')

    doc.add_paragraph()  # spacer
    return table


# ══════════════════════════════════════════════════
# Cover Page
# ══════════════════════════════════════════════════

doc.add_paragraph()
doc.add_paragraph()
doc.add_paragraph()
doc.add_paragraph()

add_para("Podcast Dashboard", size=28, bold=True, color=GREEN,
         alignment=WD_ALIGN_PARAGRAPH.CENTER, spacing_after=4)
add_para("功能说明文档", size=22, bold=True, color=DARK,
         alignment=WD_ALIGN_PARAGRAPH.CENTER, spacing_after=20)
add_para("版本：v1.0", size=12, color=GRAY,
         alignment=WD_ALIGN_PARAGRAPH.CENTER, spacing_after=2)
add_para("日期：2026-07-16", size=12, color=GRAY,
         alignment=WD_ALIGN_PARAGRAPH.CENTER, spacing_after=2)
add_para("项目：Podcasting Smarter", size=12, color=GRAY,
         alignment=WD_ALIGN_PARAGRAPH.CENTER, spacing_after=30)

doc.add_page_break()

# ══════════════════════════════════════════════════
# Table of Contents
# ══════════════════════════════════════════════════

add_para("目  录", size=16, bold=True, color=DARK,
         alignment=WD_ALIGN_PARAGRAPH.CENTER, spacing_after=12)

toc_items = [
    "1. 概述",
    "2. 系统架构与布局",
    "3. 视图一：Dashboard v1 —— 新手引导（Onboarding）",
    "4. 视图二：Dashboard v2 —— 数据分析面板",
    "5. 视图三：Dashboard v2-NC —— 无评论版",
    "6. 数据可视化",
    "7. 用户界面交互",
    "8. 技术栈",
    "9. 数据与存储",
    "10. 未来规划",
]
for item in toc_items:
    add_para(item, size=11, color=DARK, spacing_after=4)

doc.add_page_break()

# ══════════════════════════════════════════════════
# 1. 概述
# ══════════════════════════════════════════════════

add_heading_custom("1. 概述", level=1)

add_para(
    "Dashboard（仪表板）是 Podcasting Smarter 平台的核心入口页面，为用户提供播客运营的一站式"
    "数据监控和任务管理体验。Dashboard 分为三个视图模式，分别面向不同阶段的用户需求："
)

add_bullet("Dashboard v1 (Onboarding)：面向新用户的入门引导面板，提供 5 步播客设置清单。")
add_bullet("Dashboard v2 (Analytics)：完整的数据分析面板，包含统计数据、趋势图表、剧集表现、成就徽章、近期评论和播客资源推荐。")
add_bullet("Dashboard v2-NC (No Comments)：与 v2 内容一致，但未包含评论区模块，适用于不需评论功能的场景。")

add_para("用户可通过左侧侧边栏在三个视图之间自由切换。", spacing_after=12)

# ══════════════════════════════════════════════════
# 2. 系统架构与布局
# ══════════════════════════════════════════════════

add_heading_custom("2. 系统架构与布局", level=1)

add_heading_custom("2.1 整体布局", level=2)
add_para("Dashboard 采用三栏式布局结构：")

add_bullet(
    "顶部导航栏 (Topbar)：包含应用Logo（\"Podcasting Smarter\"）、\"+ New Episode\"快速创建按钮、"
    "通知铃铛图标和用户头像（EZ）。高度 64px，背景白色，底部有 1px 分割线。"
)
add_bullet(
    "左侧侧边栏 (Sidebar)：宽度 230px，包含三个 Dashboard 视图切换入口（\"Onboarding\"、\"Dashboard\"、"
    "\"Dashboard v2\"），以及指向 Episodes、Distribution、Statistics、Settings 等模块的导航链接。"
    "侧边栏支持响应式折叠，在移动端隐藏，通过汉堡菜单按钮打开。"
)
add_bullet(
    "内容主区域 (Main)：最大宽度 1320px，居中显示。内容区域根据当前选中的页面视图动态显示对应的内容模块。"
)

add_heading_custom("2.2 视图切换机制", level=2)
add_para(
    "通过 JavaScript 函数 switchDashboard(page) 实现页面切换。点击侧边栏导航链接时触发该函数，执行以下操作："
)

add_bullet("隐藏所有 page-content 元素")
add_bullet("显示与传入 page 参数对应的目标页面")
add_bullet("更新侧边栏导航项的 active 状态")
add_bullet("关闭移动端侧边栏（如果打开）")
add_bullet("如果切换到 Onboarding 视图，自动更新引导进度")

# ══════════════════════════════════════════════════
# 3. Dashboard v1 (Onboarding)
# ══════════════════════════════════════════════════

add_heading_custom("3. 视图一：Dashboard v1 —— 新手引导（Onboarding）", level=1)

add_para(
    "Dashboard v1 是一个针对新播客创作者的引导面板，旨在通过清单式任务管理帮助用户快速完成播客的设置与发布。核心组件包括："
)

add_heading_custom("3.1 页面头部", level=2)
add_bullet("主标题：「Get your podcast ready」（准备你的播客）")
add_bullet("副标题提示：\"Complete the key steps to publish, distribute, and grow your show.\"（完成关键步骤来发布、分发和推广你的节目）")

add_heading_custom("3.2 进度条", level=2)
add_bullet("显示当前已完成步骤数量（格式：\"X of 5 completed\"）")
add_bullet("进度填充条（绿色）根据完成比例自动伸缩")
add_bullet("进度数据存储在浏览器的 localStorage 中，以 \"podbean_onboard_steps\" 键名持久化")

add_heading_custom("3.3 5 步引导清单", level=2)
add_para("引导清单由 5 项可勾选的任务组成，每项任务包含标题、描述和操作按钮：")

add_table(
    ["步骤", "标题", "描述", "操作按钮", "跳转目标"],
    [
        ["Step 1", "Create your podcast", "设置播客档案和基本信息", "Get Started", "Dashboard v2"],
        ["Step 2", "Publish your first episode", "上传并发布第一集节目", "Create Episode", "创建剧集"],
        ["Step 3", "Submit to podcast platforms", "提交到 Spotify、Apple Podcasts 等", "Start Distribution", "开始分发"],
        ["Step 4", "Customize your podcast page", "设计播客页面，展示品牌形象", "Customize", "自定义页面"],
        ["Step 5", "Share your podcast", "推广节目并增长听众", "Share Now", "立即分享"],
    ]
)

add_para("此外，底部提供 \"Skip the Guide\" 链接，点击后可一键标记所有步骤为已完成状态，跳过引导流程。")

add_para(
    "交互逻辑：用户点击圆形复选框图标即可切换步骤的完成状态。完成的任务项显示删除线标题、"
    "灰色文字和灰色按钮。状态变化通过 localStorage 持久化，页面刷新后仍然保留。"
)

# ══════════════════════════════════════════════════
# 4. Dashboard v2 (Analytics)
# ══════════════════════════════════════════════════

add_heading_custom("4. 视图二：Dashboard v2 —— 数据分析面板", level=1)
add_para("Dashboard v2 是核心的分析面板，以数据驱动的方式展示播客运营状况。")

add_heading_custom("4.1 统计卡片（Stat Cards）", level=2)
add_para("页面顶部以 4 列网格布局展示四张统计卡片，每张卡片包含一个数据指标及其对应的迷你趋势图（Sparkline）：")

add_table(
    ["卡片名称", "统计数据", "Sparkline 颜色"],
    [
        ["Yesterday", "342", "绿色 (#10b981)"],
        ["7 Days", "2,847", "蓝色 (#3b82f6)"],
        ["30 Days", "12,560", "黄色 (#eab308)"],
        ["All Time", "48,293", "粉色 (#ec4899)"],
    ]
)

add_para("Sparkline 使用 Chart.js 绘制，为纯线条图（无坐标轴、无图例），宽度 96px、高度 46px，数据为模拟统计值。")

add_heading_custom("4.2 下载趋势图（Downloads Trending）", level=2)
add_para("核心数据可视化模块，用于展示过去 30 天的下载量变化趋势（当前页面仅显示 14 天数据），包含以下元素：")

add_bullet("总标题：\"Downloads Trending\"")
add_bullet("数据摘要：显示 \"Last 14 days\" 的总下载量（目前为 5,846）")
add_bullet("趋势徽章：绿色上涨标签 \"+6.2% vs previous 14 days\"")
add_bullet("折线图：使用 Chart.js 绘制双线对比图")
add_bullet("View more 链接：用于跳转到更详细的统计数据页面")

add_para(
    "图表特性：X 轴显示日期（MM/DD 格式），Y 轴显示下载量，带有网格线。主数据线（2026 年）为绿色"
    "实线填充，参考线（2025 年）为灰色虚线，图例默认隐藏。悬停时显示 Tooltip 工具提示。"
)

add_heading_custom("4.3 剧集表现列表（Episode Performance）", level=2)
add_para("以表格形式列出各剧集的下载表现数据，包含三列：")

add_bullet("Episode Title（剧集标题）：鼠标悬停时标题变为绿色，点击可查看详情")
add_bullet("First Week（首周下载量）：居中显示")
add_bullet("First Month（首月下载量）：居中显示")

add_para("预置数据包含 6 集节目，涵盖中英文多语言内容。鼠标悬停行高亮显示，行与行之间由 1px 浅色分割线间隔。")

add_table(
    ["剧集标题", "首周下载量", "首月下载量"],
    [
        ["英文里的奇妙日常：旅馆为何被拼布大会订满？", "—", "—"],
        ["How to Start a Podcast in 9 Steps (2026)", "245", "892"],
        ["Hometown Heroes Expanded: Up to $35K for Buyers", "186", "673"],
        ["How to Record and Convert Zoom Calls into Episodes", "412", "1,540"],
        ["Born on the Seven-Mile Miracle: John John Florence", "367", "1,250"],
        ["This is video episode 2", "523", "2,100"],
    ]
)

add_heading_custom("4.4 成就徽章（Achievements）", level=2)
add_para("成就系统用于激励用户达成播客运营里程碑。布局分为两部分：")

add_para("最新获得徽章：左侧展示徽章图片（podcastbadge.png），右侧提供 \"Share\" 分享按钮。")
add_para("徽章陈列：四枚徽章以行排列，包含：")

add_bullet("1K Downloads（已获得）：绿色星形图标，2026 年 2 月")
add_bullet("100 Downloads（已获得）：蓝色闪电图标，2026 年 1 月")
add_bullet("First Episode（已获得）：黄色奖杯图标，2025 年 12 月")
add_bullet("10K Downloads（锁定中）：灰色锁定状态，半透明显示")

add_para("每个已获得的徽章显示名称、获得日期和对应的 SVG 图标。")

add_heading_custom("4.5 近期评论（Recent Comments）", level=2)
add_para("展示听众的最新评论动态，每条评论包含：")

add_bullet("用户头像：彩色圆形首字母标识（如 JM、RK、AL）")
add_bullet("作者名称：如 Jessica M.、Robert K.、Amanda L.")
add_bullet("评论文本：最多两行截断，超出部分用省略号显示")
add_bullet('关联剧集标题及时间戳：如 "on ... · 2h ago"')
add_bullet('底部提供 "View more" 链接，可查看全部评论')

add_heading_custom("4.6 播客资源推荐（Podcast Resources）", level=2)
add_para("一个两列的资源卡片网格，为用户提供实用的播客学习内容，共 6 篇资源：")

add_table(
    ["分类标签", "标题", "描述摘要"],
    [
        ["Guide", "How to Start a Podcast in 2026", "从想法到发布的完整指南"],
        ["Strategy", "Podcast SEO", "优化标题、描述和标签以提升排名"],
        ["Growth", "10 Ways to Grow Your Audience", "节目推广的有效策略"],
        ["Equipment", "Best Podcasting Equipment", "从入门到专业的设备推荐"],
        ["Monetization", "Podcast Monetization 101", "广告、赞助和会员变现方式"],
        ["Community", "Building a Loyal Community", "Discord、直播和新闻通讯互动技巧"],
    ]
)

add_para("每张卡片左侧有分类颜色图标，右侧显示标签、标题和简介。鼠标悬停时边框变色并显示阴影效果。")

# ══════════════════════════════════════════════════
# 5. Dashboard v2-NC
# ══════════════════════════════════════════════════

add_heading_custom("5. 视图三：Dashboard v2-NC —— 无评论版", level=1)

add_para("Dashboard v2-NC（No Comments）是 v2 Analytics 面板的简化变体，内容和布局与 v2 基本一致，主要区别为：")

add_bullet("页面标题显示为 \"Dashboard v2\" 并带有 \"No Comments View\" 标签徽章")
add_bullet("移除了 \"Recent Comments\"（近期评论）模块")
add_bullet("\"Achievements\"（成就徽章）模块由双列布局改为单独的全宽度卡片展示")
add_bullet("其余部分（统计卡片、下载趋势图、剧集表现、播客资源）与 v2 完全一致")

add_para("该版本的图表和数据使用独立的 Canvas ID（如 downloadChart2、sparkYesterday2 等），确保与 v2 版本互不干扰。")

# ══════════════════════════════════════════════════
# 6. 数据可视化
# ══════════════════════════════════════════════════

add_heading_custom("6. 数据可视化", level=1)

add_heading_custom("6.1 Sparkline 迷你趋势图", level=2)
add_bullet("用于在统计卡片中展示短期数据波动趋势")
add_bullet("使用 Chart.js 的 line 类型图表，无坐标轴、无图例、无 Tooltip")
add_bullet("线条粗细为 2px，张力 0.3 使曲线平滑")
add_bullet("不显示数据点（pointRadius: 0）")

add_heading_custom("6.2 下载趋势折线图", level=2)
add_bullet("展示过去 30 天的下载数据，双线对比（当前年份 vs 上一年份）")
add_bullet("2026 年数据线为绿色 (#1a9a6c)，带浅绿色区域填充")
add_bullet("2025 年参考线为灰色虚线 (#cbd5e1)，无填充")
add_bullet("数据点半径为 3px（2026）和 2px（2025），深色边框")
add_bullet("X 轴最多显示 8 个日期标签，Y 轴从零开始")
add_bullet("交互模式为 index（最近的数据点优先），Tooltip 使用深色背景")
add_bullet("图表容器高度 260px，响应式自适应宽度")

# ══════════════════════════════════════════════════
# 7. 用户界面交互
# ══════════════════════════════════════════════════

add_heading_custom("7. 用户界面交互", level=1)

add_heading_custom("7.1 响应式设计", level=2)
add_bullet("1200px 以下：Dash 布局由水平排列改为垂直堆叠")
add_bullet("1024px 以下：统计卡片从 4 列变为 2 列；内边距缩小")
add_bullet("768px 以下：侧边栏固定定位并默认隐藏，通过汉堡菜单按钮滑出；资源网格从 2 列变为 1 列；顶部栏高度从 64px 减至 56px")
add_bullet("480px 以下：统计卡片变为 1 列")

add_heading_custom("7.2 交互细节", level=2)
add_bullet("统计卡片 (stat-card)：悬停时显示浅阴影效果（box-shadow）")
add_bullet("侧边栏导航：悬停时背景变为浅灰（#f8fafc），选中项背景为 #f1f5f9 且文字加粗")
add_bullet("Onboarding 复选框：悬停时边框变为绿色，勾选后背景变为绿色并显示白色对勾图标")
add_bullet("操作按钮：默认绿色背景，悬停变深绿；完成状态变为灰色不可点击样式")
add_bullet("资源卡片：悬停时边框变色、背景微变并出现阴影")
add_bullet("剧集表格行：悬停时行背景高亮，标题列变为绿色")
add_bullet("日期标签自动根据当天日期计算：代码使用 new Date() 生成最近 30 天的日期序列")

# ══════════════════════════════════════════════════
# 8. 技术栈
# ══════════════════════════════════════════════════

add_heading_custom("8. 技术栈", level=1)

add_table(
    ["技术 / 库", "版本 / 来源", "用途"],
    [
        ["HTML5 / CSS3", "原生", "页面结构和样式"],
        ["JavaScript (Vanilla)", "原生 ES5", "DOM 操作、页面切换、交互逻辑"],
        ["Chart.js", "v4.5.0 (CDN)", "Sparkline 迷你图和下载趋势折线图"],
        ["ECharts", "v5.5.0 (CDN)", "高级图表（已引入但当前页面未使用）"],
        ["Google Fonts - Roboto", "CDN", "正文字体（400-800 weight）"],
        ["localStorage", "浏览器 API", "Onboarding 进度持久化存储"],
        ["SVG", "内联", "图标系统"],
    ]
)

# ══════════════════════════════════════════════════
# 9. 数据与存储
# ══════════════════════════════════════════════════

add_heading_custom("9. 数据与存储", level=1)

add_bullet("数据状态：当前所有统计数据均为前端模拟（Mock）数据，未连接后端 API 或数据库。")
add_bullet("本地存储：Onboarding 进度通过 localStorage.podbean_onboard_steps 存储，键值为 JSON 数组（如 [true, false, true, false, false]），持久化在用户浏览器中。")
add_bullet("图表数据：所有 Sparkline 和折线图数据均为硬编码的静态数组，用于 UI 展示验证。")
add_bullet("剧集数据：epPerfData 数组存储了 6 个剧集的标题和下载量信息，同时渲染到 v2 和 v2-NC 两个页面中。")
add_bullet("用户头像：硬编码为 \"EZ\"，暂无用户系统和登录注册功能。")

# ══════════════════════════════════════════════════
# 10. 未来规划
# ══════════════════════════════════════════════════

add_heading_custom("10. 未来规划", level=1)
add_para("基于当前的页面结构和交互设计，以下功能可作为后续开发方向：")

add_bullet("后端数据集成：连接播客托管平台 API（如 Podbean），获取真实的下载次数、听众分布等统计数据。")
add_bullet("用户系统：添加登录注册、用户资料管理和多播客支持。")
add_bullet("数据筛选与时间范围：支持自定义时间范围（7 天 / 30 天 / 90 天 / 自定义区间）。")
add_bullet("剧集详情弹窗：点击剧集标题后打开详情弹窗，展示更详细的数据曲线和听众画像。")
add_bullet("推送通知：对接通知铃铛图标，为播主提供评论回复、里程碑达成等实时通知。")
add_bullet("高级图表：探索使用已引入的 ECharts 实现更复杂的数据可视化（如地理分布、设备分析等）。")
add_bullet("动态资源推荐：根据用户当前播客的阶段（新手 / 成长 / 成熟）推荐不同的学习资源。")
add_bullet("多语言支持：目前界面以英文为主，后续可支持中文等多语言切换。")

# ══════════════════════════════════════════════════
# Footer
# ══════════════════════════════════════════════════

doc.add_paragraph()
doc.add_paragraph()
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("— 文档结束 —")
run.font.size = Pt(9)
run.font.color.rgb = LIGHT_GRAY
run.font.name = 'Microsoft YaHei'
run.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')

p2 = doc.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
run2 = p2.add_run("Podcast Dashboard 功能说明文档 v1.0 | 2026-07-16 | Podcasting Smarter")
run2.font.size = Pt(8)
run2.font.color.rgb = LIGHT_GRAY
run2.font.name = 'Microsoft YaHei'
run2.element.rPr.rFonts.set(qn('w:eastAsia'), 'Microsoft YaHei')

# ── Save ──
output_path = "/sessions/magical-peaceful-mendel/mnt/Episodes/Podcast_Dashboard_功能说明文档.docx"
doc.save(output_path)
print(f"Document saved to: {output_path}")
