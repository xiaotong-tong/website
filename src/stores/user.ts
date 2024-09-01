import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import type { UserInfo } from "@/types/user";

export const useUserInfoStore = defineStore("userInfo", () => {
	const userInfo = useLocalStorage<UserInfo | any>("userInfo", {});

	return {
		userInfo
	};
});
