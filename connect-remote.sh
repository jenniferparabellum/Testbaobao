#!/bin/bash

# 连接远程仓库脚本
# 使用方法: ./connect-remote.sh <仓库URL>
# 例如: ./connect-remote.sh https://github.com/username/Test.git

if [ -z "$1" ]; then
    echo "❌ 错误: 请提供远程仓库URL"
    echo ""
    echo "使用方法:"
    echo "  ./connect-remote.sh <仓库URL>"
    echo ""
    echo "示例:"
    echo "  ./connect-remote.sh https://github.com/yourusername/Test.git"
    echo "  或"
    echo "  ./connect-remote.sh git@github.com:yourusername/Test.git"
    exit 1
fi

REPO_URL=$1

echo "🔗 正在连接远程仓库..."
echo "仓库URL: $REPO_URL"
echo ""

# 检查是否已有远程仓库
if git remote | grep -q "^origin$"; then
    echo "⚠️  检测到已存在 origin 远程仓库"
    read -p "是否要更新为新的URL? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
        echo "✅ 已更新远程仓库URL"
    else
        echo "❌ 操作已取消"
        exit 1
    fi
else
    git remote add origin "$REPO_URL"
    echo "✅ 已添加远程仓库"
fi

# 显示当前远程仓库
echo ""
echo "📋 当前远程仓库配置:"
git remote -v
echo ""

# 询问是否推送
read -p "是否要推送代码到远程仓库? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # 检查当前分支
    CURRENT_BRANCH=$(git branch --show-current)
    echo "当前分支: $CURRENT_BRANCH"
    
    # 询问分支名称
    read -p "推送到哪个分支? (直接回车使用 $CURRENT_BRANCH): " BRANCH_NAME
    BRANCH_NAME=${BRANCH_NAME:-$CURRENT_BRANCH}
    
    echo ""
    echo "🚀 正在推送代码到 origin/$BRANCH_NAME..."
    git push -u origin "$BRANCH_NAME"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ 成功! 代码已推送到远程仓库"
    else
        echo ""
        echo "❌ 推送失败，请检查:"
        echo "   1. 仓库URL是否正确"
        echo "   2. 是否有推送权限"
        echo "   3. 是否已正确配置认证（Personal Access Token 或 SSH密钥）"
    fi
else
    echo "ℹ️  您可以稍后使用以下命令推送:"
    echo "   git push -u origin <分支名>"
fi
