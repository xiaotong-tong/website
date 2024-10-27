---
title: Web NFC を使用して、スマホのブラウザでログイン機能を実装する
author: 星川漣
createDate: 2024-09-19
category: ウェブ
tags: nfc
abstract: Web NFC を使用して、NFC カードの読み取りと書き込みを勉強します、そして、スマホでカードをスキャンしてログインする機能を実装します。
prevId: 24
prevTitle: android と pc のデバッグ
nextId: 26
nextTitle: Linux で Puppeteer を実行する
---

## はじめに

> Web NFC は、スマホの Chrome 89+ ブラウザのみでサポートされています。詳しくは [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API#browser_compatibility) を参照してください。

## 実装

`reader.onreading` を使用して NFC カードの情報を読み取り、読み取った内容をサーバーに送信して検証し、検証が成功したらログインします。

中には、読み取った `event.message.records` の length を使用して、読み取った NFC カードに内容があるかどうかを判断し、内容がない場合はユーザーに手動で入力するように促し、`reader.write` を使用して NFC カードに内容を書き込みます。

```js
// NFC リーダーを作成
const reader = new window.NDEFReader();

// リーダーをアクティブ化し、Promise を返します。アクティブ化が成功したかどうかを判断するために使用します
await reader.scan();
// NFC 情報を読み取ると、ブラウザは許可リクエストボックスを表示し、ユーザーが同意すると Promise が解決されます。ユーザーが拒否した場合はエラーが発生します

// NFC デバイスをアクティブ化した後、onreading を使用して NFC 情報を読み取ります
reader.onreading = async (event: any) => {
	// NFC カードが空の場合
	if (event.message.records.length === 0) {
		const pw = window.prompt("この NFC カードは空です。パスワードを書き込んでください");
		if (pw) {
			// サーバーに送信して検証します
			const data = await verifyMasterUid(pw);
			if (data === "success") {
				// NFC カードにパスワードを書き込む
				reader.write(pw);
				// ...
			}
		}
		return;
	}
	const decoder = new TextDecoder();
	for (const record of event.message.records) {
		// record.data は DataView 型であり、文字列に変換する必要があります
		// TextDecoder APIを使用して DataView を文字列にデコードします
		const pw = decoder.decode(record.data);
		// サーバーに送信して検証します
		const data = await verifyMasterUid(pw);
		if (data === "success") {
			// ...
		} else {
			// ...
		}
	}
};
```
