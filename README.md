# PodbeanReviews

Podbean 播客平台 Reviews/推荐页（单文件 HTML 项目）。

## 内容

```
PodbeanReviews/
├── index.html               ← 项目成品：Podbean Reviews 页面（内联 CSS/JS，可直接打开）
├── logopodbean.svg          ← 页头使用的 Podbean logo（SVG）
├── README.md
└── materials/               ← 制作过程中使用/参考的材料
    ├── Initial-index.html   ← 顶栏结构对齐参考的原型页（~/Code/Initial/index.html 的副本）
    ├── logo-img2.png        ← 原型顶栏中使用的 Podbean logo 素材
    ├── podbean-brand.md     ← 设计笔记：品牌色 #428200 及衍生配色
    └── podbean-reviews-page.md ← 设计笔记：页面范围与结构参考（Buzzsprout reviews 架构 + Podbean 风格）
```

## 关键约定

- 页面内容架构参考 buzzsprout.com/reviews，视觉风格为 Podbean 自己的风格（品牌绿 `#428200`）。
- 页内所有用户评价、人名、评分与数字均为**示例占位内容**，发布前需替换（文件顶部 HTML 注释中亦有说明）。
- 顶栏结构与 `materials/Initial-index.html` 的原型导航对齐，但保持浅色页头、绿色 `#428200` 强调。
- 页面无构建步骤、无外部 Bootstrap，CSS/JS 内联；唯一外部资源是本目录下的 `logopodbean.svg` logo。

（归档时间：2026-09-03）
