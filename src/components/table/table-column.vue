<template>
	<div class="row">
		<slot :row="props.row" v-if="$slots.default"></slot>
		<span v-else>{{ contentByProp }}</span>
	</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

interface Props {
	prop?: string;
	row?: any;
	width?: string;
}
const props = withDefaults(defineProps<Props>(), {
	prop: "",
	row: () => ({})
});

const contentByProp = ref("");

watchEffect(() => {
	contentByProp.value = props.row?.[props.prop];
});
</script>

<style></style>
