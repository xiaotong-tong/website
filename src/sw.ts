/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { CacheFirst } from "workbox-strategies";
import { registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

console.log("sw");

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// 缓存字体
// registerRoute(
// 	/.*\.(woff2|woff|ttf|eot)$/,
// 	new CacheFirst({
// 		cacheName: "font-cache",
// 		plugins: [
// 			new CacheableResponsePlugin({
// 				statuses: [0, 200]
// 			})
// 		]
// 	}),
// 	"GET"
// );

// 缓存文件 如 mp3 pdf
// registerRoute(
// 	/.*\.(mp3|pdf)$/,
// 	new CacheFirst({
// 		cacheName: "file-cache",
// 		plugins: [
// 			new CacheableResponsePlugin({
// 				statuses: [0, 200]
// 			})
// 		]
// 	}),
// 	"GET"
// );

// 缓存 days/poetry fetch 请求
registerRoute(
	new RegExp("https://api.xtt.moe/days/quotes\\?key=\\d+"),
	new CacheFirst({
		cacheName: "days-quotes-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	})
);

// 缓存 days/poetry fetch 请求
registerRoute(
	new RegExp("https://api.xtt.moe/days/poetry\\?key=\\d+"),
	new CacheFirst({
		cacheName: "days-poetry-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	})
);
