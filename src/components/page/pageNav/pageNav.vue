<template>
	<nav class="nav">
		<ul class="list left">
			<li>
				<namiLink class="link" inline-block to="/">首页</namiLink>
			</li>
			<li
				class="share-wrap"
				@mouseenter="tagsPopShow = true"
				@mouseleave="tagsPopShow = false"
				@focusin="shareFocusHandler"
				@focusout="shareBlurHandler"
			>
				<namiLink class="link share" inline-block
					>喵分享
					<namiIcon icon="mdiChevronDown"></namiIcon>
				</namiLink>

				<div
					class="tags web-color-default"
					v-show="tagsPopShow"
					@click="tagsPopShow = false"
				>
					<namiLink class="link" inline-block to="/net">网络互联</namiLink>
					<namiLink class="link" inline-block to="/lang">语言学习</namiLink>
					<namiLink class="link" inline-block to="/note">喵随笔</namiLink>
				</div>
			</li>
			<li>
				<namiLink class="link" inline-block to="/guestbook">留言板</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/link">链接</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/about">关于</namiLink>
			</li>
		</ul>

		<ul class="list right">
			<li>
				<namiLink
					class="link github-link"
					inline-block
					to="https://github.com/xiaotong-tong/website"
					target="_blank"
				>
					<namiIcon icon="mdiGithub" aria-label="Github 仓库"></namiIcon>
					xtt
				</namiLink>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tagsPopShow = ref(false);

// 防止 blur 事件与 focus 事件冲突
const blurDelay = 100;
let blurTimer: number;

const shareFocusHandler = () => {
	if (blurTimer) {
		window.clearTimeout(blurTimer);
		blurTimer = 0;
	}
	tagsPopShow.value = true;
};
const shareBlurHandler = () => {
	blurTimer = window.setTimeout(() => {
		tagsPopShow.value = false;
	}, blurDelay);
};
</script>

<style scoped>
.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: min(1000px, 100%);
	padding: 0 8px;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}
[dark] .list {
	color: #fff;
}
.list {
	display: flex;
	column-gap: 8px;
	white-space: nowrap;
}

.right {
	justify-content: flex-end;
}

.small-screen .right {
	display: none;
}

.link:hover {
	color: #f34159;
}

.github-link::part(link) {
	align-items: center;
	column-gap: 8px;
}

.small-screen .link {
	--link-padding: 2px 4px;
}

.share::part(link) {
	align-items: center;
}
.tags {
	position: absolute;
	border-radius: 4px;
	box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
		0 1px 5px 0 rgb(0 0 0 / 12%);
}
.tags .link {
	display: flex;
}
</style>
