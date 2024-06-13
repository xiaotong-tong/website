<template>
	<hBanner wrapperTargetName="h1">Tools</hBanner>
	<xtt-markdown :dark="store.isDark ? '' : undefined">{{
		i18nStore.lang === "ja" ? jaLinkContent : linkContent
	}}</xtt-markdown>
</template>

<script setup lang="ts">
import linkContent from "./tools.md";
import jaLinkContent from "./tools.ja.md";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";
import { hBanner } from "@c/index";

const i18nStore = useI18nStore();
const store = useStore();
</script>

<style scoped></style>
