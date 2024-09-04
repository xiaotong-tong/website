import { useUserInfoStore } from "@/stores/user";

export const myLogin = {
	beforeMount(el: HTMLElement, binding: any) {
		const userInfoStore = useUserInfoStore();

		if (binding.value === false) {
			if (userInfoStore.userInfo.id) {
				el.style.display = "none";
			}
		} else if (!userInfoStore.userInfo.id) {
			el.style.display = "none";
		}
	}
};
