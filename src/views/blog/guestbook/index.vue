<template>
	<section class="container web-color-default">
		<header class="header">
			<h2>留言板</h2>
			<p>欢迎留言，欢迎灌水，尽量回复，各位随意~</p>
		</header>

		<namiCommentList
			class="comment-list"
			:comments="commentList"
			:isGuestbook="true"
		></namiCommentList>

		<h3>发布留言：</h3>
		<namiCommentPanel class="comment-panel" @submit="commentSubmitEvent"></namiCommentPanel>
	</section>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import type { Comment } from "@/types/comment";
import { addComment, getCommentList } from "@/api/blog/comment";

const commentList = ref<Comment[]>([]);
const getComments = async () => {
	const data = await getCommentList({
		isGuestbook: true
	});

	commentList.value = data.reverse();
};
getComments();

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
		isGuestbook: true
	}).then(() => {
		getComments();
	});
};

provide("commentsChildSubmitCallback", () => {
	getComments();
});
</script>

<style scoped>
.container {
	padding: 8px;
}

.header {
	text-align: center;
}
</style>
