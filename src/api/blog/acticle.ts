import type { AxiosResponse } from "axios";
import type { Acticle, AddActicleBody, EditActicleBody, ActicleById } from "@/types/acticle";
import http from "../axios";

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

export async function addActicle(body: AddActicleBody): Promise<any> {
	// 数据添加后，清除缓存
	catchs.clear();

	return await http.post("/acticle/add", body);
}

export interface GetActicleListFilters {
	category?: string;
}

export async function getActicleList(params?: GetActicleListFilters): Promise<Acticle[]> {
	// 如果缓存中有数据，直接返回缓存中的数据
	if (params?.category && catchs.has("acticle")) {
		const res = catchs.get("acticle").value.data;
		return res.filter((item: Acticle) => item.category === params.category);
	}

	const data: AxiosResponse<Acticle[]> = await http.get("/acticle/list", {
		params
	});

	// 将数据缓存, 如果有筛选条件，就不缓存
	if (!params?.category) {
		catchs.set("acticle", {
			value: data,
			expires: Date.now() + 1000 * 60 * 10 // 设置缓存时间为10分钟，其实没有意义，因为数据不会改变
		});
	}

	return data.data;
}

export async function getActicleById(id: number): Promise<ActicleById> {
	// 如果缓存中有数据，直接返回缓存中的数据
	if (catchs.has("acticleId" + id)) {
		return catchs.get("acticleId" + id).value;
	}

	const data = (await http.get(`/acticle/${id}`)).data;

	// 将数据缓存
	catchs.set("acticleId" + id, {
		value: data,
		expires: Date.now() + 1000 * 60 * 10 // 设置缓存时间为10分钟，其实没有意义，因为数据不会改变
	});

	return data;
}

export async function editActicleById(id: number, body: EditActicleBody) {
	// 数据修改后，清除缓存
	catchs.clear();

	return await http.put(`/acticle/edit/${id}`, body);
}

export async function deleteActicleById(id: number) {
	// 数据删除后，清除缓存
	catchs.clear();

	return await http.delete(`/acticle/delete/${id}`);
}

export async function getCategories(): Promise<string[]> {
	if (catchs.has("categories")) {
		return catchs.get("categories").value;
	}
	const res = await http.get("/acticle/category/list");

	catchs.set("categories", {
		value: res.data,
		expires: Date.now() + 1000 * 60 * 10 // 设置缓存时间为10分钟，其实没有意义，因为数据不会改变
	});

	return res.data;
}
