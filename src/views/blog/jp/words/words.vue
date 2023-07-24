<template>
	<section class="container">
		<div>
			<span>単語</span>
			<span>仮名</span>
			<span>重音</span>
			<span>意味</span>
			<span>音声</span>
		</div>
		<div v-for="item in wordList.list" :key="item.id">
			<span>{{ item.word }}</span>
			<span>{{ item.kana }}</span>
			<span>{{ item.accent }}</span>
			<span>{{ item.mean }}</span>
			<span
				><nami-icon icon="mdiMusicNote" @click="playSound"></nami-icon>
				<audio :src="item.read" preload="metadata"></audio
			></span>
		</div>
	</section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getWordList } from "@/api/blog/word.js";

const wordList = reactive({
	list: []
});

(async () => {
	const { data } = await getWordList();
	wordList.list = data.data;
})();

const playSound = (e) => {
	const audio = e.currentTarget.nextElementSibling;
	audio?.play();
};
</script>

<style scoped>
.container {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
	padding: 8px;

	width: 100%;
	display: grid;
	grid-template:
		"title title title title title"
		"word kana accent mean read"
		/ auto auto 50px auto 50px;

	row-gap: 8px;
}

.container div {
	display: contents;
}
</style>
