<template>
	<NamiButton v-bind="$attrs" v-login :borderColor="store.currentTheme" @click="openModal">
		{{ t("pages.live.addLive") }}
	</NamiButton>

	<Modal
		v-model:show="showModal"
		:color="store.currentTheme"
		@ok="submit"
		@cancel="onCancel"
		:okText="t('common.submit')"
	>
		<h3>{{ t("pages.live.addLive") }}</h3>
		<NRadioGroup v-model:value="type" class="mt-4">
			<NRadioButton value="text">text</NRadioButton>
			<NRadioButton value="markdown">markdown</NRadioButton>
		</NRadioGroup>
		<div ref="contentRef" class="content-editor mt-4"></div>
	</Modal>
</template>

<script setup lang="ts">
import { ref, toRaw, onUnmounted, nextTick } from "vue";
import { NamiButton, Modal } from "@c/index";
import { useStore } from "@/stores/index";
import * as monaco from "monaco-editor";
import { addLive } from "@/api/live/live";
import { NRadioGroup, NRadioButton } from "naive-ui";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const emits = defineEmits(["submit"]);

const type = ref<"text" | "markdown">("text");

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
		contentType: type.value
	});
	toRaw(editor.value!)?.setValue("");
	type.value = "text";
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
