<script setup lang="ts">
import { watch } from "vue";
import MouseSnow from "mousesnow";
import "@/function/joke";
import "@/function/visibility";
import { initWebBGUrl } from "@/utils/webBG";
import { useStore } from "@/stores/index";
import { config } from "@c/index";

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

watch(
	() => store.currentTheme,
	() => {
		config.defaultColor.value = store.currentTheme;
	},
	{ immediate: true }
);
</script>

<template>
	<RouterView />
</template>

<style></style>
