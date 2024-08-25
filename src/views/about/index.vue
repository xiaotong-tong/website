<template>
	<section class="container font-[luoliti]">
		<p class="text-center text-[24px]">君に出会えて本当に良かった！</p>
		<div class="content-section">
			<div class="character-wrap">
				<img
					class="character"
					src="https://image.xtt.moe/images/lian5.webp"
					alt="人物立绘"
					draggable="false"
				/>
			</div>
			<div class="info-wrap" v-if="i18nStore.lang !== 'ja'">
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
			<div v-else>
				<h2>私って</h2>
				<p>
					名前：小恸恸<br />
					職業：フロントエンドエンジニア<br />
					趣味：acgn<br />
					E-Mail: wtt150249@gmail.com<br />
				</p>

				<h2>看板娘って</h2>
				<p>
					名前：<ruby>星川漣 <rt>ほしかわさざなみ</rt></ruby
					>、ナミ<br />
					職業：文学少女になりたいの看板娘<br />
					趣味：文字を読むこと
				</p>
			</div>
		</div>
		<template v-if="i18nStore.lang !== 'ja'">
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
		</template>
		<template v-else>
			<h2>サイトって</h2>
			<p>
				このサイトは個人サイトで、主に個人作品や個人の日常記録を保存するために使用されます。<br />
				サイトのコードはすべてオープンソースで、Githubでこのサイトのソースコードを見つけることができます：<br />
				フロントエンド: https://github.com/xiaotong-tong/website <br />
				バックエンド: https://github.com/xiaotong-tong/website-server <br />
				詳細については、この記事をご覧ください：<nami-link
					to="/article/15"
					style="color: #f34159"
					>サイトについて</nami-link
				>
			</p>
		</template>
	</section>

	<Teleport to="head" v-if="i18nStore.lang !== 'ja'">
		<meta name="keywords" content="小恸恸,星川涟" />
		<meta name="description" content="关于本网站的一些信息" />
	</Teleport>
	<Teleport to="head">
		<meta name="keywords" content="星川漣" />
		<meta name="description" content="このサイトについて" />
	</Teleport>
</template>

<script setup lang="ts">
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
</script>

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

h2 {
	font-size: 1.2em;
	margin-block-end: 4px;
}

p {
	line-height: 2;
}

@media screen and (max-width: 800px) {
	.character-wrap {
		display: none;
	}
}
</style>
