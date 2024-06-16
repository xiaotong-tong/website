import type { Ref } from "vue";
import { computed, unref, watch } from "vue";
import confetti from "canvas-confetti";
import { random } from "xtt-utils";
import { useGamepad, mapGamepadToXbox360Controller } from "@vueuse/core";

const keyCodeArr = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"KeyB",
	"KeyA"
];

const cacheInput = [];

const colors = ["#f17559", "#f2b25b", "#f0dc59", "#bbf15b", "#59f1b7", "#59e1f1", "#597ff1"];
let end: number;

document.addEventListener("keydown", (e) => {
	if (keyCodeArr[cacheInput.length] === e.code) {
		cacheInput.push(e.code);
		if (cacheInput.length === keyCodeArr.length) {
			end = Date.now() + 10 * 1000;
			joke();
			cacheInput.length = 0;
		}
	} else {
		cacheInput.length = 0;
		if (e.code === keyCodeArr[0]) {
			cacheInput.push(e.code);
		}
	}
});

let count = 0;
function joke() {
	count++;

	confetti({
		particleCount: 7,
		angle: 60,
		spread: 55,
		origin: { x: 0 },
		colors: colors
	});
	confetti({
		particleCount: 7,
		angle: 120,
		spread: 55,
		origin: { x: 1 },
		colors: colors
	});

	if (count % 8 === 0) {
		confetti({
			startVelocity: 30,
			spread: 360,
			ticks: 60,
			particleCount: random(30, 60),
			origin: { x: random(1, 100) / 100, y: Math.random() - 0.2 },
			colors: colors
		});
	}

	if (Date.now() < end) {
		requestAnimationFrame(joke);
	} else {
		count = 0;
	}
}

let cachePadInput: string[] = [];

const { gamepads, resume, onDisconnected } = useGamepad();

// standard 标准手柄映射
const gamepad = computed(() => unref(gamepads).find((g) => g.mapping === "standard"));

resume();

const controller = mapGamepadToXbox360Controller(gamepad as Ref<Gamepad>);

const pressed = () => {
	let willSetValue: string[] = [];
	if (controller.value?.buttons.a.pressed) {
		if (cachePadInput.length === 9) {
			end = Date.now() + 10 * 1000;
			joke();
		} else {
			willSetValue = [];
		}
	} else if (controller.value?.buttons.b.pressed) {
		if (cachePadInput.length === 8) {
			willSetValue = [...cachePadInput, "B"];
		} else {
			willSetValue = [];
		}
	} else if (controller.value?.buttons.x.pressed) {
		willSetValue = [];
	} else if (controller.value?.buttons.y.pressed) {
		willSetValue = [];
	} else if (controller.value?.dpad.up.pressed) {
		if (cachePadInput.length === 1) {
			willSetValue = [...cachePadInput, "ArrowUp"];
		} else {
			willSetValue = ["ArrowUp"];
		}
	} else if (controller.value?.dpad.down.pressed) {
		if (cachePadInput.length === 2 || cachePadInput.length === 3) {
			willSetValue = [...cachePadInput, "ArrowDown"];
		} else {
			willSetValue = [];
		}
	} else if (controller.value?.dpad.left.pressed) {
		if (cachePadInput.length === 4 || cachePadInput.length === 6) {
			willSetValue = [...cachePadInput, "ArrowLeft"];
		} else {
			willSetValue = [];
		}
	} else if (controller.value?.dpad.right.pressed) {
		if (cachePadInput.length === 5 || cachePadInput.length === 7) {
			willSetValue = [...cachePadInput, "ArrowRight"];
		} else {
			willSetValue = [];
		}
	} else {
		willSetValue = [];
	}

	return function () {
		cachePadInput = willSetValue;
	};
};

let callback = Function.prototype;
watch(controller, () => {
	if (
		[
			controller.value?.buttons.a.pressed,
			controller.value?.buttons.b.pressed,
			controller.value?.buttons.x.pressed,
			controller.value?.buttons.y.pressed,
			controller.value?.dpad.up.pressed,
			controller.value?.dpad.down.pressed,
			controller.value?.dpad.left.pressed,
			controller.value?.dpad.right.pressed
		].some((item) => item)
	) {
		callback = pressed();
	} else {
		callback?.();
		callback = Function.prototype;
	}
});

onDisconnected(() => {
	cachePadInput.length = 0;
});
