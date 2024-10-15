<template>
	<section class="container">
		<markdown :content="i18nStore.lang === 'ja' ? jaLinkContent : linkContent"></markdown>
	</section>
</template>

<script setup lang="ts">
import linkContent from "./links.md";
import jaLinkContent from "./links.ja.md";
import { markdown } from "@c/index";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
</script>

<style scoped></style>
