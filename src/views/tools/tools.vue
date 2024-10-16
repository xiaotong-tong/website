<template>
	<hBanner wrapperTargetName="h1">Tools</hBanner>
	<markdown class="custom-font" :content="i18nStore.lang === 'ja' ? jaLinkContent : linkContent"></markdown>
</template>

<script setup lang="ts">
import linkContent from "./tools.md";
import jaLinkContent from "./tools.ja.md";
import { useI18nStore } from "@/stores/i18n";
import { hBanner, markdown } from "@c/index";

const i18nStore = useI18nStore();
</script>

<style scoped></style>
