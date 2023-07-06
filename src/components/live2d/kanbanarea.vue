<template>
	<!-- nami_live2d.js 文件中的捕获鼠标位置是 canvas.closest(".live2d-wrapper, html") 这种代码捕获的
		所以这里必须使用 live2d-wrapper 包裹，否则鼠标移动到 canvas 之外的区域时，模型会跟着移动
	-->
	<section class="live2d-wrapper">
		<canvas id="live2d" width="170" height="370" class="live2d"></canvas>
	</section>
</template>

<script setup>
import { onMounted } from "vue";

const loadModel = (resourcePath, modelNames) => {
	live2dLoader.resourcesConfig.setResourcesPath(resourcePath);
	live2dLoader.resourcesConfig.setModelNames(modelNames);
	live2dLoader.start();
};

onMounted(() => {
	loadModel("/live2d/models/", ["nami"]);
});
</script>

<style scoped>
.live2d-wrapper {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 500px;
	height: 500px;
	z-index: 999;
}
.live2d {
	position: absolute;
	left: 8px;
	bottom: -75px;
}
</style>
