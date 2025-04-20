<template>
	<iframe :src="pdfUrl"></iframe>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/user";

const userInfoStore = useUserInfoStore();

const pdfUrl = ref("https://file.xtt.cool/files/cv/noPhoneCV.pdf");

if (userInfoStore.userInfo.id) {
	pdfUrl.value = "https://file.xtt.cool/files/cv/cv.pdf";
}
</script>

<style scoped>
iframe {
	width: 100%;
	height: calc(100vh - 112px);
}
</style>
