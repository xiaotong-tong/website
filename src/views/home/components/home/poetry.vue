<template>
	<div
		v-if="curData"
		class="custom-font text-center tracking-widest"
		ref="selfPoetryRef"
		:class="{
			'poetry-overflow': overflow,
			'writing-mode-v-rl': !overflow
		}"
	>
		<h4 class="text-xl font-bold">{{ curData.title }}</h4>
		<span class="inline-block mse-4">{{ curData.author }}</span>
		<p v-for="item in curData.paragraphs" class="mse-1 text-balance">
			<span>{{ item }}</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { IGetDaysPoetry } from "../../home.api";
import { getDaysPoetry } from "../../home.api";
import { useContentRefStore } from "@/stores/contentRef";
import { useElementSize } from "@vueuse/core";

const emits = defineEmits(["onLoad"]);
const contentStore = useContentRefStore();

const selfPoetryRef = ref<HTMLElement>();
const { height } = useElementSize(selfPoetryRef);

getDaysPoetry()
	.then((res) => {
		curData.value = res;
	})
	.catch(() => {
		// 即使请求失败，也要展示默认诗词
		curData.value = {
			key: 1,
			title: "杂诗七首·其一",
			author: "黄庭坚",
			paragraphs: ["此身天地一蘧庐，世事消磨绿鬓疏。", "毕竟几人真得鹿，不知终日梦为鱼。"]
		};
	})
	.finally(() => {
		emits("onLoad");
	});

let curData = ref<IGetDaysPoetry | null>(null);

const overflow = ref(false);

function overflowFn() {
	// 482 是左侧贺赋的宽度
	overflow.value = contentStore.width - 482 < height.value;
}

watch(() => height.value, overflowFn);
watch(() => contentStore.width, overflowFn);
</script>

<style scoped></style>
