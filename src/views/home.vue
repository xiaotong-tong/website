<template>
	<namiWebBG :src="bgUrl" :mask="store.isDark"></namiWebBG>

	<namiHeader v-if="!store.isSmallScreen"></namiHeader>
	<namiMHeader v-else></namiMHeader>

	<namiRoughCard
		is="main"
		class="main web-color-default"
		:color="store.currentTheme"
		:useBorder="store.isSmallScreen"
		:style="{
			width: `min(${store.pageConfig.inlineSize.minPx}px, ${store.pageConfig.inlineSize.percentage * 100}%)`
		}"
	>
		<section
			ref="contentRef"
			class="content"
			:class="{
				'tip-hidden': !tipIsShow
			}"
		>
			<RouterView />
			<namiTextAutoScroll v-if="tipIsShow" />
			<Icon
				:style="{
					position: 'fixed',
					insetBlockStart: '80px',
					insetInlineEnd: store.isSmallScreen ? '64px' : '264px',
					zIndex: -1,
					opacity: 0.6
				}"
				:size="64"
				icon="heart"
			></Icon>
			<Icon
				:style="{
					position: 'fixed',
					insetBlockEnd: '64px',
					insetInlineStart: '64px',
					zIndex: -1,
					opacity: 0.6
				}"
				:size="64"
				icon="heart"
			></Icon>
		</section>
		<nav class="nav">
			<namiNav ref="namiNavRef"></namiNav>
		</nav>
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
				aria-label="首页"
				@click="router.push('/')"
				@mouseenter="live2d?.showChatBox('要回到首页吗？', 3000)"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				:icon="chatInputBoxShowed ? 'mdiChatRemoveOutline' : 'mdiChatOutline'"
				:aria-label="chatInputBoxShowed ? '关闭聊天框' : '打开聊天框'"
				@click="chatInputBoxClickEvent"
				@mouseenter="live2d?.showChatBox('想聊聊天吗？', 3000)"
			></namiIcon>
			<namiIcon
				v-if="userInfoStore.userInfo.id"
				:ref="appendIcon"
				class="icon"
				icon="mdiBookEditOutline"
				aria-label="新增 blog"
				@click="router.push('/editor/add')"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiThemeLightDark"
				aria-label="切换主题"
				@click="store.isDark = !store.isDark"
				@mouseenter="live2d?.showChatBox('点击可以切换深色或浅色模式哦~', 3000)"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiClose"
				aria-label="隐藏 live2d"
				@click="live2dShowed = false"
				@mouseenter="live2d?.showChatBox('还需要我帮忙吗？', 3000)"
			></namiIcon>
		</template>
	</kanbanarea>

	<myAplayer v-if="aplayerShowed" :rectX="contentX" :rectY="contentY"></myAplayer>

	<myScrollTop :scrollY="y" @click="() => (y = 0)" />
</template>

<script setup lang="ts">
import { ref, provide, computed } from "vue";
import kanbanarea from "@/components/live2d/kanbanarea.vue";
import namiHeader from "@/components/page/header/header.vue";
import namiMHeader from "@/components/page/header/m-header.vue";
import namiFooter from "@/components/page/footer/footer.vue";
import namiNav from "./home/components/nav.vue";
import namiTextAutoScroll from "@/components/textAutoScroll/index.vue";
import myScrollTop from "./home/components/scroll.vue";
import myAplayer from "./home/components/aplayer.vue";
import { refreshUserInfo } from "@/api/blog/verify";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index";
import { useUserInfoStore } from "@/stores/user";
import { useContentRefStore } from "@/stores/contentRef";
import { bgUrl } from "@/utils/webBG";
import { useElementBounding, useScroll } from "@vueuse/core";
import { Icon, useMessage } from "@c/index";

const store = useStore();
const contentStore = useContentRefStore();
const userInfoStore = useUserInfoStore();
const router = useRouter();
const message = useMessage();

const contentRef = ref<HTMLElement | null>(null);
const { x: contentX, y: contentY } = useElementBounding(contentRef);
contentStore.bind(contentRef);

const { y } = useScroll(contentRef, { behavior: "smooth" });

const live2d = ref<InstanceType<typeof kanbanarea>>();
const live2dShowed = ref(false);
const aplayerShowed = ref(false);
// Aplayer 和 live2d 相关的文件过大，在首页加载会影响首页加载速度，所以在首页加载完成 10 秒后再加载 live2d 相关文件
setTimeout(() => {
	live2dShowed.value = true;
	aplayerShowed.value = true;
}, 1000 * 10);

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

const namiNavRef = ref<typeof namiNav>();

provide("namiNavRef", namiNavRef);

const tipIsShow = computed(() => {
	return store.isSmallScreen
		? store.pageConfig.showContentTip && store.pageConfig.showContentTipOfSmallScreen
		: store.pageConfig.showContentTip;
});

// 刷新用户信息
refreshUserInfo().then((res) => {
	if (res.code === -1) {
		return;
	}
	if (res.code !== 200) {
		userInfoStore.userInfo = {};

		if (res.code === 3) {
			message.error(res.msg);
		}
	}
});
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

	&.tip-hidden {
		padding-block-end: 8px;
	}
}

.nav {
	flex: 0 0 200px;
	position: sticky;
	top: 48px;
}
@media (max-width: 1024px) {
	.nav {
		flex: 0 0 120px;
	}
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
