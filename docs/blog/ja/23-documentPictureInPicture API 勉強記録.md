---
title: documentPictureInPicture API 勉強記録
author: 星川漣
createDate: 2024-09-20
category: ウェブ
tags: documentPictureInPicture
abstract: documentPictureInPicture API の勉強
prevId: 22
prevTitle: ごはんを食べよう 歌詞
nextId: 24
nextTitle: android と pc のデバッグ
---

# [documentPictureInPicture](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture)

ブラウザの画中画 API は、ウェブページのコンテンツをウェブページから分離するために使用されます。

この API は、chrome 116 からサポートされており、以前は video 要素のみをサポートしていましたが、現在はすべての要素をサポートしています。

iframe 要素もサポートされていることが確認されており、iframe を使用することで適応コストを削減できます。

## 使い方

```js
// 戻り値は promise であり、返り値を待つために await を使用する必要があります
const pipWindow = await window.documentPictureInPicture.requestWindow({
	width: 500,
	height: 800
});

// 分離するコンテンツを画中画ウィンドウに追加します
pipWindow.document.body.append(content);
```

## demo

<a href="/ex/pip" target="_blank">https://xtt.moe/ex/pip</a> にアクセスしてデモを確認してください。デモのコードは以下の通りです

```vue
<template>
	<section>
		<xtt-button ref="btn" @click="togglePIP"> Toggle Picture-in-Picture </xtt-button>

		<iframe
			ref="content"
			hidden
			src="https://xtt.moe/ex/pip"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const btn = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

const togglePIP = async () => {
	if (!(window as any).documentPictureInPicture.window) {
		const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
			width: 500,
			height: 800
		});

		content.value!.removeAttribute("hidden");
		pipWindow.document.body.append(content.value);
	}
};
</script>
```
