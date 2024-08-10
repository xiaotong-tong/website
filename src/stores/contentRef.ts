import type { MaybeRef } from "vue";
import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useElementBounding } from "@vueuse/core";

export const useContentRefStore = defineStore("state", () => {
	const height = ref();
	const width = ref();
	const x = ref();
	const y = ref();
	const isBinded = ref(false);

	const bind = (el: MaybeRef<HTMLElement | null>) => {
		const {
			height: contentHeight,
			width: contentWidth,
			x: contentX,
			y: contentY
		} = useElementBounding(el);

		watch(
			contentHeight,
			() => {
				height.value = contentHeight.value;
			},
			{ immediate: true }
		);

		watch(
			contentWidth,
			() => {
				width.value = contentWidth.value;
			},
			{ immediate: true }
		);

		watch(
			contentX,
			() => {
				x.value = contentX.value;
			},
			{ immediate: true }
		);

		watch(
			contentY,
			() => {
				y.value = contentY.value;
			},
			{ immediate: true }
		);

		isBinded.value = true;
	};

	return { bind, height, width, x, y, isBinded };
});
