<template>
	<xtt-link ref="link" class="link" :href="props.to" @click="linkClickEvent">
		<slot></slot>
	</xtt-link>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
	to: {
		type: String,
		default: ""
	}
});

const link = ref<HTMLAnchorElement | null>(null);

const linkClickEvent = (ev: MouseEvent) => {
	// 如果 to 属性为空，则不进行任何操作
	if (props.to === "") {
		ev.preventDefault();
		return;
	}

	// 如果在点击时 ctrl 键被按下，则在新的标签页中打开链接
	if (ev.ctrlKey) {
		window.open(props.to, "_blank");
		ev.preventDefault();
		return;
	}

	// 如果 link 的 origin 与当前页面的 origin 相同，则表示即将跳转的页面与当前页面同源，那么就使用 vue-router 进行跳转
	if (link.value?.origin === location.origin) {
		router.push(props.to);
		ev.preventDefault();
	}
};
</script>

<style></style>
