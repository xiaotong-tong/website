---
title: web の知識のまとめ-スプレッド構文と分割代入
author: 星川漣
createDate: 2023-11-12
category: ウェブ
tags: スプレッド構文, 分割代入
abstract: 本文はスプレッド構文と分割代入の基本構文と原理を紹介します。
prevId: 20
prevTitle: web の知識のまとめ-関数
nextId: 22
nextTitle: ごはんを食べよう 歌詞
---

## スプレッド構文

スプレッド構文は三つの使い方があります：関数呼び出し、Array、Object。

関数呼び出しや Array の場合、スプレッド構文の働きは同じです。iterator の値を順番に読み取り、関数の引数や新しい Array に渡します。

でも、Object の場合、スプレッド構文の展開アルゴリズムは少し違います。Object の列挙可能な key-value を読み取り、新しい Object にコピーします

```js
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
	for (let i = start; i < end; i += step) {
		yield i;
	}
}
const a = makeRangeIterator(1, 10, 2);
const b = [1, 2, 3];
const c = { a: 1 };

[...a]; // [1,3,5,7,9]
[...b]; // [1,2,3]
[...c]; // Uncaught TypeError: c is not iterable
// ここはArrayなので、iterator を読み取ります。Object は iterable ではないので、展開できません。

{...a}; // {}
{...b}; // {0: 1, 1:2, 2:3}
{...c}; // {a: 1}
// ここはObjectなので、key-value の形式で展開します。iterator は key-value の形式ではないので、展開できません、｛｝になります。Array　は　0　1　2　というkeyを持っているので、key-value の形式で展開します。（文字列も同じです）
```

## 分割代入

基本構文：

```js
const [a, b] = [1, 2];
const { a, b } = { a: 1, b: 2 };
```

分割代入も二つの使い方があります：1. Array の中で分割代入；2. Object の中で分割代入；

原理は大体スプレッド構文と同じです。

```js
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
	for (let i = start; i < end; i += step) {
		yield i;
	}
}
const a = makeRangeIterator(1, 10, 2);
const b = [1, 2, 3];
const c = { a: 1 };

const [q, w, e, r] = a; // 1 3 5 7
const [q, w, e] = b; // 1 2 3
const [q, w] = c; // Uncaught TypeError: c is not iterable
// Array の中で iterator の値を順番に読み取り、対応する変数に代入します。

const { q, w, e, r } = a; // all undefined
const { q, w, e } = b; // all undefined
const { a } = c; // 1
// Object　の中で　iterator を読み取りません。同じ　key を検索します、そして value　を変数に代入します。

const { 0: q, 1: w } = b; // 1 2
// もしObjectの中で　Array　を読み取りたい場合、keyを0,1,2...という形式で指定して、新しい変数名を指定してください。
```
