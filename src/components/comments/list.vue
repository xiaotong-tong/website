<template>
	<div>
		<template v-if="!props.isGuestbook">
			<div class="count" v-if="!props.isChildren">
				<span>{{ props.comments.length }}</span
				>条评论
			</div>
		</template>

		<div :class="{ isChildren: props.isChildren }">
			<template v-for="comment in props.comments" :key="comment.id">
				<namiCommentCard class="comment-card" :comment="comment"></namiCommentCard>
				<div class="hr"></div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Comment } from "@/types/comment";
interface Props {
	comments: Comment[];
	isChildren?: boolean;
	isGuestbook?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	comments: () => [],
	isChildren: false,
	isGuestbook: false
});
</script>

<style scoped>
.count {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 20px;
}

.hr:not(:last-child) {
	height: 1px;
	width: 90%;
	background: repeating-linear-gradient(
		to right,
		#181313,
		#181313 1px,
		transparent 1px,
		transparent 3px
	);
	margin: 20px auto;
}

.isChildren {
	margin-inline-start: 50px;
}
</style>
