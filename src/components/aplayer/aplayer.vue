<template>
	<div id="aplayer" ref="aplayerEl"></div>
</template>

<script setup lang="ts">
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";

import { ref, onMounted } from "vue";

const aplayerEl = ref<HTMLElement | null>(null);

const audioList = [
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
];

onMounted(() => {
	const ap: any = new APlayer({
		container: (aplayerEl.value as HTMLElement) || document.getElementById("aplayer"),
		fixed: true,
		autoplay: false,
		lrcType: 3,
		theme: "#E7FBD2",
		audio: audioList
	});

	// 默认关闭歌词
	// 这里不使用 ap.lrc.hide()的原因是这个方法调用后不会改变播放器中的歌词按钮的状态
	(aplayerEl.value?.querySelector(".aplayer-icon-lrc") as HTMLElement)?.click();

	let setMediaSessionOfFirstAudio = () => {
		if ("mediaSession" in navigator) {
			// 播放音乐时，设置媒体会话，如果已经有 metadata 信息，就不在设置，否则设置为第一首音乐的信息
			if (navigator.mediaSession.metadata) {
				return;
			}

			const audio = audioList[0];
			navigator.mediaSession.metadata = new MediaMetadata({
				title: audio.name,
				artist: audio.artist,
				album: audio.cover,
				artwork: [{ src: audio.cover }]
			});

			setMediaSessionOfFirstAudio = () => {};
		}
	};
	ap.on("play", () => {
		setMediaSessionOfFirstAudio();
	});

	// 切换音乐时，设置媒体会话信息，但是这里不会设置初始加载时的第一首音乐的信息
	ap.on("listswitch", (index: { index: number }) => {
		if ("mediaSession" in navigator) {
			const audio = audioList[index.index];
			navigator.mediaSession.metadata = new MediaMetadata({
				title: audio.name,
				artist: audio.artist,
				album: audio.cover,
				artwork: [{ src: audio.cover }]
			});
		}
	});

	// 设置媒体会话的行为
	if ("mediaSession" in navigator) {
		// 播放
		navigator.mediaSession.setActionHandler("play", function () {
			ap.play();
		});
		// 暂停
		navigator.mediaSession.setActionHandler("pause", function () {
			ap.pause();
		});
		// 后退，如果 seekOffset 存在，就使用 seekOffset，否则默认 10 秒
		navigator.mediaSession.setActionHandler("seekbackward", function (action) {
			const { seekOffset = 10 } = action;
			ap.seek(Math.max(ap.audio.currentTime - seekOffset, 0));
		});
		// 前进，如果 seekOffset 存在，就使用 seekOffset，否则默认 10 秒
		navigator.mediaSession.setActionHandler("seekforward", function (action) {
			const { seekOffset = 10 } = action;
			ap.seek(Math.min(ap.audio.currentTime + seekOffset, ap.audio.duration));
		});
		// 跳转到指定时间
		navigator.mediaSession.setActionHandler("seekto", function (action) {
			const { seekTime } = action;
			ap.seek(seekTime);
		});
		// 上一首
		navigator.mediaSession.setActionHandler("previoustrack", function () {
			ap.skipBack();
		});
		// 下一首
		navigator.mediaSession.setActionHandler("nexttrack", function () {
			ap.skipForward();
		});
	}
});
</script>

<style scoped>
#aplayer {
	z-index: 1000;
}
</style>
