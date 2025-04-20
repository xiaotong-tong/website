<template>
	<div class="comment-panel">
		<div class="header">
			<label class="label w-[100px]">
				{{ i18nStore.messages.comment.avatar }}
				<namiCommentsPhoto v-model:src="photoSrc" />
			</label>
			<label class="label">
				<span class="text-nowrap">{{ i18nStore.messages.comment.nickname }}</span>
				<NInput type="text" class="bg-transparent" maxlength="32" v-model="nickname" placeholder="匿名" />
			</label>
		</div>
		<div class="content">
			<NInput
				type="textarea"
				class="bg-transparent"
				v-model="commentText"
				placeholder="请输入留言内容"
				:rows="5"
			/>

			<div class="preview" v-if="previewShowed">
				<div>
					{{ i18nStore.messages.comment.previewTitle }}
				</div>
				<div class="preview-content">
					<markdown :content="commentText" />
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="start">
				<NButton class="previewBtn" text @click="previewBtnClick">
					<namiIcon icon="mdiMapSearchOutline" />
				</NButton>
			</div>
			<div class="end">
				<NamiButton :borderColor="store.currentTheme" @click="submitEvent" @keydown.enter="submitEvent">
					{{ i18nStore.messages.comment.submitText }}
				</NamiButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import namiCommentsPhoto from "./photo.vue";
import { markdown, NamiButton } from "@c/index";
import { NInput, NButton } from "naive-ui";
import { useI18nStore } from "@/stores/i18n";
import { useStore } from "@/stores/index";

const store = useStore();
const i18nStore = useI18nStore();

const emits = defineEmits<{
	(e: "submit", data: { commentText: string; nickname: string; photoUrl: string }): void;
}>();

const previewShowed = ref(false);

const photoSrc = ref("https://image.xtt.cool/images/mlian2.md.webp");

const commentText = ref("");
const nickname = ref("");

const previewBtnClick = () => {
	previewShowed.value = !previewShowed.value;
};

const submitEvent = () => {
	emits("submit", {
		commentText: commentText.value,
		nickname: nickname.value,
		photoUrl: photoSrc.value
	});

	commentText.value = "";
	nickname.value = "";

	previewShowed.value = false;
};
</script>

<style scoped>
.comment-panel {
	border: 1px solid #ccc;
	border-radius: 10px;
}

.header {
	display: flex;
	font-size: 14px;
	padding-block-end: 8px;
	padding-block-start: 4px;
	border-block-end: 1px solid #ccc;
}

.label {
	padding-inline-start: 16px;
	display: flex;
	align-items: center;
	column-gap: 4px;
}

.footer {
	display: flex;
	justify-content: space-between;
	padding: 8px 16px;
}

.previewBtn:hover {
	color: #f34159;
}

.preview-content {
	border: 1px solid #ccc;
	margin: 8px;
	min-height: 26px;
}
</style>
