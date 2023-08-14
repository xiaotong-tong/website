declare module "*.vue" {
	import { ComponentOptions } from "vue";
	const component: ComponentOptions;
	export default component;
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

declare var live2dLoader: any;

declare global {
	interface HTMLElementTagNameMap {
		"xtt-tooltip": xttTooltipElement;
	}
}
