<template>
	<div class="container">
		<img class="img" src="https://image.xtt.moe/images/22.gif" alt="loading" />
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

.img {
	margin-block-start: -100px;
}

.small-screen .img {
	margin-block-start: 0;
}
</style>
