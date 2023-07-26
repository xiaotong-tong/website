<template>
	<nav>
		<ul class="list">
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
	</nav>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({});
</script>

<style scoped>
.list {
	display: flex;
	width: min(1000px, 100%);
	margin: 0 auto 2px;
	column-gap: 8px;
	padding: 0;
}

.list > li {
	list-style: none;
}

.link:hover {
	color: #f34159;
}
</style>
