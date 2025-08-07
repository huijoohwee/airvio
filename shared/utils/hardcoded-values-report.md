# AIRVIO 硬编码数值分析报告

生成时间: 2025-08-07 14:56:51

## 统计概览

- 扫描文件数: 28
- 发现硬编码数值: 319

## 按类别统计

- EXPERIENCE_THRESHOLDS: 5个
- FINANCIAL_THRESHOLDS: 27个
- PERFORMANCE_METRICS: 2个
- QUANTITY_THRESHOLDS: 1个
- SUCCESS_THRESHOLDS: 9个
- TIME_BUDGETS: 89个
- TOKEN_BUDGETS: 186个

## 详细发现

### modules/04-GSTR/GSTR-OODA.md

**行 9**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: | **观察(Observe)** | 市场调研、用户访谈、竞争分析 | 市场洞察报告 | 1-2周 | 1500T | 信息完整度≥90% |

**行 9**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **观察(Observe)** | 市场调研、用户访谈、竞争分析 | 市场洞察报告 | 1-2周 | 1500T | 信息完整度≥90% |

**行 10**: `3-5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_3_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_3_5}}`
- 原文: | **定位(Orient)** | 问题定义、机会识别、假设制定 | 问题假设文档 | 3-5天 | 1000T | 假设清晰度≥95% |

**行 10**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | **定位(Orient)** | 问题定义、机会识别、假设制定 | 问题假设文档 | 3-5天 | 1000T | 假设清晰度≥95% |

**行 11**: `2-3`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2_3`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2_3}}`
- 原文: | **决策(Decide)** | 解决方案设计、资源分配、计划制定 | 执行计划 | 2-3天 | 800T | 计划可行性≥90% |

**行 11**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **决策(Decide)** | 解决方案设计、资源分配、计划制定 | 执行计划 | 2-3天 | 800T | 计划可行性≥90% |

**行 12**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: | **行动(Act)** | MVP构建、测试执行、数据收集 | MVP产品+数据 | 1-2周 | 2000T | 目标达成率≥85% |

**行 12**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: | **行动(Act)** | MVP构建、测试执行、数据收集 | MVP产品+数据 | 1-2周 | 2000T | 目标达成率≥85% |

**行 13**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: | **反馈(Feedback)** | 结果分析、学习总结、策略调整 | 优化建议 | 1-2天 | 500T | 学习转化率≥80% |

**行 13**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | **反馈(Feedback)** | 结果分析、学习总结、策略调整 | 优化建议 | 1-2天 | 500T | 学习转化率≥80% |

### modules/04-GSTR/GSTR-Framework.md

**行 94**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: | **观察(Observe)** | 市场调研、用户访谈、竞争分析 | 市场洞察报告 | 1-2周 | 1500T | 信息完整度≥90% |

**行 94**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **观察(Observe)** | 市场调研、用户访谈、竞争分析 | 市场洞察报告 | 1-2周 | 1500T | 信息完整度≥90% |

**行 95**: `3-5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_3_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_3_5}}`
- 原文: | **定位(Orient)** | 问题定义、机会识别、假设制定 | 问题假设文档 | 3-5天 | 1000T | 假设清晰度≥95% |

**行 95**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | **定位(Orient)** | 问题定义、机会识别、假设制定 | 问题假设文档 | 3-5天 | 1000T | 假设清晰度≥95% |

**行 96**: `2-3`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2_3`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2_3}}`
- 原文: | **决策(Decide)** | 解决方案设计、资源分配、计划制定 | 执行计划 | 2-3天 | 800T | 计划可行性≥90% |

**行 96**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **决策(Decide)** | 解决方案设计、资源分配、计划制定 | 执行计划 | 2-3天 | 800T | 计划可行性≥90% |

**行 97**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: | **行动(Act)** | MVP构建、测试执行、数据收集 | MVP产品+数据 | 1-2周 | 2000T | 目标达成率≥85% |

**行 97**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: | **行动(Act)** | MVP构建、测试执行、数据收集 | MVP产品+数据 | 1-2周 | 2000T | 目标达成率≥85% |

**行 98**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: | **反馈(Feedback)** | 结果分析、学习总结、策略调整 | 优化建议 | 1-2天 | 500T | 学习转化率≥80% |

**行 98**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | **反馈(Feedback)** | 结果分析、学习总结、策略调整 | 优化建议 | 1-2天 | 500T | 学习转化率≥80% |

### modules/04-GSTR/GSTR-Dimensions.md

**行 105**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: - **决策延迟**：≤24小时

### modules/08-Reference/Reference-Checklists.md

**行 55**: `12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_12}}`
- 原文: ### 6-12小时：核心开发

**行 62**: `18`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_18`
- 替换为: `{{dynamic_fields.TIME_BUDGET_18}}`
- 原文: ### 12-18小时：系统集成

**行 69**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: ### 18-24小时：上线准备

### modules/08-Reference/Reference-Cases.md

**行 64**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: token_consumption: "12,500T (节省23%)"

**行 79**: `100K`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100K`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100K}}`
- 原文: goal: "月GMV目标$100K"

**行 85**: `95%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_95_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_95_}}`
- 原文: requirements_to_architecture: "HTx→ATr转换，95%准确率"

**行 91**: `85K`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_85K`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_85K}}`
- 原文: revenue_validation: "首月GMV达到$85K"

### modules/08-Reference/Reference-Glossary.md

**行 67**: `50,000`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_50_000`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_50_000}}`
- 原文: budget_limit: "$50,000"

**行 74**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: market_size_minimum: 100000000  # $100M

**行 117**: `80%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_80_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_80_}}`
- 原文: token_budget_warning: 0.8  # 80%使用率告警

### modules/08-Reference/Reference-Templates.md

**行 59**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: market_size_minimum: 100000000  # $100M

**行 103**: `80%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_80_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_80_}}`
- 原文: token_budget_warning: 0.8  # 80%使用率告警

### modules/06-Integration/Integration-TokenEconomy.md

**行 55**: `5200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_5200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_5200T}}`
- 原文: ### HMNM神经文档 (5200T)

**行 56**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: - BLUEPRINT: ≤1500T (架构设计)

**行 57**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: - ROOT: ≤600T (战略指令)

**行 58**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: - META: ≤500T (机器配置)

**行 59**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: - QUICKLAUNCH: ≤800T (快速启动)

**行 60**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: - README: ≤1000T (项目导航)

**行 61**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: - CHEATSHEET: ≤500T (问题速查)

**行 62**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: - WINSHEET: ≤300T (胜利记录)

**行 64**: `15000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_15000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_15000T}}`
- 原文: ### MAOS智能体编排 (15000T/轮)

**行 65**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: - 编排智能体: 200T/次

**行 66**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: - 发现智能体: 1500T/次

**行 67**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: - 验证智能体: 2000T/次

**行 68**: `2500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2500T}}`
- 原文: - 开发智能体: 2500T/次

**行 69**: `2500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2500T}}`
- 原文: - 融资智能体: 2500T/次

**行 70**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: - 监控智能体: 300T/次

**行 72**: `53000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_53000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_53000T}}`
- 原文: ### 创业阶段预算 (53000T/周期)

**行 73**: `8000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_8000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_8000T}}`
- 原文: - 发现阶段: 8000T

**行 74**: `10000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_10000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_10000T}}`
- 原文: - 验证阶段: 10000T

**行 75**: `12000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_12000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_12000T}}`
- 原文: - 开发阶段: 12000T

**行 76**: `8000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_8000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_8000T}}`
- 原文: - 发布阶段: 8000T

**行 77**: `15000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_15000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_15000T}}`
- 原文: - 融资阶段: 15000T

**行 85**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | **体系设计流** | 500T | 6小时内 | 架构图完成 | 模板化决策树 |

**行 86**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | **战略执行流** | 600T | 24小时内 | MVP存活 | 缓存常用路径 |

**行 87**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: | **反馈强化流** | 300T | 实时 | 问题解决率≥90% | 增量学习优化 |

**行 96**: `45%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_45_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_45_}}`
- 原文: optimization_target: "45%成本节省"

**行 99**: `80%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_80_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_80_}}`
- 原文: budget_warning: 0.8  # 80%使用率告警

**行 103**: `40%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_40_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_40_}}`
- 原文: template_reuse: "40%节省率"

**行 104**: `50%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_50_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_50_}}`
- 原文: dynamic_loading: "50%节省率"

**行 105**: `30%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_30_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_30_}}`
- 原文: semantic_compression: "30%节省率"

**行 114**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: | 编排智能体 | 所有智能体 | 指挥协调 | 双向 | 任务分配 | 200T |

**行 115**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | 发现智能体 | 验证智能体 | 数据传递 | 单向 | 问题验证完成 | 500T |

**行 116**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | 验证智能体 | 开发智能体 | 需求传递 | 单向 | MVP验证通过 | 600T |

**行 117**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | 开发智能体 | 监控智能体 | 状态同步 | 双向 | 系统部署 | 400T |

**行 118**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | 融资智能体 | 发现+验证智能体 | 内容获取 | 单向 | 融资材料需求 | 800T |

**行 119**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: | 监控智能体 | 所有智能体 | 性能监控 | 单向接收 | 实时监控 | 300T |

**行 127**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | **HTx→ATr** | 人类自然语言 | ASCII树形结构 | 400T | ≥95% | 需求分析、架构设计 |

**行 128**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: | **ATr→MDT** | ASCII树形结构 | Markdown表格 | 300T | ≥98% | 文档生成、数据展示 |

**行 129**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | **HTx→MDT** | 人类自然语言 | Markdown表格 | 500T | ≥90% | 快速文档化 |

**行 130**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | **MDT-NQd** | Markdown表格 | N-Quads语义 | 600T | ≥95% | 智能体通信 |

### modules/06-Integration/Integration-Assessment.md

**行 91**: `30`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_30`
- 替换为: `{{dynamic_fields.TIME_BUDGET_30}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 91**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 92**: `2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 92**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 93**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 93**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 94**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 94**: `1200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1200T}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 95**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 95**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 96**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

**行 96**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

**行 104**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: requirements: ["客户访谈≥20个", "问题验证率≥80%", "市场规模≥$100M"]

**行 104**: `≥20个`
- 类别: QUANTITY_THRESHOLDS
- 建议字段: `QUANTITY_THRESHOLD__20_`
- 替换为: `{{dynamic_fields.QUANTITY_THRESHOLD__20_}}`
- 原文: requirements: ["客户访谈≥20个", "问题验证率≥80%", "市场规模≥$100M"]

**行 114**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 114**: `10M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 114**: `1M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_1M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_1M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 124**: `≥3年`
- 类别: EXPERIENCE_THRESHOLDS
- 建议字段: `EXPERIENCE_THRESHOLD__3_`
- 替换为: `{{dynamic_fields.EXPERIENCE_THRESHOLD__3_}}`
- 原文: requirements: ["核心团队完整", "相关经验≥3年", "执行能力验证"]

### modules/06-Integration/Integration-ValueFlow.md

**行 75**: `6`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_6`
- 替换为: `{{dynamic_fields.TIME_BUDGET_6}}`
- 原文: | **6小时** | HMNM文档完成度 | ≥90% | 自动检测 | 模板回退 |

**行 76**: `12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_12}}`
- 原文: | **12小时** | MAOS智能体就绪 | ≥95% | 状态监控 | 手动介入 |

**行 77**: `18`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_18`
- 替换为: `{{dynamic_fields.TIME_BUDGET_18}}`
- 原文: | **18小时** | GSTR执行进度 | ≥85% | 进度跟踪 | 资源调整 |

**行 78**: `22`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_22`
- 替换为: `{{dynamic_fields.TIME_BUDGET_22}}`
- 原文: | **22小时** | MVP功能完整度 | ≥80% | 功能测试 | 范围缩减 |

**行 79**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: | **24小时** | 系统可用性 | ≥99% | 健康检查 | 紧急修复 |

**行 121**: `30`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_30`
- 替换为: `{{dynamic_fields.TIME_BUDGET_30}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 121**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 122**: `2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 122**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 123**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 123**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 124**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 124**: `1200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1200T}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 125**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 125**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 126**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

**行 126**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

**行 230**: `6`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_6`
- 替换为: `{{dynamic_fields.TIME_BUDGET_6}}`
- 原文: | **6小时** | HMNM文档完成度 | ≥90% | 自动检测 | 模板回退 |

**行 231**: `12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_12}}`
- 原文: | **12小时** | MAOS智能体就绪 | ≥95% | 状态监控 | 手动介入 |

**行 232**: `18`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_18`
- 替换为: `{{dynamic_fields.TIME_BUDGET_18}}`
- 原文: | **18小时** | GSTR执行进度 | ≥85% | 进度跟踪 | 资源调整 |

**行 233**: `22`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_22`
- 替换为: `{{dynamic_fields.TIME_BUDGET_22}}`
- 原文: | **22小时** | MVP功能完整度 | ≥80% | 功能测试 | 范围缩减 |

**行 234**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: | **24小时** | 系统可用性 | ≥99% | 健康检查 | 紧急修复 |

**行 276**: `30`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_30`
- 替换为: `{{dynamic_fields.TIME_BUDGET_30}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 276**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 277**: `2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 277**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 278**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 278**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 279**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 279**: `1200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1200T}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 280**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 280**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 281**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

**行 281**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

### modules/06-Integration/Integration-MVPFlow.md

**行 84**: `6`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_6`
- 替换为: `{{dynamic_fields.TIME_BUDGET_6}}`
- 原文: | **6小时** | HMNM文档完成度 | ≥90% | 自动检测 | 模板回退 |

**行 85**: `12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_12}}`
- 原文: | **12小时** | MAOS智能体就绪 | ≥95% | 状态监控 | 手动介入 |

**行 86**: `18`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_18`
- 替换为: `{{dynamic_fields.TIME_BUDGET_18}}`
- 原文: | **18小时** | GSTR执行进度 | ≥85% | 进度跟踪 | 资源调整 |

**行 87**: `22`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_22`
- 替换为: `{{dynamic_fields.TIME_BUDGET_22}}`
- 原文: | **22小时** | MVP功能完整度 | ≥80% | 功能测试 | 范围缩减 |

**行 88**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: | **24小时** | 系统可用性 | ≥99% | 健康检查 | 紧急修复 |

**行 103**: `12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_12}}`
- 原文: duration: "6-12小时"

**行 109**: `18`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_18`
- 替换为: `{{dynamic_fields.TIME_BUDGET_18}}`
- 原文: duration: "12-18小时"

**行 115**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: duration: "18-24小时"

**行 128**: `≤2秒`
- 类别: PERFORMANCE_METRICS
- 建议字段: `PERFORMANCE_METRIC__2_`
- 替换为: `{{dynamic_fields.PERFORMANCE_METRIC__2_}}`
- 原文: performance_tests: "响应时间≤2秒"

**行 169**: `≤1秒`
- 类别: PERFORMANCE_METRICS
- 建议字段: `PERFORMANCE_METRIC__1_`
- 替换为: `{{dynamic_fields.PERFORMANCE_METRIC__1_}}`
- 原文: | **第3周期** | 性能与扩展性 | 响应时间≤1秒 | 开发60%，运维40% |

### modules/06-Integration/Integration-Optimization.md

**行 124**: `6`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_6`
- 替换为: `{{dynamic_fields.TIME_BUDGET_6}}`
- 原文: | **6小时** | HMNM文档完成度 | ≥90% | 自动检测 | 模板回退 |

**行 125**: `12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_12}}`
- 原文: | **12小时** | MAOS智能体就绪 | ≥95% | 状态监控 | 手动介入 |

**行 126**: `18`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_18`
- 替换为: `{{dynamic_fields.TIME_BUDGET_18}}`
- 原文: | **18小时** | GSTR执行进度 | ≥85% | 进度跟踪 | 资源调整 |

**行 127**: `22`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_22`
- 替换为: `{{dynamic_fields.TIME_BUDGET_22}}`
- 原文: | **22小时** | MVP功能完整度 | ≥80% | 功能测试 | 范围缩减 |

**行 128**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: | **24小时** | 系统可用性 | ≥99% | 健康检查 | 紧急修复 |

**行 170**: `30`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_30`
- 替换为: `{{dynamic_fields.TIME_BUDGET_30}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 170**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **执行摘要** | 融资智能体 | 800T | 30分钟 | 投资人关注点覆盖≥95% |

**行 171**: `2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 171**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: | **商业计划书** | 发现+融资智能体 | 2000T | 2小时 | 逻辑完整性≥90% |

**行 172**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 172**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **财务模型** | 融资智能体 | 1500T | 1小时 | 数据准确性≥98% |

**行 173**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 173**: `1200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1200T}}`
- 原文: | **路演PPT** | 融资智能体 | 1200T | 1.5小时 | 视觉吸引力≥85% |

**行 174**: `1`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 174**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | **技术文档** | 开发智能体 | 1000T | 1小时 | 技术可行性≥95% |

**行 175**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

**行 175**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: | **市场分析** | 发现智能体 | 1500T | 1.5小时 | 数据支撑度≥90% |

**行 186**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: duration: "1-2天"

**行 192**: `2-3`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2_3`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2_3}}`
- 原文: duration: "2-3天"

**行 198**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: duration: "1-2天"

**行 221**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: mvp_delivery_time: "≤24小时"

### modules/03-MAOS/MAOS-Orchestration.md

**行 100**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: token_budget: 2000T

**行 103**: `2-4`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2_4`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2_4}}`
- 原文: duration: "2-4周"

**行 107**: `3000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_3000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_3000T}}`
- 原文: token_budget: 3000T

**行 110**: `4-8`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_4_8`
- 替换为: `{{dynamic_fields.TIME_BUDGET_4_8}}`
- 原文: duration: "4-8周"

**行 114**: `4000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_4000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_4000T}}`
- 原文: token_budget: 4000T

**行 117**: `8-12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_8_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_8_12}}`
- 原文: duration: "8-12周"

**行 121**: `2500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2500T}}`
- 原文: token_budget: 2500T

**行 122**: `50`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_50`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_50}}`
- 原文: success_criteria: "用户获取成本≤$50"

**行 124**: `4-6`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_4_6`
- 替换为: `{{dynamic_fields.TIME_BUDGET_4_6}}`
- 原文: duration: "4-6周"

**行 128**: `3500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_3500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_3500T}}`
- 原文: token_budget: 3500T

**行 131**: `6-10`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_6_10`
- 替换为: `{{dynamic_fields.TIME_BUDGET_6_10}}`
- 原文: duration: "6-10周"

**行 199**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: monitoring_interval: "5分钟"

### modules/03-MAOS/MAOS-Architecture.md

**行 66**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | 发现智能体 | 验证智能体 | 数据传递 | 单向 | 问题验证完成 | 500T |

**行 67**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | 验证智能体 | 开发智能体 | 需求传递 | 单向 | MVP验证通过 | 600T |

**行 68**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | 开发智能体 | 监控智能体 | 状态同步 | 双向 | 系统部署 | 400T |

**行 69**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | 融资智能体 | 发现+验证智能体 | 内容获取 | 单向 | 融资材料需求 | 800T |

**行 98**: `50`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_50`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_50}}`
- 原文: success_criteria: "用户获取成本≤$50"

### modules/03-MAOS/MAOS-StartupIntegration.md

**行 24**: `3000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_3000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_3000T}}`
- 原文: token_budget: 3000T

**行 36**: `2000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2000T}}`
- 原文: token_budget: 2000T

**行 48**: `1500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1500T}}`
- 原文: token_budget: 1500T

**行 57**: `2-4`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2_4`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2_4}}`
- 原文: duration: "2-4周"

**行 64**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: token_budget: 800T

**行 70**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: token_budget: 600T

**行 76**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: token_budget: 400T

**行 82**: `10M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10M}}`
- 原文: - "目标市场规模 >= $10M"

**行 95**: `4-6`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_4_6`
- 替换为: `{{dynamic_fields.TIME_BUDGET_4_6}}`
- 原文: duration: "4-6周"

**行 102**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: token_budget: 1000T

**行 108**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: token_budget: 800T

**行 114**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: token_budget: 600T

**行 133**: `8-12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_8_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_8_12}}`
- 原文: duration: "8-12周"

**行 140**: `2500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_2500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_2500T}}`
- 原文: token_budget: 2500T

**行 146**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: token_budget: 800T

**行 152**: `700T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_700T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_700T}}`
- 原文: token_budget: 700T

**行 171**: `4-8`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_4_8`
- 替换为: `{{dynamic_fields.TIME_BUDGET_4_8}}`
- 原文: duration: "4-8周"

**行 178**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: token_budget: 600T

**行 184**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: token_budget: 800T

**行 190**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: token_budget: 400T

**行 195**: `50`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_50`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_50}}`
- 原文: - "用户获取成本 <= $50"

**行 209**: `6-10`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_6_10`
- 替换为: `{{dynamic_fields.TIME_BUDGET_6_10}}`
- 原文: duration: "6-10周"

**行 216**: `1200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1200T}}`
- 原文: token_budget: 1200T

**行 222**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: token_budget: 800T

**行 228**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: token_budget: 600T

**行 255**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: token_overhead: 200T

**行 263**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: token_overhead: 300T

**行 271**: `250T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_250T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_250T}}`
- 原文: token_overhead: 250T

**行 279**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: token_overhead: 400T

**行 289**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: overlap_duration: "1-2周"

**行 295**: `4-6`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_4_6`
- 替换为: `{{dynamic_fields.TIME_BUDGET_4_6}}`
- 原文: overlap_duration: "4-6周"

**行 301**: `2-4`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2_4`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2_4}}`
- 原文: overlap_duration: "2-4周"

**行 428**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: escalation_time: "24小时"

**行 433**: `12`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_12`
- 替换为: `{{dynamic_fields.TIME_BUDGET_12}}`
- 原文: escalation_time: "12小时"

### modules/03-MAOS/MAOS-Agents.md

**行 13**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | **编排智能体** | 多智能体动态编排与协调 | 1000T | `::Orchestration::(MAOS)-[initialize]->{Agent_Pool}` | 全阶段 | 中央协调 |

**行 14**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **发现智能体** | 问题发现与市场研究 | 800T | `::Discovery::(Problem)-[validate]->{Customer_Interview}` | 发现阶段 | 串行深度 |

**行 15**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | **验证智能体** | MVP验证与迭代优化 | 600T | `::Validation::(MVP)-[test]->{User_Feedback}` | 验证阶段 | 并行验证 |

**行 16**: `1200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1200T}}`
- 原文: | **开发智能体** | 产品开发与技术实现 | 1200T | `::Development::(Feature)-[build]->{Prototype}` | 开发阶段 | 混合协作 |

**行 17**: `900T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_900T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_900T}}`
- 原文: | **融资智能体** | 投资材料准备与展示 | 900T | `::Fundraising::(Pitch)-[generate]->{Investor_Deck}` | 融资阶段 | 自适应编排 |

**行 18**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | **监控智能体** | 系统监控与性能优化 | 400T | `::Monitor::(System)-[track]->{Performance_Metrics}` | 全阶段 | 实时监控 |

**行 70**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: | 编排智能体 | 所有智能体 | 指挥协调 | 双向 | 任务分配 | 1000T |

**行 71**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | 发现智能体 | 验证智能体 | 数据传递 | 单向 | 问题验证完成 | 500T |

**行 72**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | 验证智能体 | 开发智能体 | 需求传递 | 单向 | MVP验证通过 | 600T |

**行 73**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | 开发智能体 | 监控智能体 | 状态同步 | 双向 | 系统部署 | 400T |

**行 74**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | 融资智能体 | 发现+验证智能体 | 内容获取 | 单向 | 融资材料需求 | 800T |

**行 75**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | 监控智能体 | 所有智能体 | 性能监控 | 单向接收 | 实时监控 | 400T |

**行 121**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: orchestration_agent: 1000T  # 20%

**行 122**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: discovery_agent: 800T       # 16%

**行 123**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: validation_agent: 600T      # 12%

**行 124**: `1200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1200T}}`
- 原文: development_agent: 1200T    # 24%

**行 125**: `900T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_900T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_900T}}`
- 原文: fundraising_agent: 900T     # 18%

**行 126**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: monitoring_agent: 400T      # 8%

**行 127**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: collaboration_overhead: 100T # 2%

**行 128**: `5000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_5000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_5000T}}`
- 原文: total_budget: 5000T         # 100%

### modules/01-LNST/LNST-InvestorReadiness.md

**行 63**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 63**: `10M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 63**: `1M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_1M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_1M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 73**: `≥3年`
- 类别: EXPERIENCE_THRESHOLDS
- 建议字段: `EXPERIENCE_THRESHOLD__3_`
- 替换为: `{{dynamic_fields.EXPERIENCE_THRESHOLD__3_}}`
- 原文: requirements: ["核心团队完整", "相关经验≥3年", "执行能力验证"]

### modules/01-LNST/LNST-Phases.md

**行 73**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 73**: `10M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 73**: `1M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_1M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_1M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 83**: `≥3年`
- 类别: EXPERIENCE_THRESHOLDS
- 建议字段: `EXPERIENCE_THRESHOLD__3_`
- 替换为: `{{dynamic_fields.EXPERIENCE_THRESHOLD__3_}}`
- 原文: requirements: ["核心团队完整", "相关经验≥3年", "执行能力验证"]

### modules/01-LNST/LNST-Overview.md

**行 103**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 103**: `10M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 103**: `1M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_1M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_1M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 113**: `≥3年`
- 类别: EXPERIENCE_THRESHOLDS
- 建议字段: `EXPERIENCE_THRESHOLD__3_`
- 替换为: `{{dynamic_fields.EXPERIENCE_THRESHOLD__3_}}`
- 原文: requirements: ["核心团队完整", "相关经验≥3年", "执行能力验证"]

### modules/01-LNST/LNST-Methodology.md

**行 100**: `100M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_100M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_100M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 100**: `10M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 100**: `1M`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_1M`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_1M}}`
- 原文: requirements: ["TAM≥$100M", "SAM≥$10M", "SOM≥$1M", "竞争分析完整"]

**行 110**: `≥3年`
- 类别: EXPERIENCE_THRESHOLDS
- 建议字段: `EXPERIENCE_THRESHOLD__3_`
- 替换为: `{{dynamic_fields.EXPERIENCE_THRESHOLD__3_}}`
- 原文: requirements: ["核心团队完整", "相关经验≥3年", "执行能力验证"]

### modules/07-Implementation/Implementation-Deployment.md

**行 55**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: duration: "1-2天"

**行 61**: `2-3`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_2_3`
- 替换为: `{{dynamic_fields.TIME_BUDGET_2_3}}`
- 原文: duration: "2-3天"

**行 67**: `1-2`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_1_2`
- 替换为: `{{dynamic_fields.TIME_BUDGET_1_2}}`
- 原文: duration: "1-2天"

**行 90**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: mvp_delivery_time: "≤24小时"

### modules/07-Implementation/Implementation-BestPractices.md

**行 58**: `20%`
- 类别: SUCCESS_THRESHOLDS
- 建议字段: `SUCCESS_THRESHOLD_20_`
- 替换为: `{{dynamic_fields.SUCCESS_THRESHOLD_20_}}`
- 原文: - **应急预算管理**：预留15-20%应急预算应对突发需求

### modules/05-MATB/MATB-AgentSyntax.md

**行 132**: `10K`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10K`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10K}}`
- 原文: ├─ IF(revenue > $10K) → [TX] A轮融资 ::funding::(团队)-[申请]->{A轮投资} @fundraising_agent

**行 133**: `10K`
- 类别: FINANCIAL_THRESHOLDS
- 建议字段: `FINANCIAL_THRESHOLD_10K`
- 替换为: `{{dynamic_fields.FINANCIAL_THRESHOLD_10K}}`
- 原文: ├─ IF(revenue < $10K) → [TX] 种子轮融资 ::funding::(团队)-[申请]->{种子投资} @fundraising_agent

### modules/05-MATB/MATB-ConversionEngine.md

**行 54**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | **HTx→ATr** | 人类自然语言 | ASCII树形结构 | 400T | ≥95% | 需求分析、架构设计 |

**行 55**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: | **ATr→MDT** | ASCII树形结构 | Markdown表格 | 300T | ≥98% | 文档生成、数据展示 |

**行 56**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | **HTx→MDT** | 人类自然语言 | Markdown表格 | 500T | ≥90% | 快速文档化 |

**行 57**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | **MDT-NQd** | Markdown表格 | N-Quads语义 | 600T | ≥95% | 智能体通信 |

### modules/02-HMNM/HMNM-Documents.md

**行 20**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: A[需求] -->|200T| B[BLUEPRINT]

**行 21**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: B -->|150T| C[ROOT]

**行 22**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: C -->|100T| D[META]

**行 23**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: D -->|50T| E[部署]

**行 26**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: F[新人] -->|100T| G[README]

**行 27**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: G -->|200T| H[QUICKLAUNCH]

**行 28**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: H -->|300T| I[MVP运行]

**行 31**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: I -->|50T| J[WINSHEET]

**行 32**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: J -->|100T| K[CHEATSHEET]

**行 33**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: K -->|150T| B

### modules/02-HMNM/HMNM-Collaboration.md

**行 13**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | **体系设计流** | 500T | 4小时内 | 架构图完成 | 模板化决策树 |

**行 14**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **战略执行流** | 800T | 24小时内 | MVP存活 | 缓存常用路径 |

**行 15**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: | **反馈强化流** | 300T | 实时 | 问题解决率≥85% | 增量学习优化 |

**行 22**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: A[需求] -->|200T| B[BLUEPRINT]

**行 23**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: B -->|150T| C[ROOT]

**行 24**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: C -->|100T| D[META]

**行 25**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: D -->|50T| E[部署]

**行 28**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: F[新人] -->|100T| G[README]

**行 29**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: G -->|200T| H[QUICKLAUNCH]

**行 30**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: H -->|300T| I[MVP运行]

**行 33**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: I -->|50T| J[WINSHEET]

**行 34**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: J -->|100T| K[CHEATSHEET]

**行 35**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: K -->|150T| B

**行 81**: `4`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_4`
- 替换为: `{{dynamic_fields.TIME_BUDGET_4}}`
- 原文: - **响应时间**: 关键决策响应 ≤ 4小时

**行 83**: `24`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_24`
- 替换为: `{{dynamic_fields.TIME_BUDGET_24}}`
- 原文: - **迭代速度**: MVP迭代周期 ≤ 24小时

### modules/02-HMNM/HMNM-NeuralFlow.md

**行 13**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: | **BLUEPRINT.md** | 神经体系架构设计 | ≤800T | 90%:10% | 低频(体系变革) | 技术可行性验证 |

**行 14**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: | **ROOT.md** | 核心业务路径指令 | ≤600T | 80%:20% | 中高频(需求变更) | 战略优先级制定 |

**行 15**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: | **META.md** | 机器可执行配置 | ≤400T | 30%:70% | 实时(配置更新) | 自动化部署 |

**行 16**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: | **QUICKLAUNCH.md** | 24小时极速启动 | ≤500T | 70%:30% | 极低频(稳定冻结) | 首日MVP存活 |

**行 17**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: | **README.md** | 项目总览导航 | ≤300T | 80%:20% | 中频(新增文档) | 认知地图建立 |

**行 18**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: | **CHEATSHEET.md** | 高频问题速查 | ≤200T | 70%:30% | 高频(随用随增) | 5倍效率问题解决 |

**行 19**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: | **WINSHEET.md** | 每日胜利记录 | ≤150T | 50%:50% | 每日更新 | 士气强化循环 |

**行 54**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: A[需求] -->|200T| B[BLUEPRINT]

**行 55**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: B -->|150T| C[ROOT]

**行 56**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: C -->|100T| D[META]

**行 57**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: D -->|50T| E[部署]

**行 60**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: F[新人] -->|100T| G[README]

**行 61**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: G -->|200T| H[QUICKLAUNCH]

**行 62**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: H -->|300T| I[MVP运行]

**行 65**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: I -->|50T| J[WINSHEET]

**行 66**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: J -->|100T| K[CHEATSHEET]

**行 67**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: K -->|150T| B

**行 101**: `800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_800T}}`
- 原文: blueprint: 800T  # 40%

**行 102**: `600T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_600T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_600T}}`
- 原文: root: 600T       # 30%

**行 103**: `400T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_400T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_400T}}`
- 原文: meta: 400T       # 20%

**行 104**: `1800T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1800T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1800T}}`
- 原文: total: 1800T     # 90%

**行 107**: `500T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_500T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_500T}}`
- 原文: quicklaunch: 500T # 50%

**行 108**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: readme: 300T     # 30%

**行 109**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: cheatsheet: 200T # 20%

**行 110**: `1000T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_1000T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_1000T}}`
- 原文: total: 1000T     # 50%

**行 113**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: winsheet: 150T   # 100%

**行 114**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: total: 150T      # 7.5%

**行 130**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: | Token流转速度 | ≥100T/小时 | 实时 | <80T/小时 |

**行 130**: `80T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_80T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_80T}}`
- 原文: | Token流转速度 | ≥100T/小时 | 实时 | <80T/小时 |

**行 131**: `5`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_5`
- 替换为: `{{dynamic_fields.TIME_BUDGET_5}}`
- 原文: | 文档同步延迟 | ≤5分钟 | 实时 | >10分钟 |

**行 131**: `10`
- 类别: TIME_BUDGETS
- 建议字段: `TIME_BUDGET_10`
- 替换为: `{{dynamic_fields.TIME_BUDGET_10}}`
- 原文: | 文档同步延迟 | ≤5分钟 | 实时 | >10分钟 |

### modules/02-HMNM/HMNM-Architecture.md

**行 67**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: A[需求] -->|200T| B[BLUEPRINT]

**行 68**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: B -->|150T| C[ROOT]

**行 69**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: C -->|100T| D[META]

**行 70**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: D -->|50T| E[部署]

**行 73**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: F[新人] -->|100T| G[README]

**行 74**: `200T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_200T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_200T}}`
- 原文: G -->|200T| H[QUICKLAUNCH]

**行 75**: `300T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_300T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_300T}}`
- 原文: H -->|300T| I[MVP运行]

**行 78**: `50T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_50T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_50T}}`
- 原文: I -->|50T| J[WINSHEET]

**行 79**: `100T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_100T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_100T}}`
- 原文: J -->|100T| K[CHEATSHEET]

**行 80**: `150T`
- 类别: TOKEN_BUDGETS
- 建议字段: `TOKEN_BUDGET_150T`
- 替换为: `{{dynamic_fields.TOKEN_BUDGET_150T}}`
- 原文: K -->|150T| B

## 建议添加的字段配置

```yaml
dynamic_fields:
  EXPERIENCE_THRESHOLDS:
    EXPERIENCE_THRESHOLD__3_:
      ai_collaboration: L0
      description: 配置参数：≥3年
      en-US: ≥3年 Configuration
      example: ≥3年
      priority: P1
      startup_phase: development
      tags:
      - experience-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: EXPERIENCE_THRESHOLD__3__001
      type: threshold
      value_chain_position: solution_design
      zh-CN: ≥3年配置
  FINANCIAL_THRESHOLDS:
    FINANCIAL_THRESHOLD_100K:
      ai_collaboration: L0
      description: 配置参数：100K
      en-US: 100K Configuration
      example: 100K
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_100K_001
      type: string
      value_chain_position: solution_design
      zh-CN: 100K配置
    FINANCIAL_THRESHOLD_100M:
      ai_collaboration: L0
      description: 配置参数：100M
      en-US: 100M Configuration
      example: 100M
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_100M_001
      type: string
      value_chain_position: solution_design
      zh-CN: 100M配置
    FINANCIAL_THRESHOLD_10K:
      ai_collaboration: L0
      description: 配置参数：10K
      en-US: 10K Configuration
      example: 10K
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_10K_001
      type: string
      value_chain_position: solution_design
      zh-CN: 10K配置
    FINANCIAL_THRESHOLD_10M:
      ai_collaboration: L0
      description: 配置参数：10M
      en-US: 10M Configuration
      example: 10M
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_10M_001
      type: string
      value_chain_position: solution_design
      zh-CN: 10M配置
    FINANCIAL_THRESHOLD_1M:
      ai_collaboration: L0
      description: 配置参数：1M
      en-US: 1M Configuration
      example: 1M
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_1M_001
      type: string
      value_chain_position: solution_design
      zh-CN: 1M配置
    FINANCIAL_THRESHOLD_50:
      ai_collaboration: L0
      description: 配置参数：50
      en-US: 50 Configuration
      example: '50'
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_50_001
      type: string
      value_chain_position: solution_design
      zh-CN: 50配置
    FINANCIAL_THRESHOLD_50_000:
      ai_collaboration: L0
      description: 配置参数：50,000
      en-US: 50,000 Configuration
      example: 50,000
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_50_000_001
      type: string
      value_chain_position: solution_design
      zh-CN: 50,000配置
    FINANCIAL_THRESHOLD_85K:
      ai_collaboration: L0
      description: 配置参数：85K
      en-US: 85K Configuration
      example: 85K
      priority: P1
      startup_phase: development
      tags:
      - financial-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: FINANCIAL_THRESHOLD_85K_001
      type: string
      value_chain_position: solution_design
      zh-CN: 85K配置
  PERFORMANCE_METRICS:
    PERFORMANCE_METRIC__1_:
      ai_collaboration: L0
      description: 配置参数：≤1秒
      en-US: ≤1秒 Configuration
      example: ≤1秒
      priority: P1
      startup_phase: development
      tags:
      - performance-metrics
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: PERFORMANCE_METRIC__1__001
      type: threshold
      value_chain_position: solution_design
      zh-CN: ≤1秒配置
    PERFORMANCE_METRIC__2_:
      ai_collaboration: L0
      description: 配置参数：≤2秒
      en-US: ≤2秒 Configuration
      example: ≤2秒
      priority: P1
      startup_phase: development
      tags:
      - performance-metrics
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: PERFORMANCE_METRIC__2__001
      type: threshold
      value_chain_position: solution_design
      zh-CN: ≤2秒配置
  QUANTITY_THRESHOLDS:
    QUANTITY_THRESHOLD__20_:
      ai_collaboration: L0
      description: 配置参数：≥20个
      en-US: ≥20个 Configuration
      example: ≥20个
      priority: P1
      startup_phase: development
      tags:
      - quantity-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: QUANTITY_THRESHOLD__20__001
      type: threshold
      value_chain_position: solution_design
      zh-CN: ≥20个配置
  SUCCESS_THRESHOLDS:
    SUCCESS_THRESHOLD_20_:
      ai_collaboration: L0
      description: 配置参数：20%
      en-US: 20% Configuration
      example: 20%
      priority: P1
      startup_phase: development
      tags:
      - success-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: SUCCESS_THRESHOLD_20__001
      type: percentage
      value_chain_position: solution_design
      zh-CN: 20%配置
    SUCCESS_THRESHOLD_30_:
      ai_collaboration: L0
      description: 配置参数：30%
      en-US: 30% Configuration
      example: 30%
      priority: P1
      startup_phase: development
      tags:
      - success-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: SUCCESS_THRESHOLD_30__001
      type: percentage
      value_chain_position: solution_design
      zh-CN: 30%配置
    SUCCESS_THRESHOLD_40_:
      ai_collaboration: L0
      description: 配置参数：40%
      en-US: 40% Configuration
      example: 40%
      priority: P1
      startup_phase: development
      tags:
      - success-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: SUCCESS_THRESHOLD_40__001
      type: percentage
      value_chain_position: solution_design
      zh-CN: 40%配置
    SUCCESS_THRESHOLD_45_:
      ai_collaboration: L0
      description: 配置参数：45%
      en-US: 45% Configuration
      example: 45%
      priority: P1
      startup_phase: development
      tags:
      - success-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: SUCCESS_THRESHOLD_45__001
      type: percentage
      value_chain_position: solution_design
      zh-CN: 45%配置
    SUCCESS_THRESHOLD_50_:
      ai_collaboration: L0
      description: 配置参数：50%
      en-US: 50% Configuration
      example: 50%
      priority: P1
      startup_phase: development
      tags:
      - success-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: SUCCESS_THRESHOLD_50__001
      type: percentage
      value_chain_position: solution_design
      zh-CN: 50%配置
    SUCCESS_THRESHOLD_80_:
      ai_collaboration: L0
      description: 配置参数：80%
      en-US: 80% Configuration
      example: 80%
      priority: P1
      startup_phase: development
      tags:
      - success-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: SUCCESS_THRESHOLD_80__001
      type: percentage
      value_chain_position: solution_design
      zh-CN: 80%配置
    SUCCESS_THRESHOLD_95_:
      ai_collaboration: L0
      description: 配置参数：95%
      en-US: 95% Configuration
      example: 95%
      priority: P1
      startup_phase: development
      tags:
      - success-thresholds
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: SUCCESS_THRESHOLD_95__001
      type: percentage
      value_chain_position: solution_design
      zh-CN: 95%配置
  TIME_BUDGETS:
    TIME_BUDGET_1:
      ai_collaboration: L0
      description: 配置参数：1
      en-US: 1 Configuration
      example: '1'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_1_001
      type: string
      value_chain_position: solution_design
      zh-CN: 1配置
    TIME_BUDGET_10:
      ai_collaboration: L0
      description: 配置参数：10
      en-US: 10 Configuration
      example: '10'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_10_001
      type: string
      value_chain_position: solution_design
      zh-CN: 10配置
    TIME_BUDGET_12:
      ai_collaboration: L0
      description: 配置参数：12
      en-US: 12 Configuration
      example: '12'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_12_001
      type: string
      value_chain_position: solution_design
      zh-CN: 12配置
    TIME_BUDGET_18:
      ai_collaboration: L0
      description: 配置参数：18
      en-US: 18 Configuration
      example: '18'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_18_001
      type: string
      value_chain_position: solution_design
      zh-CN: 18配置
    TIME_BUDGET_1_2:
      ai_collaboration: L0
      description: 配置参数：1-2
      en-US: 1-2 Configuration
      example: 1-2
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_1_2_001
      type: string
      value_chain_position: solution_design
      zh-CN: 1-2配置
    TIME_BUDGET_2:
      ai_collaboration: L0
      description: 配置参数：2
      en-US: 2 Configuration
      example: '2'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_2_001
      type: string
      value_chain_position: solution_design
      zh-CN: 2配置
    TIME_BUDGET_22:
      ai_collaboration: L0
      description: 配置参数：22
      en-US: 22 Configuration
      example: '22'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_22_001
      type: string
      value_chain_position: solution_design
      zh-CN: 22配置
    TIME_BUDGET_24:
      ai_collaboration: L0
      description: 配置参数：24
      en-US: 24 Configuration
      example: '24'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_24_001
      type: string
      value_chain_position: solution_design
      zh-CN: 24配置
    TIME_BUDGET_2_3:
      ai_collaboration: L0
      description: 配置参数：2-3
      en-US: 2-3 Configuration
      example: 2-3
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_2_3_001
      type: string
      value_chain_position: solution_design
      zh-CN: 2-3配置
    TIME_BUDGET_2_4:
      ai_collaboration: L0
      description: 配置参数：2-4
      en-US: 2-4 Configuration
      example: 2-4
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_2_4_001
      type: string
      value_chain_position: solution_design
      zh-CN: 2-4配置
    TIME_BUDGET_30:
      ai_collaboration: L0
      description: 配置参数：30
      en-US: 30 Configuration
      example: '30'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_30_001
      type: string
      value_chain_position: solution_design
      zh-CN: 30配置
    TIME_BUDGET_3_5:
      ai_collaboration: L0
      description: 配置参数：3-5
      en-US: 3-5 Configuration
      example: 3-5
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_3_5_001
      type: string
      value_chain_position: solution_design
      zh-CN: 3-5配置
    TIME_BUDGET_4:
      ai_collaboration: L0
      description: 配置参数：4
      en-US: 4 Configuration
      example: '4'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_4_001
      type: string
      value_chain_position: solution_design
      zh-CN: 4配置
    TIME_BUDGET_4_6:
      ai_collaboration: L0
      description: 配置参数：4-6
      en-US: 4-6 Configuration
      example: 4-6
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_4_6_001
      type: string
      value_chain_position: solution_design
      zh-CN: 4-6配置
    TIME_BUDGET_4_8:
      ai_collaboration: L0
      description: 配置参数：4-8
      en-US: 4-8 Configuration
      example: 4-8
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_4_8_001
      type: string
      value_chain_position: solution_design
      zh-CN: 4-8配置
    TIME_BUDGET_5:
      ai_collaboration: L0
      description: 配置参数：5
      en-US: 5 Configuration
      example: '5'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_5_001
      type: string
      value_chain_position: solution_design
      zh-CN: 5配置
    TIME_BUDGET_6:
      ai_collaboration: L0
      description: 配置参数：6
      en-US: 6 Configuration
      example: '6'
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_6_001
      type: string
      value_chain_position: solution_design
      zh-CN: 6配置
    TIME_BUDGET_6_10:
      ai_collaboration: L0
      description: 配置参数：6-10
      en-US: 6-10 Configuration
      example: 6-10
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_6_10_001
      type: string
      value_chain_position: solution_design
      zh-CN: 6-10配置
    TIME_BUDGET_8_12:
      ai_collaboration: L0
      description: 配置参数：8-12
      en-US: 8-12 Configuration
      example: 8-12
      priority: P1
      startup_phase: development
      tags:
      - time-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TIME_BUDGET_8_12_001
      type: string
      value_chain_position: solution_design
      zh-CN: 8-12配置
  TOKEN_BUDGETS:
    TOKEN_BUDGET_10000T:
      ai_collaboration: L0
      description: 配置参数：10000T
      en-US: 10000T Configuration
      example: 10000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_10000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 10000T配置
    TOKEN_BUDGET_1000T:
      ai_collaboration: L0
      description: 配置参数：1000T
      en-US: 1000T Configuration
      example: 1000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_1000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 1000T配置
    TOKEN_BUDGET_100T:
      ai_collaboration: L0
      description: 配置参数：100T
      en-US: 100T Configuration
      example: 100T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_100T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 100T配置
    TOKEN_BUDGET_12000T:
      ai_collaboration: L0
      description: 配置参数：12000T
      en-US: 12000T Configuration
      example: 12000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_12000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 12000T配置
    TOKEN_BUDGET_1200T:
      ai_collaboration: L0
      description: 配置参数：1200T
      en-US: 1200T Configuration
      example: 1200T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_1200T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 1200T配置
    TOKEN_BUDGET_15000T:
      ai_collaboration: L0
      description: 配置参数：15000T
      en-US: 15000T Configuration
      example: 15000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_15000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 15000T配置
    TOKEN_BUDGET_1500T:
      ai_collaboration: L0
      description: 配置参数：1500T
      en-US: 1500T Configuration
      example: 1500T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_1500T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 1500T配置
    TOKEN_BUDGET_150T:
      ai_collaboration: L0
      description: 配置参数：150T
      en-US: 150T Configuration
      example: 150T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_150T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 150T配置
    TOKEN_BUDGET_1800T:
      ai_collaboration: L0
      description: 配置参数：1800T
      en-US: 1800T Configuration
      example: 1800T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_1800T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 1800T配置
    TOKEN_BUDGET_2000T:
      ai_collaboration: L0
      description: 配置参数：2000T
      en-US: 2000T Configuration
      example: 2000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_2000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 2000T配置
    TOKEN_BUDGET_200T:
      ai_collaboration: L0
      description: 配置参数：200T
      en-US: 200T Configuration
      example: 200T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_200T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 200T配置
    TOKEN_BUDGET_2500T:
      ai_collaboration: L0
      description: 配置参数：2500T
      en-US: 2500T Configuration
      example: 2500T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_2500T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 2500T配置
    TOKEN_BUDGET_250T:
      ai_collaboration: L0
      description: 配置参数：250T
      en-US: 250T Configuration
      example: 250T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_250T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 250T配置
    TOKEN_BUDGET_3000T:
      ai_collaboration: L0
      description: 配置参数：3000T
      en-US: 3000T Configuration
      example: 3000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_3000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 3000T配置
    TOKEN_BUDGET_300T:
      ai_collaboration: L0
      description: 配置参数：300T
      en-US: 300T Configuration
      example: 300T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_300T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 300T配置
    TOKEN_BUDGET_3500T:
      ai_collaboration: L0
      description: 配置参数：3500T
      en-US: 3500T Configuration
      example: 3500T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_3500T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 3500T配置
    TOKEN_BUDGET_4000T:
      ai_collaboration: L0
      description: 配置参数：4000T
      en-US: 4000T Configuration
      example: 4000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_4000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 4000T配置
    TOKEN_BUDGET_400T:
      ai_collaboration: L0
      description: 配置参数：400T
      en-US: 400T Configuration
      example: 400T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_400T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 400T配置
    TOKEN_BUDGET_5000T:
      ai_collaboration: L0
      description: 配置参数：5000T
      en-US: 5000T Configuration
      example: 5000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_5000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 5000T配置
    TOKEN_BUDGET_500T:
      ai_collaboration: L0
      description: 配置参数：500T
      en-US: 500T Configuration
      example: 500T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_500T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 500T配置
    TOKEN_BUDGET_50T:
      ai_collaboration: L0
      description: 配置参数：50T
      en-US: 50T Configuration
      example: 50T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_50T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 50T配置
    TOKEN_BUDGET_5200T:
      ai_collaboration: L0
      description: 配置参数：5200T
      en-US: 5200T Configuration
      example: 5200T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_5200T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 5200T配置
    TOKEN_BUDGET_53000T:
      ai_collaboration: L0
      description: 配置参数：53000T
      en-US: 53000T Configuration
      example: 53000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_53000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 53000T配置
    TOKEN_BUDGET_600T:
      ai_collaboration: L0
      description: 配置参数：600T
      en-US: 600T Configuration
      example: 600T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_600T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 600T配置
    TOKEN_BUDGET_700T:
      ai_collaboration: L0
      description: 配置参数：700T
      en-US: 700T Configuration
      example: 700T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_700T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 700T配置
    TOKEN_BUDGET_8000T:
      ai_collaboration: L0
      description: 配置参数：8000T
      en-US: 8000T Configuration
      example: 8000T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_8000T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 8000T配置
    TOKEN_BUDGET_800T:
      ai_collaboration: L0
      description: 配置参数：800T
      en-US: 800T Configuration
      example: 800T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_800T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 800T配置
    TOKEN_BUDGET_80T:
      ai_collaboration: L0
      description: 配置参数：80T
      en-US: 80T Configuration
      example: 80T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_80T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 80T配置
    TOKEN_BUDGET_900T:
      ai_collaboration: L0
      description: 配置参数：900T
      en-US: 900T Configuration
      example: 900T
      priority: P1
      startup_phase: development
      tags:
      - token-budgets
      template_reusability:
        is_reusable: true
        reuse_contexts:
        - 配置管理
        - 参数控制
        template_id: TOKEN_BUDGET_900T_001
      type: token_budget
      value_chain_position: solution_design
      zh-CN: 900T配置

```
