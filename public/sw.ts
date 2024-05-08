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

registerRoute(
	"https://file.xtt.moe/files/fonts/LuoLiTi-2.woff2",
	new CacheFirst({
		cacheName: "LuoLiTi-2",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	}),
	"GET"
);
