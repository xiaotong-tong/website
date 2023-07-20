<template>
	<!-- nami_live2d.js 文件中的捕获鼠标位置是 canvas.closest(".live2d-wrapper, html") 这种代码捕获的
		所以这里必须使用 live2d-wrapper 包裹，否则鼠标移动到 canvas 之外的区域时，模型会跟着移动
		当前模型在鼠标较远时转向角度过大，所以作此调整。如果模型在外屏范围内转向角度设置正常的话，可以不用这个包裹
		没钱优化模型，只能这样了
	-->
	<section class="live2d-wrapper">
		<canvas id="live2d" width="170" height="370" class="live2d"></canvas>

		<div class="icon-hover-wrap">
			<div class="icon-wrap">
				<slot name="icon"></slot>
			</div>
		</div>
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
	pointer-events: none;
}
.live2d {
	position: absolute;
	left: 8px;
	bottom: -75px;
}

.icon-hover-wrap {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 200px;
	height: 350px;
	pointer-events: auto;
	display: flex;
	justify-content: flex-end;
}

.icon-wrap {
	display: none;
	width: 30px;
	margin-block-start: 40px;
	margin-inline-end: 10px;
	flex-wrap: wrap;
	flex-direction: column;
	gap: 8px;
	font-size: 24px;
	transition: all 0.3s;
}

.icon-hover-wrap:hover .icon-wrap {
	display: flex;
}
</style>
