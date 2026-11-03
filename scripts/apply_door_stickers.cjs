const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {
  getFigmaPaintedSvg,
  getFigmaSketchSvg,
  getCanvaPaintedSvg,
  getCanvaSketchSvg,
  getFigJamPaintedSvg,
  getFigJamSketchSvg,
  getWireframePaintedSvg,
  getWireframeSketchSvg,
  getUxFlowPaintedSvg,
  getUxFlowSketchSvg
} = require('./door_stickers_svg.cjs');

async function applyDoorStickers() {
  const origDir = path.join(__dirname, '..', 'public', 'textures', 'doors_backup_original');
  const targetDir = path.join(__dirname, '..', 'public', 'textures', 'doors');

  console.log('=== STEP 1: LEFT DOOR (PAINTED) ===');
  // Left painted: 810 x 2108
  const figmaPaintedBuf = await sharp(Buffer.from(getFigmaPaintedSvg(280, 260, -3.5))).png().toBuffer();
  const canvaPaintedBuf = await sharp(Buffer.from(getCanvaPaintedSvg(185, 185, 4))).png().toBuffer();
  const wireframePaintedBuf = await sharp(Buffer.from(getWireframePaintedSvg(165, 240, -2))).png().toBuffer();

  const leftPaintedX_Figma = 250;
  const leftPaintedY_Figma = 1140;

  const leftPaintedX_Canva = 470;
  const leftPaintedY_Canva = 810;

  const leftPaintedX_Wireframe = 470;
  const leftPaintedY_Wireframe = 1485;

  await sharp(path.join(origDir, 'door_left_painted.webp'))
    .composite([
      { input: figmaPaintedBuf, top: leftPaintedY_Figma, left: leftPaintedX_Figma },
      { input: canvaPaintedBuf, top: leftPaintedY_Canva, left: leftPaintedX_Canva },
      { input: wireframePaintedBuf, top: leftPaintedY_Wireframe, left: leftPaintedX_Wireframe }
    ])
    .webp({ quality: 96, lossless: false })
    .toFile(path.join(targetDir, 'door_left_painted.webp'));
  console.log('Saved door_left_painted.webp (Figma, Canva, Mobile Wireframe)');

  console.log('=== STEP 2: LEFT DOOR (SKETCH) ===');
  // Left sketch: 332 x 848
  const scaleLX = 332 / 810;
  const scaleLY = 848 / 2108;

  const figmaSketchW = Math.round(280 * scaleLX);
  const figmaSketchH = Math.round(260 * scaleLY);
  const figmaSketchX = Math.round(leftPaintedX_Figma * scaleLX);
  const figmaSketchY = Math.round(leftPaintedY_Figma * scaleLY);

  const canvaSketchW = Math.round(185 * scaleLX);
  const canvaSketchH = Math.round(185 * scaleLY);
  const canvaSketchX = Math.round(leftPaintedX_Canva * scaleLX);
  const canvaSketchY = Math.round(leftPaintedY_Canva * scaleLY);

  const wireframeSketchW = Math.round(165 * scaleLX);
  const wireframeSketchH = Math.round(240 * scaleLY);
  const wireframeSketchX = Math.round(leftPaintedX_Wireframe * scaleLX);
  const wireframeSketchY = Math.round(leftPaintedY_Wireframe * scaleLY);

  const figmaSketchBuf = await sharp(Buffer.from(getFigmaSketchSvg(figmaSketchW, figmaSketchH, -3.5))).png().toBuffer();
  const canvaSketchBuf = await sharp(Buffer.from(getCanvaSketchSvg(canvaSketchW, canvaSketchH, 4))).png().toBuffer();
  const wireframeSketchBuf = await sharp(Buffer.from(getWireframeSketchSvg(wireframeSketchW, wireframeSketchH, -2))).png().toBuffer();

  await sharp(path.join(origDir, 'door_left_sketch.webp'))
    .composite([
      { input: figmaSketchBuf, top: figmaSketchY, left: figmaSketchX },
      { input: canvaSketchBuf, top: canvaSketchY, left: canvaSketchX },
      { input: wireframeSketchBuf, top: wireframeSketchY, left: wireframeSketchX }
    ])
    .webp({ quality: 96, lossless: false })
    .toFile(path.join(targetDir, 'door_left_sketch.webp'));
  console.log('Saved door_left_sketch.webp (Pencil Sketch versions)');

  console.log('=== STEP 3: RIGHT DOOR (PAINTED - REMOVE NODE.JS & ADD FIGJAM + UX FLOW) ===');
  // Right painted: 756 x 1949
  // 1. Remove Node.js by patching with clean painted wood
  const woodPatchPainted = await sharp(path.join(origDir, 'door_left_painted.webp'))
    .extract({ left: 220, top: 1180, width: 380, height: 200 })
    .resize(430, 275)
    .toBuffer();

  // 2. Add FigJam (270 x 180) in the prime central spot where Node.js was
  const figjamPaintedBuf = await sharp(Buffer.from(getFigJamPaintedSvg(270, 180, -2.5))).png().toBuffer();
  const rightPaintedX_FigJam = 230;
  const rightPaintedY_FigJam = 565;

  // 3. Add UX Flow / User Journey illustration (240 x 125) in mid panel
  const uxFlowPaintedBuf = await sharp(Buffer.from(getUxFlowPaintedSvg(240, 125, 2))).png().toBuffer();
  const rightPaintedX_UxFlow = 180;
  const rightPaintedY_UxFlow = 955;

  await sharp(path.join(origDir, 'door_right_painted.webp'))
    .composite([
      { input: woodPatchPainted, top: 545, left: 190 }, // Covers Node.js completely
      { input: figjamPaintedBuf, top: rightPaintedY_FigJam, left: rightPaintedX_FigJam },
      { input: uxFlowPaintedBuf, top: rightPaintedY_UxFlow, left: rightPaintedX_UxFlow }
    ])
    .webp({ quality: 96, lossless: false })
    .toFile(path.join(targetDir, 'door_right_painted.webp'));
  console.log('Saved door_right_painted.webp (Node.js removed, FigJam & UX Flow added)');

  console.log('=== STEP 4: RIGHT DOOR (SKETCH - REMOVE NODE.JS & ADD FIGJAM + UX FLOW SKETCH) ===');
  // Right sketch: 332 x 848
  const scaleRX = 332 / 756;
  const scaleRY = 848 / 1949;

  // 1. Remove Node.js from sketch by patching with clean sketch wood
  const woodPatchSketch = await sharp(path.join(origDir, 'door_left_sketch.webp'))
    .extract({ left: 90, top: 475, width: 160, height: 95 })
    .resize(190, 125)
    .toBuffer();

  const figjamSketchW = Math.round(270 * scaleRX);
  const figjamSketchH = Math.round(180 * scaleRY);
  const figjamSketchX = Math.round(rightPaintedX_FigJam * scaleRX);
  const figjamSketchY = Math.round(rightPaintedY_FigJam * scaleRY);

  const uxFlowSketchW = Math.round(240 * scaleRX);
  const uxFlowSketchH = Math.round(125 * scaleRY);
  const uxFlowSketchX = Math.round(rightPaintedX_UxFlow * scaleRX);
  const uxFlowSketchY = Math.round(rightPaintedY_UxFlow * scaleRY);

  const figjamSketchBuf = await sharp(Buffer.from(getFigJamSketchSvg(figjamSketchW, figjamSketchH, -2.5))).png().toBuffer();
  const uxFlowSketchBuf = await sharp(Buffer.from(getUxFlowSketchSvg(uxFlowSketchW, uxFlowSketchH, 2))).png().toBuffer();

  await sharp(path.join(origDir, 'door_right_sketch.webp'))
    .composite([
      { input: woodPatchSketch, top: Math.round(545 * scaleRY), left: Math.round(190 * scaleRX) }, // Covers Node.js sketch
      { input: figjamSketchBuf, top: figjamSketchY, left: figjamSketchX },
      { input: uxFlowSketchBuf, top: uxFlowSketchY, left: uxFlowSketchX }
    ])
    .webp({ quality: 96, lossless: false })
    .toFile(path.join(targetDir, 'door_right_sketch.webp'));
  console.log('Saved door_right_sketch.webp (Node.js removed, FigJam & UX Flow sketch added)');

  console.log('=== STEP 5: PREVIEWS GENERATION ===');
  // 1. Painted (Hover State)
  const left = await sharp(path.join(targetDir, 'door_left_painted.webp')).resize({ height: 900 }).toBuffer();
  const right = await sharp(path.join(targetDir, 'door_right_painted.webp')).resize({ height: 900 }).toBuffer();
  const leftMeta = await sharp(left).metadata();
  const rightMeta = await sharp(right).metadata();
  const totalW = leftMeta.width + rightMeta.width;

  await sharp({
    create: { width: totalW, height: 900, channels: 3, background: { r: 240, g: 240, b: 240 } }
  })
  .composite([
    { input: left, top: 0, left: 0 },
    { input: right, top: 0, left: leftMeta.width }
  ])
  .jpeg({ quality: 92 })
  .toFile('doors_painted_preview.jpg');

  // 2. Sketch (Default State)
  const leftS = await sharp(path.join(targetDir, 'door_left_sketch.webp')).resize({ height: 900 }).toBuffer();
  const rightS = await sharp(path.join(targetDir, 'door_right_sketch.webp')).resize({ height: 900 }).toBuffer();
  const leftSMeta = await sharp(leftS).metadata();
  const rightSMeta = await sharp(rightS).metadata();
  const totalSW = leftSMeta.width + rightSMeta.width;

  await sharp({
    create: { width: totalSW, height: 900, channels: 3, background: { r: 240, g: 240, b: 240 } }
  })
  .composite([
    { input: leftS, top: 0, left: 0 },
    { input: rightS, top: 0, left: leftSMeta.width }
  ])
  .jpeg({ quality: 92 })
  .toFile('doors_sketch_preview.jpg');

  console.log('All door textures successfully generated and verified!');
}

applyDoorStickers().catch(err => {
  console.error(err);
  process.exit(1);
});

