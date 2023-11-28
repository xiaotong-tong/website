<template>
	<section class="container web-color-default">
		<h1 class="text-center">漢字→仮名</h1>
		<xtt-textarea
			v-model="text"
			placeholder="日本語を入力してください"
			block
			rows="10"
		></xtt-textarea>
		<xtt-button @click="transform" type="primary">确定</xtt-button>
		<div class="ruby-text" v-html="rubyText"></div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="かな" />
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toKana } from "@/api/something/kana";

const text = ref("");
const rubyText = ref("");

const transform = async () => {
	rubyText.value = await toKana(text.value);
};
</script>

<style scoped>
.ruby-text {
	margin-block-start: 16px;
	line-height: 2.5;
	letter-spacing: 2px;
}
</style>
