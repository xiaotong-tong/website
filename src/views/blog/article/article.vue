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
			{{ acticle?.title }}
		</h2>
		<p>
			发布于<span>{{ acticle?.createDate }}</span>

			&nbsp;&nbsp;&nbsp; # {{ acticle?.category }}
		</p>

		<xtt-markdown class="md" :dark="store.isDark ? '' : undefined">{{
			acticle?.content
		}}</xtt-markdown>

		<div class="pagination">
			<nami-link :to="'/article/' + acticle?.prev.id" v-if="acticle?.prev" class="link">
				上一篇: {{ acticle?.prev.title }}</nami-link
			>
			<nami-link :to="'/article/' + acticle?.next.id" v-if="acticle?.next" class="link"
				>下一篇: {{ acticle?.next.title }}</nami-link
			>
		</div>

		<namiCommentList class="comment-list" :comments="commentList"></namiCommentList>

		<h3>发布评论：</h3>
		<namiCommentPanel class="comment-panel" @submit="commentSubmitEvent"></namiCommentPanel>
	</section>
	<section v-else>少女祈祷中...</section>

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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/index";
const store = useStore();
const route = useRoute();
const router = useRouter();

const id = ref(Number(route.params.id));

const acticle = ref<ActicleById | null>(null);

// 获取文章内容
const getActicle = async () => {
	if (!id.value) return;

	try {
		const data = await getActicleById(id.value);
		console.log(data);

		acticle.value = data;

		// 修改页面标题
		document.title = `${data.title} - 星川漣の家`;
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

// 监听页面 id 的变化
watch(
	() => route.params,
	(newURL) => {
		// 如果变化后不是当前页面，就不执行
		if (!route.path.startsWith("/article")) {
			return;
		}

		id.value = Number(newURL.id);
		getActicle();
		getComments();
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
