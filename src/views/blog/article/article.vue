<template>
	<div class="title-operate-area">
		<xtt-button v-if="store.loginUid" type="primary" @click="router.push('/editor/edit/' + id)"
			>编辑</xtt-button
		>
	</div>
	<section class="container">
		<h2>
			{{ acticle?.title }}
		</h2>
		<p>
			发布于<span>{{ acticle?.createDate }}</span>

			&nbsp;&nbsp;&nbsp; # {{ acticle?.category }}
		</p>

		<xtt-markdown class="md">{{ acticle?.content }}</xtt-markdown>
	</section>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Acticle } from "@/types/acticle";
import { ref, watch } from "vue";
import { getActicleById } from "@/api/blog/acticle";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/index";
const store = useStore();
const route = useRoute();
const router = useRouter();

const id = ref(Number(route.params.id));

const acticle: Ref<Acticle | null> = ref(null);

// 获取文章内容
const getActicle = async () => {
	if (!id.value) return;

	const { data } = await getActicleById(id.value);
	acticle.value = data.data;
};
getActicle();

// 监听页面 id 的变化
watch(
	() => route.params,
	(newURL) => {
		// 如果变化后不是当前页面，就不执行
		if (!route.path.startsWith("/article")) {
			return;
		}

		id.value = Number(newURL.id);
		getActicle();
	}
);
</script>

<style scoped>
.container {
	background-color: #ffffffaa;
	backdrop-filter: blur(5px);
	padding: 8px;
}
.md {
	--md-bg-color: transparent;
}
.title-operate-area {
	display: flex;
	justify-content: flex-end;
}
</style>
