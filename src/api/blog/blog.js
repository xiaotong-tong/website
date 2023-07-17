import http from "../axios.js";

async function addActicle(body) {
	return await http.post("/acticle/add", body);
}

export { addActicle };
