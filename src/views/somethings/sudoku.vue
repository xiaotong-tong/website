<template>
	<section class="container web-color-default">
		<h1 class="text-center">
			{{ i18nStore.lang === "ja" ? "ナンプレ" : "数独游戏" }}
		</h1>
		<div class="sudoku-box">
			<template v-for="(row, rIndex) in sudoku">
				<div
					v-for="(col, cIndex) in row"
					class="sudoku-cell"
					:grid="rIndex + '-' + cIndex"
					:contenteditable="col.editable"
					@input="inputEvent($event as InputEvent)"
				>
					{{ col.value === 0 ? "" : col.value }}
				</div>
			</template>
		</div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="数独,数独游戏，ナンプレ" />
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { generateSudoku, isValidSudokuBoard, random } from "xtt-utils";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
const sudoku = ref(
	generateSudoku(random(20, 44)).map((row) => {
		return row.map((col) => {
			return {
				editable: col === 0,
				value: col
			};
		});
	})
);

const inputEvent = (e: InputEvent) => {
	const target = e.target as HTMLDivElement;

	if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(e.data))) {
		target.innerText = "";
		return;
	}

	const [rIndex, cIndex] = target.getAttribute("grid")!.split("-");
	target.innerText = e.data!;
	sudoku.value[Number(rIndex)][Number(cIndex)].value = Number(target.innerText) || 0;

	// 判断是否完成
	let isFinish = true;
	for (let i = 0; i < sudoku.value.length; i++) {
		for (let j = 0; j < sudoku.value[i].length; j++) {
			if (!sudoku.value[i][j].value) {
				isFinish = false;
				break;
			}
		}
	}

	if (isFinish) {
		// 如果格子全部填满，判断是否符合正确结果
		if (isValidSudokuBoard(sudoku.value.map((row) => row.map((col) => col.value)))) {
			alert(i18nStore.lang === "ja" ? "ゲームクリアおめでとう" : "恭喜你，完成了数独游戏！");
		}
	}
};
</script>

<style scoped>
.sudoku-box {
	display: grid;
	width: min(360px, 100%);
	aspect-ratio: 1 / 1;
	grid-template-columns: repeat(9, 1fr);
	grid-template-rows: repeat(9, 1fr);
}

.sudoku-cell {
	aspect-ratio: 1 / 1;
	min-width: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	line-height: 36px;
	box-sizing: border-box;
	border-block-start: thin solid #ccc;
	border-inline-start: thin solid #ccc;
}

.sudoku-cell:nth-child(-n + 9) {
	border-block-start: thin solid #000;
}
.sudoku-cell:nth-child(3n) {
	border-inline-end: thin solid #000;
}
.sudoku-cell:nth-child(9n + 1) {
	border-inline-start: thin solid #000;
}
.sudoku-cell:nth-child(n + 19):nth-child(-n + 27),
.sudoku-cell:nth-child(n + 46):nth-child(-n + 54),
.sudoku-cell:nth-child(n + 73) {
	border-block-end: thin solid #000;
}

.sudoku-cell[contenteditable="true"] {
	outline: none;
	color: rgb(51, 192, 74);
}
.sudoku-cell[contenteditable="true"]:not(:empty) {
	background-color: #f2f2f2;
}
</style>
