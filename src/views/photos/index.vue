<template>
	<section class="container web-color-default">
		<xtt-list-masonry>
			<xtt-list-item v-for="(item, index) in images" v-show="item.loaded">
				<img :src="item.url" class="img" loading="lazy" @load="imageLoadHandler(index)" />
			</xtt-list-item>
		</xtt-list-masonry>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const images = ref([
	{
		url: "https://image.xtt.moe/local/images/2023/08/04/96bfd9774565347d3c.md.jpg",
		loaded: false
	},
	{
		url: "https://image.xtt.moe/local/images/2023/07/25/20230725143438b4a3ff85d2db0a9d.png",
		loaded: false
	}
]);

const imageLoadHandler = (index: number) => {
	console.log("image loaded", index);

	images.value[index].loaded = true;
};
</script>

<style scoped>
.img {
	width: 100%;
}
</style>
