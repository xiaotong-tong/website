<template>
	<section class="container">
		<hBanner wrapperTargetName="h1" class="text-center">
			<span v-if="i18nStore.lang === 'ja'">中国語の漢字の読み方</span>
			<ruby v-else class="-translate-y-1"> 拼音<rt>pīnyīn</rt> </ruby>
		</hBanner>
		<NInput
			v-model:value="value"
			:rows="5"
			type="textarea"
			class="mse-4"
			:placeholder="i18nStore.lang === 'ja' ? '中国語を入力してください' : '请输入中文'"
		/>

		<NamiButton @click="transform" :borderColor="store.currentTheme">
			{{ i18nStore.lang === "ja" ? "OK" : "确定" }}
		</NamiButton>
		<NamiButton
			class="ms-4"
			:borderColor="store.currentTheme"
			@click="copy"
			v-if="isSupported && isParsed"
		>
			<span v-if="!copied">{{ i18nStore.lang === "ja" ? "コピー" : "复制" }}</span>
			<span v-else>{{ i18nStore.lang === "ja" ? "コピーしました" : "复制成功" }}</span>
		</NamiButton>
		<div class="ruby-text" v-html="rubyText"></div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="拼音,汉字转拼音,中国語の漢字の読み方" />
	</Teleport>
</template>

<script setup lang="ts">
import { html } from "pinyin-pro";
import { ref } from "vue";
import { NInput } from "naive-ui";
import { useI18nStore } from "@/stores/i18n";
import { useStore } from "@/stores";
import { hBanner, NamiButton } from "@c/index";
import confetti from "canvas-confetti";
import { useClipboard } from "@vueuse/core";

const store = useStore();
const i18nStore = useI18nStore();
const rubyText = ref("");
const isParsed = ref(false);
const value = ref("");

const { copy: useCopy, isSupported, copied } = useClipboard();

const transform = () => {
	if (!value.value) {
		return;
	}
	rubyText.value = html(value.value);
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
