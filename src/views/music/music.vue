<template>
	<section class="ps-6">
		<div class="w-full h-[130px] bg-white sticky top-0 -left-10 -right-10 -translate-y-2"></div>
		<xtt-markdown class="mt-[130px]">{{ content }}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getActicleById } from "@/api/blog/acticle";

const content = ref<string | null>(null);
getActicleById(22).then((res) => {
	content.value = res.content;
});
</script>

<style scoped></style>
