<template>
	<nav class="nav">
		<ul class="list left">
			<li>
				<namiLink class="link" inline-block to="/">首页</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/net">网络互联</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/jp">日语学习</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/note">喵随笔</namiLink>
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

<script setup lang="ts"></script>

<style scoped>
.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: min(1000px, 100%);
	padding: 0 8px;
}
[dark] .list {
	color: #fff;
}
.list {
	display: flex;
	column-gap: 8px;
	padding: 0;
}

.right {
	justify-content: flex-end;
}

.list > li {
	list-style: none;
}

.link:hover {
	color: #f34159;
}

.github-link::part(link) {
	align-items: center;
	column-gap: 8px;
}
</style>
