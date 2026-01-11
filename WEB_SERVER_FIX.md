# 🔧 Web服务器连接问题修复

## 问题
访问 http://localhost:19006 时出现 "ERR_CONNECTION_REFUSED" 错误。

## 可能的原因
1. 服务器没有成功启动
2. 服务器启动时间较长，需要等待
3. 端口被占用，Expo使用了其他端口
4. nvm环境变量未正确加载

## 解决方案

### 方法1: 在前台启动查看输出（推荐）

在终端中运行：

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18
npm run web
```

这样可以看到详细的启动信息和任何错误。

### 方法2: 检查服务器是否在运行

```bash
# 检查进程
ps aux | grep expo

# 检查端口
lsof -i :19006
lsof -i :19007
```

### 方法3: 清除缓存重新启动

```bash
cd /Users/parabellum/Desktop/Test
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18
npx expo start --web --clear
```

## 启动成功的标志

你会看到类似以下的输出：
```
› Metro waiting on exp://192.168.x.x:8081
› Web is waiting on http://localhost:19006
```

然后浏览器会自动打开，或手动访问显示的地址。

## 如果还是无法连接

1. **等待更长时间** - Expo服务器启动可能需要20-30秒
2. **检查终端输出** - 查看是否有错误信息
3. **尝试其他端口** - 查看终端输出中显示的实际端口号
4. **重启服务器** - 停止当前进程（Ctrl+C），然后重新启动

## 测试步骤

1. ✅ 确保依赖已安装（react-native-web, react-dom, @expo/metro-runtime）
2. ✅ 在前台启动服务器查看输出
3. ✅ 等待看到 "Web is waiting on http://localhost:XXXX"
4. ✅ 在浏览器中访问显示的地址
5. ✅ 测试应用功能
