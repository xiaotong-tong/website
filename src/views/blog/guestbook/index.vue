<template>
	<section class="container web-color-default">
		<header class="header">
			<h2>{{ i18nStore.messages.guestbook.title }}</h2>
			<p>{{ i18nStore.messages.guestbook.subContent }}</p>
		</header>

		<namiCommentList
			class="comment-list"
			:comments="commentList"
			:isGuestbook="true"
		></namiCommentList>

		<h3>{{ i18nStore.messages.guestbook.commentTitle }}</h3>
		<namiCommentPanel class="comment-panel" @submit="commentSubmitEvent"></namiCommentPanel>
	</section>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import type { Comment } from "@/types/comment";
import { addComment, getCommentList } from "@/api/blog/comment";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();

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
