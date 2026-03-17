# Vibe Deck MCP Server

**Limitless Vibe. Zero Templates.** | **无尽风格，告别死板模板。**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A revolutionary Model Context Protocol (MCP) plugin that turns your local LLM (Claude/Gemini) into a top-tier visual designer for presentations, infographics, dynamic social media carousels (XiaoHongShu), and elegant reports.
*(一款将你的本地大模型转化为顶级视觉设计师的零成本 MCP 插件，轻松生成小红书图文、演示文稿、数据资产和可视化卡片。)*

---

### 🌟 AI-Generated Examples (全部由大模型手写网页代码渲染生出的原创新图，无模板！)

<div align="center">
  <img src="docs/assets/cover.png" width="30%" alt="Cover Page">
  <img src="docs/assets/content.png" width="30%" alt="Content Page">
  <img src="docs/assets/cta.png" width="30%" alt="CTA Page">
</div>

---

## 🌟 Why Vibe Deck? (核心优势)

1. **Limitless Styles (不受限的风格):** Want Cyberpunk? Minimalist Zen? Y2K? Financial professional? Just ask the AI. It writes the CSS gradients, positioning, and typography rules in real-time. 完全由大模型根据你的话语实时生成前沿的 CSS。
2. **Zero-Config Intelligence (开箱即用的设计大脑):** The system prompt is **built directly into the MCP tool description**. The moment your AI loads this tool, it instantly knows how to act as an Art Director—enforcing elegant padding, perfect line-heights, dramatic typography scaling, and structured storytelling pagination. 提示词已经**内置在插件协议中**，无需每次手动喂 System Prompt，大模型接通的瞬间自动变身排版大师。
3. **Zero Server Cost (零服务器成本):** Uses your local machine's CPU to render via Puppeteer. 借助你本地电脑的算力，通过无头浏览器直接将代码渲染成高清图片。

---

## 🚀 How to Install and Use (安装指南)

### Option 1: Direct Execution from GitHub (Recommended / 推荐)
You can let `npx` fetch and run the server directly without manual git cloning.

**Add this configuration to your Claude Desktop config file:**
*(Usually located at `~/Library/Application Support/Claude/claude_desktop_config.json` on Mac)*

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

### Option 2: Clone and Run Locally (For Developers / 本地纯源代码运行)

**Step 1:** Clone the repository
```bash
git clone https://github.com/EllenSong77/vibe-deck-mcp.git
cd vibe-deck-mcp
```

**Step 2:** Install dependencies and build
```bash
npm install
npm run build
```

**Step 3:** Hook it into your MCP Client
Edit your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "vibe-deck": {
      "command": "node",
      "args": ["/absolute/path/to/your/vibe-deck-mcp/build/index.js"]
    }
  }
}
```

---

## 🎨 Zero Configuration (零配置体验)

**There is no `SKILL.md` to copy-paste!** 

The actual "magic" system prompt that teaches the LLM how to design beautiful HTML/CSS is injected intimately into the MCP Tool Definition itself. 
You don't need to instruct the AI manually. Just load the MCP plugin and tell Claude: *"Turn this 3000-word article about productivity into a carousel deck."*

*(你不需要手动复制粘贴任何由于教导 AI 排版的长文提示词。调教 AI 的设计哲学已经直接写在了 MCP 工具的 Schema Description 里。直接装上插件，甩给 Claude 一篇文章说“帮我把这个做成小红书图文”，它就会自动领悟这套排版美学！)*

## Tech Stack
- `@modelcontextprotocol/sdk` (MCP Server implementation)
- `puppeteer` (Headless rendering engine)
- `zod` (Robust schema validation)
- TypeScript / Node.js
