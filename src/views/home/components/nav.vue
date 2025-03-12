<template>
	<ul class="piano-box">
		<li
			v-for="item in list"
			:key="item.key"
			class="piano-key"
			:data-key="item.key"
			ref="listRef"
			@mouseenter.stop.self="mouseenterHandler($event, item)"
			:style="{
				'--df-color': item.color
			}"
		>
			<nami-link :to="item.url" block class="link">
				{{ t(item.content) }}
			</nami-link>
			<roughCard
				class="bg"
				:color="item.color"
				:roughOptions="{
					fillWeight: 3,
					fill: item.color
				}"
			></roughCard>
			<Icon class="active-icon" v-if="store.currentTheme === item.color" icon="cat" :size="28"></Icon>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from "vue";
import gsap from "gsap";
import { roughCard, Icon } from "@c/index";
import { useStore } from "@/stores";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();

type PianoKey = "c3" | "d3" | "e3" | "f3" | "g3" | "a3" | "b3";

const listRef = ref<HTMLElement[]>([]);

interface List {
	key: PianoKey;
	url: string;
	content: string;
	color: string;
}

const list = ref<List[]>([
	{
		key: "c3",
		url: "/",
		content: "main.homeNav.home",
		color: store.theme[0]
	},
	{
		key: "d3",
		url: "/blog",
		content: "main.homeNav.blog",
		color: store.theme[1]
	},
	{
		key: "e3",
		url: "/music",
		content: "main.homeNav.music",
		color: store.theme[2]
	},
	{
		key: "f3",
		url: "/save",
		content: "main.homeNav.save",
		color: store.theme[3]
	},
	{
		key: "g3",
		url: "/tools",
		content: "main.homeNav.tools",
		color: store.theme[4]
	},
	{
		key: "a3",
		url: "/info",
		content: "main.homeNav.about",
		color: store.theme[5]
	},
	{
		key: "b3",
		url: "/setting",
		content: "main.homeNav.setting",
		color: store.theme[6]
	}
]);

watch(
	() => store.theme,
	() => {
		list.value.forEach((item, index) => {
			item.color = store.theme[index];
		});
	},
	{
		deep: true
	}
);

const playPianoAudio = async (key: PianoKey, duration?: number) => {
	let audio = new Audio(`/piano/${key}.mp3`);
	const audioContext = new AudioContext();

	const source = audioContext.createMediaElementSource(audio);
	const gainNode = audioContext.createGain();

	gainNode.connect(audioContext.destination);
	gainNode.gain.setValueAtTime(0, audioContext.currentTime);
	source.connect(gainNode);

	audio.play();
	gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.03);

	audio?.addEventListener("ended", () => {
		audio?.remove();
		audioContext.close();
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

	if (store.pageConfig.rightPiano) {
		playPianoAudio(item.key);
	}

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

const keyMap = {
	a: {
		unit: 0,
		key: "c3"
	},
	s: {
		unit: 1,
		key: "d3"
	},
	d: {
		unit: 2,
		key: "e3"
	},
	f: {
		unit: 3,
		key: "f3"
	},
	g: {
		unit: 4,
		key: "g3"
	},
	h: {
		unit: 5,
		key: "a3"
	},
	j: {
		unit: 6,
		key: "b3"
	}
} as const;

const keydownHandler = (e: KeyboardEvent) => {
	const key = e.key;

	const keyName = keyMap[key as keyof typeof keyMap];

	if (!keyName) {
		return;
	}

	const keyEl = listRef.value[keyName.unit];

	const tween = gsap.fromTo(
		keyEl.querySelector(".bg"),
		{
			yPercent: 0
		},
		{
			yPercent: -90,
			duration: 0.3,
			ease: "power2.out",
			onComplete: function () {
				tween.reverse(); // 在动画完成时调用 reverse 方法
			}
		}
	);

	const colorTW = gsap.fromTo(
		keyEl.querySelector(".link"),
		{
			"--temp-start-num": "10%"
		},
		{
			"--temp-start-num": "90%",
			duration: 0.3,
			ease: "power2.out",
			onComplete: function () {
				colorTW.reverse(); // 在动画完成时调用 reverse 方法
			}
		}
	);

	tween.play();
	colorTW.play();
	playPianoAudio(keyName.key);
};

const autoPlayPiano = (score: string, speed = 75) => {
	const timeUnit = (1000 * 60) / speed;
	const scoreArr = score.replaceAll(" ", "").split("");
	let i = 0;

	const keyMap = [undefined, "c3", "d3", "e3", "f3", "g3", "a3", "b3"] as const;

	const loop = (
		unit: number | "-",
		nextUnit: number | string,
		nextNextUnit?: number | string,
		nextttUnit?: number | string
	) => {
		let curTimeUnit = timeUnit;
		let toNextUnit = 1;
		if (nextUnit === "_") {
			toNextUnit = 2;
			curTimeUnit = timeUnit * 0.5;

			if (nextNextUnit === "_") {
				toNextUnit = 3;
				curTimeUnit = timeUnit * 0.25;

				if (nextttUnit === "_") {
					toNextUnit = 4;
					curTimeUnit = timeUnit * 0.125;
				}
			}
		}
		setTimeout(() => {
			i = i + toNextUnit;

			if (i > scoreArr.length) {
				return;
			}

			loop(+scoreArr[i], scoreArr[i + 1], scoreArr[i + 2], scoreArr[i + 3]);
		}, curTimeUnit);

		if (unit === 0 || unit === "-") {
			return;
		}
		const key = keyMap[unit];

		if (!key) {
			return;
		}

		const keyEl = listRef.value[unit - 1];

		const tween = gsap.fromTo(
			keyEl.querySelector(".bg"),
			{
				yPercent: 0
			},
			{
				yPercent: -90,
				duration: 0.3,
				ease: "power2.out",
				onComplete: function () {
					tween.reverse(); // 在动画完成时调用 reverse 方法
				}
			}
		);

		const colorTW = gsap.fromTo(
			keyEl.querySelector(".link"),
			{
				"--temp-start-num": "10%"
			},
			{
				"--temp-start-num": "90%",
				duration: 0.3,
				ease: "power2.out",
				onComplete: function () {
					colorTW.reverse(); // 在动画完成时调用 reverse 方法
				}
			}
		);

		tween.play();
		colorTW.play();

		playPianoAudio(key);
	};
	loop(+scoreArr[i], scoreArr[i + 1], scoreArr[i + 2], scoreArr[i + 3]);
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
	position: relative;
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
.link::part(link) {
	align-items: center;
}

.active-icon {
	position: absolute;
	inset-inline-start: 8px;
	inset-block-end: 10%;
}
</style>
