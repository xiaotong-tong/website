---
title: js function length 属性
author: 小恸恸
createDate: 2023-07-21
updateDate: 2024-09-14
category: 喵随笔
tags: function
thumbnail: https://image.xtt.cool/local/images/2024/09/14/0c9de0473b4cfceaf2e386893409125b.jpg
abstract: 函数的 length 属性为该函数预期传入的参数个数
prevId: 2
prevTitle: js排序
nextId: 6
nextTitle: 数据库基础学习
---

**函数的 length 属性为该函数预期传入的参数个数**

例如 `(function fn(a, b){}).length` 的返回值为 2，因为函数的形参个数为 2 个

**es6 的默认值参数和剩余参数会改变 length 的计算行为**

例如： `(function fn(a, b = 2){}).length` 的返回值为 1， 同时默认值之后的参数也不会计入 length 属性，也就是 `(function fn(a, b = 2, c){}).length` 的返回值还是 1

剩余参数也是如此，例如 `(function fn(a, ...b){}).length` 的返回值为 1

> 剩余参数不会存在 `(function fn(a, ...b, c){}).length` 这种格式，因为剩余参数必须为最后一个参数，否则会报错
