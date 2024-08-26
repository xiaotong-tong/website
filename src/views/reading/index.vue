<template>
	<section class="container">
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{ readingContent }}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import readingContent from "./reading.md";
import { useStore } from "@/stores/index";

const store = useStore();
</script>

<style scoped></style>
