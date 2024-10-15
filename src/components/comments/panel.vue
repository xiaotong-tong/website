<template>
	<div class="comment-panel">
		<div class="header">
			<label class="label">
				{{ i18nStore.messages.comment.avatar }}
				<namiCommentsPhoto v-model:src="photoSrc" />
			</label>
			<label class="label">
				{{ i18nStore.messages.comment.nickname }}
				<xtt-input type="text" class="input" maxlength="32" v-model="nickname" placeholder="匿名" />
			</label>
			<label class="label">
				{{ i18nStore.messages.comment.email }}
				<xtt-input type="text" class="input" v-model="email" placeholder="example@a.com" />
			</label>
		</div>
		<div class="content">
			<xtt-textarea class="textarea" block auto-size v-model="commentText" />

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
				<xtt-button
					class="previewBtn"
					text
					:data-xtt-tooltip="
						previewShowed
							? i18nStore.messages.comment.previewTipClose
							: i18nStore.messages.comment.previewTipOpen
					"
					:style="{
						color: previewShowed ? '#f34159' : undefined
					}"
					@click="previewBtnClick"
				>
					<namiIcon icon="mdiMapSearchOutline" />
				</xtt-button>
			</div>
			<div class="end">
				<xtt-button type="primary" @click="submitEvent" @keydown.enter="submitEvent">
					{{ i18nStore.messages.comment.submitText }}
				</xtt-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import namiCommentsPhoto from "./photo.vue";
import { markdown } from "@c/index";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();

const emits = defineEmits<{
	(e: "submit", data: { commentText: string; nickname: string; email: string; photoUrl: string }): void;
}>();

const previewShowed = ref(false);

const photoSrc = ref("https://image.xtt.moe/images/mlian2.md.webp");

const commentText = ref("");
const nickname = ref("");
const email = ref("");

const previewBtnClick = () => {
	previewShowed.value = !previewShowed.value;
};

const submitEvent = () => {
	emits("submit", {
		commentText: commentText.value,
		nickname: nickname.value,
		email: email.value,
		photoUrl: photoSrc.value
	});

	commentText.value = "";
	nickname.value = "";
	email.value = "";

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
}
.input::part(input) {
	border: none;
	background-color: transparent;
}
.theme-dark .input::part(input) {
	color: #fff;
}

.textarea::part(textarea) {
	min-height: 100px;
	border: none;
	background-color: transparent;
}
.theme-dark .textarea::part(textarea) {
	color: #fff;
}

.footer {
	display: flex;
	justify-content: space-between;
	padding: 8px 16px;
}

.previewBtn:hover {
	background-color: transparent;
	color: #f34159;
}

.preview-content {
	border: 1px solid #ccc;
	margin: 8px;
	min-height: 26px;
}
</style>
