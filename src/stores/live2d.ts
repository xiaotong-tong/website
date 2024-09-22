import { ref } from "vue";
import { defineStore } from "pinia";

export const useLive2dStore = defineStore("live2dStore", () => {
	// live2d 文件是否加载完成
	const live2dLoaded = ref(false);

	return { live2dLoaded };
});
