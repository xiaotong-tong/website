<template>
	<div>
		<div class="content">
			{{ content }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { MaybeRef } from "vue";
import { watchEffect, ref, unref } from "vue";
import { random } from "xtt-utils";

interface Props {
	// 切换时间间隔
	interval?: MaybeRef<number>;
}

const props = withDefaults(defineProps<Props>(), {
	interval: 5000
});

const map = [
	"↑↑↓↓←→←→BA，这段文字是什么意思呢？",
	"我的名字是星川漣，ほしかわさざなみ、平时叫我ナミ就好。"
];

const content = ref<string>(map[random(0, map.length - 1)]);

let timer: number | null = null;
watchEffect(() => {
	if (timer) clearInterval(timer);

	timer = window.setInterval(() => {
		content.value = map[random(0, map.length - 1)];
	}, unref(props.interval));
});
</script>

<style scoped>
.content {
	color: var(--d-color);
}
</style>
