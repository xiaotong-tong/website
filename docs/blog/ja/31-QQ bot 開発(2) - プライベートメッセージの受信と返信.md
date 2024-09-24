---
title: QQ bot 開発(2) - プライベートメッセージの受信と返信
author: 星川漣
createDate: 2024-09-24
updateDate: 2024-09-24
tags: nodejs,QQ bot
abstract: QQ　公式ロボットの開発チュートリアル、この記事では、QQ ロボットのプライベートメッセージの受信と返信方法について説明します。
---

> [QQ bot 開発(1) - 登録と権限認証](https://xtt.moe/ja/article/28)
>
> [QQ bot 開発(2) - プライベートメッセージの受信と返信](https://xtt.moe/ja/article/31)

## 受信

[QQ bot 開発(1) - 登録と権限認証](https://xtt.moe/ja/article/28) の記事に従って設定した後、ws でプライベートメッセージを受信できます。

> QQ 机器人公式は `/コマンド something` の形式で情報をトリガすることを要求しており、コマンドパネルのコマンドはこの形式に従う必要があります。
>
> また、コマンドの後にスペースがあるかどうかに関係なく処理する必要があります。そうでないと、審査に影響する可能性があります。

プライベートメッセージの op は 0、t は `C2C_MESSAGE_CREATE`、メッセージの内容は `d.content` フィールドにあります。

返されるデータの形式は以下の通りです。

```json
{
	"op": 0,
	"s": 2,
	"t": "C2C_MESSAGE_CREATE",
	"id": "",
	"d": {
		"author": {
			"id": "",
			"union_openid": "",
			"user_openid": ""
		},
		"content": "hello",
		"id": "",
		"timestamp": "2024-09-24T18:09:04+08:00"
	}
}
```

そして、ws の `message` イベントで判断して処理する

```js
//　プライベートメッセージの処理コールバック関数を保存
const friendCallbackList = [];

ws.on("message", async function incoming(data) {
	if (Buffer.isBuffer(data)) {
		// ws 接続のデータを取得
		const str = data.toString("utf-8");
		const parsedJson = JSON.parse(str);

		// プライベートメッセージかどうかを判断
		if (parsedJson.op === 0 && parsedJson.t === "C2C_MESSAGE_CREATE") {
			seq = parsedJson.s; // 最新のメッセージシリアル番号に更新する
			friendCallbackList?.forEach((callback) => {
				try {
					parsedJson.d.formatContent = parsedJson.d.content.trimStart(); // 先頭の空白を削除
					callback(parsedJson.d); //　コールバック関数を実行
				} catch (err) {
					// エラーをキャッチして、他のコールバックが実行されないようにする
					console.error("Error in friend callback:", err);
				}
			});
		}
	}
});
```

それで、私聊のメッセージを処理するコールバック関数を `friendCallbackList` に追加できるようになりました。

```js
function doShareHello(d) {
	if (d.content.trim() === "/hello") {
		// ......
	}
}

friendCallbackList.push(doShareHello);
```

## 返信

> QQ 公式ドキュメント[发送消息](https://bot.q.qq.com/wiki/develop/api-v2/server-inter/message/send-receive/send.html)

### 文字メッセージの送信

文字メッセージを送信する場合、API を使用して QQ 机器人にリクエストを送信する必要があります。

ここでは、汎用の返信関数を作成するために `axios` ライブラリを使用します。

> メッセージを返信する際には、`msg_id` フィールドを渡す必要があります。これは被動的な返信であることを確認するためのフラグです。渡さない場合、QQ 机器人はアクティブなメッセージとして扱い、アクティブなメッセージの回数を消費します。各ロボットは月に 4 回のアクティブなメッセージ送信の機会があります。超えると、再度アクティブなメッセージを送信するとエラーが返されます。

```js
// target は送信先、つまり d.author.user_openid
async function sendFriendMessage(target, messageChain) {
	if (!target) {
		console.error("No target specified");
		return;
	}

	// 返信API の URL
	let qqUrl = `${domain}/v2/users/${target}/messages`;

	const response = await fetch(qqUrl, {
		method: "POST",
		headers: {
			Authorization: `QQBot ${accessToken}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(messageChain)
	});

	const data = await response.json();
	return data;
}
```

`doShareHello` 関数を再度変更して、返信機能を追加します。

```js
async function doShareHello(d) {
	if (d.content.trim() === "/hello") {
		// 返信
		sendFriendMessage(d.author.user_openid, {
			content: "Hello, world!", // 必須，返信内容
			msg_type: 0, // 必須，0 はテキストメッセージ
			msg_id: d.id // 必須，被動的な返信であることを確認するためのフラグ
		});
	}
}
```

これで `/hello` コマンドを受信した後、`Hello, world!` と返信することができます。

### 画像の返信

画像を送信することも基本的な要求です。テキストメッセージよりも複雑な手順が必要です。

> 画像を送信する時、アップロードされた画像のアドレスは公開 URL アドレスである必要があり、base64 などの形式ではありません。
>
> 画像を送信する時、テキストと画像を同時に送信することはできません。したがって、テキストと画像を別々に送信するか、テキストを画像に書き込む必要があります。
>
> QQ 公式ドキュメント[富文本消息](https://bot.q.qq.com/wiki/develop/api-v2/server-inter/message/send-receive/rich-media.html#%E7%94%A8%E4%BA%8E%E5%8D%95%E8%81%8A)

`sendFriendMessage` 関数を変更して、画像を送信できるようにします。

```js
// target は送信先、つまり d.author.user_openid
async function sendFriendMessage(target, messageChain) {
	if (!target) {
		console.error("No target specified");
		return;
	}

	// 返信API の URL
	let qqUrl = `${domain}/v2/users/${target}/messages`;

	// type は　1 の時、画像を送信することを示します。個人設定、公式のインターフェースパラメータではありません
	if (messageChain.type === 1) {
		// 画像を送信する前に、画像をアップロードする必要があります
		const mediaUrl = `${domain}/v2/users/${target}/files`;

		// 画像をアップロード
		const response = await fetch(mediaUrl, {
			method: "POST",
			headers: {
				Authorization: `QQBot ${accessToken}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(messageChain)
		});
		// アップロード成功後、リッチテキスト情報を取得し、後続のリクエストで画像を送信します
		const data = await response.json();
		// messageChain を書き換え、msg_type が 7 の場合、リッチテキストメッセージを送信することを示し、リッチテキストの内容は上記のインターフェースのデータです
		messageChain = {
			msg_type: 7,
			media: data,
			msg_id: messageChain.msg_id
		};
	}

	const response = await fetch(qqUrl, {
		method: "POST",
		headers: {
			Authorization: `QQBot ${accessToken}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(messageChain)
	});

	const data = await response.json();
	return data;
}
```

これで、画像も送信できるようになりました。

```js
sendFriendMessage(d.author.user_openid, {
	type: 1, // 1 は画像を示します個人設定、公式のインターフェースパラメータではありません
	file_type: 1, // 1 は画像、2 はビデオ、3 は音声
	url: resUrl, // 画像アドレス、公開 URL アドレスである必要があります
	srv_send_msg: false, // true に設定すると、メッセージが直接送信され、アクティブメッセージの回数が消費されます。したがって、false に設定する必要があります
	msg_id: d.id // 必須，被動的な返信であることを確認するためのフラグ
});
```
