<template>
	<component
		ref="line"
		:is="props.is"
		class="nami-line"
		:style="{
			blockSize: typeof props.height === 'number' ? `${props.height}px` : props.height
		}"
	>
		<svg ref="svg" class="nami-svg" v-html="path"></svg>
	</component>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import rough from "roughjs/bundled/rough.esm.js";

interface Props {
	is?: string;
	height?: number | string;
	color?: string;
	strokeWidth?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
	is: "div",
	height: 2,
	color: "#000000",
	strokeWidth: 2
});

const line = ref<HTMLElement | null>(null);
const svg = ref<SVGElement | null>(null);

const path = ref<string>("");

onMounted(() => {
	if (line.value && svg.value) {
		const ract = line.value.getBoundingClientRect();

		svg.value.setAttribute("viewBox", `0 0 ${ract.width} ${ract.height}`);

		path.value = rough.svg(svg.value).rectangle(0, 0, ract.width, ract.height, {
			stroke: props.color,
			strokeWidth: props.strokeWidth
		}).outerHTML;
	}
});
</script>

<style>
.nami-line {
	position: relative;
	display: block;
	width: 100%;
}
.nami-svg {
	position: absolute;
	inset: 0;
}
</style>
