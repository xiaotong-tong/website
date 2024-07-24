<template>
	<div>
		<div class="text-[--d-color]" ref="oldRef">
			{{ content }}
		</div>
		<div class="text-[--d-color]" ref="newRef">
			{{ newContent }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { MaybeRef } from "vue";
import { watchEffect, ref, unref, watch, nextTick, onUnmounted } from "vue";
import { useI18nStore } from "@/stores/i18n";
import { gsap } from "gsap";

interface Props {
	// 切换时间间隔
	interval?: MaybeRef<number>;
}

const props = withDefaults(defineProps<Props>(), {
	interval: 5000
});

const oldRef = ref<HTMLElement | null>(null);
const newRef = ref<HTMLElement | null>(null);

const map = [
	"↑↑↓↓←→←→BA，这段文字是什么意思呢？",
	"我的名字是星川漣，ほしかわさざなみ、平时叫我ナミ就好。",
	"我的梦想是成为像远子前辈那样的文学少女！我也在为之努力。"
];
const jaMap = [
	"↑↑↓↓←→←→BA，これなに？おいしの？",
	"私の名前は星川漣、ほしかわさざなみ、ナミと呼んでいい。"
];

const currentMap = ref(map);

let key = 0;
const content = ref<string>(currentMap.value[key]);
const newContent = ref<string>("");

let timer: number | null = null;
watchEffect(() => {
	if (timer) clearInterval(timer);

	timer = window.setInterval(() => {
		key++;
		key = key > currentMap.value.length - 1 ? 0 : key;
		newContent.value = currentMap.value[key];
		nextTick(() => {
			gsap.fromTo(
				oldRef.value,
				{
					opacity: 1,
					y: 0
				},
				{
					opacity: 0,
					y: -24,
					onComplete: () => {
						content.value = newContent.value;
					}
				}
			);
			gsap.fromTo(
				newRef.value,
				{
					y: 0,
					opacity: 0
				},
				{
					y: -24,
					opacity: 1
				}
			);
		});
	}, unref(props.interval));
});

onUnmounted(() => {
	// 卸载时清除定时器
	if (timer) clearInterval(timer);
});

const i18nStore = useI18nStore();
watch(
	() => i18nStore.lang,
	() => {
		currentMap.value = i18nStore.lang === "ja" ? jaMap : map;
	}
);
</script>

<style scoped></style>
