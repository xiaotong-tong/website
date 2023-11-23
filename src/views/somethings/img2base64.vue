<template>
	<section class="container web-color-default">
		<p class="title">选择图片</p>
		<input type="file" accept="image/*" @change="fileChange" />

		<p>base64内容</p>
		<xtt-textarea v-model="textarea" block rows="10"></xtt-textarea>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toDataUrl } from "xtt-utils";

document.title = "将图片转换为base64 - 星川漣の家";

const textarea = ref("");

const fileChange = (e: any) => {
	toDataUrl(e.target.files[0]).then((res) => {
		textarea.value = res;
	});
};
</script>

<style scoped></style>
