import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter, useRoute } from "vue-router";

import { zhMsg } from "@/locales/zh";
import { jpMsg } from "@/locales/jp";

const getLang = () => {
	let lang = navigator.language;

	const route = useRoute();
	if (route.query.lang) {
		lang = route.query.lang as string;
	}

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

		// 往 router 中添加语言 hash 参数
		router.push({ query: { lang: val } });
	});

	return { lang, messages };
});
