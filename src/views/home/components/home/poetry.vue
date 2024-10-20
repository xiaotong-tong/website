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
		emits("onLoad");
	})
	.catch(() => {
		emits("onLoad");
	});

let curData = ref<IGetDaysPoetry | null>(null);

const overflow = ref(false);

function overflowFn() {
	overflow.value = contentStore.width - 482 < height.value;
}

watch(() => height.value, overflowFn);

watch(() => contentStore.width, overflowFn);
</script>

<style scoped></style>
