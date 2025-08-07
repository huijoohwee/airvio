---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "AIRVIO:DEPLOYMENT"
  title: "部署指南|Deployment Guide"
  moduleType: ["部署文档", "运维指南"]
  domain: ["DevOps", "云部署", "生产环境"]
  version: "1.0.0"
  status: ["活跃维护"]
  owner: "{{运维工程师}}"
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: ["README.md", "QUICKLAUNCH.md", "CHANGELOG.md"]

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

# 部署指南 | Deployment Guide

> **执行指令**: 生产环境部署前必须按此指南执行，确保系统稳定性和安全性
> **概括总结**: 提供从开发到生产的完整部署流程，支持多种部署方式和环境配置

## 🎯 部署策略

### 部署原则
- **简单操作**: 任何LLM都可运行，降低使用门槛
- **实战为王**: 空谈误事，实干兴业，快速试错
- **按需使用**: 避免资源浪费，按实际使用付费
- **云原生**: 弹性伸缩，按需付费，无服务器架构

### 环境分层
- **开发环境**: 本地开发和测试
- **预发布环境**: 生产前验证
- **生产环境**: 正式服务用户

## 🚀 快速部署

### 1. Vercel部署 (推荐)

#### 一键部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel --prod
```

#### 环境变量配置
```bash
# 在Vercel Dashboard设置以下环境变量
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 2. Docker部署

#### Dockerfile
```dockerfile
# 多阶段构建
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### 构建和运行
```bash
# 构建镜像
docker build -t airvio .

# 运行容器
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  airvio
```

### 3. 云服务部署

#### AWS部署
```bash
# 使用AWS Amplify
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

#### 阿里云部署
```bash
# 使用阿里云函数计算
fun init
fun deploy
```

## 🔧 环境配置

### 生产环境变量
```bash
# 应用配置
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=AIRVIO
NEXT_PUBLIC_APP_VERSION=1.0.0

# 数据库配置
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://user:password@host:port

# 认证配置
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=https://your-domain.com

# 第三方服务
OPENAI_API_KEY=your-openai-key
STRIPE_SECRET_KEY=your-stripe-key

# 监控配置
SENTRY_DSN=your-sentry-dsn
VERCEL_ANALYTICS_ID=your-analytics-id
```

### 数据库迁移
```bash
# Prisma数据库迁移
npx prisma migrate deploy
npx prisma generate

# 种子数据
npx prisma db seed
```

## 📊 监控和日志

### 性能监控
- **Vercel Analytics**: 内置性能监控
- **Sentry**: 错误追踪和性能监控
- **LogRocket**: 用户会话录制

### 日志配置
```javascript
// logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

## 🔒 安全配置

### HTTPS配置
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### 环境安全
- 使用环境变量存储敏感信息
- 定期轮换API密钥
- 启用CORS保护
- 实施速率限制

## 🚨 故障排除

### 常见问题

#### 构建失败
```bash
# 清理缓存
npm run clean
rm -rf .next node_modules
npm install
npm run build
```

#### 数据库连接失败
```bash
# 检查数据库连接
npx prisma db pull
npx prisma studio
```

#### 环境变量问题
```bash
# 验证环境变量
echo $DATABASE_URL
echo $NEXTAUTH_SECRET
```

### 回滚策略
```bash
# Vercel回滚
vercel rollback

# Docker回滚
docker run previous-image-tag

# 数据库回滚
npx prisma migrate reset
```

## 📋 部署检查清单

### 部署前检查
- [ ] 代码已合并到主分支
- [ ] 所有测试通过
- [ ] 环境变量已配置
- [ ] 数据库迁移已准备
- [ ] 监控系统已配置

### 部署后验证
- [ ] 应用正常启动
- [ ] 健康检查通过
- [ ] 数据库连接正常
- [ ] API接口响应正常
- [ ] 前端页面加载正常
- [ ] 监控数据正常

### 性能基准
- **首屏加载时间**: < 2秒
- **API响应时间**: < 500ms
- **可用性**: > 99.9%
- **错误率**: < 0.1%

---

**🎯 部署目标**: 实现零停机部署，确保用户体验连续性**