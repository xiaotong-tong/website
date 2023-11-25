<template>
	<section class="container web-color-default">
		<h1 class="text-center">聊天</h1>
		<section class="history-wrap">
			<div class="history-item">
				<span class="text"> 你好，有什么可以帮到你的吗？ </span>
			</div>
			<div class="history-item" v-for="item in history" :key="item">
				<span class="text">
					{{ item }}
				</span>
			</div>
		</section>
		<xtt-textarea
			v-model="text"
			placeholder="请输入聊天内容"
			block
			autosize
			autofocus
		></xtt-textarea>
		<div style="text-align: end">
			<xtt-button @click="chat" type="primary">发送</xtt-button>
		</div>
	</section>
</template>

<script setup lang="ts">
import { chatWithBot } from "@/api/chat/chat";
import { ref } from "vue";

const text = ref("");
const history = ref<string[]>([]);

const chat = async () => {
	if (!text.value) return;

	history.value.push(text.value);
	text.value = "";
	const res = await chatWithBot(history.value);
	history.value.push(res);
};
</script>

<style scoped>
.history-wrap {
	margin-block: 16px;
	padding-inline: 16px;
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
