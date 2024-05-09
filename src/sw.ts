/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
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

// 缓存 html 文件
registerRoute(
	/.*\.html/,
	new NetworkFirst({
		cacheName: "html-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	}),
	"GET"
);

// 缓存字体
registerRoute(
	/.*\.(woff2|woff|ttf|eot)$/,
	new CacheFirst({
		cacheName: "font-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	}),
	"GET"
);

// 缓存 js 和 css 文件
registerRoute(
	/.*\.(js|css)$/,
	new CacheFirst({
		cacheName: "js-css-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	}),
	"GET"
);

// 缓存文件 如 mp3 pdf
registerRoute(
	/.*\.(mp3|pdf)$/,
	new CacheFirst({
		cacheName: "file-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	}),
	"GET"
);
