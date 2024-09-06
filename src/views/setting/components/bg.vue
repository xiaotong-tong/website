<template>
	<div class="contaniner">
		<h3>{{ i18nStore.lang === "ja" ? "背景画像" : "背景图片" }}</h3>
		<div>
			{{ i18nStore.lang === "ja" ? "今の背景" : "当前背景" }}:
			<img class="bg select-none" draggable="false" :src="bgUrl" alt="background image" />
		</div>
		<div class="action">
			<xtt-button @click="open">{{
				i18nStore.lang === "ja" ? "カスタム" : "自定义图片"
			}}</xtt-button>
			<xtt-button style="margin-inline-start: 8px" @click="resetBG">{{
				i18nStore.lang === "ja" ? "デフォルト" : "默认图片"
			}}</xtt-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { setWebBGUrl, bgUrl } from "@/utils/webBG";
import { useFileDialog } from "@vueuse/core";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();

const { files, open, reset } = useFileDialog();

watch(files, (val) => {
	if (val?.length) {
		setWebBGUrl(val[0]);
	}
});

const resetBG = () => {
	setWebBGUrl(undefined);
	reset();
};
</script>

<style scoped>
.contaniner {
	padding: 8px;
}

.action {
	margin-block-start: 8px;
	padding-inline-start: 90px;
}

.bg {
	margin-inline-start: 2em;
	height: 100px;
}
</style>
