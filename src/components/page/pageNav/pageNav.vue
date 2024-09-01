<template>
	<nav
		class="nav"
		:style="{
			width: `min(${store.pageConfig.inlineSize.minPx}px, ${
				store.pageConfig.inlineSize.percentage * 100
			}%)`
		}"
	>
		<ul class="list left">
			<li
				v-for="item in list"
				:key="item.key"
				class="piano-key"
				:data-key="item.key"
				:style="{
					'--df-color': item.color
				}"
				@mouseenter="mouseenterHandler"
				@mouseleave="mouseleaveHandler"
			>
				<namiLink inline-block :to="item.url"> {{ item.content }}</namiLink>
			</li>
		</ul>

		<ul class="list right">
			<li
				class="lang-translate"
				@mouseenter="translatePopShow = true"
				@mouseleave="translatePopShow = false"
				@focusin="focusHandler"
				@focusout="blurHandler"
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
					class="link github-link gap-x-2 px-0"
					inline-block
					to="https://github.com/xiaotong-tong/website"
					target="_blank"
				>
					<namiIcon icon="mdiGithub" aria-label="Github 仓库"></namiIcon>
					xtt
				</namiLink>
			</li>
			<li>
				<namiLink class="link avatar px-0" inline-block to="/user">
					<img
						class="w-6 rounded-full"
						src="https://image.xtt.moe/images/mlian2.md.webp"
						alt="favicon"
					/>
				</namiLink>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";

const store = useStore();
const i18nStore = useI18nStore();

const list = ref([
	{
		key: "c3",
		url: "/",
		content: i18nStore.messages.main.nav.home,
		color: store.theme[0]
	},
	{
		key: "d3",
		url: "/login",
		content: i18nStore.messages.main.nav.login,
		color: store.theme[1]
	},
	{
		key: "e3",
		url: "/bot",
		content: "bot",
		color: store.theme[2]
	},
	{
		key: "f3",
		url: "/guestbook",
		content: i18nStore.messages.main.nav.guestbook,
		color: store.theme[3]
	},
	{
		key: "g3",
		url: "/link",
		content: i18nStore.messages.main.nav.link,
		color: store.theme[4]
	},
	{
		key: "a3",
		url: "/archives",
		content: i18nStore.messages.main.nav.archives,
		color: store.theme[5]
	},
	{
		key: "b3",
		url: "/about",
		content: i18nStore.messages.main.nav.about,
		color: store.theme[6]
	}
]);

// 防止 blur 事件与 focus 事件冲突
const blurDelay = 100;
let blurTimer: number;

const translatePopShow = ref(false);
const focusHandler = () => {
	if (blurTimer) {
		window.clearTimeout(blurTimer);
		blurTimer = 0;
	}
	translatePopShow.value = true;
};
const blurHandler = () => {
	blurTimer = window.setTimeout(() => {
		translatePopShow.value = false;
	}, blurDelay);
};

type PianoKey = "c3" | "d3" | "e3" | "f3" | "g3" | "a3" | "b3";

const playPianoAudio = (key: PianoKey) => {
	let audio = new Audio(`/piano/${key}.mp3`);

	audio?.play();

	audio?.addEventListener("ended", () => {
		audio?.remove();
	});
};

const mouseenterHandler = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	const keyEl = target.closest(".piano-key") as HTMLElement;
	const key = keyEl.dataset.key;
	keyEl?.classList.add("active");
	playPianoAudio(key as PianoKey);
};
const mouseleaveHandler = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	const keyEl = target.closest(".piano-key") as HTMLElement;
	keyEl?.classList.remove("active");
};

onMounted(() => {
	// 预加载 piano 音频文件
	const preload = (urlList: string[]) => {
		urlList.forEach((url) => {
			const audio = new Audio(url);
			audio.preload = "metadata";
			audio.load();
		});
	};
	preload([
		"/piano/c3.mp3",
		"/piano/d3.mp3",
		"/piano/e3.mp3",
		"/piano/f3.mp3",
		"/piano/g3.mp3",
		"/piano/a3.mp3",
		"/piano/b3.mp3"
	]);
});
</script>

<style scoped>
.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 8px;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}
[dark] .list {
	color: #fff;
}
.list {
	display: flex;
	white-space: nowrap;
}

.right {
	justify-content: flex-end;
	column-gap: 8px;

	& > li {
		display: flex;
		align-items: center;
	}
}

.langs {
	position: absolute;
	border-radius: 4px;
	box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
		0 1px 5px 0 rgb(0 0 0 / 12%);
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

.avatar {
	transition: transform 0.5s;
}
/* 移动设备在点击后元素元素会一直保持 hover 状态，使用 @media (hover: hover) 包裹后，移动设备就不会加载 hover 样式了。 */
@media (hover: hover) {
	.right .link:hover,
	.lang-item:hover {
		color: #f17559;
	}

	.avatar:hover {
		transform: rotate(360deg);
	}
}

.piano-key {
	overflow: hidden;
}
.piano-key.active {
	color: #fff;
}

.piano-key::after {
	content: "";
	display: block;
	position: relative;
	z-index: -1;
	width: 100%;
	height: 100%;
	background-color: var(--df-color);
	transform: translateY(-5%);
	transition: transform 0.3s;
}

.piano-key.active::after {
	transform: translateY(-100%);
}
</style>
