# 🔧 修复空白页面问题

## 问题
浏览器打开了 http://localhost:8081/ 但显示空白页面。

## 原因
- **8081** 是 Metro bundler 的端口，不是 Web 服务器
- **19006** 才是 Web 服务器的正确端口

## 解决方案

### ✅ 正确的访问地址

请访问：**http://localhost:19006**

**不是** http://localhost:8081

### 检查服务器状态

Web服务器应该显示：
```
› Web is waiting on http://localhost:19006
```

### 如果19006端口无法访问

1. **检查服务器是否在运行**
   ```bash
   lsof -i :19006
   ```

2. **查看终端输出**
   在前台运行时，查看是否有错误信息

3. **清除缓存重新启动**
   ```bash
   cd /Users/parabellum/Desktop/Test
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   nvm use 18
   npx expo start --web --clear
   ```

## 正确的启动和访问流程

1. **启动服务器**（在终端中）
   ```bash
   cd /Users/parabellum/Desktop/Test
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   nvm use 18
   npm run web
   ```

2. **等待看到输出**
   ```
   › Web is waiting on http://localhost:19006
   ```

3. **访问正确的地址**
   - 浏览器会自动打开 http://localhost:19006
   - 或手动访问：**http://localhost:19006**

## 如果页面还是空白

### 检查1: 浏览器控制台
1. 按 F12 打开开发者工具
2. 查看 Console 标签中的错误信息
3. 查看 Network 标签，检查资源是否加载成功

### 检查2: 清除浏览器缓存
- macOS: Cmd+Shift+R
- Windows/Linux: Ctrl+Shift+R

### 检查3: 检查终端输出
查看是否有编译错误或运行时错误

## 测试步骤

1. ✅ 确保服务器正在运行
2. ✅ 访问 **http://localhost:19006**（不是8081）
3. ✅ 检查浏览器控制台是否有错误
4. ✅ 测试应用功能

祝你测试顺利！🎉
