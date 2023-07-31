import axios from "axios";
import { useStore } from "@/stores/index";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use(
	(config) => {
		const store = useStore();
		if (store.loginUid) {
			config.headers.authorization = "Bearer " + store.loginUid;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default http;
