---
title: 在 Linux 中运行 Puppeteer
author: 小恸恸
createDate: 2024-07-30
updateDate: 2024-07-30
tags: linux, puppeteer
abstract: 本文主要介绍如何在 Linux 中运行 Puppeteer
---

```bash
# 安装 puppeteer
npm install puppeteer

# npm 在安装 puppeteer 时会自动下载 chromium，但可能会缺少一些依赖
# 安装 chromium 缺少的依赖
# 参考链接： https://pptr.dev/troubleshooting#chrome-doesnt-launch-on-linux
apt-get update
apt-get install ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# 安装后就能运行了， 不过还缺少一些环境
# 安装基础字体
apt-get install -y ttf-mscorefonts-installer fonts-noto
# 安装中文字体
apt-get install -y fonts-noto-cjk
# 安装 emoji 字体
apt-get install -y fonts-noto-color-emoji
```
