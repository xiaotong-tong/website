<template>
	<section class="container">
		<div class="top-tip" v-if="isFinished">
			<span class="parse" @click="copy">复制</span>
			<span class="json" @click="downloadJson">下载 json</span>
			<span class="txt" @click="downloadTxt">下载 txt</span>
		</div>
		<div class="div" v-for="item in data" :key="item.key">
			<p class="top">
				<span>
					{{ startDay.add(item.key - 1, "day").format("YYYY-MM-DD") }}
					{{ weekNames[startDay.add(item.key - 1, "day").day()] }}
				</span>

				<span class="unit-parse">
					<span @click="copyUnit(item, 'json')">复制 json</span>
					<span @click="copyUnit(item, 'text')">复制文本</span>
				</span>
			</p>
			<p v-html="item.parse"></p>
			<p>
				{{ item.chinese }}
			</p>
			<namiRoughLine></namiRoughLine>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useFetch, useClipboard } from "@vueuse/core";
import { dayjs } from "@/utils/dateUtil";
import confetti from "canvas-confetti";

interface Item {
	key: number;
	parse: string;
	chinese: string;
	sentence: string;
}

const { data, isFinished } = useFetch("https://api.xtt.moe/days/quotes/list").json<Item[]>();

const startDay = dayjs("2024-04-14");
const weekNames = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

const { copy: useCopy } = useClipboard();

function after() {
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { y: 0.6 }
	});
}

function copy() {
	useCopy(JSON.stringify(data.value, null, "\t"));
	after();
}
function copyUnit(item: Item, type: "json" | "text") {
	if (type === "json") {
		useCopy(JSON.stringify(item, null, "\t"));
	} else {
		useCopy(item.sentence + "\n" + item.chinese);
	}
	after();
}

function download(blob: Blob, name: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	URL.revokeObjectURL(url);
	a.remove();
	after();
}

function downloadJson() {
	const blob = new Blob([JSON.stringify(data.value, null, "\t")], { type: "application/json" });
	download(blob, "daysQuotes.json");
}
function downloadTxt() {
	const blob = new Blob([data.value!.map((item) => item.sentence + "\n" + item.chinese).join("\n\n")], {
		type: "text/plain"
	});
	download(blob, "daysQuotes.txt");
}
</script>

<style scoped>
.container {
	position: relative;
}
.top-tip {
	position: sticky;
	inset-block-start: 0;
	inset-inline: 8px;
	color: var(--d-color);
	background-color: #ffffffdd;

	display: flex;
	justify-content: end;
	cursor: pointer;
	column-gap: 8px;
}

.top {
	display: flex;
	justify-content: space-between;
}

.unit-parse {
	color: var(--d-color);
	display: inline-flex;
	column-gap: 8px;
}
.unit-parse > span {
	cursor: pointer;
}
</style>
