<script setup lang="ts">
import { watch } from "vue";
import MouseSnow from "mousesnow";
import "@/utils/joke";
import { initWebBGUrl } from "@/utils/webBG";
import { useStore } from "@/stores/index";

const store = useStore();

const ms = new MouseSnow({
	isDisabled: !store.pageConfig.mouseSnow
});
watch(
	() => store.pageConfig.mouseSnow,
	(v) => {
		ms.options.isDisabled = !v;
	}
);

initWebBGUrl();
</script>

<template>
	<RouterView />
</template>

<style></style>
