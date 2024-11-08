<template>
	<h2 class="text-center">
		<Panel targetName="div" class="text-[24px]"> Tools </Panel>
	</h2>
	<markdown class="custom-font" :content="i18nStore.lang === 'ja' ? jaLinkContent : linkContent"></markdown>
</template>

<script setup lang="ts">
import linkContent from "./tools.md";
import jaLinkContent from "./tools.ja.md";
import { useI18nStore } from "@/stores/i18n";
import { Panel, markdown } from "@c/index";

const i18nStore = useI18nStore();
</script>

<style scoped></style>
