<template>
	<section v-if="search" class="flex flex-col items-center">
		<img
			class="max-w-96 mt-8"
			src="https://image.xtt.moe/images/404.webp"
			alt="404 Not Found"
		/>
		<p>当前页面正在加工中</p>
	</section>
	<section class="card font-[luoliti]" v-else-if="loaded">
		<header class="flex justify-between items-center">
			<hBanner wrapperTargetName="h3">每日学习</hBanner>
			<p class="sub">
				{{ nowDay.format("YYYY 年") }}第 {{ nowDay.dayOfYear() }} 天
				<span>{{ weekNames[nowDay.day()] }}</span>
			</p>
		</header>
		<namiRoughLine :color="store.currentTheme"></namiRoughLine>
		<div class="poetry-wrap">
			<div id="hefu" class="text-lg my-4 leading-8" ref="hefuRef"></div>
			<div
				v-if="curData"
				class="writing-mode-v-rl text-center tracking-widest"
				ref="selfPoetryRef"
			>
				<h4 class="text-xl font-bold">{{ curData.title }}</h4>
				<span class="inline-block ml-4">{{ curData.author }}</span>
				<p v-for="item in curData.paragraphs" class="ml-1">
					<span>{{ item }}</span>
				</p>
			</div>
		</div>

		<div class="quote-wrap" v-if="quote">
			<p>
				每日日语一百句 <span v-if="quoteOverflow" class="text-[8px] text-[#f00]">兼容</span>
			</p>
			<namiRoughLine class="my-2" :color="store.currentTheme"></namiRoughLine>
			<p v-html="quote.parse"></p>
			<p>
				{{ quote.chinese }}
			</p>
		</div>
		<div class="character-wrap">
			<img
				class="block w-full"
				src="https://image.xtt.moe/images/lian5.webp"
				alt="人物立绘"
				draggable="false"
			/>
		</div>
	</section>

	<section v-else>
		<namiPageLoading></namiPageLoading>
	</section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import type { IGetDaysQuotes } from "../home.api";
import { getDaysQuotes } from "../home.api";
import { useFetch } from "@vueuse/core";
import { dayjs } from "@/utils/dateUtil";
import { getOne } from "@/utils/array";
import Typed from "typed.js";
import { hBanner } from "@c/index";
import { useRouteHash } from "@vueuse/router";
import { useStore } from "@/stores";
const store = useStore();

const search = useRouteHash();

const loaded = ref(false);

const weekNames = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
const originDay = dayjs("2024-04-14");
const nowDay = dayjs();

const quote = ref<IGetDaysQuotes>();
const quoteLoading = ref(true);
const quoteOverflow = ref(false);

const key = nowDay.diff(originDay, "day");

interface Item {
	key: number;
	title: string;
	author: string;
	paragraphs: string[];
}
const { data, isFinished } = useFetch("https://api.xtt.moe/days/poetry/self").json<Item[]>();

getDaysQuotes(key)
	.then((res) => {
		quote.value = res;
		quoteLoading.value = false;

		if (isFinished.value) {
			loaded.value = true;
			hefuTyped();
		}
	})
	.catch((error) => {
		// 如果传出的错误是超出最大值，则进行取余后再次请求
		if (error.maxKey) {
			getDaysQuotes(key % error.maxKey).then((res) => {
				quote.value = res;
				quoteLoading.value = false;
				quoteOverflow.value = true;

				if (isFinished.value) {
					loaded.value = true;
					hefuTyped();
				}
			});
		}
	});

let curData = ref<Item | null>(getOne(data));

watch(data, () => {
	curData.value = getOne(data);
});
watch(isFinished, () => {
	if (quoteLoading.value === false) {
		loaded.value = true;
		hefuTyped();
	}
});

const hefuRef = ref<HTMLElement | null>(null);
function hefuTyped() {
	nextTick(() => {
		if (!hefuRef.value) return;

		const contentStr = `愿君之财 盈若银河之星斗 得如长江之奔流<br />
				愿君之气运 鸿于钟山之巅 漫于北冥之边<br />
				愿君之居所 犹如雀台金谷 又似阆苑紫府<br />
				愿君所穿之衣 皆具绫罗霓裳 都佩流苏凤簪<br />
				愿君堂中双亲 寿逾慧照彭祖 龄越逆流篙舟<br />
				愿君房下儿孙 志若鸿鹄 勇压蚣蝮 慧胜白泽<br />
				愿郎君当作 不逊绝影赤兔 可比飞电的卢<br />
				愿佳人如是 灵韫过处 不敢言淑 茗姬若生 羞于称文<br />
				愿君所爱之人 青丝白首俱携行 宁舍千金要尔君`;

		if (store.animeLess) {
			hefuRef.value.innerHTML = contentStr;
			hefuRef.value?.classList.add("text-justify");
		} else {
			new Typed(hefuRef.value, {
				strings: [contentStr],
				typeSpeed: 50,
				showCursor: false,
				onComplete() {
					hefuRef.value?.classList.add("text-justify");
				}
			});
		}
	});
}
</script>

<style scoped>
.card {
	box-sizing: border-box;
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 8px;
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

.quote-wrap {
	overflow: auto;
	min-block-size: 100px;
	max-block-size: 300px;
	inline-size: 50%;
	align-self: flex-end;
	margin-block-end: 2em;
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
}
.small-screen .card-title :is(.title, .sub) {
	margin-block: 0.5em;
}

.small-screen .poetry-wrap {
	inline-size: 100%;
	max-inline-size: 100%;
	max-block-size: none;
}
.small-screen .quote-wrap {
	align-self: flex-start;
	inline-size: 100%;
}
</style>
