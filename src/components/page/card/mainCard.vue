<template>
	<div
		:dark="store.isDark ? '' : undefined"
		ref="card"
		:class="{
			card: true,
			visibled: visibled,
			unvisibled: !visibled
		}"
	>
		<div class="thumbnail-wrap">
			<img
				class="thumbnail"
				:src="
					props.info.thumbnail ||
					'https://image.xtt.moe/images/2023/07/18/b885910a19d8bc3eed2c5e98828ba61ea8d34544.jpg'
				"
				alt="缩略图"
			/>
		</div>
		<div class="info-wrap">
			<h2>
				<nami-link class="title-link" inline-block :to="props.info.headerLink">{{
					props.info.title
				}}</nami-link>
			</h2>
			<p>
				发布于<span>{{ props.info.createDate }}</span>

				&nbsp;&nbsp;&nbsp; # {{ props.info.category }}
			</p>
			<p class="abstract">
				{{ props.info.abstract || props.info.content }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useStore } from "@/stores/index";
const store = useStore();

interface Props {
	info: {
		headerLink: string;
		title: string;
		content: string;
		createDate: string;
		category: string;
		thumbnail: string;
		abstract: string;
	};
}
const props = withDefaults(defineProps<Props>(), {
	info: () => ({
		headerLink: "",
		title: "",
		content: "",
		createDate: "",
		category: "",
		thumbnail: "",
		abstract: ""
	})
});

const card = ref<HTMLElement | null>(null);
const visibled = ref(false);

const intersectionObserver = new IntersectionObserver(
	(entries) => {
		const entry = entries[0];

		if (entry.intersectionRatio > 0) {
			visibled.value = true;

			// 在更新完成后，取消监听
			intersectionObserver.unobserve(entry.target);
		}
	},
	{
		threshold: [0.1]
	}
);

onMounted(() => {
	if (card.value) {
		intersectionObserver.observe(card.value);
	}
});

onBeforeUnmount(() => {
	// 在组件卸载前，如果还在监听，就取消监听
	intersectionObserver?.disconnect();
});
</script>

<style scoped>
.card {
	display: flex;
	padding: 8px;
	column-gap: 8px;
	border-radius: 5px;
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
}
.card[dark] {
	background-color: #00000020;
	backdrop-filter: blur(5px);
	color: #cfd3dc;
}

.thumbnail-wrap {
	flex: 0 0 380px;
	aspect-ratio: 16 / 9;
	overflow: hidden;
}
.thumbnail {
	width: 100%;
	display: block;
	border-radius: 5px;
}
/* 在 dark 模式下，有的图片太亮，将亮度调低一些 */
.card[dark] .thumbnail {
	filter: brightness(0.7);
}

.info-wrap {
	flex: 1;
	min-width: 0;
}
.info-wrap h2 {
	margin-block-start: 8px;
}

.small-screen .info-wrap h2 {
	font-size: 18px;
}
.info-wrap .title-link {
	width: 100%;
	--link-padding: 0;
}
.info-wrap .title-link::part(link) {
	width: 100%;
	justify-content: flex-start;
	padding: 0;
}
.info-wrap .title-link::part(link):hover {
	color: #f34159;
}

.abstract {
	font-size: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

@media screen and (max-width: 992px) {
	.thumbnail-wrap {
		flex: 0 0 312px;
	}
}

@media screen and (max-width: 768px) {
	.card {
		flex-wrap: wrap;
	}
	.thumbnail-wrap {
		flex: 0 0 100%;
	}
}

/* 显示动画 */
.card.unvisibled {
	opacity: 0;
	transform: scale(0.3);
}
.card.visibled {
	opacity: 1;
	transform: scale(1);
	transition: opacity 0.3s, transform 0.4s ease-in-out;
}
</style>
