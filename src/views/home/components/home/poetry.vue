<template>
	<div
		v-if="curData"
		class="text-center tracking-widest"
		ref="selfPoetryRef"
		:class="{
			'poetry-overflow': overflow,
			'writing-mode-v-rl': !overflow
		}"
	>
		<h4 class="text-xl font-bold">{{ curData.title }}</h4>
		<span class="inline-block mse-4">{{ curData.author }}</span>
		<p v-for="item in curData.paragraphs" class="mse-1">
			<span>{{ item }}</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { getOne } from "@/utils/array";
import { useContentRefStore } from "@/stores/contentRef";
import { useElementSize } from "@vueuse/core";

const emits = defineEmits(["onLoad"]);
const contentStore = useContentRefStore();

const selfPoetryRef = ref<HTMLElement>();
const { height } = useElementSize(selfPoetryRef);

interface Item {
	key: number;
	title: string;
	author: string;
	paragraphs: string[];
}
const { data, isFinished } = useFetch("https://api.xtt.moe/days/poetry/self").json<Item[]>();

let curData = ref<Item | null>(getOne(data));

watch(data, () => {
	curData.value = getOne(data);
});
watch(isFinished, () => {
	emits("onLoad");
});

const overflow = ref(false);

function overflowFn() {
	overflow.value = contentStore.width - 482 < height.value;
}

watch(() => height.value, overflowFn);

watch(() => contentStore.width, overflowFn);
</script>

<style scoped></style>
