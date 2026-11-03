const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// =========================================================================
// 1. FIGHTER JET IN FLIGHT (TOP POSITION)
// =========================================================================
function getJetSketchSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="sketch-shadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.22" />
      </filter>
    </defs>

    <!-- Sticker White Paper Badge with Hand-Drawn Edge -->
    <g filter="url(#sketch-shadow)">
      <rect x="20" y="20" width="360" height="360" rx="52" fill="#fcfbf7" stroke="#1c1c1c" stroke-width="4.5" />
      <rect x="28" y="28" width="344" height="344" rx="44" fill="none" stroke="#71717a" stroke-width="1.8" stroke-dasharray="8, 4" opacity="0.6" />
    </g>

    <!-- Background Wind / Speed Contrails -->
    <g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7">
      <path d="M 45 320 C 120 310, 180 270, 220 220" stroke-dasharray="8, 6" />
      <path d="M 60 350 C 140 340, 210 290, 260 230" stroke-dasharray="12, 6" />
      <path d="M 30 180 C 70 160, 120 150, 170 145" stroke-dasharray="6, 5" />
      <path d="M 50 100 Q 70 85 95 90 Q 120 75 145 90 Q 170 85 185 105 Q 120 110 50 100 Z" stroke="#a1a1aa" stroke-width="2" fill="#f4f4f5" opacity="0.8" />
      <path d="M 270 340 Q 295 325 320 330 Q 345 320 365 335 Q 340 355 270 340 Z" stroke="#a1a1aa" stroke-width="2" fill="#f4f4f5" opacity="0.8" />
    </g>

    <!-- FIGHTER JET (Banking dynamic 3/4 angle climbing to top right) -->
    <g transform="translate(195, 195) rotate(-28) translate(-195, -195)">
      <path d="M 90 280 Q 70 320, 40 370" stroke="#71717a" stroke-width="3" stroke-dasharray="5,4" fill="none" opacity="0.6" />
      <path d="M 310 240 Q 325 280, 340 340" stroke="#71717a" stroke-width="3" stroke-dasharray="5,4" fill="none" opacity="0.6" />

      <polygon points="175,290 188,355 198,290" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />
      <polygon points="202,290 212,355 225,290" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />
      <line x1="188" y1="295" x2="188" y2="340" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3,3" />
      <line x1="212" y1="295" x2="212" y2="340" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3,3" />

      <!-- Wings with Missiles -->
      <polygon points="170,220 70,260 65,275 160,265" fill="#f4f4f5" stroke="#1c1c1c" stroke-width="3.5" stroke-linejoin="round" />
      <rect x="60" y="255" width="8" height="30" rx="3" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />

      <polygon points="230,220 330,225 335,240 240,250" fill="#f4f4f5" stroke="#1c1c1c" stroke-width="3.5" stroke-linejoin="round" />
      <rect x="330" y="220" width="8" height="30" rx="3" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />

      <!-- Twin Canted Tails -->
      <polygon points="170,240 148,290 162,295 180,260" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <polygon points="230,240 252,290 238,295 220,260" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <line x1="156" y1="265" x2="168" y2="288" stroke="#71717a" stroke-width="1.5" />
      <line x1="244" y1="265" x2="232" y2="288" stroke="#71717a" stroke-width="1.5" />

      <!-- Stabilators -->
      <polygon points="160,275 130,310 145,315 175,285" fill="#f4f4f5" stroke="#1c1c1c" stroke-width="2.5" />
      <polygon points="240,275 270,305 255,312 225,285" fill="#f4f4f5" stroke="#1c1c1c" stroke-width="2.5" />

      <!-- Fuselage -->
      <path d="M 200 65 
               C 192 100, 185 140, 180 180 
               C 174 210, 168 250, 172 285
               L 228 285
               C 232 250, 226 210, 220 180
               C 215 140, 208 100, 200 65 Z"
            fill="#ffffff" stroke="#1c1c1c" stroke-width="4" stroke-linejoin="round" />

      <!-- Nose Cone -->
      <line x1="200" y1="42" x2="200" y2="65" stroke="#1c1c1c" stroke-width="3" stroke-linecap="round" />
      <path d="M 194 95 Q 200 98 206 95" stroke="#1c1c1c" stroke-width="2" fill="none" />

      <!-- Cockpit Glass Canopy -->
      <path d="M 194 110 Q 200 102 206 110 L 209 160 Q 200 166 191 160 Z"
            fill="#e4e4e7" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <path d="M 195 120 L 205 148" stroke="#1c1c1c" stroke-width="1.5" stroke-dasharray="2,2" />
      <circle cx="200" cy="140" r="5" fill="#52525b" stroke="#1c1c1c" stroke-width="1.5" />

      <!-- Panel Lines -->
      <line x1="184" y1="190" x2="216" y2="190" stroke="#71717a" stroke-width="1.8" />
      <line x1="182" y1="215" x2="218" y2="215" stroke="#71717a" stroke-width="1.8" />
      <line x1="180" y1="245" x2="220" y2="245" stroke="#71717a" stroke-width="1.8" />
    </g>

    <path d="M 330 65 L 333 78 L 346 81 L 333 84 L 330 97 L 327 84 L 314 81 L 327 78 Z" fill="#1c1c1c" />
    <path d="M 60 210 L 62 218 L 70 220 L 62 222 L 60 230 L 58 222 L 50 220 L 58 218 Z" fill="#71717a" />
  </svg>
  `;
}

function getJetPaintedSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e3a8a" />
        <stop offset="45%" stop-color="#2563eb" />
        <stop offset="85%" stop-color="#60a5fa" />
        <stop offset="100%" stop-color="#bae6fd" />
      </linearGradient>
      <linearGradient id="fuselageGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="25%" stop-color="#64748b" />
        <stop offset="50%" stop-color="#94a3b8" />
        <stop offset="75%" stop-color="#475569" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
      <linearGradient id="canopyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="35%" stop-color="#f59e0b" />
        <stop offset="70%" stop-color="#b45309" />
        <stop offset="100%" stop-color="#451a03" />
      </linearGradient>
      <linearGradient id="exhaustGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="20%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#f97316" />
        <stop offset="85%" stop-color="#ef4444" />
        <stop offset="100%" stop-color="rgba(239, 68, 68, 0)" />
      </linearGradient>
      <filter id="p-shadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.32" />
      </filter>
    </defs>

    <g filter="url(#p-shadow)">
      <rect x="20" y="20" width="360" height="360" rx="52" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" />
      <rect x="25" y="25" width="350" height="350" rx="46" fill="url(#skyGrad)" />
    </g>

    <!-- Clouds in background -->
    <g fill="#ffffff" opacity="0.4">
      <ellipse cx="90" cy="110" rx="55" ry="18" />
      <ellipse cx="140" cy="100" rx="40" ry="16" />
      <ellipse cx="310" cy="290" rx="65" ry="22" />
      <ellipse cx="270" cy="300" rx="45" ry="16" />
    </g>

    <!-- Sun Glint -->
    <circle cx="325" cy="75" r="24" fill="#fef9c3" opacity="0.7" />
    <circle cx="325" cy="75" r="10" fill="#ffffff" />
    <path d="M 325 40 L 325 110 M 290 75 L 360 75" stroke="#ffffff" stroke-width="2.5" opacity="0.8" />

    <!-- JET -->
    <g transform="translate(195, 195) rotate(-28) translate(-195, -195)">
      <path d="M 85 275 C 60 310, 40 350, 20 380" stroke="#bae6fd" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.75" />
      <path d="M 315 235 C 330 270, 350 320, 365 370" stroke="#bae6fd" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.75" />

      <polygon points="175,290 188,370 198,290" fill="url(#exhaustGrad)" />
      <polygon points="202,290 212,370 225,290" fill="url(#exhaustGrad)" />
      <polygon points="183,290 188,325 193,290" fill="#ffffff" />
      <polygon points="207,290 212,325 217,290" fill="#ffffff" />

      <!-- Left Delta Wing -->
      <polygon points="170,220 70,260 65,275 160,265" fill="#475569" stroke="#0f172a" stroke-width="3" stroke-linejoin="round" />
      <polygon points="140,230 90,250 85,260 135,255" fill="#334155" />
      <rect x="58" y="250" width="8" height="32" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.8" />
      <polygon points="58,250 62,240 66,250" fill="#ef4444" />

      <!-- Right Delta Wing -->
      <polygon points="230,220 330,225 335,240 240,250" fill="#64748b" stroke="#0f172a" stroke-width="3" stroke-linejoin="round" />
      <polygon points="260,226 310,228 312,238 265,242" fill="#475569" />
      <rect x="330" y="220" width="8" height="32" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.8" />
      <polygon points="330,220 334,210 338,220" fill="#ef4444" />

      <!-- Stabilators -->
      <polygon points="160,275 125,312 142,318 175,285" fill="#334155" stroke="#0f172a" stroke-width="2.5" />
      <polygon points="240,275 275,305 258,312 225,285" fill="#475569" stroke="#0f172a" stroke-width="2.5" />

      <!-- Twin Canted Tails -->
      <polygon points="170,240 148,290 162,295 180,260" fill="#334155" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <polygon points="155,270 149,285 158,288 162,275" fill="#f59e0b" />
      <polygon points="230,240 252,290 238,295 220,260" fill="#475569" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <polygon points="245,270 251,285 242,288 238,275" fill="#f59e0b" />

      <!-- Fuselage -->
      <path d="M 200 65 
               C 192 100, 185 140, 180 180 
               C 174 210, 168 250, 172 285
               L 228 285
               C 232 250, 226 210, 220 180
               C 215 140, 208 100, 200 65 Z"
            fill="url(#fuselageGrad)" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round" />

      <!-- Radome Nose Cone -->
      <path d="M 194 95 Q 200 65 200 65 Q 200 65 206 95 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
      <line x1="200" y1="42" x2="200" y2="65" stroke="#cbd5e1" stroke-width="2.5" />

      <!-- Cockpit Glass Canopy -->
      <path d="M 194 108 Q 200 98 206 108 L 209 162 Q 200 168 191 162 Z"
            fill="url(#canopyGrad)" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <path d="M 196 112 Q 200 104 203 112 L 201 155 Q 198 155 196 150 Z" fill="#ffffff" opacity="0.75" />
      <circle cx="200" cy="142" r="5.5" fill="#1e293b" />
      <circle cx="201" cy="141" r="2.5" fill="#22c55e" />

      <line x1="183" y1="188" x2="217" y2="188" stroke="#0f172a" stroke-width="1.8" />
      <line x1="180" y1="215" x2="220" y2="215" stroke="#0f172a" stroke-width="1.8" />
      <line x1="178" y1="245" x2="222" y2="245" stroke="#0f172a" stroke-width="1.8" />
    </g>

    <rect x="20" y="20" width="360" height="360" rx="52" fill="none" stroke="#0f172a" stroke-width="4.5" />
  </svg>
  `;
}

// =========================================================================
// 2. CRICKET BAT AND BALL (MIDDLE POSITION)
// =========================================================================
function getCricketSketchSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="c-shadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.22" />
      </filter>
    </defs>

    <g filter="url(#c-shadow)">
      <circle cx="200" cy="200" r="175" fill="#fcfbf7" stroke="#1c1c1c" stroke-width="4.5" />
      <circle cx="200" cy="200" r="165" fill="none" stroke="#71717a" stroke-width="2" stroke-dasharray="10, 5" opacity="0.65" />
    </g>

    <g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6">
      <path d="M 60 170 Q 120 140 180 130" stroke-dasharray="6,6" />
      <path d="M 220 280 Q 280 290 340 270" stroke-dasharray="6,6" />
      <path d="M 80 280 Q 140 310 200 320" stroke-dasharray="8,6" />
      <path d="M 120 330 L 130 305 M 135 332 L 140 312 M 150 335 L 160 310 M 240 335 L 245 315 M 255 333 L 265 308 M 275 330 L 280 315" stroke="#71717a" stroke-width="2.5" />
    </g>

    <!-- CRICKET BAT -->
    <g transform="translate(200, 190) rotate(-32) translate(-200, -190)">
      <rect x="188" y="35" width="24" height="115" rx="10" fill="#f4f4f5" stroke="#1c1c1c" stroke-width="3.5" />
      <line x1="188" y1="52" x2="212" y2="52" stroke="#1c1c1c" stroke-width="2" />
      <line x1="188" y1="68" x2="212" y2="68" stroke="#1c1c1c" stroke-width="2" />
      <line x1="188" y1="84" x2="212" y2="84" stroke="#1c1c1c" stroke-width="2" />
      <line x1="188" y1="100" x2="212" y2="100" stroke="#1c1c1c" stroke-width="2" />
      <line x1="188" y1="116" x2="212" y2="116" stroke="#1c1c1c" stroke-width="2" />
      <line x1="188" y1="132" x2="212" y2="132" stroke="#1c1c1c" stroke-width="2" />

      <rect x="187" y="145" width="26" height="15" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2.5" />
      <line x1="187" y1="150" x2="213" y2="150" stroke="#71717a" stroke-width="1.5" />
      <line x1="187" y1="155" x2="213" y2="155" stroke="#71717a" stroke-width="1.5" />

      <path d="M 188 158 
               C 175 172, 162 195, 160 220 
               L 158 335 
               Q 160 350, 175 352 
               L 225 352 
               Q 240 350, 242 335 
               L 240 220 
               C 238 195, 225 172, 212 158 Z"
            fill="#ffffff" stroke="#1c1c1c" stroke-width="4" stroke-linejoin="round" />

      <path d="M 200 160 L 200 348" stroke="#71717a" stroke-width="2.5" stroke-dasharray="6,4" />

      <path d="M 174 195 Q 172 265 172 342" stroke="#71717a" stroke-width="1.8" fill="none" />
      <path d="M 187 185 Q 186 260 186 345" stroke="#71717a" stroke-width="1.8" fill="none" />
      <path d="M 213 185 Q 214 260 214 345" stroke="#71717a" stroke-width="1.8" fill="none" />
      <path d="M 226 195 Q 228 265 228 342" stroke="#71717a" stroke-width="1.8" fill="none" />

      <polygon points="182,185 200,172 218,185 218,208 200,218 182,208" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />
      <text x="200" y="202" font-family="'CabinSketch-Bold', Arial, sans-serif" font-size="12" font-weight="bold" fill="#1c1c1c" text-anchor="middle">HC</text>

      <path d="M 158 335 L 158 345 Q 160 355 175 355 L 225 355 Q 240 355 242 345 L 242 335 Z" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />
    </g>

    <!-- CRICKET BALL -->
    <g transform="translate(265, 255)">
      <ellipse cx="0" cy="52" rx="46" ry="14" fill="#000000" opacity="0.25" />
      <circle cx="0" cy="0" r="48" fill="#f4f4f5" stroke="#1c1c1c" stroke-width="4" />

      <path d="M -38 -28 Q 0 0 38 28" stroke="#1c1c1c" stroke-width="8" stroke-linecap="round" fill="none" />
      <path d="M -38 -28 Q 0 0 38 28" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" />

      <line x1="-36" y1="-32" x2="-32" y2="-22" stroke="#1c1c1c" stroke-width="2" />
      <line x1="-28" y1="-26" x2="-24" y2="-16" stroke="#1c1c1c" stroke-width="2" />
      <line x1="-20" y1="-20" x2="-16" y2="-10" stroke="#1c1c1c" stroke-width="2" />
      <line x1="-12" y1="-14" x2="-8" y2="-4" stroke="#1c1c1c" stroke-width="2" />
      <line x1="-4" y1="-8" x2="0" y2="2" stroke="#1c1c1c" stroke-width="2" />
      <line x1="4" y1="-2" x2="8" y2="8" stroke="#1c1c1c" stroke-width="2" />
      <line x1="12" y1="4" x2="16" y2="14" stroke="#1c1c1c" stroke-width="2" />
      <line x1="20" y1="10" x2="24" y2="20" stroke="#1c1c1c" stroke-width="2" />
      <line x1="28" y1="16" x2="32" y2="26" stroke="#1c1c1c" stroke-width="2" />

      <path d="M -22 28 Q -10 10 0 0" stroke="#71717a" stroke-width="2" stroke-dasharray="3,3" fill="none" />
      <path d="M 0 0 Q 10 -10 22 -28" stroke="#71717a" stroke-width="2" stroke-dasharray="3,3" fill="none" />

      <path d="M -25 -25 A 36 36 0 0 1 15 -42" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
    </g>

    <circle cx="200" cy="200" r="175" fill="none" stroke="#1c1c1c" stroke-width="4.5" />
  </svg>
  `;
}

function getCricketPaintedSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="turfGrad" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="45%" stop-color="#059669" />
        <stop offset="80%" stop-color="#047857" />
        <stop offset="100%" stop-color="#064e3b" />
      </radialGradient>
      <linearGradient id="willowGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#c68b59" />
        <stop offset="20%" stop-color="#e0af7a" />
        <stop offset="50%" stop-color="#f5d0a9" />
        <stop offset="80%" stop-color="#d49b6a" />
        <stop offset="100%" stop-color="#b07442" />
      </linearGradient>
      <radialGradient id="ballGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#f87171" />
        <stop offset="25%" stop-color="#dc2626" />
        <stop offset="65%" stop-color="#991b1b" />
        <stop offset="90%" stop-color="#7f1d1d" />
        <stop offset="100%" stop-color="#450a0a" />
      </radialGradient>
      <filter id="c-p-shadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.32" />
      </filter>
    </defs>

    <g filter="url(#c-p-shadow)">
      <circle cx="200" cy="200" r="175" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" />
      <circle cx="200" cy="200" r="168" fill="url(#turfGrad)" stroke="#34d399" stroke-width="2" />
    </g>

    <circle cx="200" cy="200" r="150" fill="none" stroke="#6ee7b7" stroke-width="1.5" stroke-dasharray="16, 8" opacity="0.4" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#6ee7b7" stroke-width="1.5" stroke-dasharray="12, 6" opacity="0.35" />

    <!-- CRICKET BAT -->
    <g transform="translate(200, 190) rotate(-32) translate(-200, -190)">
      <path d="M 198 165 L 170 340 L 250 340 L 222 165 Z" fill="#042f2e" opacity="0.35" />

      <rect x="188" y="35" width="24" height="115" rx="10" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
      <line x1="188" y1="52" x2="212" y2="52" stroke="#94a3b8" stroke-width="2.5" />
      <line x1="188" y1="68" x2="212" y2="68" stroke="#94a3b8" stroke-width="2.5" />
      <line x1="188" y1="84" x2="212" y2="84" stroke="#94a3b8" stroke-width="2.5" />
      <line x1="188" y1="100" x2="212" y2="100" stroke="#94a3b8" stroke-width="2.5" />
      <line x1="188" y1="116" x2="212" y2="116" stroke="#94a3b8" stroke-width="2.5" />
      <line x1="188" y1="132" x2="212" y2="132" stroke="#94a3b8" stroke-width="2.5" />

      <rect x="187" y="145" width="26" height="15" fill="#fbbf24" stroke="#0f172a" stroke-width="2" />
      <line x1="187" y1="150" x2="213" y2="150" stroke="#b45309" stroke-width="1.5" />
      <line x1="187" y1="155" x2="213" y2="155" stroke="#b45309" stroke-width="1.5" />

      <path d="M 188 158 
               C 175 172, 162 195, 160 220 
               L 158 335 
               Q 160 350, 175 352 
               L 225 352 
               Q 240 350, 242 335 
               L 240 220 
               C 238 195, 225 172, 212 158 Z"
            fill="url(#willowGrad)" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round" />

      <path d="M 174 195 Q 172 265 172 342" stroke="#a16207" stroke-width="1.5" opacity="0.6" fill="none" />
      <path d="M 186 185 Q 185 260 185 345" stroke="#854d0e" stroke-width="1.5" opacity="0.7" fill="none" />
      <path d="M 214 185 Q 215 260 215 345" stroke="#854d0e" stroke-width="1.5" opacity="0.7" fill="none" />
      <path d="M 226 195 Q 228 265 228 342" stroke="#a16207" stroke-width="1.5" opacity="0.6" fill="none" />

      <polygon points="182,185 200,172 218,185 218,208 200,218 182,208" fill="#1e3a8a" stroke="#fbbf24" stroke-width="2.5" />
      <text x="200" y="202" font-family="'CabinSketch-Bold', Arial, sans-serif" font-size="12" font-weight="900" fill="#fbbf24" text-anchor="middle">HC</text>

      <path d="M 158 335 L 158 345 Q 160 355 175 355 L 225 355 Q 240 355 242 345 L 242 335 Z" fill="#0f172a" stroke="#0f172a" stroke-width="2" />
    </g>

    <!-- CRICKET BALL -->
    <g transform="translate(265, 255)">
      <ellipse cx="2" cy="52" rx="46" ry="14" fill="#022c22" opacity="0.55" />
      <circle cx="0" cy="0" r="48" fill="url(#ballGrad)" stroke="#0f172a" stroke-width="3.5" />
      <ellipse cx="-16" cy="-18" rx="16" ry="8" transform="rotate(-30, -16, -18)" fill="#ffffff" opacity="0.45" />

      <path d="M -38 -28 Q 0 0 38 28" stroke="#7f1d1d" stroke-width="9" stroke-linecap="round" fill="none" />
      <path d="M -38 -28 Q 0 0 38 28" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" />

      <line x1="-36" y1="-32" x2="-32" y2="-22" stroke="#0f172a" stroke-width="2.2" />
      <line x1="-28" y1="-26" x2="-24" y2="-16" stroke="#0f172a" stroke-width="2.2" />
      <line x1="-20" y1="-20" x2="-16" y2="-10" stroke="#0f172a" stroke-width="2.2" />
      <line x1="-12" y1="-14" x2="-8" y2="-4" stroke="#0f172a" stroke-width="2.2" />
      <line x1="-4" y1="-8" x2="0" y2="2" stroke="#0f172a" stroke-width="2.2" />
      <line x1="4" y1="-2" x2="8" y2="8" stroke="#0f172a" stroke-width="2.2" />
      <line x1="12" y1="4" x2="16" y2="14" stroke="#0f172a" stroke-width="2.2" />
      <line x1="20" y1="10" x2="24" y2="20" stroke="#0f172a" stroke-width="2.2" />
      <line x1="28" y1="16" x2="32" y2="26" stroke="#0f172a" stroke-width="2.2" />

      <path d="M -22 28 Q -10 10 0 0" stroke="#450a0a" stroke-width="2" stroke-dasharray="3,3" fill="none" />
      <path d="M 0 0 Q 10 -10 22 -28" stroke="#450a0a" stroke-width="2" stroke-dasharray="3,3" fill="none" />
    </g>

    <circle cx="200" cy="200" r="175" fill="none" stroke="#0f172a" stroke-width="4.5" />
  </svg>
  `;
}

// =========================================================================
// 3. MOUNTAIN LANDSCAPE WITH PINE TREES (BOTTOM POSITION)
// =========================================================================
function getMountainSketchSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="m-shadow" x="-5%" y="-10%" width="115%" height="125%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.22" />
      </filter>
    </defs>

    <g filter="url(#m-shadow)">
      <rect x="15" y="15" width="470" height="250" rx="36" fill="#fcfbf7" stroke="#1c1c1c" stroke-width="4.5" />
      <rect x="23" y="23" width="454" height="234" rx="30" fill="none" stroke="#71717a" stroke-width="1.8" stroke-dasharray="10, 5" opacity="0.6" />
    </g>

    <g stroke="#71717a" stroke-width="2" fill="none" opacity="0.7">
      <circle cx="340" cy="70" r="28" stroke="#1c1c1c" stroke-width="2.5" fill="#f4f4f5" />
      <line x1="340" y1="32" x2="340" y2="24" stroke="#71717a" stroke-width="2" />
      <line x1="368" y1="42" x2="374" y2="36" stroke="#71717a" stroke-width="2" />
      <line x1="378" y1="70" x2="386" y2="70" stroke="#71717a" stroke-width="2" />
      <line x1="312" y1="42" x2="306" y2="36" stroke="#71717a" stroke-width="2" />

      <path d="M 60 70 Q 80 55 105 60 Q 130 50 155 65 Q 175 60 190 75 Q 120 85 60 70 Z" stroke="#71717a" fill="#ffffff" />
      <path d="M 370 110 Q 390 95 410 100 Q 430 92 445 105 Q 410 118 370 110 Z" stroke="#71717a" fill="#ffffff" />

      <path d="M 120 95 Q 128 88 136 95 Q 144 88 152 95" stroke="#1c1c1c" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 155 82 Q 161 76 167 82 Q 173 76 179 82" stroke="#1c1c1c" stroke-width="2" stroke-linecap="round" />
    </g>

    <!-- HIMALAYAN PEAKS -->
    <polygon points="30,200 90,135 150,175 220,115 280,180 340,120 400,165 470,200" fill="#f4f4f5" stroke="#71717a" stroke-width="2" />

    <g>
      <polygon points="230,50 150,210 230,210" fill="#ffffff" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <polygon points="230,50 230,210 325,210" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <line x1="230" y1="50" x2="230" y2="210" stroke="#1c1c1c" stroke-width="3.5" />
      <line x1="232" y1="80" x2="255" y2="105" stroke="#71717a" stroke-width="1.8" />
      <line x1="232" y1="105" x2="275" y2="135" stroke="#71717a" stroke-width="1.8" />
      <line x1="232" y1="130" x2="295" y2="165" stroke="#71717a" stroke-width="1.8" />
      <line x1="232" y1="155" x2="315" y2="195" stroke="#71717a" stroke-width="1.8" />
      <path d="M 230 75 L 210 115 L 218 135 L 195 180" stroke="#71717a" stroke-width="1.8" fill="none" />
      <path d="M 230 110 L 222 145 L 226 175" stroke="#71717a" stroke-width="1.8" fill="none" />
    </g>

    <g>
      <polygon points="120,95 40,215 120,215" fill="#ffffff" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <polygon points="120,95 120,215 185,215" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <line x1="120" y1="95" x2="120" y2="215" stroke="#1c1c1c" stroke-width="3" />
      <line x1="122" y1="120" x2="148" y2="145" stroke="#71717a" stroke-width="1.8" />
      <line x1="122" y1="145" x2="168" y2="175" stroke="#71717a" stroke-width="1.8" />
      <line x1="122" y1="170" x2="180" y2="205" stroke="#71717a" stroke-width="1.8" />
    </g>

    <g>
      <polygon points="350,85 275,215 350,215" fill="#ffffff" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <polygon points="350,85 350,215 435,215" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <line x1="350" y1="85" x2="350" y2="215" stroke="#1c1c1c" stroke-width="3" />
      <line x1="352" y1="110" x2="380" y2="135" stroke="#71717a" stroke-width="1.8" />
      <line x1="352" y1="135" x2="405" y2="165" stroke="#71717a" stroke-width="1.8" />
      <line x1="352" y1="160" x2="425" y2="195" stroke="#71717a" stroke-width="1.8" />
    </g>

    <path d="M 230 210 Q 220 225 240 238 Q 210 250 250 262" stroke="#1c1c1c" stroke-width="3" fill="#f4f4f5" />

    <!-- PINE TREES -->
    <g transform="translate(65, 140)">
      <polygon points="0,0 -16,28 -10,28 -22,55 -14,55 -26,85 26,85 14,55 22,55 10,28 16,28" fill="#ffffff" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <rect x="-4" y="85" width="8" height="24" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2.5" />
      <line x1="0" y1="5" x2="0" y2="82" stroke="#1c1c1c" stroke-width="2" />
    </g>
    <g transform="translate(105, 160)">
      <polygon points="0,0 -14,24 -8,24 -18,48 -12,48 -22,72 22,72 12,48 18,48 8,24 14,24" fill="#ffffff" stroke="#1c1c1c" stroke-width="2.8" stroke-linejoin="round" />
      <rect x="-3" y="72" width="6" height="18" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />
    </g>
    <g transform="translate(35, 175)">
      <polygon points="0,0 -12,20 -6,20 -15,40 -9,40 -18,60 18,60 9,40 15,40 6,20 12,20" fill="#ffffff" stroke="#1c1c1c" stroke-width="2.5" />
      <rect x="-3" y="60" width="6" height="15" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />
    </g>
    <g transform="translate(195, 185)">
      <polygon points="0,0 -10,18 -5,18 -14,36 -8,36 -16,55 16,55 8,36 14,36 5,18 10,18" fill="#ffffff" stroke="#1c1c1c" stroke-width="2.2" />
      <rect x="-2.5" y="55" width="5" height="14" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="1.8" />
    </g>
    <g transform="translate(285, 185)">
      <polygon points="0,0 -10,18 -5,18 -14,36 -8,36 -16,55 16,55 8,36 14,36 5,18 10,18" fill="#ffffff" stroke="#1c1c1c" stroke-width="2.2" />
      <rect x="-2.5" y="55" width="5" height="14" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="1.8" />
    </g>
    <g transform="translate(385, 155)">
      <polygon points="0,0 -14,24 -8,24 -18,48 -12,48 -22,74 22,74 12,48 18,48 8,24 14,24" fill="#ffffff" stroke="#1c1c1c" stroke-width="2.8" stroke-linejoin="round" />
      <rect x="-3.5" y="74" width="7" height="20" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2" />
    </g>
    <g transform="translate(435, 135)">
      <polygon points="0,0 -16,28 -10,28 -22,56 -14,56 -26,88 26,88 14,56 22,56 10,28 16,28" fill="#ffffff" stroke="#1c1c1c" stroke-width="3" stroke-linejoin="round" />
      <rect x="-4" y="88" width="8" height="24" fill="#e4e4e7" stroke="#1c1c1c" stroke-width="2.5" />
      <line x1="0" y1="5" x2="0" y2="85" stroke="#1c1c1c" stroke-width="2" />
    </g>

    <path d="M 15 250 Q 150 230 250 255 Q 350 235 485 250" stroke="#1c1c1c" stroke-width="3.5" fill="none" />
    <path d="M 80 248 L 82 238 M 86 248 L 90 236 M 160 245 L 163 234 M 320 248 L 322 236 M 400 248 L 405 235" stroke="#71717a" stroke-width="2" stroke-linecap="round" />

    <rect x="15" y="15" width="470" height="250" rx="36" fill="none" stroke="#1c1c1c" stroke-width="4.5" />
  </svg>
  `;
}

function getMountainPaintedSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mtnSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="40%" stop-color="#38bdf8" />
        <stop offset="75%" stop-color="#bae6fd" />
        <stop offset="100%" stop-color="#fef08a" />
      </linearGradient>
      <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="70%" stop-color="#f0fdf4" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>
      <linearGradient id="mtnShadowGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#64748b" />
        <stop offset="50%" stop-color="#475569" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
      <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0369a1" />
      </linearGradient>
      <filter id="m-p-shadow" x="-5%" y="-10%" width="115%" height="125%">
        <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.32" />
      </filter>
    </defs>

    <g filter="url(#m-p-shadow)">
      <rect x="15" y="15" width="470" height="250" rx="36" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" />
      <rect x="20" y="20" width="460" height="240" rx="32" fill="url(#mtnSkyGrad)" />
    </g>

    <circle cx="340" cy="75" r="28" fill="#fde047" opacity="0.9" />
    <circle cx="340" cy="75" r="22" fill="#fef08a" />
    <g fill="#ffffff" opacity="0.75">
      <ellipse cx="95" cy="65" rx="35" ry="14" />
      <ellipse cx="125" cy="58" rx="25" ry="12" />
      <ellipse cx="380" cy="95" rx="38" ry="14" />
      <ellipse cx="405" cy="90" rx="24" ry="10" />
    </g>

    <path d="M 120 95 Q 128 88 136 95 Q 144 88 152 95" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 155 82 Q 161 76 167 82 Q 173 76 179 82" stroke="#0f172a" stroke-width="2" stroke-linecap="round" fill="none" />

    <polygon points="20,200 90,135 150,175 220,115 280,180 340,120 400,165 480,200" fill="#94a3b8" opacity="0.6" stroke="#64748b" stroke-width="1.5" />

    <g>
      <polygon points="120,95 40,215 120,215" fill="url(#snowGrad)" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <polygon points="120,95 120,215 185,215" fill="url(#mtnShadowGrad)" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <line x1="120" y1="95" x2="65" y2="175" stroke="#fef08a" stroke-width="3" stroke-linecap="round" />
    </g>

    <g>
      <polygon points="350,85 275,215 350,215" fill="url(#snowGrad)" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <polygon points="350,85 350,215 435,215" fill="url(#mtnShadowGrad)" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <line x1="350" y1="85" x2="295" y2="175" stroke="#fef08a" stroke-width="3" stroke-linecap="round" />
    </g>

    <g>
      <polygon points="230,50 150,210 230,210" fill="url(#snowGrad)" stroke="#0f172a" stroke-width="3.2" stroke-linejoin="round" />
      <polygon points="230,50 230,210 325,210" fill="url(#mtnShadowGrad)" stroke="#0f172a" stroke-width="3.2" stroke-linejoin="round" />
      <line x1="230" y1="50" x2="230" y2="210" stroke="#0f172a" stroke-width="3.5" />
      <line x1="230" y1="50" x2="185" y2="140" stroke="#fef08a" stroke-width="3" stroke-linecap="round" />
      <path d="M 230 75 L 210 115 L 218 135 L 195 180" stroke="#cbd5e1" stroke-width="2.5" fill="none" />
      <path d="M 230 110 L 222 145 L 226 175" stroke="#cbd5e1" stroke-width="2.5" fill="none" />
    </g>

    <path d="M 20 220 Q 120 195 230 215 Q 340 198 480 220 L 480 260 L 20 260 Z" fill="#065f46" opacity="0.6" />
    <path d="M 230 210 Q 220 225 240 238 Q 210 250 250 262 L 235 262 Q 198 250 228 238 Q 210 225 220 210 Z" fill="url(#riverGrad)" stroke="#0284c7" stroke-width="1.5" />

    <!-- FOREGROUND PINE TREES -->
    <g transform="translate(65, 140)">
      <rect x="-4" y="85" width="8" height="24" fill="#78350f" stroke="#0f172a" stroke-width="2" />
      <polygon points="0,0 -16,28 -10,28 -22,55 -14,55 -26,85 26,85 14,55 22,55 10,28 16,28" fill="#047857" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <polygon points="0,0 -8,18 0,18" fill="#10b981" />
      <polygon points="-5,28 -14,45 -5,45" fill="#10b981" />
    </g>
    <g transform="translate(105, 160)">
      <rect x="-3" y="72" width="6" height="18" fill="#78350f" stroke="#0f172a" stroke-width="1.8" />
      <polygon points="0,0 -14,24 -8,24 -18,48 -12,48 -22,72 22,72 12,48 18,48 8,24 14,24" fill="#065f46" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round" />
      <polygon points="0,0 -7,16 0,16" fill="#059669" />
    </g>
    <g transform="translate(35, 175)">
      <rect x="-3" y="60" width="6" height="15" fill="#78350f" stroke="#0f172a" stroke-width="1.8" />
      <polygon points="0,0 -12,20 -6,20 -15,40 -9,40 -18,60 18,60 9,40 15,40 6,20 12,20" fill="#047857" stroke="#0f172a" stroke-width="2.2" />
    </g>
    <g transform="translate(195, 185)">
      <rect x="-2.5" y="55" width="5" height="14" fill="#78350f" stroke="#0f172a" stroke-width="1.5" />
      <polygon points="0,0 -10,18 -5,18 -14,36 -8,36 -16,55 16,55 8,36 14,36 5,18 10,18" fill="#064e3b" stroke="#0f172a" stroke-width="2" />
    </g>
    <g transform="translate(285, 185)">
      <rect x="-2.5" y="55" width="5" height="14" fill="#78350f" stroke="#0f172a" stroke-width="1.5" />
      <polygon points="0,0 -10,18 -5,18 -14,36 -8,36 -16,55 16,55 8,36 14,36 5,18 10,18" fill="#064e3b" stroke="#0f172a" stroke-width="2" />
    </g>
    <g transform="translate(385, 155)">
      <rect x="-3.5" y="74" width="7" height="20" fill="#78350f" stroke="#0f172a" stroke-width="1.8" />
      <polygon points="0,0 -14,24 -8,24 -18,48 -12,48 -22,74 22,74 12,48 18,48 8,24 14,24" fill="#065f46" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round" />
      <polygon points="0,0 -7,16 0,16" fill="#059669" />
    </g>
    <g transform="translate(435, 135)">
      <rect x="-4" y="88" width="8" height="24" fill="#78350f" stroke="#0f172a" stroke-width="2" />
      <polygon points="0,0 -16,28 -10,28 -22,56 -14,56 -26,88 26,88 14,56 22,56 10,28 16,28" fill="#047857" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />
      <polygon points="0,0 -8,18 0,18" fill="#10b981" />
    </g>

    <path d="M 15 250 Q 150 230 250 255 Q 350 235 485 250 L 485 260 L 15 260 Z" fill="#047857" />
    <path d="M 15 250 Q 150 230 250 255 Q 350 235 485 250" stroke="#0f172a" stroke-width="3" fill="none" />
    <circle cx="85" cy="244" r="2.5" fill="#fef08a" />
    <circle cx="160" cy="242" r="2.5" fill="#f87171" />
    <circle cx="320" cy="245" r="2.5" fill="#fef08a" />
    <circle cx="400" cy="244" r="2.5" fill="#f87171" />

    <rect x="15" y="15" width="470" height="250" rx="36" fill="none" stroke="#0f172a" stroke-width="4.5" />
  </svg>
  `;
}

// =========================================================================
// MAIN GENERATOR
// =========================================================================
async function buildSocialDoor() {
  const targetDir = path.join(__dirname, '..', 'public', 'textures', 'corridor', 'doors');
  const artifactDir = 'C:/Users/himan/.gemini/antigravity/brain/0772d1c0-8258-4143-878f-29a20b3b69d9';

  console.log('1. Loading base clean door textures...');
  // Clean Sketch Base Door (1024 x 2048) - 100% clean of stickers
  const cleanSketchDoor = await sharp('public/textures/corridor/doors/backsingledoors.webp')
    .flop()
    .resize(1024, 2048)
    .toBuffer();

  // Clean Painted Base Door (1024 x 2048) - Warm natural wood gradient multiplied onto clean door
  const woodSvg = `
  <svg width="1024" height="2048" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ddc0a2"/>
        <stop offset="25%" stop-color="#cfab88"/>
        <stop offset="55%" stop-color="#bf976e"/>
        <stop offset="85%" stop-color="#b88f66"/>
        <stop offset="100%" stop-color="#c9a27b"/>
      </linearGradient>
    </defs>
    <rect width="1024" height="2048" fill="url(#g)"/>
  </svg>
  `;
  const woodPng = await sharp(Buffer.from(woodSvg)).png().toBuffer();
  const cleanPaintedDoor = await sharp(cleanSketchDoor)
    .composite([{ input: woodPng, blend: 'multiply' }])
    .toBuffer();

  console.log('2. Rendering vector illustrations...');
  // 1. Fighter Jet (Width 320, Height 320)
  const jetSketch = await sharp(Buffer.from(getJetSketchSvg(320, 320))).png().toBuffer();
  const jetPainted = await sharp(Buffer.from(getJetPaintedSvg(320, 320))).png().toBuffer();

  // 2. Cricket Bat & Ball (Width 310, Height 310)
  const cricketSketch = await sharp(Buffer.from(getCricketSketchSvg(310, 310))).png().toBuffer();
  const cricketPainted = await sharp(Buffer.from(getCricketPaintedSvg(310, 310))).png().toBuffer();

  // 3. Mountain Landscape (Width 440, Height 250)
  const mountainSketch = await sharp(Buffer.from(getMountainSketchSvg(440, 250))).png().toBuffer();
  const mountainPainted = await sharp(Buffer.from(getMountainPaintedSvg(440, 250))).png().toBuffer();

  // Exact Placements on 1024 x 2048 Door:
  // Top (Jet): centered at cx = 450, cy = 420 -> left: 290, top: 260
  const jetX = 290;
  const jetY = 260;

  // Middle (Cricket): centered at cx = 540, cy = 820 -> left: 385, top: 665
  const cricketX = 385;
  const cricketY = 665;

  // Bottom (Mountain): centered at cx = 500, cy = 1525 -> left: 280, top: 1400
  const mountainX = 280;
  const mountainY = 1400;

  console.log('3. Compositing Sketch Door (drzwisocial.webp)...');
  await sharp(cleanSketchDoor)
    .composite([
      { input: jetSketch, top: jetY, left: jetX },
      { input: cricketSketch, top: cricketY, left: cricketX },
      { input: mountainSketch, top: mountainY, left: mountainX }
    ])
    .webp({ quality: 98, lossless: false })
    .toFile(path.join(targetDir, 'drzwisocial.webp'));
  console.log('Saved public/textures/corridor/doors/drzwisocial.webp');

  console.log('4. Compositing Painted Door (drzwisocial_painted.webp)...');
  await sharp(cleanPaintedDoor)
    .composite([
      { input: jetPainted, top: jetY, left: jetX },
      { input: cricketPainted, top: cricketY, left: cricketX },
      { input: mountainPainted, top: mountainY, left: mountainX }
    ])
    .webp({ quality: 98, lossless: false })
    .toFile(path.join(targetDir, 'drzwisocial_painted.webp'));
  console.log('Saved public/textures/corridor/doors/drzwisocial_painted.webp');

  // Preview exports
  console.log('5. Exporting preview artifacts...');
  await sharp(path.join(targetDir, 'drzwisocial.webp'))
    .resize(512, 1024)
    .jpeg({ quality: 92 })
    .toFile(path.join(artifactDir, 'door_sketch_preview.jpg'));

  await sharp(path.join(targetDir, 'drzwisocial_painted.webp'))
    .resize(512, 1024)
    .jpeg({ quality: 92 })
    .toFile(path.join(artifactDir, 'door_painted_preview.jpg'));

  console.log('Completed successfully!');
}

buildSocialDoor().catch(err => {
  console.error('Error building door:', err);
  process.exit(1);
});
