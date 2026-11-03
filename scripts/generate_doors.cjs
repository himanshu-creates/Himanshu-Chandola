const sharp = require('sharp');

async function generateDoors() {
    // Width: 332, Height: 848
    // LEFT DOOR
    const leftDoorSvg = (painted) => `
    <svg width="332" height="848" viewBox="0 0 332 848" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="woodLeft" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="${painted ? '#f7f4ed' : '#ffffff'}"/>
                <stop offset="50%" stop-color="${painted ? '#ede6d8' : '#fafafa'}"/>
                <stop offset="100%" stop-color="${painted ? '#f0ebd8' : '#ffffff'}"/>
            </linearGradient>
            <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${painted ? '#faf7f0' : '#ffffff'}"/>
                <stop offset="100%" stop-color="${painted ? '#ede5d5' : '#f7f7f7'}"/>
            </linearGradient>
        </defs>

        <!-- Base Wooden Door -->
        <rect x="8" y="8" width="316" height="832" rx="4" fill="url(#woodLeft)" stroke="#222" stroke-width="3"/>

        <!-- Wood Grain subtle lines -->
        <path d="M25 20 L25 828 M60 20 L60 828 M300 20 L300 828" stroke="#333" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="20,15,40,10"/>

        <!-- TOP PANEL (DESIGN & RESEARCH) -->
        <g id="top-panel">
            <rect x="34" y="45" width="264" height="340" rx="6" fill="url(#panelGrad)" stroke="#222" stroke-width="2.5"/>
            <!-- Bevel inner line -->
            <rect x="42" y="53" width="248" height="324" rx="4" fill="none" stroke="#666" stroke-width="1.2" stroke-dasharray="8,4"/>

            <!-- FIGMA BADGE -->
            <g transform="translate(166, 125)">
                <!-- Figma hand-drawn icon -->
                <circle cx="-14" cy="-28" r="14" fill="${painted ? '#f24e1e' : '#fff'}" stroke="#222" stroke-width="2"/>
                <circle cx="14" cy="-28" r="14" fill="${painted ? '#ff7262' : '#fff'}" stroke="#222" stroke-width="2"/>
                <circle cx="-14" cy="0" r="14" fill="${painted ? '#a259ff' : '#fff'}" stroke="#222" stroke-width="2"/>
                <circle cx="14" cy="0" r="14" fill="${painted ? '#1abcfe' : '#fff'}" stroke="#222" stroke-width="2"/>
                <path d="M -28 28 A 14 14 0 0 0 0 28 L 0 14 L -28 14 Z" fill="${painted ? '#0acf83' : '#fff'}" stroke="#222" stroke-width="2"/>
                <text x="0" y="58" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="20" fill="#1a1a1a" text-anchor="middle">FIGMA</text>
            </g>

            <!-- PRODUCT DESIGN & USER RESEARCH BADGES -->
            <g transform="translate(166, 260)">
                <!-- UI/UX Emblem -->
                <rect x="-85" y="-30" width="170" height="42" rx="8" fill="${painted ? '#dbeafe' : '#fff'}" stroke="#1d4ed8" stroke-width="2"/>
                <text x="0" y="-3" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="20" fill="#1e3a8a" text-anchor="middle">PRODUCT DESIGN</text>

                <rect x="-75" y="24" width="150" height="36" rx="6" fill="${painted ? '#fef3c7' : '#fff'}" stroke="#b45309" stroke-width="1.8"/>
                <text x="0" y="48" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="16" fill="#78350f" text-anchor="middle">UI / UX DESIGN</text>
            </g>
        </g>

        <!-- HORIZONTAL RAIL -->
        <rect x="8" y="405" width="316" height="36" fill="url(#woodLeft)" stroke="#222" stroke-width="2"/>
        <line x1="16" y1="423" x2="316" y2="423" stroke="#444" stroke-width="1" stroke-dasharray="10,6"/>

        <!-- BOTTOM PANEL (WIREFRAME & RESEARCH) -->
        <g id="bottom-panel">
            <rect x="34" y="460" width="264" height="330" rx="6" fill="url(#panelGrad)" stroke="#222" stroke-width="2.5"/>
            <rect x="42" y="468" width="248" height="314" rx="4" fill="none" stroke="#666" stroke-width="1.2" stroke-dasharray="8,4"/>

            <!-- User Research Notepad sketch -->
            <g transform="translate(166, 540)">
                <rect x="-65" y="-45" width="130" height="85" rx="6" fill="${painted ? '#fef9c3' : '#fff'}" stroke="#222" stroke-width="2"/>
                <line x1="-50" y1="-25" x2="45" y2="-25" stroke="#444" stroke-width="2"/>
                <line x1="-50" y1="-5" x2="45" y2="-5" stroke="#444" stroke-width="2"/>
                <line x1="-50" y1="15" x2="20" y2="15" stroke="#444" stroke-width="2"/>
                <text x="0" y="65" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="17" fill="#1a1a1a" text-anchor="middle">USER RESEARCH</text>
            </g>

            <!-- Wireframing & Prototyping -->
            <g transform="translate(166, 680)">
                <!-- 2 overlapping wireframe screen icons -->
                <rect x="-55" y="-35" width="60" height="42" rx="4" fill="${painted ? '#f3f4f6' : '#fff'}" stroke="#222" stroke-width="2"/>
                <rect x="-15" y="-20" width="65" height="48" rx="4" fill="${painted ? '#e0e7ff' : '#fff'}" stroke="#4338ca" stroke-width="2"/>
                <!-- header bar inside screen -->
                <line x1="-15" y1="-10" x2="50" y2="-10" stroke="#4338ca" stroke-width="2"/>
                <text x="0" y="52" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="17" fill="#1a1a1a" text-anchor="middle">WIREFRAMING</text>
            </g>
        </g>
    </svg>`;

    // RIGHT DOOR (FRONTEND & DEVELOPMENT)
    const rightDoorSvg = (painted) => `
    <svg width="332" height="848" viewBox="0 0 332 848" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="woodRight" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stop-color="${painted ? '#f7f4ed' : '#ffffff'}"/>
                <stop offset="50%" stop-color="${painted ? '#ede6d8' : '#fafafa'}"/>
                <stop offset="100%" stop-color="${painted ? '#f0ebd8' : '#ffffff'}"/>
            </linearGradient>
            <linearGradient id="panelGradR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${painted ? '#faf7f0' : '#ffffff'}"/>
                <stop offset="100%" stop-color="${painted ? '#ede5d5' : '#f7f7f7'}"/>
            </linearGradient>
        </defs>

        <!-- Base Wooden Door -->
        <rect x="8" y="8" width="316" height="832" rx="4" fill="url(#woodRight)" stroke="#222" stroke-width="3"/>

        <!-- Wood Grain subtle lines -->
        <path d="M30 20 L30 828 M270 20 L270 828 M305 20 L305 828" stroke="#333" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="20,15,40,10"/>

        <!-- TOP PANEL (REACT & JAVASCRIPT) -->
        <g id="top-panel-right">
            <rect x="34" y="45" width="264" height="340" rx="6" fill="url(#panelGradR)" stroke="#222" stroke-width="2.5"/>
            <rect x="42" y="53" width="248" height="324" rx="4" fill="none" stroke="#666" stroke-width="1.2" stroke-dasharray="8,4"/>

            <!-- REACT LOGO -->
            <g transform="translate(166, 130)">
                <ellipse cx="0" cy="0" rx="36" ry="14" fill="none" stroke="${painted ? '#0284c7' : '#222'}" stroke-width="3" transform="rotate(30)"/>
                <ellipse cx="0" cy="0" rx="36" ry="14" fill="none" stroke="${painted ? '#0284c7' : '#222'}" stroke-width="3" transform="rotate(90)"/>
                <ellipse cx="0" cy="0" rx="36" ry="14" fill="none" stroke="${painted ? '#0284c7' : '#222'}" stroke-width="3" transform="rotate(150)"/>
                <circle cx="0" cy="0" r="7" fill="${painted ? '#0284c7' : '#222'}"/>
                <text x="0" y="55" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="20" fill="#1a1a1a" text-anchor="middle">REACT</text>
            </g>

            <!-- JAVASCRIPT & HTML/CSS -->
            <g transform="translate(166, 260)">
                <!-- JS Badge -->
                <rect x="-85" y="-30" width="75" height="52" rx="6" fill="${painted ? '#fef08a' : '#fff'}" stroke="#ca8a04" stroke-width="2"/>
                <text x="-48" y="6" font-family="'Inter', sans-serif" font-weight="900" font-size="24" fill="#854d0e" text-anchor="middle">JS</text>

                <!-- HTML/CSS Badge -->
                <rect x="10" y="-30" width="75" height="52" rx="6" fill="${painted ? '#fed7aa' : '#fff'}" stroke="#ea580c" stroke-width="2"/>
                <text x="47" y="5" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="18" fill="#9a3412" text-anchor="middle">&lt;HTML&gt;</text>

                <text x="0" y="50" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="18" fill="#1a1a1a" text-anchor="middle">FRONTEND DEV</text>
            </g>
        </g>

        <!-- HORIZONTAL RAIL -->
        <rect x="8" y="405" width="316" height="36" fill="url(#woodRight)" stroke="#222" stroke-width="2"/>
        <line x1="16" y1="423" x2="316" y2="423" stroke="#444" stroke-width="1" stroke-dasharray="10,6"/>

        <!-- BOTTOM PANEL (TAILWIND & GIT) -->
        <g id="bottom-panel-right">
            <rect x="34" y="460" width="264" height="330" rx="6" fill="url(#panelGradR)" stroke="#222" stroke-width="2.5"/>
            <rect x="42" y="468" width="248" height="314" rx="4" fill="none" stroke="#666" stroke-width="1.2" stroke-dasharray="8,4"/>

            <!-- TAILWIND CSS -->
            <g transform="translate(166, 545)">
                <!-- Two smooth wave curves -->
                <path d="M-40 0 C-30 -20, -10 -20, 0 0 C10 -15, 25 -15, 35 0 C25 20, 5 20, -5 5 C-15 15, -30 15, -40 0 Z" fill="${painted ? '#38bdf8' : '#fff'}" stroke="#0284c7" stroke-width="2.5"/>
                <text x="0" y="52" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="18" fill="#1a1a1a" text-anchor="middle">TAILWIND CSS</text>
            </g>

            <!-- GIT & GITHUB -->
            <g transform="translate(166, 680)">
                <circle cx="-25" cy="-5" r="9" fill="${painted ? '#f97316' : '#fff'}" stroke="#222" stroke-width="2"/>
                <circle cx="20" cy="-20" r="9" fill="${painted ? '#f97316' : '#fff'}" stroke="#222" stroke-width="2"/>
                <circle cx="20" cy="15" r="9" fill="${painted ? '#f97316' : '#fff'}" stroke="#222" stroke-width="2"/>
                <path d="M-16 -5 L11 -18 M-16 -5 L11 12" stroke="#222" stroke-width="3"/>
                <text x="0" y="52" font-family="'Cabin Sketch', cursive, sans-serif" font-weight="bold" font-size="18" fill="#1a1a1a" text-anchor="middle">GIT &amp; GITHUB</text>
            </g>
        </g>
    </svg>`;

    // Generate Left Door
    await sharp(Buffer.from(leftDoorSvg(false))).webp({ quality: 90 }).toFile('public/textures/doors/door_left_sketch.webp');
    await sharp(Buffer.from(leftDoorSvg(true))).webp({ quality: 90 }).toFile('public/textures/doors/door_left_painted.webp');
    console.log('Generated left door sketch and painted');

    // Generate Right Door
    await sharp(Buffer.from(rightDoorSvg(false))).webp({ quality: 90 }).toFile('public/textures/doors/door_right_sketch.webp');
    await sharp(Buffer.from(rightDoorSvg(true))).webp({ quality: 90 }).toFile('public/textures/doors/door_right_painted.webp');
    console.log('Generated right door sketch and painted');
}

generateDoors().catch(console.error);

