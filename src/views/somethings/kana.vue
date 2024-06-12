<template>
	<section class="container web-color-default">
		<hBanner wrapperTargetName="h1" class="text-center">漢字 → 仮名</hBanner>

		<NInput
			:style="{
				marginBlockEnd: '16px',
				'--n-border-hover': '1px solid var(--d-color)',
				'--n-border-focus': '1px solid var(--d-color)',
				'--n-caret-color': 'var(--d-color)'
			}"
			v-model:value="value"
			:rows="5"
			type="textarea"
			placeholder="日本語を入力してください"
		/>
		<NButton @click="transform" :color="store.currentTheme">{{
			i18nStore.lang === "ja" ? "変更する" : "转换"
		}}</NButton>
		<xtt-button
			:style="{
				marginInlineStart: '16px'
			}"
			@click="copy"
			type="primary"
			v-if="isSupported && isParsed"
		>
			<span v-if="!copied">{{ i18nStore.lang === "ja" ? "コピー" : "复制" }}</span>
			<span v-else>{{ i18nStore.lang === "ja" ? "コピーしました" : "复制成功" }}</span>
		</xtt-button>
		<div class="ruby-text" v-html="rubyText"></div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="汉字标注假名,かな,漢字の読み方" />
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NInput, NButton } from "naive-ui";
import { toKana } from "@/api/something/kana";
import { useI18nStore } from "@/stores/i18n";
import confetti from "canvas-confetti";
import { useClipboard } from "@vueuse/core";
import { useStore } from "@/stores";
import { hBanner } from "@c/index";

const { copy: useCopy, isSupported, copied } = useClipboard();

const store = useStore();
const i18nStore = useI18nStore();

const rubyText = ref("");
const value = ref("");
const isParsed = ref(false);

const transform = async () => {
	if (!value.value) {
		return;
	}
	rubyText.value = await toKana(value.value);
	isParsed.value = true;
};

const copy = async () => {
	// 将 rubyText 的内容复制到剪贴板
	try {
		await useCopy(rubyText.value);

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
