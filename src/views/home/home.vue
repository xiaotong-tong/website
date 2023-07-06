<template>
	<section class="container">
		<div class="character-wrap">
			<img class="character" src="/images/lian5.png" alt="人物立绘" draggable="false" />
		</div>
		<div class="info-wrap">
			<h2>Hi, 我是小恸恸，这里是我的主页</h2>
			<p>
				很荣幸您能访问我的主页！我会在这里分享一些我学习的东西，也会分享一些我喜欢的东西。
			</p>
			<p>君に出会えて本当に良かった！</p>

			<hr />

			<h2 class="nami-title">こんにちは、サザナミです。このブログの看板娘！</h2>
			<p>
				你好，我是凌涟漪，也叫星川涟。目标是成为文学少女的见习生，担任本站的看板娘，请多多关照！
			</p>

			<p>
				<!-- <nami-link to="/blog">blog</nami-link> -->
			</p>
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.container {
	display: flex;
	width: min(100%, 800px);
	background-color: #ffffff77;
	transform: translate(calc(50vw - 50%), calc(50vh - 50%));
	backdrop-filter: blur(5px);
}
.character-wrap {
	flex: none;
	width: 264px;
}
.character {
	display: block;
	width: 100%;
	aspect-ratio: 264 / 450;
}

.info-wrap {
	flex: 1;
	padding: 8px;
}
.nami-title {
	font-size: 1.4em;
}

@media screen and (max-width: 800px) {
	.character-wrap {
		display: none;
	}
}
</style>
