<template>
	<div class="title-operate-area">
		<xtt-button v-if="store.loginUid" type="primary" @click="submitEvent">更新</xtt-button>
		<xtt-button v-if="store.loginUid" type="danger" @click="deleteEvent">删除</xtt-button>
	</div>

	<div>标题： <xtt-textarea autosize v-model="title" class="title"></xtt-textarea></div>
	<div>作者： <xtt-textarea autosize v-model="author">xtt</xtt-textarea></div>
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
	<div>标签： <xtt-textarea autosize v-model="tags"></xtt-textarea></div>

	<div>
		缩略图： <xtt-button ref="upload" @click="uploadImageEvent">上传图片</xtt-button><br />
		<xtt-textarea autosize v-model="thumbnail"></xtt-textarea><br />
		<img v-if="thumbnail" class="thumbnail" :src="thumbnail" alt="缩略图" />
	</div>
	<p>正文：</p>
	<xtt-editor-md v-model="content"></xtt-editor-md>

	<div>
		摘要： <xtt-textarea block autosize v-model="abstract" class="abstract"></xtt-textarea>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getActicleById, editActicleById, deleteActicleById } from "@/api/blog/acticle";
import { uploadImage } from "@/api/image/image";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/index";
const store = useStore();
const route = useRoute();
const router = useRouter();

const id = ref(Number(route.params.id));

const title = ref("");
const content = ref("");
const author = ref("");
const category = ref();
const tags = ref("");
const abstract = ref("");
const upload = ref(null);

const thumbnail = ref("");

const submitEvent = async () => {
	if (!title.value) return alert("标题不能为空");
	if (!content.value) return alert("内容不能为空");

	await editActicleById(id.value, {
		title: title.value,
		content: content.value,
		author: author.value,
		category: category.value.value,
		tags: tags.value,
		abstract: abstract.value,
		thumbnail: thumbnail.value
	});

	router.push("/article/" + id.value);
};

const deleteEvent = async () => {
	if (!confirm("确定删除吗？")) return;

	const res = await deleteActicleById(id.value);

	console.log(res);
	router.push("/");
};

const uploadImageEvent = async () => {
	const file = document.createElement("input");
	file.accept = "image/*";
	file.type = "file";
	file.click();

	file.onchange = async () => {
		if (!file.files) {
			return;
		}
		const fd = new FormData();
		fd.append("source", file.files[0]);

		const { data } = await uploadImage(fd);
		// console.log(data);

		// 优先使用 display_url 的图片地址，display_url 地址为压缩后的图片地址，url 为原图地址
		thumbnail.value = data.image.display_url || data.image.url;
	};
};

// 获取文章内容
const getActicle = async () => {
	if (!id.value) return;

	const data = await getActicleById(id.value);
	title.value = data.title;
	content.value = data.content;
	author.value = data.author;
	category.value.value = data.category;
	tags.value = data.tags;
	abstract.value = data.abstract;
	thumbnail.value = data.thumbnail;
};
getActicle();

// 监听页面 id 的变化
watch(
	() => route.params,
	(newURL) => {
		// 如果变化后不是当前页面，就不执行
		if (!route.path.startsWith("/editor/edit")) {
			return;
		}
		id.value = Number(newURL.id);
		getActicle();
	}
);
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
