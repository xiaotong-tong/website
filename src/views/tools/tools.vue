<template>
	<section class="container web-color-default">
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{
			i18nStore.lang === "ja" ? jaToolsContent : toolsContent
		}}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import toolsContent from "./tools.md";
import jaToolsContent from "./tools.ja.md";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
const store = useStore();
</script>

<style scoped></style>
