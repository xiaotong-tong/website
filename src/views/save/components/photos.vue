<template>
	<div>
		<div class="pos-relative">
			<nami-link to="/photos" type="primary">
				<Panel>{{ t("pages.save.photo.title") }}</Panel>
			</nami-link>

			<NamiButton class="add-photo-btn" @click="showModal = true" :border-color="store.currentTheme" v-login>{{
				t("common.add")
			}}</NamiButton>
		</div>
		<div class="flex h-[150px] gap-x-2 overflow-x-auto pe-1">
			<div class="flex-none" v-for="item in imageList" :key="item.id">
				<img class="h-full w-auto" :src="item.url" loading="lazy" />
			</div>
		</div>

		<Modal v-model:show="showModal" @cancel="showModal = false" @ok="handlerSubmit">
			<h2 class="text-2xl">{{ t("pages.save.photo.addModalTitle") }}</h2>
			<div>
				{{ t("pages.save.photo.addModalURL") }}:
				<NInput v-model:value="url" />
			</div>
			<NUpload class="my-4" accept="image/*" @change="uploadImage" :show-file-list="false">
				<NButton>{{ t("common.uploadImage") }}</NButton>
			</NUpload>
			<div>
				<NCheckbox v-model:checked="botCanUse"> {{ t("pages.save.photo.canBotUse") }}: </NCheckbox>
			</div>
		</Modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useImageList } from "@/utils/photos";
import { Panel, NamiButton, Modal } from "@c/index";
import type { UploadOnChange } from "naive-ui";
import { NButton, NInput, NCheckbox, NUpload } from "naive-ui";
import { uploadLocalImage } from "@/api/image/image";
import { useStore } from "@/stores";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const { list: imageList, addImage } = useImageList(true);

const showModal = ref(false);
const url = ref("https://image.xtt.cool/local/images/");
const botCanUse = ref(true);

async function handlerSubmit(callback?: Function) {
	await addImage(url, botCanUse);
	callback?.();
}

async function uploadImage(option: Parameters<UploadOnChange>[0]) {
	if (!option.file) return;

	const fd = new FormData();
	fd.append("source", option.file.file!);

	const res = await uploadLocalImage(fd);

	if (res.status === 200) {
		let resUrl = res.data.image.url;
		resUrl = resUrl.replace("https://image.xtt.cool/", "https://image.xtt.cool/local/");
		url.value = resUrl;
	}
}
</script>

<style scoped>
.modal-card {
	width: 500px;
	height: 300px;
}

.add-photo-btn {
	position: absolute;
	inset-inline-end: 8px;
	inset-block-start: 8px;
}
</style>
