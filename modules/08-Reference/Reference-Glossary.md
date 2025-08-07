---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "reference:glossary"
  title_zh: "术语词汇表"
  title_en: "Glossary"
  shortTitle_zh: "词汇表"
  shortTitle_en: "Glossary"
  moduleType: ["参考", "reference"]
  domain: ["术语定义", "词汇表", "概念解释", "精益创业"]
  version: "1.0.0"
  status: ["已迁移", "生产就绪"]
  owner: "{{系统架构师}}"
  stakeholders: ["所有团队成员", "新员工", "外部合作伙伴"]
  tags: ["glossary", "terminology", "definitions", "reference"]
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: [
    "../../shared/fields/fields-s3out/fields.yaml",
    "Reference-Cases.md",
    "../../CORE-LNST-NEW.md"
  ]

# 语言配置 | Language Configuration
language:
  primary: "zh-cn"
  secondary: "en-us"
  fallback: "en-us"
  auto_detect: true

# 字段池引用配置
field_pool_config:
  source_file: "../../shared/fields/fields-s3out/fields.yaml"
  reference_method: "external_import"
  auto_sync: true
  fallback_mode: "local_cache"

# 引用方式: {{dynamic_fields.字段名}}
dynamic_fields:
  $ref: "../../shared/fields/fields-s3out/fields.yaml#/dynamic_fields"
---

# 术语词汇表

### 9.1 术语词典

| 术语 | 英文 | 定义 | 应用场景 |
|------|------|------|----------|
| **LNST** | Lean Startup | 精益创业方法论，强调构建-测量-学习循环 | 创业项目全生命周期 |
| **HMNM** | Human-Machine Neural Meta | 人机神经元体系，7份核心文档的神经网络 | 文档协作与知识管理 |
| **MAOS** | Multi-Agent Orchestration System | 多智能体编排系统，6类智能体协作 | 自动化任务执行 |
| **GSTR** | Goal-Space-Time-Resource | 目标-空间-时间-资本四元体系 | 战略执行与资源配置 |
| **MATB** | Markdown-ASCII Tree Bridge | Markdown-ASCII树形桥接转换协议 | 格式转换与可视化 |
| **Token经济性** | Token Economy | 基于Token使用效率的成本控制原则 | 成本优化与资源管理 |
| **N-Quads** | N-Quads | 语义化命令格式，支持智能体通信 | 智能体协作协议 |
| **MVP** | Minimum Viable Product | 最小可行产品，验证核心假设的最简版本 | 产品验证与快速迭代 |

### 9.2 配置模板

#### 9.2.1 项目初始化配置
```yaml
project_initialization:
  meta:
    project_name: "{{项目名称}}"
    startup_phase: "discovery"  # discovery/validation/development/launch/fundraising
    team_size: 3
    budget_limit: "$50,000"
    timeline: "3个月"
    
  lnst_config:
    hypothesis_validation_threshold: 0.8
    mvp_feature_limit: 5
    user_interview_target: 20
    market_size_minimum: 100000000  # $100M
    
  hmnm_config:
    document_token_budget:
      blueprint: 1500
      root: 600
      meta: 500
      quicklaunch: 800
      readme: 1000
      cheatsheet: 500
      winsheet: 300
    
  maos_config:
    agent_activation:
      orchestration: true
      discovery: true
      validation: false  # 按阶段激活
      development: false
      fundraising: false
      monitoring: true
    
  gstr_config:
    goal_hierarchy: ["strategic", "operational", "tactical"]
    resource_allocation: ["pool", "domain", "flow", "element"]
    space_topology: ["system", "surface", "line", "point"]
    time_cycle: ["observe", "orient", "decide", "act", "feedback"]
    
  matb_config:
    conversion_accuracy_threshold: 0.95
    output_formats: ["mermaid", "ascii_tree", "markdown_table"]
    semantic_mapping: true
```

#### 9.2.2 监控配置模板
```yaml
monitoring_configuration:
  kpi_thresholds:
    mvp_delivery_time_hours: 24
    token_utilization_rate: 0.85
    investor_readiness_score: 0.9
    system_availability: 0.99
    
  alert_rules:
    token_budget_warning: 0.8  # 80%使用率告警
    delivery_time_warning: 20  # 20小时告警
    quality_score_warning: 0.85
    
  dashboard_metrics:
    - "实时Token消耗"
    - "智能体协作状态"
    - "MVP开发进度"
    - "投资人就绪度评分"
    - "系统健康状态"
```

### 9.3 快速参考卡片

#### 9.3.1 24小时MVP检查清单
```markdown