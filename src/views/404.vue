<template>
	<section class="box web-color-default">
		<h1 hidden class="nf-404">404</h1>
		<img class="img" :src="photo" alt="404 Not Found" />

		<template v-if="i18nStore.lang === 'ja'">
			<p>探していたものが見つかりませんでした！ぴえん,役に立てない、ごめん(˃ ⌑ ˂ഃ )</p>
			<p>でも、先輩が教えてくれた「迷子でもいい、迷子でも進め!」という言葉を思い出します。</p>
			<p>ナミと一緒に<nami-link to="/" class="return-home">ホーム</nami-link>へ行きませんか？</p>
		</template>
		<template v-else>
			<p>涟没有找到想要的内容，呜呜，涟真没用，对不起</p>
			<p>不过有个前辈告诉我 “迷子でもいい、迷子でも進め!”</p>
			<p>需要涟带你去<nami-link to="/" class="return-home">首页</nami-link>吗？</p>
		</template>
	</section>
</template>

<script setup lang="ts">
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();

const photo = import.meta.env.VITE_IMAGE_URL + "/images/404.webp";
</script>

<style scoped>
.box {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}

.img {
	width: 100%;
	max-width: 400px;
	margin-top: 30px;
}

.return-home {
	margin-top: 30px;
	padding: 10px 20px;
	color: transparent;
	background-image: linear-gradient(310deg, #f53939, #fac60b);
	-webkit-background-clip: text;
	background-clip: text;
}
</style>
