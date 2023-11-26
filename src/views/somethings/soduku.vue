<template>
	<section class="container web-color-default">
		<h1 class="text-center">数独游戏</h1>
		<div class="soduku-box">
			<template v-for="(row, rIndex) in soduku">
				<div
					v-for="(col, cIndex) in row"
					class="soduku-cell"
					:grid="rIndex + '-' + cIndex"
					:contenteditable="col.editable"
					@input="inputEvent($event as InputEvent)"
				>
					{{ col.value === 0 ? "" : col.value }}
				</div>
			</template>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { generateSoduku, isValidSodukuBoard, random } from "xtt-utils";

document.title = "数独游戏 - 星川漣の家";

const soduku = ref(
	generateSoduku(random(20, 60)).map((row) => {
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
	soduku.value[Number(rIndex)][Number(cIndex)].value = Number(target.innerText) || 0;

	// 判断是否完成
	let isFinish = true;
	for (let i = 0; i < soduku.value.length; i++) {
		for (let j = 0; j < soduku.value[i].length; j++) {
			if (!soduku.value[i][j].value) {
				isFinish = false;
				break;
			}
		}
	}

	if (isFinish) {
		// 如果格子全部填满，判断是否符合正确结果
		if (isValidSodukuBoard(soduku.value.map((row) => row.map((col) => col.value)))) {
			alert("恭喜你，完成了数独游戏！");
		}
	}
};
</script>

<style scoped>
.soduku-box {
	display: grid;
	width: 360px;
	height: 360px;
	grid-template-columns: repeat(9, 1fr);
	grid-template-rows: repeat(9, 1fr);
}

.soduku-cell {
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	line-height: 40px;
	box-sizing: border-box;
	border-block-start: thin solid #000;
	border-inline-start: thin solid #000;
}
.soduku-cell:nth-child(9n) {
	border-inline-end: thin solid #000;
}
.soduku-cell:nth-child(n + 73) {
	border-block-end: thin solid #000;
}

.soduku-cell[contenteditable="true"] {
	outline: none;
	color: rgb(51, 192, 74);
}
.soduku-cell[contenteditable="true"]:not(:empty) {
	background-color: #f2f2f2;
}
</style>
