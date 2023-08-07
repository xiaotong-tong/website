<template>
	<xtt-icon ref="icon" class="icon">
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
	mdiGithub
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
		| "mdiGithub";
}

const props = withDefaults(defineProps<Props>(), {
	icon: "mdiPower"
});

const reflectIcon = (icon: string) => {
	switch (icon) {
		case "mdiHomeOutline":
			return mdiHomeOutline;
		case "mdiPower":
			return mdiPower;
		case "mdiLogin":
			return mdiLogin;
		case "mdiEmailOpenHeartOutline":
			return mdiEmailOpenHeartOutline;
		case "mdiBookEditOutline":
			return mdiBookEditOutline;
		case "mdiClose":
			return mdiClose;
		case "mdiRobotConfusedOutline":
			return mdiRobotConfusedOutline;
		case "mdiVolumeHigh":
			return mdiVolumeHigh;
		case "mdiMusicNote":
			return mdiMusicNote;
		case "mdiThemeLightDark":
			return mdiThemeLightDark;
		case "mdiPenPlus":
			return mdiPenPlus;
		case "mdiGithub":
			return mdiGithub;
		default:
			return mdiPower;
	}
};
</script>

<style></style>
