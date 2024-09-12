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
			/>
		</div>
		<div class="info-wrap">
			<Link :to="props.info.headerLink" block class="header-link justify-start ps-0">
				<h2 class="text-xl font-bold">
					{{
						i18nStore.lang === "ja"
							? props.info.jaTitle || props.info.title
							: props.info.title
					}}
				</h2>
			</Link>
			<p>
				<span>{{
					(i18nStore.lang === "ja" ? "post on " : "发布于 ") + props.info.createDate
				}}</span>

				&nbsp;&nbsp;&nbsp;
				<nami-link
					class="tag-link"
					:isQuery="true"
					to="category"
					:queryValue="props.info.category"
					@click="() => emits('changeCategory', props.info.category)"
					># {{ props.info.category }}</nami-link
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
			<div class="footer">
				<Link class="article-link" block :to="props.info.headerLink"
					>{{ t("pages.blog.readMore")
					}}<namiIcon class="ms-1" icon="mdiBookOpenBlankVariantOutline" />
				</Link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useStore } from "@/stores/index";
import { useI18n } from "vue-i18n";
import { useI18nStore } from "@/stores/i18n";
import { Link } from "@c/index";

const store = useStore();
const { t } = useI18n();
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

const emits = defineEmits(["changeCategory"]);

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
	position: relative;
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

.abstract {
	font-size: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

.footer {
	position: absolute;
	inset-block-end: 8px;
	inset-inline-end: 16px;
}

.article-link {
	color: var(--d-color);
}

.header-link:hover,
.article-link:hover {
	text-decoration: underline;
}

@media screen and (max-width: 992px) {
	.thumbnail-wrap {
		flex: 0 0 312px;
	}
}

@media screen and (max-width: 768px) {
	.card {
		flex-wrap: wrap;
		padding: 0;
	}
	.thumbnail-wrap {
		flex: 0 0 100%;
	}
	.info-wrap {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.7),
			rgba(0, 0, 0, 0.3) 60%,
			rgba(0, 0, 0, 0.2) 80%,
			rgba(0, 0, 0, 0)
		);
		color: azure;
		padding: 8px;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
	}
	.info-wrap > :is(h2, p) {
		flex: 0 0 100%;
		padding-inline: 8px;
	}
	.info-wrap > p:nth-of-type(1) {
		margin-block: -8px 4px;
		font-size: 12px;
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
