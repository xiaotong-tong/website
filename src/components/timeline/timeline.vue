<template>
	<div :class="['time-line']" ref="timeLineRef">
		<slot></slot>
		<roughLine
			class="divider-line"
			dir="y"
			:style="{
				transform: `translateX(${dividerLeft}px)`
			}"
		></roughLine>
	</div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from "vue";
import { roughLine } from "@c/index";
import { useResizeObserver } from "@vueuse/core";

const timeLineRef = useTemplateRef<HTMLDivElement>("timeLineRef");

const dividerLeft = ref(0);

function changeDividerLeft() {
	if (timeLineRef.value) {
		const divider = timeLineRef.value.querySelector(".timeline-item-divider");
		if (divider) {
			const left = (divider as HTMLElement).offsetLeft;
			const width = (divider as HTMLElement).offsetWidth;
			dividerLeft.value = left + width / 2;
		}
	}
}

useResizeObserver(timeLineRef, changeDividerLeft);
onMounted(() => {
	changeDividerLeft();
});
</script>

<style scoped>
.time-line {
	position: relative;
	padding-block: 24px;
}

.divider-line {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -99;
}
</style>
