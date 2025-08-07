---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "reference:templates"
  title_zh: "配置模板参考"
  title_en: "Configuration Templates Reference"
  shortTitle_zh: "配置模板"
  shortTitle_en: "Templates"
  moduleType: ["参考", "reference"]
  domain: ["配置模板", "参考文档", "标准化", "精益创业"]
  version: "1.0.0"
  status: ["已迁移", "生产就绪"]
  owner: "{{系统架构师}}"
  stakeholders: ["开发者", "配置管理员", "系统管理员"]
  tags: ["templates", "configuration", "reference", "standardization"]
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: [
    "../../shared/fields/fields-s3out/fields.yaml",
    "Reference-Checklists.md",
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

# 配置模板参考

## 项目初始化配置模板

### 基础项目配置
```yaml
project_metadata:
  name: "startup_project"
  version: "0.1.0"
  stage: "mvp"
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

## 监控配置模板

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

## 智能体配置模板

```yaml
agent_configuration:
  discovery_agent:
    activation: true
    token_budget: 2000
    tasks: ["market_research", "user_interview", "competitor_analysis"]
    
  validation_agent:
    activation: false  # 按需激活
    token_budget: 1500
    tasks: ["hypothesis_testing", "mvp_validation", "user_feedback"]
    
  development_agent:
    activation: false  # 开发阶段激活
    token_budget: 3000
    tasks: ["code_generation", "testing", "deployment"]
    
  fundraising_agent:
    activation: false  # 融资阶段激活
    token_budget: 2500
    tasks: ["pitch_deck", "financial_model", "investor_outreach"]
```

## 部署配置模板

```yaml
deployment_configuration:
  environment:
    development:
      database_url: "postgresql://localhost:5432/startup_dev"
      redis_url: "redis://localhost:6379"
      log_level: "debug"
      
    staging:
      database_url: "${STAGING_DB_URL}"
      redis_url: "${STAGING_REDIS_URL}"
      log_level: "info"
      
    production:
      database_url: "${PROD_DB_URL}"
      redis_url: "${PROD_REDIS_URL}"
      log_level: "warn"
      
  scaling:
    min_instances: 1
    max_instances: 10
    target_cpu_utilization: 70
    
  monitoring:
    health_check_path: "/health"
    metrics_endpoint: "/metrics"
    log_retention_days: 30
```