---
title: android 和 pc 的调试
author: 小恸恸
createDate: 2024-01-02
updateDate: 2024-09-20
category: 网络互联
tags: android,localhost,debug,inspect
thumbnail: https://image.xtt.cool/local/images/2024/09/20/GALCG----2.jpg
abstract: 本文主要介绍如何使用手机访问电脑的 localhost，以及使用 Chrome 调试手机页面
prevId: 23
prevTitle: documentPictureInPicture API 学习记录
nextId: 25
nextTitle: 使用 Web NFC 实现手机端浏览器的登录功能
---

## 使用手机访问电脑的 localhost

1. 安装 adb

    1. 安装 android studio (安装 android sdk)

    2. 将 `C:\Users\{user}\AppData\Local\Android\Sdk\platform-tools` 路径添加到环境变量 (将 adb.exe 添加到环境变量中)

2. 手机开启开发者模式并通过数据线连接电脑

3. 打开 cmd 输入 `adb reverse tcp:{androidport} tcp:{pcport}`

4. 手机浏览器输入 localhost:{androidport} 即可访问电脑 localhost

## 使用 Chrome 调试手机

1. 手机开启开发者模式并通过数据线连接电脑

2. 打开 Chrome 输入 chrome://inspect/#devices

![chrome inspect](https://image.xtt.cool/local/images/2024/09/20/image.png)

3. 点击对应界面下的 `inspect` 即可调试手机页面

![chrome inspect](https://image.xtt.cool/local/images/2024/09/20/imageb5c4f040c1ee38cf.png)
