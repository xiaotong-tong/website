<template>
	<div>
		<div class="count">
			<span>{{ props.comments.length }}</span
			>条评论
		</div>

		<div>
			<namiCommentCard
				v-for="comment in props.comments"
				:key="comment.id"
				:comment="comment"
			></namiCommentCard>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	comments: any[];
}
const props = withDefaults(defineProps<Props>(), {
	comments: () => []
});
</script>

<style scoped>
.count {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 20px;
}
</style>
