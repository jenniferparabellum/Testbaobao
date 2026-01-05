#!/bin/bash

# 使用Token推送代码到GitHub
# 使用方法: ./push-with-token.sh

echo "🚀 GitHub代码推送脚本"
echo "======================"
echo ""
echo "远程仓库: https://github.com/jenniferparabellum/Testbaobao.git"
echo "当前分支: master"
echo ""

# 检查远程仓库是否已配置
if ! git remote get-url origin &>/dev/null; then
    echo "❌ 错误: 未找到远程仓库配置"
    exit 1
fi

echo "📋 当前远程仓库配置:"
git remote -v
echo ""

# 提示用户输入token
echo "请输入您的GitHub Personal Access Token"
echo "（Token不会显示在屏幕上，输入后按回车）"
echo ""
read -sp "Token: " TOKEN
echo ""

if [ -z "$TOKEN" ]; then
    echo "❌ 错误: Token不能为空"
    exit 1
fi

echo ""
echo "⏳ 正在推送代码..."
echo ""

# 使用token推送（将token嵌入URL）
REMOTE_URL=$(git remote get-url origin)
# 如果URL是HTTPS格式，替换为包含token的格式
if [[ $REMOTE_URL == https://* ]]; then
    # 提取仓库路径部分
    REPO_PATH=$(echo $REMOTE_URL | sed 's|https://||')
    # 构建包含token的URL
    TOKEN_URL="https://${TOKEN}@${REPO_PATH}"
    # 临时设置远程URL
    git remote set-url origin "$TOKEN_URL"
    # 推送
    git push -u origin master
    PUSH_STATUS=$?
    # 恢复原始URL（移除token）
    git remote set-url origin "$REMOTE_URL"
    
    if [ $PUSH_STATUS -eq 0 ]; then
        echo ""
        echo "✅ 成功！代码已推送到GitHub"
        echo "📦 仓库地址: https://github.com/jenniferparabellum/Testbaobao"
    else
        echo ""
        echo "❌ 推送失败，请检查："
        echo "   1. Token是否正确"
        echo "   2. Token是否有repo权限"
        echo "   3. 网络连接是否正常"
        exit 1
    fi
else
    echo "❌ 错误: 远程URL格式不支持"
    exit 1
fi
