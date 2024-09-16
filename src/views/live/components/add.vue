<template>
	<NamiButton class="flex-none" :borderColor="store.currentTheme" @click="openModal"
		>新增动态</NamiButton
	>

	<Modal
		v-model:show="showModal"
		:color="store.currentTheme"
		@ok="submit"
		@cancel="onCancel"
		okText="提交"
	>
		<h3>发布动态</h3>
		<div ref="contentRef" class="content-editor mt-4"></div>
	</Modal>
</template>

<script setup lang="ts">
import { ref, toRaw, onUnmounted, nextTick } from "vue";
import { NamiButton, Modal } from "@c/index";
import { useStore } from "@/stores/index";
import { useUserInfoStore } from "@/stores/user";
import * as monaco from "monaco-editor";
import { addLive } from "@/api/live/live";

const store = useStore();
const userInfoStore = useUserInfoStore();

const emits = defineEmits(["submit"]);

const contentRef = ref<HTMLElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor>();

function renderMonacoEditor() {
	if (contentRef.value) {
		if (editor.value) {
			return;
		}

		editor.value = monaco.editor.create(contentRef.value, {
			value: "",
			language: "textplain",
			minimap: {
				enabled: false
			}
		});
	}
}

const showModal = ref(false);

function openModal() {
	showModal.value = true;
	nextTick(() => {
		renderMonacoEditor();
	});
}

function onCancel() {
	toRaw(editor.value!)?.setValue("");
}

async function submit() {
	const content = toRaw(editor.value!).getValue() || "";
	if (!content) {
		return;
	}

	await addLive({
		content,
		userId: userInfoStore.userInfo.id
	});
	toRaw(editor.value!)?.setValue("");
	emits("submit");
}

onUnmounted(() => {
	toRaw(editor.value)?.dispose();
});
</script>

<style scoped>
.content-editor {
	height: 300px;
	border: thin solid var(--d-color);
}
</style>
