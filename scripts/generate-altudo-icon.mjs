import sharp from "sharp";

const wordmarkPath =
  "C:/Users/pawank/AppData/Local/Temp/altudo/altudo-logo_grey-(2).svg";
const size = 512;

const wordmarkPng = await sharp(wordmarkPath)
  .resize({ width: 400, height: 120, fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: size,
    height: size,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    {
      input: wordmarkPng,
      gravity: "centre",
    },
  ])
  .png()
  .toFile("public/images/altudo-icon.png");

console.log("wrote public/images/altudo-icon.png");
