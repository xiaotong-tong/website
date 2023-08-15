<template>
	<div id="aplayer" ref="aplayerEl"></div>
</template>

<script setup lang="ts">
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";

import { ref, onMounted } from "vue";

const aplayerEl = ref<HTMLElement | null>(null);

onMounted(() => {
	new APlayer({
		container: (aplayerEl.value as HTMLElement) || document.getElementById("aplayer"),
		fixed: true,
		autoplay: false,
		audio: [
			{
				name: "ナミダノコエ",
				artist: "Sotte Bosse",
				url: "/musics/Sotte Bosse - ナミダノコエ.mp3",
				cover: "/musics/Sotte Bosse - ナミダノコエ.jpg"
			},
			{
				name: "ごはんを食べよう",
				artist: "Goose house",
				url: "/musics/Goose house - ごはんを食べよう.mp3",
				cover: "/musics/Goose house - ごはんを食べよう.jpg"
			}
		]
	});
});
</script>

<style scoped>
#aplayer {
	z-index: 1000;
}
</style>
