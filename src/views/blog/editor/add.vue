<template>
	<div class="item"><span>标题：</span> <NInput type="text" v-model:value="title" /></div>

	<div class="item">
		<span>作者：</span>
		<NInput type="text" v-model:value="author" class="up:w-[200px]" />
	</div>

	<div class="item">
		<span>分类：</span>
		<NSelect v-model:value="category" filterable tag :options="categories" />
	</div>

	<div class="item">
		<span>标签：</span>
		<NInput type="text" v-model:value="tags" class="up:w-[200px]" />
	</div>

	<div class="item">
		<span>缩略图：</span>
		<div class="flex-1 flex items-center gap-x-4">
			<img v-if="thumbnail" class="thumbnail" :src="thumbnail" alt="缩略图" />

			<NUpload
				accept="image/*"
				@change="uploadImageEvent"
				:show-file-list="false"
				:loading="imgLoading"
			>
				<NamiButton :loading="imgLoading" :borderColor="store.currentTheme">{{
					thumbnail ? "切换图片" : "上传图片"
				}}</NamiButton>
			</NUpload>
		</div>
	</div>

	<p>正文：</p>
	<xtt-editor-md v-model="content"></xtt-editor-md>

	<div>
		摘要： <xtt-textarea block autosize v-model="abstract" class="abstract"></xtt-textarea>
	</div>

	<div class="flex justify-end">
		<xtt-button type="primary" @click="submitEvent">发布</xtt-button>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadOnChange } from "naive-ui";
import { NInput, NSelect, NUpload } from "naive-ui";
import { NamiButton } from "@c/index";
import { addActicle, getCategories } from "@/api/blog/acticle";
import { uploadLocalImage } from "@/api/image/image";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();

const title = ref("");
const content = ref("");
const author = ref("");
const category = ref("");
const tags = ref("");
const abstract = ref("");

const thumbnail = ref("");

// 获取分类列表
const categories = ref<
	{
		label: string;
		value: string;
	}[]
>([]);
async function getCategoriesFn() {
	const res = await getCategories();

	categories.value = res.map((item) => ({
		label: item,
		value: item
	}));
}
getCategoriesFn();

const submitEvent = async () => {
	if (!title.value) return alert("标题不能为空");
	if (!content.value) return alert("内容不能为空");

	const res = await addActicle({
		title: title.value,
		content: content.value,
		author: author.value,
		category: category.value,
		tags: tags.value,
		abstract: abstract.value,
		thumbnail: thumbnail.value
	});

	console.log(res);
	router.push("/");
};

const imgLoading = ref(false);
async function uploadImageEvent(option: Parameters<UploadOnChange>[0]) {
	if (!option.file) return;

	imgLoading.value = true;
	const fd = new FormData();
	fd.append("source", option.file.file!);

	try {
		const res = await uploadLocalImage(fd);

		if (res.status === 200) {
			let resUrl = res.data.image.url;
			resUrl = resUrl.replace("https://image.xtt.moe/", "https://image.xtt.moe/local/");
			// 优先使用 display_url 的图片地址，display_url 地址为压缩后的图片地址，url 为原图地址
			thumbnail.value = resUrl;
		}
		imgLoading.value = false;
	} catch (error) {
		alert("上传失败");
		imgLoading.value = false;
	}
}
</script>

<style scoped>
.item {
	display: flex;
	align-items: center;
	margin-bottom: 16px;

	& > span {
		flex: 0 0 80px;
		text-align: right;
	}
}

.thumbnail {
	height: 100px;
}
</style>
