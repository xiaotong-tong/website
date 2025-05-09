<template>
	<section class="container">
		<Panel targetName="h1" contentMarginBlockStart="0">
			<ruby>
				漢字
				<rp>(</rp><rt>かんじ</rt><rp>)</rp>
			</ruby>
			→
			<ruby>
				仮名
				<rp>(</rp><rt>かな</rt><rp>)</rp>
			</ruby>
		</Panel>

		<NInput v-model:value="value" :rows="5" type="textarea" placeholder="日本語を入力してください" />
		<div class="flex mt-4">
			<NamiButton @click="transform" :borderColor="store.currentTheme" :loading="tranLoading">
				{{ i18nStore.lang === "ja" ? "変更する" : "转换" }}</NamiButton
			>
			<NamiButton class="ms-4" :borderColor="store.currentTheme" @click="copy" v-if="isSupported && isParsed">
				<span v-if="!copied">{{ i18nStore.lang === "ja" ? "コピー" : "复制" }}</span>
				<span v-else>{{ i18nStore.lang === "ja" ? "コピーしました" : "复制成功" }}</span>
			</NamiButton>
			<NamiButton
				v-if="kanaHistory.size"
				class="ms-auto"
				:borderColor="store.currentTheme"
				@click="kanaHistory.clear()"
				>清除缓存</NamiButton
			>
		</div>
		<div class="ruby-text" v-html="rubyText"></div>

		<div class="history" v-if="kanaHistory.size">
			<Panel targetName="h3" contentMarginBlockStart="0">
				<ruby v-lang="'ja'">
					履歴
					<rp>(</rp><rt>りれき</rt><rp>)</rp>
				</ruby>
				<ruby v-lang="'zh'">
					历史
					<rp>(</rp><rt><del>れきし</del></rt
					><rp>)</rp>
				</ruby>
			</Panel>
			<div class="history-content">
				<div v-for="[key, value] in kanaHistory" :key="key" class="flex items-center mt-1 gap-x-2">
					<div class="w-[140px] flex-none">
						{{ formatDate(key, "yyyy-MM-DD HH:mm:ss") }}
					</div>
					<NButton aria-label="复制" text @click="copy($event, value)"
						><namiIcon icon="mdiContentCopy"></namiIcon
					></NButton>
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
import { Panel, NamiButton } from "@c/index";
import { formatDate } from "xtt-utils";

const { copy: useCopy, isSupported, copied } = useClipboard();

const store = useStore();
const i18nStore = useI18nStore();

const rubyText = ref("");
const value = ref("");
const isParsed = ref(false);
const tranLoading = ref(false);

const kanaHistory = useLocalStorage("kana_history", new Map<number, string>());

const transform = async () => {
	if (!value.value) {
		return;
	}
	tranLoading.value = true;
	rubyText.value = await toKana(value.value);
	isParsed.value = true;
	tranLoading.value = false;

	kanaHistory.value.set(Date.now(), rubyText.value);
};

const copy = async (_: any, value?: string) => {
	if (!value) {
		value = rubyText.value;
	}

	try {
		await useCopy(value);

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
</style>
