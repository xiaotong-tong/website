<template>
	<section class="container">
		<div class="card" v-for="item in acticleList.list" :key="item.id">
			<div class="thumbnail-wrap">
				<img
					class="thumbnail"
					:src="
						item.thumbnail ||
						'http://image.xtt.moe/images/2023/07/18/b885910a19d8bc3eed2c5e98828ba61ea8d34544.jpg'
					"
					alt="缩略图"
				/>
			</div>
			<div class="info-wrap">
				<h2>
					<nami-link class="title-link" inline-block :to="'/blog/article/' + item.id">{{
						item.title
					}}</nami-link>
				</h2>
				<p>
					发布于<span>{{ item.createDate }}</span>

					&nbsp;&nbsp;&nbsp; # {{ item.category }}
				</p>
				<p class="abstract">
					{{ item.abstract || item.content }}
				</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getActicleList } from "@/api/blog/blog.js";

const acticleList = reactive({
	list: []
});

(async () => {
	const { data } = await getActicleList();
	acticleList.list = data.data;
})();
</script>

<style scoped>
.container {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
	padding: 8px;
}

.card {
	display: flex;
	outline: thin solid red;
	padding: 8px;
	column-gap: 8px;
}
.card + .card {
	margin-top: 16px;
}
.thumbnail-wrap {
	flex: 0 0 380px;
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
</style>
