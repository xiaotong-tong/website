<template>
	<markdown :content="readingContent"></markdown>
</template>

<script setup lang="ts">
import readingContent from "./reading.md";
import { markdown } from "@c/index";
</script>

<style scoped></style>
