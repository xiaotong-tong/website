import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mdPlugin from "./plugins/mdToTextPlain";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		mdPlugin(),
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
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					index: [
						"./src/views/home.vue",
						"./src/views/blog/home.vue",
						"./src/views/blog/article/article.vue",
						"./src/views/blog/lang/lang.vue",
						"./src/views/blog/net/index.vue",
						"./src/views/blog/note/index.vue"
					],
					master: ["./src/views/blog/editor/add.vue", "./src/views/blog/editor/edit.vue"],
					about: ["./src/views/about/index.vue"],
					jpWord: ["./src/views/blog/lang/words/words.vue"],
					guestbook: ["./src/views/blog/guestbook/index.vue"],
					link: ["./src/views/blog/links/links.vue"]
				}
			}
		}
	}
});
