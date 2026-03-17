export type ThemeType = 'dark_minimal' | 'apple_glass';

export interface TemplateOptions {
  title: string;
  body: string;
  subtitle?: string;
  brandTag?: string;
  theme: ThemeType;
  pageIndex: number;
  totalPages: number;
  isVertical: boolean;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generatePageDots(current: number, total: number, isDark: boolean): string {
  const activeColor = isDark ? '#ffffff' : '#1d1d1f';
  const inactiveColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)';
  let dots = '';
  for (let i = 0; i < total; i++) {
    const color = i === current ? activeColor : inactiveColor;
    const size = i === current ? '8px' : '6px';
    dots += `<span style="display:inline-block;width:${size};height:${size};border-radius:50%;background:${color};margin:0 4px;"></span>`;
  }
  return `<div class="page-dots">${dots}</div>`;
}

// Format body text: convert \n to <br> for proper line breaks
function formatBody(text: string): string {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

export function getHtmlForPage(opts: TemplateOptions): string {
  const isDark = opts.theme === 'dark_minimal';
  const isCover = opts.pageIndex === 0;
  const isEnding = opts.pageIndex === opts.totalPages - 1;

  // Responsive sizes
  const titleSize = opts.isVertical
    ? (isCover ? '2.8rem' : '2.2rem')
    : (isCover ? '4.2rem' : '3.2rem');
  const bodySize = opts.isVertical ? '1.25rem' : '1.6rem';
  const subtitleSize = opts.isVertical ? '1rem' : '1.2rem';

  // Generate unique decorative elements per page for visual variety
  const hueShift = opts.pageIndex * 40;

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibe Card</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: "Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            position: relative;
            ${isDark ? `
            background: #0a0a0a;
            color: #ffffff;
            ` : `
            background: #f2f2f7;
            color: #1d1d1f;
            `}
        }

        /* ===== DECORATIVE BACKGROUND LAYER ===== */
        .bg-decor {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        }

        /* Gradient orbs */
        .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: ${isDark ? '0.35' : '0.25'};
        }
        .orb-1 {
            width: 60%;
            height: 60%;
            top: -15%;
            right: -20%;
            background: ${isDark
              ? `hsl(${220 + hueShift}, 80%, 50%)`
              : `hsl(${210 + hueShift}, 70%, 75%)`};
        }
        .orb-2 {
            width: 45%;
            height: 45%;
            bottom: -10%;
            left: -15%;
            background: ${isDark
              ? `hsl(${280 + hueShift}, 70%, 45%)`
              : `hsl(${320 + hueShift}, 60%, 80%)`};
        }
        .orb-3 {
            width: 30%;
            height: 30%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${isDark
              ? `hsl(${170 + hueShift}, 60%, 40%)`
              : `hsl(${170 + hueShift}, 50%, 78%)`};
            opacity: ${isDark ? '0.2' : '0.18'};
        }

        /* Geometric grid lines */
        .grid-lines {
            position: absolute;
            inset: 0;
            opacity: ${isDark ? '0.06' : '0.04'};
            background-image:
                linear-gradient(${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'} 1px, transparent 1px),
                linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'} 1px, transparent 1px);
            background-size: 60px 60px;
        }

        /* Decorative accent line */
        .accent-line {
            position: absolute;
            ${opts.isVertical ? `
            top: 6%;
            left: 8%;
            width: 48px;
            height: 4px;
            ` : `
            top: 8%;
            left: 5%;
            width: 64px;
            height: 4px;
            `}
            border-radius: 2px;
            background: ${isDark
              ? `linear-gradient(90deg, hsl(${220 + hueShift}, 80%, 60%), hsl(${280 + hueShift}, 70%, 55%))`
              : `linear-gradient(90deg, hsl(${210 + hueShift}, 70%, 55%), hsl(${260 + hueShift}, 60%, 60%))`};
            z-index: 1;
        }

        /* Corner decoration */
        .corner-decor {
            position: absolute;
            bottom: 8%;
            right: 8%;
            width: ${opts.isVertical ? '80px' : '120px'};
            height: ${opts.isVertical ? '80px' : '120px'};
            border: ${isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)'};
            border-radius: 50%;
            z-index: 0;
        }
        .corner-decor::after {
            content: '';
            position: absolute;
            top: 15%;
            left: 15%;
            width: 70%;
            height: 70%;
            border: ${isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.03)'};
            border-radius: 50%;
        }

        /* ===== CONTENT LAYER ===== */
        .card-frame {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: ${opts.isVertical ? '2.5rem 2rem' : '3rem 4rem'};
        }

        .brand-tag {
            font-size: ${opts.isVertical ? '0.75rem' : '0.85rem'};
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            background: ${isDark
              ? `linear-gradient(90deg, hsl(${220 + hueShift}, 80%, 65%), hsl(${260 + hueShift}, 70%, 60%))`
              : `linear-gradient(90deg, hsl(${210 + hueShift}, 80%, 45%), hsl(${250 + hueShift}, 60%, 50%))`};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .content-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: ${opts.isVertical ? '1rem' : '1.4rem'};
            ${opts.theme === 'apple_glass' ? `
            background: ${isDark ? 'rgba(30,30,35,0.5)' : 'rgba(255, 255, 255, 0.55)'};
            backdrop-filter: blur(28px) saturate(180%);
            -webkit-backdrop-filter: blur(28px) saturate(180%);
            border-radius: ${opts.isVertical ? '24px' : '28px'};
            padding: ${opts.isVertical ? '2rem 1.8rem' : '3rem'};
            box-shadow: ${isDark
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)'};
            border: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'};
            margin: ${opts.isVertical ? '1.2rem 0' : '1.5rem 0'};
            ` : `
            margin: ${opts.isVertical ? '1.2rem 0' : '1.5rem 0'};
            `}
        }

        h1 {
            font-size: ${titleSize};
            font-weight: 900;
            letter-spacing: -0.03em;
            line-height: 1.2;
            background: ${isDark
              ? `linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)`
              : `linear-gradient(135deg, #1d1d1f 0%, #515154 100%)`};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            font-size: ${subtitleSize};
            font-weight: 600;
            letter-spacing: 0.02em;
            background: ${isDark
              ? `linear-gradient(90deg, hsl(${220 + hueShift}, 80%, 65%), hsl(${280 + hueShift}, 60%, 60%))`
              : `linear-gradient(90deg, hsl(${210 + hueShift}, 80%, 45%), hsl(${260 + hueShift}, 60%, 50%))`};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .body-text {
            font-size: ${bodySize};
            font-weight: 400;
            line-height: 1.8;
            color: ${isDark ? 'rgba(255,255,255,0.6)' : '#6e6e73'};
            max-width: 92%;
        }

        /* Separator line between subtitle and body */
        .divider {
            width: 40px;
            height: 2px;
            border-radius: 1px;
            background: ${isDark
              ? `linear-gradient(90deg, hsl(${220 + hueShift}, 70%, 55%), transparent)`
              : `linear-gradient(90deg, hsl(${210 + hueShift}, 60%, 60%), transparent)`};
            opacity: 0.7;
        }

        .page-dots {
            text-align: center;
            padding-top: 0.5rem;
        }

        /* Special cover page number badge */
        ${isCover ? `
        .page-number {
            position: absolute;
            ${opts.isVertical ? 'top: 6%; right: 8%;' : 'top: 8%; right: 5%;'}
            font-size: ${opts.isVertical ? '4rem' : '5rem'};
            font-weight: 900;
            opacity: ${isDark ? '0.06' : '0.05'};
            letter-spacing: -0.05em;
            z-index: 0;
        }
        ` : `
        .page-number {
            position: absolute;
            ${opts.isVertical ? 'top: 5%; right: 8%;' : 'top: 7%; right: 5%;'}
            font-size: ${opts.isVertical ? '6rem' : '8rem'};
            font-weight: 900;
            opacity: ${isDark ? '0.04' : '0.035'};
            letter-spacing: -0.05em;
            z-index: 0;
        }
        `}
    </style>
</head>
<body>
    <!-- Decorative background -->
    <div class="bg-decor">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-lines"></div>
    </div>
    <div class="accent-line"></div>
    <div class="corner-decor"></div>
    <div class="page-number">${String(opts.pageIndex + 1).padStart(2, '0')}</div>

    <!-- Main content -->
    <div class="card-frame">
        ${opts.brandTag ? `<div class="brand-tag">${escapeHtml(opts.brandTag)}</div>` : '<div></div>'}
        <div class="content-area">
            <h1>${escapeHtml(opts.title)}</h1>
            ${opts.subtitle ? `<div class="subtitle">${escapeHtml(opts.subtitle)}</div>` : ''}
            ${(opts.subtitle || isCover) ? '<div class="divider"></div>' : ''}
            <div class="body-text">${formatBody(opts.body)}</div>
        </div>
        ${generatePageDots(opts.pageIndex, opts.totalPages, isDark)}
    </div>
</body>
</html>`;
}
