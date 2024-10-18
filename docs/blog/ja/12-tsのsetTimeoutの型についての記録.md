---
title: tsのsetTimeoutの型についての記録
author: 星川漣
createDate: 2024-09-21
updateDate: 2024-09-21
tags: typeScript,setTimeout
abstract: tsのsetTimeoutの型についての記録
---

ts の中では　`const timer: number = setTimeout(() => {}, 0);`　のようなコードを書くと `型 'Timeout' を型 'number' に割り当てることはできません。ts(2322)` というエラーが発生してかもしれません。

setTimeout の戻り値は間違いなく number 型です、仕様は　 MDN を参照してください： https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

ならば、なぜエラーが発生するのでしょうか？それは Node.js とブラウザの違いと思います。Node.js では setTimeout の戻り値は Timeout 型のオブジェクトです。number 型ではありません。Node.js のドキュメントを見ると分かります。仕様のアクセスは　https://nodejs.org/api/timers.html#settimeoutcallback-delay-args

以上、NodeJS.Timeout 型を書ければエラーが発生しなくなります。`const timer: NodeJS.Timeout = setTimeout(() => {}, 0);` とします。

しかし、これは Node.js 環境の話です。ブラウザでちょうど似合わないです。ブラウザ環境では、setTimeout の戻り値は timeoutID であり、number 型の正の整数です。「window.」を省略しないで　`window.setTimeout` を使用すると、number 型に正しく指定できます。`const timer: number = window.setTimeout(() => {}, 0);` という書き方もエーラーがなくす。
