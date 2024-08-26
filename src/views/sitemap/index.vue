<template>
	<section class="container">
		<markdown :content="i18nStore.lang === 'ja' ? jaSitemapContent : sitemapContent"></markdown>
	</section>
</template>

<script setup lang="ts">
import sitemapContent from "./sitemap.md";
import jaSitemapContent from "./sitemap.ja.md";
import { useI18nStore } from "@/stores/i18n";
import { markdown } from "@c/index";

const i18nStore = useI18nStore();
</script>

<style scoped></style>
