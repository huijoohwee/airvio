---
# YAML 前言区 | YAML Front-matter
meta:
  identifier: "CORE:CORE-REQUIREMENTS"
  title: "要求|Requirements"
  moduleType: ["核心", "规范"]
  domain: ["开发规范", "执行策略", "技术要求"]
  version: "1.0.0"
  status: ["已迁移"]
  owner: "{{系统架构师}}"
  created: "2025-08-07"
  updated: "2025-08-07"
  relates_to: ["../fields/fields-s3out/fields.yaml", "CORE-BACKGROUND.md", "CORE-GOAL.md", "../modules/"]

# 字段池引用配置
field_pool_config:
  source_file: "../fields/fields-s3out/fields.yaml"
  reference_method: "external_import"
  auto_sync: true
  fallback_mode: "local_cache"

# 引用方式: {{dynamic_fields.字段名}}
dynamic_fields:
  $ref: "../fields/fields-s3out/fields.yaml#/dynamic_fields"
---

# 要求\|Requirements

## 使用规范
1. **继承优先级**: **`全局变量 < 文档类型变量 < 版本变量 < 实例变量`**

---

## 价值导向\|Value-Driven

### 目标实现链路\|Goal-realization Chain
- **目标导向行动\|Goal-directed Action**: 商业价值指导技术选型，避免技术炫技
- **上游到下游\|Upstream-to-downstream**: 居高临下识关键点，滚雪球式实现突破
- **核心到边缘\|Core-to-edge**: 先验证核心价值，再扩展辅助功能
- **主干到分支\|Trunk-to-branch**: P0核心价值链路优先，分支功能逐步扩展
- **优先级策略\|Prioritization Strategy**: Small wins → Big wins，快速验证核心价值
- **最后一公里挑战\|Last-mile Challenge**: 从功能完成到用户价值交付的关键环节

### 用户中心原则\|User-centric Principle
- **付费需求优先\|Payment Validation**: 用户痛点驱动解决方案，付费意愿验证商业价值
- **旅程映射技术\|Journey Mapping**: 用户体验优化工具链，端到端体验设计
- **Happy Path**: 用户顺利完成核心任务的主流程
- **Unhappy Path**: 异常处理和边界情况的优雅降级

### 执行原则\|Execution Principle
@table=execution-principle{
| 执行原则\|Execution Principle | 应用\|Application | 具体实践\|Practice |
|---|---|---|
| **DRY** | 重复消除，组件复用\|"Don't Repeat Yourself" | 代码模板化、文档模块化 |
| **KISS** | 简单粗暴，快速迭代\|"Keep It Simple & Stupid" | 先能用，再好用，最后好看 |
| **YAGNI** | 按需构建，避免过度设计\|"You Aren't Gonna Need It" | 当前需求优先，未来需求暂缓 |
| **SOLID** | 高内聚低耦合架构\|High cohesion, low coupling | 面向接口编程，依赖倒置 |
}

**SOLID原则详解**:
- **SRP**: 单一职责原则\|Single Responsibility Principle - 每个模块只做一件事
- **OCP**: 开闭原则\|Open–closed Principle - 对扩展开放，对修改关闭
- **LSP**: 里氏替换原则\|Liskov Substitution Principle - 子类可替换父类
- **ISP**: 接口隔离原则\|Interface Segregation Principle - 小而专的接口
- **DIP**: 依赖倒置原则\|Dependency Inversion Principle - 依赖抽象而非具体

**DRY 原则应用 MECE 技巧**:
- **二分法**：执行维度按"基础执行"✅ vs "自定义执行"❌ 严格区分
- **公式法**：成本效率=复杂度×执行频次（如：函数高频使用效益最大化）
- **矩阵法**：性价比用"开发成本"（行）✖️"使用频率"（列）定位价值回报象限

---

## 执行策略\|Execution Strategy

### 资源要求\|Resource Requirement
- **AI原生\|AI-Native**: 大模型时代架构设计，prompt即代码
- **云原生\|Cloud-Native**: 弹性伸缩，按需付费，无服务器架构
- **人机协作\|Human-AI Collaboration**: 人类创意 + AI效率，最大化杠杆效应

### RACI责任矩阵\|RACI Matrix
@table=raci-matrix{
| 角色\|Role | 负责\|Responsible | 批准\|Accountable | 咨询\|Consulted | 知情\|Informed |
|---|---|---|---|---|---|
| **产品负责人** | 需求定义、用户故事 | 产品决策 | 技术团队 | 投资人 |
| **AI架构师** | 技术方案、架构设计 | 技术决策 | 产品负责人 | 全团队 |
| **开发工程师** | 代码实现、测试 | 功能交付 | AI架构师 | 产品负责人 |
| **运维工程师** | 部署、监控、运维 | 系统稳定 | AI架构师 | 全团队 |
}

### 快速启动\|Quick Launch
**`极速复制 → 微调优化 → 价值验证`**
1. **复制\|Copy**: 寻找相似开源项目作为起点
2. **微调\|Customize**: 针对具体需求进行最小化修改
3. **验证\|Validate**: 快速验证核心价值假设

### 部署原则\|Deployment Rules
- **简单操作**: 任何LLM都可运行，降低使用门槛
- **实战为王**: 空谈误事，实干兴业，快速试错
- **按需使用**: 避免资源浪费，按实际使用付费

---

## 人机协作要求\|Human-AI Collaboration Requirements

### 语义混合架构优势|Semantic-Human Hybrid Architecture
**Prioritize hybrid Universal Semantic-Human Scaffold for LLM Communication**
- **Token经济|Token-economy**: 关键元数据用YAML/JSON-LD编码，减少内联散文
- **自然语言清晰|Natural language clarity**: 保持指令、示例、后续行动的自然语言清晰度
- **通用语义|Universal Semantics**: 通过CURIE和@context嵌入通用语义，支持下游工具解析
- **多语言前置信息|Multi-lingual Front-matter**: 支持中英文等多语言前言，扁平化、token高效映射
- **AST集成**: YAML front-matter → JSON-LD提取 → markdown正文 → prompt内容管道化处理

### AI协作比例\|AI Collaboration Ratios
| 任务级别\|Task Level | AI比例\|AI Ratio | 人工比例\|Human Ratio | 适用场景\|Use Case |
|---|---|---|---|---|
| **L0级** | 90% AI生成 | 10% 人工校验 | 文档、代码、测试 |
| **L1级** | 50% AI辅助 | 50% 人工决策 | 架构设计、产品决策 |
| **L2级** | 30% AI建议 | 70% 人工主导 | 战略规划、商业决策 |

**自动化原则\|Automation Rule**: 尽可能自动化，抵制手动更新诱惑

---

## 技术要求\|Technical Requirements

### 工具选择\|Tool Selection
| 优先级\|Priority | 标准\|Criteria | 示例\|Examples |
|---|---|---|
| **P0** | 广泛使用 + 开源 + 免费 | Next.js, React, Node.js |
| **P1** | 社区活跃 + 文档完善 | Vercel, Supabase, Tailwind |
| **P2** | 商业支持 + 长期维护 | AWS, Stripe, Figma |

### 架构平衡\|Architecture Balance
- **高频场景/High-frequency**: 单体封装，性能优先 - 如核心MVP功能
- **低频需求/Low-frequency**: 微服务化，按需启动 - 如高级分析功能

---

## 迭代规范\|Iteration Rules

### 版本策略\|Version Strategy
**`极简版(1天) → MVP版(7天) → 完整版(30天)`**
- **极简版/Minimal Version**: 能运行的最简版本
- **MVP版/MVP Version**: 核心功能完整的MVP
- **完整版/Full Version**: 功能完整的正式版

### 反馈循环\|Feedback Loop
- **L0→Ln\|Top-down**: 战略拆解为战术任务，自上而下
- **Ln→L0\|Bottom-up**: 执行反馈优化战略，自下而上

---

## 文件要求\|File Requirement

### 最小可行文件集\|Minimum Viable File Set
**开工前\|Prior-start Work**: 阅读文档，布局规划；关键词：执行指令
- [README.md]: 项目概览和快速开始
- [QUICKLAUNCH.md]: 一键启动指南
- [WINSHEET.md]: 每日进展记录
- [todo.md]: 任务清单和优先级

**完工前\|Prior-end Work**: 更新文档，复盘总结；关键词：精炼概括
- 上述所有文档: 更新
- [CHANGELOG.md]: 添加版本变更记录
- [DEPLOYMENT.md]: 创建部署指南

---

## 文档要求\|Documentation Requirements

### 全局文档\|Global Docs
- YAML Front-matter标准化
- 文档索引\|Document Index：内容P0链路清晰
- 索引系统\|Index System：从0到1运维脉络完整
- 字段池\|Field Pool：可复用的文档元素

### 项目文档\|Project Docs
- **生成链路**: 先确保`meta.document_required`存在，再执行生成
- **更新链路**: 执行完成后立即更新相关文档

### 文风要求\|Writing Style Requirements
- **自然文本\|Natural Language**: 字少事大，简洁明了\|Clear, concise
- **表述要求**: 精炼可执行为上，避免冗余描述\|Executable Focus, actionable over descriptive

### 格式要求\|Format Standards
- **MDT-NQd**: 复杂嵌套关系优先使用 Markdown Tree N-Quads



---

## 代码规范\|Code Requirements

### 基础规范\|Basic Standards
- **命名清晰\|Clear Naming**: 变量、函数、文件命名见名知意
- **注释完整\|Complete Comments**: 关键逻辑必须有注释
- **测试覆盖\|Test Coverage**: 核心功能必须有测试
- **错误处理\|Error Handling**: 所有异常必须有处理逻辑
- **代码注释\|Code Comments**: 中英文双语，便于AI理解

### 提交规范\|Commit Standards
- **提交信息**: 遵循Conventional Commits规范
- **代码审查**: 每个PR至少一人review
- **版本标签**: 语义化版本号v1.0.0格式

---

## 指令要求\|Prompt Requirements

### Prompt设计原则\|Design Principles
- **上下文完整\|Complete Context**: 提供足够的背景信息
- **输出格式明确\|Clear Output Format**: 指定预期的输出格式
- **约束条件清晰\|Explicit Constraints**: 明确限制和要求
- **示例驱动\|Example-Driven**: 提供输入输出示例

### 指令模板结构\|Prompt Template Structure
```markdown
# 角色定义\|Role Definition
你是{{角色\|role}}，专长于{{领域\|domain}}

# 任务描述\|Task Description
需要完成{{具体任务\|specific task}}

# 输入格式\|Input Format
{{输入数据结构\|input data structure}}

# 输出要求\|Output Requirements
{{输出格式要求\|output format requirements}}

# 约束条件\|Constraints
{{限制和规则\|limitations and rules}}

# 示例\|Examples
{{输入示例\|input example}} → {{输出示例\|output example}}
```

---

## 模板化要求\|Template Requirements
- **Template-driven**: Reusable document components

### 参数化\|Parameterization
- **可配置参数**: 通过环境变量或配置文件管理
- **模板变量**: 使用{{variable}}语法
- **条件渲染**: 支持if/else逻辑判断

### 函数化\|Functionalization
- **纯函数优先**: 无副作用，易于测试
- **单一职责**: 每个函数只做一件事
- **组合模式**: 小函数组合成大功能

### 变量库

---

## 避坑指南与最佳实践\|Anti-Patterns & Best Practices

### ❌ 常见陷阱\|Common Pitfalls
- **过度设计\|Over-engineering**: 解决不存在的问题，浪费资源
- **技术炫技\|Technology for technology's sake**: 忽视用户价值，为了技术而技术
- **完美主义\|Perfectionism**: 错过市场窗口，错失机会
- **过早优化\|Premature optimization**: 在验证价值前过度优化
- **单点故障\|Single points of failure**: 过度依赖单一工具或平台

### ✅ 正确姿势\|Best Practices
- **用户痛点优先\|User pain first**: 从用户真实需求出发
- **快速验证假设\|Rapid hypothesis validation**: 最小成本验证核心价值
- **渐进式优化\|Progressive optimization**: 持续改进，小步快跑
- **数据驱动决策\|Data-driven decisions**: 用数据指导决策
- **备份策略\|Backup strategies**: 关键数据和代码多重备份

### 决策框架\|Decision Framework
| 决策类型\|Decision Type | 评估标准\|Evaluation Criteria | 决策时间\|Timebox |
|---|---|---|---|
| **技术选型\|Tech Stack Selection** | 用户价值 > 技术先进性 | 2小时内 |
| **功能优先级\|Feature Prioritization** | 付费用户价值 > 免费用户价值 | 1小时内 |
| **架构设计\|Architectural Design** | 简单可维护 > 复杂高性能 | 4小时内 |

---

## 风险缓解要求\|Risk Mitigation Requirements

### 技术风险\|Technical Risks
- **依赖\|Dependency**: 避免单点故障
- **扩展\|Scalability**: 规划10倍增长场景
- **安全\|Security**: 从第一天实施数据保护

### 市场风险\|Market Risks
- **竞争\|Competition**: 监控格局，保持差异化
- **时机\|Timing**: 快速执行抓住市场机会
- **验证\|Validation**: 持续用真实用户测试假设

### 执行风险\|Execution Risks
- **资源\|Resource**: 保持精简运营，专注核心
- **团队\|Team**: AI优先思维，最小化人工依赖
- **质量\|Quality**: 平衡速度与可靠性