<template>
	<div class="item"><span>标题：</span> <NInput type="text" v-model:value="title" /></div>

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
				class="up:w-[100px]"
				accept="image/*"
				@change="uploadImageEvent"
				:show-file-list="false"
				:loading="imgLoading"
			>
				<NamiButton :loading="imgLoading" :borderColor="store.currentTheme">{{
					thumbnail ? "切换图片" : "上传图片"
				}}</NamiButton>
			</NUpload>

			<NInput type="text" v-model:value="thumbnail" class="up:w-[400px]" placeholder="输入图片URL" />
		</div>
	</div>

	<div class="item"><span>摘要：</span> <NInput type="textarea" v-model:value="abstract" /></div>

	<div class="item editor-wrapper">
		<span>正文：</span>
		<div ref="contentRef" class="content-editor"></div>
	</div>

	<div class="item editor-preview">
		<span>预览：</span>
		<markdown :content="content"></markdown>
	</div>

	<namiRoughLine></namiRoughLine>

	<div class="item mt-2"><span>日文标题：</span> <NInput type="text" v-model:value="jaTitle" /></div>

	<div class="item">
		<span>日文分类：</span>
		<NSelect v-model:value="jaCategory" filterable tag :options="jaCategories" />
	</div>

	<div class="item">
		<span>日文标签：</span>
		<NInput type="text" v-model:value="jaTags" class="up:w-[200px]" />
	</div>

	<div class="item"><span>日文摘要：</span> <NInput type="textarea" v-model:value="jaAbstract" /></div>

	<div class="item editor-wrapper">
		<span>正文：</span>
		<div ref="jaContentRef" class="content-editor"></div>
	</div>

	<div class="item editor-preview">
		<span>预览：</span>
		<markdown :content="jaContent"></markdown>
	</div>

	<namiRoughLine></namiRoughLine>

	<div class="mt-4 mb-4 flex justify-end">
		<NamiButton @click="submitEvent" :borderColor="store.currentTheme">发布</NamiButton>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw, onUnmounted } from "vue";
import type { UploadOnChange } from "naive-ui";
import { NInput, NSelect, NUpload } from "naive-ui";
import { NamiButton, markdown } from "@c/index";
import { addActicle, getCategories, getCategoriesJP } from "@/api/blog/acticle";
import { uploadLocalImage } from "@/api/image/image";
import * as monaco from "monaco-editor";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();

const title = ref("");
const jaTitle = ref("");
const content = ref("");
const jaContent = ref("");
const category = ref("");
const jaCategory = ref("");
const tags = ref("");
const jaTags = ref("");
const abstract = ref("");
const jaAbstract = ref("");

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

// 获取日文分类列表
const jaCategories = ref<
	{
		label: string;
		value: string;
	}[]
>([]);
async function getJaCategoriesFn() {
	const res = await getCategoriesJP();

	jaCategories.value = res.map((item) => ({
		label: item,
		value: item
	}));
}
getJaCategoriesFn();

const contentRef = ref<HTMLElement | null>(null);
const contentValue = "";
const editor = ref<monaco.editor.IStandaloneCodeEditor>();

function renderMonacoEditor() {
	if (contentRef.value) {
		editor.value = monaco.editor.create(contentRef.value, {
			value: contentValue,
			language: "markdown",
			// automaticLayout: false,
			minimap: {
				enabled: false
			}
			// selectOnLineNumbers: false
		});

		editor.value.onDidChangeModelContent(() => {
			content.value = toRaw(editor.value!).getValue() || "";
		});
	}
}

const jaContentRef = ref<HTMLElement | null>(null);
let jaContentValue = "";
const jaEditor = ref<monaco.editor.IStandaloneCodeEditor>();

function renderJaMonacoEditor() {
	if (jaContentRef.value) {
		jaEditor.value = monaco.editor.create(jaContentRef.value, {
			value: jaContentValue,
			language: "markdown",
			// automaticLayout: false,
			minimap: {
				enabled: false
			}
			// selectOnLineNumbers: false
		});

		jaEditor.value.onDidChangeModelContent(() => {
			jaContent.value = toRaw(jaEditor.value!).getValue() || "";
		});
	}
}

onMounted(() => {
	renderMonacoEditor();
	renderJaMonacoEditor();
});
onUnmounted(() => {
	// editorEl.value 必须使用 toRaw 包裹，否则会卡死页面
	toRaw(editor.value)?.dispose();
	toRaw(jaEditor.value)?.dispose();
});

const submitEvent = async () => {
	if (!title.value) return alert("标题不能为空");
	const content = toRaw(editor.value)?.getValue();
	if (!content) return alert("内容不能为空");

	await addActicle({
		title: title.value,
		content: content,
		category: category.value,
		tags: tags.value,
		abstract: abstract.value,
		thumbnail: thumbnail.value,
		jaTitle: jaTitle.value,
		jaContent: jaContent.value,
		jaCategory: jaCategory.value,
		jaTags: jaTags.value,
		jaAbstract: jaAbstract.value
	});

	router.push("/blog");
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
			resUrl = resUrl.replace("https://image.xtt.cool/", "https://image.xtt.cool/local/");
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
		flex: 0 0 100px;
		text-align: right;
	}
}

.thumbnail {
	height: 100px;
}

.editor-wrapper,
.editor-preview {
	align-items: start;
}

.content-editor {
	height: 500px;
	flex: 1;
	border: thin solid var(--d-color);
}
</style>
