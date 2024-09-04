<template>
	<div class="title-operate-area">
		<xtt-button type="primary" @click="submitEvent">发布</xtt-button>
	</div>

	<div>标题： <xtt-textarea autosize class="title" v-model="title"></xtt-textarea></div>
	<div>作者： <xtt-input autosize v-model="author">xtt</xtt-input></div>

	<div>
		分类：
		<xtt-select ref="category">
			<option value="0" selected>网络互联</option>
			<option value="1">喵随笔</option>
			<option value="2">语言学习</option>
			<option value="3">test</option>
			<option value="4">其它</option>
		</xtt-select>
	</div>
	<div>标签： <xtt-input autosize v-model="tags"></xtt-input></div>
	<div>
		缩略图： <xtt-button ref="upload" @click="uploadImageEvent">上传图片</xtt-button><br />
		<xtt-textarea autosize block v-model="thumbnail"></xtt-textarea><br />
		<img v-if="thumbnail" class="thumbnail" :src="thumbnail" alt="缩略图" />
	</div>
	<p>正文：</p>
	<xtt-editor-md v-model="content"></xtt-editor-md>

	<div>
		摘要： <xtt-textarea block autosize v-model="abstract" class="abstract"></xtt-textarea>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { addActicle } from "@/api/blog/acticle";
import { uploadLocalImage } from "@/api/image/image";
import { useRouter } from "vue-router";
const router = useRouter();

const title = ref("");
const content = ref("");
const author = ref("");
const category = ref(null);
const tags = ref("");
const abstract = ref("");
const upload = ref(null);

const thumbnail = ref("");

const submitEvent = async () => {
	if (!title.value) return alert("标题不能为空");
	if (!content.value) return alert("内容不能为空");

	const res = await addActicle({
		title: title.value,
		content: content.value,
		author: author.value,
		category: (category.value && (category.value as HTMLSelectElement)?.value) || "0",
		tags: tags.value,
		abstract: abstract.value,
		thumbnail: thumbnail.value
	});

	console.log(res);
	router.push("/");
};

const uploadImageEvent = async () => {
	const file = document.createElement("input");
	file.type = "file";
	file.accept = "image/*";
	file.click();

	file.onchange = async () => {
		if (!file.files) {
			return;
		}
		const fd = new FormData();
		fd.append("source", file.files[0]);

		// todo 暂时无效
		const { data } = await uploadLocalImage(fd);

		// 优先使用 display_url 的图片地址，display_url 地址为压缩后的图片地址，url 为原图地址
		thumbnail.value = data.image.display_url || data.image.url;

		file.remove();
	};
};
</script>

<style scoped>
.title-operate-area {
	display: flex;
	justify-content: flex-end;
}
.title {
	width: 300px;
}

.thumbnail {
	width: 300px;
	margin-inline-start: 16px;
}
</style>
