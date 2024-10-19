<template>
	<ul class="piano-box">
		<li class="piano-key" data-key="c3" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<nami-link to="/" block class="link">
				{{ i18nStore.messages.main.nav.home }}
			</nami-link>
		</li>
		<li class="piano-key" data-key="d3" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<nami-link to="/sitemap" block class="link">
				{{ i18nStore.messages.main.footer.sitemap }}
			</nami-link>
		</li>
		<li class="piano-key" data-key="e3" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<nami-link to="/guestbook" block class="link">
				{{ i18nStore.messages.main.nav.guestbook }}
			</nami-link>
		</li>
		<li class="piano-key" data-key="f3" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<nami-link to="/link" block class="link">
				{{ i18nStore.messages.main.nav.link }}
			</nami-link>
		</li>
		<li class="piano-key" data-key="g3" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<nami-link to="/photos" block class="link">
				{{ i18nStore.messages.main.nav.photo }}
			</nami-link>
		</li>
		<li class="piano-key" data-key="a3" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<nami-link to="/character" block class="link">
				{{ i18nStore.messages.main.nav.character }}
			</nami-link>
		</li>
		<li class="piano-key" data-key="b3" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<nami-link block class="link" @click="router.go(-1)">
				{{ i18nStore.messages.main.nav.back }}
			</nami-link>
		</li>
	</ul>

	<ul class="score-box">
		<li>
			<div @click="autoPlayPiano('1155665-4433221-5544332-5544332-1155665-4433221', 120)">
				<nami-icon icon="mdiMusicNote"></nami-icon>
				小星星
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useI18nStore } from "@/stores/i18n";
const router = useRouter();
const i18nStore = useI18nStore();

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
</script>

<style scoped>
.piano-box {
	display: flex;
	width: 100%;
	justify-content: center;
}

.piano-key {
	--df-color: #f17559;
	height: 70px;
	cursor: pointer;
	overflow: hidden;
}
.piano-key:nth-child(1) {
	--df-color: #f17559;
}
.piano-key:nth-child(2) {
	--df-color: #f2b25b;
}
.piano-key:nth-child(3) {
	--df-color: #f0dc59;
}
.piano-key:nth-child(4) {
	--df-color: #bbf15b;
}
.piano-key:nth-child(5) {
	--df-color: #59f1b7;
}
.piano-key:nth-child(6) {
	--df-color: #59e1f1;
}
.piano-key:nth-child(7) {
	--df-color: #597ff1;
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

.link {
	--link-hover-bg-color: transparent;
	--link-padding: 4px 16px;
	--link-focus-outline: none;
	height: 100%;
	display: flex;
	align-items: center;
}

.score-box {
	margin-block-start: 16px;
	width: 100%;
	display: flex;
}
.score-box li {
	flex: 0 0 50%;
	text-align: center;
}

.small-screen .piano-key {
	height: 48px;
}
.small-screen .link {
	font-size: 12px;
	--link-padding: 4px 8px;
}
</style>
