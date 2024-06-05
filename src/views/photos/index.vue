<template>
	<!-- 页面加载动画 -->
	<section v-show="!imgLoaded">
		<namiPageLoading></namiPageLoading>
	</section>

	<section class="container web-color-default" v-show="imgLoaded">
		<listMasonry :cols="cols" :columnGap="8" :rowGap="8" @resize="resize">
			<template v-for="item in imageList" :key="item.id">
				<listMasonryItem v-if="item.loaded">
					<img :src="item.url" class="img" loading="lazy" />
				</listMasonryItem>
			</template>
		</listMasonry>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { shuffle } from "xtt-utils";
import { useFetch, useSessionStorage } from "@vueuse/core";
import { listMasonry, listMasonryItem } from "@c/index";

const cols = ref(4);
interface Image {
	id: number;
	url: string;
	loaded: boolean;
}

// 控制是否显示加载动画
const imgLoaded = ref(false);

const imageList = ref<Image[]>([]);
const storageRef = useSessionStorage("imageList", []);

const loadImageList = async () => {
	// 如果 sessionStorage 有数据，直接使用，不再请求
	if (storageRef.value?.length) {
		imageList.value = shuffle(storageRef.value).map((item: Image) => {
			return {
				id: item.id,
				url: item.url,
				loaded: false
			};
		});
		imgLoaded.value = true;
		imageInitLoad();
		return;
	}

	const { data } = await useFetch<Image[]>("https://api.xtt.moe/photos/list", {
		afterFetch(ctx) {
			// 保存到 sessionStorage
			storageRef.value = ctx.data;
			return ctx;
		}
	}).json();

	imageList.value = shuffle<Image>(data.value).map((item: Image) => {
		return {
			id: item.id,
			url: item.url,
			loaded: false
		};
	});
	imgLoaded.value = true;
	imageInitLoad();
};

loadImageList();

function imageInitLoad() {
	imageList.value.forEach((item) => {
		const img = new Image();
		img.src = item.url;
		img.onload = () => {
			item.loaded = true;
		};
	});
}

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
