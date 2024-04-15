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

// 虽然 NDEFReader 是原生 window 下的支持的 api，但是 ts 的全局命令空间貌似并没有这个接口，所以需要自己声明一下
interface Window {
	NDEFReader: any;
}

declare module "canvas-confetti" {
	export default any;
}

declare module "roughjs/bundled/rough.esm.js" {
	export default any;
}
