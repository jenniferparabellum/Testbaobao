# GitHub 认证配置指南

远程仓库已成功连接！✅

**远程仓库URL**: `https://github.com/jenniferparabellum/Testbaobao.git`

现在需要配置认证才能推送代码。GitHub提供了两种认证方式：

---

## 方式一：使用 Personal Access Token (PAT) - 推荐新手

### 步骤 1：创建 Personal Access Token

1. **访问GitHub设置**
   - 打开：https://github.com/settings/tokens
   - 或者：GitHub头像 → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **生成新Token**
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 填写信息：
     - **Note**: `本地开发`（描述用途）
     - **Expiration**: 选择过期时间（建议90天或更长）
     - **Select scopes**: 勾选 `repo`（完整仓库访问权限）

3. **生成并复制Token**
   - 点击 "Generate token"
   - ⚠️ **重要**：**立即复制Token**（只显示一次！）
   - 格式类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 步骤 2：推送代码

运行推送命令，当提示输入密码时，使用Token作为密码：

```bash
git push -u origin master
```

**提示时输入：**
- **Username**: `jenniferparabellum`
- **Password**: `粘贴您的Token`（不是GitHub密码！）

---

## 方式二：使用 SSH 密钥 - 推荐长期使用

### 步骤 1：检查是否已有SSH密钥

```bash
ls -al ~/.ssh
```

如果看到 `id_ed25519` 或 `id_rsa` 文件，说明已有密钥。

### 步骤 2：生成SSH密钥（如果没有）

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- 按回车使用默认路径
- 可以设置密码或直接回车（不设置密码）

### 步骤 3：将公钥添加到GitHub

1. **复制公钥内容**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   或者：
   ```bash
   pbcopy < ~/.ssh/id_ed25519.pub  # macOS自动复制到剪贴板
   ```

2. **添加到GitHub**
   - 访问：https://github.com/settings/ssh/new
   - Title: `我的Mac`（描述性名称）
   - Key: 粘贴刚才复制的公钥内容
   - 点击 "Add SSH key"

### 步骤 4：更改远程仓库URL为SSH

```bash
git remote set-url origin git@github.com:jenniferparabellum/Testbaobao.git
```

### 步骤 5：测试SSH连接

```bash
ssh -T git@github.com
```

应该看到：`Hi jenniferparabellum! You've successfully authenticated...`

### 步骤 6：推送代码

```bash
git push -u origin master
```

---

## 快速推送（使用PAT方式）

如果您已经创建了Personal Access Token，可以直接运行：

```bash
git push -u origin master
```

然后：
- Username: `jenniferparabellum`
- Password: `您的Token`

---

## 当前状态

✅ **远程仓库已连接**: `https://github.com/jenniferparabellum/Testbaobao.git`  
✅ **当前分支**: `master`  
⏳ **等待认证配置后推送代码**

配置好认证后，运行推送命令即可完成！
