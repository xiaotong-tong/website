import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { zhMsg } from "@/locales/zh";
import { jpMsg } from "@/locales/jp";

const getLang = () => {
	if (location.pathname.startsWith("/jp")) {
		return "jp";
	}

	let lang = navigator.language;

	if (lang.startsWith("jp")) {
		return "jp";
	}

	return "zh";
};

export const useI18nStore = defineStore("i18n", () => {
	const router = useRouter();

	// 当前语言
	const lang = ref(getLang());

	const messages = ref(lang.value === "zh" ? zhMsg : jpMsg);

	watch(lang, (val) => {
		messages.value = val === "zh" ? zhMsg : jpMsg;

		// 切换到 /jp/xxx 或 /xxx 页面
		const path = router.currentRoute.value.path;
		if (val === "jp" && !path.startsWith("/jp")) {
			router.push("/jp" + path);
		} else if (path.startsWith("/jp")) {
			router.push(path.slice(3));
		}
	});

	return { lang, messages };
});
