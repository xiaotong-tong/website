<template>
	<xtt-web-bg
		src="https://image.xtt.moe/images/2023/07/18/b885910a19d8bc3eed2c5e98828ba61ea8d34544.jpg"
		:mask="store.isDark ? '' : undefined"
	></xtt-web-bg>
	<kanbanarea v-show="live2dShowed">
		<template #icon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiHomeOutline"
				data-xtt-tooltip="首页"
				@click="router.push('/')"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiEmailOpenHeartOutline"
				data-xtt-tooltip="私密服务"
				@click="verifyLogin"
			></namiIcon>
			<namiIcon
				v-if="store.loginUid"
				:ref="appendIcon"
				class="icon"
				icon="mdiBookEditOutline"
				data-xtt-tooltip="新增 blog"
				@click="router.push('/editor/add')"
			></namiIcon>
			<namiIcon
				v-if="store.loginUid"
				:ref="appendIcon"
				class="icon"
				icon="mdiPenPlus"
				data-xtt-tooltip="新增日语单词"
				@click="router.push('/jp/words/add')"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiRobotConfusedOutline"
				data-xtt-tooltip="关于"
				@click="router.push('/about')"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiThemeLightDark"
				data-xtt-tooltip="切换主题"
				@click="store.isDark = !store.isDark"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiClose"
				data-xtt-tooltip="隐藏 live2d"
				@click="live2dShowed = false"
			></namiIcon>
			<xtt-tooltip ref="iconTooltip">default value</xtt-tooltip>
		</template>
	</kanbanarea>

	<namiHeader></namiHeader>

	<main class="main">
		<RouterView />
	</main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import kanbanarea from "../components/live2d/kanbanarea.vue";
import namiHeader from "../components/page/header/header.vue";
import { verifyMasterUid } from "../api/blog/verify";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index";

const store = useStore();
const router = useRouter();

const live2dShowed = ref(true);

const iconTooltip: Ref<xttTooltipElement | null> = ref(null);
const icons: HTMLElement[] = [];

const appendIcon = (icon: any) => {
	icons.push(icon?.$el);
};

onMounted(() => {
	iconTooltip.value?.initTrigger(icons);

	window.addEventListener("resize", () => {
		if (window.innerWidth < 768) {
			live2dShowed.value = false;
		} else {
			live2dShowed.value = true;
		}
	});
});

const verifyLogin = async () => {
	const pw = window.prompt("请输入主人口令");
	if (pw) {
		const { data } = await verifyMasterUid(pw);
		if (data.value === "success") {
			store.loginUid = pw;
			localStorage.setItem("loginUid", pw);
		} else {
			alert("口令错误");
		}
	}
};
</script>

<style scoped>
.main {
	width: min(1000px, 100%);
	margin: 0 auto;
}

.icon {
	cursor: pointer;
}
.theme-dark .icon {
	color: #fff;
}
</style>
