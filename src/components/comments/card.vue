<template>
	<div class="comment" v-if="!delected">
		<div class="left">
			<img
				src="https://image.xtt.moe/images/2023/08/09/mlian2.md.png"
				alt="评论者头像"
				class="pic"
			/>
		</div>
		<div class="center">
			<div>
				<span class="nickname">{{ props.comment.nickname || "匿名" }}</span>
				<span class="date">{{ props.comment.createDate }}</span>
			</div>
			<div class="content">{{ props.comment.content }}</div>
		</div>
		<div class="right">
			<xtt-button
				v-if="store.loginUid"
				class="deleteBtn"
				text
				type="danger"
				data-xtt-tooltip="删除该条评论"
				@click="deleteBtnClick"
			>
				删除
			</xtt-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { delectComment } from "@/api/blog/comment";
import { useStore } from "@/stores/index";
const store = useStore();

interface Props {
	comment: object;
}
const props = withDefaults(defineProps<Props>(), {
	comment: () => ({})
});

const delected = ref(false);

const deleteBtnClick = () => {
	if (confirm("确定删除该条评论吗？")) {
		delectComment(props.comment.id).then(() => {
			delected.value = true;
		});
	}
};
</script>

<style scoped>
.comment {
	display: flex;
	align-items: center;
	column-gap: 8px;
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
</style>
