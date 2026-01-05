# Cursor Git 问题解决方案

## 问题
Cursor中提交时出现 "failed to execute git" 错误

## 解决方案

### 方案1: 检查并设置Cursor的Git路径

1. 打开Cursor设置（Cmd+, 或 Cursor > Preferences > Settings）
2. 搜索 "git.path"
3. 确保路径正确（通常是 `/usr/bin/git`）

或者创建 `.vscode/settings.json` 文件（已创建）：
```json
{
  "git.path": "/usr/bin/git",
  "git.enabled": true
}
```

### 方案2: 使用终端提交（推荐，最可靠）

如果Cursor的git集成有问题，可以直接在终端提交：

```bash
cd /Users/parabellum/Desktop/Test
git add .
git commit -m "你的提交信息"
```

### 方案3: 重启Cursor

有时候重启Cursor可以解决git集成问题：
1. 完全退出Cursor（Cmd+Q）
2. 重新打开Cursor
3. 重新打开项目

### 方案4: 检查权限

确保git可执行文件有执行权限：
```bash
ls -la /usr/bin/git
# 应该显示 -r-xr-xr-x 或类似
```

### 方案5: 重新设置git用户信息

```bash
cd /Users/parabellum/Desktop/Test
git config user.name "你的名字"
git config user.email "你的邮箱"
```

### 诊断信息

运行以下命令获取诊断信息：
```bash
cd /Users/parabellum/Desktop/Test
which git
git --version
git status
git config --list --local
```

## 推荐做法

如果Cursor的git集成一直有问题，建议：
1. 使用终端进行git操作（最可靠）
2. 使用Cursor的Source Control面板查看更改
3. 使用终端进行提交和推送

这样既能利用Cursor的代码查看功能，又能确保git操作正常。
