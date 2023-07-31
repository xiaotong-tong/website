<template>
	<div class="title-operate-area">
		<xtt-button type="primary" @click="submitEvent">发布</xtt-button>
	</div>

	<div>单词: <xtt-input v-model="word"></xtt-input></div>
	<div>仮名: <xtt-input v-model="kana"></xtt-input></div>
	<div>重音: <xtt-number-field v-model="accent"></xtt-number-field></div>
	<div>意味: <xtt-textarea v-model="mean" block></xtt-textarea></div>
	<div>音声URL: <xtt-input v-model="read" block></xtt-input></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { addWord } from "@/api/blog/word";
import { useRouter } from "vue-router";
const router = useRouter();

const word = ref("");
const kana = ref("");
const accent = ref("");
const mean = ref("");
const read = ref("");

const submitEvent = async () => {
	if (!word.value) return alert("单词不能为空");

	const res = await addWord({
		word: word.value,
		kana: kana.value,
		accent: +accent.value,
		mean: mean.value,
		read: read.value
	});

	console.log(res);
	router.push("/jp/words");
};
</script>

<style scoped>
.title-operate-area {
	display: flex;
	justify-content: flex-end;
}
</style>
