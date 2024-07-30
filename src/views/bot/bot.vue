<template>
	<section>
		<xtt-markdown :dark="store.isDark ? '' : undefined">{{ botContent }}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import botContent from "./bot.md";
import { useStore } from "@/stores/index";

const store = useStore();
</script>

<style scoped></style>
