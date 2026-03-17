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
                description: "Renders an array of self-contained HTML pages into high-resolution PNG images. Each page is a complete HTML document with inline CSS. The LLM should generate visually stunning, topic-appropriate HTML/CSS for each page. Output images are saved locally and paths are returned.",
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
