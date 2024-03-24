import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { zhMsg } from "@/locales/zh";
import { jaMsg } from "@/locales/ja";

const getLang = (): "ja" | "zh" => {
	if (location.pathname.startsWith("/ja")) {
		return "ja";
	}

	let lang = navigator.language;

	if (lang.startsWith("ja")) {
		return "ja";
	}

	return "zh";
};

export const useI18nStore = defineStore("i18n", () => {
	const router = useRouter();

	// 当前语言
	const lang = ref(getLang());

	// 切换 html lang 属性
	document.documentElement.lang = lang.value === "ja" ? "ja" : "zh-CN";

	const messages = ref(lang.value === "zh" ? zhMsg : jaMsg);

	watch(lang, (val) => {
		messages.value = val === "zh" ? zhMsg : jaMsg;

		// 切换 html lang 属性
		document.documentElement.lang = val === "ja" ? "ja" : "zh-CN";

		// 切换到 /ja/xxx 或 /xxx 页面
		const path = router.currentRoute.value.path;
		if (val === "ja" && !path.startsWith("/ja")) {
			router.push("/ja" + path);
		} else if (path.startsWith("/ja")) {
			router.push(path.slice(3));
		}
	});

	return { lang, messages };
});
