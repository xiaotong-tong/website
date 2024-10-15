<template>
	<markdown :content="kudamono"></markdown>
</template>

<script setup lang="ts">
import kudamono from "./食べること.md";
import { markdown } from "@c/index";
</script>

<style scoped></style>
