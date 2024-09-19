---
title: 使用 Web NFC 实现手机端浏览器的登录功能
author: 小恸恸
createDate: 2024-01-02
updateDate: 2024-09-19
tags: nfc
abstract: 学习并了解如何使用 Web NFC 实现NFC卡片的读取与写入，然后实现手机端通过刷卡登录的功能。
---

## 前言

前两天定制了几张 NFC 钥匙扣，就想着玩一下，然后就实现通过刷卡实现登录的功能。

> Web NFC 仅手机端的 Chrome 89+ 浏览器支持，详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API#browser_compatibility)

## 实现

通过 `reader.onreading` 读取 NFC 卡片的信息，然后将读取到的内容发送到服务器验证，验证成功后登录。

其中可以通过读取到的 `event.message.records` 的 length 属性来判断读取到的 NFC 卡片是否有内容，如果没有内容可以提示用户手动输入并使用 `reader.write` 写入内容到 NFC 卡片。

```js
// 创建 NFC 读取器
const reader = new window.NDEFReader();

// 激活读取设备, 返回的是一个 Promise, 用于判断是否激活成功
await reader.scan();
// 读取 NFC 信息时浏览器会弹出权限请求框，用户同意后才会 resolve Promise，如果用户拒绝，则会报错

// 激活 NFC 设备后，通过 onreading 读取 NFC 信息
reader.onreading = async (event: any) => {
	// 判断 NFC 卡片是否为空卡
	if (event.message.records.length === 0) {
		const pw = window.prompt("该 NFC 卡片为空卡，请写入主人口令");
		if (pw) {
			const data = await verifyMasterUid(pw);
			if (data === "success") {
				// 写入口令到 NFC 卡片
				reader.write(pw);
				// ...
			}
		}
		return;
	}
	const decoder = new TextDecoder();
	for (const record of event.message.records) {
		// record.data 是 DataView 类型，需要转换成字符串
		// 使用 TextDecoder API将 DataView 解码成字符串
		const pw = decoder.decode(record.data);

		// 发送到服务器验证
		const data = await verifyMasterUid(pw);
		if (data === "success") {
			// ...
		} else {
			// ...
		}
	}
};
```
