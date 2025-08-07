---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "lnst:methodology"
  title_zh: "LNST 精益创业方法论"
  title_en: "LNST Lean Startup Methodology"
  shortTitle_zh: "LNST方法论"
  shortTitle_en: "LNST Methodology"
  moduleType: ["核心", "core"]
  domain: ["精益创业", "方法论", "构建-测量-学习", "迭代开发"]
  version: "1.0.0"
  status: ["已迁移", "生产就绪"]
  owner: "{{系统架构师}}"
  stakeholders: ["产品经理", "开发团队", "创始人"]
  tags: ["LNST", "methodology", "build-measure-learn", "iteration"]
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: [
    "../../shared/fields/fields-s3out/fields.yaml",
    "LNST-Overview.md",
    "LNST-Phases.md",
    "../../CORE/CORE-LNST.md"
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

# LNST 精益创业方法论

### 1.1 精益创业方法论集成

#### 1.1.1 构建-测量-学习循环
```yaml
lean_startup_cycle:
  build_phase:
    objective: "最小可行产品构建"
    key_activities: ["假设制定", "MVP设计", "原型开发"]
    success_metrics: "功能完整度≥{{dynamic_fields.INVESTOR_READINESS_SCORE.example}}"
    token_budget: {{dynamic_fields.LEAN_STARTUP_CYCLE.example.build_phase_token_budget}}
    timeline: "{{dynamic_fields.LEAN_STARTUP_CYCLE.example.build_timeline}}"
    
  measure_phase:
    objective: "用户反馈收集与分析"
    key_activities: ["用户测试", "数据收集", "指标跟踪"]
    success_metrics: "用户满意度≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.validation_chain.investor_value}}"
    token_budget: {{dynamic_fields.LEAN_STARTUP_CYCLE.example.measure_phase_token_budget}}
    timeline: "{{dynamic_fields.LEAN_STARTUP_CYCLE.example.measure_timeline}}"
    
  learn_phase:
    objective: "洞察提取与策略调整"
    key_activities: ["数据分析", "假设验证", "策略优化"]
    success_metrics: "假设验证率≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.example.discovery_chain.investor_value}}"
    token_budget: {{dynamic_fields.LEAN_STARTUP_CYCLE.example.learn_phase_token_budget}}
    timeline: "{{dynamic_fields.LEAN_STARTUP_CYCLE.example.learn_timeline}}"
```

#### 1.1.2 创业五阶段价值链

| 阶段 | 核心目标 | 关键活动 | 成功指标 | Token预算 | 时间预算 |
|------|----------|----------|----------|-----------|----------|
| **发现阶段** | 问题验证 | 客户访谈、痛点分析、市场研究 | 问题验证率≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.example.discovery_chain.investor_value}} | {{dynamic_fields.INTEGRATED_TOKEN_BUDGET_CONTROL.example.phase_allocation.discovery}}T | {{dynamic_fields.VALUE_CAUSAL_CHAIN.mvp_relevance.delivery_timeline}} |
| **验证阶段** | 解决方案验证 | MVP构建、用户测试、反馈收集 | 产品市场匹配≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.roi_estimate}} | {{dynamic_fields.INTEGRATED_TOKEN_BUDGET_CONTROL.example.phase_allocation.validation}}T | 2-3周 |
| **开发阶段** | 产品完善 | 功能开发、系统优化、质量保证 | 系统稳定性≥{{dynamic_fields.VALUE_CAUSAL_CHAIN.development_chain.investor_value}} | {{dynamic_fields.INTEGRATED_TOKEN_BUDGET_CONTROL.example.phase_allocation.development}}T | 3-4周 |
| **发布阶段** | 市场进入 | 营销策略、用户获取、运营监控 | 用户获取成本≤$50 | {{dynamic_fields.INTEGRATED_TOKEN_BUDGET_CONTROL.example.phase_allocation.launch}}T | 1-2周 |
| **融资阶段** | 投资人就绪 | 路演准备、财务建模、投资人匹配 | 投资人就绪度≥{{dynamic_fields.INVESTOR_READINESS_SCORE.example}} | {{dynamic_fields.INTEGRATED_TOKEN_BUDGET_CONTROL.example.phase_allocation.fundraising}}T | 2-4周 |

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