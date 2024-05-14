<template>
	<section v-if="search" class="no-search-content">
		<img class="img" src="https://image.xtt.moe/images/404.webp" alt="404 Not Found" />
		<p>当前页面正在加工中</p>
	</section>
	<section class="card" v-else-if="loaded">
		<header class="card-title">
			<h3 class="title">每日学习</h3>
			<p class="sub">
				{{ nowDay.format("YYYY 年") }}第 {{ nowDay.dayOfYear() }} 天
				<span>{{ weekNames[nowDay.day()] }}</span>
			</p>
		</header>
		<namiRoughLine color="#f1755966"></namiRoughLine>
		<div class="poetry-wrap" v-if="poetry">
			<h4>{{ poetry.title }}</h4>
			<p v-for="item in poetry.paragraphs">
				<span>{{ item }}</span>
			</p>
		</div>
		<div class="quote-wrap" v-if="quote">
			<p>每日日语一百句 <span v-if="quoteOverflow" class="quote-overflow">兼容</span></p>
			<namiRoughLine color="#f1755966"></namiRoughLine>
			<p v-html="quote.parse"></p>
			<p>
				{{ quote.chinese }}
			</p>
		</div>
		<div class="character-wrap">
			<img
				class="character"
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
import { ref } from "vue";
import type { IGetDaysPoetry, IGetDaysQuotes } from "../home.api";
import { getDaysQuotes, getDaysPoetry } from "../home.api";
import { dayjs } from "@/utils/dateUtil";
import { useRouteHash } from "@vueuse/router";

const search = useRouteHash();

const loaded = ref(false);

const weekNames = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
const originDay = dayjs("2024-04-14");
const nowDay = dayjs();

const quote = ref<IGetDaysQuotes>();
const poetry = ref<IGetDaysPoetry>();
const quoteLoading = ref(true);
const quoteOverflow = ref(false);
const poetryLoading = ref(true);

const key = nowDay.diff(originDay, "day");

getDaysQuotes(key)
	.then((res) => {
		quote.value = res;
		quoteLoading.value = false;

		if (!poetryLoading.value) {
			loaded.value = true;
		}
	})
	.catch((error) => {
		// 如果传出的错误是超出最大值，则进行取余后再次请求
		if (error.maxKey) {
			getDaysQuotes(key % error.maxKey).then((res) => {
				quote.value = res;
				quoteLoading.value = false;
				quoteOverflow.value = true;

				if (!poetryLoading.value) {
					loaded.value = true;
				}
			});
		}
	});

getDaysPoetry(key).then((res) => {
	poetry.value = res;
	poetryLoading.value = false;

	if (!quoteLoading.value) {
		loaded.value = true;
	}
});
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

.card-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.poetry-wrap {
	flex: 1;
	overflow: auto;
	max-inline-size: 50%;
	max-block-size: calc(100% - 300px);
	align-self: flex-start;
	margin-inline-start: 280px;
	text-align: center;
}

.poetry-wrap > :is(h4, p) {
	flex: 0 0 100%;
}

.quote-wrap {
	overflow: auto;
	min-block-size: 100px;
	max-block-size: 300px;
	inline-size: 50%;
	align-self: flex-end;
	margin-block-end: 2em;
}

.quote-overflow {
	font-size: 8px;
	color: #f00;
}

.character-wrap {
	position: absolute;
	inset-block-start: 100px;
	width: 264px;
}
.character {
	display: block;
	width: 100%;
}

.no-search-content {
	display: block;
	text-align: center;
}
.img {
	width: 100%;
	max-width: 400px;
	margin-top: 30px;
}

.small-screen .card {
	padding-inline-end: 8px;
}
.small-screen .card-title :is(.title, .sub) {
	margin-block: 0.5em;
}

.small-screen .character-wrap {
	z-index: -2;
	opacity: 0.3;
}
.small-screen .poetry-wrap {
	margin-inline: 0;
	inline-size: 100%;
	max-inline-size: 100%;
	max-block-size: none;
}
.small-screen .quote-wrap {
	align-self: flex-start;
	inline-size: 100%;
}
</style>
