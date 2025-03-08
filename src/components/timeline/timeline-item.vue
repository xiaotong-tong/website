<template>
	<div
		:class="{
			'timeline-item': true,
			small: width < 600
		}"
		:style="{
			'--opposite-width': typeof oppositeWidth === 'number' ? `${oppositeWidth}px` : oppositeWidth
		}"
		ref="itemRef"
	>
		<div class="timeline-item-body" v-if="$slots.body">
			<FieldsetCard class="card">
				<slot name="body"></slot>
			</FieldsetCard>

			<!-- <div class="arrow"></div> -->
		</div>
		<div class="timeline-item-divider" ref="dividerRef">
			<template v-if="$slots.divider">
				<slot name="divider"></slot>
			</template>
			<template v-else>
				<namiIcon class="catIcon" :icon="group ? 'mdiCat' : 'mdiPaw'"></namiIcon>
			</template>
		</div>
		<div class="timeline-item-opposite" :style="oppositeStyle" v-if="$slots.opposite">
			<slot name="opposite" :small="width < 600"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";
import { useTemplateRef } from "vue";
import { FieldsetCard } from "@c/index";
import { useElementSize } from "@vueuse/core";

interface Props {
	group?: boolean;
	oppositeStyle?: StyleValue;
	oppositeWidth?: string | number;
}
const { group = false, oppositeStyle, oppositeWidth = "1fr" } = defineProps<Props>();

const itemRef = useTemplateRef<HTMLDivElement>("itemRef");

const { width } = useElementSize(itemRef);
</script>

<style scoped>
.timeline-item {
	--itemline-item-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
		0 1px 5px 0 rgba(0, 0, 0, 0.12);
	--itemline-item-arrow-border-color: #ddd;
}
.theme-dark .timeline-item {
	--itemline-item-box-shadow: 0 3px 1px -2px rgba(255, 255, 255, 0.2), 0 2px 2px 0 rgba(255, 255, 255, 0.14),
		0 1px 5px 0 rgba(255, 255, 255, 0.12);
	--itemline-item-arrow-border-color: #666;
}
.theme-transparent .timeline-item {
	--itemline-item-arrow-border-color: #88888888;
}

.timeline-item {
	display: grid;
	grid-template-areas: "opposite divider body";
	grid-template-columns: var(--opposite-width, 1fr) 48px 1fr;
	position: relative;
	padding-block-end: 24px;
	align-items: center;

	.timeline-item-opposite {
		grid-area: opposite;
		text-align: right;
	}
}
.timeline-item:not(:has(> .timeline-item-opposite)) {
	grid-template-areas: "divider body";
	grid-template-columns: 48px 1fr;
}

.timeline-item.small {
	grid-template-areas: "divider opposite" "divider body";
	grid-template-columns: 48px 1fr;

	.timeline-item-opposite {
		text-align: left;
	}
}

.timeline-item-divider {
	display: flex;
	justify-content: center;
	align-items: center;
	grid-area: divider;
}
.timeline-item-body {
	position: relative;
	height: 100%;
	grid-area: body;

	& > .card {
		width: 100%;
		max-width: 100%;
	}
}

.arrow {
	position: absolute;
	box-sizing: border-box;
	left: 0;
	top: calc(50% - 8px);
	width: 16px;
	height: 16px;
	border: 1px solid var(--itemline-item-arrow-border-color);
	background-color: var(--main-bg-color);
	transform-origin: center;
	transform: translate(-50%) rotate(45deg);
	/* 上三角形 */
	/* clip-path: polygon(0 0, 0 100%, 100% 0); */
	/* 下三角形 */
	/* clip-path: polygon(0 100%, 100% 100%, 100% 0); */
	/* 右三角形 */
	/* clip-path: polygon(100% 100%, 100% 0, 0 0); */
	/* 左三角形 */
	clip-path: polygon(100% 100%, 0 100%, 0 0);
}

.catIcon {
	font-size: 24px;
}
.timeline-item:hover .catIcon {
	color: #f34159;
}
</style>
