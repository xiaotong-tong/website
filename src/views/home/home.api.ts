import type { AxiosResponse } from "axios";
import http from "@/api/axios";
import { getOne } from "@/utils/array";

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

// 获取首页每日一句
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
	key: number;
	title: string;
	author: string;
	paragraphs: string[];
}

// 获取首页诗词区域， 暂已更改接口
// export async function getDaysPoetry(key: number): Promise<IGetDaysPoetry> {
// 	if (catchMap.has("poetry-" + key)) {
// 		return catchMap.get("poetry-" + key);
// 	}

// 	const data = await http.get(`/days/poetry`, {
// 		params: {
// 			key: key
// 		}
// 	});

// 	catchMap.set("poetry-" + key, data.data);

// 	return data.data;
// }

export async function getDaysPoetry(): Promise<IGetDaysPoetry | null> {
	if (catchMap.has("poetryList")) {
		return getOne(catchMap.get("poetryList"));
	}
	const data: AxiosResponse<IGetDaysPoetry[]> = await http.get(`/days/poetry/self`);

	catchMap.set("poetryList", data.data);

	return getOne(data.data);
}
