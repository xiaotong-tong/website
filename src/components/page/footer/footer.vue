<template>
	<footer class="footer web-color-default">
		<div class="content">
			<div>
				CopyRight © 2024 <nami-link class="link" to="/">星川漣の家</nami-link> |
				<nami-link class="link" to="/sitemap">
					{{ i18nStore.messages.main.footer.sitemap }}
				</nami-link>
			</div>
			<div class="text-center">
				<nami-link class="link" to="https://icp.gov.moe/?keyword=20249550" target="_blank">
					萌ICP备20249550号
				</nami-link>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { useI18nStore } from "@/stores/i18n";
const i18nStore = useI18nStore();
</script>

<style scoped>
.footer {
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.content {
	font-size: 14px;
	color: #999;
}

.link {
	color: #39c;
}
</style>
