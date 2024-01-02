# 使用手机调试电脑的 localhost

1. 安装 android studio (android sdk)

2. 将 C:\Users\{user}\AppData\Local\Android\Sdk\platform-tools 路径添加到环境变量 (adb.exe)

3. 手机开启开发者模式

4. 手机通过数据线连接电脑

5. 打开 cmd 输入 adb reverse tcp:{port} tcp:{port}

6. 手机浏览器输入 localhost:{port} 即可访问电脑 localhost
