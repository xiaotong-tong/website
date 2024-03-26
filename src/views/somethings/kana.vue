<template>
	<section class="container web-color-default">
		<h1 class="text-center">漢字→仮名</h1>
		<xtt-textarea
			ref="textarea"
			placeholder="日本語を入力してください"
			block
			rows="10"
		></xtt-textarea>
		<xtt-button @click="transform" type="primary">
			{{ i18nStore.lang === "ja" ? "OK" : "确定" }}
		</xtt-button>
		<xtt-button
			:style="{
				marginInlineStart: '16px'
			}"
			@click="copy"
			type="primary"
			v-if="isParsed"
		>
			{{ i18nStore.lang === "ja" ? "コピー" : "复制" }}
		</xtt-button>
		<div class="ruby-text" v-html="rubyText"></div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="汉字标注假名,かな,漢字の読み方" />
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toKana } from "@/api/something/kana";
import { useI18nStore } from "@/stores/i18n";
import confetti from "canvas-confetti";

const i18nStore = useI18nStore();

const rubyText = ref("");
const textarea = ref<HTMLTextAreaElement>();
const isParsed = ref(false);

const transform = async () => {
	const value = textarea.value?.value;

	if (!value) {
		return;
	}
	rubyText.value = await toKana(value);
	isParsed.value = true;
};

const copy = async () => {
	// 将 rubyText 的内容复制到剪贴板
	try {
		await navigator.clipboard?.writeText(rubyText.value);

		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		});
	} catch (err) {
		console.log("复制失败");
	}
};
</script>

<style scoped>
.ruby-text {
	margin-block-start: 16px;
	line-height: 2.5;
	letter-spacing: 2px;
}
</style>
