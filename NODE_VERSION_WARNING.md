# ⚠️ Node.js 版本警告

## 当前状态

依赖已成功安装！但是检测到您的 Node.js 版本较旧：

- **当前版本**: v12.16.1
- **推荐版本**: >= 18.0.0
- **Expo/React Native 要求**: >= 18.0.0

## 重要提示

虽然依赖已经安装，但使用旧版本的 Node.js 可能导致：

1. ⚠️ 运行时错误
2. ⚠️ 某些功能无法正常工作
3. ⚠️ 性能问题

## 解决方案：升级 Node.js

### 方法 1: 使用 Homebrew（推荐，macOS）

```bash
# 安装最新版本的 Node.js
brew install node

# 或者使用 nvm（Node Version Manager）
brew install nvm
nvm install 18
nvm use 18
nvm alias default 18
```

### 方法 2: 从官网下载

访问 [Node.js 官网](https://nodejs.org/) 下载并安装最新 LTS 版本（推荐 18.x 或 20.x）

### 方法 3: 使用 nvm（推荐，可管理多个版本）

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重启终端或运行
source ~/.bashrc  # 或 source ~/.zshrc

# 安装 Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# 验证版本
node --version
```

## 升级后

升级 Node.js 后，建议重新安装依赖：

```bash
cd /Users/parabellum/Desktop/Test
rm -rf node_modules package-lock.json
npm install
```

## 临时使用（不推荐）

如果暂时无法升级 Node.js，可以尝试运行，但可能会遇到问题。如果遇到错误，请务必升级 Node.js 版本。
