<script setup lang="ts">
import MouseSnow from "mousesnow";
import "@/utils/joke";
import { initWebBGUrl } from "@/utils/webBG";

new MouseSnow({});

initWebBGUrl();
</script>

<template>
	<RouterView />
</template>

<style></style>
