<template>
	<Teleport to="body">
		<div
			class="scrollContainer"
			ref="scrollRef"
			:style="{
				'--page-height': -1 * height + 'px'
			}"
			draggable="false"
		>
			<div class="line" aria-hidden="false"></div>
			<img
				@click="emits('click')"
				class="img"
				src="https://image.xtt.moe/local/images/2024/06/13/7cae5f3fc4342fdc.md.png"
				draggable="false"
				alt="scroll to top"
				role="button"
				aria-label="scroll to top"
			/>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import gsap from "gsap";
import { useWindowSize } from "@vueuse/core";

const props = defineProps<{
	scrollY: number;
}>();

const emits = defineEmits(["click"]);

const scrollRef = ref<HTMLElement | null>(null);
const { height } = useWindowSize();

const scrolledBottom = ref(false);

watch(
	() => props.scrollY,
	() => {
		if (props.scrollY > 10 && !scrolledBottom.value) {
			gsap.to(scrollRef.value, {
				y: 0,
				yoyo: true,
				ease: "power1.inOut"
			});

			scrolledBottom.value = true;
		} else if (props.scrollY <= 10 && scrolledBottom.value) {
			gsap.to(scrollRef.value, {
				y: -1 * height.value,
				yoyo: true,
				ease: "power1.inOut"
			});

			scrolledBottom.value = false;
		}
	}
);
</script>

<style scoped>
.scrollContainer {
	z-index: 999;
	width: 200px;
	height: 100lvh;
	position: fixed;
	inset-inline-end: 8px;
	inset-block-end: 8px;
	transform: translateY(var(--page-height, -1000px));
}

.line {
	width: 1px;
	height: 100lvh;
	background-color: #000000;
	position: absolute;
	inset-inline: 71%;
	transform: translateY(-152px);
}

.img {
	width: 100%;
	transform: translateY(calc(100lvh - 216px));
}
</style>
