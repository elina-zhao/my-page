# Bizadmin · Settings → Advanced Options（Content）

Podbean Bizadmin 后台 **Settings → Advanced Options → Content** 页面的改版原型。

改版目标：把原本散落在每个 channel 的 Settings → General 里的四项设置上移到公司级后台统一控制。

## 文件

| 文件 | 说明 |
|---|---|
| `advanced-options-v2.html` | 改版后的原型（单文件，双击即可打开） |
| `comparison.md` | 新旧逻辑对比表 |
| `index.html` | 线上现有页面的静态复刻，用于对照 |

## 页面内容

原型包含五项设置：

- **Private Embed Player** — Enable / Disable；启用后可选两种访问方式（要求登录 / 用 Reference URL 免登录）
- **Podcast Comments** — Enable / Disable，对公司下所有频道生效
- **Share on Public Channels** — Enable / Disable，仅 public 频道
- **Enable Download** — 多选下拉：Web / Player / App
- **Removing Podbean Brand** — Enable / Disable，公司级

右上角 `View as` 可切换 Network / Business 两种账号，两者差异仅在 Private Embed Player（network 下不显示）。

## 说明

- 纯静态原型，数据不落库，`Save` 只做提示。
- 界面文案为英文，与线上产品保持一致。
