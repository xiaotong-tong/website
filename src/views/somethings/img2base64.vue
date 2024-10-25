<template>
	<section class="container web-color-default">
		<p class="title">
			{{ i18nStore.lang === "ja" ? "画像を選ぶ" : "选择图片" }}
		</p>
		<input type="file" accept="image/*" @change="fileChange" />

		<p>base64:</p>
		<NInput type="textarea" v-model="textarea" rows="10"></NInput>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="将图片转换为base64,画像をbase64に変換する" />
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toDataUrl } from "xtt-utils";
import { NInput } from "naive-ui";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
const textarea = ref("");

const fileChange = (e: any) => {
	toDataUrl(e.target.files[0]).then((res) => {
		textarea.value = res;
	});
};
</script>

<style scoped></style>
