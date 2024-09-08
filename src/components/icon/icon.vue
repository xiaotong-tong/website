<template>
	<xtt-icon class="icon">
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path :d="reflectIcon(props.icon)"></path>
		</svg>
	</xtt-icon>
</template>

<script setup lang="ts">
import {
	mdiHomeOutline,
	mdiPower,
	mdiLogin,
	mdiEmailOpenHeartOutline,
	mdiBookEditOutline,
	mdiClose,
	mdiRobotConfusedOutline,
	mdiVolumeHigh,
	mdiMusicNote,
	mdiThemeLightDark,
	mdiPenPlus,
	mdiGithub,
	mdiMapSearchOutline,
	mdiReplyOutline,
	mdiArrowLeft,
	mdiFormatFont,
	mdiChatOutline,
	mdiChatRemoveOutline,
	mdiChevronDown,
	mdiTranslate,
	mdiCat,
	mdiPaw,
	mdiMenu,
	mdiContentCopy,
	mdiAnimationPlayOutline,
	mdiBookOpenBlankVariantOutline
} from "@mdi/js";

interface Props {
	icon:
		| "mdiHomeOutline"
		| "mdiPower"
		| "mdiLogin"
		| "mdiEmailOpenHeartOutline"
		| "mdiBookEditOutline"
		| "mdiClose"
		| "mdiRobotConfusedOutline"
		| "mdiVolumeHigh"
		| "mdiMusicNote"
		| "mdiThemeLightDark"
		| "mdiPenPlus"
		| "mdiGithub"
		| "mdiMapSearchOutline"
		| "mdiReplyOutline"
		| "mdiArrowLeft"
		| "mdiFormatFont"
		| "mdiChatOutline"
		| "mdiChatRemoveOutline"
		| "mdiChevronDown"
		| "mdiTranslate"
		| "mdiCat"
		| "mdiPaw"
		| "mdiMenu"
		| "mdiContentCopy"
		| "mdiAnimationPlayOutline"
		| "mdiBookOpenBlankVariantOutline";
}

const props = withDefaults(defineProps<Props>(), {
	icon: "mdiPower"
});

const reflectIcon = (icon: Props["icon"]) => {
	const mdiMap = {
		mdiHomeOutline,
		mdiPower,
		mdiLogin,
		mdiEmailOpenHeartOutline,
		mdiBookEditOutline,
		mdiClose,
		mdiRobotConfusedOutline,
		mdiVolumeHigh,
		mdiMusicNote,
		mdiThemeLightDark,
		mdiPenPlus,
		mdiGithub,
		mdiMapSearchOutline,
		mdiReplyOutline,
		mdiArrowLeft,
		mdiFormatFont,
		mdiChatOutline,
		mdiChatRemoveOutline,
		mdiChevronDown,
		mdiTranslate,
		mdiCat,
		mdiPaw,
		mdiMenu,
		mdiContentCopy,
		mdiAnimationPlayOutline,
		mdiBookOpenBlankVariantOutline
	};

	return mdiMap[icon];
};
</script>

<style></style>
