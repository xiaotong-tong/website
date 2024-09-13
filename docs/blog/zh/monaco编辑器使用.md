---
title: monaco编辑器使用
author: 小恸恸
createDate: 2024-09-13
updateDate: 2024-09-13
tags: nonaco, editor
abstract: monaco编辑器使用与vue中使用卡死问题的记录
---

# monaco 编辑器使用

官网地址：[monaco-editor](https://microsoft.github.io/monaco-editor/)

## 安装与基础使用

```bash
# 安装 monaco-editor
npm install monaco-editor
```

使用时如果想要获取编辑器的内容，可以通过 `editor.getValue()` 获取，如果是在 vue 中使用，必需通过 `toRaw(editor.value)?.getValue()` 获取，否则会卡死页面。

```vue
<template>
	<div ref="editorRef"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, toRaw, onUnmounted } from "vue";
import * as monaco from "monaco-editor";

const editorRef = ref<HTMLElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor>();

onMounted(() => {
	if (editorRef.value) {
		editor.value = monaco.editor.create(editorRef.value, {
			value: "",
			language: "markdown",
			minimap: {
				enabled: false
			}
		});

		editor.value.onDidChangeModelContent(() => {
			// editorEl.value 必须使用 toRaw 包裹，否则会卡死页面
			content.value = toRaw(editor.value!).getValue() || "";
		});
	}
});
onUnmounted(() => {
	// 销毁编辑器
	toRaw(editor.value)?.dispose();
});
</script>
```

## 安装 Worker 与 Vite 打包配置

1. 安装 `vite-plugin-monaco-editor` 插件

```bash
npm install -D vite-plugin-monaco-editor
```

```js
// vite.config.js
import monacoEditorPlugin from "vite-plugin-monaco-editor";
plugins: [monacoEditorPlugin({})];
```

2. 浏览器加载 Worker

```ts
// main.ts
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

// @ts-ignore
// 定义 MonacoEnvironment
self.MonacoEnvironment = {
	// @ts-ignore
	getWorker: function (_, label) {
		if (label === "json") {
			return new jsonWorker();
		}
		if (label === "css" || label === "scss" || label === "less") {
			return new cssWorker();
		}
		if (label === "html" || label === "handlebars" || label === "razor") {
			return new htmlWorker();
		}
		if (["typescript", "javascript"].includes(label)) {
			return new tsWorker();
		}

		return new EditorWorker();
	}
};
```
