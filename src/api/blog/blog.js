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

async function addActicle(body) {
	// 数据添加后，清除缓存
	catchs.clear();

	return await http.post("/acticle/add", body);
}

async function getActicleList(filters) {
	const filterCategory = filters?.category || "";

	// 如果缓存中有数据，直接返回缓存中的数据
	if (catchs.has("acticle" + filterCategory)) {
		return catchs.get("acticle" + filterCategory).value;
	}

	const data = await http.get(
		"/acticle/list",
		filterCategory
			? {
					params: {
						filters: {
							category: filterCategory
						}
					}
			  }
			: undefined
	);

	// 将数据缓存
	catchs.set("acticle" + filterCategory, {
		value: data,
		expires: Date.now() + 1000 * 60 * 10 // 设置缓存时间为10分钟，其实没有意义，因为数据不会改变
	});

	return data;
}

async function getActicleById(id) {
	return await http.get(`/acticle/${id}`);
}

async function editActicleById(id, body) {
	// 数据修改后，清除缓存
	catchs.clear();

	return await http.put(`/acticle/edit/${id}`, body);
}

async function deleteActicleById(id) {
	// 数据删除后，清除缓存
	catchs.clear();

	return await http.delete(`/acticle/delete/${id}`);
}

export { addActicle, getActicleList, getActicleById, editActicleById, deleteActicleById };
