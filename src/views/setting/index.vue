<template>
	<section class="container">
		<div class="item">
			<label>
				<span><namiIcon icon="mdiThemeLightDark"></namiIcon>切换模式：</span>
				<n-switch v-model:value="store.isDark">
					<template #checked> {{ t("main.nav.toLightMode") }} </template>
					<template #unchecked> {{ t("main.nav.toDarkMode") }} </template>
				</n-switch>
			</label>
		</div>
		<div class="item">
			<label>
				<span><namiIcon icon="mdiTranslate"></namiIcon>切换模式：</span>
				<n-switch v-model:value="i18nStore.lang" checked-value="ja" unchecked-value="zh">
					<template #checked> {{ t("main.nav.toZhLang") }} </template>
					<template #unchecked> {{ t("main.nav.toJaLang") }} </template>
				</n-switch>
			</label>
		</div>
		<namiRoughLine class="hr" :color="store.currentTheme"></namiRoughLine>
		<MyChangeBG />
		<namiRoughLine class="hr" :color="store.currentTheme"></namiRoughLine>
		<div class="item">
			<label>
				<span>是否显示左下角内容提示：</span>
				<n-switch v-model:value="store.pageConfig.showContentTip" />
			</label>
		</div>
		<namiRoughLine class="hr" :color="store.currentTheme"></namiRoughLine>
		<div class="item">
			<div>
				切换颜色
				<xtt-button style="margin-inline-start: 32px" @click="store.resetDefaultTheme"
					>恢复默认颜色</xtt-button
				>
			</div>
			<div>
				<NColorPicker
					v-for="(_, i) in 7"
					:key="i"
					:modes="['hex']"
					v-model:value="store.theme[i]"
					:onComplete="(v) => store.changeThemeOfList(i, v)"
				></NColorPicker>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MyChangeBG from "./components/bg.vue";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";
import { useI18n } from "vue-i18n";
import { NSwitch, NColorPicker } from "naive-ui";

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
.hr {
	margin-block: 8px;
}
</style>
