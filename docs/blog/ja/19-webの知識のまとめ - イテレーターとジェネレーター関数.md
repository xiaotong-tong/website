---
title: webの知識のまとめ - イテレーターとジェネレーター関数
author: 星川漣
createDate: 2024-09-21
category: ウェブ
tags: Iterator,Generator
abstract: es6でのイテレーターとジェネレーター関数に関する知識について説明します。
prevId: 17
prevTitle: 星について
nextId: 20
nextTitle: webの知識のまとめ - 関数
---

## 1. ジェネレーター関数

function\* という方法を使用して、ジェネレーター関数を定義し、ジェネレーター関数の戻り値はイテレーターです。

例えば：

```js
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
	for (let i = start; i < end; i += step) {
		yield i;
	}
}
var a = makeRangeIterator(1, 10, 2); // a はイテレーターオブジェクトです
a.next(); // {value: 1, done: false}
a.next(); // {value: 3, done: false}
a.next(); // {value: 5, done: false}
a.next(); // {value: 7, done: false}
a.next(); // {value: 9, done: false}
a.next(); // {value: undefined, done: true}
```

最初の呼び出し時、ジェネレーター関数はコードを実行しませんが、イテレーターオブジェクトを戻ります。イテレーターの next() メソッドが最初（後続）に呼び出されると、ジェネレーター関数が実行され、最初の yield 式に遭遇するまで実行されます。その後、イテレーターの next() メソッドが呼び出されるたびに、ジェネレーター関数が実行され、再び yield 式に遭遇するまで実行されます。または、実行可能な yield 式がない場合、undefined が返され、done プロパティが true になります。

## 2. イテレーター

イテレーターは、次の値に逐次アクセスするためのオブジェクトであり、done が true になるまで、シーケンス内の各値に next() メソッドを使用できます。イテレーターシーケンス内のオブジェクトには、value と done の 2 つのプロパティがあります。value は現在のイテレーション値であり、done はイテレーションが完了したかどうかを示すブール値です。

## 3. 反復可能オブジェクト

反復可能プロトコルは、オブジェクトが反復されるとき（たとえば、for...of ループの場合）の反復動作を定義します。すべての反復可能オブジェクトは @@iterator プロパティを実装しており、このイテレーターを取得するために `[Symbol.iterator]()` を使用できます。

-   反復可能プロトコルをサポートするオブジェクト： String, Array, TypedArray, Map, Set, arguments, NodeList, Intl.Segments

> Object は反復可能プロトコルをサポートしていません。Object を反復可能プロトコルをサポートするようにするには、`[Symbol.iterator]` プロパティを手動で実装する必要があります。
>
> Object をループするため、`Object.entries | Object.keys | Object.values` メソッドを使用できます。

## 4. 非同期イテレーターと非同期反復可能プロトコル

非同期イテレーターと非同期反復可能プロトコル は イテレーターと反復可能プロトコルタイプと同じですが、イテレーターメソッドを呼び出した後の各戻り値は、promise オブジェクトでラップされています。

-   非同期イテレーターを取得するには、`[Symbol.asyncIterator]()` を使用する必要があります。
-   非同期イテレーターを反復するには、for await...of を使用する必要があります。
