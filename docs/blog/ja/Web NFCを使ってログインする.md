---
title: Web　NFCを使ってログインする
author: 星川漣
createDate: 2024-01-19
tags: web nfc
abstract: Web　NFCを使ってこのブログをログインする
---

## 前置き

先日、NFC キーホルダーをげっとした。どのように使うか考えていたら、Web 　 NFC を使ってログインすることができると思った。

> Web NFC はスマホの Chrome 89+ のみサポートされている。詳しくは [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API#browser_compatibility) を参照してください。

## 実現

```js
// NFC　コンストラクターを作成
const reader = new window.NDEFReader();

// NFC タブを読み取る。"nfc" の権限が事前に許可されていない場合は、許可を問い合わせるプロンプトが表示されます。
reader.scan();

// onreading Event は NFC タグが読み取られるたびに発生します。
reader.onreading = async (event: any) => {
  const decoder = new TextDecoder();
  for (const record of event.message.records) {
    // record.data は DataView です。
    // TextDecoder APIを使って DataView を文字列に変換します。
    const pw = decoder.decode(record.data);

    // サーバーに送信して検証する
    const data = await verifyMasterUid(pw);

    if (data === "success") {
      // ...
    } else {
      // ...
    }
  }
};

// --------------
// NFC タグに書き込む
reader.write(somethings);
```
