<template>
	<section class="container web-color-default">
		<h1 class="title">聊天</h1>
		<section class="history-wrap" ref="historyWrap">
			<div class="history-item">
				<span class="text"> 你好，有什么可以帮到你的吗？ </span>
			</div>
			<div class="history-item" v-for="item in history" :key="item">
				<span class="text">
					{{ item }}
				</span>
			</div>
		</section>
		<NInput
			type="textarea"
			v-model="text"
			placeholder="请输入聊天内容"
			autosize
			autofocus
			@keydown="keydown"
		></NInput>
		<div style="text-align: end">
			<NamiButton @click="chat" :disabled="loading">发送</NamiButton>
		</div>
	</section>
</template>

<script setup lang="ts">
import { chatWithBot } from "@/api/chat/chat";
import { ref, nextTick } from "vue";
import { NInput } from "naive-ui";
import { NamiButton } from "@c/index";

const text = ref("");
const history = ref<string[]>([]);
const historyWrap = ref<HTMLElement | null>(null);

const loading = ref(false);

const chat = async () => {
	if (!text.value) return;

	loading.value = true;
	history.value.push(text.value);
	text.value = "";
	const res = await chatWithBot(history.value);
	history.value.push(res);
	loading.value = false;

	nextTick(() => {
		if (historyWrap.value) {
			historyWrap.value.scrollTop = historyWrap.value.scrollHeight;
		}
	});
};

const keydown = (e: KeyboardEvent) => {
	if (e.ctrlKey && e.key === "Enter") {
		chat();
	}
};
</script>

<style scoped>
.container {
	box-sizing: border-box;
	padding-block: 8px;
}

.title {
	margin-block-start: 0;
}

.history-wrap {
	margin-block: 16px;
	padding-inline: 16px;
	max-height: calc(100vh - 270px);
	overflow: auto;
}
.history-item {
	margin-block: 16px;
}

.history-item:nth-child(odd) {
	text-align: start;
}
.history-item:nth-child(even) {
	text-align: end;
}
.text {
	display: inline-block;
	padding: 8px 16px;
	border-radius: 8px;
	background-color: #f2f2f2;
}
.history-item:nth-child(even) .text {
	background-color: #ebf5ff;
}
</style>
