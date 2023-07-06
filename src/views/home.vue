<template>
	<xtt-web-bg src="/images/bg.jpg"></xtt-web-bg>
	<kanbanarea></kanbanarea>

	<RouterView />
</template>

<script setup>
import { ref } from "vue";
import kanbanarea from "../components/live2d/kanbanarea.vue";
</script>

<style></style>
