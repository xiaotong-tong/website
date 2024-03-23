<template>
	<div class="title-operate-area">
		<xtt-button v-if="store.loginUid" type="primary" @click="router.push('/editor/edit/' + id)"
			>编辑</xtt-button
		>
	</div>
	<section
		class="container web-color-default"
		:dark="store.isDark ? '' : undefined"
		v-if="acticle"
	>
		<h2>
			{{ i18nStore.lang === "ja" ? acticle.jaTitle || acticle.title : acticle.title }}
		</h2>
		<p>
			<span>{{
				(i18nStore.lang === "ja" ? "post on " : "发布于 ") + acticle?.createDate
			}}</span>

			&nbsp;&nbsp;&nbsp; #
			{{
				useStateType.ActicleCategoryType[
					i18nStore.lang === "ja" ? "jaShowText" : "showText"
				][Number(acticle.category)]
			}}
		</p>

		<xtt-markdown class="md" :dark="store.isDark ? '' : undefined">{{
			i18nStore.lang === "ja" ? acticle?.jaContent || acticle?.content : acticle?.content
		}}</xtt-markdown>

		<div class="pagination">
			<nami-link :to="'/article/' + acticle.prev.id" v-if="acticle?.prev" class="link">{{
				(i18nStore.lang === "ja" ? "前の文章: " : "上一篇: ") + acticle?.prev.title
			}}</nami-link>
			<nami-link :to="'/article/' + acticle.next.id" v-if="acticle?.next" class="link">{{
				(i18nStore.lang === "ja" ? "次の文章: " : "下一篇: ") + acticle?.next.title
			}}</nami-link>
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
		<!-- 如果文章中有 tags 属性，那么就将 tags 的内容添加到 meta 标签中的 keywords 中 -->
		<meta v-if="acticle?.tags" name="keywords" :content="acticle?.tags" />
	</Teleport>
</template>

<script setup lang="ts">
import type { ActicleById } from "@/types/acticle";
import type { Comment } from "@/types/comment";
import { ref, watch, provide } from "vue";
import { getActicleById } from "@/api/blog/acticle";
import { addComment, getCommentList } from "@/api/blog/comment";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";
import { useStateTypeStore } from "@/stores/stateType";

const store = useStore();
const route = useRoute();
const router = useRouter();
const useStateType = useStateTypeStore();
const i18nStore = useI18nStore();

const id = ref(Number(route.params.id));

const acticle = ref<ActicleById | null>(null);

// 获取文章内容
const getActicle = async () => {
	if (!id.value) return;

	try {
		const data = await getActicleById(id.value);
		acticle.value = data;

		// 修改页面标题
		document.title = `${
			data[i18nStore.lang === "ja" ? "jaTitle" : "title"] || acticle.value?.title
		} - 星川漣の家`;
	} catch (error) {
		// 如果请求文章失败，并且状态码为 404，那么就跳转到 404 页面
		if ((error as any).response?.status === 404) {
			router.push("/404");
		} else {
			console.error(error);
		}
	}
};
const commentSubmitEvent = (data: {
	commentText: string;
	nickname: string;
	email: string;
	photoUrl: string;
}) => {
	addComment({
		nickname: data.nickname,
		photoUrl: data.photoUrl,
		email: data.email,
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
getComments();

provide("commentsChildSubmitCallback", () => {
	getComments();
});

// 监听路由 id 的变化
onBeforeRouteUpdate((to, _) => {
	id.value = Number(to.params.id);
	getActicle();
	getComments();
});

watch(
	() => i18nStore.lang,
	() => {
		// 修改页面标题
		document.title = `${
			acticle.value?.[i18nStore.lang === "ja" ? "jaTitle" : "title"] || acticle.value?.title
		} - 星川漣の家`;
	}
);
</script>

<style scoped>
.container {
	padding: 8px;
}

.md {
	--md-bg-color: transparent;
}
.title-operate-area {
	display: flex;
	justify-content: flex-end;
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
</style>
