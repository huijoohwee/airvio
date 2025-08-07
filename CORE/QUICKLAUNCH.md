---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "AIRVIO:QUICKLAUNCH"
  title: "快速启动指南|Quick Launch Guide"
  moduleType: ["启动指南", "操作手册"]
  domain: ["环境配置", "快速部署", "开发环境"]
  version: "1.0.0"
  status: ["活跃维护"]
  owner: "{{系统架构师}}"
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: ["README.md", "DEPLOYMENT.md", "shared/CORE/CORE-REQUIREMENTS.md"]

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

# 快速启动指南 | Quick Launch Guide

> **目标**: 5分钟内启动AIRVIO开发环境

## 🎯 一键启动命令

### macOS/Linux
```bash
# 完整启动流程
curl -fsSL https://raw.githubusercontent.com/your-org/airvio/main/scripts/quick-start.sh | bash
```

### 手动启动步骤

#### 1. 环境检查
```bash
# 检查Node.js版本 (需要18+)
node --version

# 检查npm版本
npm --version

# 检查Git
git --version
```

#### 2. 项目克隆
```bash
# 克隆项目
git clone <repository-url>
cd airvio

# 检查项目结构
ls -la
```

#### 3. 依赖安装
```bash
# 安装项目依赖
npm install

# 验证安装
npm list --depth=0
```

#### 4. 环境配置
```bash
# 复制环境配置模板
cp .env.example .env.local

# 编辑环境变量
nano .env.local
```

#### 5. 启动开发服务器
```bash
# 启动开发模式
npm run dev

# 或使用yarn
yarn dev
```

## 🔧 环境要求

### 必需软件
- **Node.js**: 18.0.0+
- **npm**: 8.0.0+ 或 **yarn**: 1.22.0+
- **Git**: 2.30.0+

### 推荐软件
- **VS Code**: 推荐IDE
- **Chrome/Firefox**: 现代浏览器
- **Docker**: 容器化部署（可选）

### 系统要求
- **内存**: 最少4GB，推荐8GB+
- **存储**: 最少2GB可用空间
- **网络**: 稳定的互联网连接

## 🚀 验证启动

### 1. 服务器启动确认
启动成功后应看到：
```
✓ Ready on http://localhost:3000
✓ Local:    http://localhost:3000
✓ Network:  http://192.168.1.100:3000
```

### 2. 浏览器访问
打开浏览器访问 `http://localhost:3000`

### 3. 功能验证
- [ ] 页面正常加载
- [ ] 导航菜单可用
- [ ] API接口响应正常
- [ ] 热重载功能正常

## 🛠️ 开发工具配置

### VS Code扩展推荐
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "redhat.vscode-yaml"
  ]
}
```

### Git配置
```bash
# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 配置默认分支
git config --global init.defaultBranch main
```

## 🔍 故障排除

### 常见问题

#### Node.js版本过低
```bash
# 使用nvm升级Node.js
nvm install 18
nvm use 18
```

#### 端口被占用
```bash
# 查找占用端口的进程
lsof -ti:3000

# 终止进程
kill -9 $(lsof -ti:3000)

# 或使用不同端口
npm run dev -- --port 3001
```

#### 依赖安装失败
```bash
# 清理缓存
npm cache clean --force

# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

#### 权限问题
```bash
# macOS/Linux权限修复
sudo chown -R $(whoami) ~/.npm
```

### 获取帮助
- 查看 [DEPLOYMENT.md](DEPLOYMENT.md) 了解部署详情
- 查看 [README.md](README.md) 了解项目概览
- 提交 [Issue](https://github.com/your-org/airvio/issues) 报告问题

## 📋 启动检查清单

- [ ] Node.js 18+ 已安装
- [ ] Git 已配置
- [ ] 项目已克隆
- [ ] 依赖已安装
- [ ] 环境变量已配置
- [ ] 开发服务器已启动
- [ ] 浏览器可正常访问
- [ ] 开发工具已配置

---

**🎉 恭喜！AIRVIO开发环境已就绪，开始你的AI原生创业之旅！**