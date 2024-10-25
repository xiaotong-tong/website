<template>
	<div>
		<div class="comment" v-if="!delected">
			<div class="left">
				<img
					:src="props.comment.photoUrl || 'https://image.xtt.moe/images/mlian2.md.webp'"
					alt="评论者头像"
					class="pic"
				/>
			</div>
			<div class="center">
				<div>
					<span class="nickname">{{ props.comment.nickname || "匿名" }}</span>
					<span class="date">{{ props.comment.createDate }}</span>
				</div>
				<markdown class="content" :content="props.comment.content"></markdown>
			</div>
			<div class="right">
				<NButton
					class="replyBtn"
					text
					aria-label="回复该条评论"
					@click="replyCommentShowed = !replyCommentShowed"
				>
					<namiIcon icon="mdiReplyOutline" />
				</NButton>
			</div>
		</div>
		<transition name="fade">
			<namiCommentPanel
				v-if="replyCommentShowed"
				class="reply-comment-panel"
				@submit="replyCommentSubmitEvent"
			></namiCommentPanel>
		</transition>

		<namiCommentList
			class="children-comment-list"
			:comments="props.comment.children || []"
			:isChildren="true"
		></namiCommentList>
	</div>
</template>

<script setup lang="ts">
import type { Comment } from "@/types/comment";
import { ref, provide, inject } from "vue";
import { addComment } from "@/api/blog/comment";
import { markdown } from "@c/index";
import { NButton } from "naive-ui";
import { useRoute } from "vue-router";
const route = useRoute();

interface Props {
	comment: Comment;
	isGuestbook?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	comment: () => ({} as Comment),
	isGuestbook: false
});

const delected = ref(false);

const parentCommentId = inject("commentId", null);
const childSubmitCallback = inject("commentsChildSubmitCallback", Function.prototype);

const replyCommentShowed = ref(false);

const replyCommentSubmitEvent = (data: { commentText: string; nickname: string; photoUrl: string }) => {
	const articleId = Number(route.params.id);

	if (!articleId && !props.isGuestbook) return;

	const commentBody = Object.assign(
		{
			nickname: data.nickname,
			content: data.commentText,
			photoUrl: data.photoUrl,
			parent: parentCommentId || props.comment.id,
			replyId: props.comment.id,
			replyNickName: props.comment.nickname
		},

		articleId ? { articleId } : { isGuestbook: true }
	);

	addComment(commentBody).then(() => {
		replyCommentShowed.value = false;

		childSubmitCallback?.();
	});
};

provide("commentId", props.comment.id);
</script>

<style scoped>
.comment {
	display: flex;
	align-items: start;
	column-gap: 8px;
	margin-block-end: 8px;
}
.pic {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}

.center {
	flex: 1;
}

.date {
	color: #999;
	font-size: 12px;
	margin-inline-start: 10px;
}

.right {
	display: flex;
	flex-direction: column;
	justify-content: start;
}

.replyBtn {
	font-size: 24px;
}
.replyBtn:hover {
	background-color: transparent;
	color: #f34159;
}

.reply-comment-panel {
	margin-block-start: 10px;
	margin-inline-start: 50px;
}

.fade-enter-active,
.fade-leave-active {
	max-height: 300px;
	transition: max-height 0.3s, opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	max-height: 0px;
	opacity: 0;
}
</style>
