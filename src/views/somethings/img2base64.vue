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
// import { toDataUrl } from "xtt-utils";
// 不知道为什么上面这种写法，在 vite 打包时，会在 index.html 文件引用打包好的 something 文件
// 导致首页进行了多余的加载，下面这种写法优化后，解决了这个问题
// NOTE: 问题发生的原因不明
import { toDataUrl } from "xtt-utils/file/toDataUrl";

document.title = "将图片转换为base64 - 星川漣の家";

const textarea = ref("");

const fileChange = (e: any) => {
	toDataUrl(e.target.files[0]).then((res) => {
		textarea.value = res;
	});
};
</script>

<style scoped></style>
