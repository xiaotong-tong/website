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
	const data = await getActicleList();
	acticleList.value = data;
})();
</script>

<style scoped>
.container {
	padding: 8px;
}

.card {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
}

.card + .card {
	margin-top: 16px;
}
</style>
