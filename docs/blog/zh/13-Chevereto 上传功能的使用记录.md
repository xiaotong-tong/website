---
title: Chevereto 上传功能的使用记录
author: 小恸恸
createDate: 2023-08-18
updateDate: 2024-09-21
tags: Chevereto
abstract: 上传图片到 Chevereto 的 api 的使用记录
---

Chevereto 暴露出 `http://{mysite.com}/api/1/upload/`, 访问这个 api 按照一定的参数传参就可以上传图片。

该 api 有三个参数

-   key: 验证用户的 key
-   format: 返回值的类型，有 json, txt, redirect 三个值,通常使用 json
-   source: 上传图片的内容，可以为 图片 url，也可以是图片的 base64 编码，也可以是 formdata 类型。

> 上传 base64 格式的内容时，不需要上传字符串中的 data:image/png;base64, 等格式标识，仅需要上传 base64 编码后的内容即可。

### 使用 get 请求上传

`Get http://{mysite.com}/api/1/upload/?key=***&format=json&source=***`

get 访问不推荐使用，因为 url 最大的长度为 255 字符，如果使用 base64 格式，很容易就会超出限制，导致上传出错。

### 使用 post 请求上传

post 传参会比 get 复杂很多，这里以 axios 为例

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

其中 key 和 format 两个参数还是需要使用 query 类型拼接到 url 中，然后 source 使用 body 格式传参，然后还需要设置 headers 中的 Content-Type 为 "multipart/form-data"。

{ source: file } 这样传参是 file 必须为 url 或 base64 格式，如果需要上传 File 对象格式，则需要定义 FormData 对象，对象内部创建个 source: File 的键值对。

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
