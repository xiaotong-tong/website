<template>
	<section class="container web-color-default">
		<h1 class="text-center">拼音</h1>
		<xtt-textarea v-model="text" placeholder="请输入中文" block rows="10"></xtt-textarea>
		<xtt-button @click="transform" type="primary">确定</xtt-button>
		<div class="ruby-text" v-html="rubyText"></div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="拼音，汉字转拼音" />
	</Teleport>
</template>

<script setup lang="ts">
import { html } from "pinyin-pro";
import { ref } from "vue";

const text = ref("");
const rubyText = ref("");

const transform = () => {
	rubyText.value = html(text.value);
};
</script>

<style scoped>
.ruby-text {
	margin-block-start: 16px;
	line-height: 2.5;
	letter-spacing: 2px;
}
</style>
