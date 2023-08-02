<template>
	<div ref="table" class="table">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";

const props = defineProps({
	to: {
		type: String,
		default: "#"
	}
});
</script>

<style></style>
