<template>
	<section class="container web-color-default">
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{ linkContent }}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import linkContent from "./links.md";
import { useStore } from "@/stores/index";
const store = useStore();
</script>

<style scoped></style>
