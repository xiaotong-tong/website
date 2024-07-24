<template>
	<section class="p-2" v-if="!loading">
		<namiMainCard
			class="mb-4"
			v-for="item in acticleList.showLists"
			:key="item.id"
			:info="{ ...item, headerLink: '/article/' + item.id }"
		/>

		<namiPagination
			v-if="acticleList.lists?.length"
			:total="acticleList.lists.length"
			v-model:currentPage="currentPage"
			@currentChange="changePage"
		></namiPagination>
	</section>

	<template v-else>
		<namiPageLoading></namiPageLoading>
	</template>

	<Teleport to="head">
		<meta name="keywords" content="星川漣,小恸恸,博客,前端,日语" />
		<meta
			name="description"
			content="星川漣的个人博客,主要记录一些前端代码功能, 以及一些代码设计。"
		/>
	</Teleport>
</template>

<script setup lang="ts">
import type { Acticle } from "@/types/acticle";
import { ref, reactive, watchEffect } from "vue";
import { getActicleList } from "@/api/blog/acticle";
import { useRouter, useRoute } from "vue-router";
import namiMainCard from "./components/card/card.vue";

const router = useRouter();
const route = useRoute();
const acticleList: {
	lists: Acticle[];
	showLists: Acticle[];
} = reactive({
	lists: [],
	showLists: []
});

const loading = ref(true);

(async () => {
	acticleList.lists = await getActicleList();
	loading.value = false;
})();

const currentPage = ref(route.query.page ? +route.query.page : 1);
const pageSize = 10;
const changePage = (page: number) => {
	currentPage.value = page;

	if (page === 1) {
		router.push({
			query: {}
		});
		return;
	}

	router.push({
		query: {
			page
		}
	});

	// 切换分页页面后滚动到最顶端
	scrollTo({
		top: 0,
		behavior: "smooth"
	});
};

watchEffect(() => {
	acticleList.showLists =
		acticleList.lists?.slice(
			(currentPage.value - 1) * pageSize,
			currentPage.value * pageSize
		) || [];
});
</script>

<style scoped></style>
