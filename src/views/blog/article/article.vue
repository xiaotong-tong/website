<template>
	<div class="flex justify-end mb-2 gap-x-4 pe-4" v-if="acticle">
		<TextButton type="primary" @click="downloadMd">下载</TextButton>
		<Link v-login="acticle.userId" type="primary" :to="'/editor/edit/' + id">编辑</Link>
	</div>
	<section class="container web-color-default" v-if="acticle">
		<h2 class="text-xl font-bold">
			{{ acticle.title }}
		</h2>
		<p>
			<span class="mr-4">
				<nami-icon icon="mdiClockOutline"></nami-icon>
				{{ acticle?.createDate }}</span
			>

			<span class="mr-4" v-if="acticle?.updateDate">
				<nami-icon icon="mdiUpdate"></nami-icon>
				{{ acticle?.updateDate }}</span
			>

			<span># {{ acticle.category }}</span>
		</p>

		<div v-if="acticle.thumbnail">
			<Image :src="acticle.thumbnail" alt="文章图片" class="w-full max-h-[280px] object-cover" fullView />
		</div>

		<markdown class="up:mt-4" :content="acticle.content" :textLine="true" :isDark="store.isDark"></markdown>

		<div class="pagination">
			<Link :to="'/article/' + acticle.prev.id" v-if="acticle?.prev" class="link">{{
				(i18nStore.lang === "ja" ? "前の文章: " : "上一篇: ") +
				(i18nStore.lang === "ja" ? acticle?.prev.jaTitle || acticle?.prev.title : acticle?.prev.title)
			}}</Link>
			<Link :to="'/article/' + acticle.next.id" v-if="acticle?.next" class="link">{{
				(i18nStore.lang === "ja" ? "次の文章: " : "下一篇: ") + acticle?.next.title
			}}</Link>
		</div>

		<namiCommentList class="comment-list" :comments="commentList"></namiCommentList>

		<h3>
			{{ i18nStore.lang === "ja" ? "コメントする" : "写下你的评论吧" }}
		</h3>
		<namiCommentPanel class="comment-panel" @submit="commentSubmitEvent"></namiCommentPanel>
	</section>
	<section v-else>
		<namiPageLoading></namiPageLoading>
	</section>

	<Teleport to="head">
		<!-- <link rel="preload" :href="'https://api.xtt.cool/acticle/' + id" as="fetch" /> -->

		<link rel="alternate" hreflang="ja" :href="'https://xtt.moe/ja/article/' + id" />
		<link rel="alternate" hreflang="zh" :href="'https://xtt.moe/article/' + id" />
		<link rel="alternate" hreflang="x-default" :href="'https://xtt.moe/article/' + id" />
		<link ref="canonical" :href="'https://xtt.moe/article/' + id" />
	</Teleport>

	<template>
		<Teleport to="head">
			<!-- 如果文章中有 tags 属性，那么就将 tags 的内容添加到 meta 标签中的 keywords 中 -->
			<meta v-if="acticle?.tags" name="keywords" :content="acticle?.tags" />
			<meta v-if="acticle?.abstract" name="description" :content="acticle?.abstract" />
		</Teleport>
	</template>
</template>

<script setup lang="ts">
import type { ActicleById } from "@/types/acticle";
import type { Comment } from "@/types/comment";
import { ref, watch, provide } from "vue";
import { getActicleById } from "@/api/blog/acticle";
import { addComment, getCommentList } from "@/api/blog/comment";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useI18nStore } from "@/stores/i18n";
import { markdown, Link, TextButton, Image } from "@c/index";
import { useStore } from "@/stores";

const store = useStore();
const route = useRoute();
const router = useRouter();
const i18nStore = useI18nStore();

const id = ref(Number(route.params.id));

const acticle = ref<ActicleById | null>(null);

// 获取文章内容
const getActicle = async () => {
	if (!id.value) return;

	acticle.value = null;

	try {
		const data = await getActicleById(id.value, {
			lang: i18nStore.lang
		});
		acticle.value = data;

		// 修改页面标题
		document.title = data.title + " - 星川漣の家";

		// 获取文章成功后再获取文章评论，因为评论不是主要内容，避免影响文章的加载速度
		getComments();
	} catch (error) {
		// 如果请求文章失败，并且状态码为 404，那么就跳转到 404 页面
		if ((error as any).response?.status === 404) {
			router.push("/404");
		} else {
			console.error(error);
		}
	}
};
const commentSubmitEvent = (data: { commentText: string; nickname: string; photoUrl: string }) => {
	addComment({
		nickname: data.nickname,
		photoUrl: data.photoUrl,
		content: data.commentText,
		articleId: id.value
	}).then(() => {
		getComments();
	});
};

const commentList = ref<Comment[]>([]);
const getComments = async () => {
	const data = await getCommentList({
		articleId: id.value
	});

	commentList.value = data;
};

getActicle();

provide("commentsChildSubmitCallback", () => {
	getComments();
});

// 监听路由 id 的变化
onBeforeRouteUpdate((to, _) => {
	id.value = Number(to.params.id);
	getActicle();
});

watch(
	() => i18nStore.lang,
	() => {
		getActicle();
	}
);

// 下载文章为 md 文件
const downloadMd = () => {
	if (acticle.value === null) return;

	const mdText = `# ${acticle.value.title}\n\n${acticle.value.content}`;
	const blob = new Blob([mdText], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${acticle.value.title}.md`;
	a.click();
	URL.revokeObjectURL(url);
};
</script>

<style scoped>
.container {
	padding: 8px;
}

.comment-list {
	margin-block-start: 50px;
}
.comment-panel {
	margin-block-start: 20px;
}

.pagination {
	display: flex;
	justify-content: space-between;
	column-gap: 16px;
	margin-block-start: 24px;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}
.pagination .link:hover {
	color: #f34159;
}

.small-screen .pagination {
	flex-direction: column;
	row-gap: 0.5em;
}
</style>
