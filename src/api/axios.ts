import axios from "axios";
import { useUserInfoStore } from "@/stores/user";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use(
	(config) => {
		const userInfoStore = useUserInfoStore();
		if (userInfoStore.userInfo.id) {
			config.headers.authorization = userInfoStore.userInfo.password;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default http;
