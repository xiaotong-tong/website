<template>
	<section>
		<xtt-button ref="btn" @click="togglePIP"> Toggle Picture-in-Picture </xtt-button>

		<iframe
			ref="content"
			hidden
			src="https://xtt.moe/ex/pip"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const btn = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

const togglePIP = async () => {
	if (!(window as any).documentPictureInPicture.window) {
		const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
			width: 500,
			height: 800
		});

		content.value!.removeAttribute("hidden");
		pipWindow.document.body.append(content.value);
	}
};
</script>

<style scoped></style>
