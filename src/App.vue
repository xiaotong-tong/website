<script setup lang="ts">
import { watch } from "vue";
import MouseSnow from "mousesnow";
import "@/function/joke";
import "@/function/visibility";
import { initWebBGUrl } from "@/utils/webBG";
import { useStore } from "@/stores/index";
import { useI18nStore } from "./stores/i18n";
import { config } from "@c/index";
import { useI18n } from "vue-i18n";

const store = useStore();
const i18nStore = useI18nStore();
const { t } = useI18n();

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
watch(
	() => store.isDark,
	(v) => {
		config.isDark.value = v;
	},
	{ immediate: true }
);
watch(
	() => i18nStore.lang,
	(v) => {
		config.lang.value = v;
	},
	{ immediate: true }
);

if (!ClipboardItem.supports) {
	alert(t("main.unSupport"));
}
</script>

<template>
	<RouterView />
</template>

<style></style>
