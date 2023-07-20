import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("main", () => {
	const localUid = localStorage.getItem("loginUid");

	const loginUid = ref(localUid ? localUid : "");

	return { loginUid };
});
