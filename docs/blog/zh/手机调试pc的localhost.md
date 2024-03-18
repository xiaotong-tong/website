---
title: 使用手机调试电脑的 localhost
author: 小恸恸
createDate: 2024-01-02
updateDate: 2024-01-19
tags: android, localhost, debug
abstract: 本文主要介绍如何使用手机调试电脑的 localhost
---

## 使用手机调试电脑的 localhost

1. 安装 android studio (安装 android sdk)

2. 将 C:\Users\{user}\AppData\Local\Android\Sdk\platform-tools 路径添加到环境变量 (将 adb.exe 添加到环境变量中)

3. 手机开启开发者模式

4. 手机通过数据线连接电脑

5. 打开 cmd 输入 adb reverse tcp:{port} tcp:{port}

6. 手机浏览器输入 localhost:{port} 即可访问电脑 localhost
