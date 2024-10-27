---
title: tailwind 自定义提升选择器优先级修饰符
author: 小恸恸
createDate: 2024-10-13
updateDate: 2024-10-13
category: 网络互联
tags: tailwind,css
thumbnail: https://image.xtt.moe/local/images/2024/10/14/0c9de0473b4cfceaf2e386893409125b-2.jpg
abstract: 使用 `:is()` 选择器来提升选择器的优先级，并实现一个 tailwind 插件来自定义修饰符，使用 `up:` 修饰符来提升选择器的优先级。
---

## 前言

我们都知道，Tailwind 想要提升一个选择器的优先级，一般使用 `!` 修饰符，如 `!pt-0`, 会解析为 `padding-top: 0 !important;`。但是，我们不推荐使用 `!important`，那么有没有其他方法提升选择器的优先级呢？

答案肯定是有的，在新版本中，我们可以使用 `:is()` 选择器来提升选择器的优先级。`is()` 选择器是一个 CSS 伪类，它可以让你使用一个选择器组合来匹配元素。并且这个伪类的优先级是选择器组合中最高的一个选择器的优先级。

基于这个特性，我们可以使用 `:is()` 选择器来提升选择器的优先级。如 `.pt-0:is(.pt-0, #notUsedSelector)`, 最终这个伪类的优先级是 id 级别的优先级，因此，虽然我们使用的还是 `.pt-0`, 但是它的优先级已经是 id 级别的优先级。

## tailwind 插件

想要实现这个功能，我们需要编写一个 tailwind 插件来自定义修饰符，这里我们选择 `up:` 作为修饰符。

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [
		function ({ addVariant, e }) {
			// 自定义一个升级CSS选择器优先级的变体
			addVariant("up", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`up${separator}${className}`)}:is(&, #notUsedSelector)`;
				});
			});
		}
	]
};
```

上面插件编写后，我们就可以使用 `up:` 修饰符来提升选择器的优先级了。如 `up:pt-0`, 会解析为 `.up\:pt-0:is(.up\:pt-0, #notUsedSelector) {padding-top: 0px;}`, 这样，`up:pt-0` 的优先级就是 id 级别的优先级。

最后需要注意的是， `#notUsedSelector` 需要是一个没有被使用的选择器，否则所有使用了 `up:` 修饰符的选择器的 CSS 规则都会被应用到这个选择器上，造成严重的样式问题。
