# Vibe Deck MCP Server

**Limitless Vibe. Zero Templates.**

A revolutionary Model Context Protocol (MCP) plugin that turns your local LLM (Claude/Gemini) into a top-tier visual designer for presentations, infographics, dynamic social media carousels, and elegant reports.

Unlike traditional generators that force text into rigid templates, **Vibe Deck leverages the LLM's coding ability to write stunning, custom HTML/CSS on the fly based on your content's topic and mood.** The MCP server simply rendering this dynamic code into ultra-crisp, high-definition PNGs using a headless browser.

## 🌟 Why Vibe Deck?

1. **Limitless Styles:** Want Cyberpunk? Minimalist Zen? Y2K? Financial professional? Just ask the AI. It writes the CSS gradients, positioning, and typography rules in real-time.
2. **True Design Intelligence:** The provided `SKILL.md` (System Prompt) trains the AI to act as an Art Director—enforcing elegant padding, perfect line-heights, dramatic typography scaling, and structured storytelling pagination (Cover → Problem → Detail → CTA).
3. **Zero Server Cost:** Uses your local machine's CPU to render via Puppeteer.

---

## 🚀 How to Install and Use

### Option 1: Direct Execution from GitHub (Recommended)
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

### Option 2: Clone and Run Locally (For Developers)

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

## 🎨 The Secret Sauce: `SKILL.md`

The MCP server itself is just a highly efficient HTML-to-PNG engine. The actual "magic" lives in the [SKILL.md](./SKILL.md) file.

**You MUST feed the contents of `SKILL.md` to Claude/Gemini (either via a custom instruction, a project knowledge base, or directly in the chat) before asking it to generate a deck.** This teaches the AI the strict typography, layout limits, and CSS decoration techniques required to make the cards look gorgeous rather than just "text on a white background".

## Tech Stack
- `@modelcontextprotocol/sdk` (MCP Server implementation)
- `puppeteer` (Headless rendering engine)
- `zod` (Robust schema validation)
- TypeScript / Node.js
