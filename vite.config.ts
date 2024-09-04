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
		VitePWA({
			manifest: manifest as ManifestOptions,
			devOptions: {
				enabled: false, // 在 dev 环境下启用
				type: "module"
			},
			strategies: "injectManifest",
			srcDir: "src",
			filename: "sw.ts"
			// registerType: "autoUpdate"
			// workbox: {
			// 	globPatterns: [
			// 		"**/*.{js,css,html,png,jpg,jpeg,svg,webp,woff2,woff,ttf,eot,mp3,pdf}"
			// 	]
			// }
		}),
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

					// 主页面
					main: ["./src/views/home.vue"],

					// 主页面中右侧 nav 副主页面的内容
					subMain: [
						"./src/views/blog/home.vue",
						"./src/views/music/music.vue",
						"./src/views/save/save.vue",
						"./src/views/tools/tools.vue",
						"./src/views/info/info.vue",
						"./src/views/setting/index.vue"
					],

					// 非主页面右侧 nav 部分副页面的内容
					sub: [
						"./src/views/404.vue",
						"./src/views/login/login.vue",
						"./src/views/about/index.vue",
						"./src/views/links/links.vue",
						"./src/views/blog/guestbook/index.vue",
						"./src/views/bot/bot.vue",
						"./src/views/sitemap/index.vue",
						"./src/views/dashboard/index.vue",
						"./src/views/archives/archives.vue"
					],

					// 非网站使用页面
					other: ["./src/views/bot/ruby.vue"],

					// tools 子页面
					tools: [
						"./src/views/somethings/kana.vue",
						"./src/views/somethings/qrcode.vue",
						"./src/views/somethings/pinyin.vue",
						"./src/views/somethings/img2base64.vue",
						"./src/views/somethings/toWebp.vue",
						"./src/views/somethings/sudoku.vue",
						"./src/views/somethings/chat.vue"
					],
					// save 子页面
					save: [
						"./src/views/reading/index.vue",
						"./src/views/save/children/webLinks/links.vue",
						"./src/views/save/children/emoji/emoji.vue",
						"./src/views/photos/index.vue",
						"./src/views/save/children/jpWord/kudamono.vue",
						"./src/views/save/children/daysQuote/daysQuote.vue"
					],

					blog: [
						"./src/views/blog/article/article.vue",
						"./src/views/blog/lang/lang.vue",
						"./src/views/blog/net/index.vue",
						"./src/views/blog/note/index.vue",
						"./src/views/blog/star/index.vue"
					],
					editor: ["./src/views/blog/editor/add.vue", "./src/views/blog/editor/edit.vue"],
					ex: ["./src/views/ex/space/index.vue", "./src/views/ex/pip/index.vue"],
					cv: ["./src/views/cv/cv.pdf.vue"]
				}
			}
		}
	}
});
