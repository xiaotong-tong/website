<template>
	<section class="container web-color-default">
		<p class="title">君に出会えて本当に良かった！</p>
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
				<h2>关于我</h2>
				<p>
					常用名：小恸恸，星川涟<br />
					职业：web 开发<br />
					爱好：acgn<br />
					QQ群:
					<a
						href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Iwq1mXk1S-8h6r0FRkuGIMHS5acOFTm7&authKey=wE6RlZAmsJxHsvKog5H4Nw2QHYJDk6Sv5tioTMRz1%2BVJC4Qe0mqW%2FqsMlEDPfpTA&noverify=0&group_code=754923572"
						target="_blank"
						>754923572</a
					><br />
					E-Mail: wtt150249@gmail.com<br />
					weibo: <a href="https://weibo.com/u/6704246825" target="_blank">@星川涟</a
					><br />
				</p>

				<h2>关于看板娘</h2>
				<p>
					姓名：星川涟<br />
					职业：想要成为文学少女的看板娘<br />
					爱好：阅读文字
				</p>
			</div>
		</div>
		<h2>关于本站</h2>
		<p>
			本站是个人网站，主要用于存放一些个人作品，以及一些个人的日常记录。<br />
			本站的代码全部开源，您可以在 Github 上找到本站的源代码：<br />
			前端: https://github.com/xiaotong-tong/website <br />
			后端: https://github.com/xiaotong-tong/website-server <br />
			更详细信息请访问这篇文章：<nami-link to="/article/15" style="color: #f34159"
				>关于本站</nami-link
			>
		</p>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="小恸恸,星川涟" />
		<meta name="description" content="关于本网站的一些信息" />
	</Teleport>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
	padding-block-start: 24px;
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

p {
	line-height: 2;
}

@media screen and (max-width: 800px) {
	.character-wrap {
		display: none;
	}
}

.title {
	text-align: center;
	font-size: 24px;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}
</style>
