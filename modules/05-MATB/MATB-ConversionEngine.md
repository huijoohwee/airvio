---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "matb:conversion-engine"
  title_zh: "MATB 转换引擎"
  title_en: "MATB Conversion Engine"
  shortTitle_zh: "转换引擎"
  shortTitle_en: "Conversion Engine"
  moduleType: ["核心", "core"]
  domain: ["数据转换", "格式转换", "语义映射", "自动化处理"]
  version: "1.0.0"
  status: ["已迁移", "生产就绪"]
  owner: "{{系统架构师}}"
  stakeholders: ["数据工程师", "AI工程师", "系统集成师"]
  tags: ["MATB", "conversion", "data-transformation", "automation"]
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: [
    "../../shared/fields/fields-s3out/fields.yaml",
    "MATB-SemanticMapping.md",
    "MATB-AgentSyntax.md",
    "MATB-Visualization.md"
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

# MATB 转换引擎

## 5. MATB - Markdown-ASCII树形桥接层（Markdown-ASCII Tree Bridge）

### 5.1 MATB转换引擎

#### 5.1.1 转换类型与规范

| 转换类型 | 输入格式 | 输出格式 | Token预算 | 准确率要求 | 应用场景 |
|----------|----------|----------|-----------|------------|----------|
| **HTx→ATr** | 人类自然语言 | ASCII树形结构 | 400T | ≥95% | 需求分析、架构设计 |
| **ATr→MDT** | ASCII树形结构 | Markdown表格 | 300T | ≥98% | 文档生成、数据展示 |
| **HTx→MDT** | 人类自然语言 | Markdown表格 | 500T | ≥90% | 快速文档化 |
| **MDT-NQd** | Markdown表格 | N-Quads语义 | 600T | ≥95% | 智能体通信 |

#### 5.1.2 精益创业语义映射

```yaml
startup_semantic_mapping:
  discovery_phase:
    triggers: ["验证", "测试", "假设", "问题", "痛点"]
    gstr_dimension: "goal"
    maos_agent: "discovery_agent"
    HMNM_doc: "BLUEPRINT"
    matb_format: "MDT-NQd"
    
  validation_phase:
    triggers: ["构建", "开发", "原型", "MVP", "最小"]
    gstr_dimension: "resource+space"
    maos_agent: "validation_agent"
    HMNM_doc: "QUICKLAUNCH"
    matb_format: "Mermaid.js"
    
  development_phase:
    triggers: ["实现", "编码", "架构", "系统", "技术"]
    gstr_dimension: "space+time"
    maos_agent: "development_agent"
    HMNM_doc: "META"
    matb_format: "MDT-NQd"
    
  launch_phase:
    triggers: ["发布", "上线", "部署", "运营", "监控"]
    gstr_dimension: "time"
    maos_agent: "monitoring_agent"
    HMNM_doc: "WINSHEET"
    matb_format: "ASCII树"
    
  fundraising_phase:
    triggers: ["路演", "投资", "融资", "估值", "股权"]
    gstr_dimension: "goal+time"
    maos_agent: "fundraising_agent"
    HMNM_doc: "ROOT"
    matb_format: "Mermaid.js"
```

### 5.2 智能体编排语法增强

#### 5.2.1 MDT-NQd智能体调用语法
```
层级 [节点标记] 描述文本 ::上下文::(主语)-[谓语]->{宾语} @智能体名称 [属性标记]
```

#### 5.2.2 创业场景应用示例
```markdown