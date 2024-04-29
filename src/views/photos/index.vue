<template>
	<!-- 页面加载动画 -->
	<section v-show="!imgLoaded">
		<namiPageLoading></namiPageLoading>
	</section>

	<section class="container web-color-default" v-show="imgLoaded">
		<xtt-list-masonry class="list">
			<template v-for="item in imageList" :key="item.id">
				<xtt-list-masonry-item v-if="item.loaded">
					<img :src="item.url" class="img" loading="lazy" @load="imgLoadEvent" />
				</xtt-list-masonry-item>
			</template>
		</xtt-list-masonry>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { shuffle } from "xtt-utils";
import { useFetch, useSessionStorage } from "@vueuse/core";
import { gsap } from "gsap";

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

const imgLoadEvent = (e: Event) => {
	const element = e.target as HTMLImageElement;
	gsap.from(element, {
		opacity: 0,
		duration: 1,
		y: 50,
		ease: "power2.out"
	});
};

function imageInitLoad() {
	imageList.value.forEach((item) => {
		const img = new Image();
		img.src = item.url;
		img.onload = () => {
			item.loaded = true;
		};
	});
}
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
