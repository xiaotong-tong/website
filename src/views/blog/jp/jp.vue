<template>
	<section class="container">
		<namiMainCard
			:info="{
				headerLink: '/jp/words',
				title: '日本語単語勉強',
				author: 'xtt',
				category: '日语学习',
				tags: null,
				createDate: '2023-07-23',
				thumbnail: 'https://image.xtt.moe/images/2023/07/23/23.jpg',
				abstract: '日本語勉強'
			}"
		/>
		<namiMainCard
			v-for="item in acticleList.list"
			:key="item.id"
			:info="{ ...item, headerLink: '/article/' + item.id }"
		/>
	</section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getActicleList } from "@/api/blog/blog.js";

const acticleList = reactive({
	list: []
});

(async () => {
	const { data } = await getActicleList({ category: "日语学习" });
	acticleList.list = data.data;
})();
</script>

<style scoped>
.container {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
	padding: 8px;
}

.card + .card {
	margin-top: 16px;
}
</style>
