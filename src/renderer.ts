import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

export async function renderPages(htmlPages: string[], width: number, height: number): Promise<string[]> {
    const browser = await puppeteer.launch({ headless: true, channel: 'chrome' });
    try {
        const outDir = path.join(process.cwd(), 'output');
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        const runId = randomUUID().substring(0, 8);
        const generatedPaths: string[] = [];

        const page = await browser.newPage();
        await page.setViewport({ width, height, deviceScaleFactor: 2 });

        for (let i = 0; i < htmlPages.length; i++) {
            await page.setContent(htmlPages[i], { waitUntil: 'load' });
            
            // Wait for web fonts to load
            await page.evaluateHandle('document.fonts.ready');
            await new Promise(r => setTimeout(r, 300));
            
            const fileName = `deck_${runId}_page_${i + 1}.png`;
            const filePath = path.join(outDir, fileName);
            await page.screenshot({ path: filePath, fullPage: false, clip: { x: 0, y: 0, width, height } });
            generatedPaths.push(filePath);
        }

        return generatedPaths;
    } finally {
        await browser.close();
    }
}
