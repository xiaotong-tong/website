<template>
	<NButton @click="removeCache">清除 cache 缓存</NButton>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";

function removeCache() {
	// 清除 service worker 中的 cache 缓存
	if ("serviceWorker" in navigator) {
		// navigator.serviceWorker.getRegistrations().then((registrations) => {
		// 	for (const registration of registrations) {
		// 		console.log(registration);

		// 		registration.unregister();
		// 	}
		// });
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					return caches.delete(cacheName);
				})
			);
		});
	}
}
</script>

<style scoped></style>
