<template>
	<div class="contaniner">
		<h3>背景图片</h3>
		<div>当前背景: <img class="bg" :src="bgUrl" alt="背景图片" /></div>
		<div class="action">
			<xtt-button @click="open">自定义图片</xtt-button>
			<xtt-button style="margin-inline-start: 8px" @click="resetBG">默认图片</xtt-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { setWebBGUrl, bgUrl } from "@/utils/webBG";
import { useFileDialog } from "@vueuse/core";

const { files, open, reset } = useFileDialog();

watch(files, (val) => {
	if (val?.length) {
		setWebBGUrl(val[0]);
	}
});

const resetBG = () => {
	setWebBGUrl(undefined);
	reset();
};
</script>

<style scoped>
.contaniner {
	padding: 8px;
}

.action {
	margin-block-start: 8px;
	padding-inline-start: 90px;
}

.bg {
	margin-inline-start: 2em;
	height: 100px;
}
</style>
