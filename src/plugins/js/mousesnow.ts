import { throttle } from "xtt-utils";
import { mouseSnow } from "xtt-ui/plugins/xtt-mouseSnow";

const moveEvent = throttle((x: number, y: number) => {
	new mouseSnow(x, y);
}, 30);

document.addEventListener("mousemove", (ev) => {
	moveEvent(ev.clientX, ev.clientY);
});

document.addEventListener("touchmove", (ev) => {
	for (const touch of ev.touches) {
		moveEvent(touch);
	}
});
