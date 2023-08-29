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

declare var live2dLoader: any;
