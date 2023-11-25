import http from "../axios";

export async function chatWithBot(message: string | string[]): Promise<string> {
	const data = await http.post("/chat/bot", {
		message: message
	});

	return data.data;
}
