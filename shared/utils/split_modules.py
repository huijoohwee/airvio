#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CORE-LNST.md 模块化拆分脚本
自动将原始文档按照模块划分拆分为多个文件
"""

import os
import re
from pathlib import Path

def create_module_structure():
    """创建模块目录结构"""
    base_path = Path('.')
    
    # 创建主要目录
    directories = [
        'modules/01-LNST',
        'modules/02-HMNM', 
        'modules/03-MAOS',
        'modules/04-GSTR',
        'modules/05-MATB',
        'modules/06-Integration',
        'modules/07-Implementation',
        'modules/08-Reference',
        'shared/templates',
        'shared/schemas',
        'docs'
    ]
    
    for directory in directories:
        (base_path / directory).mkdir(parents=True, exist_ok=True)
        print(f"✅ 创建目录: {directory}")

def split_content():
    """拆分原始文档内容"""
    
    # 读取原始文档
    with open('CORE-LNST.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 定义章节映射
    section_mapping = {
        # LNST模块
        'modules/01-LNST/LNST-Overview.md': {
            'title': '# LNST 精益创业概览',
            'sections': ['## 1 LNST - 精益创业核心层']
        },
        'modules/01-LNST/LNST-Methodology.md': {
            'title': '# LNST 精益创业方法论',
            'sections': ['### 1.1 精益创业方法论集成']
        },
        'modules/01-LNST/LNST-Phases.md': {
            'title': '# LNST 创业五阶段',
            'sections': ['#### 1.1.2 创业五阶段价值链']
        },
        'modules/01-LNST/LNST-InvestorReadiness.md': {
            'title': '# LNST 投资人就绪度框架',
            'sections': ['### 1.2 投资人就绪度框架']
        },
        
        # HMNM模块
        'modules/02-HMNM/HMNM-Architecture.md': {
            'title': '# HMNM 神经网络架构',
            'sections': ['## 2 HMNM - 人机神经元体系层']
        },
        'modules/02-HMNM/HMNM-Documents.md': {
            'title': '# HMNM 七份核心文档',
            'sections': ['#### 2.1.1 七份核心文档架构']
        },
        
        # MAOS模块
        'modules/03-MAOS/MAOS-Architecture.md': {
            'title': '# MAOS 智能体编排架构',
            'sections': ['## 3 MAOS - 智能体编排系统层']
        },
        
        # GSTR模块
        'modules/04-GSTR/GSTR-Framework.md': {
            'title': '# GSTR 四元融合体系',
            'sections': ['## 4 GSTR - 目标-空间-时间-资本体系层']
        },
        
        # MATB模块
        'modules/05-MATB/MATB-ConversionEngine.md': {
            'title': '# MATB 转换引擎',
            'sections': ['## 5. MATB - Markdown-ASCII树形桥接层']
        },
        
        # Integration模块
        'modules/06-Integration/Integration-ValueFlow.md': {
            'title': '# 五层价值流集成',
            'sections': ['## 6 统筹中枢集成优化']
        },
        
        # Implementation模块
        'modules/07-Implementation/Implementation-Deployment.md': {
            'title': '# 部署实施指南',
            'sections': ['## 7 实施指南与监控']
        },
        
        # Reference模块
        'modules/08-Reference/Reference-Glossary.md': {
            'title': '# 术语词典',
            'sections': ['### 9.1 术语词典']
        }
    }
    
    print("📝 开始拆分文档内容...")
    
    # 提取和保存各个模块
    for file_path, config in section_mapping.items():
        module_content = extract_section_content(content, config['sections'])
        
        # 添加模块头部
        full_content = f"{config['title']}\n\n{module_content}"
        
        # 保存文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(full_content)
        
        print(f"✅ 创建模块: {file_path}")

def extract_section_content(content, section_headers):
    """提取指定章节的内容"""
    # 这里简化处理，实际需要更复杂的解析逻辑
    for header in section_headers:
        start_pos = content.find(header)
        if start_pos != -1:
            # 找到下一个同级标题作为结束位置
            next_header_pos = find_next_header(content, start_pos + len(header))
            if next_header_pos != -1:
                return content[start_pos:next_header_pos].strip()
            else:
                return content[start_pos:].strip()
    return "# 待补充内容\n\n> 此模块内容需要从原始文档中提取"

def find_next_header(content, start_pos):
    """查找下一个同级标题位置"""
    lines = content[start_pos:].split('\n')
    for i, line in enumerate(lines):
        if line.startswith('## ') and not line.startswith('### '):
            return start_pos + sum(len(l) + 1 for l in lines[:i])
    return -1

def create_index_files():
    """创建索引文件"""
    
    # 创建模块索引
    module_index = """
# 模块索引

## 核心模块

### 01-LNST 精益创业核心层
- [LNST-Overview.md](../modules/01-LNST/LNST-Overview.md) - 精益创业概览
- [LNST-Methodology.md](../modules/01-LNST/LNST-Methodology.md) - 方法论与循环
- [LNST-Phases.md](../modules/01-LNST/LNST-Phases.md) - 五阶段价值链
- [LNST-InvestorReadiness.md](../modules/01-LNST/LNST-InvestorReadiness.md) - 投资人就绪度框架

### 02-HMNM 人机神经元体系层
- [HMNM-Architecture.md](../modules/02-HMNM/HMNM-Architecture.md) - 神经网络文档体系
- [HMNM-Documents.md](../modules/02-HMNM/HMNM-Documents.md) - 七份核心文档
- [HMNM-NeuralFlow.md](../modules/02-HMNM/HMNM-NeuralFlow.md) - 神经流优化
- [HMNM-Collaboration.md](../modules/02-HMNM/HMNM-Collaboration.md) - 人机协作回路

### 03-MAOS 智能体编排系统层
- [MAOS-Architecture.md](../modules/03-MAOS/MAOS-Architecture.md) - 多智能体架构
- [MAOS-Agents.md](../modules/03-MAOS/MAOS-Agents.md) - 六类核心智能体
- [MAOS-Orchestration.md](../modules/03-MAOS/MAOS-Orchestration.md) - 编排机制
- [MAOS-StartupIntegration.md](../modules/03-MAOS/MAOS-StartupIntegration.md) - 精益创业集成

### 04-GSTR 四元体系层
- [GSTR-Framework.md](../modules/04-GSTR/GSTR-Framework.md) - 四元融合体系
- [GSTR-Dimensions.md](../modules/04-GSTR/GSTR-Dimensions.md) - 四维度架构
- [GSTR-OODA.md](../modules/04-GSTR/GSTR-OODA.md) - OODA循环适配
- [GSTR-Integration.md](../modules/04-GSTR/GSTR-Integration.md) - MAOS集成优化

### 05-MATB 树形桥接层
- [MATB-ConversionEngine.md](../modules/05-MATB/MATB-ConversionEngine.md) - 转换引擎
- [MATB-SemanticMapping.md](../modules/05-MATB/MATB-SemanticMapping.md) - 语义映射
- [MATB-AgentSyntax.md](../modules/05-MATB/MATB-AgentSyntax.md) - 智能体语法
- [MATB-Visualization.md](../modules/05-MATB/MATB-Visualization.md) - 可视化输出

## 集成与实施

### 06-Integration 集成优化
- [Integration-ValueFlow.md](../modules/06-Integration/Integration-ValueFlow.md) - 五层价值流集成
- [Integration-TokenEconomy.md](../modules/06-Integration/Integration-TokenEconomy.md) - Token经济性优化
- [Integration-MVPFlow.md](../modules/06-Integration/Integration-MVPFlow.md) - 24小时MVP流程
- [Integration-Assessment.md](../modules/06-Integration/Integration-Assessment.md) - 投资人就绪度评估

### 07-Implementation 实施指南
- [Implementation-Deployment.md](../modules/07-Implementation/Implementation-Deployment.md) - 部署实施路径
- [Implementation-Monitoring.md](../modules/07-Implementation/Implementation-Monitoring.md) - 监控与优化
- [Implementation-RiskControl.md](../modules/07-Implementation/Implementation-RiskControl.md) - 风险控制
- [Implementation-BestPractices.md](../modules/07-Implementation/Implementation-BestPractices.md) - 最佳实践

### 08-Reference 参考资料
- [Reference-Glossary.md](../modules/08-Reference/Reference-Glossary.md) - 术语词典
- [Reference-Templates.md](../modules/08-Reference/Reference-Templates.md) - 配置模板
- [Reference-Checklists.md](../modules/08-Reference/Reference-Checklists.md) - 快速参考卡片
- [Reference-Cases.md](../modules/08-Reference/Reference-Cases.md) - 成功案例

## 模块依赖关系

```mermaid
flowchart TD
    A[LNST] --> B[HMNM]
    A --> C[GSTR]
    B --> D[MAOS]
    C --> D
    D --> E[MATB]
    
    F[Integration] --> A
    F --> B
    F --> C
    F --> D
    F --> E
    
    G[Implementation] --> F
    H[Reference] --> G
```
"""
    
    with open('docs/module-index.md', 'w', encoding='utf-8') as f:
        f.write(module_index)
    
    print("✅ 创建模块索引: docs/module-index.md")

def main():
    """主函数"""
    print("🚀 开始执行CORE-LNST.md模块化方案...")
    
    # 1. 创建目录结构
    create_module_structure()
    
    # 2. 拆分文档内容
    split_content()
    
    # 3. 创建索引文件
    create_index_files()
    
    # 4. 备份原始文档
    os.rename('CORE-LNST.md', 'CORE-LNST-LEGACY.md')
    print("✅ 原始文档备份为: CORE-LNST-LEGACY.md")
    
    print("\n🎉 模块化方案执行完成！")
    print("\n📋 后续步骤:")
    print("1. 检查各模块文件内容")
    print("2. 完善模块间引用关系")
    print("3. 更新共享字段池")
    print("4. 测试模块集成")

if __name__ == '__main__':
    main()