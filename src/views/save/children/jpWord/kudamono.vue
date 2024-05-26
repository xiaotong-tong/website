<template>
	<section class="container">
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{ kudamono }}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import kudamono from "./果物.md";
import { useStore } from "@/stores/index";

const store = useStore();
</script>

<style scoped>
.container {
	margin-inline: 8px;
	margin-block-start: 32px;
}
</style>
