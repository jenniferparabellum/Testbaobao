# 🌐 在前台启动Web服务器（查看详细输出）

## 问题
后台启动无法看到详细输出，无法诊断Web服务器为什么没有启动。

## 解决方案：在前台启动

**请在终端中运行以下命令**，这样可以看到完整的启动过程和任何错误：

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18
npm run web
```

## 启动过程

启动时你会看到：

1. **初始输出**
   ```
   Starting project at /Users/parabellum/Desktop/Test
   ```

2. **编译过程**
   - Metro bundler 启动
   - 编译 JavaScript 和资源
   - Webpack 编译（Web平台）

3. **成功标志**
   ```
   › Metro waiting on exp://192.168.x.x:8081
   › Web is waiting on http://localhost:19006
   ```

4. **浏览器自动打开**
   - 应用会在默认浏览器中自动打开
   - 或手动访问显示的地址

## 如果看到错误

### 错误1: 缺少依赖
如果看到依赖错误，运行：
```bash
npx expo install react-native-web react-dom @expo/metro-runtime
```

### 错误2: 编译错误
查看终端中的错误信息，通常是代码问题。常见错误：
- 语法错误
- 导入路径错误
- 缺少组件或模块

### 错误3: 端口被占用
Expo会自动使用其他端口，查看输出中的实际地址。

## 启动时间

Expo服务器启动通常需要：
- **首次启动**: 30-60秒
- **后续启动**: 10-20秒

请耐心等待，直到看到 "Web is waiting on..." 消息。

## 停止服务器

在终端中按 **`Ctrl + C`** 停止服务器

## 测试

启动成功后，在浏览器中测试：
- ✅ 记录吃饭、睡觉、换尿布
- ✅ 查看历史记录
- ✅ 删除记录

## 如果Web服务器仍然不启动

1. **检查依赖是否完整**
   ```bash
   npm list react-native-web react-dom @expo/metro-runtime
   ```

2. **清除缓存重新启动**
   ```bash
   npx expo start --web --clear
   ```

3. **检查app.json配置**
   确保 `app.json` 中有 `web` 配置对象

祝你测试顺利！🎉
