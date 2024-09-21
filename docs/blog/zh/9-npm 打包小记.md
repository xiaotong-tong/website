---
title: npm 打包小记
author: 小恸恸
createDate: 2023-08-01
updateDate: 2024-09-21
tags: npm,package
abstract: npm 打测试包与发布包的小记
---

## 测试包内容

在发布包之前可以使用 `npm pack --dry-run` 命令，该命令会显示所有发布后上传的文件，可以预先判断要发布的文件是否正常。

如果想要测试包功能是否正常，可以运行 `npm link` 命令，该命令会将当前 npm 包链接到本地全局环境中，然后可以在其他项目中使用 `npm link 包名` 的方式将包下载到 node_modules 中。

> npm link 会将文件中的所有文件都链接进 npm 包中，不止于 npm pack 会打包的文件

## 发布

使用 npm publish 发布包，如果想要发布非正式包可以使用 npm publish --tag alpha | beta 等添加标签的方式添加一个标记
