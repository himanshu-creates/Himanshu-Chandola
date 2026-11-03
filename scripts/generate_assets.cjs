const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  console.log('Generating customized assets for Himanshu Chandola...');

  // 1. PahadGrow Sketch
  const pahadgrowSketchSvg = `
    <svg width="1024" height="2048" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="2048" fill="#f6f3eb"/>
      <g stroke="#262626" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 120 1320 L 360 760 L 590 1260 L 800 870 L 930 1340" />
        <path d="M 270 1340 L 480 940 L 710 1340" />
        <path d="M 360 760 L 330 870 M 360 760 L 390 890" />
        <path d="M 800 870 L 780 960 M 800 870 L 830 970" />
        <circle cx="360" cy="760" r="18" fill="#262626"/>
        <circle cx="800" cy="870" r="18" fill="#262626"/>
        <circle cx="512" cy="1120" r="22" fill="#262626"/>
        <circle cx="280" cy="1220" r="16" fill="#262626"/>
        <circle cx="750" cy="1230" r="16" fill="#262626"/>
        <path d="M 360 760 L 512 1120 L 800 870" stroke-dasharray="14 12"/>
        <path d="M 280 1220 L 512 1120 L 750 1230" stroke-dasharray="14 12"/>
        <rect x="50" y="50" width="924" height="1948" rx="24" stroke="#262626" stroke-width="8" fill="none" stroke-dasharray="280 12 240 14"/>
      </g>
      <text x="512" y="380" font-family="sans-serif" font-weight="900" font-size="88" fill="#1a1a1a" text-anchor="middle" letter-spacing="4">PAHADGROW</text>
      <text x="512" y="460" font-family="sans-serif" font-weight="700" font-size="36" fill="#4a4a4a" text-anchor="middle" letter-spacing="2">COMMUNITY &amp; BUSINESS PLATFORM</text>
      <text x="512" y="520" font-family="sans-serif" font-size="28" fill="#666666" text-anchor="middle">Connecting Opportunities Across Uttarakhand</text>
      <text x="512" y="1560" font-family="sans-serif" font-weight="800" font-size="42" fill="#1a1a1a" text-anchor="middle">PRODUCT DESIGN CASE STUDY</text>
      <text x="512" y="1630" font-family="sans-serif" font-weight="600" font-size="32" fill="#444444" text-anchor="middle">User Research • UI/UX Architecture • User Flows</text>
      <text x="512" y="1690" font-family="sans-serif" font-size="28" fill="#666666" text-anchor="middle">pahad-grow.vercel.app</text>
    </svg>
  `;

  // 2. PahadGrow Painted
  const pahadgrowPaintedSvg = `
    <svg width="1024" height="2048" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#cde2ea"/>
          <stop offset="45%" stop-color="#faedd9"/>
          <stop offset="100%" stop-color="#ddead0"/>
        </linearGradient>
        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2d5e4b"/>
          <stop offset="100%" stop-color="#1b3b2e"/>
        </linearGradient>
      </defs>
      <rect width="1024" height="2048" fill="url(#skyGrad)"/>
      <polygon points="120,1350 360,760 590,1260 800,870 930,1350 930,1420 120,1420" fill="url(#mountainGrad)" opacity="0.9"/>
      <polygon points="270,1350 480,940 710,1350" fill="#3f755e" opacity="0.75"/>
      <g fill="#e89838" stroke="#ffffff" stroke-width="5">
        <circle cx="360" cy="760" r="22"/>
        <circle cx="800" cy="870" r="22"/>
        <circle cx="512" cy="1120" r="28" fill="#d94b41"/>
        <circle cx="280" cy="1220" r="20"/>
        <circle cx="750" cy="1230" r="20"/>
      </g>
      <path d="M 360 760 L 512 1120 L 800 870 M 280 1220 L 512 1120 L 750 1230" stroke="#e89838" stroke-width="7" stroke-dasharray="14 10" fill="none"/>
      <rect x="50" y="50" width="924" height="1948" rx="24" stroke="#1b3b2e" stroke-width="10" fill="none"/>
      <text x="512" y="380" font-family="sans-serif" font-weight="900" font-size="88" fill="#1b3b2e" text-anchor="middle" letter-spacing="4">PAHADGROW</text>
      <text x="512" y="460" font-family="sans-serif" font-weight="800" font-size="36" fill="#e89838" text-anchor="middle" letter-spacing="2">COMMUNITY &amp; BUSINESS PLATFORM</text>
      <text x="512" y="520" font-family="sans-serif" font-size="28" fill="#2d5e4b" text-anchor="middle">Connecting Opportunities Across Uttarakhand</text>
      <text x="512" y="1560" font-family="sans-serif" font-weight="900" font-size="42" fill="#1b3b2e" text-anchor="middle">PRODUCT DESIGN CASE STUDY</text>
      <text x="512" y="1630" font-family="sans-serif" font-weight="600" font-size="32" fill="#2d5e4b" text-anchor="middle">User Research • UI/UX Architecture • User Flows</text>
      <text x="512" y="1690" font-family="sans-serif" font-weight="700" font-size="28" fill="#e89838" text-anchor="middle">Live Platform: pahad-grow.vercel.app</text>
    </svg>
  `;

  // 3. Maa Dunagiri Sketch
  const maadunagiriSketchSvg = `
    <svg width="1024" height="2048" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="2048" fill="#f6f3eb"/>
      <g stroke="#262626" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 100 1360 Q 300 1210 500 1290 T 924 1190" stroke-width="9"/>
        <path d="M 100 1430 Q 300 1280 500 1360 T 924 1260" stroke-width="9"/>
        <path d="M 140 960 L 370 660 L 610 960 L 840 730 L 970 960" stroke-width="5"/>
        <path d="M 350 1160 L 410 1050 L 600 1050 L 670 1160 Z" />
        <rect x="320" y="1150" width="380" height="90" rx="20" />
        <circle cx="410" cy="1250" r="36" fill="#262626"/>
        <circle cx="610" cy="1250" r="36" fill="#262626"/>
        <circle cx="512" cy="830" r="35"/>
        <path d="M 547 830 L 615 830 L 615 860 M 585 830 L 585 850" stroke-width="8"/>
        <rect x="50" y="50" width="924" height="1948" rx="24" stroke="#262626" stroke-width="8" fill="none" stroke-dasharray="280 12 240 14"/>
      </g>
      <text x="512" y="370" font-family="sans-serif" font-weight="900" font-size="78" fill="#1a1a1a" text-anchor="middle" letter-spacing="3">MAA DUNAGIRI</text>
      <text x="512" y="450" font-family="sans-serif" font-weight="900" font-size="68" fill="#1a1a1a" text-anchor="middle" letter-spacing="3">RENTAL</text>
      <text x="512" y="520" font-family="sans-serif" font-weight="700" font-size="34" fill="#4a4a4a" text-anchor="middle" letter-spacing="2">ALMORA, UTTARAKHAND</text>
      <text x="512" y="580" font-family="sans-serif" font-size="28" fill="#666666" text-anchor="middle">End-to-End Client Project &amp; Rental UI</text>
      <text x="512" y="1560" font-family="sans-serif" font-weight="800" font-size="42" fill="#1a1a1a" text-anchor="middle">COMPLETE CLIENT WEBSITE</text>
      <text x="512" y="1630" font-family="sans-serif" font-weight="600" font-size="32" fill="#444444" text-anchor="middle">Responsive UI/UX • Frontend Implementation</text>
      <text x="512" y="1690" font-family="sans-serif" font-size="28" fill="#666666" text-anchor="middle">maadunagirirental.in</text>
    </svg>
  `;

  // 4. Maa Dunagiri Painted
  const maadunagiriPaintedSvg = `
    <svg width="1024" height="2048" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#faedd8"/>
          <stop offset="45%" stop-color="#fdf4e8"/>
          <stop offset="100%" stop-color="#e3eef4"/>
        </linearGradient>
      </defs>
      <rect width="1024" height="2048" fill="url(#sunGrad)"/>
      <polygon points="140,960 370,660 610,960 840,730 970,960 970,1110 140,1110" fill="#718792" opacity="0.5"/>
      <path d="M 100 1360 Q 300 1210 500 1290 T 924 1190 L 924 1290 Q 700 1390 500 1390 T 100 1460 Z" fill="#b0bec5"/>
      <polygon points="350,1160 410,1050 600,1050 670,1160" fill="#d84315"/>
      <rect x="320" y="1150" width="380" height="90" rx="20" fill="#bf360c"/>
      <circle cx="410" cy="1250" r="36" fill="#263238"/>
      <circle cx="610" cy="1250" r="36" fill="#263238"/>
      <circle cx="410" cy="1250" r="16" fill="#eceff1"/>
      <circle cx="610" cy="1250" r="16" fill="#eceff1"/>
      <rect x="50" y="50" width="924" height="1948" rx="24" stroke="#bf360c" stroke-width="10" fill="none"/>
      <text x="512" y="370" font-family="sans-serif" font-weight="900" font-size="78" fill="#bf360c" text-anchor="middle" letter-spacing="3">MAA DUNAGIRI</text>
      <text x="512" y="450" font-family="sans-serif" font-weight="900" font-size="68" fill="#bf360c" text-anchor="middle" letter-spacing="3">RENTAL</text>
      <text x="512" y="520" font-family="sans-serif" font-weight="800" font-size="34" fill="#d84315" text-anchor="middle" letter-spacing="2">ALMORA, UTTARAKHAND</text>
      <text x="512" y="580" font-family="sans-serif" font-size="28" fill="#455a64" text-anchor="middle">End-to-End Client Project &amp; Rental UI</text>
      <text x="512" y="1560" font-family="sans-serif" font-weight="900" font-size="42" fill="#bf360c" text-anchor="middle">COMPLETE CLIENT WEBSITE</text>
      <text x="512" y="1630" font-family="sans-serif" font-weight="600" font-size="32" fill="#37474f" text-anchor="middle">Responsive UI/UX • Frontend Implementation</text>
      <text x="512" y="1690" font-family="sans-serif" font-weight="700" font-size="28" fill="#d84315" text-anchor="middle">Live: maadunagirirental.in</text>
    </svg>
  `;

  // 5. Profile Photo Placeholder for Himanshu Chandola
  const profilePlaceholderSvg = `
    <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="1000" fill="#f4f1e8"/>
      <rect x="40" y="40" width="920" height="920" rx="30" stroke="#222" stroke-width="6" fill="none" stroke-dasharray="250 8 200 12"/>
      <circle cx="500" cy="420" r="180" fill="#e8e2d2" stroke="#222" stroke-width="6"/>
      <path d="M 280 820 Q 500 620 720 820" fill="#e8e2d2" stroke="#222" stroke-width="6"/>
      <text x="500" y="700" font-family="sans-serif" font-weight="800" font-size="44" fill="#1a1a1a" text-anchor="middle">HIMANSHU CHANDOLA</text>
      <text x="500" y="760" font-family="sans-serif" font-weight="600" font-size="30" fill="#555" text-anchor="middle">PRODUCT DESIGNER | UI/UX DESIGNER</text>
      <text x="500" y="820" font-family="sans-serif" font-size="24" fill="#888" text-anchor="middle">[ Drop Your Portrait Photo Here ]</text>
    </svg>
  `;

  // 6. Monogram Favicon (HC)
  const faviconSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="100" fill="#1c1c1c"/>
      <text x="256" y="325" font-family="sans-serif" font-weight="900" font-size="230" fill="#f5f2eb" text-anchor="middle" letter-spacing="4">HC</text>
    </svg>
  `;

  // 7. OpenGraph Image (1200x630)
  const ogSvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#f7f5ef"/>
      <rect x="30" y="30" width="1140" height="570" rx="20" stroke="#1c1c1c" stroke-width="4" fill="none"/>
      <text x="600" y="240" font-family="sans-serif" font-weight="900" font-size="64" fill="#1a1a1a" text-anchor="middle" letter-spacing="2">HIMANSHU CHANDOLA</text>
      <text x="600" y="310" font-family="sans-serif" font-weight="700" font-size="34" fill="#e89838" text-anchor="middle" letter-spacing="1">PRODUCT DESIGNER | UI/UX DESIGNER</text>
      <text x="600" y="380" font-family="sans-serif" font-size="26" fill="#555" text-anchor="middle">Interactive 3D Portfolio • Human-Centered Experiences</text>
      <text x="600" y="470" font-family="sans-serif" font-weight="600" font-size="24" fill="#222" text-anchor="middle">PahadGrow • Maa Dunagiri Rental • Pahadi Bhula Production</text>
    </svg>
  `;

  // Save files
  await sharp(Buffer.from(pahadgrowSketchSvg)).webp({ quality: 90 }).toFile('public/textures/gallery/pahadgrow_front.webp');
  await sharp(Buffer.from(pahadgrowPaintedSvg)).webp({ quality: 90 }).toFile('public/textures/gallery/pahadgrow_painted.webp');
  await sharp(Buffer.from(maadunagiriSketchSvg)).webp({ quality: 90 }).toFile('public/textures/gallery/maadunagiri_front.webp');
  await sharp(Buffer.from(maadunagiriPaintedSvg)).webp({ quality: 90 }).toFile('public/textures/gallery/maadunagiri_painted.webp');

  await sharp(Buffer.from(profilePlaceholderSvg)).webp({ quality: 90 }).toFile('public/images/profile-himanshu.webp');
  await sharp(Buffer.from(profilePlaceholderSvg)).webp({ quality: 90 }).toFile('public/textures/about/awatarnachmurce.webp');
  await sharp(Buffer.from(profilePlaceholderSvg)).webp({ quality: 90 }).toFile('public/textures/about/himanshu_avatar.webp');

  await sharp(Buffer.from(faviconSvg)).png().toFile('public/favico.png');
  await sharp(Buffer.from(ogSvg)).webp({ quality: 90 }).toFile('public/og-image.webp');

  console.log('All image and texture assets created successfully!');
}

main().catch(console.error);
