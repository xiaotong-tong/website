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

declare module "aplayer" {
	export default class APlayer {
		constructor(options: any);
	}
}

interface xttTooltipElement extends HTMLElement {
	initTrigger: (icons: HTMLElement[] | HTMLElement | NodeList) => void;
}
interface xttDialogElement extends HTMLElement {
	open: () => void;
}

declare var live2dLoader: any;

declare global {
	interface HTMLElementTagNameMap {
		"xtt-tooltip": xttTooltipElement;
		"xtt-dialog": xttDialogElement;
	}
}
