<template>
	<div>
		<div class="content">
			{{ content }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { MaybeRef } from "vue";
import { watchEffect, ref, unref, watch } from "vue";
import { random } from "xtt-utils";
import { useI18nStore } from "@/stores/i18n";

interface Props {
	// 切换时间间隔
	interval?: MaybeRef<number>;
}

const props = withDefaults(defineProps<Props>(), {
	interval: 5000
});

const i18nStore = useI18nStore();

const map = [
	"↑↑↓↓←→←→BA，这段文字是什么意思呢？",
	"我的名字是星川漣，ほしかわさざなみ、平时叫我ナミ就好。"
];
const jaMap = [
	"↑↑↓↓←→←→BA，これなに？おいしの？",
	"私の名前は星川漣、ほしかわさざなみ、ナミと呼んでいい。"
];

const currentMap = ref(map);

const content = ref<string>(currentMap.value[random(0, currentMap.value.length - 1)]);

let timer: number | null = null;
watchEffect(() => {
	if (timer) clearInterval(timer);

	timer = window.setInterval(() => {
		content.value = currentMap.value[random(0, currentMap.value.length - 1)];
	}, unref(props.interval));
});

watch(
	() => i18nStore.lang,
	() => {
		currentMap.value = i18nStore.lang === "ja" ? jaMap : map;
	}
);
</script>

<style scoped>
.content {
	color: var(--d-color);
}
</style>
