import confetti from "canvas-confetti";
import { random } from "xtt-utils";

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
