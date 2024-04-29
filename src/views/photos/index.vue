<template>
	<!-- 页面加载动画 -->
	<section v-show="!imgLoaded">
		<namiPageLoading></namiPageLoading>
	</section>

	<section class="container web-color-default" v-show="imgLoaded">
		<xtt-list-masonry class="list">
			<xtt-list-masonry-item v-for="item in imageList" :key="item.id">
				<img :src="item.url" class="img" loading="lazy" @load="imgLoadEvent" />
			</xtt-list-masonry-item>
		</xtt-list-masonry>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { shuffle } from "xtt-utils";
import { useFetch, useSessionStorage } from "@vueuse/core";

interface Image {
	id: number;
	url: string;
}

// 控制是否显示加载动画
const imgLoaded = ref(false);

const imageList = ref<Image[]>([]);
const storageRef = useSessionStorage("imageList", []);

const loadImageList = async () => {
	// 如果 sessionStorage 有数据，直接使用，不再请求
	if (storageRef.value) {
		imageList.value = shuffle(storageRef.value);
		return;
	}

	const { data } = await useFetch<Image[]>("https://api.xtt.moe/photos/list", {
		afterFetch(ctx) {
			// 保存到 sessionStorage
			storageRef.value = ctx.data;
			return ctx;
		}
	}).json();

	imageList.value = shuffle(data.value);
};

loadImageList();

const imgLoadCount = ref(0);

const imgLoadEvent = () => {
	imgLoadCount.value++;

	if (imgLoadCount.value >= 5) {
		imgLoaded.value = true;
	}
};
</script>

<style scoped>
.container {
	margin-inline: 8px;
}
.list {
	--list-border: none;
}
.img {
	width: 100%;
}
</style>
