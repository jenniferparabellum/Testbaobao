# 快速启动指南 🚀

## 第一步：安装依赖

```bash
npm install
```

或者使用 yarn：

```bash
yarn install
```

## 第二步：启动应用

```bash
npm start
```

## 第三步：在设备上运行

### 选项 1: 在网页浏览器中运行（最简单）

```bash
npm run web
```

应用会在默认浏览器中打开（通常是 http://localhost:19006）

### 选项 2: 使用 Expo Go（移动设备）

1. 在 iPhone 或 Android 手机上安装 **Expo Go** 应用
   - iOS: [App Store 下载](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play 下载](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. 启动开发服务器后，扫描终端中显示的二维码

3. 应用会在手机上打开

### 选项 3: 使用模拟器

**iOS 模拟器（需要 macOS）：**
```bash
npm run ios
```

**Android 模拟器：**
```bash
npm run android
```

## 使用应用

1. **记录活动**：点击主页面上的"吃饭"、"睡觉"或"换尿布"按钮
2. **查看记录**：点击"查看历史记录"查看所有记录
3. **删除记录**：在历史记录页面点击"删除"按钮

## 故障排除

### 如果遇到 "expo: command not found"
```bash
npm install -g expo-cli
```

### 如果端口被占用
```bash
# 停止占用端口的进程，或使用其他端口
expo start --port 8082
```

### 清除缓存
```bash
expo start --clear
```
