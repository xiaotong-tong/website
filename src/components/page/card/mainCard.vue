<template>
	<div
		:dark="store.isDark ? '' : undefined"
		ref="card"
		:class="{
			card: true,
			'web-color-default': true,
			visibled: visibled,
			unvisibled: !visibled
		}"
	>
		<div class="thumbnail-wrap">
			<img
				class="thumbnail"
				:src="props.info.thumbnail || 'https://image.xtt.moe/images/bg.webp'"
				alt="缩略图"
				loading="lazy"
			/>
		</div>
		<div class="info-wrap">
			<h2>
				<nami-link class="title-link" inline-block :to="props.info.headerLink">{{
					i18nStore.lang === "ja"
						? props.info.jaTitle || props.info.title
						: props.info.title
				}}</nami-link>
			</h2>
			<p>
				<span>{{
					(i18nStore.lang === "ja" ? "post on " : "发布于 ") + props.info.createDate
				}}</span>

				&nbsp;&nbsp;&nbsp;
				<nami-link
					class="tag-link"
					:to="['/net', '/lang', '/note', '/star'][Number(props.info.category)]"
					>#
					{{
						useStateType.ActicleCategoryType[
							i18nStore.lang === "ja" ? "jaShowText" : "showText"
						][Number(props.info.category)]
					}}</nami-link
				>
			</p>
			<p class="abstract">
				{{
					i18nStore.lang === "ja"
						? props.info.jaAbstract ||
						  props.info.jaContent ||
						  props.info.abstract ||
						  props.info.content
						: props.info.abstract || props.info.content
				}}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useStore } from "@/stores/index";
import { useStateTypeStore } from "@/stores/stateType";
import { useI18nStore } from "@/stores/i18n";
const store = useStore();
const useStateType = useStateTypeStore();
const i18nStore = useI18nStore();

interface Props {
	info: {
		headerLink: string;
		title: string;
		content: string;
		createDate: string;
		category: string;
		thumbnail: string;
		abstract: string;
		jaTitle: string;
		jaContent: string;
		jaAuthor: string;
		jaAbstract: string;
		jaTags: string;
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
		abstract: "",
		jaTitle: "",
		jaContent: "",
		jaAuthor: "",
		jaAbstract: "",
		jaTags: ""
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
		threshold: [0]
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
}

.thumbnail-wrap {
	flex: 0 0 380px;
	aspect-ratio: 16 / 9;
	overflow: hidden;
}
.thumbnail {
	width: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
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
.info-wrap .title-link::part(link):hover,
.tag-link::part(link):hover {
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
