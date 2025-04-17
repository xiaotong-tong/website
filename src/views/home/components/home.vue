<template>
	<section
		class="box-border relative h-full flex flex-col"
		:class="{
			isSmall: isSmall
		}"
		v-show="loaded"
	>
		<header class="title flex justify-between items-center">
			<Panel wrapperTargetName="h3">
				{{ t("pages.home.header") }}
			</Panel>
			<div class="sub">
				<span>{{
					t("pages.home.dayOfYear", {
						year: nowDay.format("YYYY"),
						day: nowDay.dayOfYear()
					})
				}}</span>
				<span class="ml-2">{{ d(new Date(), "week") }}</span>
				<BaseIcon
					@click="autoPlay"
					icon="mdiMusicNote"
					class="cursor-pointer ml-2 text-[20px] hidden md:inline align-bottom"
					:class="{ 'animate-spin': songing }"
				/>
			</div>
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
import namiNav from "@/views/home/components/nav.vue";
import { ref, computed, inject } from "vue";
import { dayjs } from "@/utils/dateUtil";
import Quote from "./home/quote.vue";
import Hefu from "./home/hefu.vue";
import Poetry from "./home/poetry.vue";
import { Panel, BaseIcon } from "@c/index";
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

const namiNavRef = inject<typeof namiNav>("namiNavRef");

const playMap = [
	{
		song: "1155665- 4433221- 5544332- 5544332- 1155665- 4433221-",
		bpm: 120
	},
	{
		song: "1231 1231 345- 345- 5_6_5_4_31 5_6_5_4_31 251- 251-",
		bpm: 120
	},
	{
		song: [
			"3__ 3_2__1__ 2_3__5__ 5",
			"2_2__5__ 2_3__2__ 2",
			"1__6__6_ 6_6__1__ 6_^5__ ^1_ 1-2-",
			"2__3__3__3__ ^3__2__1__ 5_3_3__ ^2__3__",
			"2__2_3__ 2__1_6__ ^",
			"1__1__1__6__ 2__1_6__6__ 1__1__1__6__ 2__1__1__1__",
			"^_2_ 2__3_2__ ^",
			"2__3__3__3__ 3__3_5__ 5__5_3__ 2__3__2__3__",
			"2_3_ 2_1_6__ ^",
			"1__1__1__6__ 1__2_6___6___ 1__1__1__6__ 2__1_^",
			"2_^2__ 2_3_ 2^ 5__6__",
			"6__5_5__ 5_5__6__ 6__1_6__ 5__6__5__3__",
			"2_2_ 2__3__2__6__ ^",
			"1__1__1__6__ 1__2_6___6___ 1__1__1__6__ 2__1_^",
			"6__6_6__ 6_3__6__ 6__5_^ 5-",
			"5__3__2__3__ 3__5__3__3__ 3-",
			"2__2_3__ 2_6__2__ 2-",
			"1__1__1__1__ 1__6_1__ ^1__1__1__ 2__1__1__1__",
			"6__5__5__5__ 5__5__5__3__ 6_5_ 5^5__",
			"6__5__6__5__ 6_^5__ 5__3__5__3_ 5__5_5__ 6_6__6__ 5__6__5__3__ 3^3__ 2__1__2__1__ 2__6_1__ 1__7__1__7__ 1__6_^ 1_7_ 7__1__7__6__ 6",
			"5__5__ 1_2__3__ 5_2__3__2__ 51 6_^5__ 5_5_ 5-",
			"5__3__2__3__ 3__5__3__3__ 5__3_^ 3",
			"2__2_3__ 2_6__3__ 3-",
			"1__1__1__1__ 1__6_1__ 1__1__1__1__ 2__1__1__1__",
			"6__5__5__5__ 5__5__5__1__ 6_^5__ 5_^5__",
			"6__5__6__5__ 6_^5__ 5__3__5__3_ 5_5__5__ 6_6__6__ 5__6__5__3__ 3^3__ 2__1__2__1__ 2__6_1__ 1__7__1__7__ 1__6_^ 1_7_ 7__1__7__6__ 6",
			"6^3__ 2__1__2__1__ 2__6_1__ ^7__1__7__ 1__6_^ 177_1_6 6^"
		].join(""),
		bpm: 70
	}
];

const songing = ref(false);
function play(song: string, bpm: number) {
	if (songing.value) {
		return;
	}
	songing.value = true;
	namiNavRef?.value.autoPlayPiano(song, bpm, () => {
		songing.value = false;
	});
}

function autoPlay() {
	if (songing.value) {
		namiNavRef?.value.pauseAutoPlayPiano();
		return;
	}
	// 随机播放一首歌
	const randomIndex = Math.floor(Math.random() * playMap.length);
	const { song, bpm } = playMap[randomIndex];
	play(song, bpm);
}
</script>

<style scoped>
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
