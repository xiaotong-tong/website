<template>
	<div class="loadingBox">
		<img class="img" src="https://data.xtt.moe/loading.webp" alt="loading" />
	</div>
</template>

<script setup></script>

<style scoped>
.loadingBox {
	display: flex;
	background-color: #ffffffaa;
	font-family: "katong-s", sans-serif;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.theme-dark .loadingBox {
	background-color: #00000088;
}

.img {
	width: 70%;
	max-height: 80%;
	object-fit: contain;
}

.small-screen .img {
	margin-block-start: 0;
}
</style>
