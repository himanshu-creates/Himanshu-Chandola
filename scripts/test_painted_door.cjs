const sharp = require('sharp');
const fs = require('fs');

async function testPaintedDoor() {
  const cleanBuf = await sharp('public/textures/corridor/doors/backsingledoors.webp')
    .flop()
    .resize(1024, 2048)
    .raw()
    .toBuffer({ resolveWithObject: true });

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

  const woodTint = await sharp(Buffer.from(woodSvg))
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(1024 * 2048 * 3);
  for (let i = 0; i < out.length; i++) {
    out[i] = Math.round((cleanBuf.data[i] / 255) * woodTint.data[i]);
  }

  await sharp(out, { raw: { width: 1024, height: 2048, channels: 3 } })
    .jpeg({ quality: 90 })
    .toFile('C:/Users/himan/.gemini/antigravity/brain/0772d1c0-8258-4143-878f-29a20b3b69d9/clean_door_painted.jpg');

  console.log('Saved clean_door_painted.jpg successfully');
}

testPaintedDoor().catch(console.error);

