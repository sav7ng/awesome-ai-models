# 🤖 Awesome AI Models

> 探索开源 AI 模型的演进时间线 - 见证人工智能民主化的历程

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://sav7ng.github.io/awesome-ai-models/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ 特性

- 🎨 **极简科技风格** - 现代化的设计，专注内容本身
- 🌐 **多语言支持** - 支持中文/英文切换，自动检测浏览器语言
- 🌗 **深浅色主题** - 支持深色/浅色模式自动切换
- ⏱️ **时间线展示** - 清晰展示 AI 模型发展历程
- 🔍 **智能筛选** - 按组织、类型快速筛选模型
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ✨ **炫酷动效** - 粒子背景、滚动动画、Hover 特效
- 🚀 **纯前端实现** - 无需后端，CDN 加载，秒开

## 📦 技术栈

- **框架**: 纯前端（零构建）
- **CSS**: [TailwindCSS](https://tailwindcss.com/) (CDN)
- **状态管理**: [Alpine.js](https://alpinejs.dev/)
- **动效**: [AOS.js](https://michalsnik.github.io/aos/) + [Particles.js](https://vincentgarreau.com/particles.js/)
- **托管**: GitHub Pages

## 🚀 快速开始

### 在线访问

直接访问：[https://ai.sav7ng.com](https://ai.sav7ng.com)

### 本地运行

1. 克隆仓库：
```bash
git clone https://github.com/sav7ng/awesome-ai-models.git
cd awesome-ai-models
```

2. 启动本地服务器（任选其一）：

**使用 Python:**
```bash
cd docs
python -m http.server 8000
```

**使用 Node.js:**
```bash
cd docs
npx serve
```

**使用 PHP:**
```bash
cd docs
php -S localhost:8000
```

3. 打开浏览器访问：`http://localhost:8000`

## 📊 收录模型

目前收录了 **28+** 个知名开源 AI 模型，包括：

### 大语言模型 (LLM)
- LLaMA / LLaMA 2 / LLaMA 3 (Meta)
- Mistral 7B / Mixtral 8x7B (Mistral AI)
- Gemma (Google)
- DeepSeek-V2 (DeepSeek)
- Qwen 2 (Alibaba)
- Grok-1 (xAI)
- 以及更多...

### 多模态模型
- CLIP (OpenAI)
- LLaVA (Microsoft)
- Qwen 2 (Alibaba)

### 视觉模型
- Stable Diffusion (Stability AI)
- FLUX (Black Forest Labs)
- DALL-E Mini (Hugging Face)

### 语音模型
- Whisper (OpenAI)
- Bark (Suno)

## 🤝 贡献指南

欢迎贡献新的开源模型！请遵循以下步骤：

1. Fork 本仓库
2. 在 `docs/models.json` 中添加新模型：

```json
{
  "name": "模型名称",
  "org": "组织名称",
  "date": "YYYY-MM-DD",
  "repo": "https://github.com/...",
  "tags": ["LLM"],
  "description": "简短描述"
}
```

3. 提交 Pull Request

### 模型收录标准

- ✅ 必须是开源模型（有公开的 GitHub 仓库或权重）
- ✅ 具有一定影响力或创新性
- ✅ 提供准确的发布日期
- ✅ 包含简洁的中文描述

## 📁 项目结构

```
awesome-ai-models/
├── docs/                 # GitHub Pages 根目录
│   ├── index.html       # 主页
│   ├── models.json      # 模型数据
│   ├── css/
│   │   └── style.css    # 自定义样式
│   ├── js/
│   │   └── app.js       # 主逻辑
│   └── assets/          # 静态资源
├── README.md
└── .gitignore
```

## 🎨 功能特性

### 🔍 智能搜索
- 实时搜索模型名称、组织、描述
- 支持中英文混合搜索

### 🏷️ 多维筛选
- 按组织筛选（Meta、Google、OpenAI 等）
- 按类型筛选（LLM、多模态、视觉、语音）
- 支持组合筛选

### 📊 双视图切换
- **时间线视图**：按时间顺序展示，左右交错布局
- **网格视图**：卡片式展示，便于快速浏览

### 🎭 深浅色主题
- 自动检测系统主题
- 手动切换深浅色模式
- LocalStorage 持久化保存

### 🌐 多语言支持 (i18n)
- 支持中文（简体）和英文
- 自动检测浏览器语言
- 一键切换语言
- LocalStorage 持久化
- 完整的界面翻译
- 日期格式本地化

详细文档：[I18N_GUIDE.md](docs/I18N_GUIDE.md)

### ✨ 动效系统
- 粒子背景动态效果
- 滚动进入动画
- Hover 发光边框
- 扫描线特效
- 滚动进度条

## 🌐 浏览器支持

- Chrome / Edge (推荐)
- Firefox
- Safari
- Opera

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

感谢所有为开源 AI 做出贡献的组织和个人：

- Meta AI
- OpenAI
- Google
- Mistral AI
- Stability AI
- 以及所有开源社区贡献者

## 📮 联系方式

- GitHub: [@sav7ng](https://github.com/sav7ng)
- Issues: [提交问题](https://github.com/sav7ng/awesome-ai-models/issues)

---

⭐ 如果这个项目对你有帮助，请给一个 Star！

Made with ❤️ for the Open Source AI Community
