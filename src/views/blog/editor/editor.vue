<template>
	<div>标题： <xtt-textarea autosize ref="title" class="title"></xtt-textarea></div>
	<div>作者： <xtt-textarea autosize ref="author">xtt</xtt-textarea></div>
	<div>分类： <xtt-textarea autosize ref="category"></xtt-textarea></div>
	<div>
		缩略图： <xtt-button ref="upload" @click="uploadImageEvent">上传图片</xtt-button>
		<img v-if="thumbnail" class="thumbnail" :src="thumbnail" alt="缩略图" />
	</div>
	<p>正文：</p>
	<xtt-editor-md ref="content"></xtt-editor-md>

	<div>摘要： <xtt-textarea autosize ref="abstract" class="abstract"></xtt-textarea></div>

	<div>
		<xtt-button @click="submitEvent">发布</xtt-button>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { addActicle } from "@/api/blog/blog.js";
import { uploadImage } from "@/api/image/image.js";

const title = ref(null);
const content = ref(null);
const author = ref(null);
const category = ref(null);
const abstract = ref(null);
const upload = ref(null);

const thumbnail = ref("");

const submitEvent = async () => {
	const options = {
		title: title.value.value,
		content: content.value.value,
		author: author.value.value,
		category: category.value.value,
		abstract: abstract.value.value || content.value.abstract
	};

	if (!title.value.value) return alert("标题不能为空");
	if (!content.value.value) return alert("内容不能为空");

	const res = await addActicle(options);

	console.log(res);
};

const uploadImageEvent = async () => {
	const file = document.createElement("input");
	file.type = "file";
	file.click();

	file.onchange = async () => {
		const fd = new FormData();
		fd.append("source", file.files[0]);

		const { data } = await uploadImage(fd);
		console.log(data);
	};
};
</script>

<style scoped>
.title {
	width: 300px;
}

.thumbnail {
	width: 300px;
	margin-inline-start: 16px;
}
</style>
