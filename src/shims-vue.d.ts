declare module "*.vue" {
	import { ComponentOptions } from "vue";
	const component: ComponentOptions;
	export default component;
}

declare module "*.md" {
	export default string;
}

declare class APlayer {
	constructor(options: any);
}

declare var live2dLoader: any;
