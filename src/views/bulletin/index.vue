<template>
	<namiHeader v-if="!store.isSmallScreen"></namiHeader>
	<namiMHeader v-else></namiMHeader>

	<section class="page">
		<div class="bulletin-bg bulletin-bg-01"></div>
		<div
			class="editor-area"
			ref="editorRef"
			:style="{
				transform: `translate(${x}px, ${y}px)`
			}"
		>
			<div class="drag-area" ref="dragRef">
				<BaseIcon icon="mdiCursorMove"></BaseIcon>
				<span>发布后不会显示拖动区</span>
				<BaseIcon icon="mdiCursorMove"></BaseIcon>
			</div>
			<LineCard
				:color="editorBorderColor"
				v-model:width="editorWidth"
				v-model:height="editorHeight"
				v-model:value="editorContent"
				:bgColor="editorBgColor"
				:resizeable="true"
				:borderSize="editorBorderSize"
				:style="{
					color: editorColor
				}"
			>
				<TextArea v-model="editorContent" :fullSize="true" :transparent="true"></TextArea>
			</LineCard>
			<div class="action-area">
				<NButton block type="primary" @click="submit">发布</NButton>
				<div>背景颜色</div>
				<NColorPicker :modes="['hex']" v-model:value="editorBgColor"></NColorPicker>
				<div>文字颜色</div>
				<NColorPicker :modes="['hex']" v-model:value="editorColor"></NColorPicker>
				<div>边框颜色</div>
				<NColorPicker :modes="['hex']" v-model:value="editorBorderColor"></NColorPicker>
				<div>边框粗细</div>
				<NInputNumber v-model:value="editorBorderSize" size="small" :min="1" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import namiHeader from "@/components/page/header/header.vue";
import namiMHeader from "@/components/page/header/m-header.vue";
import { useStore } from "@/stores/index";
import { LineCard, BaseIcon, TextArea } from "@c/index";
import { useDraggable } from "@vueuse/core";
import { NColorPicker, NInputNumber, NButton, NInput } from "naive-ui";

const store = useStore();
const editorBorderColor = ref("#000000");
const editorWidth = ref(300);
const editorHeight = ref(200);
const editorBgColor = ref("#ffffff");
const editorColor = ref("#000000");
const editorBorderSize = ref(1);
const editorContent = ref("");

const editorRef = ref();
const dragRef = ref();
const { x, y } = useDraggable(editorRef, {
	initialValue: { x: 40, y: 60 },
	preventDefault: true,
	handle: dragRef
});

function submit() {
	const body = {
		x: x.value,
		y: y.value,
		width: editorWidth.value,
		height: editorHeight.value,
		content: editorContent.value,
		type: 1,
		theme: {
			bgColor: editorBgColor.value,
			color: editorColor.value,
			borderColor: editorBorderColor.value,
			borderSize: editorBorderSize.value
		}
	};
	console.log(body);
}
</script>

<style scoped>
.page {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.bulletin-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
.bulletin-bg-01 {
	background-image: url("https://data.xtt.moe/bulletin-01.webp");
}

.editor-area {
	width: fit-content;
	height: fit-content;

	.drag-area {
		width: 100%;
		height: 16px;
		cursor: move;
		background-color: #fae8f577;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 8px;
		color: #000;
		font-size: 12px;
	}

	.action-area {
		position: absolute;
		top: 0;
		right: 0;
		width: 100px;
		transform: translateX(calc(100% + 4px));
		background-color: #fff;
	}
}
</style>
