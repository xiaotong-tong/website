<template>
	<section class="ps-6 relative">
		<div
			class="w-full h-[140px] bg-white sticky top-0 -left-10 -right-10 -translate-y-2 flex items-end pb-1"
		>
			<NButton
				class="me-8"
				v-for="item in musicList"
				:key="item.id"
				type="primary"
				text
				@click="changeKaShi($event, item.id)"
			>
				{{ item.title }}
			</NButton>
		</div>

		<markdown class="mt-[140px] !font-[luoliti]" :content="content" :textLine="true"></markdown>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getActicleById } from "@/api/blog/acticle";
import { markdown } from "@c/index";
import { NButton } from "naive-ui";

const musicList = [
	{
		id: 22,
		title: "ごはんを食べよう"
	},
	{
		id: 27,
		title: "ナミダノコエ"
	}
];

const content = ref<string>();
getActicleById(22).then((res) => {
	content.value = res.content;
});

const changing = ref(false);

function changeKaShi(_, id: number) {
	if (changing.value) return;

	changing.value = true;
	content.value = "";

	getActicleById(id).then((res) => {
		content.value = res.content;
		changing.value = false;
	});
}
</script>

<style scoped></style>
