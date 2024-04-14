<template>
	<section class="container web-color-default" v-if="firstImgLoaded">
		<xtt-list-masonry>
			<xtt-list-masonry-item v-for="(item, index) in imageList" :key="index">
				<img :src="item.url" class="img" loading="lazy" />
			</xtt-list-masonry-item>
		</xtt-list-masonry>
	</section>

	<section v-else>
		<namiPageLoading></namiPageLoading>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { shuffle } from "xtt-utils";

const firstImgLoaded = ref(false);

const imageList = ref<
	{
		url: string;
	}[]
>([]);

const images = shuffle([
	"https://image.xtt.moe/local/images/2023/08/04/96bfd9774565347d3c.md.jpg",
	"https://image.xtt.moe/local/images/2023/07/25/20230725143438b4a3ff85d2db0a9d.png",
	"https://image.xtt.moe/local/images/2023/08/04/39.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/23/QQ20230625170228.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/23/1.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/23/1.md.png",
	"https://image.xtt.moe/local/images/2024/03/23/2.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/23/27.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/24/85.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/24/83.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/24/78.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/24/Fox-Hime.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/Fox-Hime-Zero.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/Blood-Code.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/LAMUNATION.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/04bd8d34a5dc0335c7bb4024ec06d002.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/re.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/6e3813ebcdb957d8e19251d44b4a82c4.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/be41b3eacc1f6f0320450540749f1296.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/4CC31A27B0FB4E837A8ACB5D2709D2D0.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/14.md.jpg",
	"https://image.xtt.moe/local/images/2024/03/24/112.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/f8d91b4a82d532c31d18699949e8b9b3.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/69e9db74e50576543f69e073e8edc934.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/a574b1984e0e6fe868b166a40057555b.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/tynhz.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/33e7a0c65562868b61960a94320c68a7.md.png",
	"https://image.xtt.moe/local/images/2024/03/24/716cd096bda96a7199376252f27640c5.md.png"
]);

const firstTime = Date.now();

images.forEach((item) => {
	const img = new Image();
	img.src = item;

	img.onload = () => {
		imageList.value?.push({
			url: item
		});

		// 加载最少等待 1 秒，避免页面闪烁
		if (Date.now() - firstTime < 1000) {
			setTimeout(() => {
				firstImgLoaded.value = true;
			}, 1000);
		} else {
			firstImgLoaded.value = true;
		}
	};
});
</script>

<style scoped>
.container {
	margin-inline: 8px;
}
.img {
	width: 100%;
}
</style>
