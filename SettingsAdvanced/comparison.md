# Settings → Advanced Options（Content）新老对比

## 普通账号

| 设置项 | 原来 | 现在 | 变化 |
|---|---|---|---|
| Comments | 默认开启，没有控制项 | 不变 | 无 |
| Share | 始终显示，没有控制开关 | 不变 | 无 |
| Download | General settings 里控制 Episode Download Link（Show / Hide），只影响 web，Podbean app 下载不受影响 | 设置已移除，固定为开启（web 下载始终可用） | 移除设置，默认开启 |
| Removing Podbean Brand | channel 设置里有该选项 | 设置已移除，普通账号不再显示此项 | 移除设置 |


## Network / Business（企业账号）

两个 tier 在这四项上的行为完全一致，下面合并说明。

| 设置项 | 原来 | 现在 | 变化 |
|---|---|---|---|
| Comments | Company Admin 的 Settings → Advanced Options 里是 **Enable Comments for All Channels** 总开关；On 时每个 channel 在 Settings → General → More Options → Comments 出现单独开关；Off 时 channel 里没有该选项，所有频道统一关闭 | Bizadmin 一行 **Podcast Comments**，Enable / Disable + **Select channels**；默认全部频道开启，可在弹框里收窄 | 两层变一层；总开关名称不再出现；单频道控制从 channel 设置搬进弹框 |
| Share | channel 的 **General** 里控制 **Share on Podcast Site**；Web 端只有 public episode 有分享，private 频道没有 | Bizadmin 一行 **Share on Public Channels**，Enable / Disable + **Select channels**（只列 public 频道） | 上移 + 改名 + 增加按频道选择 |
| Download | Bizadmin 的 **Allow Download on**（Web / Player / App）是总开关：Web 管站点下载按钮，Player 管播放器下载按钮（勾上后 Dashboard → Embed Player 出现 download 控制），App 管 Pro App / White Label App；三者全勾时，Web 和 App 的实际控制下放给 channel 的 Settings → General → **Episode Download Link** | Bizadmin 一行 **Allow Download on**：☑ Web ☑ Player ☑ App + **Select web channels**；Episode Download Link 不再单独存在 | 两项合一；Web 的控制从「下放到 channel」改为「在公司级选频道」；Player 仍由 Embed Player 页面细控 |
| Removing Podbean Brand | channel 设置里，选项为 Yes / No | Bizadmin 公司级，Enable / Disable，无频道选择 | 上移 + 变成公司级 + 选项措辞改变 |
