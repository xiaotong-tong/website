<template>
	<section class="container">
		<nami-link to="/photos" class="link" type="primary">
			{{ i18nStore.lang === "ja" ? "写真" : "图片" }}
		</nami-link>
		<nami-link to="/save/webLinks" class="link" type="primary">
			{{ i18nStore.lang === "ja" ? "Web リンク" : "前端链接" }}
		</nami-link>
		<nami-link
			to="https://file.xtt.moe/local/%E6%97%A5%E6%9C%AC%E8%AF%AD%E5%8F%A5%E5%9E%8B%E8%BE%9E%E5%85%B8.pdf"
			class="link"
			type="primary"
			target="_blank"
		>
			{{ "日本语句型辞典" }}
		</nami-link>
	</section>
</template>

<script setup lang="ts">
import { useI18nStore } from "@/stores/i18n";
const i18nStore = useI18nStore();
</script>

<style scoped>
.container {
	margin-inline: 8px;
	margin-block-start: 32px;
	display: grid;
	grid-template-columns: repeat(4, minmax(100px, 1fr));
}
</style>
