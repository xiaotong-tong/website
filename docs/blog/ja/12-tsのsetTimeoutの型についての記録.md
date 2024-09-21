---
title: tsのsetTimeoutの型についての記録
author: 星川漣
createDate: 2024-09-21
updateDate: 2024-09-21
tags: typeScript,setTimeout
abstract: tsのsetTimeoutの型についての記録
---

ts で setTimeout に number 型を直接指定することはできません。例えば `const timer: number = setTimeout(() => {}, 0);` とすると、エラーが発生します。`型'Timeout'を型'number'に割り当てることはできません。ts(2322)` というエラーです。

これは Node.js で setTimeout が Timeout 型のオブジェクトを返すためです。number 型ではありません。解決策は NodeJS.Timeout 型を指定することです。`const timer: NodeJS.Timeout = setTimeout(() => {}, 0);` とします。これでエラーが発生しなくなります。

> setTimeout の戻り値についてはこちらを参照してください： https://nodejs.org/api/timers.html#settimeoutcallback-delay-args

しかし、これは Node.js 環境の話です。ブラウザ環境では、setTimeout の戻り値は timeoutID であり、number 型の正の整数です。Timeout 型のオブジェクトではありません。この場合、window.setTimeout を使用すると、number 型に正しく型指定できます。`const timer: number = window.setTimeout(() => {}, 0);` とします。

> setTimeout の戻り値についてはこちらを参照してください： https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
