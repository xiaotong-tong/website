import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// 以 xtt- 开头的标签都当作 Web Components 自定义元素处理
					isCustomElement: (tag) => tag.startsWith("xtt-") || tag.startsWith("cropper-")
				}
			}
		})
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src")
		}
	}
});
