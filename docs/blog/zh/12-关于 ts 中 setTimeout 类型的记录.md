---
title: 关于 ts 中 setTimeout 类型的记录
author: 小恸恸
createDate: 2023-08-14
updateDate: 2024-09-21
tags: typeScript,setTimeout
abstract: 关于 ts 中 setTimeout 类型的记录
---

ts 中不能直接为 setTimeout 标注 number 类型。如 `const timer: number = setTimeout(() => {}, 0);` 会有 `不能将类型“Timeout”分配给类型“number”。ts(2322)` 报错。

这是因为 Node.js 中的 setTimeout 返回的是一个 Timeout 类型的对象，而不是 number 类型。解决方法是将类型标注为 NodeJS.Timeout 类型。`const timer: NodeJS.Timeout = setTimeout(() => {}, 0);`。这样就不会报错了。

> setTimeout 返回值详见： https://nodejs.org/api/timers.html#settimeoutcallback-delay-args

但是这是 Node.js 环境，如果是浏览器环境，那么 setTimeout 返回值是 timeoutID ，是一个 number 类型的正整数，而不是 Timeout 类型的对象。此时使用 window.setTimeout 调用，就能正确的将类型标注为 number 类型。`const timer: number = window.setTimeout(() => {}, 0);`。

> setTimeout 返回值详见： https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
