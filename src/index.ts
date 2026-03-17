#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { renderPages } from "./renderer.js";

const server = new Server({
    name: "vibe-deck-mcp",
    version: "2.0.0",
}, {
    capabilities: {
        tools: {}
    }
});

const RenderSchema = z.object({
    pages: z.array(z.string().describe('Complete, self-contained HTML string for one page. Must include all CSS inline in a <style> tag. The HTML will be rendered at the specified viewport size.')).min(1),
    width: z.number().default(1080).describe('Viewport width in pixels'),
    height: z.number().default(1440).describe('Viewport height in pixels'),
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "render_vibe_deck",
                description: `Renders an array of HTML pages into high-resolution PNG images. 
CRITICAL DESIGN INSTRUCTIONS FOR LLM: 
You are a world-class visual designer. DO NOT use generic or empty white backgrounds. You MUST generate heavily styled, complete HTML/CSS for each slide tailored to the topic.
1. Layout: width:100vw, height:100vh, hidden overflow. Use elegant padding (6-8%). Content area 85-90%.
2. Richness (Mandatory): Every page MUST include at least 3 decorative elements: e.g., Gradient/Glassmorphism backgrounds, floating blurred orbs/shapes, subtle grid/noise textures, accent lines, large low-opacity watermark numbers, gradient text.
3. Typography: Import Google Fonts (Noto Sans SC for Chinese, Inter for English). Titles must be huge (3.5rem+), font-weight 900, tight letter-spacing (-0.03em), line-height 1.2. Body text large (1.5rem+), line-height 1.5. Use lists, not dense paragraphs.
4. Structure: Design a logical flow (e.g., Cover -> Problem -> Details -> CTA). Include page dots at the bottom of each slide.`,
                inputSchema: {
                    type: "object",
                    properties: {
                        pages: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "A complete HTML document string for one page, including <!DOCTYPE html>, <style>, and all content. Must be fully self-contained."
                            },
                            description: "Array of complete HTML strings, one per page/slide."
                        },
                        width: {
                            type: "number",
                            description: "Viewport width in pixels. Default 1080. Use 1080 for vertical (3:4, 9:16), 1920 for horizontal (16:9).",
                            default: 1080
                        },
                        height: {
                            type: "number",
                            description: "Viewport height in pixels. Default 1440. Use 1440 for 3:4, 1920 for 9:16, 1080 for 16:9.",
                            default: 1440
                        }
                    },
                    required: ["pages"]
                }
            }
        ]
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name !== "render_vibe_deck") {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
    }

    const args = request.params.arguments;
    if (!args) {
        throw new McpError(ErrorCode.InvalidParams, "Arguments are required");
    }

    try {
        const parsed = RenderSchema.parse(args);
        const paths = await renderPages(parsed.pages, parsed.width, parsed.height);
        
        return {
            content: [
                {
                    type: "text",
                    text: `Successfully rendered ${paths.length} pages.\nSaved to:\n${paths.join('\n')}`
                }
            ]
        };
    } catch (e: any) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error rendering: ${e.message || String(e)}`
                }
            ],
            isError: true
        };
    }
});

async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Vibe Deck MCP server v2 running on stdio");
}

run().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
