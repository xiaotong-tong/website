<template>
	<section class="container web-color-default">
		<hBanner wrapperTargetName="h1" class="text-center">漢字 → 仮名</hBanner>

		<NInput
			v-model:value="value"
			:rows="5"
			type="textarea"
			placeholder="日本語を入力してください"
		/>
		<div class="flex mt-4">
			<NButton @click="transform" :color="store.currentTheme">{{
				i18nStore.lang === "ja" ? "変更する" : "转换"
			}}</NButton>
			<NButton
				class="ms-4"
				:color="store.currentTheme"
				@click="copy"
				v-if="isSupported && isParsed"
			>
				<span v-if="!copied">{{ i18nStore.lang === "ja" ? "コピー" : "复制" }}</span>
				<span v-else>{{ i18nStore.lang === "ja" ? "コピーしました" : "复制成功" }}</span>
			</NButton>
			<NButton
				v-if="kanaHistory.size"
				class="ms-auto"
				:color="store.currentTheme"
				@click="kanaHistory.clear()"
				>清除缓存</NButton
			>
		</div>
		<div class="ruby-text" v-html="rubyText"></div>

		<div class="history" v-if="kanaHistory.size">
			<hBanner wrapperTargetName="h3" class="text-center">{{
				i18nStore.lang === "ja" ? "履歴" : "历史"
			}}</hBanner>
			<div class="history-content">
				<div v-for="[key, value] in kanaHistory" :key="key" class="history-item">
					<div>{{ formatDate(key, "yyyy-MM-DD HH:mm:ss") }}</div>
					<div v-html="value"></div>
				</div>
			</div>
		</div>
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
import { useClipboard, useLocalStorage } from "@vueuse/core";
import { useStore } from "@/stores";
import { hBanner } from "@c/index";
import { formatDate } from "xtt-utils";

const { copy: useCopy, isSupported, copied } = useClipboard();

const store = useStore();
const i18nStore = useI18nStore();

const rubyText = ref("");
const value = ref("");
const isParsed = ref(false);

const kanaHistory = useLocalStorage("kana_history", new Map<number, string>());

const transform = async () => {
	if (!value.value) {
		return;
	}
	rubyText.value = await toKana(value.value);
	isParsed.value = true;

	kanaHistory.value.set(Date.now(), rubyText.value);
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
.history-content {
	display: flex;
	flex-direction: column-reverse;
	row-gap: 8px;
}
.history-item {
	display: flex;
}
.history-item > div:first-child {
	margin-inline-end: 16px;
	margin-block-start: 4px;
}
</style>
