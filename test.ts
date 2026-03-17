import { renderPages } from './src/renderer.js';

const coverHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:100vw; height:100vh; overflow:hidden;
    font-family: "Noto Sans SC", sans-serif;
    background: linear-gradient(145deg, #0a0e27 0%, #1a1040 50%, #0d1a2d 100%);
    color: #fff;
    display:flex; align-items:center; justify-content:center;
    position:relative;
  }
  .orb { position:absolute; border-radius:50%; filter:blur(80px); }
  .orb-1 { width:50%; height:50%; top:-10%; right:-15%; background:rgba(41,151,255,0.3); }
  .orb-2 { width:35%; height:35%; bottom:-5%; left:-10%; background:rgba(139,92,246,0.25); }
  .grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .content { position:relative; z-index:1; padding:7%; width:90%; }
  h1 {
    font-size:3.8rem; font-weight:900; line-height:1.2; letter-spacing:-0.03em;
    background: linear-gradient(135deg, #fff, #8b9cf7);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    margin-bottom:1.5rem;
  }
  .tag {
    font-size:1rem; font-weight:500; color:rgba(139,92,246,0.9);
    letter-spacing:0.15em; text-transform:uppercase;
    margin-bottom:1.5rem;
  }
  p { font-size:1.6rem; font-weight:400; line-height:1.5; color:rgba(255,255,255,0.7); }
  .accent-bar {
    position:absolute; top:7%; left:8%;
    width:64px; height:5px; border-radius:3px;
    background:linear-gradient(90deg, #2997ff, #8b5cf6);
  }
  .page-num {
    position:absolute; top:5%; right:8%;
    font-size:6rem; font-weight:900;
    opacity:0.04; letter-spacing:-0.05em;
  }
  .dots { position:absolute; bottom:4%; left:50%; transform:translateX(-50%); display:flex; gap:8px; align-items:center; }
  .dot { width:8px; height:8px; border-radius:50%; }
  .dot.active { background:#fff; }
  .dot.inactive { width:6px; height:6px; background:rgba(255,255,255,0.2); }
</style>
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="grid"></div>
  <div class="accent-bar"></div>
  <div class="page-num">01</div>
  <div class="content">
    <div class="tag">AI × 编程</div>
    <h1>AI 不会取代程序员。<br>但会用 AI 的人会。</h1>
    <p>🔥 3个让你编程效率翻倍的 AI 工作流</p>
  </div>
  <div class="dots">
    <span class="dot active"></span>
    <span class="dot inactive"></span>
    <span class="dot inactive"></span>
  </div>
</body>
</html>`;

const contentHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:100vw; height:100vh; overflow:hidden;
    font-family: "Noto Sans SC", sans-serif;
    background: linear-gradient(160deg, #0d1117 0%, #161b22 50%, #0a0e14 100%);
    color: #fff;
    display:flex; align-items:center; justify-content:center;
    position:relative;
  }
  .orb { position:absolute; border-radius:50%; filter:blur(90px); }
  .orb-1 { width:45%; height:45%; top:5%; right:-10%; background:rgba(56,189,248,0.2); }
  .orb-2 { width:30%; height:30%; bottom:10%; left:-5%; background:rgba(168,85,247,0.15); }
  .grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .page-num {
    position:absolute; top:4%; right:8%;
    font-size:7rem; font-weight:900; opacity:0.04; letter-spacing:-0.05em;
  }
  .content {
    position:relative; z-index:1; padding:7%; width:90%;
  }
  .tag {
    font-size:0.9rem; font-weight:500; color:rgba(56,189,248,0.9);
    letter-spacing:0.15em; text-transform:uppercase;
    margin-bottom:1rem;
  }
  h1 {
    font-size:3.2rem; font-weight:900; line-height:1.2; letter-spacing:-0.02em;
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    margin-bottom:0.5rem;
  }
  .divider {
    width:48px; height:4px; border-radius:2px; margin:1.5rem 0 2rem 0;
    background:linear-gradient(90deg, #38bdf8, transparent);
  }
  .items { display:flex; flex-direction:column; gap:1.5rem; }
  .item {
    display:flex; align-items:flex-start; gap:1.2rem;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:20px;
    padding:1.6rem;
  }
  .item-icon { font-size:2rem; flex-shrink:0; margin-top:0.2rem; filter:drop-shadow(0 2px 8px rgba(0,0,0,0.2)); }
  .item-text h3 { font-size:1.4rem; font-weight:700; margin-bottom:0.4rem; letter-spacing:0.02em; }
  .item-text p { font-size:1.15rem; line-height:1.5; font-weight:400; color:rgba(255,255,255,0.65); }
  .dots { position:absolute; bottom:4%; left:50%; transform:translateX(-50%); display:flex; gap:8px; align-items:center; }
  .dot { width:8px; height:8px; border-radius:50%; }
  .dot.active { background:#fff; }
  .dot.inactive { width:6px; height:6px; background:rgba(255,255,255,0.2); }
</style>
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="grid"></div>
  <div class="page-num">02</div>
  <div class="content">
    <div class="tag">AI × 编程</div>
    <h1>Cursor + Claude</h1>
    <div class="divider"></div>
    <div class="items">
      <div class="item">
        <span class="item-icon">⚡</span>
        <div class="item-text">
          <h3>局部快速修改</h3>
          <p>选中代码描述需求，AI 帮你秒级重构，极大降低心智负担。</p>
        </div>
      </div>
      <div class="item">
        <span class="item-icon">🧠</span>
        <div class="item-text">
          <h3>多行智能补全</h3>
          <p>写一行注释，AI 预判你的意图补全整个函数，准确率极高。</p>
        </div>
      </div>
      <div class="item">
        <span class="item-icon">📂</span>
        <div class="item-text">
          <h3>全局上下文感知</h3>
          <p>无需手动贴代码，AI 自动阅读整个仓库，理解架构进行重构。</p>
        </div>
      </div>
    </div>
  </div>
  <div class="dots">
    <span class="dot inactive"></span>
    <span class="dot active"></span>
    <span class="dot inactive"></span>
  </div>
</body>
</html>`;

const ctaHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:100vw; height:100vh; overflow:hidden;
    font-family: "Noto Sans SC", sans-serif;
    background: linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    color: #fff;
    display:flex; align-items:center; justify-content:center;
    position:relative;
  }
  .orb { position:absolute; border-radius:50%; filter:blur(100px); }
  .orb-1 { width:55%; height:55%; top:20%; left:30%; background:rgba(139,92,246,0.25); }
  .grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .page-num {
    position:absolute; top:4%; right:8%;
    font-size:7rem; font-weight:900; opacity:0.04; letter-spacing:-0.05em;
  }
  .content {
    position:relative; z-index:1; padding:8%; width:90%;
    text-align:center;
  }
  h1 {
    font-size:3.8rem; font-weight:900; line-height:1.2; letter-spacing:-0.03em;
    background: linear-gradient(135deg, #fff, #c4b5fd);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    margin-bottom:1.5rem;
  }
  p {
    font-size:1.6rem; font-weight:400; line-height:1.5;
    color:rgba(255,255,255,0.7);
    margin-bottom:3rem;
  }
  .cta-box {
    display:inline-block;
    padding:1.2rem 2.8rem;
    border-radius:100px;
    border:1px solid rgba(139,92,246,0.5);
    background:rgba(139,92,246,0.15);
    font-size:1.4rem; font-weight:500;
    color:rgba(255,255,255,0.9);
    letter-spacing:0.05em;
    backdrop-filter:blur(10px);
  }
  .dots { position:absolute; bottom:4%; left:50%; transform:translateX(-50%); display:flex; gap:8px; align-items:center; }
  .dot { width:8px; height:8px; border-radius:50%; }
  .dot.active { background:#fff; }
  .dot.inactive { width:6px; height:6px; background:rgba(255,255,255,0.2); }
</style>
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="grid"></div>
  <div class="page-num">03</div>
  <div class="content">
    <h1>别再当 Code Monkey。<br>做 AI 的驯兽师。</h1>
    <p>🚀 把 AI 变成你的结对编程搭档<br>彻底改变开发体验与效率</p>
    <div class="cta-box">💬 评论区聊聊你最常用的 AI 工具</div>
  </div>
  <div class="dots">
    <span class="dot inactive"></span>
    <span class="dot inactive"></span>
    <span class="dot active"></span>
  </div>
</body>
</html>`;

async function main() {
    console.log("Testing v4 architecture: LLM-generated HTML → PNG with Elegant Typography...\n");
    const paths = await renderPages([coverHtml, contentHtml, ctaHtml], 1080, 1440);
    console.log(`✅ Generated ${paths.length} pages:`);
    paths.forEach((p, i) => console.log(`   Page ${i+1}: ${p}`));
}

main().catch(e => { console.error("❌ Test failed:", e); process.exit(1); });
