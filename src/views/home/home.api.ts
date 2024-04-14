import http from "@/api/axios";

export interface IGetDaysQuotes {
	key: number;
	chinese: string;
	sentence: string;
	parse: string;
}

export async function getDaysQuotes(key: number): Promise<IGetDaysQuotes> {
	const data = await http.get(`/days/quotes`, {
		params: {
			key: key
		}
	});

	return data.data;
}

export interface IGetDaysPoetry {
	id: string;
	author: string;
	title: string;
	tags: string[];
	paragraphs: string[];
}

export async function getDaysPoetry(key: number): Promise<IGetDaysPoetry> {
	const data = await http.get(`/days/poetry`, {
		params: {
			key: key
		}
	});

	return data.data;
}
