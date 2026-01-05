# 添加远程仓库指南

## 方法一：通过 GitHub 网页创建仓库（推荐）

### 步骤 1：创建 GitHub 仓库

1. **登录 GitHub**
   - 访问 [https://github.com](https://github.com)
   - 登录您的账号

2. **创建新仓库**
   - 点击右上角的 "+" 号，选择 "New repository"
   - 填写仓库信息：
     - **Repository name**: `Test`（或您喜欢的名称）
     - **Description**: （可选）项目描述
     - **Visibility**: 选择 Public（公开）或 Private（私有）
     - ⚠️ **重要**: **不要**勾选 "Initialize this repository with a README"（因为我们本地已有代码）

3. **点击 "Create repository"**

### 步骤 2：连接本地仓库到远程

创建仓库后，GitHub 会显示一个页面，其中包含仓库的 URL。复制该 URL（格式如：`https://github.com/yourusername/Test.git`）

然后运行以下命令：

```bash
# 添加远程仓库（使用 HTTPS）
git remote add origin https://github.com/yourusername/Test.git

# 或者使用 SSH（如果您配置了SSH密钥）
git remote add origin git@github.com:yourusername/Test.git

# 验证远程仓库已添加
git remote -v

# 推送代码到远程仓库
git branch -M main  # 如果GitHub使用main作为默认分支
git push -u origin main  # 或 git push -u origin master
```

## 方法二：使用 GitHub CLI（如果已安装）

如果您安装了 GitHub CLI，可以运行：

```bash
# 登录 GitHub
gh auth login

# 创建仓库并自动连接
gh repo create Test --public --source=. --remote=origin --push
```

## 验证连接

运行以下命令确认远程仓库已正确配置：

```bash
# 查看远程仓库
git remote -v

# 应该显示类似：
# origin  https://github.com/yourusername/Test.git (fetch)
# origin  https://github.com/yourusername/Test.git (push)
```

## 常见问题

### 如果推送时要求认证

GitHub 已不再支持密码认证，您需要：

1. **使用 Personal Access Token (PAT)**
   - 访问 GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
   - 生成新 token，勾选 `repo` 权限
   - 推送时，用户名填您的 GitHub 用户名，密码填生成的 token

2. **或配置 SSH 密钥**
   - 生成 SSH 密钥：`ssh-keygen -t ed25519 -C "your_email@example.com"`
   - 将公钥添加到 GitHub：Settings > SSH and GPG keys
   - 使用 SSH URL：`git@github.com:yourusername/Test.git`

### 如果分支名称不匹配

如果本地是 `master` 分支但远程是 `main` 分支：

```bash
# 重命名本地分支
git branch -M main

# 推送并设置上游
git push -u origin main
```

## 快速连接脚本

创建仓库后，您可以在终端运行以下命令（请替换为您的实际仓库URL）：

```bash
# 替换 YOUR_REPO_URL 为您的实际仓库URL
git remote add origin YOUR_REPO_URL
git branch -M main
git push -u origin main
```
