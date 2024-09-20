---
title: documentPictureInPicture API 学习记录
author: 小恸恸
createDate: 2023-12-26
updateDate: 2024-09-20
tags: documentPictureInPicture
abstract: documentPictureInPicture API 学习
---

# [documentPictureInPicture](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture)

浏览器画中画 API, 用于将网页内容从网页中分离出来。

本 API 从 chrome 116 开始支持，以前仅支持 video 元素，现在支持所有元素。

经测试也支持 iframe 元素，可以通过 iframe 减少适配成本。

## 用法

```js
// 返回值是一个 promise 对象，需要通过 await 等待返回值
const pipWindow = await window.documentPictureInPicture.requestWindow({
	width: 500,
	height: 800
});

// 将需要分离的内容添加到画中画的窗口中
pipWindow.document.body.append(content);
```

## demo

访问 <a href="/ex/pip" target="_blank">https://xtt.moe/ex/pip</a> 查看 demo。demo 代码如下

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
