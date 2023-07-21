<template>
	<xtt-icon ref="icon" class="icon">
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path :d="reflectIcon(props.icon)"></path>
		</svg>
	</xtt-icon>
</template>

<script setup>
import { ref } from "vue";
import {
	mdiHomeOutline,
	mdiPower,
	mdiLogin,
	mdiEmailOpenHeartOutline,
	mdiBookEditOutline,
	mdiClose,
	mdiRobotConfusedOutline
} from "@mdi/js";

const props = defineProps({
	icon: {
		type: String,
		default: "mdiPower"
	}
});

const reflectIcon = (icon) => {
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
		default:
			return mdiPower;
	}
};
</script>

<style></style>
