# pnpm-catalog-updates

一个强大的 CLI 工具，用于检查和更新 pnpm 工作区目录依赖，灵感来自
[npm-check-updates](https://github.com/raineorshine/npm-check-updates)。

**📖 文档语言**: [English](README.md) | [中文](README.zh-CN.md) |
[日本語](README.ja.md)

[![CI](https://img.shields.io/github/actions/workflow/status/houko/pnpm-catalog-updates/ci.yml?label=CI&logo=github)](https://github.com/houko/pnpm-catalog-updates/actions)
[![npm](https://img.shields.io/npm/v/pnpm-catalog-updates)](https://www.npmjs.com/package/pnpm-catalog-updates)
[![Coverage](https://img.shields.io/coveralls/github/houko/pnpm-catalog-updates/main)](https://coveralls.io/github/houko/pnpm-catalog-updates)

## ✨ 特性

- 🔍 **智能检测**: 自动发现 pnpm 工作区和目录配置
- 🎯 **目录专注**: 专门针对 pnpm 目录依赖管理
- 🚀 **交互模式**: 通过直观的界面选择要更新的依赖
- 📊 **影响分析**: 了解目录变更将影响哪些包
- 🔒 **安全更新**: 试运行模式和安全选项确保依赖更新安全
- ⚡ **高性能**: 并行 API 查询和智能缓存
- 🛡️ **安全感知**: 内置安全漏洞扫描
- 🎨 **美观界面**: 增强的进度条、颜色主题和交互式提示
- 🎭 **自定义主题**: 多种颜色主题（默认、现代、简约、霓虹）
- 📈 **进度跟踪**: 所有操作的实时进度指示器
- 🔧 **可配置**: 灵活的配置选项和更新策略

## 🚀 快速开始

```bash
pcu -c
```

![图片](https://github.com/user-attachments/assets/f05a970e-c58c-44f1-b3f1-351ae30b4a35)

### 安装

```bash
# 全局安装
npm install -g pnpm-catalog-updates
# 或者
npm install -g pcu

# 或者使用 npx
npx pnpm-catalog-updates
# 或者
npx pcu

# 或者使用短别名
pcu
```

### 基本用法

```bash
# 快速检查更新
pcu -c

# 快速更新（交互式）
pcu -i

# 快速更新（试运行）
pcu -u -d

# 获取工作区信息
pcu -s
```

### 常用命令

| 命令     | 描述               | 示例                      |
| -------- | ------------------ | ------------------------- |
| `pcu -c` | 检查更新           | `pcu -c --catalog node18` |
| `pcu -i` | 更新依赖（交互式） | `pcu -i -b`               |
| `pcu -a` | 分析影响           | `pcu -a default react`    |
| `pcu -s` | 工作区信息         | `pcu -s --validate`       |
| `pcu -t` | 配置颜色主题       | `pcu -t --set modern`     |
| `pcu -h` | 显示帮助           | `pcu -h update`           |

## 📖 完整使用指南

### 所有命令和快捷方式

| 完整命令        | 缩写     | 描述                   |
| --------------- | -------- | ---------------------- |
| `pcu check`     | `pcu -c` | 检查过时的目录依赖     |
| `pcu update`    | `pcu -u` | 更新目录依赖           |
| `pcu analyze`   | `pcu -a` | 分析依赖更新的影响     |
| `pcu workspace` | `pcu -s` | 显示工作区信息和验证   |
| `pcu theme`     | `pcu -t` | 配置颜色主题和界面设置 |
| `pcu help`      | `pcu -h` | 显示帮助信息           |

### 命令

#### `pcu check` / `pcu -c` / `pcu chk`

检查您的 pnpm 工作区目录中是否有过时的依赖。

```bash
pcu check [选项]
pcu -c [选项]
pcu chk [选项]

选项：
  --catalog <名称>      仅检查特定目录
  -f, --format <类型>   输出格式：table、json、yaml、minimal（默认：table）
                        - table：带有颜色和详细信息的丰富表格格式
                        - minimal：简单的 npm-check-updates 风格（包 → 版本）
                        - json：用于编程使用的 JSON 输出
                        - yaml：配置文件用的 YAML 输出
  -t, --target <类型>   更新目标：latest、greatest、minor、patch、newest（默认：latest）
  --prerelease          包括预发布版本
  --include <模式>      包括匹配模式的包
  --exclude <模式>      排除匹配模式的包
  -w, --workspace <路径> 工作区目录（默认：当前目录）
  -v, --verbose         显示详细信息
```

#### `pcu update` / `pcu -u`

将目录依赖更新到新版本。

```bash
pcu update [选项]
pcu -u [选项]
pcu u [选项]

选项：
  -i, --interactive     交互模式以选择更新
  -d, --dry-run         预览更改而不写入文件
  -t, --target <类型>   更新目标：latest、greatest、minor、patch、newest（默认：latest）
  --catalog <名称>      仅更新特定目录
  --include <模式>      包括匹配模式的包
  --exclude <模式>      排除匹配模式的包
  --force               即使有风险也强制更新
  --prerelease          包括预发布版本
  -b, --create-backup   更新前创建备份文件
  -f, --format <类型>   输出格式：table、json、yaml、minimal（默认：table）
                        - table：带有颜色和详细信息的丰富表格格式
                        - minimal：简单的 npm-check-updates 风格（包 → 版本）
                        - json：用于编程使用的 JSON 输出
                        - yaml：配置文件用的 YAML 输出
  -w, --workspace <路径> 工作区目录（默认：当前目录）
  -v, --verbose         显示详细信息
```

#### `pcu analyze` / `pcu -a`

分析更新特定依赖的影响。

```bash
pcu analyze <目录> <包> [版本]
pcu -a <目录> <包> [版本]
pcu a <目录> <包> [版本]

参数：
  目录               目录名称（例如：'default'、'react17'）
  包                 包名称（例如：'react'、'@types/node'）
  版本               新版本（可选，默认为最新版本）

选项：
  -f, --format <类型>   输出格式：table、json、yaml、minimal（默认：table）
  -w, --workspace <路径> 工作区目录（默认：当前目录）
  -v, --verbose         显示详细信息

示例：
  pcu analyze default react
  pcu a default react 18.3.0
  pcu -a react17 @types/react
```

#### `pcu workspace` / `pcu -s`

显示工作区信息和验证。

```bash
pcu workspace [选项]
pcu -s [选项]
pcu w [选项]

选项：
  --validate            验证工作区配置
  -s, --stats           显示工作区统计信息
  -f, --format <类型>   输出格式：table、json、yaml、minimal（默认：table）
  -w, --workspace <路径> 工作区目录（默认：当前目录）
  -v, --verbose         显示详细信息

示例：
  pcu workspace           # 显示基本工作区信息
  pcu -s --stats         # 显示详细统计信息
  pcu w --validate       # 验证工作区配置
```

#### `pcu help` / `pcu -h`

显示帮助信息。

```bash
pcu help [命令]
pcu -h [命令]

示例：
  pcu help              # 显示一般帮助
  pcu help update       # 显示更新命令的帮助
  pcu -h check          # 显示检查命令的帮助
```

#### `pcu theme` / `pcu -t`

配置颜色主题和界面外观。

```bash
pcu theme [选项]
pcu -t [选项]

选项：
  -s, --set <主题>      设置颜色主题：default、modern、minimal、neon
  -l, --list            列出所有可用主题
  -i, --interactive     交互式主题配置向导

示例：
  pcu theme             # 显示当前主题信息
  pcu -t --list         # 列出所有可用主题
  pcu theme --set modern # 设置为现代主题
  pcu -t --interactive  # 启动主题配置向导
```

**可用主题：**

- `default` - 均衡的颜色，适合一般使用
- `modern` - 鲜艳的颜色，适合开发环境
- `minimal` - 简洁的样式，适合生产环境
- `neon` - 高对比度颜色，适合演示

### 全局选项

这些选项适用于所有命令：

```bash
-w, --workspace <路径>   工作区目录路径
-v, --verbose            启用详细日志记录
--no-color               禁用彩色输出
-V, --version            输出版本号
-h, --help               显示命令帮助
```

### 常见使用模式

```bash
# 快速检查更新
pcu -c

# 使用简单输出检查（类似 npm-check-updates）
pcu -c --format minimal

# 带备份的交互式更新
pcu -i -b

# 仅更新次要和补丁版本
pcu -u --target minor

# 检查特定目录
pcu -c --catalog node18

# 更新排除某些包
pcu -u --exclude "eslint*"

# 带详细输出的试运行
pcu -u -d -v

# 使用简单输出格式更新
pcu -u --format minimal

# 更新前分析影响
pcu -a default react
pcu -u --catalog default --include react

# 验证工作区配置
pcu -s --validate

# 主题自定义
pcu -t --list                # 列出可用主题
pcu -t --set modern         # 设置现代主题
pcu -t --interactive        # 交互式主题设置
```

### 配置

在项目根目录创建 `.pcurc.json` 文件：

```json
{
  "defaults": {
    "target": "latest",
    "timeout": 30000,
    "parallel": 5
  },
  "workspace": {
    "autoDiscover": true,
    "catalogMode": "strict"
  },
  "update": {
    "interactive": true,
    "dryRunFirst": true,
    "skipPrereleases": false
  },
  "output": {
    "format": "table",
    "color": true,
    "verbose": false
  },
  "ui": {
    "theme": "default",
    "progressBars": true,
    "animations": true
  }
}
```

#### 包过滤配置

您还可以通过创建包含过滤选项的 `.pcurc.json` 来配置特定包的更新规则：

```json
{
  // 排除您永远不想更新的包
  "exclude": ["typescript", "@types/node", "react", "react-dom"],

  // 仅更新特定包（可选 - 如果不指定，将考虑所有包）
  "include": ["lodash*", "chalk", "commander"],

  // 特定包的更新规则
  "packageRules": [
    {
      "patterns": ["@types/*"],
      "target": "latest", // 类型定义总是更新到最新版本
      "autoUpdate": true
    },
    {
      "patterns": ["react", "react-dom"],
      "target": "patch", // React 只进行 patch 更新
      "requireConfirmation": true // 更新前总是询问
    },
    {
      "patterns": ["eslint*", "prettier"],
      "target": "minor", // 开发工具进行 minor 更新
      "groupUpdate": true // 相关包一起更新
    }
  ],

  // 安全配置
  "security": {
    "autoFixVulnerabilities": true, // 自动检查并修复安全漏洞
    "allowMajorForSecurity": true, // 为安全修复允许主版本升级
    "notifyOnSecurityUpdate": true // 安全更新时显示通知
  },

  // 高级配置
  "advanced": {
    "concurrency": 5, // 并发网络请求数量（默认: 5）
    "timeout": 30000, // 网络请求超时时间（毫秒，默认: 30000）
    "retries": 3, // 失败重试次数（默认: 3）
    "cacheValidityMinutes": 60 // 缓存有效期（分钟，默认: 60，设为0禁用缓存）
  },

  // Monorepo 配置
  "monorepo": {
    "syncVersions": ["react", "react-dom"], // 需要在多个 catalog 间同步版本的包
    "catalogPriority": ["default", "latest", "react17"] // catalog 优先级顺序
  },

  // 覆盖默认设置
  "defaults": {
    "target": "minor",
    "createBackup": true
  }
}
```

**配置优先级**: 包规则 > CLI 选项 > 默认配置

**模式匹配**: 支持 glob 模式，如 `react*`、`@types/*`、`eslint*`

## 📁 项目结构

本项目遵循领域驱动设计 (DDD) 原则：

```text
src/
├── cli/                    # CLI 接口层
│   ├── commands/           # 命令处理器
│   ├── options/            # 选项解析器
│   ├── formatters/         # 输出格式化器和进度条
│   ├── interactive/        # 交互式提示和界面
│   ├── themes/             # 颜色主题和样式
│   └── validators/         # 输入验证
├── application/            # 应用服务
│   ├── services/           # 应用服务
│   ├── handlers/           # 命令处理器
│   └── mappers/            # 数据映射器
├── domain/                 # 领域模型
│   ├── entities/           # 领域实体
│   ├── value-objects/      # 值对象
│   ├── aggregates/         # 聚合根
│   ├── services/           # 领域服务
│   └── repositories/       # 仓库接口
├── infrastructure/         # 基础设施层
│   ├── repositories/       # 仓库实现
│   ├── external-services/  # 外部服务客户端
│   └── file-system/        # 文件系统操作
├── adapters/               # 适配器层
│   ├── registry/           # 包注册表适配器
│   └── package-managers/   # 包管理器适配器
└── common/                 # 公共工具
    ├── types/              # 类型定义
    ├── utils/              # 实用函数
    ├── config/             # 配置
    └── logger/             # 日志记录
```

## 🧪 开发

### 先决条件

- Node.js >= 18.0.0
- pnpm >= 8.15.0

### 设置

```bash
# 克隆仓库
git clone https://github.com/houko/pnpm-catalog-updates.git
cd pnpm-catalog-updates

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 运行测试
pnpm test

# 在开发模式下运行
pnpm dev --help
```

### 脚本

```bash
# 开发
pnpm dev                    # 在开发模式下运行
pnpm build                  # 构建项目
pnpm build:watch           # 在观察模式下构建

# 测试
pnpm test                   # 运行单元测试
pnpm test:watch            # 在观察模式下运行测试
pnpm test:coverage         # 运行带覆盖率的测试
pnpm test:e2e              # 运行端到端测试

# 代码质量
pnpm lint                   # 代码检查
pnpm lint:fix              # 修复检查问题
pnpm format                 # 格式化代码
pnpm typecheck             # 类型检查

# 实用工具
pnpm clean                  # 清理构建产物
```

### 测试

项目使用全面的测试策略：

- **单元测试**：隔离测试各个组件
- **集成测试**：测试组件交互
- **端到端测试**：测试完整的 CLI 工作流

```bash
# 运行所有测试
pnpm test

# 运行带覆盖率的测试
pnpm test:coverage

# 运行端到端测试
pnpm test:e2e

# 在观察模式下运行测试
pnpm test:watch
```

## 📊 示例

### 基本工作区

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

catalog:
  react: ^18.2.0
  lodash: ^4.17.21
  typescript: ^5.0.0
```

### 多目录设置

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

catalog:
  # 默认目录
  react: ^18.2.0
  typescript: ^5.0.0

catalogs:
  # 旧版本
  react17:
    react: ^17.0.2
    @types/react: ^17.0.62

  # 最新版本
  latest:
    react: ^18.2.0
    typescript: ^5.2.0
```

### 在 package.json 中使用

```json
{
  "dependencies": {
    "react": "catalog:",
    "lodash": "catalog:",
    "legacy-lib": "catalog:react17"
  }
}
```

## 🤝 贡献

我们欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

### 开发工作流

1. Fork 仓库
2. 创建特性分支： `git checkout -b feature/amazing-feature`
3. 进行更改
4. 为更改添加测试
5. 确保所有测试通过： `pnpm test`
6. 检查代码： `pnpm lint:fix`
7. 提交更改： `git commit -m 'feat: add amazing feature'`
8. 推送到分支： `git push origin feature/amazing-feature`
9. 打开拉取请求

### 提交消息约定

我们使用[约定式提交](https://conventionalcommits.org/)：

- `feat`：新功能
- `fix`：错误修复
- `docs`：仅文档更改
- `style`：不影响代码含义的更改
- `refactor`：既不修复错误也不添加功能的代码更改
- `test`：添加缺失的测试或更正现有测试
- `chore`：构建过程或辅助工具的更改

## 📄 许可证

本项目根据 MIT 许可证授权 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 灵感来自
  [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- 为 pnpm 社区充满爱心地构建
- 感谢所有贡献者和用户

## 📞 支持

- 📖 [文档](https://github.com/houko/pnpm-catalog-updates#readme)
- 🐛 [问题跟踪器](https://github.com/houko/pnpm-catalog-updates/issues)
- 💬 [讨论](https://github.com/houko/pnpm-catalog-updates/discussions)

---

为 pnpm 社区充满爱心地制作 ❤️
