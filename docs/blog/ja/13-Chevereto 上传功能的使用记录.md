---
title: Cheveretoのapiに画像をアップロードする方法
author: 星川漣
createDate: 2024-09-21
updateDate: 2024-09-21
tags: Chevereto
abstract: Cheveretoのapiに画像をアップロードする方法の記録
---

Chevereto が `http://{mysite.com}/api/1/upload/` を公開しており、この api には特定のパラメータを渡すことで画像をアップロードできます。

この api には 3 つのパラメータがあります。

-   key: ユーザーのキーを検証する
-   format: 戻り値のタイプ、json、txt、redirect の 3 つの値があり、通常は json を使用します
-   source: 画像の内容をアップロードできます。画像の URL、画像の base64 エンコード、または formdata タイプが使用できます。

### get リクエストを使用してアップロードする

`Get http://{mysite.com}/api/1/upload/?key=***&format=json&source=***`

get リクエストは使用をお勧めしません。URL の最大長は 255 文字であり、base64 形式を使用すると簡単に制限を超えてしまい、アップロードが失敗する可能性があります。

### post リクエストを使用してアップロードする

post でパラメータを渡す方が get よりも複雑です。ここでは axios を例にします。

```js
http.post(
	`/api/image/upload/?key=***&format=json`,
	{ source: file },
	{
		headers: {
			"Content-Type": "multipart/form-data"
		}
	}
```

key と format の 2 つのパラメータは URL にクエリ形式で結合する必要があります。source は body 形式で渡す必要があり、Content-Type を "multipart/form-data" に設定するも必要があります。

{ source: file } このように渡す場合、file は URL または base64 形式である必要があります。File オブジェクト形式をアップロードする場合は、FormData オブジェクトを定義し、オブジェクト内に source: File のキーと値を作成する必要があります。

```js
const fd = new FormData();
fd.append("source", file);

http.post(
	`/api/image/upload/?key=***&format=json`,
	fd,
	{
		headers: {
			"Content-Type": "multipart/form-data"
		}
	}
```
