<template>
	<section class="container">
		<h2>关于我</h2>
		<div class="content-section">
			<div class="character-wrap">
				<img
					class="character"
					src="https://image.xtt.moe/images/2023/07/19/lian5.png"
					alt="人物立绘"
					draggable="false"
				/>
			</div>
			<div class="info-wrap">
				<h2>Hi, 我是小恸恸，一名前端开发工程师，这里是我的主页</h2>
				<p>
					很荣幸您能访问我的主页！我会在这里分享一些我学习的东西，也会分享一些我喜欢的东西。
				</p>
				<p>君に出会えて本当に良かった！</p>

				<p>关于游戏：avg, jrpg 游戏爱好者</p>
			</div>
		</div>
		<h2>关于看板娘</h2>
		<div class="content-section">
			<div class="character-wrap">
				<img
					class="character"
					src="https://image.xtt.moe/images/2023/07/21/lian3.png"
					alt="人物立绘"
					draggable="false"
				/>
			</div>
			<div class="info-wrap">
				<h2 class="nami-title">こんにちは、サザナミです。このブログの看板娘！</h2>
				<p>
					你好，我是凌涟漪，也叫星川涟。目标是成为文学少女的见习生，担任本站的看板娘，请多多关照！
				</p>
			</div>
		</div>
		<h2>关于本网站</h2>
		<div>
			<p>
				本网站代码全部开源，您可以在 Github 上找到本网站的源代码：<br />
				前端: https://github.com/xiaotong-tong/website <br />
				后端: https://github.com/xiaotong-tong/website-server
			</p>
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.container {
	background-color: #ffffff77;
	/* transform: translateY(calc(50vh - 50%)); */
	padding-block-start: 24px;
	backdrop-filter: blur(5px);
}
.content-section {
	display: flex;
}
.character-wrap {
	flex: none;
	width: 264px;
}
.character {
	display: block;
	width: 100%;
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
