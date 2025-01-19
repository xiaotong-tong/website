import axios from "axios";
import { useUserInfoStore } from "@/stores/user";
import { useI18nStore } from "@/stores/i18n";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use(
	(config) => {
		const userInfoStore = useUserInfoStore();
		const i18nStore = useI18nStore();

		if (userInfoStore.userInfo.id) {
			config.headers.authorization = userInfoStore.userInfo.password;
		}

		if (i18nStore.lang) {
			config.headers["Accept-Language"] = i18nStore.lang;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default http;
