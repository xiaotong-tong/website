<template>
	<div :class="['time-line', props.contentAlign]">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		contentAlign?: string;
	}>(),
	{
		contentAlign: "left"
	}
);
</script>

<style scoped>
.time-line {
	--time-line-line-color: #ddd;
}
.theme-dark .time-line {
	--time-line-line-color: #555;
}

.time-line {
	position: relative;
	padding-block: 24px;
}
.time-line::before {
	content: "";
	position: absolute;
	top: 0;
	bottom: 0;
	width: 2px;
	height: 100%;
	background-color: var(--time-line-line-color);
}
.time-line:not(.center) :deep(.timeline-item-opposite) {
	display: none;
}

.time-line.left::before {
	/* 24px - 1px */
	/* 24px 是 timeline-item-divider 的宽 */
	left: 23px;
}
.time-line.left :deep(.timeline-item-divider) {
	order: 1;
}
.time-line.left :deep(.timeline-item-body) {
	order: 2;
}

.time-line.right::before {
	right: calc(48px - 1px);
}
.time-line.right :deep(.timeline-item) {
	flex-direction: row-reverse;
}
.time-line.right :deep(.timeline-item-divider) {
	order: 1;
}
.time-line.right :deep(.timeline-item-body) {
	order: 2;
}
.time-line.right :deep(.arrow) {
	left: unset;
	right: -16px;
	clip-path: polygon(100% 100%, 100% 0, 0 0);
}

.time-line.center::before {
	left: calc(50% - 1px);
}
.time-line.center :deep(.timeline-item-opposite) {
	order: 1;
}
.time-line.center :deep(.timeline-item-divider) {
	order: 2;
}
.time-line.center :deep(.timeline-item-body) {
	order: 3;
}
.time-line.center :deep(.arrow) {
	left: unset;
	right: -16px;
	clip-path: polygon(100% 100%, 100% 0, 0 0);
}
/* .time-line.center :deep(.timeline-item):nth-of-type(2n) {
	flex-direction: row-reverse;
}
.time-line.center :deep(.timeline-item):nth-of-type(2n) .arrow {
	left: 0;
	right: unset;
	clip-path: polygon(100% 100%, 0 100%, 0 0);
} */
/* .time-line.center :deep(.timeline-item):nth-of-type(2n) .timeline-item-opposite {
	justify-content: end;
} */
</style>
