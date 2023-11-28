<template>
	<section class="container web-color-default">
		<h1 class="text-center">
			{{ i18nStore.lang === "ja" ? "中国語の漢字の読み方" : "拼音" }}
		</h1>
		<xtt-textarea
			v-model="text"
			:placeholder="i18nStore.lang === 'ja' ? '中国語を入力してください' : '请输入中文'"
			block
			rows="10"
		></xtt-textarea>
		<xtt-button @click="transform" type="primary">
			{{ i18nStore.lang === "ja" ? "OK" : "确定" }}
		</xtt-button>
		<div class="ruby-text" v-html="rubyText"></div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="拼音,汉字转拼音,中国語の漢字の読み方" />
	</Teleport>
</template>

<script setup lang="ts">
import { html } from "pinyin-pro";
import { ref } from "vue";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
const text = ref("");
const rubyText = ref("");

const transform = () => {
	rubyText.value = html(text.value);
};
</script>

<style scoped>
.ruby-text {
	margin-block-start: 16px;
	line-height: 2.5;
	letter-spacing: 2px;
}
</style>
