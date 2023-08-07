import { ref, watch, watchEffect } from "vue";
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

	const isSmallScreen = ref(window.innerWidth <= 768);

	window.addEventListener("resize", () => {
		isSmallScreen.value = window.innerWidth <= 768;
	});

	// 在 isDark 发生变化时，同步改变 body 的 class
	// 在 isSmallScreen 发生变化时，同步改变 body 的 class
	watchEffect(() => {
		document.body.classList.toggle("theme-dark", !!isDark.value);
		document.body.classList.toggle("small-screen", !!isSmallScreen.value);
	});

	return { loginUid, isDark, isSmallScreen };
});
