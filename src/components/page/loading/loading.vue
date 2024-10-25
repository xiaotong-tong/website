<template>
	<div class="container">
		<img class="img" src="https://data.xtt.moe/loading.webp" alt="loading" />
	</div>
</template>

<script setup></script>

<style scoped>
.container {
	display: flex;
	background-color: #ffffffaa;
	font-family: "katong-s", sans-serif;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.theme-dark .container {
	background-color: #00000088;
}

.img {
	width: 70%;
}

.small-screen .img {
	margin-block-start: 0;
}
</style>
