<template>
	<nav class="nav">
		<ul class="list left">
			<li>
				<namiLink
					class="link"
					inline-block
					to="/"
					v-text="i18nStore.messages.main.nav.home"
				></namiLink>
			</li>
			<li
				class="share-wrap"
				@mouseenter="tagsPopShow = true"
				@mouseleave="tagsPopShow = false"
				@focusin="focusHandler('share')"
				@focusout="blurHandler('share')"
			>
				<namiLink class="link share" inline-block>
					{{ i18nStore.messages.main.nav.share }}
					<namiIcon icon="mdiChevronDown"></namiIcon>
				</namiLink>

				<div
					class="tags web-color-default"
					v-show="tagsPopShow"
					@click="tagsPopShow = false"
				>
					<namiLink class="link" inline-block to="/net">{{
						i18nStore.messages.main.nav.net
					}}</namiLink>
					<namiLink class="link" inline-block to="/lang">
						{{ i18nStore.messages.main.nav.lang }}
					</namiLink>
					<namiLink class="link" inline-block to="/note">
						{{ i18nStore.messages.main.nav.note }}
					</namiLink>
					<namiLink class="link" inline-block to="/star">
						{{ i18nStore.messages.main.nav.star }}
					</namiLink>
				</div>
			</li>
			<li>
				<namiLink class="link" inline-block to="/guestbook">
					{{ i18nStore.messages.main.nav.guestbook }}
				</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/link">
					{{ i18nStore.messages.main.nav.link }}
				</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/archives">
					{{ i18nStore.messages.main.nav.archives }}
				</namiLink>
			</li>
			<li>
				<namiLink class="link" inline-block to="/about">
					{{ i18nStore.messages.main.nav.about }}
				</namiLink>
			</li>
		</ul>

		<ul class="list right">
			<li
				class="lang-translate"
				@mouseenter="translatePopShow = true"
				@mouseleave="translatePopShow = false"
				@focusin="focusHandler('lang')"
				@focusout="blurHandler('lang')"
			>
				<namiIcon icon="mdiTranslate" class="link"></namiIcon>

				<div
					class="langs web-color-default"
					v-show="translatePopShow"
					@click="translatePopShow = false"
				>
					<div
						class="lang-item"
						v-if="i18nStore.lang === 'zh'"
						@click="i18nStore.lang = 'ja'"
					>
						日本語
					</div>
					<div class="lang-item" v-else @click="i18nStore.lang = 'zh'">中文</div>
				</div>
			</li>
			<li class="light-dark-wrap link" @click="store.isDark = !store.isDark">
				<namiIcon icon="mdiThemeLightDark"></namiIcon>
			</li>
			<li>
				<namiLink
					class="link github-link"
					inline-block
					to="https://github.com/xiaotong-tong/website"
					target="_blank"
				>
					<namiIcon icon="mdiGithub" aria-label="Github 仓库"></namiIcon>
					xtt
				</namiLink>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";

const store = useStore();
const i18nStore = useI18nStore();
const tagsPopShow = ref(false);
const translatePopShow = ref(false);

// 防止 blur 事件与 focus 事件冲突
const blurDelay = 100;
let blurTimer: number;

const focusHandler = (target: "share" | "lang") => {
	if (blurTimer) {
		window.clearTimeout(blurTimer);
		blurTimer = 0;
	}
	const targetRef = target === "share" ? tagsPopShow : translatePopShow;
	targetRef.value = true;
};
const blurHandler = (target: "share" | "lang") => {
	blurTimer = window.setTimeout(() => {
		const targetRef = target === "share" ? tagsPopShow : translatePopShow;
		targetRef.value = false;
	}, blurDelay);
};
</script>

<style scoped>
.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: min(1000px, 100%);
	padding: 0 8px;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}
[dark] .list {
	color: #fff;
}
.list {
	display: flex;
	column-gap: 8px;
	white-space: nowrap;
}

.right {
	justify-content: flex-end;
}

.small-screen .right {
	display: none;
}

.github-link::part(link) {
	align-items: center;
	column-gap: 8px;
}

.small-screen .link {
	--link-padding: 2px 4px;
}

.share::part(link) {
	align-items: center;
}
.tags,
.langs {
	position: absolute;
	border-radius: 4px;
	box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
		0 1px 5px 0 rgb(0 0 0 / 12%);
}
.tags .link {
	display: flex;
}

.langs {
	top: 24px;
	left: -16px;
}
.lang-item {
	padding: 4px 8px;
}

.light-dark-wrap,
.lang-translate {
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
}

/* 移动设备在点击后元素元素会一直保持 hover 状态，使用 @media (hover: hover) 包裹后，移动设备就不会加载 hover 样式了。 */
@media (hover: hover) {
	.link:hover,
	.lang-item:hover {
		color: #f34159;
	}
}
</style>
