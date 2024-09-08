<template>
	<section class="p-2" v-if="!loading">
		<div>
			<div class="flex">
				<span>类别：</span>
				<div class="flex gap-x-1">
					<Tag
						v-for="item in categories"
						:key="item"
						:color="store.currentTheme"
						@click="changeCategory(item)"
					>
						{{ item }}
					</Tag>
				</div>
			</div>
		</div>
		<namiMainCard
			class="mb-4"
			v-for="item in acticleList.showLists"
			:key="item.id"
			:info="{ ...item, headerLink: '/article/' + item.id }"
			@changeCategory="changeCategory"
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
import { ref, reactive } from "vue";
import { getActicleList, getCategories } from "@/api/blog/acticle";
import { useStore } from "@/stores/index";
import namiMainCard from "./components/card/card.vue";
import { Tag } from "@c/index";
import { useUrlSearchParams } from "@vueuse/core";

const store = useStore();

const urlSearchParams = useUrlSearchParams("history", {
	removeNullishValues: true
});

const acticleList: {
	lists: Acticle[];
	showLists: Acticle[];
} = reactive({
	lists: [],
	showLists: []
});

const loading = ref(true);

async function getActicleListFn() {
	loading.value = true;
	acticleList.lists = await getActicleList({
		category: urlSearchParams.category as string
	});

	acticleList.showLists =
		acticleList.lists?.slice(
			(currentPage.value - 1) * pageSize,
			currentPage.value * pageSize
		) || [];
	loading.value = false;
}

const currentPage = ref(Number(urlSearchParams.page) || 1);
const pageSize = 10;
const changePage = (page: number) => {
	currentPage.value = page;

	acticleList.showLists =
		acticleList.lists?.slice(
			(currentPage.value - 1) * pageSize,
			currentPage.value * pageSize
		) || [];

	if (page === 1) {
		urlSearchParams.page = null as unknown as string;
		return;
	}

	urlSearchParams.page = page + "";

	// 切换分页页面后滚动到最顶端
	scrollTo({
		top: 0,
		behavior: "smooth"
	});
};

getActicleListFn();

// 获取分类列表
const categories = ref<string[]>([]);
async function getCategoriesFn() {
	categories.value = await getCategories();
}
getCategoriesFn();
function changeCategory(category: string) {
	urlSearchParams.category = category;
	currentPage.value = 1;
	urlSearchParams.page = null as unknown as string;
	getActicleListFn();
}
</script>

<style scoped></style>
