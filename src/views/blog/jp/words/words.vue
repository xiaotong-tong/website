<template>
	<namiTable :data="wordList" class="container">
		<namiTableColumn prop="word" label="単語"> </namiTableColumn>
		<namiTableColumn prop="kana" label="仮名"></namiTableColumn>
		<namiTableColumn prop="accent" label="重音" width="50px"></namiTableColumn>
		<namiTableColumn prop="mean" label="意味"></namiTableColumn>
		<namiTableColumn prop="read" label="音声" width="50px">
			<template #default="scope">
				<nami-icon icon="mdiMusicNote" @click="playSound"></nami-icon>
				<audio :src="scope.row.read" preload="metadata"></audio>
			</template>
		</namiTableColumn>
	</namiTable>
</template>

<script setup lang="ts">
import type { JPWord } from "@/types/word";
import { ref } from "vue";
import { getWordList } from "@/api/blog/word";

const wordList = ref<JPWord[]>([]);

(async () => {
	const data = await getWordList();

	wordList.value = data;
})();

const playSound = (e: MouseEvent) => {
	const audio: HTMLAudioElement = (e.currentTarget as HTMLElement)
		?.nextElementSibling as HTMLAudioElement;
	audio?.play();
};

// 修改页面标题
document.title = "日本語単語勉強 - 星川漣の家";
</script>

<style scoped>
.container {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
	padding: 8px;
}
</style>
