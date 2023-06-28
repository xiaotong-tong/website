import { throttle } from "xtt-utils";
import { mouseSnow } from "xtt-ui/plugins/xtt-mouseSnow.js";

const moveEvent = throttle((ev) => {
	new mouseSnow(ev.clientX, ev.clientY);
}, 30);

document.addEventListener("mousemove", moveEvent);

document.addEventListener("touchmove", (ev) => {
	for (const touch of ev.touches) {
		moveEvent(touch);
	}
});
