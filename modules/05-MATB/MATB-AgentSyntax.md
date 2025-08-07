---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "matb:agent-syntax"
  title_zh: "MATB智能体编排语法增强"
  title_en: "MATB Agent Orchestration Syntax Enhancement"
  shortTitle_zh: "智能体语法"
  shortTitle_en: "Agent Syntax"
  moduleType: ["核心", "core"]
  domain: ["智能体编排", "语法规范", "MDT-NQd", "任务调度"]
  version: "1.0.0"
  status: ["已迁移", "生产就绪"]
  owner: "{{系统架构师}}"
  stakeholders: ["AI工程师", "智能体开发者", "系统架构师"]
  tags: ["MATB", "agent-syntax", "orchestration", "MDT-NQd"]
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: [
    "../../shared/fields/fields-s3out/fields.yaml",
    "MATB-SemanticMapping.md",
    "MATB-ConversionEngine.md",
    "../03-MAOS/MAOS-Orchestration.md"
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

# MATB智能体编排语法增强

## 概述

MATB（Markdown-ASCII树形桥接层）智能体编排语法增强模块提供了MDT-NQd智能体调用语法，支持创业场景下的智能体协作与任务编排。

## MDT-NQd智能体调用语法

### 语法规范

#### 基础语法结构
```
[DP] 任务描述 ::场景::(执行者)-[动作]->{目标对象} @智能体名称 [属性=值]
```

#### 语法元素说明

| 元素 | 符号 | 说明 | 示例 |
|------|------|------|------|
| **任务类型** | [DP] | 任务优先级和类型标识 | [DP]、[TX]、[RS]、[VN] |
| **场景上下文** | ::场景:: | 任务执行的业务场景 | ::startup::、::research::、::analytics:: |
| **执行者** | (执行者) | 任务的执行主体 | (团队)、(AI)、(系统) |
| **动作** | -[动作]- | 具体的执行动作 | -[验证]-、-[执行]-、-[分析]- |
| **目标对象** | ->{对象} | 动作的目标对象 | ->{产品假设}、->{客户访谈} |
| **智能体** | @agent_name | 负责执行的智能体 | @validation_agent、@discovery_agent |
| **属性** | [key=value] | 任务的附加属性 | [priority=0]、[type=analytics] |

### 任务类型定义

#### 核心任务类型
```yaml
task_types:
  DP: # Discovery & Planning
    description: "发现与规划任务"
    priority: "高"
    typical_agents: ["discovery_agent", "validation_agent"]
    
  TX: # Transaction & Execution
    description: "交易与执行任务"
    priority: "中"
    typical_agents: ["development_agent", "orchestration_agent"]
    
  RS: # Reporting & Status
    description: "报告与状态任务"
    priority: "低"
    typical_agents: ["monitoring_agent"]
    
  VN: # Validation & Notification
    description: "验证与通知任务"
    priority: "中高"
    typical_agents: ["validation_agent", "monitoring_agent"]
```

### 创业场景应用示例

#### 精益创业验证流程
```
## [DP] MVP验证 ::startup::(团队)-[验证]->{产品假设} @validation_agent [priority=0]
    - → [TX] 用户访谈 ::research::(团队)-[执行]->{客户访谈} @discovery_agent
    - ⏹ [RS] 反馈报告 ::data::(系统)-[生成]->{用户反馈} @monitoring_agent
    
    %% [VN] 数据分析服务 @development_agent [type=analytics]
    ::analytics::(AI)-[分析]->{用户行为数据}
    ::insights::(系统)-[提取]->{关键洞察}
```

#### 智能体协作模式

##### 串行执行模式
```
[DP] 市场调研 ::startup::(团队)-[调研]->{目标市场} @discovery_agent [priority=1]
  ↓
[TX] 竞品分析 ::research::(AI)-[分析]->{竞争对手} @discovery_agent [priority=2]
  ↓
[VN] 机会评估 ::strategy::(系统)-[评估]->{市场机会} @validation_agent [priority=3]
```

##### 并行执行模式
```
[DP] 产品开发 ::startup::(团队)-[开发]->{MVP产品} @development_agent [priority=0]
  ├─ [TX] 前端开发 ::frontend::(开发者)-[构建]->{用户界面} @development_agent [type=frontend]
  ├─ [TX] 后端开发 ::backend::(开发者)-[构建]->{API服务} @development_agent [type=backend]
  └─ [VN] 集成测试 ::testing::(QA)-[测试]->{系统集成} @validation_agent [type=integration]
```

##### 条件执行模式
```
[DP] 融资决策 ::fundraising::(团队)-[决策]->{融资策略} @fundraising_agent [priority=0]
  ├─ IF(revenue > $10K) → [TX] A轮融资 ::funding::(团队)-[申请]->{A轮投资} @fundraising_agent
  ├─ IF(revenue < $10K) → [TX] 种子轮融资 ::funding::(团队)-[申请]->{种子投资} @fundraising_agent
  └─ ELSE → [DP] 自举发展 ::bootstrap::(团队)-[执行]->{自主发展} @orchestration_agent
```

### 智能体通信协议

#### N-Quads语义化命令
```
<subject> <predicate> <object> <context> .

示例：
<validation_agent> <executes> <mvp_validation> <startup_context> .
<discovery_agent> <provides_data_to> <validation_agent> <research_context> .
<monitoring_agent> <reports_status_to> <orchestration_agent> <system_context> .
```

#### 智能体间消息格式
```yaml
agent_message:
  from: "discovery_agent"
  to: "validation_agent"
  task_id: "MVP_VALIDATION_001"
  message_type: "data_transfer"
  payload:
    data_type: "user_interviews"
    content: "20个用户访谈结果"
    confidence: 0.85
    timestamp: "2025-08-07T10:30:00Z"
  context:
    scenario: "startup"
    phase: "validation"
    priority: 0
```

### 语法优化策略

#### Token效率优化
```yaml
token_optimization:
  symbol_compression:
    "@validation_agent" → "@VA"
    "::startup::" → "::ST::"
    "-[验证]-" → "-[V]-"
    "->{产品假设}" → "->{PH}"
    
  template_reuse:
    common_patterns:
      - "[DP] {{task}} ::{{scenario}}::({{actor}})-[{{action}}]->{{{target}}} @{{agent}}"
      - "[TX] {{task}} → [VN] {{validation}}"
      
  batch_processing:
    group_similar_tasks: true
    parallel_execution: true
    resource_pooling: true
```

#### 语义映射增强
```yaml
semantic_mapping:
  startup_phases:
    discovery: ["市场调研", "用户访谈", "问题验证"]
    validation: ["MVP测试", "假设验证", "用户反馈"]
    development: ["产品开发", "功能实现", "技术架构"]
    launch: ["产品发布", "市场推广", "用户获取"]
    fundraising: ["投资准备", "路演展示", "融资谈判"]
    
  agent_capabilities:
    discovery_agent: ["市场分析", "用户研究", "竞品调研"]
    validation_agent: ["假设验证", "测试执行", "结果评估"]
    development_agent: ["产品开发", "技术实现", "架构设计"]
    fundraising_agent: ["融资策略", "投资人对接", "材料准备"]
    monitoring_agent: ["状态监控", "性能分析", "报告生成"]
```

### 实施指南

#### 语法集成步骤
1. **语法解析器配置**
   - 配置MDT-NQd语法解析规则
   - 设置智能体映射表
   - 定义场景上下文词典

2. **智能体注册**
   - 注册可用智能体及其能力
   - 配置智能体间通信协议
   - 设置任务分发规则

3. **执行引擎集成**
   - 集成任务调度器
   - 配置并行执行支持
   - 实现状态监控机制

#### 最佳实践
- **任务粒度控制**：保持任务原子性，避免过度复杂的嵌套
- **智能体负载均衡**：合理分配任务，避免单点过载
- **错误处理机制**：实现任务失败重试和降级策略
- **性能监控**：实时监控执行效率和资源消耗

#### 常见问题与解决方案

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 语法解析失败 | 格式不规范 | 使用语法验证器检查 |
| 智能体无响应 | 负载过高或故障 | 实现故障转移机制 |
| 任务执行超时 | 资源不足或复杂度过高 | 优化任务分解和资源分配 |
| 通信协议错误 | 消息格式不匹配 | 标准化消息格式和验证 |

---

## 总结

MATB智能体编排语法增强模块通过MDT-NQd语法提供了强大的智能体协作能力，支持创业场景下的复杂任务编排。通过标准化的语法规范、优化的Token使用和灵活的执行模式，确保智能体系统的高效运行和创业目标的快速达成。