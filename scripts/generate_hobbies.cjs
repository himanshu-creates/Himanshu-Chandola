const sharp = require('sharp');
const fs = require('fs');

async function generateHobbies() {
    if (!fs.existsSync('public/textures/hobbies')) {
        fs.mkdirSync('public/textures/hobbies', { recursive: true });
    }

    // 1. Cricket illustration
    const cricketSvg = `
    <svg width="1024" height="768" viewBox="0 0 1024 768" xmlns="http://www.w3.org/2000/svg">
        <rect width="1024" height="768" fill="#faf8f5"/>
        <g stroke="#222222" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">
            <path d="M100 640 Q 512 630, 924 640 M 120 655 Q 512 645, 900 655" stroke-dasharray="12,8"/>
            <rect x="340" y="280" width="18" height="360" rx="8" fill="#ede6da"/>
            <rect x="380" y="280" width="18" height="360" rx="8" fill="#ede6da"/>
            <rect x="420" y="280" width="18" height="360" rx="8" fill="#ede6da"/>
            <rect x="330" y="265" width="55" height="15" rx="6" fill="#d8ccb8"/>
            <rect x="395" y="265" width="55" height="15" rx="6" fill="#d8ccb8"/>

            <g transform="translate(540, 240) rotate(18)">
                <rect x="28" y="0" width="24" height="160" rx="10" fill="#f3eedf"/>
                <line x1="28" y1="30" x2="52" y2="30"/>
                <line x1="28" y1="60" x2="52" y2="60"/>
                <line x1="28" y1="90" x2="52" y2="90"/>
                <line x1="28" y1="120" x2="52" y2="120"/>
                <path d="M10 160 Q 40 150, 70 160 L 75 440 Q 40 455, 5 440 Z" fill="#d4be9b"/>
                <path d="M25 180 L 30 430 M 55 180 L 50 430" stroke="#888" stroke-width="2" stroke-dasharray="6,4"/>
            </g>

            <g transform="translate(680, 560)">
                <circle cx="50" cy="50" r="48" fill="#b91c1c"/>
                <path d="M10 30 Q 50 50, 90 70" stroke="#ffffff" stroke-width="4" stroke-dasharray="4,4"/>
                <ellipse cx="50" cy="105" rx="45" ry="12" fill="#d4cebe" opacity="0.5"/>
            </g>
        </g>
        <text x="512" y="140" font-family="Arial, sans-serif" font-weight="900" font-size="56" fill="#1a1a1a" text-anchor="middle" letter-spacing="6">CRICKET</text>
        <text x="512" y="190" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#555" text-anchor="middle">Strategy, Teamwork &amp; Athletic Focus</text>
    </svg>`;

    await sharp(Buffer.from(cricketSvg)).webp({ quality: 90 }).toFile('public/textures/hobbies/cricket_front.webp');
    await sharp(Buffer.from(cricketSvg)).modulate({ saturation: 1.25 }).webp({ quality: 90 }).toFile('public/textures/hobbies/cricket_painted.webp');
    console.log('Cricket textures created');

    // 2. Drawing & Sketchbook illustration
    const rings = [60, 86, 112, 138, 164, 190, 216, 242, 268, 294, 320, 346].map(y => `<ellipse cx="310" cy="${y}" rx="12" ry="5" stroke="#333" fill="#aaa"/>`).join('');

    const drawingSvg = `
    <svg width="1024" height="768" viewBox="0 0 1024 768" xmlns="http://www.w3.org/2000/svg">
        <rect width="1024" height="768" fill="#faf8f5"/>
        <g stroke="#222222" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">
            <g transform="translate(200, 220)">
                <path d="M30 40 Q 170 30, 310 45 L 310 380 Q 170 365, 30 380 Z" fill="#fffdfa"/>
                <path d="M310 45 Q 450 30, 590 40 L 590 380 Q 450 365, 310 380 Z" fill="#fffdfa"/>
                <line x1="310" y1="40" x2="310" y2="385" stroke-width="6" stroke="#777"/>
                ${rings}
                <path d="M90 140 Q 160 90, 230 140 Q 160 190, 90 140" stroke-width="3"/>
                <circle cx="160" cy="140" r="22" fill="#333"/>
                <path d="M100 240 L 160 210 L 220 240 L 160 270 Z M 100 240 L 100 300 L 160 330 L 160 270 M 220 240 L 220 300 L 160 330" stroke-width="2" stroke="#444"/>
                <path d="M360 220 L 410 130 L 460 190 L 500 120 L 560 220 Z" stroke-width="3"/>
                <rect x="360" y="240" width="180" height="110" rx="8" stroke-width="2" stroke="#2563eb" stroke-dasharray="6,4"/>
            </g>

            <g transform="translate(680, 180) rotate(42)">
                <polygon points="0,0 28,0 28,260 0,260" fill="#f59e0b"/>
                <polygon points="0,260 28,260 14,310" fill="#e2d4be"/>
                <polygon points="10,295 18,295 14,310" fill="#111827"/>
                <rect x="0" y="-25" width="28" height="25" rx="4" fill="#ef4444"/>
                <rect x="0" y="-6" width="28" height="6" fill="#9ca3af"/>
            </g>
        </g>
        <text x="512" y="140" font-family="Arial, sans-serif" font-weight="900" font-size="56" fill="#1a1a1a" text-anchor="middle" letter-spacing="6">DRAWING</text>
        <text x="512" y="190" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#555" text-anchor="middle">Observational Sketches, Form &amp; Ideation</text>
    </svg>`;

    await sharp(Buffer.from(drawingSvg)).webp({ quality: 90 }).toFile('public/textures/hobbies/drawing_front.webp');
    await sharp(Buffer.from(drawingSvg)).modulate({ saturation: 1.25 }).webp({ quality: 90 }).toFile('public/textures/hobbies/drawing_painted.webp');
    console.log('Drawing textures created');
}

generateHobbies().catch(console.error);

