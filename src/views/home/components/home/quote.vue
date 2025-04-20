<template>
	<div class="quote-wrap" v-if="quote">
		<p>
			{{ t("pages.home.quote.title") }}
			<span v-if="originalQuoteKey !== quoteKey" class="text-[8px] text-[#f00]">{{
				t("pages.home.quote.overflowTip")
			}}</span>
		</p>
		<namiRoughLine class="my-2"></namiRoughLine>
		<div lang="ja-JP" class="custom-font">
			<div class="inline-block" v-html="quote.parse"></div>
			<Sound class="ml-2" :src="quoteSoundPrefix + quote.sound"></Sound>
		</div>
		<p lang="zh-CN" class="custom-font">
			{{ quote.chinese }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IGetDaysQuotes } from "../../home.api";
import { getDaysQuotes } from "../../home.api";
import { dayjs } from "@/utils/dateUtil";
import { useSessionStorage } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useMessage, Sound } from "@c/index";

const { t } = useI18n();
const message = useMessage();

const emits = defineEmits(["onLoad"]);

const originalQuoteKey = dayjs().diff(dayjs("2024-04-14"), "day");

const quoteKey = useSessionStorage<number>("quoteKey", originalQuoteKey);

const quote = ref<IGetDaysQuotes>();
const quoteSoundPrefix = "https://file.xtt.cool";

getDaysQuotes(quoteKey.value)
	.then((res) => {
		quote.value = res;
	})
	.catch((error) => {
		// 如果传出的错误是超出最大值，则进行取余后再次请求
		if (error.maxKey) {
			quoteKey.value = quoteKey.value % error.maxKey;
			getDaysQuotes(quoteKey.value).then((res) => {
				quote.value = res;
			});
		} else {
			message.error("获取一言失败, 显示默认一言");
			// 即使无网络等请求失败，也要展示默认日语
			quote.value = {
				key: 100,
				sentence: "初心忘るべからず。",
				parse: "<ruby>初心忘<rp>(</rp><rt>しょしんわす</rt><rp>)</rp></ruby>るべからず。",
				chinese: "不忘初心。",
				sound: "/local/quotes/q100.wav"
			};
		}
	})
	.finally(() => {
		emits("onLoad");
	});
</script>

<style scoped>
.quote-wrap {
	overflow: auto;
	min-block-size: 100px;
	max-block-size: 300px;
	inline-size: clamp(50%, 500px, 100%);
	align-self: flex-end;
	margin-block-end: 2em;
}

.small-screen .quote-wrap {
	align-self: center;
}
</style>
