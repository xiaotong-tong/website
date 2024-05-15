import { ref, watch, watchEffect } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage, useCssVar } from "@vueuse/core";

export const useStore = defineStore("main", () => {
	const settings = useLocalStorage("settings", {
		theme: "#f17559",
		// window.matchMedia("(prefers-color-scheme: dark)").matches 用于检测系统是否开启了暗黑模式
		// 如果用户没有设置过主题，那么就使用系统的主题
		isDark: window.matchMedia("(prefers-color-scheme: dark)").matches
	});

	// 是否登陆，以及登陆的用户id
	const localUid = localStorage.getItem("loginUid");
	const loginUid = ref(localUid ? localUid : "");

	const isDark = ref(settings.value.isDark);
	const theme = useCssVar("--d-color");
	theme.value = settings.value.theme;

	watch(isDark, (val) => {
		settings.value.isDark = val;
		// 在 isDark 发生变化时，同步改变 body 的 class
		document.body.classList.toggle("theme-dark", !!val);
	});

	function changeTheme(color: string) {
		theme.value = color;
		settings.value.theme = color;
	}

	const isSmallScreen = ref(window.innerWidth <= 768);

	window.addEventListener("resize", () => {
		isSmallScreen.value = window.innerWidth <= 768;
	});

	// 在 isSmallScreen 发生变化时，同步改变 body 的 class
	watchEffect(() => {
		document.body.classList.toggle("small-screen", !!isSmallScreen.value);
	});

	return { loginUid, isDark, isSmallScreen, changeTheme, theme };
});
