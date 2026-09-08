import sharp from "sharp";

// Circular brand mark for Publications card (replaces Daily Sitecore).
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <circle cx="256" cy="256" r="256" fill="#0f1c2e"/>
  <circle cx="256" cy="256" r="236" fill="none" stroke="#c41e3a" stroke-width="8"/>
  <text x="256" y="230" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#c41e3a" letter-spacing="2">
    INSIGHTS
  </text>
  <text x="256" y="290" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#c41e3a" letter-spacing="2">
    WITH ME
  </text>
  <text x="256" y="360" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="400" fill="#b8c0cc" letter-spacing="4">
    SITECORE &amp; .NET
  </text>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(512, 512)
  .png()
  .toFile("public/images/ds-blog-logo.png");

console.log("wrote public/images/ds-blog-logo.png");
