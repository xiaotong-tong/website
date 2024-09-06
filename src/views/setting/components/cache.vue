<template>
	<NamiButton
		@click="removeCache"
		:borderColor="store.currentTheme"
		activeBorderColor="#8bcecb"
		:animeLess="store.animeLess"
		>清除 cache 缓存</NamiButton
	>
</template>

<script setup lang="ts">
import { NamiButton } from "@c/index";
import { useStore } from "@/stores/index";
const store = useStore();

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
