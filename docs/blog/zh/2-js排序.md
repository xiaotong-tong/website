---
title: js排序
author: 小恸恸
createDate: 2023-07-18
updateDate: 2024-09-13
category: 网络互联
tags: 快速排序,冒泡排序
thumbnail: https://image.xtt.moe/images/177.md.webp
abstract: 本文主要讲解了快速排序和冒泡排序
nextId: 4
nextTitle: js function length 属性
---

## 快速排序

快速排序就是在一个数组中选择一个基准数值，为了方便理解一般选择数组中间的数值，然后循环数组，将小于基数的数值放在基数的左边，大于基数的数值放在基数的右边。然后将左右两边的数值同时重复以上操作，就能够实现从小到大的排序。

快速排序是最常用的一种排序方式，因为它的时间复杂度较之其它的排序方式更低。具体代码如下

```js
function quicksort(arr) {
	// 如果数组中数值的数量小于等于1，说明这个数组已经完成排序，直接返回该数组。
	if (arr.length <= 1) {
		return arr;
	}
	const index = Math.floor(arr.length / 2); // 数组的中间值的索引
	const pivot = arr.splice(index, 1)[0]; // 数组的中间值 也就是排序的基数
	const left = []; // 用来保存小于基数部分的数组
	const right = []; // 用来保存大于基数部分的数组
	// 循环遍历数组，如果小于基数就追加到左半部分，如果大于基数就追加到右半部分
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	// 通过递归调用的方式，返回排序之后的数值，同时使用扩展运算符展开并拼接数组
	return [...quicksort(left), pivot, ...quicksort(right)];
}

// 使用第一个元素为基数可以简化代码空间
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

## 冒泡排序

冒泡排序就是从第一个数开始遍历，遇到小的位置不变继续向下循环，遇到大的则交换位置后再往下循环，因为是一层一层的从前往后遍历，看起来就像冒泡一样，所以称为冒泡排序。

```js
function buttlesort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let flag = true; // 定义一个节流阀，当节流阀为true时，即表示当前循环无需交换位置，也代表着已经完成排序。
		for (let j = 0; j < arr.length - 1 - i; j++) {
			// 此处因为当i交换到最后一位时，即代表它为当前数组的最大值，下次循环时无需再和它交换。
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
