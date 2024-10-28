---
title: css highlights 勉強と括弧内のテキストのハイライト
author: 星川漣
createDate: 2024-09-21
category: ウェブ
tags: Highlight,Range,ハイライト
thumbnail: https://image.xtt.moe/images/422ae67c9d3cf274c.md.webp
abstract: CSS 原生ハイライト API を使用して、ハイライトする span を含む Web Componentを実装します。
prevId: 10
prevTitle: ウェブサイトの背景の変更ガイド
nextId: 12
nextTitle: ts で setTimeout の型についての記録
---

chrome 105 以降、Google Chrome は [CSS ハイライト API](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Custom_Highlight_API) をサポートしています。

原生のハイライトには多くの利点がありますが、私が最も明らかな利点だと思うのは、ハイライトがネストされたタグを追加しないことです！！！

この記事では、この API を使用して、span コンポーネントを実装し、その component 内の括弧内のテキストをハイライトします。

まず、span を継承した custom component xtt-hl が必要です。

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

このように、コンポーネントはすでに正常に使用できますが、まだ効果がありませんが。

![](https://image.xtt.moe/images/2023/08/03/1.md.png)

次に、CSS の Highlight API を使用してハイライト効果を実装する。

```js
addHighlight() {
	// まず、ハイライトするテキストを検索して保存する Range インターフェイスを作成します
	const rangeList = [];
	for (const match of this.textContent.matchAll(/\(.*?\)/g)) {
		const range = new Range();
		range.setStart(this.firstChild, match.index);
		range.setEnd(this.firstChild, match.index + match[0].length);
		rangeList.push(range);
	}

	// ハイライトテキストを作成します
	const highlights = new Highlight(...rangeList);

	// ハイライトテキストのスタイルを設定します
	CSS.highlights.set("xtt-hl", highlights);
}

// その後、CSS ルールを設定します
let sheet = new CSSStyleSheet();
sheet.replaceSync(`
	:host ::highlight(xtt-hl) {
		color: aqua;
	}
`);
shadowRoot.adoptedStyleSheets = [sheet];
```

これで、ハイライトが実装されました。

![](https://image.xtt.moe/images/2023/08/03/2.md.png)

しかし、複数の xtt-hl 要素を追加しようとすると、最後以外の要素のハイライトがすべて無効になることがわかります。

![](https://image.xtt.moe/images/2023/08/03/3.md.png)

これは、上記のすべてのコンポーネントの `CSS.highlights.set` メソッドのパラメータが同じ文字列であるためです。そのため、後で set すると前のものが上書きされます。ここで、2 つの解決方法が考えられます。1 つは異なる文字列を使用すること、もう 1 つは set 時に複数の Highlight オブジェクトをマージすることです。

ここでは、後者の方法を選択します。

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

完成しました！！ただし、これは単なる簡単な例であり、メモリのクリアなど、多くの不足点があります。

![](https://image.xtt.moe/images/2023/08/03/4.md.png)

全てのコードは以下の通りです：

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
