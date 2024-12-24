<template>
	<section
		class="card box-border relative h-full flex flex-col"
		:class="{
			isSmall: isSmall
		}"
		v-show="loaded"
	>
		<header class="title flex justify-between items-center">
			<Panel wrapperTargetName="h3">
				{{ t("pages.home.header") }}
			</Panel>
			<p class="sub">
				<span>{{
					t("pages.home.dayOfYear", {
						year: nowDay.format("YYYY"),
						day: nowDay.dayOfYear()
					})
				}}</span>
				<span class="ml-2">{{ d(new Date(), "week") }}</span>
			</p>
		</header>

		<namiRoughLine></namiRoughLine>
		<div class="poetry-wrap mb-2 box-border w-full flex-1 self-start overflow-auto" lang="zh-CN">
			<Hefu v-if="loaded"></Hefu>
			<Poetry @onLoad="poetryLoaded = true"></Poetry>
		</div>

		<namiRoughLine></namiRoughLine>
		<Quote ref="poetryRef" @onLoad="quoteLoaded = true"></Quote>
	</section>

	<section v-show="!loaded">
		<namiPageLoading></namiPageLoading>
	</section>

	<Teleport to="head">
		<link rel="preload" href="https://api.xtt.moe/days/poetry/self" as="fetch" />
	</Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { dayjs } from "@/utils/dateUtil";
import Quote from "./home/quote.vue";
import Hefu from "./home/hefu.vue";
import Poetry from "./home/poetry.vue";
import { Panel } from "@c/index";
import { useI18n } from "vue-i18n";
import { useContentRefStore } from "@/stores/contentRef";

const { t, d } = useI18n();
const contentRefStore = useContentRefStore();

const nowDay = dayjs();

const quoteLoaded = ref(false);
const poetryLoaded = ref(false);
const loaded = computed(() => quoteLoaded.value && poetryLoaded.value);

// 是否是小屏幕，小屏幕下会改变显示布局
const isSmall = computed(() => contentRefStore.width < 600);
</script>

<style scoped>
.card {
	padding-inline-end: 2em;
}

.poetry-wrap {
	max-block-size: calc(100% - 300px);
	padding-inline-start: 48px;

	display: flex;
	justify-content: space-between;
}

.poetry-wrap:has(.poetry-overflow) {
	display: block;
	padding-inline-start: 8px;
}

.card.isSmall {
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
