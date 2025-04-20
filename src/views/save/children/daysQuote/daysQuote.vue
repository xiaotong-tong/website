<template>
	<section class="container">
		<div class="top-tip" v-if="isFinished">
			<span class="parse" @click="copy">复制</span>
			<span class="json" @click="downloadJson">下载 json</span>
			<span class="txt" @click="downloadTxt">下载 txt</span>
		</div>
		<div class="div" v-for="item in data" :key="item.key">
			<div class="top">
				<div class="text-lg inline-flex items-center">
					<span>day {{ item.key }}</span>
					<Sound class="ml-2" :src="quoteSoundPrefix + item.sound" preload="none"></Sound>
				</div>

				<span class="unit-parse">
					<span @click="copyUnit(item, 'json')">复制 json</span>
					<span @click="copyUnit(item, 'text')">复制文本</span>
				</span>
			</div>
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
import confetti from "canvas-confetti";
import { Sound } from "@c/index";

interface Item {
	key: number;
	parse: string;
	chinese: string;
	sentence: string;
	sound: string;
}

const { data, isFinished } = useFetch("https://api.xtt.cool/days/quotes/list").json<Item[]>();
const quoteSoundPrefix = "https://file.xtt.cool";

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
