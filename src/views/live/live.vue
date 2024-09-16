<template>
	<section class="flex justify-between items-center">
		<hBanner wrapperTargetName="h2">动态</hBanner>
		<MyAdd @submit="getList" />
	</section>

	<nami-timeline class="content" contentAlign="center">
		<nami-timeline-item v-for="item in list" :key="item.id">
			<template v-slot:body>
				<pre v-if="item.contentType === 'text'" class="box">{{ item.content }}</pre>
				<markdown
					v-if="item.contentType === 'markdown'"
					class="up:pt-0 box"
					:content="item.content"
				></markdown>
			</template>
			<template v-slot:opposite>
				<div>{{ dayjs(item.createTime).format("YYYY-MM-DD hh:mm:ss") }}</div>
				<div>@{{ item.verify.name }}</div>
			</template>
		</nami-timeline-item>
	</nami-timeline>
</template>

<script setup lang="ts">
import type { LiveInfo } from "@/types/live";
import { ref } from "vue";
import { hBanner, markdown } from "@c/index";
import MyAdd from "./components/add.vue";
import { getLives } from "@/api/live/live";
import { dayjs } from "@/utils/dateUtil";

const list = ref<LiveInfo[]>([]);

async function getList() {
	const res = await getLives();
	list.value = res.data;
}
getList();
</script>

<style scoped>
.content :deep(.timeline-item-opposite) {
	flex: 0 0 180px;
	text-align: right;
}
.content.content.content::before {
	left: 203px;
}

.box {
	border: 1px solid #ddd;
	border-radius: 4px;
	padding: 8px;
}
</style>
