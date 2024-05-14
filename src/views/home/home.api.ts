import http from "@/api/axios";

const catchMap = new Map();

export interface IGetDaysQuotes {
	key: number;
	chinese: string;
	sentence: string;
	parse: string;
}

export interface IGetDaysQuotesError {
	message: string;
	maxKey: number;
}

export async function getDaysQuotes(key: number): Promise<IGetDaysQuotes> {
	if (catchMap.has("quotes-" + key)) {
		return catchMap.get("quotes-" + key);
	}

	try {
		const data = await http.get(`/days/quotes`, {
			params: {
				key: key
			}
		});

		catchMap.set("quotes-" + key, data.data);

		return data.data;
	} catch (error: any) {
		throw error.response.data as IGetDaysQuotesError;
	}
}

export interface IGetDaysPoetry {
	id: string;
	author: string;
	title: string;
	tags: string[];
	paragraphs: string[];
}

export async function getDaysPoetry(key: number): Promise<IGetDaysPoetry> {
	if (catchMap.has("poetry-" + key)) {
		return catchMap.get("poetry-" + key);
	}

	const data = await http.get(`/days/poetry`, {
		params: {
			key: key
		}
	});

	catchMap.set("poetry-" + key, data.data);

	return data.data;
}
