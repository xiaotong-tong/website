<template>
	<section class="p-2" v-if="!loading">
		<div class="flex justify-between">
			<div class="flex">
				<span>类别：</span>
				<div class="ms-2 flex gap-x-1">
					<Tag
						v-for="item in categories"
						:key="item"
						:color="store.currentTheme"
						@click="changeCategory(item, true)"
						:checked="
							item === urlSearchParams.category ||
							(Array.isArray(urlSearchParams.category) &&
								urlSearchParams.category.includes(item))
						"
					>
						{{ item }}
					</Tag>
				</div>
			</div>
			<div>
				<Link v-login type="primary" to="/editor/add">新增</Link>
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
import { ref, reactive, watch } from "vue";
import { getActicleList, getCategories, getCategoriesJP } from "@/api/blog/acticle";
import { useStore } from "@/stores/index";
import namiMainCard from "./components/card/card.vue";
import { Tag, Link } from "@c/index";
import { useUrlSearchParams } from "@vueuse/core";
import { useI18nStore } from "@/stores/i18n";

const store = useStore();
const i18nStore = useI18nStore();

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
		category:
			(Array.isArray(urlSearchParams.category)
				? urlSearchParams.category.join(",")
				: urlSearchParams.category) || undefined,
		lang: i18nStore.lang
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
// 获取日文分类列表
async function getJaCategoriesFn() {
	const res = await getCategoriesJP();
	categories.value = res.filter((item) => item !== null);
}
getJaCategoriesFn();
function changeCategory(category: string, byTag = false) {
	if (byTag) {
		if (typeof urlSearchParams.category === "string") {
			if (urlSearchParams.category === category) {
				urlSearchParams.category = null as unknown as string;
			} else {
				urlSearchParams.category = [urlSearchParams.category, category];
			}
		} else if (Array.isArray(urlSearchParams.category)) {
			if (urlSearchParams.category.includes(category)) {
				urlSearchParams.category = urlSearchParams.category.filter(
					(item) => item !== category
				);
			} else {
				urlSearchParams.category.push(category);
			}
		} else {
			urlSearchParams.category = category;
		}
	} else {
		urlSearchParams.category = category;
	}
	currentPage.value = 1;
	urlSearchParams.page = null as unknown as string;
	getActicleListFn();
}

watch(
	() => i18nStore.lang,
	() => {
		if (i18nStore.lang === "ja") {
			getJaCategoriesFn();
		} else {
			getCategoriesFn();
		}
		urlSearchParams.page = null as unknown as string;
	},
	{
		immediate: true
	}
);
</script>

<style scoped></style>
