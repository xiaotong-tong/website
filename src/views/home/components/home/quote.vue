<template>
	<div class="quote-wrap" v-if="quote">
		<p>每日日语 <span v-if="quoteOverflow" class="text-[8px] text-[#f00]">兼容</span></p>
		<namiRoughLine class="my-2" :color="store.currentTheme"></namiRoughLine>
		<p v-html="quote.parse"></p>
		<p>
			{{ quote.chinese }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IGetDaysQuotes } from "../../home.api";
import { getDaysQuotes } from "../../home.api";
import { dayjs } from "@/utils/dateUtil";
import { useStore } from "@/stores";
const store = useStore();

const emits = defineEmits(["onLoad"]);

const isFinished = ref(false);

const quote = ref<IGetDaysQuotes>();
const quoteOverflow = ref(false);

const key = dayjs().diff(dayjs("2024-04-14"), "day");

getDaysQuotes(key)
	.then((res) => {
		quote.value = res;
		isFinished.value = true;
		emits("onLoad");
	})
	.catch((error) => {
		// 如果传出的错误是超出最大值，则进行取余后再次请求
		if (error.maxKey) {
			getDaysQuotes(key % error.maxKey).then((res) => {
				quote.value = res;
				quoteOverflow.value = true;
				isFinished.value = true;
				emits("onLoad");
			});
		}
	});

defineExpose({
	isFinished
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
