import http from "../axios.js";

const catchs = new Map();

// 目前不需要自动清除缓存，因为后端数据一般情况下不会改变，在数据改变时，手动清除缓存即可
// // 检查 catchs 内的数据是否过期
// setInterval(() => {
// 	for (const [key, value] of catchs) {
// 		if (value.expires < Date.now()) {
// 			catchs.delete(key);
// 		}
// 	}
// }, 1000 * 60 * 5); // 每5分钟检查一次

async function addWord(body) {
	// 数据添加后，清除缓存
	catchs.clear();

	return await http.post("/word/add", body);
}

async function getWordList() {
	if (catchs.has("word")) {
		return catchs.get("word").value;
	}

	const data = await http.get("/word/list");

	catchs.set("word", {
		value: data,
		expires: Date.now() + 1000 * 60 * 10 // 设置缓存时间为10分钟，其实没有意义，因为数据不会改变
	});

	return data;
}

export { addWord, getWordList };
