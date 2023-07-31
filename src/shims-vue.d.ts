declare module "*.vue" {
	import { ComponentOptions } from "vue";
	const component: ComponentOptions;
	export default component;
}

declare module "xtt-utils" {
	export function throttle(fn: Function, delay: number): Function;
}

interface mouseSnowOptions {
	color?: string;
	character?: string;
	lifeSpan?: number;
}

declare module "xtt-ui/plugins/xtt-mouseSnow" {
	export class mouseSnow {
		constructor(x: number, y: number, options?: mouseSnowOptions);
	}
}

interface xttTooltipElement extends HTMLElement {
	initTrigger: (icons: HTMLElement[] | HTMLElement | NodeList) => void;
}

interface Window {
	live2dLoader: any;
}

declare global {
	interface HTMLElementTagNameMap {
		"xtt-tooltip": xttTooltipElement;
	}
}
