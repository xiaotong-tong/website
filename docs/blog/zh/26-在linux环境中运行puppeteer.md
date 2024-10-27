---
title: 在 Linux 中运行 Puppeteer
author: 小恸恸
createDate: 2024-07-30
category: 网络互联
tags: linux, puppeteer
abstract: 本文主要介绍如何在 Linux 中运行 Puppeteer，如安装 puppeteer 包，安装 chromium 缺少的依赖，安装字体等。
prevId: 25
prevTitle: 使用 Web NFC 实现手机端浏览器的登录功能
nextId: 27
nextTitle: ナミダノコエ 歌詞
---

在 windows 中运行 Puppeteer 是非常简单的，只需要安装 puppeteer 包即可，但是在 Linux 中运行 Puppeteer 时可能会遇到一些问题，比如缺少依赖运行失败，缺少字体网页乱码等问题。

```bash
# 安装 puppeteer
npm install puppeteer

# npm 在安装 puppeteer 时会自动下载 chromium，但可能会缺少一些依赖，导致 chromium 无法运行
# 安装 chromium 缺少的依赖
# 参考链接： https://pptr.dev/troubleshooting#chrome-doesnt-launch-on-linux
apt-get update
apt-get install ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# 安装后就能运行了， 不过在运行时可能会遇到网页乱码的问题，这是因为缺少字体
# 安装基础字体
apt-get install -y ttf-mscorefonts-installer fonts-noto
# 安装中文字体
apt-get install -y fonts-noto-cjk
# 安装 emoji 字体
apt-get install -y fonts-noto-color-emoji
```
