/**
 * 将 ttf 字体文件转换为 woff2 字体文件`
 */
const fs = require("fs");
const path = require("path");
const ttf2woff2 = require("ttf2woff2");

const luoLiTi = fs.readFileSync(path.join(__dirname, "../LuoLiTi-2.ttf"));

fs.writeFileSync(path.join(__dirname, "../LuoLiTi-2.woff2"), ttf2woff2(luoLiTi));

const katong = fs.readFileSync(path.join(__dirname, "../katong.ttf"));

fs.writeFileSync(path.join(__dirname, "../katong.woff2"), ttf2woff2(katong)).then(() => {
	// const katongWithSpider = fs.readFileSync(path.join(__dirname, "../.font-spider/katong.ttf"));
	// fs.writeFileSync(
	// 	path.join(__dirname, "../.font-spider/katong.woff2"),
	// 	ttf2woff2(katongWithSpider)
	// );
});
