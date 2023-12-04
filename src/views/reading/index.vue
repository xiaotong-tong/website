<template>
	<section class="container web-color-default">
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{
			i18nStore.lang === "ja" ? jaReadingContent : readingContent
		}}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import readingContent from "./reading.md";
import jaReadingContent from "./reading.ja.md";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
const store = useStore();
</script>

<style scoped></style>
