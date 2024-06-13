<template>
	<section class="container">
		<div class="item">
			<MyCache></MyCache>
		</div>
		<namiRoughLine class="hr" :color="store.currentTheme"></namiRoughLine>
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
		<div class="item">
			<label>
				<span>最大宽度占浏览器的百分比：</span>
				<NSlider
					v-model:value="store.pageConfig.inlineSize.percentage"
					:min="0"
					:max="1"
					:step="0.01"
				/>
			</label>
			<label>
				<span>最小像素宽度：</span>
				<NInputNumber
					v-model:value="store.pageConfig.inlineSize.minPx"
					size="small"
					:min="300"
				/>
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
		<div class="item">
			<label>
				<span>是否显示左下角 live2d：</span>
				<n-switch v-model:value="store.pageConfig.showHomeLive2d" />
			</label>
		</div>
		<div class="item">
			<label>
				<span>是否显示左下角音乐控制器：</span>
				<n-switch v-model:value="store.pageConfig.showHomeMusicController" />
			</label>
		</div>
		<namiRoughLine class="hr" :color="store.currentTheme"></namiRoughLine>
		<div class="item" v-if="!store.isSmallScreen">
			<label>
				<span>右侧导航栏键盘音：</span>
				<n-switch v-model:value="store.isPiano" />
			</label>
		</div>
		<div class="item" v-if="!store.isSmallScreen">
			<label>
				<span>自动播放右侧导航栏键盘音：</span>
				<NButton text color="#8bcecb" @click="play">小星星</NButton>
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
