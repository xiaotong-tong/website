/**
 * 将 ttf 字体文件转换为 woff2 字体文件`
 */
const fs = require("fs");
const path = require("path");
const ttf2woff2 = require("ttf2woff2");

const luoLiTi = fs.readFileSync(path.join(__dirname, "../public/fonts/LuoLiTi-2.ttf"));

fs.writeFileSync(path.join(__dirname, "../public/fonts/LuoLiTi-2.woff2"), ttf2woff2(luoLiTi));

const katong = fs.readFileSync(path.join(__dirname, "../public/fonts/katong.ttf"));

fs.writeFileSync(path.join(__dirname, "../public/fonts/katong.woff2"), ttf2woff2(katong));
