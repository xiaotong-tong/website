---
title: QQ bot 開発(1) - 登録と権限認証
author: 星川漣
createDate: 2024-09-17
category: ウェブ
tags: nodejs,QQ bot
thumbnail: https://image.xtt.cool/local/images/2024/09/16/ATRI--My-Dear-Moments--CG---.jpg
abstract: QQ　公式ロボットの登録と開発の権限認証の方法を紹介します。
prevId: 27
prevTitle: ナミダノコエ 歌詞
nextId: 30
nextTitle: monaco-editorの使い方
---

> 開発する前に、QQ 番号を持っている必要がある。

> 初心者なので、Node.js 開発にしているだけで、この記事では Node.js を使用して QQ ロボットを開発する方法について説明します。

## 1. QQ ロボットの登録

1.1 [QQ 開放プラットフォーム](https://q.qq.com/)(日本語なし)にアクセスして、登録とログインを行います。(tip: ログインするたびに、管理者 QQ 番号を使用して QR コードをスキャンする必要があるので、QQ 番号が管理者 QQ 番号であることを確認してください。)

1.2 登録が成功したら、アプリケーション管理ページに移動し、ロボットを作成します。(1 人あたり最大 5 つのロボットを作成できます、まだはロボットを削除できません)

1.3 作成後、QQ ロボット管理ページに移動します。

![ QQ ロボット管理ページ](https://image.xtt.cool/local/images/2024/09/07/image.png)

1.4 情報を入力した後、開発設定ページをクリックして `AppID` と `AppSecret` をとります。

1.5 サンドボックス設定で、誰がサンドボックスでロボットをトリガーできるかを設定します。QQ グループはグループの所有者または管理者である必要があります。そうでない場合、ロボットをトリガーできません。個人チャットもメッセージリストに設定する必要があります。そうでない場合、ロボットもトリガーできません。

![](https://image.xtt.cool/local/images/2024/09/07/image7fa1f5f20f8ab83c.png)

## 2. 権限認証

QQ openapi のアドレスは、サンドボックス環境と本番環境の 2 種類があります。サンドボックス環境は開発テスト用で、本番環境は本番用です。

サンドボックス環境の API アドレス：`https://sandbox.api.sgroup.qq.com`

本番環境の API アドレス：`https://api.sgroup.qq.com`

> 注：審査に送信時は本番環境の API アドレスを使用する必要があります。そうでないと、審査が通りません。

2.1 `access_token` の取る

> QQ 公式ドキュメント https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/api-use.html#%E8%8E%B7%E5%8F%96%E8%B0%83%E7%94%A8%E5%87%AD%E8%AF%81

https://bots.qq.com/app/getAppAccessToken でユーザー token とライフサイクルを取得し、ライフサイクルが終了したらトークンを再取得する必要があります。

```js
// token 変数を保存
let accessToken;

async function getAppAccessToken() {
	// リクエストアドレス
	const qqUrl = "https://bots.qq.com/app/getAppAccessToken";
	const response = await fetch(qqUrl, {
		method: "POST",
		// パラメータは必須で、QQ 開放プラットフォームで取得した AppID と AppSecret
		body: JSON.stringify({
			appId: process.env.QQ_BOT_ID,
			clientSecret: process.env.QQ_BOT_SECRET
		}),
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await response.json();

	/*
	 * 戻りデータフォーマット
	 * {
	 *	"access_token": "ACCESS_TOKEN", // token
	 *	"expires_in": "7200" // ライフサイクル、期限切れの場合は再取得が必要, 単位秒
	 * }
	 */
	accessToken = data.access_token;

	// ライフサイクルが終了したら、再取得する
	setTimeout(getAppAccessToken, data.expires_in * 1000);
}
```

2.2 WebSocket 接続の取得

[通用 wss 接続:](https://bot.q.qq.com/wiki/develop/api-v2/openapi/wss/url_get.html) `/gateway`

[分片 wss 接続:](https://bot.q.qq.com/wiki/develop/api-v2/openapi/wss/shard_url_get.html) `/gateway/bot`

```js
// サンドボックス環境
const domain = "https://sandbox.api.sgroup.qq.com";

async function getWsUrl() {
	// この場合は通用 wss 接続を取得
	const qqUrl = domain + "/gateway";
	const response = await fetch(qqUrl, {
		method: "GET",
		// headers は必須で、token 認証を使用する、QQBot の後にスペースが必要です
		headers: {
			Authorization: `QQBot ${accessToken}`
		}
	});

	if (response.status === 200) {
		const data = await response.json();

		/*
		 * 戻りデータフォーマット
		 * {
		 *	url: "" // WebSocket 接続アドレス
		 * }
		 */
		connectWS(data.url);
	}
}
```

2.3 WebSocket 接続と認証

QQ 　公式ドキュメント https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/event-emit.html#websocket-%E6%96%B9%E5%BC%8F

ws 接続には認証とハートビートパケットの送信に注意する。コードは以下の通りです。

```js
// WebSocket ライブラリ
const WebSocket = require("ws");
let ws;
let seq; // 情報シリアル番号
let heartbeatInterval; // ハートビート周期

function connectWS(url) {
	// WebSocket 接続
	ws = new WebSocket(url);

	ws.on("open", function open() {
		console.log("connected");
	});

	ws.on("close", function close() {
		console.log("disconnected");
		// 再接続
		connectWS(url);
	});

	ws.on("message", async function incoming(data) {
		if (Buffer.isBuffer(data)) {
			// ws 接続のデータを取得
			const str = data.toString("utf-8");
			const parsedJson = JSON.parse(str);

			if (parsedJson.op === 10) {
				// op 値が 10 の場合、ハートビート周期を取得
				heartbeatInterval = parsedJson.d.heartbeat_interval;

				// ハートビート周期を取った後、鉴权情報を送信する必要があります。フォーマットは以下の通りです。そうでないとエラーが発生します。
				const response = {
					op: 2,
					d: {
						token: `QQBot ${AccessToken}`, // token 認証を使用
						intents: (1 << 30) | (1 << 0) | (1 << 1) | (1 << 25), // 権限を購読する
						// !!! 注意,権限を購読する際、適当な権限を追加してはいけません、現在のロボットがサポートしている権限のイベントを購読する必要があります、そうでないと ws 接続が直接エラーを報告して接続が閉じられます！！！
						// 1 << 25 はグループ関連のイベントで、追加しないとグループメッセージを受信できません
						shard: [0, 1], // 分片情報、私が上記 2.2 取得したのは分片情報の ws アドレスではないので、ここで固定値を入力する必要があります [0, 1]
						properties: {
							// ロボット環境情報、公式サイトには空白にしてもいいと記載されていますが、ここには properties パラメータを記入する必要があります、パラメータは適当に記入してもよく、記入しないとエラーが発生します
							os: "linux",
							browser: "my_library",
							device: "my_library"
						}
					}
				};

				// 鉴权情報を送信
				ws.send(JSON.stringify(response));
			} else if (parsedJson.op === 0 && parsedJson.t === "READY") {
				// op 値が 0, t 値が READY の場合、鉴权成功
				// 鉴权成功後、周期的にハートビートパケットを送信して、接続が切れないように
				seq = parsedJson.s; // 現在の情報のシリアル番号、ハートビート用
				sessionID = parsedJson.d.session_id;

				// ハートビートパケットを送信する、 op が 1, d が最新情報のシリアル番号
				const response = {
					op: 1,
					d: seq
				};
				ws.send(JSON.stringify(response));
			} else if (parsedJson.op === 11) {
				// op 値が 11 の場合、ハートビート応答を受信し、ハートビート周期後に再度ハートビートパケットを送信する必要があります
				setTimeout(() => {
					const response = {
						op: 1,
						d: seq
					};
					ws.send(JSON.stringify(response));
				}, heartbeatInterval);
			}
		}
	});

	ws.on("error", function error(err) {
		console.error("WebSocket error:", err);
	});
}
```
