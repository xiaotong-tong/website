<template>
	<section class="container">
		<namiMainCard
			class="card"
			v-for="item in acticleList"
			:key="item.id"
			:info="{ ...item, headerLink: '/article/' + item.id }"
		/>
	</section>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Acticle } from "@/types/acticle";
import { ref } from "vue";
import { getActicleList } from "@/api/blog/acticle";

const acticleList: Ref<Acticle[] | null> = ref(null);

(async () => {
	const data = await getActicleList({ category: "网络互联" });
	acticleList.value = data;
})();
</script>

<style scoped>
.container {
	padding: 8px;
}

.card + .card {
	margin-top: 16px;
}
</style>
