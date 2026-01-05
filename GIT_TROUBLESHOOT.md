# Git 问题排查指南

## 问题：Cursor 中提交时出现 "failed to execute git" 错误

### 可能的原因

1. **Git 仓库位置问题** - Cursor可能无法找到正确的git仓库
2. **权限问题** - git配置文件或.git目录的权限问题
3. **Git路径问题** - Cursor找不到git可执行文件
4. **工作目录问题** - 工作目录与git仓库不匹配

### 检查步骤

#### 1. 确认git仓库位置

```bash
cd /Users/parabellum/Desktop/Test
git rev-parse --git-dir
# 应该显示: .git
```

#### 2. 检查git是否正常工作

```bash
cd /Users/parabellum/Desktop/Test
git status
git log --oneline
```

#### 3. 在终端中手动提交测试

```bash
cd /Users/parabellum/Desktop/Test
git add .
git commit -m "Test commit"
```

如果终端中能正常提交，说明git本身没问题，问题在Cursor的集成。

### 解决方案

#### 方案1: 重新初始化git仓库（如果git仓库有问题）

```bash
cd /Users/parabellum/Desktop/Test
rm -rf .git
git init
git add .
git commit -m "Initial commit"
```

#### 方案2: 检查Cursor的git设置

在Cursor中：
1. 打开设置 (Cmd+,)
2. 搜索 "git.path"
3. 确保git路径正确（通常是 `/usr/bin/git` 或 `/usr/local/bin/git`）

#### 方案3: 使用终端提交

如果Cursor的git集成有问题，可以暂时使用终端：

```bash
cd /Users/parabellum/Desktop/Test
git add .
git commit -m "你的提交信息"
```

#### 方案4: 重启Cursor

有时候重启Cursor可以解决git集成问题。

### 快速诊断命令

运行以下命令检查git状态：

```bash
cd /Users/parabellum/Desktop/Test
echo "=== Git位置 ==="
which git
echo "=== Git版本 ==="
git --version
echo "=== Git仓库 ==="
git rev-parse --git-dir
echo "=== Git状态 ==="
git status --short
echo "=== 分支信息 ==="
git branch
```
