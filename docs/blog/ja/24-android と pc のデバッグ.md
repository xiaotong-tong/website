---
title: android と pc のデバッグ
author: 星川漣
createDate: 2024-09-20
category: ウェブ
tags: android,localhost,debug,inspect
thumbnail: https://image.xtt.cool/local/images/2024/09/20/GALCG----2.jpg
abstract: スマホで PC の localhost にアクセスする方法と、Chrome でスマホのページをデバッグする方法を紹介します
prevId: 23
prevTitle: documentPictureInPicture API 勉強記録
nextId: 25
nextTitle: Web NFC を使用して、スマホのブラウザでログイン機能を実装する
---

## スマホで PC の localhost にアクセスする

1. adb 　をインストールする

    1. android studio をインストールする (android sdk をインストールする)

    2. `C:\Users\{user}\AppData\Local\Android\Sdk\platform-tools ` のパスを環境変数に追加する (adb.exe を環境変数に追加する)

2. スマホの開発者モードを有効にして、データケーブルで PC に接続する

3. cmd で `adb reverse tcp:{androidport} tcp:{pcport}` を入力する

4. スマホのブラウザで localhost:{androidport} にアクセスすると、PC の localhost にアクセスできます

## Chrome でスマホのページをデバッグする

1. スマホの開発者モードを有効にして、データケーブルで PC に接続する

2. Chrome を開いて、chrome://inspect/#devices を入力する

![chrome inspect](https://image.xtt.cool/local/images/2024/09/20/image.png)

1. 対応の画面の `inspect` をクリックすると、スマホのページをデバッグできます

![chrome inspect](https://image.xtt.cool/local/images/2024/09/20/imageb5c4f040c1ee38cf.png)
