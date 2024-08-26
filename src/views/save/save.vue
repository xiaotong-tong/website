<template>
	<section class="container">
		<myPhotosArea></myPhotosArea>
		<div class="nomoal">
			<nami-link to="/save/webLinks" class="link" type="primary">
				{{ i18nStore.lang === "ja" ? "Web リンク" : "前端链接" }}
			</nami-link>
			<nami-link to="/save/emoji" class="link" type="primary">
				{{ i18nStore.lang === "ja" ? "絵文字" : "颜文字" }}
			</nami-link>
			<nami-link to="/reading" class="link" type="primary">
				文字な日々
			</nami-link>
		</div>
		<div class="jp-section">
			<hBanner>日本語勉強</hBanner>
			<div class="jp-content">
				<div>
					<div>単語</div>
					<div class="jp-next-content">
						<nami-link to="/save/jpWord/kudamono" class="link" type="primary">
							果物
						</nami-link>
					</div>
				</div>
				<div>
					<div>その他</div>
					<div class="jp-next-content">
						<nami-link
							to="https://file.xtt.moe/local/%E6%97%A5%E6%9C%AC%E8%AF%AD%E5%8F%A5%E5%9E%8B%E8%BE%9E%E5%85%B8.pdf"
							class="link"
							type="primary"
							target="_blank"
						>
							{{ "日本语句型辞典" }}
						</nami-link>
						<nami-link to="/save/daysQuote" class="link" type="primary">
							每日日语
						</nami-link>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useI18nStore } from "@/stores/i18n";
import myPhotosArea from "./components/photos.vue";
import { hBanner } from "@c/index";
const i18nStore = useI18nStore();
</script>

<style scoped>
.nomoal {
	margin-inline: 8px;
	margin-block-start: 32px;
	display: grid;
	grid-template-columns: repeat(4, minmax(100px, 1fr));
}

.jp-section {
	margin-inline: 8px;
	margin-block-start: 32px;
}

.jp-content {
	padding-inline-start: 8px;
}
.jp-next-content {
	padding-inline-start: 16px;
	margin-block: 8px;
	display: flex;
	column-gap: 16px;
}
</style>
