import { renderPages } from './src/renderer.js';

const lightCoverHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:100vw; height:100vh; overflow:hidden;
    font-family: "Inter", sans-serif;
    background: #f5f5f7;
    color: #1d1d1f;
    display:flex; align-items:center; justify-content:center;
    position:relative;
  }
  .orb { position:absolute; border-radius:50%; filter:blur(90px); }
  .orb-1 { width:45%; height:45%; top:-5%; right:-10%; background:rgba(0,102,204,0.15); }
  .orb-2 { width:30%; height:30%; bottom:5%; left:-5%; background:rgba(168,85,247,0.1); }
  .grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .content { position:relative; z-index:1; padding:8%; width:90%; background: rgba(255,255,255,0.6); backdrop-filter: blur(20px); border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid rgba(255,255,255,0.8); }
  h1 {
    font-size:4rem; font-weight:900; line-height:1.15; letter-spacing:-0.04em;
    background: linear-gradient(135deg, #1d1d1f 0%, #434353 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    margin-bottom:1.5rem;
  }
  .tag {
    font-size:1rem; font-weight:600; color:#0066cc;
    letter-spacing:0.15em; text-transform:uppercase;
    margin-bottom:1.5rem;
  }
  p { font-size:1.6rem; font-weight:400; line-height:1.5; color:#6e6e73; }
  .accent-bar {
    position:absolute; top:7%; left:8%;
    width:64px; height:5px; border-radius:3px;
    background:linear-gradient(90deg, #0066cc, #5e5ce6);
  }
  .page-num {
    position:absolute; top:5%; right:8%;
    font-size:6rem; font-weight:900;
    opacity:0.03; letter-spacing:-0.05em;
  }
</style>
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="grid"></div>
  <div class="accent-bar"></div>
  <div class="page-num">01</div>
  <div class="content">
    <div class="tag">Vibe Deck</div>
    <h1>Intelligence.<br>Built In.</h1>
    <p>The smartest visual designer we've ever shipped, running entirely on your local machine.</p>
  </div>
</body>
</html>`;

const lightContentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:100vw; height:100vh; overflow:hidden;
    font-family: "Inter", sans-serif;
    background: #ffffff;
    color: #1d1d1f;
    display:flex; align-items:center; justify-content:center;
    position:relative;
  }
  .orb { position:absolute; border-radius:50%; filter:blur(100px); }
  .orb-1 { width:50%; height:50%; top:-10%; left:-10%; background:rgba(0,122,255,0.08); }
  .grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .page-num {
    position:absolute; top:5%; right:8%;
    font-size:7rem; font-weight:900; opacity:0.02; letter-spacing:-0.05em;
  }
  .content { position:relative; z-index:1; padding:8%; width:90%; }
  h1 {
    font-size:3.5rem; font-weight:900; line-height:1.2; letter-spacing:-0.03em;
    color: #1d1d1f;
    margin-bottom:2.5rem;
  }
  .items { display:flex; flex-direction:column; gap:2rem; }
  .item {
    display:flex; align-items:flex-start; gap:1.5rem;
  }
  .item-icon { font-size:2.5rem; flex-shrink:0; background: #f5f5f7; width: 64px; height: 64px; border-radius: 16px; display:flex; align-items:center; justify-content:center; }
  .item-text h3 { font-size:1.6rem; font-weight:700; margin-bottom:0.4rem; letter-spacing:-0.01em; }
  .item-text p { font-size:1.3rem; line-height:1.5; font-weight:400; color:#86868b; }
</style>
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="grid"></div>
  <div class="page-num">02</div>
  <div class="content">
    <h1>Zero Templates.</h1>
    <div class="items">
      <div class="item">
        <div class="item-icon">✨</div>
        <div class="item-text">
          <h3>AI-Native Styling</h3>
          <p>The LLM writes custom CSS for every slide, matching the mood and topic perfectly.</p>
        </div>
      </div>
      <div class="item">
        <div class="item-icon">⚡</div>
        <div class="item-text">
          <h3>Local Rendering</h3>
          <p>Uses Puppeteer to capture ultra-crisp Retina PNGs directly on your CPU.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function main() {
    console.log("Generating Apple Light Theme images...");
    const paths = await renderPages([lightCoverHtml, lightContentHtml], 1080, 1440);
    console.log(`Generated:`, paths);
}

main().catch(e => { console.error("❌ Test failed:", e); process.exit(1); });
