<template>
	<header class="header web-color-default">
		<pageLogo class="logo"></pageLogo>
		<pageNav :dark="store.isDark ? '' : undefined"></pageNav>
	</header>
</template>

<script setup lang="ts">
import pageNav from "../pageNav/pageNav.vue";
import pageLogo from "../logo/logo.vue";
import { useStore } from "@/stores/index";

const store = useStore();
</script>

<style scoped>
.header {
	display: flex;
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	height: 36px;
	transition: background-color 0.5s;
}

.logo {
	width: calc((100% - 1000px) / 2);
	min-width: 80px;
}
</style>
