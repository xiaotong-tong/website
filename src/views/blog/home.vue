<template>
	<section class="container">
		<namiMainCard
			class="card"
			v-for="item in acticleList"
			:key="item.id"
			:info="{ ...item, headerLink: '/article/' + item.id }"
		/>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="星川漣,小恸恸,博客,前端,日语" />
		<meta
			name="description"
			content="星川漣的个人博客,主要记录一些前端代码功能, 以及一些代码设计。"
		/>
	</Teleport>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Acticle } from "@/types/acticle";
import { ref } from "vue";
import { getActicleList } from "@/api/blog/acticle";

const acticleList: Ref<Acticle[] | null> = ref(null);

(async () => {
	const data = await getActicleList();
	acticleList.value = data;
})();

// 修改页面标题
document.title = "星川漣の家";
</script>

<style scoped>
.container {
	padding: 8px;
}

.card + .card {
	margin-top: 16px;
}
</style>
