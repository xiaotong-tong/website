<template>
	<namiAplayer
		class="fixed top-0 left-0"
		ref="aplayerRef"
		v-if="store.pageConfig.showHomeMusicController"
	></namiAplayer>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import namiAplayer from "@/components/aplayer/aplayer.vue";
import { useStore } from "@/stores/index";
import { useRoute } from "vue-router";
import { gsap } from "gsap";

const store = useStore();
const route = useRoute();

interface Props {
	rectX: number;
	rectY: number;
}

const props = withDefaults(defineProps<Props>(), {
	rectX: 0,
	rectY: 0
});

const aplayerRef = ref<typeof namiAplayer | null>(null);

const firstLoad = ref(true);

function toMusicArea() {
	const el = aplayerRef.value?.aplayerEl;
	const ap = aplayerRef.value?.aplayer;

	if (!el) return;

	if (firstLoad.value) {
		ap.setMode("normal");
		el.style.transform = `translateY(${props.rectY + 16}px) translateX(${props.rectX + 24}px)`;
		firstLoad.value = false;
		return;
	}

	gsap.to(el, {
		y: props.rectY + 16,
		x: props.rectX + 24,
		width: 600,
		onComplete: () => {
			ap.setMode("normal");
		}
	});
}

function toHomeArea() {
	const el = aplayerRef.value?.aplayerEl;
	const ap = aplayerRef.value?.aplayer;

	if (!el) return;

	if (firstLoad.value) {
		el.style.transform = `translateY(${visualViewport?.height! - 90}px)`;
		firstLoad.value = false;
		return;
	}

	gsap.to(el, {
		y: visualViewport?.height! - 90,
		width: 90,
		x: 0,
		onComplete: () => {
			ap.setMode("mini");
		}
	});
}

// 监听路由变化
watchEffect(() => {
	if (route.fullPath === "/music") {
		toMusicArea();
	} else {
		toHomeArea();
	}
});
</script>

<style scoped></style>
