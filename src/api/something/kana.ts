import http from "../axios";

export async function toKana(message: string): Promise<string> {
	const data = await http.post("/ruby/kana/tokana", {
		message: message
	});

	return data.data;
}

export async function toPinyin(message: string): Promise<string> {
	const data = await http.post("/ruby/pinyin/toPinyin", {
		message: message
	});

	return data.data;
}
