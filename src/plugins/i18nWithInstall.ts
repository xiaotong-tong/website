import { createI18n } from "vue-i18n";

import { zhMsg } from "@/locales/zh";
import { jaMsg } from "@/locales/ja";

const i18n = createI18n({
	legacy: false,
	locale: "zh",
	fallbackLocale: "ja",
	messages: {
		zh: zhMsg,
		ja: jaMsg
	}
});

export default i18n;
