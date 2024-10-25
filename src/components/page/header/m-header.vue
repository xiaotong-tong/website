<template>
	<header class="header web-color-default">
		<NButton class="text-[22px] ml-2" text @click="sidebarShowed = true"
			><nami-icon icon="mdiMenu"></nami-icon
		></NButton>
		<h1 class="title">星川漣の家</h1>
	</header>

	<div class="sidebar" v-show="sidebarShowed" @click.self="sidebarShowed = false">
		<div class="main">
			<h2 class="side-title">星川漣</h2>
			<NButton class="absolute top-2 right-2 text-[22px]" text @click="sidebarShowed = false"
				><nami-icon icon="mdiClose"></nami-icon
			></NButton>
			<div class="side-menus">
				<div class="side-menu-item-title">
					{{ t("main.nav.quickFeat") }}
				</div>
				<div class="side-menu-item">
					<NButton class="side-menu-item-unit" @click="store.isDark = !store.isDark">
						<namiIcon icon="mdiThemeLightDark"></namiIcon>
						{{ store.isDark ? t("main.nav.toLightMode") : t("main.nav.toDarkMode") }}
					</NButton>

					<NButton
						class="side-menu-item-unit"
						@click="i18nStore.lang = i18nStore.lang === 'zh' ? 'ja' : 'zh'"
					>
						<namiIcon icon="mdiTranslate"></namiIcon>
						{{ i18nStore.lang === "zh" ? t("main.nav.toJaLang") : t("main.nav.toZhLang") }}
					</NButton>

					<NButton class="side-menu-item-unit" @click="store.animeLess = !store.animeLess">
						<namiIcon icon="mdiAnimationPlayOutline"></namiIcon>
						{{ store.animeLess ? t("main.nav.toAnimeLess") : t("main.nav.toAnimeMore") }}
					</NButton>
				</div>

				<div class="side-menu-item-title">
					{{ t("main.nav.mainPage") }}
				</div>
				<div class="side-menu-item">
					<nami-link class="side-menu-item-unit" to="/" inline-block>
						{{ t("main.homeNav.home") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/blog" inline-block>
						{{ t("main.homeNav.blog") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/music" inline-block>
						{{ t("main.homeNav.music") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/save" inline-block>
						{{ t("main.homeNav.save") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/tools" inline-block>
						{{ t("main.homeNav.tools") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/info" inline-block>
						{{ t("main.homeNav.about") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/setting" inline-block>
						{{ t("main.homeNav.setting") }}
					</nami-link>
				</div>

				<div class="side-menu-item-title">
					{{ i18nStore.messages.main.nav.blogPage }}
				</div>
				<div class="side-menu-item">
					<nami-link class="side-menu-item-unit" to="/login" inline-block>
						{{ t("main.nav.login") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/bot" inline-block>
						{{ t("main.nav.bot") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/guestbook" inline-block>
						{{ t("main.nav.guestbook") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/link" inline-block>
						{{ t("main.nav.link") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/archives" inline-block>
						{{ t("main.nav.archives") }}
					</nami-link>
					<nami-link class="side-menu-item-unit" to="/live" inline-block>
						{{ t("main.nav.live") }}
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

				<div class="side-menu-item-title">
					{{ i18nStore.messages.main.nav.more }}
				</div>
				<div class="side-menu-item">
					<nami-link class="side-menu-item-unit" to="/photos" inline-block>
						{{ i18nStore.messages.main.nav.photo }}
					</nami-link>
				</div>
			</div>
		</div>

		<kanbanarea ref="live2d" class="m-live2d"> </kanbanarea>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import kanbanarea from "@/components/live2d/kanbanarea.vue";
import { NButton } from "naive-ui";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";
import { useI18n } from "vue-i18n";

const store = useStore();
const i18nStore = useI18nStore();
const router = useRouter();
const { t } = useI18n();

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

.m-live2d {
	right: 0;
	left: unset;
	bottom: 8px;
	width: 150px;
	height: 370px;
}

.m-live2d ::v-deep(.icon-hover-wrap) {
	display: none;
}
</style>
