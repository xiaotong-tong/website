---
title: monaco-editorの使い方
author: 星川漣
createDate: 2024-09-15
category: ウェブ
tags: monaco, editor
thumbnail: https://image.xtt.moe/local/images/2024/09/13/5----.jpg
abstract: monaco-editorの使い方とVueでの使用時のフリーズ問題の記録
prevId: 28
prevTitle: QQ bot 開発(1) - 登録と権限認証
nextId: 31
nextTitle: QQ bot 開発(2) - プライベートメッセージの受信と返信
---

# monaco-editor の使い方

公式サイト：[monaco-editor](https://microsoft.github.io/monaco-editor/)

## インストールと基本的な使い方

```bash
# インストール monaco-editor
npm install monaco-editor
```

> 使用時にエディタの内容を取得したい場合は、`editor.getValue()` で取る。Vue で使用する場合は、`toRaw(editor.value)?.getValue()` で取得する必要があります。そうしないとページがフリーズします。

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
			// editorEl.value 必ず toRaw で包む、そうしないとページがフリーズします
			content.value = toRaw(editor.value!).getValue() || "";
		});
	}
});
onUnmounted(() => {
	// エディタを破棄
	toRaw(editor.value)?.dispose();
});
</script>
```

## Worker のインストールと Vite のパッケージ設定

1. `vite-plugin-monaco-editor` プラグインをインストール

```bash
npm install -D vite-plugin-monaco-editor
```

```js
// vite.config.js
import monacoEditorPlugin from "vite-plugin-monaco-editor";
plugins: [monacoEditorPlugin({})];
```

1. browser で Worker を読み込む

```ts
// main.ts
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

// @ts-ignore
// MonacoEnvironment を定義
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
