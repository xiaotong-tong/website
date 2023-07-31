<template>
	<section class="container">
		<namiMainCard
			class="card"
			v-for="item in acticleList.list"
			:key="item.id"
			:info="{ ...item, headerLink: '/article/' + item.id }"
		/>
	</section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { getActicleList } from "@/api/blog/blog";
import type { UUID } from "crypto";

interface ActicleList {
	list: {
		id: number;
		uid: UUID;
		title: string;
		content: string;
		author: string;
		category: string;
		tags: string;
		createDate: string;
		thumbnail: string;
		abstract: string;
	}[];
}
const acticleList: ActicleList = reactive({
	list: []
});

(async () => {
	const data = await getActicleList({ category: "网络互联" });
	acticleList.list = data;
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
