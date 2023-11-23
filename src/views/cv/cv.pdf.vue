<template>
	<iframe :src="pdfUrl"></iframe>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/stores/index";

const store = useStore();

const pdfUrl = ref("https://file.xtt.moe/files/cv/noPhoneCV.pdf");

if (store.loginUid) {
	pdfUrl.value = "https://file.xtt.moe/files/cv/cv.pdf";
}
</script>

<style scoped>
iframe {
	width: 100%;
	height: calc(100vh - 112px);
}
</style>
