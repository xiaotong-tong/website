<template>
	<ul class="piano-box">
		<li
			v-for="item in list"
			:key="item.key"
			class="piano-key"
			:data-key="item.key"
			@mouseenter.stop.self="mouseenterHandler($event, item)"
			:style="{
				'--df-color': item.color
			}"
		>
			<nami-link :to="item.url" block class="link">
				{{ item.content }}
			</nami-link>
			<namiRoughCard
				class="bg"
				:color="item.color"
				:roughOptions="{
					fill: item.color,
					fillWeight: 3
				}"
			></namiRoughCard>
		</li>
	</ul>

	<!-- <ul class="score-box">
		<li>
			<div @click="autoPlayPiano('1155665-4433221-5544332-5544332-1155665-4433221', 120)">
				<nami-icon icon="mdiMusicNote"></nami-icon>
				小星星
			</div>
		</li>
	</ul> -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { useStore } from "@/stores";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();

type PianoKey = "c3" | "d3" | "e3" | "f3" | "g3" | "a3" | "b3";

interface List {
	key: PianoKey;
	url: string;
	content: string;
	color: string;
}

const list: List[] = [
	{
		key: "c3",
		url: "/",
		content: t("main.homeNav.home"),
		color: store.theme[0]
	},
	{
		key: "d3",
		url: "/blog",
		content: t("main.homeNav.blog"),
		color: store.theme[1]
	},
	{
		key: "e3",
		url: "/music",
		content: t("main.homeNav.music"),
		color: store.theme[2]
	},
	{
		key: "f3",
		url: "/save",
		content: t("main.homeNav.save"),
		color: store.theme[3]
	},
	{
		key: "g3",
		url: "/tools",
		content: t("main.homeNav.tools"),
		color: store.theme[4]
	},
	{
		key: "a3",
		url: "/#about",
		content: t("main.homeNav.about"),
		color: store.theme[5]
	},
	{
		key: "b3",
		url: "/setting",
		content: t("main.homeNav.setting"),
		color: store.theme[6]
	}
];

const playPianoAudio = (key: PianoKey) => {
	let audio = new Audio(`/piano/${key}.mp3`);

	audio?.play();

	audio?.addEventListener("ended", () => {
		audio?.remove();
	});
};

const mouseenterHandler = (e: MouseEvent, item: List) => {
	const target = e.target as HTMLElement;

	const tween = gsap.fromTo(
		target.querySelector(".bg"),
		{
			yPercent: 0
		},
		{
			yPercent: -90,
			duration: 0.3,
			ease: "power2.out"
		}
	);

	const colorTW = gsap.fromTo(
		target.querySelector(".link"),
		{
			"--temp-start-num": "10%"
		},
		{
			"--temp-start-num": "90%",
			duration: 0.3,
			ease: "power2.out"
		}
	);

	tween.play();
	colorTW.play();

	playPianoAudio(item.key);

	target.addEventListener(
		"mouseleave",
		() => {
			tween.reverse();
			colorTW.reverse();
		},
		{
			once: true
		}
	);
};

const keydownHandler = (e: KeyboardEvent) => {
	const key = e.key;
	const keyMap = {
		a: "c3",
		s: "d3",
		d: "e3",
		f: "f3",
		g: "g3",
		h: "a3",
		j: "b3"
	};

	const keyName = keyMap[key as keyof typeof keyMap];

	if (!keyName) {
		return;
	}

	const keyEl = document.querySelector(`.piano-key[data-key="${keyName}"]`);
	keyEl?.classList.add("active");

	playPianoAudio(keyName as PianoKey);

	keyEl?.addEventListener("transitionend", () => {
		keyEl?.classList.remove("active");
	});
};

const autoPlayPiano = (score: string, speed = 75) => {
	const timeUnit = (1000 * 60) / speed;
	const scoreArr = score.split("");
	let i = 0;

	const keyMap = [undefined, "c3", "d3", "e3", "f3", "g3", "a3", "b3"];

	const loop = (unit: number | "-") => {
		if (unit === 0 || unit === "-") {
			return;
		}
		const key = keyMap[unit];

		if (!key) {
			return;
		}

		const keyEl = document.querySelector(`.piano-box>.piano-key[data-key="${key}"]`);
		keyEl?.classList.add("active");

		playPianoAudio(key as PianoKey);

		keyEl?.addEventListener("transitionend", () => {
			keyEl?.classList.remove("active");
		});
	};

	const timer = setInterval(() => {
		loop(+scoreArr[i]);
		i++;

		if (i > scoreArr.length) {
			clearInterval(timer);
		}
	}, timeUnit);
};

onMounted(() => {
	document.addEventListener("keydown", keydownHandler);
});

onUnmounted(() => {
	document.removeEventListener("keydown", keydownHandler);
});

defineExpose({
	autoPlayPiano
});
</script>

<style scoped>
.piano-box {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}

.piano-key {
	flex: 1;
	cursor: pointer;
	overflow: hidden;
	box-sizing: border-box;
}

.bg {
	z-index: -1;
	height: 100%;
	transform: translateY(-10%);
}

.link {
	--temp-start-num: 10%;
	--link-hover-bg-color: transparent;
	--link-padding: 4px 16px;
	--link-focus-outline: none;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 28px;
	color: transparent;
	background-image: linear-gradient(
		to top,
		#fff 0,
		#fff var(--temp-start-num),
		var(--df-color) var(--temp-start-num),
		var(--df-color) 100%
	);
	background-clip: text;
}
</style>
