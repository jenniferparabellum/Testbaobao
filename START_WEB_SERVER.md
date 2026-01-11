# 🌐 启动Web服务器测试

## 快速启动命令

在终端中运行：

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
npm run web
```

或者如果你在新的终端窗口（nvm会自动加载），直接运行：

```bash
cd /Users/parabellum/Desktop/Test
npm run web
```

## 启动后的效果

1. **终端输出** - 你会看到类似以下的输出：
   ```
   › Metro waiting on exp://192.168.x.x:8081
   › Web is waiting on http://localhost:19006
   ```

2. **浏览器自动打开** - 应用会在默认浏览器中自动打开（通常在几秒后）

3. **手动访问** - 如果没有自动打开，手动访问：**http://localhost:19006**

## 测试功能清单

### ✅ 记录功能
- [ ] 点击"吃饭"卡片的"记录"按钮
- [ ] 点击"睡觉"卡片的"记录"按钮
- [ ] 点击"换尿布"卡片的"记录"按钮
- [ ] 检查是否显示"记录已保存！"提示

### ✅ 查看历史记录
- [ ] 点击"查看历史记录"按钮
- [ ] 查看记录是否按日期分组
- [ ] 查看记录时间是否正确显示

### ✅ 删除记录
- [ ] 在历史记录页面点击"删除"按钮
- [ ] 确认记录被删除
- [ ] 返回主页面查看

### ✅ UI测试
- [ ] 检查页面布局是否正常
- [ ] 检查图标和颜色是否显示正确
- [ ] 检查按钮点击响应
- [ ] 测试滚动功能

## 如果服务器没有启动

### 方法1: 在前台运行查看输出

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
npm run web
```

这样可以看到详细的启动信息和任何错误。

### 方法2: 检查端口

```bash
lsof -i :19006
```

如果看到输出，说明端口已被占用。Expo会自动使用其他端口，查看终端输出中的实际地址。

### 方法3: 清除缓存重新启动

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
npx expo start --web --clear
```

## 停止服务器

在终端中按 **`Ctrl + C`** 停止服务器

祝你测试顺利！🎉
