<template>
	<section class="card" v-show="loaded">
		<header class="title flex justify-between items-center">
			<hBanner wrapperTargetName="h3">
				{{ t("pages.home.header") }}
			</hBanner>
			<p class="sub">
				<span v-lang="'zh'"
					>{{ nowDay.format("YYYY 年") }}第 {{ nowDay.dayOfYear() }} 天</span
				>
				<span v-lang="'ja'"
					>{{ nowDay.format("YYYY 年") }} {{ nowDay.dayOfYear() }} 日目
				</span>
				<span>{{ weekNames[nowDay.day()] }}</span>
			</p>
		</header>
		<namiRoughLine :color="store.currentTheme"></namiRoughLine>
		<div class="poetry-wrap mb-2" lang="zh-CN">
			<Hefu v-if="loaded"></Hefu>
			<Poetry @onLoad="poetryLoadedFn"></Poetry>
		</div>

		<namiRoughLine :color="store.currentTheme"></namiRoughLine>
		<Quote ref="poetryRef" @onLoad="quoteLoadedFn"></Quote>

		<div class="character-wrap" aria-hidden="true">
			<img
				class="block w-full"
				src="https://image.xtt.moe/images/lian5.webp"
				alt="人物立绘"
				draggable="false"
			/>
		</div>
	</section>

	<section v-show="!loaded">
		<namiPageLoading></namiPageLoading>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dayjs } from "@/utils/dateUtil";
import Quote from "./home/quote.vue";
import Hefu from "./home/hefu.vue";
import Poetry from "./home/poetry.vue";
import { hBanner } from "@c/index";
import { useStore } from "@/stores";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

const loaded = ref(false);

const weekNames = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
const nowDay = dayjs();

const quoteLoaded = ref(false);
const poetryLoaded = ref(false);

function quoteLoadedFn() {
	quoteLoaded.value = true;

	if (poetryLoaded.value) {
		loaded.value = true;
	}
}

function poetryLoadedFn() {
	poetryLoaded.value = true;

	if (quoteLoaded.value) {
		loaded.value = true;
	}
}
</script>

<style scoped>
.card {
	box-sizing: border-box;
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-inline-end: 2em;
}

.poetry-wrap {
	flex: 1;
	overflow: auto;
	inline-size: 100%;
	max-block-size: calc(100% - 300px);
	align-self: flex-start;
	padding-inline-start: 48px;
	box-sizing: border-box;

	display: flex;
	justify-content: space-between;
}

.poetry-wrap:has(.poetry-overflow) {
	display: block;
	padding-inline-start: 8px;
}

.character-wrap {
	position: absolute;
	inset-block-start: 100px;
	width: 264px;
	z-index: -2;
	opacity: 0.2;
}

.small-screen .card {
	padding-inline-end: 8px;

	& .title {
		flex-direction: column;
	}
	& .title .sub {
		font-size: 14px;
		margin-block-start: -18px;
	}
}
</style>
