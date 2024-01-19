---
title: スマホでPCのlocalhostをデバッグする
author: 星川漣
createDate: 2024-01-19
tags: android, localhost, debug
abstract: スマホを使ってPCのlocalhostをデバッグする方法について説明します。
---

## スマホで PC の localhost をデバッグする

1. android studio をインストールする。(android sdk をインストールする )

2. 「C:\Users\{user}\AppData\Local\Android\Sdk\platform-tools」というパースを環境変数に追加する。 (adb.exe を環境変数に追加する)

3. スマホの設定から開発者モードを有効にする。

4. スマホと PC を USB ケーブルで接続する。

5. Teminal で`adb reverse tcp:{port} tcp:{port}`を実行する。

6. スマホのブラウザで localhost:{port} にアクセスする。
