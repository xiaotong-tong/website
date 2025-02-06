<template>
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
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { LineCard, BaseIcon, TextArea, useMessage } from "@c/index";
import { useDraggable } from "@vueuse/core";
import { NColorPicker, NInputNumber, NButton } from "naive-ui";
import { type BulletinGroup } from "../api";

interface Props {
	containerRef?: HTMLElement;
	bulletin: BulletinGroup;
}
const { containerRef, bulletin } = defineProps<Props>();

const message = useMessage();

const editorBorderColor = ref("#000000");
const editorWidth = ref(300);
const editorHeight = ref(200);
const editorBgColor = ref("#fae8f577");
const editorColor = ref("#000000");
const editorBorderSize = ref(1);
const editorContent = ref("");

const editorRef = ref();
const dragRef = ref();
const { x, y } = useDraggable(editorRef, {
	initialValue: { x: 40, y: 60 },
	preventDefault: true,
	handle: dragRef,
	containerElement() {
		return containerRef;
	},
	onMove(position) {
		if (position.x + editorWidth.value > bulletin.width) {
			x.value = bulletin.width - editorWidth.value;
		}
		if (position.y + editorHeight.value > bulletin.height) {
			y.value = bulletin.height - editorHeight.value;
		}
	}
});

async function submit() {
	const body = {
		x: x.value,
		y: y.value,
		width: editorWidth.value,
		height: editorHeight.value,
		content: editorContent.value,
		type: 1,
		groupId: bulletin.id,
		theme: {
			bgColor: editorBgColor.value,
			color: editorColor.value,
			borderColor: editorBorderColor.value,
			borderSize: editorBorderSize.value
		}
	};

	// https://api.xtt.moe/bulletin/add
	fetch("http://localhost:5001/bulletin/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})
		.then((res) => res.json())
		.then(() => {
			message.success("发布成功");
		})
		.catch(() => {
			message.error("发布失败");
		});
}

watch(
	() => bulletin,
	() => {
		x.value = 40;
		y.value = 60;
	}
);
</script>

<style scoped>
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
