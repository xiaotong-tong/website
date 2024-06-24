<template>
	<div>
		<div style="position: relative">
			<nami-link to="/photos" class="link" type="primary">
				<hBanner>{{ i18nStore.lang === "ja" ? "写真" : "图片" }}</hBanner>
			</nami-link>

			<NButton
				:style="{
					position: 'absolute',
					insetInlineEnd: '8px',
					insetBlockStart: '8px',
					marginInlineStart: '8px'
				}"
				:color="store.currentTheme"
				text
				@click="showModal = true"
				v-if="store.loginUid"
				>新增</NButton
			>
		</div>
		<div class="photo-wrap">
			<div class="img-wrap" v-for="item in imageList" :key="item.id">
				<img class="img" :src="item.url" loading="lazy" />
			</div>
		</div>

		<NModal class="web-color-default" v-model:show="showModal">
			<NCard title="新增图片" style="width: 500px; height: 200px">
				<div>
					图片 url:
					<NInput v-model:value="url" />
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
import { hBanner } from "@c/index";
import { NButton, NModal, NInput, NCard } from "naive-ui";
import { useStore } from "@/stores";
const i18nStore = useI18nStore();

const store = useStore();

const { list: imageList, addImage } = useImageList(true);

const showModal = ref(false);
const url = ref("https://image.xtt.moe/local/images/");

function handlerSubmit() {
	addImage(url);
	showModal.value = false;
}
</script>

<style scoped>
.photo-wrap {
	display: flex;
	flex-wrap: no-wrap;
	height: 150px;
	column-gap: 8px;
	overflow-x: auto;
	padding-block-end: 4px;
}

.img {
	height: 100%;
}
</style>
