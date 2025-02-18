import { useUserInfoStore } from "@/stores/user";
import { nextTick } from "vue";

export const myLogin = {
	beforeMount(el: HTMLElement, binding: any) {
		const userInfoStore = useUserInfoStore();

		if (typeof binding.value === "number") {
			// 登陆的用户id和当前用户id不一致时隐藏元素
			if (userInfoStore.userInfo.id !== binding.value) {
				nextTick(() => {
					el.parentNode?.removeChild(el);
				});
			}
		} else if (binding.value === false) {
			// 登录后隐藏元素
			if (userInfoStore.userInfo.id) {
				el.parentNode?.removeChild(el);
			}
		} else if (!userInfoStore.userInfo.id) {
			// 未登录时隐藏元素
			el.parentNode?.removeChild(el);

			// 如果当前元素没有父节点，那么尝试在下一个tick中删除
			if (el.parentNode === null) {
				nextTick(() => {
					el.parentNode?.removeChild(el);
				});
			}
		}
	}
};
