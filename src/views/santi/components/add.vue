<template>
	<NamiButton v-bind="$attrs" v-login :borderColor="store.currentTheme" @click="openModal">
		{{ t("pages.santi.add") }}
	</NamiButton>

	<Modal
		v-model:show="showModal"
		:color="store.currentTheme"
		@ok="submit"
		:okText="t('common.submit')"
		@cancel="cancel"
	>
		<h3>{{ t("pages.santi.add") }}</h3>
		<p>题目:</p>
		<NInput v-model:value="topic" placeholder="Topic" />
		<p>内容:</p>
		<NInput v-model:value="content" :rows="12" type="textarea" placeholder="Content" />
	</Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NamiButton, Modal } from "@c/index";
import { useStore } from "@/stores/index";
import { addSanti } from "@/api/santi/santi";
import { NInput } from "naive-ui";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const emits = defineEmits(["submit"]);

const content = ref("");
const topic = ref("");

const showModal = ref(false);

function openModal() {
	showModal.value = true;
}

async function submit() {
	if (!content.value || !topic.value) {
		return;
	}

	await addSanti({
		content: content.value,
		topic: topic.value
	});
	emits("submit");
	content.value = "";
	topic.value = "";
}

function cancel() {
	content.value = "";
	topic.value = "";
}
</script>

<style scoped></style>
