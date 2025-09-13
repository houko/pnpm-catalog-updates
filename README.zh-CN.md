# pnpm-catalog-updates

一个强大的 CLI 工具，用于检查和更新 pnpm 工作区目录依赖，灵感来自
[npm-check-updates](https://github.com/raineorshine/npm-check-updates)。

**📖 完整文档**: [https://pcu-cli.dev](https://pcu-cli.dev/zh)

**📖 文档语言**: [English](README.md) | [中文](README.zh-CN.md) |
[日本語](README.ja.md)

[![CI](https://img.shields.io/github/actions/workflow/status/houko/pnpm-catalog-updates/ci.yml?label=CI&logo=github)](https://github.com/houko/pnpm-catalog-updates/actions)
[![npm](https://img.shields.io/npm/v/pnpm-catalog-updates)](https://www.npmjs.com/package/pnpm-catalog-updates)
[![Coverage](https://img.shields.io/coveralls/github/houko/pnpm-catalog-updates/main)](https://coveralls.io/github/houko/pnpm-catalog-updates)

## ✨ 特性

- 🏗️ **一键初始化**: 使用 `pcu init` 命令初始化完整的 PNPM 工作区
- 🔍 **智能检测**: 自动发现 pnpm 工作区和目录配置
- 🎯 **目录专注**: 专门针对 pnpm 目录依赖管理
- 🚀 **交互模式**: 通过直观的界面选择要更新的依赖
- 📊 **影响分析**: 了解目录变更将影响哪些包
- 🔒 **安全更新**: 试运行模式和备份选项确保依赖更新安全
- ⚡ **高性能**: 并行 API 查询和智能缓存
- 🛡️ **安全感知**: 内置安全漏洞扫描
- 🎨 **美观界面**: 增强的进度条、颜色主题和交互式提示
- 🌈 **进度条样式**: 选择渐变、华丽、简约、彩虹、霓虹或方块样式
- 🎭 **自定义主题**: 多种颜色主题（默认、现代、简约、霓虹）
- 📈 **实时进度**: 实时进度跟踪，带有速度指示器和时间估计
- 🔄 **智能版本检查**: --version 命令自动更新通知
- 🔐 **私有仓库支持**: 自动读取 `.npmrc` 和 `.pnpmrc` 配置
- 📦 **多仓库支持**: 为不同的包作用域使用不同的仓库
- 🔧 **可配置**: 灵活的配置选项和更新策略

**➡️ [查看所有功能和详情](https://pcu-cli.dev/zh)**

## 🚀 快速开始

### 安装

```bash
# 全局安装（推荐）
npm install -g pcu

# 或者使用 npx
npx pnpm-catalog-updates
```

### 基本用法

```bash
# 初始化新的 PNPM 工作区和 PCU 配置
pcu init

# 在现有工作区中检查更新
pcu -c

# 交互式更新模式
pcu -i
```

![图片](https://github.com/user-attachments/assets/f05a970e-c58c-44f1-b3f1-351ae30b4a35)

**➡️ [完整安装和使用指南](https://pcu-cli.dev/zh/quickstart)**

## 📖 文档

**➡️ [完整命令参考](https://pcu-cli.dev/zh/command-reference)**  
**➡️ [配置指南](https://pcu-cli.dev/zh/configuration)**  
**➡️ [示例和用例](https://pcu-cli.dev/zh/examples)**

## 📁 项目结构

这个项目采用 pnpm monorepo 和清晰的架构组织：

```text
├── apps/
│   └── cli/                    # CLI 应用程序
└── packages/
    ├── core/                   # 核心业务逻辑
    └── utils/                  # 共享工具
```

**➡️ [详细架构指南](https://pcu-cli.dev/zh/development)**

## 🧪 开发

### 前置要求

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### 设置

```bash
# 克隆仓库
git clone https://github.com/houko/pnpm-catalog-updates.git
cd pnpm-catalog-updates

# 安装依赖
pnpm install

# 构建和运行
pnpm build
pnpm dev --help
```

**➡️ [完整开发指南](https://pcu-cli.dev/zh/development)**

## 📊 配置示例

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

catalog:
  react: ^18.2.0
  typescript: ^5.0.0

catalogs:
  react17:
    react: ^17.0.2
```

```json
// .pcurc.json
{
  "defaults": {
    "target": "latest"
  },
  "packageRules": [
    {
      "patterns": ["react", "react-dom"],
      "target": "minor"
    }
  ]
}
```

**➡️ [配置示例和模板](https://pcu-cli.dev/zh/examples)**

## 🤝 贡献

我们欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

**➡️ [开发设置和指导原则](https://pcu-cli.dev/zh/development)**

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 灵感来自
  [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- 为 pnpm 社区用心构建
- 感谢所有贡献者和用户

## 📞 支持

- 📖 [完整文档](https://pcu-cli.dev/zh)
- 🐛 [问题跟踪](https://github.com/houko/pnpm-catalog-updates/issues)
- 💬 [讨论区](https://github.com/houko/pnpm-catalog-updates/discussions)

---

为 pnpm 社区用 ❤️ 制作
