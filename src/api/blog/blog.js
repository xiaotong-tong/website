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

export { addActicle, getActicleList, getActicleById };
