<template>
	<section>
		<div class="item">
			<MyCache></MyCache>
		</div>
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="item">
			<label>
				<span class="me-2"
					><namiIcon icon="mdiThemeLightDark"></namiIcon>{{ t("pages.setting.toggleTheme") }}</span
				>
				<NSwitch v-model:value="store.isDark">
					<template #checked> {{ t("pages.setting.darkTheme") }} </template>
					<template #unchecked> {{ t("pages.setting.lightTheme") }} </template>
				</NSwitch>
			</label>
		</div>
		<div class="item">
			<label>
				<span class="me-2"
					><namiIcon icon="mdiTranslate"></namiIcon>{{ t("pages.setting.langTranslate") }}</span
				>
				<NSwitch v-model:value="i18nStore.lang" checked-value="ja" unchecked-value="zh">
					<template #checked> {{ t("pages.setting.langJa") }} </template>
					<template #unchecked> {{ t("pages.setting.langZh") }} </template>
				</NSwitch>
			</label>
		</div>
		<div class="item">
			<label>
				<span class="me-2"
					><namiIcon icon="mdiAnimationPlayOutline"></namiIcon>{{ t("pages.setting.animeLess") }}</span
				>
				<NSwitch v-model:value="store.animeLess">
					<template #checked> {{ t("pages.setting.animeLessChecked") }} </template>
					<template #unchecked> {{ t("pages.setting.animeLessUnchecked") }} </template>
				</NSwitch>
			</label>
		</div>
		<div class="item">
			<label>
				<span>{{ t("pages.setting.inlineSizePercentage") }}</span>
				<NSlider v-model:value="store.pageConfig.inlineSize.percentage" :min="0" :max="1" :step="0.01" />
			</label>
			<label>
				<span>{{ t("pages.setting.inlineSizeMinPx") }}</span>
				<NInputNumber v-model:value="store.pageConfig.inlineSize.minPx" size="small" :min="300" />
			</label>
		</div>
		<namiRoughLine class="my-2"></namiRoughLine>
		<MyChangeBG />
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="item">
			<label>
				<span class="me-2">{{ t("pages.setting.contentTip") }}</span>
				<n-switch v-model:value="store.pageConfig.showContentTip" />
			</label>
		</div>
		<div class="item">
			<label>
				<span class="me-2">{{ t("pages.setting.smallPageContentTip") }}</span>
				<n-switch v-model:value="store.pageConfig.showContentTipOfSmallScreen" />
			</label>
		</div>
		<div class="item">
			<label>
				<span class="me-2">{{ t("pages.setting.live2d") }}</span>
				<n-switch v-model:value="store.pageConfig.showHomeLive2d" />
			</label>
		</div>
		<div class="item">
			<label>
				<span class="me-2">{{ t("pages.setting.homeMusicController") }}</span>
				<n-switch v-model:value="store.pageConfig.showHomeMusicController" />
			</label>
		</div>
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="item" v-if="!store.isSmallScreen">
			<label>
				<span class="me-2">{{ t("pages.setting.rightPiano") }}</span>
				<n-switch v-model:value="store.pageConfig.rightPiano">
					<template #checked> {{ t("pages.setting.rightPianoChecked") }} </template>
					<template #unchecked> {{ t("pages.setting.rightPianoUnchecked") }} </template>
				</n-switch>
			</label>
		</div>
		<div class="item" v-if="!store.isSmallScreen">
			<label>
				<span class="me-2">{{ t("pages.setting.topPiano") }}</span>
				<n-switch v-model:value="store.pageConfig.topPiano">
					<template #checked> {{ t("pages.setting.topPianoChecked") }} </template>
					<template #unchecked> {{ t("pages.setting.topPianoUnchecked") }} </template>
				</n-switch>
			</label>
		</div>
		<div class="item" v-if="!store.isSmallScreen">
			<label>
				<span class="me-2">{{ t("pages.setting.autoPlayPiano") }}</span>
				<NButton text color="#8bcecb" @click="play">小星星</NButton>
			</label>
		</div>
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="item">
			<label>
				<span class="me-2">{{ t("pages.setting.mouseSnow") }}</span>
				<n-switch v-model:value="store.pageConfig.mouseSnow" />
			</label>
		</div>
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="item">
			<div>
				<span class="me-2">{{ t("pages.setting.toggleColor") }}</span>
				<NButton class="ms-8" text color="#8bcecb" @click="store.resetDefaultTheme">{{
					t("pages.setting.toDefaultColor")
				}}</NButton>
			</div>
			<div>
				<NColorPicker
					v-for="(_, i) in 8"
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
import namiNav from "@/views/home/components/nav.vue";
import { inject } from "vue";
import MyChangeBG from "./components/bg.vue";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";
import { useI18n } from "vue-i18n";
import { NSwitch, NColorPicker, NButton, NSlider, NInputNumber } from "naive-ui";
import MyCache from "./components/cache.vue";

const { t } = useI18n();
const store = useStore();
const i18nStore = useI18nStore();

const namiNavRef = inject<typeof namiNav>("namiNavRef");

function play() {
	namiNavRef?.value.autoPlayPiano("1155665-4433221-5544332-5544332-1155665-4433221", 120);
}
</script>

<style scoped>
.item {
	margin-block-end: 8px;
}
</style>
