<template>
	<div class="title-operate-area">
		<xtt-button v-if="store.loginUid" type="primary" @click="router.push('/editor/edit/' + id)"
			>编辑</xtt-button
		>
	</div>
	<section class="container">
		<h2>
			{{ acticle.title }}
		</h2>
		<p>
			发布于<span>{{ acticle.createDate }}</span>

			&nbsp;&nbsp;&nbsp; # {{ acticle.category }}
		</p>

		<xtt-markdown class="md">{{ acticle.content }}</xtt-markdown>
	</section>
</template>

<script setup>
import { ref, watch } from "vue";
import { getActicleById } from "@/api/blog/blog.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/index.js";
const store = useStore();
const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);
const acticle = ref({});

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
		id.value = newURL.id;
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
