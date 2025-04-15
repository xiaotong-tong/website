<template>
	<footer class="footer web-color-default">
		<div class="content">
			<div class="text-[#39c]">
				CopyRight © 2021-2025
				<span class="pl-1 pr-1 text-[#39c]">|</span>
				<nami-link class="link" to="/sitemap">
					{{ i18nStore.messages.main.footer.sitemap }}
				</nami-link>
				<span class="pl-1 pr-1 text-[#39c]">|</span>
				<nami-link class="text-[#39c]" to="http://beian.miit.gov.cn/" target="_blank">
					皖ICP备19024231号-3
				</nami-link>
			</div>
			<div class="text-center flex w-full items-center justify-center">
				<nami-link class="text-[#39c]" to="https://icp.gov.moe/?keyword=20249550" target="_blank">
					萌ICP备20249550号
				</nami-link>
				<span class="pl-1 pr-1 text-[#39c]">|</span>
				<nami-link
					class="text-[#e77c8e] flex items-center"
					to="https://travel.moe/go.html"
					target="_blank"
					title="异次元之旅-跃迁-我们一起去萌站成员的星球旅行吧！"
				>
					<img
						src="https://travel.moe/images/icon/icon64pink.png"
						style="width: 24px; height: 24px"
					/>异次元之旅
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
</style>
