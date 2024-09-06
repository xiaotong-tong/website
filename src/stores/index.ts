import type { Ref } from "vue";
import { ref, watch, watchEffect } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage, useUrlSearchParams, useCssVar } from "@vueuse/core";
import { initWebBGUrl } from "@/utils/webBG";

const urlSearchParams = useUrlSearchParams("history", {
	removeNullishValues: true
});

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
		showContentTip: true, // 是否显示左下角内容提示
		showHomeLive2d: true, // 是否显示首页的live2d
		showHomeMusicController: true, // 是否显示首页的音乐控制器
		inlineSize: {
			minPx: 1200, // 最小像素宽度
			percentage: 0.9 // 最大宽度占浏览器的百分比
		},
		mouseSnow: true // 是否开启鼠标移动雪花特效
	},
	piano: true, // 是否自动播放钢琴声
	animeLess: false // 是否减少一些不必要的动画
};

function setDefaultSettingConfig(settings: Ref<typeof defaultSettingConfig>) {
	// 刷新 localStorage 中的settings
	if (settings.value.pageConfig === undefined) {
		settings.value.pageConfig = Object.assign(
			defaultSettingConfig.pageConfig,
			settings.value.pageConfig ?? {}
		);
	}
	if (!settings.value.pageConfig.mouseSnow) {
		settings.value.pageConfig.mouseSnow = defaultSettingConfig.pageConfig.mouseSnow;
	}
}

export const useStore = defineStore("main", () => {
	const settings = useLocalStorage("settings", defaultSettingConfig);

	setDefaultSettingConfig(settings);

	const isDark = ref(settings.value.isDark);
	const theme = ref(settings.value.theme);
	const currentThemeIndex = ref(settings.value.currentThemeIndex);
	const currentTheme = useCssVar("--d-color");
	currentTheme.value = theme.value[currentThemeIndex.value];

	document.body.classList.toggle("theme-dark", !!isDark.value);
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

	const isPiano = ref(settings.value.piano);
	watch(isPiano, (val) => {
		settings.value.piano = val;
	});

	// 少动画模式
	const animeLess = ref(settings.value.animeLess);
	if (urlSearchParams.animeLess) {
		animeLess.value = urlSearchParams.animeLess === "true";
	}
	watch(animeLess, (val) => {
		settings.value.animeLess = val;
		urlSearchParams.animeLess = val ? "true" : (null as unknown as string);
	});

	return {
		isDark,
		isSmallScreen,
		changeTheme,
		currentTheme,
		theme,
		changeThemeOfList,
		resetDefaultTheme,
		pageConfig,
		isPiano,
		animeLess
	};
});
