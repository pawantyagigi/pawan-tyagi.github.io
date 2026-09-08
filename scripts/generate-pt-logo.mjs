import fs from "fs";
import sharp from "sharp";

const square = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#ffffff"/>
  <text x="256" y="300" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="280" font-weight="700">
    <tspan fill="#2c2c2c">p</tspan><tspan fill="#5b6fd8">t</tspan>
  </text>
  <rect x="96" y="420" width="320" height="36" rx="4" fill="#1e3a8a"/>
</svg>`;

const og = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <text x="600" y="360" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="320" font-weight="700">
    <tspan fill="#2c2c2c">p</tspan><tspan fill="#5b6fd8">t</tspan>
  </text>
  <rect x="360" y="520" width="480" height="40" rx="4" fill="#1e3a8a"/>
</svg>`;

await sharp(Buffer.from(square)).resize(512, 512).png().toFile("public/images/logo.png");
await sharp(Buffer.from(og)).resize(1200, 630).png().toFile("public/images/og-default.png");
console.log("wrote public/images/logo.png and public/images/og-default.png");
