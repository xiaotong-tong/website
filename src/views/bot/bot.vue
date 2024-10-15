<template>
	<markdown :content="botContent"></markdown>
</template>

<script setup lang="ts">
import botContent from "./bot.md";
import { markdown } from "@c/index";
</script>

<style scoped></style>
