<template>
	<div class="card">
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
	display: block;
	border-radius: 5px;
}

.info-wrap {
	flex: 1;
}
.info-wrap h2 {
	margin-block-start: 8px;
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
</style>
