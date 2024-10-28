---
title: js function length プロパティ
author: 星川漣
createDate: 2024-09-14
category: エッセイ
tags: function
thumbnail: https://image.xtt.moe/local/images/2024/09/14/0c9de0473b4cfceaf2e386893409125b.jpg
abstract: 関数の length プロパティは、関数が受け取る引数の数を表します
prevId: 2
prevTitle: jsでのソート
nextId: 6
nextTitle: データベース基礎の学ぶ
---

**関数の length プロパティは、関数が受け取る引数の数を表します**

例えば `(function fn(a, b){}).length` の戻り値は 2 です。これは、関数の引数の数が 2 つであるため

**es6 のデフォルト引数と残余引数は length の計算方法を変更します**

例えば： `(function fn(a, b = 2){}).length` の戻り値は 1 です。また、デフォルト引数の後ろの引数も length プロパティには含まれません。つまり、`(function fn(a, b = 2, c){}).length` の戻り値も 1 です。

残余引数も同じ。 `(function fn(a, ...b){}).length` の戻り値は 1。

> 残余引数には `(function fn(a, ...b, c){}).length` のような形式は存在しません。なぜなら、残余引数は最後の引数でなければなりません、そうでない場合はエラーになります
