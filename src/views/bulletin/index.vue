<template>
	<namiHeader v-if="!store.isSmallScreen"></namiHeader>
	<namiMHeader v-else></namiMHeader>

	<section class="page">
		<MyBulletinBG01></MyBulletinBG01>
		<MyLineCardEditorArea></MyLineCardEditorArea>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import namiHeader from "@/components/page/header/header.vue";
import namiMHeader from "@/components/page/header/m-header.vue";
import { useStore } from "@/stores/index";
import MyLineCardEditorArea from "./modules/lineCardEditorArea.vue";
import MyBulletinBG01 from "./modules/bulletinBG01.vue";

const store = useStore();
</script>

<style scoped>
.page {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
