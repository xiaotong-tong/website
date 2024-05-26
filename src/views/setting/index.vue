<template>
	<section class="container">
		<div class="item">
			<xtt-button @click="store.isDark = !store.isDark">
				<namiIcon icon="mdiThemeLightDark"></namiIcon>
				{{ store.isDark ? t("main.nav.toLightMode") : t("main.nav.toDarkMode") }}
			</xtt-button>
		</div>
		<div class="item">
			<xtt-button @click="i18nStore.lang = i18nStore.lang === 'zh' ? 'ja' : 'zh'">
				<namiIcon icon="mdiTranslate"></namiIcon>
				{{ i18nStore.lang === "zh" ? t("main.nav.toJaLang") : t("main.nav.toZhLang") }}
			</xtt-button>
		</div>
		<MyChangeBG />
	</section>
</template>

<script setup lang="ts">
import MyChangeBG from "./components/bg.vue";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const i18nStore = useI18nStore();
</script>

<style scoped>
.container {
	margin-inline: 8px;
}
.item {
	margin-block-end: 8px;
}
</style>
