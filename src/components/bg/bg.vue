<script setup>
import { ref, onMounted } from "vue";
import { fileToB64, b64ToBlob } from "xtt-utils";

const props = defineProps({
	defalutImg: String,
	alwaysShowDefaluteImg: Boolean,
	noMark: Boolean
});
const bgEl = ref(null);

onMounted(async () => {
	// 如果父组件通信有 defalutImg 值或者 localStorage 中有 bg 项，就将值赋值给 --bg-url css自定义属性
	const localBg = localStorage.getItem("bg");
	let url = props.defalutImg;
	if (localBg && props.alwaysShowDefaluteImg !== true) {
		const blob = await b64ToBlob(localBg);
		url = URL.createObjectURL(blob);
	}
	document.documentElement.style.setProperty("--bg-url", `url(${url})`);

	if (props.alwaysShowDefaluteImg !== true) {
		// 当拖拽到元素上会触发 dragover 事件，此处需要阻止事件的默认行为
		document.addEventListener("dragover", (event) => event.preventDefault(), false);
		// 当拖拽到元素上并释放时会触发 drop 事件
		document.addEventListener("drop", (event) => {
			const file = event.dataTransfer.files[0];

			document.documentElement.style.setProperty(
				"--bg-url",
				`url(${URL.createObjectURL(file)})`
			);

			if (file?.type.includes("image")) {
				fileToB64(file).then((b64) => {
					localStorage.setItem("bg", b64);
				});
			}
			event.preventDefault();
		});
	}
});
</script>

<template>
	<div class="bg" aria-hidden="true" ref="bgEl"></div>
</template>

<style scoped>
.bg {
	position: fixed;
	inset: 0;
	opacity: 0.6;
	background-image: var(--bg-url, url(/images/bg.jpg));
	background-size: cover;
	background-position: center;
	z-index: -9;
}
</style>
