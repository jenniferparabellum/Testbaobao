# 宝宝记录 App 👶

一个专为家庭设计的跨平台移动应用，用于记录婴儿的日常生活（吃饭、睡觉、换尿布）。

## 功能特点

- ✅ **跨平台支持** - 同时支持 iOS、Android 和 Web 网页
- 📱 **简洁美观的界面** - 现代化的 Material Design 风格
- 📝 **三种记录类型** - 吃饭、睡觉、换尿布
- 📊 **历史记录查看** - 按日期分组查看所有记录
- 💾 **本地数据存储** - 使用 AsyncStorage 持久化保存数据
- 🗑️ **删除功能** - 可以删除不需要的记录

## 技术栈

- **React Native** - 跨平台移动应用框架
- **Expo** - React Native 开发工具链
- **React Native Paper** - Material Design 组件库
- **AsyncStorage** - 本地数据存储

## 安装和运行

### 前置要求

- Node.js (推荐 v16 或更高版本)
- npm 或 yarn
- Expo CLI (可以通过 npm 安装)

### 安装步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm start
   ```

3. **运行应用**

   - **在网页浏览器中运行：**
     ```bash
     npm run web
     ```
     或者按 `w` 键
     应用会在默认浏览器中打开（通常是 http://localhost:19006）

   - **在 iOS 模拟器上运行：**
     ```bash
     npm run ios
     ```
     或者按 `i` 键

   - **在 Android 模拟器上运行：**
     ```bash
     npm run android
     ```
     或者按 `a` 键

   - **在真实设备上运行：**
     1. 在手机上安装 Expo Go 应用（从 App Store 或 Google Play）
     2. 启动开发服务器后，扫描终端中显示的二维码

### 构建生产版本

要构建可以分发的应用：

1. **安装 EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **登录 Expo 账号**
   ```bash
   eas login
   ```

3. **配置项目**
   ```bash
   eas build:configure
   ```

4. **构建应用**
   ```bash
   # iOS
   eas build --platform ios
   
   # Android
   eas build --platform android
   
   # Web (构建静态网站)
   expo export:web
   
   # 或者同时构建所有平台
   eas build --platform all
   ```

## 使用说明

1. **记录活动**
   - 点击主页面上的三个卡片（吃饭、睡觉、换尿布）
   - 系统会自动记录当前时间
   - 保存成功后会显示提示

2. **查看历史记录**
   - 点击"查看历史记录"按钮
   - 记录按日期分组显示
   - 可以查看详细的记录时间

3. **删除记录**
   - 在历史记录页面，点击记录右侧的"删除"按钮
   - 确认删除后，记录将被永久删除

## 项目结构

```
baby-tracker/
├── App.js                 # 主应用文件
├── app.json              # Expo 配置文件
├── package.json          # 项目依赖
├── babel.config.js       # Babel 配置
├── src/
│   └── screens/
│       ├── MainScreen.js    # 主屏幕（记录功能）
│       └── HistoryScreen.js # 历史记录屏幕
└── README.md             # 项目说明文档
```

## 未来可扩展功能

- 🔔 推送通知提醒
- 📈 数据统计和图表
- ☁️ 云同步功能
- 👥 多用户支持
- 📷 照片记录
- 🏷️ 自定义标签和备注

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎反馈！
