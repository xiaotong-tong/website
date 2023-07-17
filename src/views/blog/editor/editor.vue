<template>
	<div>标题： <xtt-textarea autosize ref="title"></xtt-textarea></div>
	<div>作者： <xtt-textarea autosize></xtt-textarea></div>
	<p>正文：</p>
	<xtt-editor-md ref="content"></xtt-editor-md>

	<div>
		<xtt-button @click="submitEvent">发布</xtt-button>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { addActicle } from "@/api/blog/blog.js";

const title = ref(null);
const content = ref(null);

const submitEvent = () => {
	const titleValue = title.value.value;
	// if (!titleValue) return alert("标题不能为空");

	// const contentValue = content.value;
	addActicle({
		title: "titleValue",
		content: "contentValue",
		author: "authorValue"
	});
};
</script>

<style scoped></style>
