<template>
	<!-- nami_live2d.js 文件中的捕获鼠标位置是 canvas.closest(".live2d-wrapper, html") 这种代码捕获的
		所以这里必须使用 live2d-wrapper 包裹，否则鼠标移动到 canvas 之外的区域时，模型会跟着移动
		当前模型在鼠标较远时转向角度过大，所以作此调整。如果模型在外屏范围内转向角度设置正常的话，可以不用这个包裹
		没钱优化模型，只能这样了
	-->
	<section class="live2d-wrapper" v-show="live2dLoaded">
		<canvas id="live2d" width="170" height="370" class="live2d"></canvas>

		<div class="icon-hover-wrap">
			<div class="icon-wrap">
				<slot name="icon"></slot>
			</div>
		</div>

		<namiChatBox ref="chatBox"></namiChatBox>
	</section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import namiChatBox from "@/components/live2d/chatbox.vue";

const live2dLoaded = ref(false);

const loadModel = (resourcePath: string, modelNames: string[]) => {
	live2dLoader.resourcesConfig.setResourcesPath(resourcePath);
	live2dLoader.resourcesConfig.setModelNames(modelNames);
	live2dLoader.start();
};

onMounted(() => {
	// live2d 相关的文件过大，在首页加载会影响首页加载速度，所以在首页加载完成后再加载 live2d 相关文件
	const live2dCubismcoreScript = document.createElement("script");
	live2dCubismcoreScript.src = "/live2d/js/live2dcubismcore.min.js";
	live2dCubismcoreScript.async = true;

	live2dCubismcoreScript.onload = () => {
		const live2dScript = document.createElement("script");
		live2dScript.src = "/live2d/js/nami_live2d.js";
		live2dScript.async = true;

		live2dScript.onload = () => {
			loadModel("/live2d/models/", ["nami"]);

			live2dLoaded.value = true;
		};

		document.body.appendChild(live2dScript);
	};

	document.body.appendChild(live2dCubismcoreScript);
});

const chatBox = ref<InstanceType<typeof namiChatBox>>();

const showChatBox = (msg: string, hideDelay: number = 5000) => {
	chatBox.value?.showChatBox(msg, hideDelay);
};

defineExpose({
	showChatBox
});
</script>

<style scoped>
.live2d-wrapper {
	position: fixed;
	left: 0;
	bottom: 65px;
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
