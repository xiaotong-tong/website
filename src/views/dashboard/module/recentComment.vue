<template>
	<section class="RC-card web-color-default">
		<h3>最新评论</h3>
		<ul>
			<li v-for="item in recentCommentList" :key="item.id" class="RC-item">
				<img :src="item.photoUrl" alt="用户头像" />
				<div>
					<div>
						<span>{{ item.nickname || "匿名" }}</span> &nbsp;
						<span>{{ item.createDate }}</span>
					</div>
					<div>
						在
						<nami-link class="link" :to="item.articleId ? '/article/' + item.articleId : '/guestbook'">{{
							item.articleTitle || "留言板"
						}}</nami-link>
						中评论:
					</div>
					<markdown :content="item.content"></markdown>
				</div>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import type { recentCommentBody } from "@/types/comment";
import { ref } from "vue";
import { getRecentCommentList } from "@/api/blog/comment";
import { markdown } from "@c/index";

const recentCommentList = ref<recentCommentBody[]>([]);

(async () => {
	// 获取最新的 5 个评论
	const data = await getRecentCommentList(5);
	recentCommentList.value = data;
})();
</script>

<style scoped>
.RC-card {
	width: 300px;
	overflow: hidden;
}

.RC-item {
	display: flex;
	font-size: 14px;
	color: grey;
	max-height: 300px;
}
.RC-item:not(:last-child) {
	margin-block-end: 8px;
	border-block-end: thin solid #ebebeb;
}

.RC-item img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
}

.RC-item .link {
	color: #409eff;
}
</style>
