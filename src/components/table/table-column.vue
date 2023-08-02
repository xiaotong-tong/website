<template>
	<div class="cell">
		<!-- <template #default="scope" v-if="$slots.default">
			<slot :row="scope.row"></slot>
		</template> -->
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

interface Props {
	prop: string;
}
const props = withDefaults(defineProps<Props>(), {
	prop: ""
});
</script>

<style></style>
