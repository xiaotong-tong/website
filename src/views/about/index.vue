<template>
	<section class="container">
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
				<p>
					Hi, 我是小恸恸，一名 acgn 爱好者，同时也是 web 开发者
					<br />这里是我的主页，我会在这里分享一些我学习的东西，以及一些我喜欢的东西。
				</p>
				<p>左侧立绘角色名称是 星川涟，是本站的看板娘！君に出会えて本当に良かった！</p>
			</div>
		</div>

		<!-- <h2>关于本网站</h2>
		<div>
			<p>
				本网站代码全部开源，您可以在 Github 上找到本网站的源代码：<br />
				前端: https://github.com/xiaotong-tong/website <br />
				后端: https://github.com/xiaotong-tong/website-server
			</p>
		</div> -->
	</section>

	<Teleport to="head">
		<meta name="keywords" content="小恸恸,星川涟" />
		<meta name="description" content="关于本网站的一些信息" />
	</Teleport>
</template>

<script setup lang="ts"></script>

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
