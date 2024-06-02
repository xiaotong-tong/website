import { ref, watch, watchEffect } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage, useCssVar } from "@vueuse/core";
import { initWebBGUrl } from "@/utils/webBG";

const defaultSettingConfig = {
	theme: [
		"#f17559",
		"#f2b25b",
		"#bbf15b",
		"#8bcecb",
		"#ca98c3",
		"#f4b6d1",
		"#a5a9aa",
		"#ffe250",
		"#686868"
	],
	currentThemeIndex: 0,
	// window.matchMedia("(prefers-color-scheme: dark)").matches 用于检测系统是否开启了暗黑模式
	// 如果用户没有设置过主题，那么就使用系统的主题
	isDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
	pageConfig: {
		// 是否显示左下角内容提示
		showContentTip: true
	}
};

export const useStore = defineStore("main", () => {
	const settings = useLocalStorage("settings", defaultSettingConfig);

	// 刷新 localStorage 中的settings
	if (!settings.value.pageConfig) {
		settings.value.pageConfig = defaultSettingConfig.pageConfig;
	}

	// 是否登陆，以及登陆的用户id
	const localUid = localStorage.getItem("loginUid");
	const loginUid = ref(localUid ? localUid : "");

	const isDark = ref(settings.value.isDark);
	const theme = ref(settings.value.theme);
	const currentThemeIndex = ref(settings.value.currentThemeIndex);
	const currentTheme = useCssVar("--d-color");
	currentTheme.value = theme.value[currentThemeIndex.value];

	watch(isDark, (val) => {
		settings.value.isDark = val;
		// 在 isDark 发生变化时，同步改变 body 的 class
		document.body.classList.toggle("theme-dark", !!val);
		// 切换主题时，重新获取背景图片
		initWebBGUrl();
	});

	function changeTheme(index: number) {
		currentThemeIndex.value = index;
		currentTheme.value = theme.value[currentThemeIndex.value];
		settings.value.currentThemeIndex = currentThemeIndex.value;
	}

	function changeThemeOfList(index: number, item: string) {
		theme.value[index] = item;
		settings.value.theme = theme.value;

		if (currentThemeIndex.value === index) {
			currentTheme.value = item;
		}
	}
	function resetDefaultTheme() {
		theme.value = defaultSettingConfig.theme;
		settings.value.theme = theme.value;
		currentTheme.value = theme.value[currentThemeIndex.value];
	}

	const isSmallScreen = ref(window.innerWidth <= 768);

	window.addEventListener("resize", () => {
		isSmallScreen.value = window.innerWidth <= 768;
	});

	// 在 isSmallScreen 发生变化时，同步改变 body 的 class
	watchEffect(() => {
		document.body.classList.toggle("small-screen", !!isSmallScreen.value);
	});

	const pageConfig = ref(settings.value.pageConfig);

	watch(pageConfig, (val) => {
		settings.value.pageConfig = val;
	});

	return {
		loginUid,
		isDark,
		isSmallScreen,
		changeTheme,
		currentTheme,
		theme,
		changeThemeOfList,
		resetDefaultTheme,
		pageConfig
	};
});
