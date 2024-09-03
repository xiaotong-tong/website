<template>
	<cropper-canvas background class="cropper" ref="canvas">
		<cropper-image :src="props.src" :alt="props.alt" class="image" ref="image"></cropper-image>
		<cropper-shade hidden></cropper-shade>
		<cropper-handle action="select" plain></cropper-handle>
		<cropper-selection
			initial-coverage="0.5"
			aspect-ratio="1"
			movable
			resizable
			zoomable
			ref="selection"
		>
			<cropper-grid role="grid" covered></cropper-grid>
			<cropper-crosshair centered></cropper-crosshair>
			<cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
			<cropper-handle action="n-resize"></cropper-handle>
			<cropper-handle action="e-resize"></cropper-handle>
			<cropper-handle action="s-resize"></cropper-handle>
			<cropper-handle action="w-resize"></cropper-handle>
			<cropper-handle action="ne-resize"></cropper-handle>
			<cropper-handle action="nw-resize"></cropper-handle>
			<cropper-handle action="se-resize"></cropper-handle>
			<cropper-handle action="sw-resize"></cropper-handle>
		</cropper-selection>
	</cropper-canvas>
</template>

<script setup lang="ts">
import "cropperjs";
import { ref, onMounted } from "vue";

const props = withDefaults(
	defineProps<{
		src: string;
		alt?: string;
	}>(),
	{
		alt: "Picture"
	}
);

const canvas = ref<HTMLElement | null>(null);
const image = ref<HTMLElement | null>(null);
const selection = ref<HTMLElement | null>(null);

onMounted(() => {
	// canvas.value.addEventListener("actionend", (event: any) => {
	// 	console.log(event);
	// });
});

const resetImage = () => {
	(image.value as any)?.$center("contain");
};
const toFileOfBase64 = async () => {
	const canvas = await (selection.value as any)?.$toCanvas();

	return canvas.toDataURL("image/png");
};

defineExpose({
	resetImage,
	toFileOfBase64
});
</script>

<style scoped>
.cropper {
	min-height: 300px;
}
</style>
