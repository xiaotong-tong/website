---
title: tailwindカスタムセレクタ優先度修飾子
author: 星川漣
createDate: 2024-10-13
category: ウェブ
tags: tailwind,css
thumbnail: https://image.xtt.moe/local/images/2024/10/14/0c9de0473b4cfceaf2e386893409125b-2.jpg
abstract: is() セレクタを使用してセレクタの優先度を上げ、tailwind プラグインを作成して修飾子をカスタマイズし、`up:` 修飾子を使用してセレクタの優先度を上げます。
prevId: 32
prevTitle: ヨルシカ - 憂、燦々 歌詞
---

## 前書き

私たち知ってるように、Tailwind はセレクタの優先度を上げるために、一般的に `!` 修飾子を使用します。例えば、`!pt-0` は `padding-top: 0 !important;` に解析されます。しかし、`!important` の使用は推奨されていません。では、セレクタの優先度を上げる他の方法はあるのでしょうか？

答えはもちろんあります。新しいバージョンでは、セレクタの優先度を上げるために `:is()` セレクタを使用できます。`is()` セレクタは CSS の擬似クラスで、要素を一致させるためにセレクタの組み合わせを使用できます。そして、この擬似クラスの優先度は、セレクタの組み合わせの中で最も高いセレクタの優先度です。

この特性を活かして、セレクタの優先度を上げることができます。例えば、`.pt-0:is(.pt-0, #notUsedSelector)` のように、最終的にこの擬似クラスの優先度は id レベルの優先度になります。そのため、私たちは `.pt-0` を使用していますが、その優先度は id レベルの優先度になります。

## tailwind プラグイン

この機能を実現するために、tailwind プラグインを作成する必要があります。ここでは、修飾子として `up:` を選択します。

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [
		function ({ addVariant, e }) {
			// セレクタの優先度を上げるためのカスタムバリアントを定義
			addVariant("up", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`up${separator}${className}`)}:is(&, #notUsedSelector)`;
				});
			});
		}
	]
};
```

上記のプラグインを作成した後、`up:` 修飾子を使用してセレクタの優先度を上げることができます。例えば、`up:pt-0` は `.up\:pt-0:is(.up\:pt-0, #notUsedSelector) {padding-top: 0px;}` に解析され、このようにして、`up:pt-0` の優先度は id レベルの優先度になります。

でも、`#notUsedSelector` は使用されていないセレクタである必要があるため、`up:` 修飾子を使用したすべてのセレクタの CSS ルールがこのセレクタに適用され、スタイルの問題が発生する可能性が高いことに注意してください。
