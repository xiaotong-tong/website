<template>
	<header class="header">
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
.header:hover {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
}

.theme-dark .header:hover {
	background-color: #00000020;
}

.small-screen .header {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
}
.small-screen.theme-dark .header {
	background-color: #00000020;
}

.logo {
	width: calc((100% - 1000px) / 2);
	min-width: 80px;
}
</style>
