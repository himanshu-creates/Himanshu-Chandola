const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. FIGMA (LARGE & PROMINENT) - 280 x 260
// ============================================================================
function getFigmaPaintedSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 280 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="fshadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#140e08" flood-opacity="0.38"/>
    </filter>
  </defs>
  <g transform="rotate(${angle} 140 130)">
    <!-- Die-cut white backing with shadow -->
    <rect x="12" y="10" width="256" height="240" rx="30" fill="#FFFFFF" filter="url(#fshadow)"/>
    <rect x="12" y="10" width="256" height="240" rx="30" fill="#FFFFFF" stroke="#2B2926" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="18" y="16" width="244" height="228" rx="26" fill="#FAF8F5" stroke="#EAE5DE" stroke-width="1.2"/>

    <!-- Figma 5-part Icon (Enlarged) -->
    <g transform="translate(89, 26) scale(1.02)">
      <!-- Top Left (Red-Orange) -->
      <path d="M 25 0 C 11.19 0 0 11.19 0 25 C 0 38.81 11.19 50 25 50 L 50 50 L 50 0 Z" fill="#F24E1E" stroke="#1F1D1B" stroke-width="1.8"/>
      <!-- Top Right (Coral-Orange) -->
      <path d="M 50 0 L 75 0 C 88.81 0 100 11.19 100 25 C 100 38.81 88.81 50 75 50 L 50 50 Z" fill="#FF7262" stroke="#1F1D1B" stroke-width="1.8"/>
      <!-- Mid Left (Purple) -->
      <path d="M 25 50 C 11.19 50 0 61.19 0 75 C 0 88.81 11.19 100 25 100 L 50 100 L 50 50 Z" fill="#A259FF" stroke="#1F1D1B" stroke-width="1.8"/>
      <!-- Mid Right (Cyan-Blue Circle) -->
      <circle cx="75" cy="75" r="25" fill="#1ABCFE" stroke="#1F1D1B" stroke-width="1.8"/>
      <!-- Bottom Left (Green) -->
      <path d="M 25 100 C 11.19 100 0 111.19 0 125 C 0 138.81 11.19 150 25 150 C 38.81 150 50 138.81 50 125 L 50 100 Z" fill="#0ACF83" stroke="#1F1D1B" stroke-width="1.8"/>
    </g>

    <!-- Wordmark -->
    <text x="140" y="222" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="32" fill="#1E1E1E" text-anchor="middle" letter-spacing="0.8">Figma</text>
  </g>
</svg>
`;
}

function getFigmaSketchSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 280 260" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(${angle} 140 130)">
    <!-- Sketch backing -->
    <rect x="12" y="10" width="256" height="240" rx="30" fill="#ECE8E0" stroke="#363431" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="18" y="16" width="244" height="228" rx="26" fill="none" stroke="#7A756C" stroke-width="1" stroke-dasharray="4,4"/>

    <!-- Figma Icon in pencil sketch -->
    <g transform="translate(89, 26) scale(1.02)">
      <path d="M 25 0 C 11.19 0 0 11.19 0 25 C 0 38.81 11.19 50 25 50 L 50 50 L 50 0 Z" fill="#DCD6CD" stroke="#2A2927" stroke-width="3"/>
      <path d="M 50 0 L 75 0 C 88.81 0 100 11.19 100 25 C 100 38.81 88.81 50 75 50 L 50 50 Z" fill="#E4DFD7" stroke="#2A2927" stroke-width="3"/>
      <path d="M 25 50 C 11.19 50 0 61.19 0 75 C 0 88.81 11.19 100 25 100 L 50 100 L 50 50 Z" fill="#D2CCC2" stroke="#2A2927" stroke-width="3"/>
      <circle cx="75" cy="75" r="25" fill="#DCD7CF" stroke="#2A2927" stroke-width="3"/>
      <path d="M 25 100 C 11.19 100 0 111.19 0 125 C 0 138.81 11.19 150 25 150 C 38.81 150 50 138.81 50 125 L 50 100 Z" fill="#C7C1B7" stroke="#2A2927" stroke-width="3"/>
      
      <!-- Hatch lines -->
      <line x1="10" y1="20" x2="40" y2="20" stroke="#504C47" stroke-width="1.5"/>
      <line x1="8" y1="32" x2="42" y2="32" stroke="#504C47" stroke-width="1.5"/>
      <line x1="60" y1="22" x2="90" y2="22" stroke="#504C47" stroke-width="1.5"/>
      <line x1="12" y1="70" x2="42" y2="70" stroke="#504C47" stroke-width="1.5"/>
      <line x1="62" y1="74" x2="90" y2="74" stroke="#504C47" stroke-width="1.5"/>
      <line x1="12" y1="122" x2="40" y2="122" stroke="#504C47" stroke-width="1.5"/>
    </g>

    <!-- Wordmark sketch -->
    <text x="140" y="222" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="32" fill="#2A2927" text-anchor="middle" letter-spacing="0.8">Figma</text>
  </g>
</svg>
`;
}

// ============================================================================
// 2. FIGJAM (LARGE & CLEARLY VISIBLE) - 270 x 180
// ============================================================================
function getFigJamPaintedSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 270 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="fjshadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="5" stdDeviation="4.5" flood-color="#140e08" flood-opacity="0.36"/>
    </filter>
  </defs>
  <g transform="rotate(${angle} 135 90)">
    <!-- White die-cut backing -->
    <rect x="10" y="8" width="250" height="164" rx="28" fill="#FFFFFF" filter="url(#fjshadow)"/>
    <rect x="10" y="8" width="250" height="164" rx="28" fill="#FFFFFF" stroke="#2B2926" stroke-width="2.5" stroke-linejoin="round"/>
    
    <!-- Purple FigJam Inner Badge -->
    <rect x="16" y="14" width="238" height="152" rx="24" fill="#9747FF" stroke="#222" stroke-width="1.5"/>
    
    <!-- Marker Icon in upper left -->
    <g transform="translate(34, 30) scale(1.1)">
      <!-- Marker body -->
      <path d="M 4 24 L 18 6 L 32 18 L 18 36 Z" fill="#FFC700" stroke="#222" stroke-width="1.5"/>
      <!-- Marker tip -->
      <path d="M 2 26 L 8 34 L 14 30 L 6 22 Z" fill="#FF7262" stroke="#222" stroke-width="1.5"/>
      <!-- Scribble squiggle -->
      <path d="M 2 38 Q 10 46 22 40 T 38 44" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    </g>

    <!-- FigJam typography -->
    <text x="160" y="72" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="42" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.8">FigJam</text>
    
    <!-- Subtitle pill badge -->
    <rect x="52" y="104" width="166" height="34" rx="17" fill="#FFFFFF" stroke="#222" stroke-width="1.5"/>
    <text x="135" y="127" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="16" fill="#9747FF" text-anchor="middle" letter-spacing="1.5">WHITEBOARD</text>
  </g>
</svg>
`;
}

function getFigJamSketchSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 270 180" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(${angle} 135 90)">
    <rect x="10" y="8" width="250" height="164" rx="28" fill="#ECE8E0" stroke="#363431" stroke-width="3" stroke-linejoin="round"/>
    <rect x="15" y="13" width="240" height="154" rx="24" fill="none" stroke="#7A756C" stroke-width="1" stroke-dasharray="4,4"/>
    <rect x="18" y="16" width="234" height="148" rx="22" fill="#DDD8CF" stroke="#2B2926" stroke-width="2.2"/>
    
    <g transform="translate(34, 30) scale(1.1)">
      <path d="M 4 24 L 18 6 L 32 18 L 18 36 Z" fill="#C9C3B9" stroke="#2B2926" stroke-width="2"/>
      <path d="M 2 26 L 8 34 L 14 30 L 6 22 Z" fill="#B3ACA1" stroke="#2B2926" stroke-width="2"/>
      <path d="M 2 38 Q 10 46 22 40 T 38 44" fill="none" stroke="#2B2926" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <text x="160" y="72" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="42" fill="#2A2927" text-anchor="middle" letter-spacing="0.8">FigJam</text>
    <rect x="52" y="104" width="166" height="34" rx="17" fill="#ECE8E0" stroke="#2B2926" stroke-width="1.8"/>
    <text x="135" y="127" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="16" fill="#2A2927" text-anchor="middle" letter-spacing="1.5">WHITEBOARD</text>
  </g>
</svg>
`;
}

// ============================================================================
// 3. CANVA (LARGE CIRCULAR BADGE) - 185 x 185
// ============================================================================
function getCanvaPaintedSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 190 190" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="cshadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="5" stdDeviation="4.5" flood-color="#140e08" flood-opacity="0.36"/>
    </filter>
    <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00C4CC"/>
      <stop offset="50%" stop-color="#007ACC"/>
      <stop offset="100%" stop-color="#7D2AE8"/>
    </linearGradient>
  </defs>
  <g transform="rotate(${angle} 95 95)">
    <!-- White die-cut circular border -->
    <circle cx="95" cy="95" r="84" fill="#FFFFFF" filter="url(#cshadow)"/>
    <circle cx="95" cy="95" r="84" fill="#FFFFFF" stroke="#2B2926" stroke-width="2.5"/>
    <!-- Gradient inner circle -->
    <circle cx="95" cy="95" r="73" fill="url(#canvaGrad)" stroke="#1F1E1C" stroke-width="1.5"/>
    <!-- Script wordmark -->
    <text x="95" y="109" font-family="'Brush Script MT', 'Segoe Script', 'Caveat', cursive, sans-serif" font-weight="bold" font-size="45" fill="#FFFFFF" text-anchor="middle" font-style="italic" letter-spacing="1">Canva</text>
    <!-- Little star -->
    <path d="M 142 53 L 145 60 L 152 63 L 145 66 L 142 73 L 139 66 L 132 63 L 139 60 Z" fill="#FFFFFF" opacity="0.95"/>
  </g>
</svg>
`;
}

function getCanvaSketchSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 190 190" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(${angle} 95 95)">
    <circle cx="95" cy="95" r="84" fill="#ECE8E0" stroke="#363431" stroke-width="3"/>
    <circle cx="95" cy="95" r="79" fill="none" stroke="#7A756C" stroke-width="1" stroke-dasharray="4,4"/>
    <circle cx="95" cy="95" r="73" fill="#DDD8CF" stroke="#2B2926" stroke-width="2.2"/>
    <line x1="48" y1="70" x2="142" y2="70" stroke="#757067" stroke-width="1"/>
    <line x1="38" y1="85" x2="152" y2="85" stroke="#757067" stroke-width="1"/>
    <line x1="42" y1="120" x2="148" y2="120" stroke="#757067" stroke-width="1"/>
    <line x1="52" y1="135" x2="138" y2="135" stroke="#757067" stroke-width="1"/>
    <text x="95" y="109" font-family="'Brush Script MT', 'Segoe Script', 'Caveat', cursive, sans-serif" font-weight="bold" font-size="45" fill="#2A2927" text-anchor="middle" font-style="italic" letter-spacing="1">Canva</text>
    <path d="M 142 53 L 145 60 L 152 63 L 145 66 L 142 73 L 139 66 L 132 63 L 139 60 Z" fill="#2A2927"/>
  </g>
</svg>
`;
}

// ============================================================================
// 4. UI WIREFRAME / MOBILE SCREEN (LARGE) - 165 x 240
// ============================================================================
function getWireframePaintedSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 170 245" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="wshadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="5" stdDeviation="4.5" flood-color="#140e08" flood-opacity="0.36"/>
    </filter>
  </defs>
  <g transform="rotate(${angle} 85 122)">
    <!-- White die-cut sticker backing -->
    <rect x="8" y="8" width="154" height="229" rx="26" fill="#FFFFFF" filter="url(#wshadow)"/>
    <rect x="8" y="8" width="154" height="229" rx="26" fill="#FFFFFF" stroke="#2B2926" stroke-width="2.5"/>
    
    <!-- Phone body in modern soft canvas -->
    <rect x="14" y="14" width="142" height="217" rx="20" fill="#F8FAFC" stroke="#334155" stroke-width="2"/>
    
    <!-- Dynamic Island / Speaker notch -->
    <rect x="65" y="19" width="40" height="6.5" rx="3.25" fill="#1E293B"/>

    <!-- Wireframe Header -->
    <circle cx="32" cy="38" r="6.5" fill="#94A3B8"/>
    <rect x="44" y="35" width="46" height="5.5" rx="2.5" fill="#64748B"/>
    <circle cx="138" cy="38" r="5" fill="#CBD5E1"/>

    <!-- Hero Card Block (Blue accent) -->
    <rect x="24" y="52" width="122" height="58" rx="10" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.6"/>
    <!-- Wireframe image placeholder -->
    <path d="M 34 94 L 52 70 L 66 86 L 76 76 L 96 96 Z" fill="#93C5FD" opacity="0.6"/>
    <circle cx="42" cy="66" r="4.5" fill="#FBBF24"/>
    <rect x="102" y="66" width="34" height="5.5" rx="2.5" fill="#3B82F6"/>
    <rect x="102" y="76" width="26" height="4" rx="2" fill="#93C5FD"/>

    <!-- 2 UI Content cards -->
    <rect x="24" y="118" width="58" height="42" rx="7" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2"/>
    <rect x="30" y="126" width="30" height="4" rx="2" fill="#64748B"/>
    <rect x="30" y="135" width="44" height="3.5" rx="1.5" fill="#94A3B8"/>
    <rect x="30" y="144" width="26" height="3.5" rx="1.5" fill="#CBD5E1"/>

    <rect x="88" y="118" width="58" height="42" rx="7" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2"/>
    <rect x="94" y="126" width="30" height="4" rx="2" fill="#64748B"/>
    <rect x="94" y="135" width="44" height="3.5" rx="1.5" fill="#94A3B8"/>
    <rect x="94" y="144" width="26" height="3.5" rx="1.5" fill="#CBD5E1"/>

    <!-- Primary CTA Button -->
    <rect x="24" y="168" width="122" height="20" rx="10" fill="#2563EB" stroke="#1D4ED8" stroke-width="1"/>
    <text x="85" y="182" font-family="system-ui, sans-serif" font-weight="bold" font-size="9.5" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">GET STARTED</text>

    <!-- Bottom Tab Bar -->
    <line x1="24" y1="196" x2="146" y2="196" stroke="#E2E8F0" stroke-width="1.2"/>
    <circle cx="40" cy="206" r="4" fill="#2563EB"/>
    <circle cx="70" cy="206" r="4" fill="#94A3B8"/>
    <circle cx="100" cy="206" r="4" fill="#94A3B8"/>
    <circle cx="130" cy="206" r="4" fill="#94A3B8"/>

    <!-- Badge label at bottom: "UI WIREFRAME" -->
    <rect x="28" y="215" width="114" height="13" rx="6.5" fill="#1E293B"/>
    <text x="85" y="225" font-family="system-ui, sans-serif" font-weight="900" font-size="8.5" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">UI WIREFRAME</text>
  </g>
</svg>
`;
}

function getWireframeSketchSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 170 245" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(${angle} 85 122)">
    <rect x="8" y="8" width="154" height="229" rx="26" fill="#ECE8E0" stroke="#363431" stroke-width="3"/>
    <rect x="12" y="12" width="146" height="221" rx="22" fill="none" stroke="#7A756C" stroke-width="1" stroke-dasharray="4,4"/>
    
    <rect x="14" y="14" width="142" height="217" rx="20" fill="#DDD8CF" stroke="#2B2926" stroke-width="2.2"/>
    <rect x="65" y="19" width="40" height="6.5" rx="3.25" fill="#2B2926"/>

    <circle cx="32" cy="38" r="6.5" fill="none" stroke="#2B2926" stroke-width="1.5"/>
    <line x1="44" y1="38" x2="90" y2="38" stroke="#2B2926" stroke-width="2.5"/>
    <circle cx="138" cy="38" r="5" fill="none" stroke="#2B2926" stroke-width="1.5"/>

    <rect x="24" y="52" width="122" height="58" rx="10" fill="#ECE8E0" stroke="#2B2926" stroke-width="1.8"/>
    <path d="M 34 94 L 52 70 L 66 86 L 76 76 L 96 96" fill="none" stroke="#2B2926" stroke-width="1.8"/>
    <circle cx="42" cy="66" r="4.5" fill="none" stroke="#2B2926" stroke-width="1.5"/>
    <line x1="102" y1="69" x2="136" y2="69" stroke="#2B2926" stroke-width="2.5"/>
    <line x1="102" y1="79" x2="128" y2="79" stroke="#2B2926" stroke-width="2"/>

    <rect x="24" y="118" width="58" height="42" rx="7" fill="#ECE8E0" stroke="#2B2926" stroke-width="1.5"/>
    <line x1="30" y1="128" x2="60" y2="128" stroke="#2B2926" stroke-width="2.2"/>
    <line x1="30" y1="137" x2="74" y2="137" stroke="#757067" stroke-width="1.2"/>
    <line x1="30" y1="146" x2="56" y2="146" stroke="#757067" stroke-width="1.2"/>

    <rect x="88" y="118" width="58" height="42" rx="7" fill="#ECE8E0" stroke="#2B2926" stroke-width="1.5"/>
    <line x1="94" y1="128" x2="124" y2="128" stroke="#2B2926" stroke-width="2.2"/>
    <line x1="94" y1="137" x2="138" y2="137" stroke="#757067" stroke-width="1.2"/>
    <line x1="94" y1="146" x2="120" y2="146" stroke="#757067" stroke-width="1.2"/>

    <rect x="24" y="168" width="122" height="20" rx="10" fill="#C9C3B9" stroke="#2B2926" stroke-width="1.5"/>
    <text x="85" y="182" font-family="system-ui, sans-serif" font-weight="bold" font-size="9.5" fill="#2B2926" text-anchor="middle" letter-spacing="1">GET STARTED</text>

    <line x1="24" y1="196" x2="146" y2="196" stroke="#2B2926" stroke-width="1.2"/>
    <circle cx="40" cy="206" r="3.5" fill="#2B2926"/>
    <circle cx="70" cy="206" r="3.5" fill="none" stroke="#2B2926" stroke-width="1.2"/>
    <circle cx="100" cy="206" r="3.5" fill="none" stroke="#2B2926" stroke-width="1.2"/>
    <circle cx="130" cy="206" r="3.5" fill="none" stroke="#2B2926" stroke-width="1.2"/>

    <rect x="28" y="215" width="114" height="13" rx="6.5" fill="#2B2926"/>
    <text x="85" y="225" font-family="system-ui, sans-serif" font-weight="900" font-size="8.5" fill="#ECE8E0" text-anchor="middle" letter-spacing="1">UI WIREFRAME</text>
  </g>
</svg>
`;
}

// ============================================================================
// 5. UX FLOW / USER JOURNEY ILLUSTRATION (LARGE) - 240 x 125
// ============================================================================
function getUxFlowPaintedSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 240 125" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="uxshadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="5" stdDeviation="4.5" flood-color="#140e08" flood-opacity="0.36"/>
    </filter>
  </defs>
  <g transform="rotate(${angle} 120 62)">
    <!-- White die-cut backing -->
    <rect x="8" y="8" width="224" height="109" rx="22" fill="#FFFFFF" filter="url(#uxshadow)"/>
    <rect x="8" y="8" width="224" height="109" rx="22" fill="#FFFFFF" stroke="#2B2926" stroke-width="2.5" stroke-linejoin="round"/>
    
    <!-- Paper inner layer -->
    <rect x="14" y="14" width="212" height="97" rx="18" fill="#FAF9F6" stroke="#EAE5DE" stroke-width="1.2"/>

    <!-- UX Flow Badge Header -->
    <rect x="22" y="20" width="110" height="20" rx="10" fill="#6366F1"/>
    <text x="77" y="34" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">UX USER JOURNEY</text>
    <circle cx="210" cy="28" r="4.5" fill="#10B981"/>

    <!-- Node 1: User Persona / Trigger (Blue) -->
    <g transform="translate(24, 48)">
      <rect x="0" y="0" width="48" height="42" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
      <circle cx="24" cy="15" r="6" fill="#3B82F6"/>
      <path d="M 14 34 C 14 27 18 24 24 24 C 30 24 34 27 34 34 Z" fill="#3B82F6"/>
      <text x="24" y="40" font-family="system-ui, sans-serif" font-weight="800" font-size="6.5" fill="#1E40AF" text-anchor="middle">USER</text>
    </g>

    <!-- Arrow 1 (dashed curve) -->
    <path d="M 76 69 Q 88 61 98 69" fill="none" stroke="#6366F1" stroke-width="2.4" stroke-dasharray="3,3"/>
    <polygon points="98,69 90,65 92,73" fill="#6366F1"/>

    <!-- Node 2: Decision / Wireframe Action (Purple Diamond) -->
    <g transform="translate(100, 47)">
      <polygon points="24,0 48,21 24,42 0,21" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="1.5"/>
      <!-- Lightning bolt inside -->
      <path d="M 24 9 L 20 21 L 26 21 L 23 33 L 29 20 L 23 20 Z" fill="#8B5CF6"/>
    </g>

    <!-- Arrow 2 (dashed curve) -->
    <path d="M 152 69 Q 164 61 174 69" fill="none" stroke="#10B981" stroke-width="2.4" stroke-dasharray="3,3"/>
    <polygon points="174,69 166,65 168,73" fill="#10B981"/>

    <!-- Node 3: Delight / Goal (Emerald Success Screen) -->
    <g transform="translate(176, 48)">
      <rect x="0" y="0" width="44" height="42" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
      <circle cx="22" cy="21" r="12" fill="#10B981"/>
      <path d="M 16 21 L 20 25 L 28 17" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
`;
}

function getUxFlowSketchSvg(w, h, angle = 0) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 240 125" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(${angle} 120 62)">
    <rect x="8" y="8" width="224" height="109" rx="22" fill="#ECE8E0" stroke="#363431" stroke-width="3"/>
    <rect x="12" y="12" width="216" height="101" rx="19" fill="none" stroke="#7A756C" stroke-width="1" stroke-dasharray="4,4"/>
    
    <rect x="22" y="20" width="110" height="20" rx="10" fill="#363431"/>
    <text x="77" y="34" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="#ECE8E0" text-anchor="middle" letter-spacing="1">UX USER JOURNEY</text>
    <circle cx="210" cy="28" r="4.5" fill="#363431"/>

    <!-- Node 1 sketch -->
    <g transform="translate(24, 48)">
      <rect x="0" y="0" width="48" height="42" rx="8" fill="#DDD8CF" stroke="#2B2926" stroke-width="1.8"/>
      <circle cx="24" cy="15" r="6" fill="#2B2926"/>
      <path d="M 14 34 C 14 27 18 24 24 24 C 30 24 34 27 34 34 Z" fill="#2B2926"/>
    </g>

    <path d="M 76 69 Q 88 61 98 69" fill="none" stroke="#2B2926" stroke-width="2.4" stroke-dasharray="3,3"/>
    <polygon points="98,69 90,65 92,73" fill="#2B2926"/>

    <!-- Node 2 sketch -->
    <g transform="translate(100, 47)">
      <polygon points="24,0 48,21 24,42 0,21" fill="#DDD8CF" stroke="#2B2926" stroke-width="1.8"/>
      <path d="M 24 9 L 20 21 L 26 21 L 23 33 L 29 20 L 23 20 Z" fill="#2B2926"/>
    </g>

    <path d="M 152 69 Q 164 61 174 69" fill="none" stroke="#2B2926" stroke-width="2.4" stroke-dasharray="3,3"/>
    <polygon points="174,69 166,65 168,73" fill="#2B2926"/>

    <!-- Node 3 sketch -->
    <g transform="translate(176, 48)">
      <rect x="0" y="0" width="44" height="42" rx="8" fill="#DDD8CF" stroke="#2B2926" stroke-width="1.8"/>
      <circle cx="22" cy="21" r="12" fill="#2B2926"/>
      <path d="M 16 21 L 20 25 L 28 17" fill="none" stroke="#ECE8E0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
`;
}

module.exports = {
  getFigmaPaintedSvg,
  getFigmaSketchSvg,
  getFigJamPaintedSvg,
  getFigJamSketchSvg,
  getCanvaPaintedSvg,
  getCanvaSketchSvg,
  getWireframePaintedSvg,
  getWireframeSketchSvg,
  getUxFlowPaintedSvg,
  getUxFlowSketchSvg
};
