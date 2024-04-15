<template>
	<xtt-web-bg
		src="https://image.xtt.moe/images/bg.webp"
		:mask="store.isDark ? '' : undefined"
	></xtt-web-bg>

	<namiHeader v-if="!store.isSmallScreen"></namiHeader>
	<namiMHeader v-else></namiMHeader>

	<main class="main web-color-default">
		<section class="content">
			<RouterView />
		</section>
		<section class="nav"><namiNav></namiNav></section>
	</main>

	<namiFooter></namiFooter>

	<kanbanarea v-if="live2dShowed && !store.isSmallScreen" ref="live2d">
		<template #icon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiHomeOutline"
				data-xtt-tooltip="首页"
				@click="router.push('/')"
				@mouseenter="live2d?.showChatBox('要回到首页吗？', 3000)"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				:icon="chatInputBoxShowed ? 'mdiChatRemoveOutline' : 'mdiChatOutline'"
				:data-xtt-tooltip="chatInputBoxShowed ? '关闭聊天框' : '打开聊天框'"
				@click="chatInputBoxClickEvent"
				@mouseenter="live2d?.showChatBox('想聊聊天吗？', 3000)"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiEmailOpenHeartOutline"
				data-xtt-tooltip="私密服务"
				@click="verifyLogin"
				@mouseenter="live2d?.showChatBox('要确认身份吗？', 3000)"
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
				@mouseenter="live2d?.showChatBox('点击可以切换深色或浅色模式哦~', 3000)"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiClose"
				data-xtt-tooltip="隐藏 live2d"
				@click="live2dShowed = false"
				@mouseenter="live2d?.showChatBox('还需要我帮忙吗？', 3000)"
			></namiIcon>
			<xtt-tooltip ref="iconTooltip">default value</xtt-tooltip>
		</template>
	</kanbanarea>

	<namiAplayer></namiAplayer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import kanbanarea from "@/components/live2d/kanbanarea.vue";
import namiAplayer from "@/components/aplayer/aplayer.vue";
import namiHeader from "@/components/page/header/header.vue";
import namiMHeader from "@/components/page/header/m-header.vue";
import namiFooter from "@/components/page/footer/footer.vue";
import namiNav from "./components/nav.vue";
import { verifyMasterUid } from "@/api/blog/verify";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index";
import type { XttTooltipElement } from "xtt-ui/index.d.ts";

const store = useStore();
const router = useRouter();

const live2d = ref<InstanceType<typeof kanbanarea>>();
const live2dShowed = ref(true);

const iconTooltip = ref<XttTooltipElement | null>(null);
const icons: HTMLElement[] = [];

const chatInputBoxShowed = ref(false);
const chatInputBoxClickEvent = () => {
	chatInputBoxShowed.value = !chatInputBoxShowed.value;

	if (chatInputBoxShowed.value) {
		live2d.value?.chatInputShow();
	} else {
		live2d.value?.chatInputHide();
	}
};

const appendIcon = (icon: any) => {
	icons.push(icon?.$el);
};

onMounted(() => {
	iconTooltip.value?.initTrigger(icons);
});

const verifyLogin = async () => {
	const pw = window.prompt("请输入主人口令");
	if (pw) {
		const data = await verifyMasterUid(pw);
		if (data === "验证成功") {
			store.loginUid = pw;
			localStorage.setItem("loginUid", pw);
		} else {
			alert("口令错误");
		}
	}
};

interface ColorMap {
	"/": string;
	"/blog": string;
	"/music": string;
	"/photos": string;
	"/tools": string;
	"/about": string;
	"/setting": string;
}

const colorMap = {
	"/": "#f1755966",
	"/blog": "#f2b25b66",
	"/music": "#f0dc5966",
	"/photos": "#bbf15b66",
	"/tools": "#59f1b766",
	"/about": "#59e1f166",
	"/setting": "#597ff166"
};

router.afterEach((to) => {
	let color = colorMap[to.path as keyof ColorMap];

	if (to.path === "/") {
		if (to.hash === "#setting") {
			color = colorMap["/setting"];
		} else if (to.hash === "#about") {
			color = colorMap["/about"];
		} else {
			color = colorMap["/"];
		}
	}
	if (color) {
		document.documentElement.style.setProperty("--color-primary", color);
	}
});
</script>

<style scoped>
.main {
	width: min(1200px, 90%);
	min-height: calc(100vh - 114px);
	margin: 8px auto;
	border: 1px solid transparent;
	display: flex;
	position: relative;
	border: 3px solid var(--color-primary);
}

.content {
	flex: 1;
}
.nav {
	flex: 0 0 200px;
	height: calc(100vh - 114px);
	position: sticky;
	top: 48px;
}

.icon {
	cursor: pointer;
}
.theme-dark .icon {
	color: #fff;
}
</style>
