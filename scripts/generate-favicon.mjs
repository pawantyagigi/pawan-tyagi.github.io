import fs from "fs";
import path from "path";
import sharp from "sharp";

function svg(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#ffffff"/>
  <text x="256" y="300" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="280" font-weight="700">
    <tspan fill="#2c2c2c">p</tspan><tspan fill="#5b6fd8">t</tspan>
  </text>
  <rect x="96" y="420" width="320" height="36" rx="4" fill="#1e3a8a"/>
</svg>`;
}

const outDir = "public/favicon";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync("public/favicon.svg", svg(512));

const targets = [
  { file: path.join(outDir, "favicon-16x16.png"), size: 16 },
  { file: path.join(outDir, "favicon-32x32.png"), size: 32 },
  { file: path.join(outDir, "apple-touch-icon.png"), size: 180 },
  { file: path.join(outDir, "android-chrome-192x192.png"), size: 192 },
  { file: path.join(outDir, "android-chrome-512x512.png"), size: 512 },
  { file: path.join(outDir, "round-icon.png"), size: 512 },
  { file: "public/icon.png", size: 512 },
];

for (const t of targets) {
  await sharp(Buffer.from(svg(512)))
    .resize(t.size, t.size)
    .png()
    .toFile(t.file);
  console.log("wrote", t.file);
}

await sharp(Buffer.from(svg(512))).resize(32, 32).png().toFile(path.join(outDir, "favicon.ico"));
await sharp(Buffer.from(svg(512))).resize(32, 32).png().toFile("public/favicon.ico");
console.log("done");
