<template>
	<xtt-web-bg
		src="http://image.xtt.moe/images/2023/07/18/b885910a19d8bc3eed2c5e98828ba61ea8d34544.jpg"
	></xtt-web-bg>
	<kanbanarea>
		<template #icon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiHomeOutline"
				data-xtt-tooltip="blog 首页"
				@click="router.push('/blog')"
			></namiIcon>
			<namiIcon
				:ref="appendIcon"
				class="icon"
				icon="mdiEmailOpenHeartOutline"
				data-xtt-tooltip="私密服务"
				@click="verifyLogin"
			></namiIcon>
			<namiIcon
				v-if="store.loginUid"
				:ref="appendIcon"
				class="icon"
				icon="mdiBookEditOutline"
				data-xtt-tooltip="新增 blog"
				@click="router.push('/blog/editor/add')"
			></namiIcon>
		</template>
	</kanbanarea>

	<xtt-tooltip ref="iconTooltip">default value</xtt-tooltip>

	<main class="main">
		<RouterView />
	</main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import kanbanarea from "../components/live2d/kanbanarea.vue";
import { verifyMasterUid } from "../api/blog/verify.js";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index.js";
const store = useStore();
const router = useRouter();

const iconTooltip = ref(null);

const icons = [];

const appendIcon = (icon) => {
	icons.push(icon?.$el);
};

onMounted(() => {
	iconTooltip.value.initTrigger(icons);
});

const verifyLogin = async () => {
	const pw = window.prompt("请输入主人口令");
	if (pw) {
		const { data } = await verifyMasterUid(pw);
		if (data.value === "success") {
			store.loginUid = pw;
			localStorage.setItem("loginUid", pw);
		} else {
			alert("口令错误");
		}
	}
};
</script>

<style scoped>
.main {
	width: min(1000px, 100%);
	margin: 0 auto;
}

.icon {
	cursor: pointer;
}
</style>
