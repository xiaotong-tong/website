---
title: Linux で Puppeteer を実行する
author: 星川漣
createDate: 2024-09-17
updateDate: 2024-09-17
tags: linux, puppeteer
abstract: Linux で Puppeteer を実行する方法について説明します。puppeteer パッケージのインストール、chromium が必要とする依存関係のインストール、フォントのインストールなどについて説明します。
---

windows で Puppeteer を実行するのは簡単です。puppeteer パッケージをインストールするだけです。しかし、Linux で Puppeteer を実行する場合、依存関係が不足して実行に失敗する、フォントが不足してページが文字化けするなどの問題が発生する可能性があります。

```bash
# puppeteer のインストール
npm install puppeteer

# npm は puppeteer をインストールする際に自動的に chromium をダウンロードしますが、いくつかの依存関係が不足している可能性があるため、chromium が実行できないことがあります
# chromium が必要とする依存関係のインストール
# 参考リンク： https://pptr.dev/troubleshooting#chrome-doesnt-launch-on-linux
apt-get update
apt-get install ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# インストール後、実行できるようになりますが、実行時にページが文字化けする問題が発生する可能性があります。これはフォントが不足しているためです
# 基本フォントのインストール
apt-get install -y ttf-mscorefonts-installer fonts-noto
# 中国文字フォントのインストール
apt-get install -y fonts-noto-cjk
# emoji フォントのインストール
apt-get install -y fonts-noto-color-emoji
```
