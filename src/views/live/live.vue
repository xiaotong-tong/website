<template>
	<section class="w-full flex justify-center items-center">
		<Panel wrapperTargetName="h2">{{ t("pages.live.title") }}</Panel>
		<MyAdd class="absolute right-4 top-3" @submit="getList" />
	</section>

	<nami-timeline v-if="loaded" class="content" contentAlign="center">
		<nami-timeline-item v-for="item in list" :key="item.id" :oppositeWidth="180">
			<template v-slot:body>
				<div class="whitespace-pre-wrap" v-if="item.contentType === 'text'">{{ item.content }}</div>
				<markdown v-if="item.contentType === 'markdown'" class="up:pt-0" :content="item.content"></markdown>
			</template>
			<template v-slot:opposite="{ small }">
				<div
					:style="{
						display: small ? 'inline-flex' : 'block',
						gap: small ? '8px' : '0'
					}"
				>
					<div>{{ dayjs(item.createTime).format("YYYY-MM-DD hh:mm:ss") }}</div>
					<div v-lang="'zh'">@{{ item.verify.name }}</div>
					<div v-lang="'ja'">@{{ item.verify.jpName || item.verify.name }}</div>
					<div v-if="userInfo.id === item.userId">
						<NPopconfirm
							:positive-text="t('common.confirm')"
							:negative-text="t('common.cancel')"
							@positive-click="handlePositiveClick(item.id)"
						>
							<template #trigger>
								<NButton text><nami-icon icon="mdiDeleteOutline" /></NButton>
							</template>
							<template #default>
								<div>{{ t("common.confirmDelete") }}</div>
							</template>
						</NPopconfirm>
					</div>
				</div>
			</template>
		</nami-timeline-item>
	</nami-timeline>

	<section v-show="!loaded">
		<namiPageLoading></namiPageLoading>
	</section>
</template>

<script setup lang="ts">
import type { LiveInfo } from "@/types/live";
import { ref } from "vue";
import { Panel, markdown } from "@c/index";
import MyAdd from "./components/add.vue";
import { getLives, deleteLive } from "@/api/live/live";
import { dayjs } from "@/utils/dateUtil";
import { NButton, NPopconfirm } from "naive-ui";
import { useUserInfoStore } from "@/stores/user";
import { useI18n } from "vue-i18n";

const { userInfo } = useUserInfoStore();
const { t } = useI18n();

const loaded = ref(false);
const list = ref<LiveInfo[]>([]);

async function getList() {
	const res = await getLives();
	list.value = res.data;
	loaded.value = true;
}
getList();

function handlePositiveClick(id: number) {
	deleteLive(id).then(() => {
		getList();
	});
}
</script>

<style scoped></style>
