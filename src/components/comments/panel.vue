<template>
	<div class="comment-panel">
		<div class="header">
			<label class="label"
				>昵称
				<xtt-input type="text" class="input" maxlength="32" v-model="nickname" />
			</label>
			<label class="label"
				>邮箱
				<xtt-input type="text" class="input" v-model="email" />
			</label>
		</div>
		<div class="content">
			<xtt-textarea
				class="textarea"
				block
				auto-size
				v-model="commentText"
				@input="textInputEvent"
				@change="textInputEvent"
			/>

			<div class="preview" v-if="previewShowed">
				<div>预览：</div>
				<div class="preview-content">
					<xtt-markdown class="md" ref="previewMd"></xtt-markdown>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="start">
				<xtt-button
					class="previewBtn"
					text
					data-xtt-tooltip="预览"
					:style="{
						color: previewShowed ? '#f34159' : undefined
					}"
					@click="previewBtnClick"
				>
					<namiIcon icon="mdiMapSearchOutline" />
				</xtt-button>
			</div>
			<div class="end">
				<xtt-button type="primary" @click="submitEvent" @keydown.enter="submitEvent"
					>提交</xtt-button
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, nextTick } from "vue";

const emits = defineEmits<{
	(e: "submit", data: { commentText: string; nickname: string; email: string }): void;
}>();

const previewShowed = ref(false);
const previewMd: Ref<HTMLElement | null> = ref(null);

const commentText = ref("");
const nickname = ref("");
const email = ref("");
const textInputEvent = () => {
	if (previewShowed.value && previewMd.value) {
		previewMd.value.textContent = commentText.value;
	}
};

const previewBtnClick = () => {
	previewShowed.value = !previewShowed.value;

	nextTick(() => {
		if (previewShowed.value && previewMd.value) {
			previewMd.value.textContent = commentText.value;
		}
	});
};

const submitEvent = () => {
	emits("submit", {
		commentText: commentText.value,
		nickname: nickname.value,
		email: email.value
	});

	commentText.value = "";
	nickname.value = "";
	email.value = "";
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
}

.textarea::part(textarea) {
	min-height: 100px;
	border: none;
	background-color: transparent;
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
