<template>
	<namiWebBG :src="bgUrl" :mask="store.isDark"></namiWebBG>

	<namiHeader v-if="!store.isSmallScreen"></namiHeader>
	<namiMHeader v-else></namiMHeader>

	<FieldsetCard
		class="h-auto min-h-[calc(100vh-114px)] md:h-[calc(100vh-114px)] my-2 mx-auto p-0"
		:style="{
			width: `min(${store.pageConfig.inlineSize.minPx}px, ${store.pageConfig.inlineSize.percentage * 100}%)`
		}"
	>
		<main class="main h-full web-color-default">
			<section ref="contentRef" class="content p-2 box-border overflow-auto relative">
				<RouterView />
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
			<nav class="nav hidden md:block">
				<namiNav ref="namiNavRef"></namiNav>
			</nav>
			<namiTextAutoScroll class="tip pl-2" v-if="tipIsShow" />
		</main>
	</FieldsetCard>

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

	<Suspense>
		<template #default>
			<myVisit />
		</template>
	</Suspense>
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
import myVisit from "./home/components/visit.vue";
import { refreshUserInfo } from "@/api/blog/verify";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index";
import { useUserInfoStore } from "@/stores/user";
import { useContentRefStore } from "@/stores/contentRef";
import { bgUrl } from "@/utils/webBG";
import { useElementBounding, useScroll } from "@vueuse/core";
import { Icon, useMessage, FieldsetCard } from "@c/index";

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
	--nav-width: 200px;
	--tip-height: 1.5em;

	display: grid;
	grid-template:
		"main nav" 1fr
		"tip nav" var(--tip-height)
		/ 1fr var(--nav-width);

	.content {
		grid-area: main;
	}
	.nav {
		grid-area: nav;
	}
	.tip {
		grid-area: tip;
	}
}

@media (max-width: 1024px) {
	.main {
		--nav-width: 120px;
	}
}
@media (max-width: 768px) {
	.main {
		--nav-width: 0px;
		--tip-height: 0px;
	}
}

.icon {
	cursor: pointer;
}
.theme-dark .icon {
	color: #fff;
}
</style>
