<template>
	<section class="w-full flex justify-center items-center">
		<Panel wrapperTargetName="h2">{{ t("pages.santi.title") }}</Panel>
		<MyAdd class="absolute right-4 top-3" @submit="getList" />
	</section>

	<Alert class="mb-4" type="warning"> 下面的三题故事由AI生成，仅限记录。</Alert>

	<NCollapse v-show="loaded">
		<NCollapseItem v-for="item in list" :key="item.id" :title="item.topic" :name="item.id">
			<div class="whitespace-pre-wrap">{{ item.content }}</div>
		</NCollapseItem>
	</NCollapse>

	<section v-show="!loaded">
		<namiPageLoading></namiPageLoading>
	</section>
</template>

<script setup lang="ts">
import type { SantiInfo } from "@/types/santi";
import { ref } from "vue";
import { Panel, Alert } from "@c/index";
import MyAdd from "./components/add.vue";
import { getSanti } from "@/api/santi/santi";
import { NCollapse, NCollapseItem } from "naive-ui";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const loaded = ref(false);
const list = ref<SantiInfo[]>([]);

async function getList() {
	const res = await getSanti();
	list.value = res.data;
	loaded.value = true;
}
getList();
</script>

<style scoped></style>
