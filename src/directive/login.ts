import { useUserInfoStore } from "@/stores/user";

export const myLogin = {
	beforeMount(el: HTMLElement, binding: any) {
		const userInfoStore = useUserInfoStore();

		if (binding.value === false) {
			// 登录后隐藏元素
			if (userInfoStore.userInfo.id) {
				el.parentNode?.removeChild(el);
			}
		} else if (!userInfoStore.userInfo.id) {
			// 未登录时隐藏元素
			el.parentNode?.removeChild(el);
		}
	}
};
