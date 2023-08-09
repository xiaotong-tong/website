<template>
	<div class="title-operate-area">
		<xtt-button v-if="store.loginUid" type="primary" @click="router.push('/editor/edit/' + id)"
			>编辑</xtt-button
		>
	</div>
	<section class="container" :dark="store.isDark ? '' : undefined">
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

		<namiCommentList class="comment-list" :comments="commentList"></namiCommentList>

		<h3>发布评论：</h3>
		<namiCommentPanel class="comment-panel" @submit="commentSubmitEvent"></namiCommentPanel>
	</section>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Acticle } from "@/types/acticle";
import { ref, watch } from "vue";
import { getActicleById } from "@/api/blog/acticle";
import { addComment, getCommentList } from "@/api/blog/comment";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/index";
const store = useStore();
const route = useRoute();
const router = useRouter();

const id = ref(Number(route.params.id));

const acticle: Ref<Acticle | null> = ref(null);

// 获取文章内容
const getActicle = async () => {
	if (!id.value) return;

	const { data } = await getActicleById(id.value);
	acticle.value = data.data;
};
const commentSubmitEvent = (data: { commentText: string; nickname: string; email: string }) => {
	addComment({
		nickname: data.nickname,
		email: data.email,
		content: data.commentText,
		articleId: id.value
	}).then(() => {
		getComments();
	});
};

const commentList = ref([]);
const getComments = async () => {
	const data = await getCommentList(id.value);

	commentList.value = data;
};

getActicle();
getComments();

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
	}
);
</script>

<style scoped>
.container {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
	padding: 8px;
}
.container[dark] {
	background-color: #00000020;
	backdrop-filter: blur(5px);
	color: #cfd3dc;
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
</style>
