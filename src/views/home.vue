<template>
	<xtt-web-bg
		src="http://image.xtt.moe/images/2023/07/18/b885910a19d8bc3eed2c5e98828ba61ea8d34544.jpg"
	></xtt-web-bg>
	<kanbanarea></kanbanarea>

	<main class="main">
		<RouterView />
	</main>
</template>

<script setup>
import { ref } from "vue";
import kanbanarea from "../components/live2d/kanbanarea.vue";
</script>

<style scoped>
.main {
	width: min(1000px, 100%);
	margin: 0 auto;
}
</style>
