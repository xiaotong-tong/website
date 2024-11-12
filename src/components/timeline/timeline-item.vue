<template>
	<div
		:class="{
			'timeline-item': true,
			simple: props.simple
		}"
		:style="{
			height: 'calc-size(auto, min(size, 500px))'
		}"
	>
		<div class="timeline-item-body">
			<FieldsetCard
				class="card"
				:style="{
					height: 'calc-size(auto, min(size, 500px))'
				}"
			>
				<slot name="body"></slot>
			</FieldsetCard>

			<div class="arrow" v-if="!props.simple"></div>
		</div>
		<div class="timeline-item-divider">
			<template v-if="$slots.divider">
				<slot name="divider"></slot>
			</template>
			<template v-else>
				<namiIcon class="catIcon" :icon="props.group ? 'mdiCat' : 'mdiPaw'"></namiIcon>
			</template>
		</div>
		<div class="timeline-item-opposite">
			<slot name="opposite"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { FieldsetCard } from "@c/index";

const props = withDefaults(
	defineProps<{
		simple?: boolean;
		group?: boolean;
		maxHeight?: string;
	}>(),
	{
		simple: true,
		group: false,
		maxHeight: "500px"
	}
);
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
	display: flex;
	position: relative;
	padding-block-end: 24px;
	align-items: center;
}
.timeline-item-divider {
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 48px;
}
.timeline-item-body {
	position: relative;
	max-width: calc(100% - 48px);
	height: 100%;
	flex: 1;
	border-radius: 4px;
	align-content: center;

	& > .card {
		width: 100%;
		max-width: 100%;
	}
}
.timeline-item:not(.simple) .timeline-item-body {
	box-shadow: var(--itemline-item-box-shadow);
}
.timeline-item-opposite {
	flex: 1;
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
