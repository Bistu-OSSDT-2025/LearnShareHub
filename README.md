<<<<<<< HEAD
# LearnShareHub 🎓

> 校园学习交流平台 - 让知识分享更简单

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/react-18.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-5.x-646CFF)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/supabase-3ECF8E)](https://supabase.com/)

## 📖 项目简介

LearnShareHub 是一个专为校园设计的学习交流平台，类似于百度贴吧的模式，但专注于学术交流。学生可以在各个科目板块下分享学习资料、讨论课程内容、交流学习心得。

### ✨ 核心特色

- 🏫 **科目分类**: 按学科组织的讨论板块
- 📚 **资料分享**: 支持多种格式的学习资料上传
- 💬 **实时讨论**: 课程讨论和学习交流
- 👥 **学习小组**: 组建学习小组，协作学习
- 🔍 **智能搜索**: 快速找到相关学习资源
- 📱 **响应式设计**: 支持手机、平板、电脑多端访问

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5.x
- **UI 组件库**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS
- **状态管理**: TanStack Query (React Query)
- **路由**: React Router v6
- **表单处理**: React Hook Form + Zod
- **图表**: Recharts
- **图标**: Lucide React

### 后端服务
- **BaaS**: Supabase
- **数据库**: PostgreSQL (Supabase)
- **认证**: Supabase Auth
- **实时功能**: Supabase Realtime
- **文件存储**: Supabase Storage

### 开发工具
- **代码规范**: ESLint + TypeScript ESLint
- **样式工具**: Tailwind CSS + PostCSS
- **包管理**: npm
- **开发平台**: Lovable (可视化开发)

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/LearnShareHub.git
cd LearnShareHub

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动。

### Supabase 配置

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 获取项目的 URL 和 anon key
3. 在项目根目录创建 `.env.local` 文件：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 使用 Lovable 开发

本项目支持在 [Lovable](https://lovable.dev) 平台进行可视化开发：

1. 访问 [Lovable 项目页面](https://lovable.dev/projects/056e8b2f-1bd3-4079-a5f0-12029e593a33)
2. 直接在浏览器中编辑和预览
3. 更改会自动同步到 GitHub 仓库

## 📁 项目结构

```
LearnShareHub/
├── public/                   # 静态资源
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/                      # 源代码目录
│   ├── components/           # React 组件
│   │   ├── ui/              # shadcn/ui 基础组件
│   │   ├── Header.tsx       # 头部组件
│   │   ├── HeroSection.tsx  # 首页英雄区域
│   │   ├── PostCard.tsx     # 帖子卡片
│   │   ├── StudyGroupCard.tsx # 学习小组卡片
│   │   └── SubjectCard.tsx  # 科目卡片
│   ├── hooks/               # 自定义 Hooks
│   │   ├── use-mobile.tsx   # 移动端检测
│   │   └── use-toast.ts     # Toast 通知
│   ├── integrations/        # 第三方服务集成
│   │   └── supabase/        # Supabase 配置
│   ├── lib/                 # 工具库
│   │   └── utils.ts         # 通用工具函数
│   ├── pages/               # 页面组件
│   │   ├── Index.tsx        # 首页
│   │   └── NotFound.tsx     # 404页面
│   ├── App.tsx              # 应用主组件
│   ├── main.tsx             # 应用入口
│   ├── index.css            # 全局样式
│   └── vite-env.d.ts        # Vite 类型定义
├── supabase/                 # Supabase 配置
│   └── config.toml
├── components.json           # shadcn/ui 配置
├── tailwind.config.ts        # Tailwind CSS 配置
├── vite.config.ts           # Vite 配置
├── package.json             # 项目依赖
└── README.md                # 项目说明
```

## 🔧 开发指南

### 代码规范

项目使用 ESLint 和 TypeScript ESLint 来保持代码风格一致：

```bash
# 检查代码规范
npm run lint
```

### 可用脚本

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 构建开发版本
npm run build:dev

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

### 组件开发

项目使用 shadcn/ui 组件库，新组件应该：

1. 遵循现有的组件结构
2. 使用 Tailwind CSS 进行样式设计
3. 支持响应式设计
4. 包含适当的 TypeScript 类型定义

### 提交规范

请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 添加用户注册功能
fix: 修复文件上传bug
docs: 更新API文档
style: 调整登录页面样式
refactor: 重构用户服务模块
```

## 📦 构建和部署

### 本地构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### Lovable 部署

在 Lovable 平台部署非常简单：

1. 在 [Lovable 项目页面](https://lovable.dev/projects/056e8b2f-1bd3-4079-a5f0-12029e593a33) 点击 "Share" → "Publish"
2. 项目将自动构建并部署到 Lovable 的 CDN
3. 获得可分享的公开链接

### 自定义域名

如需绑定自定义域名：

1. 在 Lovable 项目中进入 Project > Settings > Domains
2. 点击 "Connect Domain"
3. 按照指引配置 DNS 记录

详细说明请参考：[Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读 [贡献指南](CONTRIBUTING.md) 了解如何参与项目开发。

### 如何贡献

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feat/amazing-feature`)
3. 提交你的修改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feat/amazing-feature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📞 联系我们

- 项目主页: [GitHub Repository](https://github.com/your-username/LearnShareHub)
- 问题反馈: [Issues](https://github.com/your-username/LearnShareHub/issues)
- 讨论交流: [Discussions](https://github.com/your-username/LearnShareHub/discussions)

## 🌟 特性展示

当前项目包含以下主要功能：

- ✅ 响应式首页设计
- ✅ 科目分类展示
- ✅ 帖子卡片组件
- ✅ 学习小组卡片
- ✅ 现代化 UI 设计
- 🚧 用户认证系统（开发中）
- 🚧 帖子发布功能（开发中）
- 🚧 实时聊天功能（开发中）

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
