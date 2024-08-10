<template>
	<namiWebBG :src="bgUrl" :mask="store.isDark"></namiWebBG>

	<namiHeader v-if="!store.isSmallScreen"></namiHeader>
	<namiMHeader v-else></namiMHeader>

	<namiRoughCard
		is="main"
		class="main web-color-default"
		:color="store.currentTheme"
		:style="{
			width: `min(${store.pageConfig.inlineSize.minPx}px, ${
				store.pageConfig.inlineSize.percentage * 100
			}%)`
		}"
	>
		<section ref="contentRef" class="content">
			<RouterView />
			<namiTextAutoScroll v-if="store.pageConfig.showContentTip" class="tip" />
			<namiCIcon
				:style="{
					position: 'absolute',
					insetBlockStart: '80px',
					insetInlineEnd: '64px',
					zIndex: -1,
					opacity: 0.6
				}"
				:size="64"
				icon="heart"
			></namiCIcon>
			<namiCIcon
				:style="{
					position: 'absolute',
					insetBlockEnd: '64px',
					insetInlineStart: '64px',
					zIndex: -1,
					opacity: 0.6
				}"
				:size="64"
				icon="heart"
			></namiCIcon>
		</section>
		<nav class="nav"><namiNav ref="namiNavRef"></namiNav></nav>
	</namiRoughCard>

	<namiFooter></namiFooter>

	<kanbanarea
		v-if="store.pageConfig.showHomeLive2d && live2dShowed && !store.isSmallScreen"
		ref="live2d"
		:style="{
			bottom: store.pageConfig.showHomeMusicController ? '65px' : '8px'
		}"
	>
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

	<myAplayer :rectX="contentX" :rectY="contentY"></myAplayer>

	<myScrollTop :scrollY="y" @click="() => (y = 0)" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, provide } from "vue";
import kanbanarea from "@/components/live2d/kanbanarea.vue";
import namiHeader from "@/components/page/header/header.vue";
import namiMHeader from "@/components/page/header/m-header.vue";
import namiFooter from "@/components/page/footer/footer.vue";
import namiNav from "./components/nav.vue";
import namiTextAutoScroll from "@/components/textAutoScroll/index.vue";
import myScrollTop from "./components/scroll.vue";
import myAplayer from "./components/aplayer.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/stores/index";
import { useContentRefStore } from "@/stores/contentRef";
import type { XttTooltipElement } from "xtt-ui/index.d.ts";
import { bgUrl } from "@/utils/webBG";
import { useElementBounding, useScroll } from "@vueuse/core";

const store = useStore();
const contentStore = useContentRefStore();
const router = useRouter();
const route = useRoute();

const contentRef = ref<HTMLElement | null>(null);
const { x: contentX, y: contentY } = useElementBounding(contentRef);
contentStore.bind(contentRef);

const { y } = useScroll(contentRef, { behavior: "smooth" });

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

function checkOverflow() {
	if (contentRef.value) {
		contentRef.value.classList.remove("scroll-overflow-y");
		// 获取第一个子元素
		const scrollEl = contentRef.value.firstElementChild!;
		const rect = scrollEl.getBoundingClientRect();

		if (rect.height > contentStore.height.value) {
			contentRef.value.classList.add("scroll-overflow-y");
		}
	}
}

const namiNavRef = ref<typeof namiNav>();

provide("namiNavRef", namiNavRef);

onMounted(() => {
	iconTooltip.value?.initTrigger(icons);
	checkOverflow();
});

// 监听路由变化
watch(
	() => route.fullPath,
	() => {
		nextTick(() => {
			checkOverflow();
		});
	}
);
</script>

<style scoped>
.main {
	height: calc(100vh - 114px);
	margin: 8px auto;
	border: 1px solid transparent;
	display: flex;
}
.small-screen .main {
	height: auto;
}

.content {
	position: relative;
	flex: 1;
	overflow: auto;
	height: 100%;
	box-sizing: border-box;
	padding: 8px 8px 24px;
}

.nav {
	flex: 0 0 200px;
	position: sticky;
	top: 48px;
}

.tip {
	position: fixed;
	inset-block-end: 1px;
	inset-inline-start: 8px;
	inset-inline-end: 208px;
	height: 24px;
	padding-inline-start: 8px;
	box-sizing: border-box;
	margin-block-end: 4px;
	background-color: #ffffffdd;
}
.content.scroll-overflow-y .tip {
	display: none;
}
.small-screen .tip {
	inset-inline-end: 8px;
}

.icon {
	cursor: pointer;
}
.theme-dark .icon {
	color: #fff;
}

.small-screen .content {
	min-block-size: calc(100vh - 130px);
}
.small-screen .nav {
	display: none;
}
</style>
