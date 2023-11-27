<template>
	<header class="header web-color-default">
		<xtt-icon-button class="menu" @click="sidebarShowed = true"
			><nami-icon icon="mdiMenu"></nami-icon
		></xtt-icon-button>
		<h1 class="title">星川漣の家</h1>
	</header>

	<div class="sidebar" v-show="sidebarShowed" @click.self="sidebarShowed = false">
		<div class="main">
			<h2 class="side-title">星川漣</h2>
			<xtt-icon-button class="close" @click="sidebarShowed = false"
				><nami-icon icon="mdiClose"></nami-icon
			></xtt-icon-button>
			<div class="side-menus">
				<div class="side-menu-item-title">功能</div>
				<div class="side-menu-item">
					<xtt-button class="side-menu-item-unit" @click="store.isDark = !store.isDark">
						<namiIcon icon="mdiThemeLightDark"></namiIcon> 切换模式
					</xtt-button>

					<xtt-button
						class="side-menu-item-unit"
						@click="i18nStore.lang = i18nStore.lang === 'zh' ? 'ja' : 'zh'"
					>
						<namiIcon icon="mdiTranslate"></namiIcon> 切换语言 ->
						{{ i18nStore.lang === "zh" ? "日本語" : "中文" }}
					</xtt-button>
				</div>

				<div class="side-menu-item-title">关于</div>
				<div class="side-menu-item">
					<nami-link class="side-menu-item-unit" to="/about" inline-block>
						关于我
					</nami-link>

					<nami-link
						class="side-menu-item-unit"
						to="https://github.com/xiaotong-tong"
						target="_blank"
						inline-block
					>
						Github
					</nami-link>
				</div>

				<div class="side-menu-item-title">喵分享</div>
				<div class="side-menu-item">
					<nami-link class="side-menu-item-unit" to="/" inline-block> 首页 </nami-link>

					<nami-link class="side-menu-item-unit" to="/net" inline-block>
						网络互联
					</nami-link>

					<nami-link class="side-menu-item-unit" to="/lang" inline-block>
						语言学习
					</nami-link>

					<nami-link class="side-menu-item-unit" to="/note" inline-block>
						喵随笔
					</nami-link>

					<nami-link class="side-menu-item-unit" to="/star" inline-block>
						其它
					</nami-link>
				</div>

				<div class="side-menu-item-title">更多</div>
				<div class="side-menu-item">
					<nami-link class="side-menu-item-unit" to="/guestbook" inline-block>
						留言板
					</nami-link>

					<nami-link class="side-menu-item-unit" to="/music" inline-block>
						音乐
					</nami-link>

					<nami-link class="side-menu-item-unit" to="/link" inline-block>
						链接
					</nami-link>

					<nami-link class="side-menu-item-unit" to="/archives" inline-block>
						归档
					</nami-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";

const store = useStore();
const i18nStore = useI18nStore();
const router = useRouter();

const sidebarShowed = ref(false);

router.afterEach(() => {
	sidebarShowed.value = false;
});
</script>

<style scoped>
.header {
	display: flex;
	align-items: center;
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	height: 36px;
	transition: background-color 0.5s;
}

.menu {
	border: none;
}

.title {
	flex: 1;
	font-family: luoliti, sans-serif;
	font-size: 20px;
	font-weight: normal;
	margin-inline-start: 16px;
}

.sidebar {
	position: fixed;
	inset: 0;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(20px);
}

.sidebar .main {
	box-sizing: border-box;
	padding: 8px;
	position: relative;
	width: 70%;
	height: 100%;
	background-color: #f6f8fa;
}
.theme-dark .sidebar .main {
	background-color: #1e1e1e;
	color: #cfd3dc;
}

.sidebar .close {
	position: absolute;
	top: 8px;
	right: 8px;
	border: none;
}

.side-title {
	font-family: luoliti, sans-serif;
	font-size: 20px;
	font-weight: normal;
	margin-block-start: 0;
}

.side-menu-item-title {
	color: #3c3c43cc;
	margin-block: 8px;
}
.theme-dark .side-menu-item-title {
	color: #cfd3dc;
}

.side-menu-item {
	margin-inline-start: 8px;
	display: flex;
	flex-wrap: wrap;
	column-gap: 8px;
	row-gap: 8px;
}

.side-menu-item-unit {
	font-size: 14px;
	display: inline-flex;
	border: thin solid hsl(0, 0%, 75%);
}
</style>
