<template>
	<div class="title-operate-area" v-if="store.loginUid">
		<xtt-button type="primary" @click="addWordEvent">添加</xtt-button>
	</div>

	<namiTable :data="wordList" class="container web-color-default">
		<namiTableColumn prop="word" label="単語"> </namiTableColumn>
		<namiTableColumn prop="kana" label="仮名"></namiTableColumn>
		<namiTableColumn prop="accent" label="重音" width="50px"></namiTableColumn>
		<namiTableColumn prop="english" label="英語"></namiTableColumn>
		<namiTableColumn prop="mean" label="意味"></namiTableColumn>
		<namiTableColumn prop="read" label="音声" width="50px">
			<template #default="scope">
				<nami-icon icon="mdiMusicNote" @click="playSound" v-if="scope.row.read"></nami-icon>
				<audio :src="scope.row.read" preload="metadata" v-if="scope.row.read"></audio>
			</template>
		</namiTableColumn>
		<namiTableColumn label="操作" width="100px" v-if="store.loginUid">
			<template #default="scope">
				<xtt-button text type="primary" @click="editWordEvent(scope.row)">修改</xtt-button>
			</template>
		</namiTableColumn>
	</namiTable>

	<xtt-dialog align-center class="uploadWordDialog" ref="uploadWordDialog">
		<div class="form-row">单词: <xtt-input v-model="word"></xtt-input></div>
		<div class="form-row">仮名: <xtt-input v-model="kana"></xtt-input></div>
		<div class="form-row">重音: <xtt-number-field v-model="accent"></xtt-number-field></div>

		<div class="form-row">英語: <xtt-input v-model="english"></xtt-input></div>
		<div class="form-row">
			意味:
			<xtt-textarea v-model="mean" block></xtt-textarea>
		</div>
		<div class="form-row">音声URL: <xtt-input v-model="read" block></xtt-input></div>
	</xtt-dialog>
</template>

<script setup lang="ts">
import type { XttDialogElement } from "xtt-ui";
import type { JPWord } from "@/types/word";
import { ref, onMounted } from "vue";
import { getWordList, addWord, editWordById } from "@/api/blog/word";
import { useStore } from "@/stores/index";

const store = useStore();

const wordList = ref<JPWord[]>([]);

const getWords = async () => {
	const data = await getWordList();

	wordList.value = data;
};
getWords();

const playSound = (e: MouseEvent) => {
	const audio: HTMLAudioElement = (e.currentTarget as HTMLElement)
		?.nextElementSibling as HTMLAudioElement;
	audio?.play();
};

const uploadWordDialog = ref<XttDialogElement | null>(null);
const word = ref("");
const kana = ref("");
const accent = ref("");
const english = ref("");
const mean = ref("");
const read = ref("");

const isEdit = ref(false);
const editId = ref(0);

onMounted(() => {
	uploadWordDialog.value?.addEventListener("xtt-submit", async () => {
		if (isEdit.value) {
			if (!word.value) return alert("单词不能为空");

			await editWordById(editId.value, {
				word: word.value,
				kana: kana.value,
				accent: +accent.value,
				english: english.value,
				mean: mean.value,
				read: read.value
			});
		} else {
			if (!word.value) return alert("单词不能为空");

			await addWord({
				word: word.value,
				kana: kana.value,
				accent: +accent.value,
				english: english.value,
				mean: mean.value,
				read: read.value
			});
		}

		isEdit.value = false;
		editId.value = 0;
		word.value = "";
		kana.value = "";
		accent.value = "";
		english.value = "";
		mean.value = "";
		read.value = "";

		getWords();
	});
});

const addWordEvent = () => {
	isEdit.value = false;
	editId.value = 0;

	word.value = "";
	kana.value = "";
	accent.value = "";
	english.value = "";
	mean.value = "";
	read.value = "";

	uploadWordDialog.value?.open();
};

const editWordEvent = (row: JPWord) => {
	isEdit.value = true;
	editId.value = row.id;

	word.value = row.word;
	kana.value = row.kana;
	accent.value = row.accent + "";
	english.value = row.english;
	mean.value = row.mean;
	read.value = row.read;

	uploadWordDialog.value?.open();
};

// 修改页面标题
document.title = "日本語単語勉強 - 星川漣の家";
</script>

<style scoped>
.title-operate-area {
	display: flex;
	justify-content: flex-end;
	margin-block-end: 8px;
}

.container {
	padding: 8px;
}

.form-row {
	margin-block-end: 16px;
	width: 500px;
}
</style>
