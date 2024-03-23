<template>
	<section class="container web-color-default">
		<xtt-list-masonry>
			<xtt-list-masonry-item v-for="(item, index) in imageList" :key="index">
				<img :src="item.url" class="img" loading="lazy" />
			</xtt-list-masonry-item>
		</xtt-list-masonry>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { shuffle } from "xtt-utils";

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
	"https://image.xtt.moe/local/images/2024/03/23/2.md.jpg"
]);

images.forEach((item) => {
	const img = new Image();
	img.src = item;

	img.onload = () => {
		imageList.value?.push({
			url: item
		});
	};
});
</script>

<style scoped>
.img {
	width: 100%;
}
</style>
