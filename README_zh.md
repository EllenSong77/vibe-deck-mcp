# Vibe Deck MCP Server

English | [中文说明](./README_zh.md)

**无尽风格，告别死板模板。**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一款将你的本地大模型 (Claude/Gemini) 转化为顶级视觉设计师的零成本 MCP 插件，轻松生成小红书图文、演示文稿、数据资产和可视化卡片。

---

### 🌟 AI 原创生成示例

*(以下配图并非预设模板，而是大模型在接收到文本后，自己在本地编写出的 HTML/CSS 并在后台渲染出的效果图！)*

#### 风格 1：赛博朋克 / 科技极客风 (暗色主题)
<div align="center">
  <img src="docs/assets/cover.png" width="30%" alt="Cover Page">
  <img src="docs/assets/content.png" width="30%" alt="Content Page">
  <img src="docs/assets/cta.png" width="30%" alt="CTA Page">
</div>

#### 风格 2：Apple Glass / 极简留白 (浅色主题)
<div align="center">
  <img src="docs/assets/cover-light.png" width="45%" alt="Light Cover Page">
  <img src="docs/assets/content-light.png" width="45%" alt="Light Content Page">
</div>

---

## 🌟 核心优势

1. **不受限的风格:** 想要原木风？极简苹果风？赛博朋克？Y2K？或者是专业的商业互金风？只需告诉 AI。它会完全根据你的指令实时生成前沿的 CSS 渐变、布局和排版约束。
2. **开箱即用的设计大脑 (Zero-Config):** 无需手动准备任何由于教导 AI 排版的长文提示词。调教 AI 的设计哲学（极客审美的留白、行间距控制、结构化的排版）已经**完全内置在 MCP 插件协议中**。大模型接通的瞬间自动变身排版大师。
3. **零服务器成本:** 借助你本地电脑的算力，通过无头浏览器直接将代码渲染成高清图片。

---

## 🚀 安装指南

### 方式 1: 直接通过 GitHub 运行 (强烈推荐)

你可以直接通过 `npx` 运行远端代码，甚至不需要把代码 clone 到本地。

**在你的 Claude Desktop 配置文件中加入以下内容:**
*(Mac 上通常位于 `~/Library/Application Support/Claude/claude_desktop_config.json`)*

```json
{
  "mcpServers": {
    "vibe-deck": {
      "command": "npx",
      "args": ["-y", "github:EllenSong77/vibe-deck-mcp"]
    }
  }
}
```

### 方式 2: 本地克隆运行 (面向开发者)

**第一步:** 克隆仓库
```bash
git clone https://github.com/EllenSong77/vibe-deck-mcp.git
cd vibe-deck-mcp
```

**第二步:** 安装依赖并编译
```bash
npm install
npm run build
```

**第三步:** 接入你的 MCP 客户端
编辑你的 `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "vibe-deck": {
      "command": "node",
      "args": ["/绝对路径/你的文件夹位置/vibe-deck-mcp/build/index.js"]
    }
  }
}
```

---

## 🎨 零配置体验

**这里没有需要你手动复制粘贴的 `SKILL.md`！**

真正赋予大模型顶级设计师灵魂的那段“咒语”，已经写死在了这个工具的 Schema Description 里。
你直接装上插件，甩给 Claude 一篇文章说：*“帮我把这个做成小红书图文，用干净清透的玻璃质感风格”*，它就会自动领悟这套排版美学，在你的电脑里本地吐出堪比专业设计机构的多图卡片。

## 技术栈
- `@modelcontextprotocol/sdk` (MCP Server 实现)
- `puppeteer` (无头浏览器渲染引擎)
- `zod` (强类型参数校验)
- TypeScript / Node.js
