<template>
	<section>
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{ sitemapContent }}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import sitemapContent from "./sitemap.md";
import { useStore } from "@/stores/index";
const store = useStore();
</script>

<style scoped></style>
