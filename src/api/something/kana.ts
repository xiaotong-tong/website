import http from "../axios";

export async function toKana(message: string): Promise<string> {
	const data = await http.post("/kana/tokana", {
		message: message
	});

	return data.data;
}
