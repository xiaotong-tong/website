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

<script setup>
import { ref, reactive } from "vue";
import { getActicleList } from "@/api/blog/blog.js";

const acticleList = reactive({
	list: []
});

(async () => {
	const { data } = await getActicleList({ category: "喵随笔" });
	acticleList.list = data.data;
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
