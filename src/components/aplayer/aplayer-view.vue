<template>
	<!-- 该组件内部没有做 a11y 适配， 内部的 button 会被 axe  和 lighthouse 捕获报错，所以这里简单使用 aria-hidden 隐藏屏幕阅读器对内部的捕获 -->
	<!-- 内部有的图标是 span，有的图标是 button，且没有暴露接口，暂不做单独适配 -->
	<div id="aplayerView" ref="aplayerEl" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { audioList } from "./songs";

const aplayerEl = ref<HTMLElement | null>(null);

onMounted(() => {
	const ap: any = new APlayer({
		container: (aplayerEl.value as HTMLElement) || document.getElementById("aplayerView"),
		autoplay: false,
		view: true,
		mview: true,
		lrcType: 3,
		mutex: true,
		theme: "#E7FBD2",
		audio: audioList
	});

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
#aplayerView {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	margin-inline: 0;
}

#aplayerView ::v-deep(.aplayer-music) {
	text-align: center;
}
#aplayerView ::v-deep(.aplayer-title) {
	font-size: 24px;
}
#aplayerView ::v-deep(.aplayer-author) {
	font-size: 16px;
}

#aplayerView ::v-deep(.aplayer-lrc p) {
	font-size: 16px;
}
</style>
