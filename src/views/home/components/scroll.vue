<template>
	<Teleport to="body">
		<div class="scrollContainer" ref="scrollRef">
			<div class="line"></div>
			<img
				@click="emits('click')"
				class="img"
				src="https://image.xtt.moe/local/images/2024/06/13/7cae5f3fc4342fdc.md.png"
			/>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import gsap from "gsap";

const props = defineProps<{
	scrollY: number;
}>();

const emits = defineEmits(["click"]);

const scrollRef = ref<HTMLElement | null>(null);

watchEffect(() => {
	if (props.scrollY > 10) {
		const scrollEl = scrollRef.value;

		if (scrollEl) {
			gsap.to(scrollEl, {
				y: 0,
				yoyo: true,
				ease: "power1.inOut"
			});
		}
	} else {
		const scrollEl = scrollRef.value;

		if (scrollEl) {
			gsap.to(scrollEl, {
				y: -1000,
				yoyo: true,
				ease: "power1.inOut"
			});
		}
	}
});
</script>

<style scoped>
.scrollContainer {
	z-index: 999;
	width: 200px;
	height: 100lvh;
	position: fixed;
	inset-inline-end: 8px;
	inset-block-end: 8px;
	transform: translateY(-1000px);
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
