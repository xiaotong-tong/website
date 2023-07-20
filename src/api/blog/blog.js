import http from "../axios.js";

async function addActicle(body) {
	return await http.post("/acticle/add", body);
}

async function getActicleList() {
	return await http.get("/acticle/list");
}

async function getActicleById(id) {
	return await http.get(`/acticle/${id}`);
}

async function editActicleById(id, body) {
	return await http.put(`/acticle/edit/${id}`, body);
}

async function deleteActicleById(id) {
	return await http.delete(`/acticle/delete/${id}`);
}

export { addActicle, getActicleList, getActicleById, editActicleById, deleteActicleById };
