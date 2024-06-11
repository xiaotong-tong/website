<template>
	<!-- 页面加载动画 -->
	<section v-show="loading">
		<namiPageLoading></namiPageLoading>
	</section>

	<section class="container web-color-default" v-show="!loading">
		<listMasonry :cols="cols" :columnGap="8" :rowGap="8" @resize="resize">
			<listMasonryItem v-for="item in loadedImageList" :key="item.id">
				<img :src="item.url" class="img" loading="lazy" />
			</listMasonryItem>
		</listMasonry>
	</section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { listMasonry, listMasonryItem } from "@c/index";
import { useImageList } from "@/utils/photos";

const cols = ref(4);

const { list: imageList, loading } = useImageList(true);

const loadedImageList: typeof imageList = ref([]);

watchEffect(() => {
	imageList.value.forEach((item) => {
		const img = new Image();
		img.src = item.url;
		img.onload = () => {
			loadedImageList.value.push(item);
		};
	});
});

function resize(width: number) {
	if (width >= 1200) {
		cols.value = 6;
	} else if (width >= 768) {
		cols.value = 4;
	} else {
		cols.value = 2;
	}
}
</script>

<style scoped>
.container {
	margin-inline: 8px;
}
.img {
	width: 100%;
}
</style>
