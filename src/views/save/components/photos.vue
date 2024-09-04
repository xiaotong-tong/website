<template>
	<div>
		<div class="pos-relative">
			<nami-link to="/photos" type="primary">
				<hBanner>{{ i18nStore.lang === "ja" ? "写真" : "图片" }}</hBanner>
			</nami-link>

			<NamiButton
				class="add-photo-btn"
				@click="showModal = true"
				:border-color="store.currentTheme"
				v-login
				>新增</NamiButton
			>
		</div>
		<div class="flex h-[150px] gap-x-2 overflow-x-auto pe-1">
			<div class="flex-none" v-for="item in imageList" :key="item.id">
				<img class="h-full w-auto" :src="item.url" loading="lazy" />
			</div>
		</div>

		<NModal class="web-color-default" v-model:show="showModal">
			<NCard title="新增图片" class="modal-card">
				<div>
					图片 url:
					<NInput v-model:value="url" />
				</div>
				<NUpload
					class="my-4"
					accept="image/*"
					@change="uploadImage"
					:show-file-list="false"
				>
					<NButton>上传图片</NButton>
				</NUpload>
				<div>
					<NCheckbox v-model:checked="botCanUse"> bot 能否使用 </NCheckbox>
				</div>
				<template #footer>
					<NButton @click="showModal = false">取消</NButton>
					<NButton :color="store.currentTheme" @click="handlerSubmit">确定</NButton>
				</template>
			</NCard>
		</NModal>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useImageList } from "@/utils/photos";
import { useI18nStore } from "@/stores/i18n";
import { hBanner, NamiButton } from "@c/index";
import type { UploadOnChange } from "naive-ui";
import { NButton, NModal, NInput, NCard, NCheckbox, NUpload } from "naive-ui";
import { uploadLocalImage } from "@/api/image/image";
import { useStore } from "@/stores";

const i18nStore = useI18nStore();
const store = useStore();

const { list: imageList, addImage } = useImageList(true);

const showModal = ref(false);
const url = ref("https://image.xtt.moe/local/images/");
const botCanUse = ref(true);

function handlerSubmit() {
	addImage(url, botCanUse);
	showModal.value = false;
}

async function uploadImage(option: Parameters<UploadOnChange>[0]) {
	if (!option.file) return;

	const fd = new FormData();
	fd.append("source", option.file.file!);

	const res = await uploadLocalImage(fd);

	if (res.status === 200) {
		let resUrl = res.data.image.url;
		resUrl = resUrl.replace("https://image.xtt.moe/", "https://image.xtt.moe/local/");
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
