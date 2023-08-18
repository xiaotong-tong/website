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
		lrcType: 3,
		theme: "#E7FBD2",
		audio: [
			{
				name: "ナミダノコエ",
				artist: "Sotte Bosse",
				url: "/musics/Sotte Bosse - ナミダノコエ.mp3",
				cover: "/musics/Sotte Bosse - ナミダノコエ.jpg",
				lrc: "/musics/Sotte Bosse - ナミダノコエ.lrc"
			},
			{
				name: "ごはんを食べよう",
				artist: "Goose house",
				url: "/musics/Goose house - ごはんを食べよう.mp3",
				cover: "/musics/Goose house - ごはんを食べよう.jpg",
				lrc: "/musics/Goose house - ごはんを食べよう.lrc"
			},
			{
				name: "少女進行日記",
				artist: "朱彦安,夏野Natsuno",
				url: "/musics/朱彦安,夏野Natsuno - 少女進行日記.mp3",
				cover: "/musics/朱彦安,夏野Natsuno - 少女進行日記.jpg",
				lrc: "/musics/朱彦安,夏野Natsuno - 少女進行日記.lrc"
			},
			{
				name: "好きだから。",
				artist: "『ユイカ』,れん",
				url: "/musics/『ユイカ』,れん - 好きだから。.mp3",
				cover: "/musics/『ユイカ』,れん - 好きだから。.jpg",
				lrc: "/musics/『ユイカ』,れん - 好きだから。.lrc"
			},
			{
				name: "好きだ",
				artist: "YOASOBI",
				url: "/musics/YOASOBI - 好きだ.mp3",
				cover: "/musics/YOASOBI - 好きだ.jpg",
				lrc: "/musics/YOASOBI - 好きだ.lrc"
			}
		]
	});

	// 默认关闭歌词
	// 这里不使用 ap.lrc.hide()的原因是这个方法调用后不会改变播放器中的歌词按钮的状态
	(aplayerEl.value?.querySelector(".aplayer-icon-lrc") as HTMLElement)?.click();
});
</script>

<style scoped>
#aplayer {
	z-index: 1000;
}
</style>
