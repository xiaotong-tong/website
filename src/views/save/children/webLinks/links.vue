<template>
	<section class="container">
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{
			i18nStore.lang === "ja" ? jaLinkContent : linkContent
		}}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import linkContent from "./links.md";
import jaLinkContent from "./links.ja.md";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
const store = useStore();
</script>

<style scoped></style>
