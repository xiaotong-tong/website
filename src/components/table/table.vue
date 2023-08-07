<template>
	<div ref="table" class="table">
		<template v-if="props.data?.length && colCount">
			<div v-for="item in columnSlot">
				<span>{{ item.props?.label }}</span>
			</div>
			<template v-for="row in props.data">
				<template v-for="cindex in colCount" :key="cindex">
					<component :is="tableCellComponents(cindex - 1, row)"></component>
				</template>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useSlots, ref, defineComponent, h } from "vue";

const slots = useSlots();

interface Props {
	data: any[];
}
const props = withDefaults(defineProps<Props>(), {
	data: () => []
});

const colCount = ref(0);

const columnSlot = slots.default?.();

colCount.value = columnSlot?.length || 0;

let girdTemplateColumns = "";
columnSlot?.forEach((item: any) => {
	girdTemplateColumns += (item.props?.width || "auto") + " ";
});
girdTemplateColumns = girdTemplateColumns.trim();

const tableCellComponents = (i: number, row: any): any => {
	return defineComponent({
		props: (columnSlot?.[i] as any)?.type.props,
		render() {
			return h("div", [columnSlot?.[i]]);
		},
		setup() {
			return () => {
				const res = columnSlot?.[i];
				(res as any).props.row = row;
				return res;
			};
		}
	});
};
</script>

<style scoped>
.table {
	display: grid;
	grid-template-columns: v-bind(girdTemplateColumns);
	row-gap: 8px;
}
</style>
