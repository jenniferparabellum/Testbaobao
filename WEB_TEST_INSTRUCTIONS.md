# 🌐 Web服务器测试说明

## 当前状态

Expo进程正在运行，但Web服务器可能还在启动中。

## 推荐方法：在前台启动查看输出

**请在终端中运行以下命令**，这样可以看到完整的启动过程和任何错误：

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18
npm run web
```

## 启动成功的标志

你会看到类似以下的输出：

```
Starting project at /Users/parabellum/Desktop/Test
› Metro waiting on exp://192.168.x.x:8081
› Web is waiting on http://localhost:19006
```

**重要**：请等待直到看到 "Web is waiting on http://localhost:19006" 这条消息。

## 访问应用

1. **浏览器会自动打开**（通常在看到 "Web is waiting" 后几秒）
2. **或手动访问**：http://localhost:19006

## 如果还是无法连接

### 检查1: 等待足够长时间
Expo首次启动Web服务器可能需要30-60秒，请耐心等待。

### 检查2: 查看终端输出
在前台运行时，查看是否有错误信息。

### 检查3: 检查端口
```bash
lsof -i :19006
lsof -i :19007
```

如果看到其他端口被监听，使用那个端口访问。

### 检查4: 清除缓存重新启动
```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18
npx expo start --web --clear
```

## 测试功能

启动成功后，在浏览器中测试：
- ✅ 记录吃饭、睡觉、换尿布
- ✅ 查看历史记录
- ✅ 删除记录

## 停止服务器

在终端中按 **`Ctrl + C`** 停止服务器

祝你测试顺利！🎉
