<template>
	<NamiButton
		@click="removeCache"
		:borderColor="store.currentTheme"
		activeBorderColor="#8bcecb"
		:animeLess="store.animeLess"
		>{{ t("pages.setting.clearCache") }}</NamiButton
	>
</template>

<script setup lang="ts">
import { NamiButton } from "@c/index";
import { useStore } from "@/stores/index";
import { useI18n } from "vue-i18n";
const store = useStore();
const { t } = useI18n();

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
