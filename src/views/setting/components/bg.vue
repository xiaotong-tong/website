<template>
	<div>
		<h3>{{ t("pages.setting.bgTitle") }}</h3>
		<div>{{ t("pages.setting.curBg") }}:</div>
		<div class="flex justify-around">
			<div class="flex flex-col items-center">
				<div>{{ t("pages.setting.lightTheme") }}</div>
				<img
					class="h-[100px] select-none"
					draggable="false"
					:src="lightBgUrl"
					alt="background image"
				/>
				<div class="mt-2">
					<NamiButton @click="open">{{ t("pages.setting.customBg") }}</NamiButton>
					<NamiButton style="margin-inline-start: 8px" @click="resetBG('light')">{{
						t("pages.setting.defaultBg")
					}}</NamiButton>
				</div>
			</div>
			<div class="flex flex-col items-center">
				<div>{{ t("pages.setting.darkTheme") }}</div>
				<img
					class="h-[100px] select-none"
					draggable="false"
					:src="darkBgUrl"
					alt="background image"
				/>
				<div class="mt-2">
					<NamiButton @click="openDark">{{ t("pages.setting.customBg") }}</NamiButton>
					<NamiButton style="margin-inline-start: 8px" @click="resetBG('dark')">{{
						t("pages.setting.defaultBg")
					}}</NamiButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { setWebBGUrl, lightBgUrl, darkBgUrl } from "@/utils/webBG";
import { useFileDialog } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { NamiButton } from "@c/index";

const { t } = useI18n();

const { files, open, reset } = useFileDialog();
const { files: darkFiles, open: openDark, reset: resetDark } = useFileDialog();

watch(files, (val) => {
	if (val?.length) {
		setWebBGUrl(val[0], "light");
	}
});
watch(darkFiles, (val) => {
	if (val?.length) {
		setWebBGUrl(val[0], "dark");
	}
});

const resetBG = async (mode: "light" | "dark") => {
	await setWebBGUrl(null, mode);
	if (mode === "light") {
		reset();
	} else {
		resetDark();
	}
};
</script>

<style scoped></style>
