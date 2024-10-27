---
title: jsでのソート
author: 星川漣
createDate: 2024-09-13
category: ウェブ
tags: クイックソート,バブルソート
thumbnail: https://image.xtt.moe/images/177.md.webp
abstract: クイックソートとバブルソートについて記録します
---

## クイックソート

クイックソートは、配列の中からピボットを選び、通常は配列の中央の値を選択します。そして、それを基準として配列をループし、ピボット未満の値をピボットの左側に、ピボットより大きい値をピボットの右側に二分する。そして、左右の値を同時に上記の操作を繰り返すことで。

クイックソートが他のソート方法よりも時間計算量が低いため、一般的に使用されています。javascript のコードは以下の通りです。

```js
function quicksort(arr) {
	// 配列の長さが1以下の場合、すでにソートされているため、そのまま返します。
	if (arr.length <= 1) {
		return arr;
	}
	const index = Math.floor(arr.length / 2); // 配列の中央値のインデックス
	const pivot = arr.splice(index, 1)[0]; // 配列の中央値をピボットとする
	const left = []; // ピボット未満の値
	const right = []; // ピボットより大きい値
	// 配列をループし、ピボット未満の値をleftに、ピボットより大きい値をrightに追加します。
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	// 分割されたデータ列を再帰的にソートし、スプレッド演算子を使用して配列を展開して結合します。
	return [...quicksort(left), pivot, ...quicksort(right)];
}

// ピボットとして最初の要素を使用することで、コードスペースを簡素化できます。
function sort(num) {
	if (num.length <= 1) {
		return num;
	}
	let index = num.shift(),
		left = [],
		right = [];
	num.forEach((val) => (val > index ? right.push(val) : left.push(val)));
	return [...sort(left), index, ...sort(right)];
}
```

## バブルソート

バブルソートは、最初の数値から、二つの数値を比較し、小さいの数値は左、大きいの数値は右。そして、次の数値と比較し、同じ操作を繰り返して進みます。一層一層前から後ろにループするため、バブルのように見えるため、バブルソートと呼ばれます。

```js
function buttlesort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let flag = true; // フラグを定義し、フラグがtrueの場合、現在のループは位置を交換する必要がない、ソートが完了したことを示します。
		for (let j = 0; j < arr.length - 1 - i; j++) {
			// ここでは、iが最後の位置に交換された場合、それは現在の配列の最大値であり、次のループではそれと交換する必要がありません。
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				flag = false;
			}
		}
		if (flag) {
			break;
		}
	}
	return arr;
}
```
