# 🌐 启动Web服务器的说明

## 快速启动

在终端中运行以下命令：

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
npm run web
```

## 或者使用简化命令（如果nvm已配置）

如果你的终端已自动加载nvm（新打开的终端会自动加载），可以直接运行：

```bash
cd /Users/parabellum/Desktop/Test
npm run web
```

## 启动后的预期输出

启动成功后，你会看到类似以下的输出：

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:19006

```

## 访问应用

1. **浏览器会自动打开**应用（通常在几秒后）
2. 或者手动访问：**http://localhost:19006**

## 如果遇到问题

### 问题1: 找不到nvm命令

在新终端中运行：
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### 问题2: 端口被占用

Expo会自动使用其他端口，查看终端输出中的实际地址。

### 问题3: 需要停止服务器

按 **`Ctrl + C`**

## 测试功能

在浏览器中测试：
- ✅ 记录吃饭、睡觉、换尿布
- ✅ 查看历史记录
- ✅ 删除记录

祝你使用愉快！🎉
