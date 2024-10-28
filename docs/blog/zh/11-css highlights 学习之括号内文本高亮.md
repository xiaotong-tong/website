---
title: css highlights 学习之括号内文本高亮
author: 小恸恸
createDate: 2023-08-03
updateDate: 2024-09-21
category: 网络互联
tags: Highlight,Range,高亮,原生CSS高亮
thumbnail: https://image.xtt.moe/images/422ae67c9d3cf274c.md.webp
abstract: 使用 CSS 原生高亮 API 实现一个 Web Component 组件，实现高亮组件内需要高亮的文本。
prevId: 10
prevTitle: 关于网站背景的更换指南
nextId: 12
nextTitle: 关于 ts 中 setTimeout 类型的记录
---

在 chrome 105 之后谷歌浏览器支持了 [CSS 原生高亮 API](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Custom_Highlight_API)

原生 highlights 有很多优势，当然我认为最明显的优势就是它的高亮不会增加任何嵌套标签！！！

本文将尝试使用这个 API 来实现一个 span 组件，这个组件内部括号内的文本将会被高亮。

首先搭一个架子，我们需要一个继承自 span 的自定义组件，名称就叫 xtt-hl 吧。

```html
<span is="xtt-hl">(test1) content (test2)</span>
<script>
	customElements.define(
		"xtt-hl",
		class xttHighLightsElement extends HTMLSpanElement {
			constructor() {
				super();
				const shadowRoot = this.attachShadow({ mode: "open" });
				shadowRoot.appendChild(document.createElement("slot"));
			}
		},
		{ extends: "span" }
	);
</script>
```

可以看到，我们的组件已经可以正常使用了，但是还没有任何效果。

![](https://image.xtt.moe/images/2023/08/03/1.md.png)

接下来我们需要使用 CSS 原生高亮 API 来实现高亮效果。

```js
addHighlight() {
	// 首先创建 Range 片段，查找和存储需要高亮文本
	const rangeList = [];
	for (const match of this.textContent.matchAll(/\(.*?\)/g)) {
		const range = new Range();
		range.setStart(this.firstChild, match.index);
		range.setEnd(this.firstChild, match.index + match[0].length);
		rangeList.push(range);
	}

	// 创建高亮文本
	const highlights = new Highlight(...rangeList);

	// 设置高亮文本的样式
	CSS.highlights.set("xtt-hl", highlights);
}

// 然后设置 CSS 规则，在 constructor 中追加
let sheet = new CSSStyleSheet();
sheet.replaceSync(`
	:host ::highlight(xtt-hl) {
		color: aqua;
	}
`);
shadowRoot.adoptedStyleSheets = [sheet];
```

可以看到括号内的文本已经被高亮了。

![](https://image.xtt.moe/images/2023/08/03/2.md.png)

但是当我们尝试追加多个 xtt-hl 元素时，发现非最后一个元素的高亮都失效了。

![](https://image.xtt.moe/images/2023/08/03/3.md.png)

这是因为上面所有组件的 `CSS.highlights.set` 方法的参数是同一个字符串，那么后面在 set 的时候就会覆盖前面的。这里有可能有两种解决方法，一种是使用不同的字符串，另一种是在 set 时合并多次的 Highlight 对象。

这里我们选择第二种方法。

```diff
-const highlights = new Highlight(...rangeList);
+let highlights;
+if (CSS.highlights.has("xtt-hl")) {
+	highlights = CSS.highlights.get("xtt-hl");
+	highlights.add(...rangeList);
+} else {
+	highlights = new Highlight(...rangeList);
+}
```

完成了！！虽然只是一个简单的例子，还有许多不足，如内容改变或元素被移除时没有清除内存等。

![](https://image.xtt.moe/images/2023/08/03/4.md.png)

完整代码如下：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>highlights</title>
	</head>
	<body>
		<span is="xtt-hl">(test1) content (test2)</span>
		<span is="xtt-hl">(test3) content</span>
		<script>
			customElements.define(
				"xtt-hl",
				class xttHighLightsElement extends HTMLSpanElement {
					constructor() {
						super();
						const shadowRoot = this.attachShadow({ mode: "open" });

						let sheet = new CSSStyleSheet();
						sheet.replaceSync(`
                            :host ::highlight(xtt-hl) {
                                color: aqua;
                            }
                        `);
						shadowRoot.adoptedStyleSheets = [sheet];
						shadowRoot.appendChild(document.createElement("slot"));
						this.addHighlight();
					}

					addHighlight() {
						const rangeList = [];
						for (const match of this.textContent.matchAll(/\(.*?\)/g)) {
							const range = new Range();
							range.setStart(this.firstChild, match.index);
							range.setEnd(this.firstChild, match.index + match[0].length);
							rangeList.push(range);
						}

						let highlights;

						if (CSS.highlights.has("xtt-hl")) {
							highlights = CSS.highlights.get("xtt-hl");
							highlights.add(...rangeList);
						} else {
							highlights = new Highlight(...rangeList);
						}

						CSS.highlights.set("xtt-hl", highlights);
					}
				},
				{ extends: "span" }
			);
		</script>
	</body>
</html>
```
