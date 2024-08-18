import { ref } from "vue";
import { defineStore } from "pinia";

import { zhMsg } from "@/locales/zh";
import { jaMsg } from "@/locales/ja";

export const useStateTypeStore = defineStore("stateTypeStore", () => {
	const ActicleCategoryType = ref({
		net: "0",
		lang: "1",
		note: "2",
		test: "3",
		star: "4",
		showText: [
			zhMsg.main.nav.net,
			zhMsg.main.nav.lang,
			zhMsg.main.nav.note,
			"test",
			zhMsg.main.nav.star
		],
		jaShowText: [
			jaMsg.main.nav.net,
			jaMsg.main.nav.lang,
			jaMsg.main.nav.note,
			"test",
			jaMsg.main.nav.star
		]
	});

	return { ActicleCategoryType };
});
