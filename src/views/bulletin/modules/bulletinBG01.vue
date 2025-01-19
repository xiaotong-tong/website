<template>
	<div
		class="bulletin-bg bulletin-bg-01"
		:style="{
			backgroundImage: `url(${bulletin.url})`,
			width: `${bulletin.width}px`,
			height: `${bulletin.height}px`
		}"
	>
		<LineCard
			class="bulletin-card"
			v-for="item in data"
			:color="item.theme?.borderColor"
			v-model:width="item.width"
			v-model:height="item.height"
			:bgColor="item.theme?.bgColor"
			:borderSize="item.theme?.borderSize"
			:style="{
				color: item.theme?.color,
				transform: `translate(${item.x}px, ${item.y}px)`
			}"
		>
			{{ item.content }}
		</LineCard>
	</div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { LineCard } from "@c/index";
import { type BulletinGroup, getBulletinList, type BulletinCard } from "../api";

const { bulletin } = defineProps({
	bulletin: {
		type: Object as PropType<BulletinGroup>,
		required: true
	}
});

const data = ref<BulletinCard[]>([]);

async function fetchData() {
	const res = await getBulletinList({
		groupId: bulletin.id
	});

	data.value = res;
}
fetchData();

watch(
	() => bulletin,
	() => {
		data.value = [];
		fetchData();
	}
);
</script>

<style scoped>
.bulletin-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;

	.bulletin-card {
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>
