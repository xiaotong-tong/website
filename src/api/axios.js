import axios from "axios";

const http = axios.create({
	// baseURL: "https://xtt.moe/api/"
	baseURL: "http://localhost:5001/"
});

export default http;
