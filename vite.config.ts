import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mdPlugin from "./plugins/mdToTextPlain";
import type { ManifestOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./manifest.json" assert { type: "json" };

const isDev = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
	// server: {
	// 	https: true
	// },
	plugins: [
		mdPlugin(),
		// dev 时不启用 PWA
		isDev
			? VitePWA({
					manifest: manifest as ManifestOptions,
					devOptions: {
						enabled: false, // 在 dev 环境下启用
						type: "module"
					},
					strategies: "injectManifest",
					srcDir: "src",
					filename: "sw.ts",
					registerType: "autoUpdate",
					workbox: {
						globPatterns: [
							"**/*.{js,css,html,png,jpg,jpeg,svg,webp,woff2,woff,ttf,eot,mp3,pdf}"
						]
					}
			  })
			: undefined,
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
			"@": resolve(__dirname, "src"),
			"@c": resolve(__dirname, "package")
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					xttUtils: ["xtt-utils"],

					index: [
						"./src/views/home/index.vue",
						"./src/views/home.vue",
						"./src/views/blog/home.vue",
						"./src/views/blog/article/article.vue",
						"./src/views/blog/lang/lang.vue",
						"./src/views/blog/net/index.vue",
						"./src/views/blog/note/index.vue",
						"./src/views/blog/star/index.vue",
						"./src/views/404.vue",
						"./src/views/login/login.vue"
					],
					subindex: [
						"./src/views/about/index.vue",
						"./src/views/blog/guestbook/index.vue",
						"./src/views/links/links.vue",
						"./src/views/sitemap/index.vue",
						"./src/views/dashboard/index.vue",
						"./src/views/photos/index.vue",
						"./src/views/archives/archives.vue",
						"./src/views/reading/index.vue"
					],
					master: ["./src/views/blog/editor/add.vue", "./src/views/blog/editor/edit.vue"],
					// jpWord: ["./src/views/blog/lang/words/words.vue"],
					something: [
						"./src/views/somethings/img2base64.vue",
						"./src/views/somethings/toWebp.vue",
						"./src/views/somethings/pinyin.vue",
						"./src/views/somethings/kana.vue",
						"./src/views/somethings/sudoku.vue",
						"./src/views/somethings/chat.vue"
					],
					music: ["./src/views/music/music.vue"],
					ex: ["./src/views/ex/space/index.vue", "./src/views/ex/pip/index.vue"],
					cv: ["./src/views/cv/cv.pdf.vue"]
				}
			}
		}
	}
});
