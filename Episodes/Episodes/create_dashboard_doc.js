const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, ShadingType, BorderStyle,
  PageBreak, Numbering, LevelFormat, convertInchesToTwip, TabStopPosition,
  TabStopType
} = require('docx');
const fs = require('fs');

const doc = new Document({
  title: "Podcast Dashboard 功能说明文档",
  description: "Podcast Dashboard 功能说明文档 v1.0",
  styles: {
    default: {
      document: {
        run: { font: "Microsoft YaHei", size: 22 },
        paragraph: { spacing: { after: 120 } }
      }
    }
  },
  numbering: {
    config: [{
      reference: "main-headings",
      levels: [{
        level: 0,
        format: LevelFormat.DECIMAL,
        text: "%1.",
        alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.5) } } }
      }]
    }, {
      reference: "sub-headings",
      levels: [{
        level: 0,
        format: LevelFormat.DECIMAL,
        text: "%1.",
        alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: convertInchesToTwip(1) } } }
      }]
    }, {
      reference: "sub-subs",
      levels: [{
        level: 0,
        format: LevelFormat.LOWER_LETTER,
        text: "%1.",
        alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: convertInchesToTwip(1.5) } } }
      }]
    }, {
      reference: "bullet-list",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "•",
        alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: convertInchesToTwip(1), hanging: convertInchesToTwip(0.25) } } }
      }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
      }
    },
    children: [
      // ═══════════════════ 标题页 ═══════════════════
      new Paragraph({ spacing: { before: 3000 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Podcast Dashboard", size: 56, bold: true, color: "1a9a6c" })
      ]}),
      new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "功能说明文档", size: 44, bold: true, color: "1e293b" })
      ]}),
      new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "版本：v1.0", size: 24, color: "64748b" })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "日期：2026-07-16", size: 24, color: "64748b" })
      ]}),
      new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "项目：Podcasting Smarter", size: 24, color: "64748b" })
      ]}),

      new Paragraph({ children: [new TextRun({ text: "" })] }),  // spacer

      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [
        new TextRun({ text: "目  录", size: 32, bold: true, color: "1e293b" })
      ]}),
      ...[
        { num: "1", title: "概述" },
        { num: "2", title: "系统架构与布局" },
        { num: "3", title: "视图一：Dashboard v1 —— 新手引导（Onboarding）" },
        { num: "4", title: "视图二：Dashboard v2 —— 数据分析面板" },
        { num: "5", title: "视图三：Dashboard v2-NC —— 无评论版" },
        { num: "6", title: "数据可视化" },
        { num: "7", title: "用户界面交互" },
        { num: "8", title: "技术栈" },
        { num: "9", "title": "数据与存储" },
        { num: "10", title: "未来规划" },
      ].map(item => new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { before: 80 },
        children: [
          new TextRun({ text: item.title, size: 24, color: "1e293b" })
        ]
      })),

      // ═══════════════════ 1. 概述 ═══════════════════
      new Paragraph({ spacing: { before: 600 }, children: [
        new TextRun({ text: "" })
      ]}),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "概述", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: "Dashboard（仪表板）是 Podcasting Smarter 平台的核心入口页面，为用户提供播客运营的一站式数据监控和任务管理体验。Dashboard 分为三个视图模式，分别面向不同阶段的用户需求：", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { before: 60 },
        children: [
          new TextRun({ text: "Dashboard v1 (Onboarding)：", bold: true, size: 22 }),
          new TextRun({ text: "面向新用户的入门引导面板，提供 5 步播客设置清单。", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { before: 60 },
        children: [
          new TextRun({ text: "Dashboard v2 (Analytics)：", bold: true, size: 22 }),
          new TextRun({ text: "完整的数据分析面板，包含统计数据、趋势图表、剧集表现、成就徽章、近期评论和播客资源推荐。", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { before: 60 },
        children: [
          new TextRun({ text: "Dashboard v2-NC (No Comments)：", bold: true, size: 22 }),
          new TextRun({ text: "与 v2 内容一致，但未包含评论区模块，适用于不需评论功能的场景。", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { before: 200, after: 400 },
        children: [
          new TextRun({ text: "用户可通过左侧侧边栏在三个视图之间自由切换。", size: 22 })
        ]
      }),

      // ═══════════════════ 2. 系统架构与布局 ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "系统架构与布局", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "整体布局", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Dashboard 采用三栏式布局结构：", size: 22 })
        ]
      }),
      ...[
        ["顶部导航栏 (Topbar)", "包含应用Logo（\"Podcasting Smarter\"）、\"+ New Episode\"快速创建按钮、通知铃铛图标和用户头像（EZ）。高度 64px，背景白色，底部有 1px 分割线。"],
        ["左侧侧边栏 (Sidebar)", "宽度 230px，包含三个 Dashboard 视图切换入口（\"Onboarding\"、\"Dashboard\"、\"Dashboard v2\"），以及指向 Episodes、Distribution、Statistics、Settings 等模块的导航链接。侧边栏支持响应式折叠，在移动端隐藏，通过汉堡菜单按钮打开。"],
        ["内容主区域 (Main)", "最大宽度 1320px，居中显示。内容区域根据当前选中的页面视图动态显示对应的内容模块。"]
      ].map(([title, desc], i) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [
            new TextRun({ text: title + "：", bold: true, size: 22 }),
            new TextRun({ text: desc, size: 22 })
          ]
        })
      ),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "视图切换机制", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "通过 JavaScript 函数 ", size: 22 }),
          new TextRun({ text: "switchDashboard(page)", bold: true, size: 22 }),
          new TextRun({ text: " 实现页面切换。点击侧边栏导航链接时触发该函数，执行以下操作：", size: 22 })
        ]
      }),
      ...[
        "隐藏所有 page-content 元素",
        "显示与传入 page 参数对应的目标页面",
        "更新侧边栏导航项的 active 状态",
        "关闭移动端侧边栏（如果打开）",
        "如果切换到 Onboarding 视图，自动更新引导进度"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })],
        })
      ),

      // ═══════════════════ 3. Dashboard v1 (Onboarding) ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "Dashboard v1 —— 新手引导（Onboarding）", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: "Dashboard v1 是一个针对新播客创作者的引导面板，旨在通过清单式任务管理帮助用户快速完成播客的设置与发布。核心组件包括：", size: 22 })
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "页面头部", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      ...[
        "主标题：「Get your podcast ready」（准备你的播客）",
        "副标题提示：\"Complete the key steps to publish, distribute, and grow your show.\"（完成关键步骤来发布、分发和推广你的节目）"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text, size: 22 })],
        })
      ),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "进度条", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      ...[
        "显示当前已完成步骤数量（格式：\"X of 5 completed\"），",
        "进度填充条（绿色）根据完成比例自动伸缩，",
        "进度数据存储在浏览器的 localStorage 中，以 \"podbean_onboard_steps\" 键名持久化。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text, size: 22 })],
        })
      ),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "5 步引导清单", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "引导清单由 5 项可勾选的任务组成，每项任务包含标题、描述和操作按钮：", size: 22 })
        ]
      }),

      ...[
        ["Step 1", "Create your podcast", "设置播客档案和基本信息", "Get Started", "跳转到 Dashboard v2 分析面板"],
        ["Step 2", "Publish your first episode", "上传并发布第一集节目", "Create Episode", "创建剧集"],
        ["Step 3", "Submit to podcast platforms", "将节目提交到 Spotify、Apple Podcasts 等平台", "Start Distribution", "开始分发"],
        ["Step 4", "Customize your podcast page", "设计播客页面，展示品牌形象", "Customize", "自定义页面"],
        ["Step 5", "Share your podcast", "推广节目并增长听众", "Share Now", "立即分享"]
      ].map(([step, title, desc, btn, action]) =>
        new Paragraph({
          spacing: { before: 120 },
          children: [
            new TextRun({ text: step + " — " + title, bold: true, size: 22 }),
          ]
        }).then(() => {
          return [
            new Paragraph({
              numbering: { reference: "bullet-list", level: 0 },
              spacing: { before: 40 },
              children: [new TextRun({ text: "描述：" + desc, size: 22 })]
            }),
            new Paragraph({
              numbering: { reference: "bullet-list", level: 0 },
              spacing: { before: 40 },
              children: [new TextRun({ text: "操作按钮：\"" + btn + "\" → " + action, size: 22 })]
            })
          ];
        })
      ).flat(),

      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({ text: "此外，底部提供 \"Skip the Guide\" 链接，点击后可一键标记所有步骤为已完成状态，跳过引导流程。", size: 22 })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "交互逻辑：", bold: true, size: 22 }),
          new TextRun({ text: "用户点击圆形复选框图标即可切换步骤的完成状态。完成的任务项显示删除线标题、灰色文字和灰色按钮。状态变化通过 ", size: 22 }),
          new TextRun({ text: "localStorage", bold: true, size: 22 }),
          new TextRun({ text: " 持久化，页面刷新后仍然保留。", size: 22 })
        ]
      }),

      // ═══════════════════ 4. Dashboard v2 (Analytics) ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "Dashboard v2 —— 数据分析面板", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Dashboard v2 是核心的分析面板，以数据驱动的方式展示播客运营状况。", size: 22 })
        ]
      }),

      // 4.1 统计卡片
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "统计卡片（Stat Cards）", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [new TextRun({ text: "页面顶部以 4 列网格布局展示四张统计卡片，每张卡片包含一个数据指标及其对应的迷你趋势图（Sparkline）：", size: 22 })]
      }),

      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({ width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "卡片名称", bold: true, size: 20 })] })] }),
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "统计数据", bold: true, size: 20 })] })] }),
              new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sparkline 颜色", bold: true, size: 20 })] })] }),
            ]
          }),
          ...[
            ["Yesterday", "342", "绿色 (#10b981)"],
            ["7 Days", "2,847", "蓝色 (#3b82f6)"],
            ["30 Days", "12,560", "黄色 (#eab308)"],
            ["All Time", "48,293", "粉色 (#ec4899)"],
          ].map(row => new TableRow({
            children: row.map(cell => new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })]
            }))
          }))
        ]
      }),
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: "Sparkline 使用 Chart.js 绘制，为纯线条图（无坐标轴、无图例），宽度 96px、高度 46px，数据为模拟统计值。", size: 22 })
        ]
      }),

      // 4.2 下载趋势图
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "下载趋势图（Downloads Trending）", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "核心数据可视化模块，用于展示过去 30 天的下载量变化趋势（当前页面仅显示 14 天数据），包含以下元素：", size: 22 })
        ]
      }),
      ...[
        "总标题：\"Downloads Trending\"",
        "数据摘要：显示 \"Last 14 days\" 的总下载量（目前为 5,846），",
        "趋势徽章：绿色上涨标签 \"+6.2% vs previous 14 days\"，",
        "折线图：使用 Chart.js 绘制双线对比图，",
        "View more 链接：用于跳转到更详细的统计数据页面。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: "图表特性：", bold: true, size: 22 }),
          new TextRun({ text: "X 轴显示日期（MM/DD 格式），Y 轴显示下载量，带有网格线。主数据线（2026 年）为绿色实线填充，参考线（2025 年）为灰色虚线，图例默认隐藏。悬停时显示 Tooltip 工具提示。", size: 22 })
        ]
      }),

      // 4.3 剧集表现
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "剧集表现列表（Episode Performance）", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "以表格形式列出各剧集的下载表现数据，包含三列：", size: 22 })
        ]
      }),
      ...[
        "Episode Title（剧集标题）：鼠标悬停时标题变为绿色，点击可查看详情",
        "First Week（首周下载量）：居中显示",
        "First Month（首月下载量）：居中显示"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: "预置数据包含 6 集节目，涵盖中英文多语言内容。鼠标悬停行高亮显示，行与行之间由 1px 浅色分割线间隔。", size: 22 })
        ]
      }),

      // 4.4 成就徽章
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "成就徽章（Achievements）", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "成就系统用于激励用户达成播客运营里程碑。布局分为两部分：", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: "最新获得徽章：", bold: true, size: 22 }),
          new TextRun({ text: "左侧展示徽章图片（podcastbadge.png），右侧提供 \"Share\" 分享按钮。", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { before: 80 },
        children: [
          new TextRun({ text: "徽章陈列：", bold: true, size: 22 }),
          new TextRun({ text: "四枚徽章以行排列，包含：", size: 22 })
        ]
      }),
      ...[
        "1K Downloads（已获得）：绿色星形图标，2026 年 2 月",
        "100 Downloads（已获得）：蓝色闪电图标，2026 年 1 月",
        "First Episode（已获得）：黄色奖杯图标，2025 年 12 月",
        "10K Downloads（锁定中）：灰色锁定状态，半透明显示"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 40 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),
      new Paragraph({
        spacing: { before: 80 },
        children: [
          new TextRun({ text: "每个已获得的徽章显示名称、获得日期和对应的 SVG 图标。", size: 22 })
        ]
      }),

      // 4.5 近期评论
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "近期评论（Recent Comments）", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "展示听众的最新评论动态，每条评论包含：", size: 22 })
        ]
      }),
      ...[
        "用户头像：彩色圆形首字母标识（如 JM、RK、AL）",
        "作者名称：如 Jessica M.、Robert K.、Amanda L.",
        "评论文本：最多两行截断，超出部分用省略号显示",
        "关联剧集标题及时间戳：如 \"on ... · 2h ago\"",
        "底部提供 \"View more\" 链接，可查看全部评论"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),

      // 4.6 播客资源
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "播客资源推荐（Podcast Resources）", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "一个两列的资源卡片网格，为用户提供实用的播客学习内容，共 6 篇资源：", size: 22 })
        ]
      }),

      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "分类标签", bold: true, size: 20 })] })] }),
              new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "标题", bold: true, size: 20 })] })] }),
              new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "描述摘要", bold: true, size: 20 })] })] }),
            ]
          }),
          ...[
            ["Guide", "How to Start a Podcast in 2026", "从想法到发布的完整指南"],
            ["Strategy", "Podcast SEO", "优化标题、描述和标签以提升排名"],
            ["Growth", "10 Ways to Grow Your Audience", "节目推广的有效策略"],
            ["Equipment", "Best Podcasting Equipment", "从入门到专业的设备推荐"],
            ["Monetization", "Podcast Monetization 101", "广告、赞助和会员变现方式"],
            ["Community", "Building a Loyal Community", "Discord、直播和新闻通讯互动技巧"],
          ].map(row => new TableRow({
            children: row.map(cell => new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })]
            }))
          }))
        ]
      }),
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: "每张卡片左侧有分类颜色图标，右侧显示标签、标题和简介。鼠标悬停时边框变色并显示阴影效果。", size: 22 })
        ]
      }),

      // ═══════════════════ 5. Dashboard v2-NC ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "Dashboard v2-NC —— 无评论版", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Dashboard v2-NC（No Comments）是 v2 Analytics 面板的简化变体，内容和布局与 v2 基本一致，主要区别为：", size: 22 })
        ]
      }),
      ...[
        "页面标题显示为 \"Dashboard v2\" 并带有 \"No Comments View\" 标签徽章",
        "移除了 \"Recent Comments\"（近期评论）模块",
        "\"Achievements\"（成就徽章）模块由双列布局改为单独的全宽度卡片展示",
        "其余部分（统计卡片、下载趋势图、剧集表现、播客资源）与 v2 完全一致"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: "该版本的图表和数据使用独立的 Canvas ID（如 downloadChart2、sparkYesterday2 等），确保与 v2 版本互不干扰。", size: 22 })
        ]
      }),

      // ═══════════════════ 6. 数据可视化 ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "数据可视化", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "Sparkline 迷你趋势图", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      ...[
        "用于在统计卡片中展示短期数据波动趋势。",
        "使用 Chart.js 的 line 类型图表，无坐标轴、无图例、无 Tooltip。",
        "线条粗细为 2px，张力 0.3 使曲线平滑。",
        "不显示数据点（pointRadius: 0）。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "下载趋势折线图", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      ...[
        "展示过去 30 天的下载数据，双线对比（当前年份 vs 上一年份）。",
        "2026 年数据线为绿色 (#1a9a6c)，带浅绿色区域填充。",
        "2025 年参考线为灰色虚线 (#cbd5e1)，无填充。",
        "数据点半径为 3px（2026）和 2px（2025），深色边框。",
        "X 轴最多显示 8 个日期标签，Y 轴从零开始。",
        "交互模式为 index（最近的数据点优先），Tooltip 使用深色背景。",
        "图表容器高度 260px，响应式自适应宽度。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),

      // ═══════════════════ 7. 用户界面交互 ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "用户界面交互", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "响应式设计", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      ...[
        "1200px 以下：Dash 布局由水平排列改为垂直堆叠。",
        "1024px 以下：统计卡片从 4 列变为 2 列；内边距缩小。",
        "768px 以下：侧边栏固定定位并默认隐藏，通过汉堡菜单按钮（menu-toggle）滑出；资源网格从 2 列变为 1 列；顶部栏高度从 64px 减至 56px。",
        "480px 以下：统计卡片变为 1 列。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({ text: "交互细节", size: 28, bold: true, color: "1e293b" })
        ]
      }),
      ...[
        "统计卡片 (stat-card)：悬停时显示浅阴影效果（box-shadow）。",
        "侧边栏导航 (sidebar-nav a)：悬停时背景变为浅灰（#f8fafc），选中项 (active) 背景为 #f1f5f9 且文字加粗。",
        "Onboarding 复选框：悬停时边框变为绿色，勾选后背景变为绿色并显示白色对勾图标。",
        "操作按钮 (onboard-item-btn)：默认绿色背景，悬停变深绿；完成状态变为灰色不可点击样式。",
        "资源卡片 (resource-card)：悬停时边框变色、背景微变并出现阴影。",
        "剧集表格行 (ep-perf-table tr)：悬停时行背景高亮，标题列变为绿色。",
        "日期标签自动根据当天日期计算：代码使用 new Date() 生成最近 30 天的日期序列。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),

      // ═══════════════════ 8. 技术栈 ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "技术栈", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),

      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "技术 / 库", bold: true, size: 20 })] })] }),
              new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "版本 / 来源", bold: true, size: 20 })] })] }),
              new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "用途", bold: true, size: 20 })] })] }),
            ]
          }),
          ...[
            ["HTML5 / CSS3", "原生", "页面结构和样式"],
            ["JavaScript (Vanilla)", "原生 ES5", "DOM 操作、页面切换、交互逻辑"],
            ["Chart.js", "v4.5.0 (CDN)", "Sparkline 迷你图和下载趋势折线图"],
            ["ECharts", "v5.5.0 (CDN)", "高级图表（已引入但当前页面未使用）"],
            ["Google Fonts", "Roboto", "正文字体"],
            ["Roboto", "400-800 weight", "页面排版"],
            ["localStorage", "浏览器 API", "Onboarding 进度持久化存储"],
            ["SVG", "内联", "图标系统"],
          ].map(row => new TableRow({
            children: row.map(cell => new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })]
            }))
          }))
        ]
      }),

      // ═══════════════════ 9. 数据与存储 ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "数据与存储", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),
      ...[
        "数据状态：当前所有统计数据均为前端模拟（Mock）数据，未连接后端 API 或数据库。",
        "本地存储：Onboarding 进度通过 localStorage.podbean_onboard_steps 存储，键值为 JSON 数组（如 [true, false, true, false, false]），持久化在用户浏览器中。",
        "图表数据：所有 Sparkline 和折线图数据均为硬编码的静态数组，用于 UI 展示验证。",
        "剧集数据：epPerfData 数组存储了 6 个剧集的标题和下载量信息，同时渲染到 v2 和 v2-NC 两个页面中。",
        "用户头像：硬编码为 \"EZ\"，暂无用户系统和登录注册功能。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 80 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),

      // ═══════════════════ 10. 未来规划 ═══════════════════
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        numbering: { reference: "main-headings", level: 0 },
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "未来规划", size: 36, bold: true, color: "1a9a6c" })
        ]
      }),
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: "基于当前的页面结构和交互设计，以下功能可作为后续开发方向：", size: 22 })
        ]
      }),
      ...[
        "后端数据集成：连接播客托管平台 API（如 Podbean），获取真实的下载次数、听众分布等统计数据。",
        "用户系统：添加登录注册、用户资料管理和多播客支持。",
        "数据筛选与时间范围：支持自定义时间范围（7 天 / 30 天 / 90 天 / 自定义区间）。",
        "剧集详情弹窗：点击剧集标题后打开详情弹窗，展示更详细的数据曲线和听众画像。",
        "推送通知：对接通知铃铛图标，为播主提供评论回复、里程碑达成等实时通知。",
        "高级图表：探索使用已引入的 ECharts 实现更复杂的数据可视化（如地理分布、设备分析等）。",
        "动态资源推荐：根据用户当前播客的阶段（新手 / 成长 / 成熟）推荐不同的学习资源。",
        "多语言支持：目前界面以英文为主，后续可支持中文等多语言切换。"
      ].map((text) =>
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { before: 60 },
          children: [new TextRun({ text, size: 22 })]
        })
      ),

      // ═══════════════════ 文档信息 ═══════════════════
      new Paragraph({ spacing: { before: 600 }, children: [
        new TextRun({ text: "" })
      ]}),
      new Paragraph({
        border: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "e2e8f0" }
        },
        spacing: { before: 400, after: 200 },
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "— 文档结束 —", size: 20, color: "94a3b8" })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Podcast Dashboard 功能说明文档 v1.0 | 2026-07-16 | Podcasting Smarter", size: 18, color: "94a3b8" })
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/zgy/Code/Episodes/Podcast_Dashboard_功能说明文档.docx", buffer);
  console.log("Document created successfully!");
});
