<template>
	<div
		class="bulletin-bg bulletin-bg-01"
		:style="{
			backgroundImage: `url(${bgUrl})`
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
import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import { LineCard } from "@c/index";

interface BulletinCard {
	content: string;
	width: number;
	height: number;
	x: number;
	y: number;
	type: number;
	theme: {
		bgColor: string;
		color: string;
		borderColor: string;
		borderSize: number;
	};
}

const bgUrl = ref("https://data.xtt.moe/bulletin-01.webp");
// https://api.xtt.moe/bulletin/list
const { data } = useFetch("http://localhost:5001/bulletin/list").json<BulletinCard[]>();
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
