# 📤 推送代码到GitHub - 使用Token

## 快速推送步骤

### 方法1：使用推送脚本（推荐）✨

1. **在终端中运行脚本**：
   ```bash
   ./push-with-token.sh
   ```

2. **输入您的Token**：
   - 脚本会提示您输入Token
   - Token输入时不会显示在屏幕上（安全）
   - 输入完成后按回车

3. **等待推送完成**：
   - 脚本会自动使用Token推送代码
   - 成功后会在终端显示确认信息

---

### 方法2：直接在命令中使用Token

如果您想直接运行命令，可以使用以下方式：

```bash
git push https://YOUR_TOKEN@github.com/jenniferparabellum/Testbaobao.git master
```

将 `YOUR_TOKEN` 替换为您的实际Token。

---

### 方法3：使用Git Credential Helper（一次性配置）

```bash
# 配置credential helper（仅这次会话）
git config --global credential.helper cache

# 推送代码（会提示输入用户名和token）
git push -u origin master
# Username: jenniferparabellum
# Password: 粘贴您的Token
```

---

## 当前配置状态

✅ **远程仓库**: `https://github.com/jenniferparabellum/Testbaobao.git`  
✅ **本地分支**: `master`  
✅ **脚本已就绪**: `push-with-token.sh`  
⏳ **等待Token推送**

---

## 获取Token的方法（如果还没有）

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成并复制Token

---

## 安全提示

⚠️ **重要**：
- Token只显示一次，请妥善保存
- 不要在公共场合分享Token
- 如果Token泄露，立即到GitHub撤销并重新生成

---

准备好Token后，运行 `./push-with-token.sh` 即可！
