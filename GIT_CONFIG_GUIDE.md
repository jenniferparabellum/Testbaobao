# Git 配置指南

## Cursor/VSCode Git 路径问题

如果在 Cursor 中遇到 "failed to execute git" 错误，可以按照以下方法配置：

### 推荐方法：使用 Cursor 设置（不提交到仓库）

1. **打开 Cursor 设置**
   - 按 `Cmd+,` (macOS) 或 `Ctrl+,` (Windows/Linux)
   - 或点击 `Cursor > Preferences > Settings`

2. **搜索 "git.path"**
   - 在设置搜索框中输入 `git.path`

3. **设置 Git 路径**
   - 如果是 macOS/Linux，通常使用：
     - `/usr/bin/git` (系统默认)
     - `/usr/local/bin/git` (Homebrew)
     - 或留空让系统自动查找
   - 如果是 Windows，通常是：
     - `C:\Program Files\Git\bin\git.exe`
     - 或留空让系统自动查找

4. **查找 Git 路径**
   
   在终端中运行：
   ```bash
   which git    # macOS/Linux
   where git    # Windows
   ```

### 为什么不在仓库中提交 `.vscode/settings.json`？

- ✅ **环境差异**：不同开发者可能使用不同的 Git 安装路径
- ✅ **操作系统差异**：Windows、macOS、Linux 的路径完全不同
- ✅ **个人偏好**：每个开发者可能有不同的 IDE 配置
- ✅ **最佳实践**：IDE 配置文件应该保持在本地，不提交到版本控制

### 替代方案：使用终端

如果 Cursor 的 Git 集成一直有问题，可以：

1. **在 Cursor 中查看代码和更改**
2. **在终端中进行 Git 操作**（提交、推送等）

这是最可靠的方法，不依赖于 IDE 的 Git 集成。

### 快速诊断

如果遇到 Git 问题，运行以下命令：

```bash
# 检查 Git 是否安装
git --version

# 检查 Git 路径
which git    # macOS/Linux
where git    # Windows

# 检查 Git 配置
git config --list
```
