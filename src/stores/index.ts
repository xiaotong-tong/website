import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("main", () => {
	// 是否登陆，以及登陆的用户id
	const localUid = localStorage.getItem("loginUid");
	const loginUid = ref(localUid ? localUid : "");

	const settings = JSON.parse(localStorage.getItem("settings") || "{}");

	const isDark = ref(settings.isDark || false);

	// 在 isDark 发生变化时，同步改变 localStorage 中的设置
	watch(isDark, (val) => {
		const settings = JSON.parse(localStorage.getItem("settings") || "{}");
		settings.isDark = val;
		localStorage.setItem("settings", JSON.stringify(settings));
	});

	return { loginUid, isDark };
});
