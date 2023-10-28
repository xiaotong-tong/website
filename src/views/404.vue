<template>
	<section class="box web-color-default">
		<h1 class="return-home" aria-label="404 Not Found">迷子でもいい、迷子でも進め!</h1>

		<namiPiano></namiPiano>
	</section>
</template>

<script setup lang="ts">
import namiPiano from "@/components/page/piano/piano.vue";
</script>

<style scoped>
.box {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	perspective: 1000px;
}

.return-home {
	margin-top: 30px;
	padding: 10px 20px;
	color: transparent;
	background-image: linear-gradient(310deg, #f53939, #fac60b);
	-webkit-background-clip: text;
	background-clip: text;

	transform-style: preserve-3d;
	transition: transform 0.5s;
}

/* 在非 hover 时做选择动画 */
.return-home:not(:hover) {
	animation: flip 2s infinite;
}

@keyframes flip {
	0% {
		transform: rotateX(0);
	}
	50% {
		transform: rotateX(180deg);
	}
	100% {
		transform: rotateX(360deg);
	}
}
</style>
