import http from "../axios.js";

async function addWord(body) {
	return await http.post("/word/add", body);
}

async function getWordList() {
	return await http.get("/word/list");
}

export { addWord, getWordList };
