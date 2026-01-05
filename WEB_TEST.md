# 网页端测试指南 🌐

## 步骤 1: 解决npm权限问题（如果需要）

如果遇到npm缓存权限错误，请先运行：

```bash
sudo chown -R $(whoami) ~/.npm
```

或者按照错误提示运行：
```bash
sudo chown -R 501:20 "/Users/parabellum/.npm"
```

## 步骤 2: 安装依赖

在项目目录下运行：

```bash
cd /Users/parabellum/Desktop/Test
npm install
```

如果遇到网络问题，可以使用国内镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

## 步骤 3: 启动Web服务器

运行以下命令启动Web开发服务器：

```bash
npm run web
```

或者：

```bash
npx expo start --web
```

## 步骤 4: 在浏览器中打开

启动成功后，你应该看到类似以下的输出：

```
Web is waiting on http://localhost:19006
```

**应用会在默认浏览器中自动打开**，或者你可以手动访问：
- http://localhost:19006

## 步骤 5: 测试功能

在浏览器中测试以下功能：

1. ✅ **记录吃饭** - 点击"吃饭"卡片的"记录"按钮
2. ✅ **记录睡觉** - 点击"睡觉"卡片的"记录"按钮
3. ✅ **记录换尿布** - 点击"换尿布"卡片的"记录"按钮
4. ✅ **查看历史记录** - 点击"查看历史记录"按钮
5. ✅ **删除记录** - 在历史记录页面点击"删除"按钮

## 常见问题

### 问题1: 端口被占用

如果19006端口被占用，Expo会自动使用其他端口，查看终端输出中的实际地址。

### 问题2: 浏览器没有自动打开

手动在浏览器中访问终端显示的地址（通常是 http://localhost:19006）

### 问题3: 页面空白或加载错误

1. 检查浏览器控制台是否有错误（按F12打开开发者工具）
2. 清除浏览器缓存并刷新页面
3. 重新运行 `npm run web`

### 问题4: 需要停止服务器

在终端中按 `Ctrl + C` 停止服务器

## 快速命令参考

```bash
# 安装依赖
npm install

# 启动Web服务器
npm run web

# 清除缓存后启动
npx expo start --web --clear

# 查看帮助
npx expo start --help
```

祝你测试顺利！🎉
