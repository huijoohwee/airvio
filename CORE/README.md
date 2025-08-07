---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "AIRVIO:README"
  title: "AIRVIO - AI原生精益创业统筹中枢"
  moduleType: ["项目概览", "快速开始"]
  domain: ["精益创业", "多智能体编排", "AI原生架构"]
  version: "1.0.0"
  status: ["活跃开发"]
  owner: "{{系统架构师}}"
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: ["QUICKLAUNCH.md", "shared/CORE/", "modules/"]

# 字段池引用配置
field_pool_config:
  source_file: "shared/fields/fields-s3out/fields.yaml"
  reference_method: "external_import"
  auto_sync: true
  fallback_mode: "local_cache"

# 引用方式: {{dynamic_fields.字段名}}
dynamic_fields:
  $ref: "shared/fields/fields-s3out/fields.yaml#/dynamic_fields"
---

# AIRVIO - AI原生精益创业统筹中枢

> **一人草创 → 多智能体编排 → 可持续盈利增长**

## 🎯 项目概览

AIRVIO是一个AI原生的精益创业统筹中枢，专为个人开发者和小团队设计，通过多智能体编排实现从MVP到IPO的完整价值链路。

### 核心价值
- **🚀 快速启动**: 极速复制 → 微调优化 → 价值验证
- **🤖 AI原生**: 大模型时代架构设计，prompt即代码
- **☁️ 云原生**: 弹性伸缩，按需付费，无服务器架构
- **👥 人机协作**: 人类创意 + AI效率，最大化杠杆效应

## 🏗️ 技术架构

### 核心模块
- **01-LNST**: 精益创业统筹中枢
- **02-HMNM**: 人机协作神经网络
- **03-MAOS**: 多智能体编排系统
- **04-GSTR**: 通用语义转换器
- **05-MATB**: 多智能体工具箱
- **06-Integration**: 集成与优化
- **07-Implementation**: 实施与部署
- **08-Reference**: 参考与模板

### 技术栈
| 优先级 | 标准 | 示例 |
|---|---|---|
| **P0** | 广泛使用 + 开源 + 免费 | Next.js, React, Node.js |
| **P1** | 社区活跃 + 文档完善 | Vercel, Supabase, Tailwind |
| **P2** | 商业支持 + 长期维护 | AWS, Stripe, Figma |

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Git
- 现代浏览器

### 一键启动
```bash
# 克隆项目
git clone <repository-url>
cd airvio

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

详细启动指南请参考 [QUICKLAUNCH.md](QUICKLAUNCH.md)

## 📚 文档结构

- **[QUICKLAUNCH.md](QUICKLAUNCH.md)**: 一键启动指南
- **[WINSHEET.md](WINSHEET.md)**: 每日进展记录
- **[todo.md](todo.md)**: 任务清单和优先级
- **[CHANGELOG.md](CHANGELOG.md)**: 版本变更记录
- **[DEPLOYMENT.md](DEPLOYMENT.md)**: 部署指南
- **[shared/CORE/](shared/CORE/)**: 核心文档和规范
- **[modules/](modules/)**: 功能模块文档

## 🎯 执行原则

### DRY + KISS + YAGNI + SOLID
- **DRY**: 重复消除，组件复用
- **KISS**: 简单粗暴，快速迭代
- **YAGNI**: 按需构建，避免过度设计
- **SOLID**: 高内聚低耦合架构

### 版本策略
**`极简版(1天) → MVP版(7天) → 完整版(30天)`**

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 提交规范
遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试
- `chore:` 构建过程或辅助工具的变动

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [项目文档](docs/)
- [模块索引](docs/module-index.md)
- [集成指南](docs/integration-guide.md)

---

**让AI成为你的创业伙伴，从想法到IPO的完整旅程** 🚀