<template>
	<section class="container">
		<namiMainCard
			class="card"
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
			class="card"
			v-for="item in acticleList"
			:key="item.id"
			:info="{ ...item, headerLink: '/article/' + item.id }"
		/>
	</section>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Acticle } from "@/types/acticle";
import { ref } from "vue";
import { getActicleList } from "@/api/blog/acticle";

const acticleList: Ref<Acticle[] | null> = ref(null);

(async () => {
	const data = await getActicleList({ category: "日语学习" });
	acticleList.value = data;
})();
</script>

<style scoped>
.container {
	padding: 8px;
}

.card {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
}

.card + .card {
	margin-top: 16px;
}
</style>
