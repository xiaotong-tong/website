import { watch } from "vue";
import { useI18nStore } from "@/stores/i18n";

export const myLang = {
	beforeMount(el: HTMLElement, binding: any) {
		const i18n = useI18nStore();

		// 隐藏不是指定语言的元素
		watch(
			() => i18n.lang,
			() => {
				if (binding.value !== i18n.lang) {
					el.style.display = "none";

					// if (el.parentNode) {
					// 	el.parentNode?.removeChild(el);
					// } else {
					// 	nextTick(() => {
					// 		el.parentNode?.removeChild(el);
					// 	});
					// }
				} else {
					el.style.display = "";
				}
			},
			{
				immediate: true
			}
		);
	}
};
