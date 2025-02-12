<template>
	<namiHeader v-if="!store.isSmallScreen"></namiHeader>
	<namiMHeader v-else></namiMHeader>

	<section class="page" v-if="loaded">
		<div class="view-content" v-if="curGroup" ref="containerRef">
			<MyBulletinBG01 :bulletin="curGroup"></MyBulletinBG01>
			<MyLineCardEditorArea :containerRef="containerRef" :bulletin="curGroup"></MyLineCardEditorArea>
		</div>
		<div class="right-action">
			<div class="flex flex-col w-full gap-y-2 overflow-y-auto pe-1">
				<div class="flex-none" v-for="item in groupList" :key="item.id" @click="curGroup = item">
					<img class="h-full w-auto" :src="item.url" loading="lazy" />
				</div>
			</div>
		</div>
	</section>

	<section class="page" v-else>
		<namiPageLoading></namiPageLoading>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import namiHeader from "@/components/page/header/header.vue";
import namiMHeader from "@/components/page/header/m-header.vue";
import { useStore } from "@/stores/index";
import MyLineCardEditorArea from "./modules/lineCardEditorArea.vue";
import MyBulletinBG01 from "./modules/bulletinBG01.vue";
import { getGroupList, type BulletinGroup } from "./api";

const store = useStore();

const loaded = ref(false);

const containerRef = ref<HTMLElement>();
const curGroup = ref<BulletinGroup>();

const groupList = ref<BulletinGroup[]>([]);
async function getGroupListData() {
	const prevTime = Date.now();
	const res = await getGroupList();
	groupList.value = res.data;
	curGroup.value = res.data[0];

	const diffTime = Date.now() - prevTime;
	if (diffTime < 1000) {
		setTimeout(() => {
			loaded.value = true;
		}, 1000 - diffTime);
	} else {
		loaded.value = true;
	}
}
getGroupListData();
</script>

<style scoped>
.page {
	position: absolute;
	top: 36px;
	left: 0;
	width: 100%;
	height: calc(100% - 36px);
	display: flex;

	.view-content {
		position: relative;
		flex: 1;
		overflow: auto;
	}

	.right-action {
		width: 260px;
		padding-left: 8px;
	}
}
</style>
