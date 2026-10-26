# 把功能说明文档发布到 Confluence

把 `../settings-functional-spec.html` 转成 Confluence 存储格式，并以**一个页面**新建或原地更新。
重复执行安全：正文没变就跳过，不会产生空版本。

## 文件

| 文件 | 说明 |
|---|---|
| `build_storage.py` | 从 HTML 版生成 `settings-functional-spec.confluence.html`（Confluence 存储格式） |
| `publish_to_confluence.py` | 调用 REST API 新建或更新页面；默认每次先重新生成 |
| `settings-functional-spec.confluence.html` | 生成物；API 提交的就是它。Data Center 可在「插入 → 标记」里粘贴预览，Cloud 新编辑器没有该入口 |

## 准备

Confluence Cloud：在 <https://id.atlassian.com/manage-profile/security/api-tokens> 创建 API token，
账号需要目标空间的页面编辑权限。站点地址形如 `https://<站点>.atlassian.net/wiki`。

Confluence Data Center：在「头像 → 个人设置 → 个人访问令牌」创建 PAT，站点地址形如
`https://confluence.example.com`（不带 `/wiki` 也可以，脚本按原样拼接）。

## 运行

```bash
cd ~/Code/Settings/confluence

export CONFLUENCE_BASE_URL="https://acme.atlassian.net/wiki"
export CONFLUENCE_SPACE_KEY="SETTINGS"
export CONFLUENCE_EMAIL="you@example.com"
export CONFLUENCE_API_TOKEN="xxxx"        # Cloud
# 或 Data Center：export CONFLUENCE_TOKEN="xxxx"

python3 publish_to_confluence.py --dry-run   # 只生成并打印，不发请求
python3 publish_to_confluence.py             # 新建或更新
```

可选环境变量：

- `CONFLUENCE_PAGE_TITLE`：页面标题，默认 `Podcast Dashboard — Settings 模块功能说明文档`
- `CONFLUENCE_PARENT_ID`：仅新建时使用的父页面 ID；不填则建在空间根目录
- `CONFLUENCE_INSECURE=1`：跳过 TLS 校验，只用于自签名证书的 Data Center

页面按标题在指定 space 内查找：找到就 `PUT` 升一个版本，找不到就 `POST` 新建。

## 转换规则

- 正文去掉页面外壳（顶栏、左侧目录、锚点 `#`），页面标题由 API 的 `title` 提供
- 章节标题转为 h2–h4，左侧目录用 Confluence 的「目录」宏替代（2–4 级）
- 表格去掉列宽（`colgroup`），表头行并入 `tbody`；表格样式由 Confluence 决定
- 代码块转成「代码」宏；顶部提示框转成「信息」面板
- 红色字段名、琥珀色「待确认」保留为行内颜色 + 加粗；如果目标站点清洗了行内颜色，至少保留加粗

## 注意

- 每次更新都会在页面历史里留下一个版本；只想预览时加 `--dry-run`
- 文档里的页面内锚点跳转不会迁移，跨章节请用 Confluence 的目录或链接
- 首次发布建议先 `--dry-run`，再用 `CONFLUENCE_PARENT_ID` 指定父页面，避免建到空间根目录
