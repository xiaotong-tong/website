<template>
	<section class="box web-color-default" v-if="!store.isSmallScreen">
		<h1 class="return-home" aria-label="404 Not Found">迷子でもいい、迷子でも進め!</h1>

		<namiPiano></namiPiano>
	</section>

	<section class="box" v-else>
		<img
			src="https://image.xtt.moe/images/2023/10/12/QQ20231012111248.md.jpg"
			alt="404背景图片"
			class="bg"
		/>
		<h1 class="nf-404">404</h1>
		<h2 class="nf">Not Found</h2>

		<nami-link to="/" class="return-home">迷子でもいい、迷子でも進め！→ 前往首页</nami-link>
	</section>
</template>

<script setup lang="ts">
import namiPiano from "@/components/page/piano/piano.vue";
import { useStore } from "@/stores/index";

const store = useStore();
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

.bg {
	position: absolute;
	z-index: -1;
	top: 8px;
	filter: brightness(0.6);
	max-width: 100vw;
	min-width: 444px;
}

.nf-404 {
	font-size: 150px;
	font-weight: 700;
	color: transparent;
	background-image: linear-gradient(310deg, #f53939, #fac60b);
	-webkit-background-clip: text;
	background-clip: text;
	margin: 0;
}
.nf {
	font-size: 30px;
	color: transparent;
	background-image: linear-gradient(310deg, #f53939, #fac60b);
	-webkit-background-clip: text;
	background-clip: text;
	margin: 0;
}
</style>
