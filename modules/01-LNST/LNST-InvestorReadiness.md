---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "lnst:investor-readiness"
  title_zh: "LNST 投资人就绪度"
  title_en: "LNST Investor Readiness"
  shortTitle_zh: "投资人就绪"
  shortTitle_en: "Investor Ready"
  moduleType: ["核心", "core"]
  domain: ["精益创业", "投资人就绪", "融资准备", "评估框架"]
  version: "1.0.0"
  status: ["已迁移", "生产就绪"]
  owner: "{{系统架构师}}"
  stakeholders: ["创始人", "投资人", "财务负责人"]
  tags: ["LNST", "investor-readiness", "fundraising", "assessment"]
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: [
    "../../shared/fields/fields-s3out/fields.yaml",
    "LNST-Overview.md",
    "LNST-Phases.md",
    "../06-Integration/Integration-Assessment.md"
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

# LNST 投资人就绪度框架

### 1.2 投资人就绪度框架

#### 1.2.1 投资人评估五要素
```yaml
investor_readiness_framework:
  problem_validation:
    weight: 20%
    requirements: ["客户访谈≥20个", "问题验证率≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.example.discovery_chain.investor_value}}", "市场规模≥$100M"]
    deliverables: ["客户访谈报告", "痛点分析", "市场研究"]
    
  solution_demonstration:
    weight: 25%
    requirements: ["MVP功能完整度≥{{dynamic_fields.INVESTOR_READINESS_SCORE.example}}", "用户满意度≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.validation_chain.investor_value}}", "技术可行性验证"]
    deliverables: ["MVP演示", "用户反馈报告", "技术架构文档"]
    
  market_opportunity:
    weight: 20%
    requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]
    deliverables: ["市场分析报告", "竞争对手分析", "市场进入策略"]
    
  traction_metrics:
    weight: 20%
    requirements: ["用户增长率≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.launch_chain.investor_value}}", "留存率≥60%", "收入增长验证"]
    deliverables: ["用户数据仪表板", "财务报表", "增长指标"]
    
  team_capability:
    weight: 15%
    requirements: ["核心团队完整", "相关经验≥3年", "执行能力验证"]
    deliverables: ["团队介绍", "履历背景", "执行记录"]
```

---