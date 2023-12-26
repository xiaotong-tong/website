# documentPictureInPicture

浏览器画中画 API, 用于将网页内容从网页中分离出来。

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture)

chrome 116 开始支持，以前仅支持 video 元素，现在支持所有元素。

经测试也支持 iframe 元素，可以通过 iframe 减少适配成本。

## 用法

```js
// 返回值是一个 promise 对象，需要通过 await 等待返回值
const pipWindow = await window.documentPictureInPicture.requestWindow({
	width: 500,
	height: 800
});

// 将需要分离的内容添加到画中画的窗口中
pipWindow.document.body.append(content);
```

## demo

访问 https://xtt.moe/ex/pip 可以查看
