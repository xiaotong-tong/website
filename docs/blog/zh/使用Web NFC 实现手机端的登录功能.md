# 使用 Web NFC 实现手机端浏览器的登录功能

## 前言

前两天定制了几张 NFC 钥匙扣，就想着玩一下，然后就实现这个功能。

Web NFC 仅手机端的 Chrome 89+ 浏览器支持，详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API#browser_compatibility)

## 实现

```js
// 创建 NFC 读取器
const reader = new window.NDEFReader();

// 激活读取设备, 返回的是一个 Promise
reader.scan();
// 读取 NFC 信息时浏览器会弹出权限请求框，用户同意后才会执行 then 中的代码，如果用户拒绝，则会报错

// 读取 NFC 信息
reader.onreading = async (event: any) => {
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

// --------------
// 写入信息到 NFC 卡片
reader.write(somethings);
```
