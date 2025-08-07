#!/usr/bin/env python3
"""
AIRVIO 字段自动修复工具 - 增强版
自动检测硬编码数值并将缺失的配置参数填入 fields-s1in 相应文件
"""

import os
import re
import yaml
from pathlib import Path
from typing import Dict, List, Tuple, Any
from datetime import datetime

class FieldAutoFixerEnhanced:
    def __init__(self, modules_dir: str, fields_s1in_dir: str):
        self.modules_dir = Path(modules_dir)
        self.fields_s1in_dir = Path(fields_s1in_dir)
        self.hardcoded_patterns = self._define_hardcoded_patterns()
        
        # 定义字段分类到文件的映射
        self.category_to_file_mapping = {
            'TIME_BUDGETS': 'core-p0.yaml',
            'SUCCESS_THRESHOLDS': 'metrics.yaml',
            'HUMAN_AI_RATIOS': 'hmnm.yaml',
            'TOKEN_BUDGETS': 'core-p0.yaml',
            'FINANCIAL_THRESHOLDS': 'maos-p1.yaml',
            'QUANTITY_THRESHOLDS': 'metrics.yaml',
            'EXPERIENCE_THRESHOLDS': 'quality.yaml',
            'PERFORMANCE_METRICS': 'metrics.yaml',
        }
        
    def _define_hardcoded_patterns(self) -> List[Tuple[str, str]]:
        """定义硬编码数值的正则表达式模式"""
        return [
            # 时间模式
            (r'\b(\d+-\d+)周\b', 'TIME_BUDGETS'),
            (r'\b(\d+)小时\b', 'TIME_BUDGETS'),
            (r'\b(\d+-\d+)天\b', 'TIME_BUDGETS'),
            (r'\b(\d+)分钟\b', 'TIME_BUDGETS'),
            
            # 百分比模式
            (r'\b(≥\d+%)\b', 'SUCCESS_THRESHOLDS'),
            (r'\b(≤\d+%)\b', 'SUCCESS_THRESHOLDS'),
            (r'\b(\d+%:\d+%)\b', 'HUMAN_AI_RATIOS'),
            (r'\b(\d+%)\b', 'SUCCESS_THRESHOLDS'),
            
            # Token预算模式
            (r'\b(\d+T)\b', 'TOKEN_BUDGETS'),
            
            # 金额模式
            (r'\$([\d,]+[KMB]?)\b', 'FINANCIAL_THRESHOLDS'),
            
            # 数量模式
            (r'\b(≥\d+个)\b', 'QUANTITY_THRESHOLDS'),
            (r'\b(≥\d+年)\b', 'EXPERIENCE_THRESHOLDS'),
            (r'\b(≤\d+秒)\b', 'PERFORMANCE_METRICS'),
        ]
    
    def scan_hardcoded_values(self) -> Dict[str, List[Dict]]:
        """扫描所有模块文件中的硬编码数值"""
        hardcoded_findings = {}
        
        for md_file in self.modules_dir.rglob('*.md'):
            findings = self._scan_file(md_file)
            if findings:
                hardcoded_findings[str(md_file)] = findings
                
        return hardcoded_findings
    
    def _scan_file(self, file_path: Path) -> List[Dict]:
        """扫描单个文件中的硬编码数值"""
        findings = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')
                
            for line_num, line in enumerate(lines, 1):
                for pattern, category in self.hardcoded_patterns:
                    matches = re.finditer(pattern, line)
                    for match in matches:
                        value = match.group(1) if match.groups() else match.group(0)
                        
                        # 检查是否已经是动态字段引用
                        if '{{dynamic_fields.' in line:
                            continue
                            
                        finding = {
                            'line_number': line_num,
                            'line_content': line.strip(),
                            'hardcoded_value': value,
                            'category': category,
                            'suggested_field': self._suggest_field_name(value, category),
                            'target_file': self.category_to_file_mapping.get(category, 'core-p0.yaml')
                        }
                        findings.append(finding)
                        
        except Exception as e:
            print(f"Error scanning {file_path}: {e}")
            
        return findings
    
    def _suggest_field_name(self, value: str, category: str) -> str:
        """为硬编码值建议字段名称"""
        # 清理值中的特殊字符
        clean_value = re.sub(r'[^a-zA-Z0-9]', '_', value.upper())
        
        field_mapping = {
            'TIME_BUDGETS': f'TIME_BUDGET_{clean_value}',
            'SUCCESS_THRESHOLDS': f'SUCCESS_THRESHOLD_{clean_value}',
            'HUMAN_AI_RATIOS': f'HUMAN_AI_RATIO_{clean_value}',
            'TOKEN_BUDGETS': f'TOKEN_BUDGET_{clean_value}',
            'FINANCIAL_THRESHOLDS': f'FINANCIAL_THRESHOLD_{clean_value}',
            'QUANTITY_THRESHOLDS': f'QUANTITY_THRESHOLD_{clean_value}',
            'EXPERIENCE_THRESHOLDS': f'EXPERIENCE_THRESHOLD_{clean_value}',
            'PERFORMANCE_METRICS': f'PERFORMANCE_METRIC_{clean_value}',
        }
        
        return field_mapping.get(category, f'CUSTOM_FIELD_{clean_value}')
    
    def _determine_field_type(self, value: str) -> str:
        """根据值确定字段类型"""
        if '%' in value:
            return 'percentage'
        elif 'T' in value:
            return 'token_budget'
        elif '$' in value:
            return 'currency'
        elif '小时' in value or '天' in value or '周' in value:
            return 'duration'
        elif '≥' in value or '≤' in value:
            return 'threshold'
        else:
            return 'string'
    
    def _create_field_config(self, finding: Dict) -> Dict[str, Any]:
        """为发现的硬编码值创建字段配置"""
        value = finding['hardcoded_value']
        field_name = finding['suggested_field']
        category = finding['category']
        
        # 根据类别确定优先级和阶段
        priority_mapping = {
            'TIME_BUDGETS': 'P0',
            'TOKEN_BUDGETS': 'P0',
            'SUCCESS_THRESHOLDS': 'P1',
            'FINANCIAL_THRESHOLDS': 'P1',
            'HUMAN_AI_RATIOS': 'P1',
            'QUANTITY_THRESHOLDS': 'P2',
            'EXPERIENCE_THRESHOLDS': 'P2',
            'PERFORMANCE_METRICS': 'P1',
        }
        
        phase_mapping = {
            'TIME_BUDGETS': 'discovery',
            'TOKEN_BUDGETS': 'discovery',
            'SUCCESS_THRESHOLDS': 'validation',
            'FINANCIAL_THRESHOLDS': 'scaling',
            'HUMAN_AI_RATIOS': 'development',
            'QUANTITY_THRESHOLDS': 'validation',
            'EXPERIENCE_THRESHOLDS': 'scaling',
            'PERFORMANCE_METRICS': 'validation',
        }
        
        return {
            field_name: {
                'zh-CN': f'{value}配置',
                'en-US': f'{value} Configuration',
                'description': f'自动检测的配置参数：{value}',
                'type': self._determine_field_type(value),
                'priority': priority_mapping.get(category, 'P2'),
                'ai_collaboration': 'L0',
                'startup_phase': phase_mapping.get(category, 'development'),
                'value_chain_position': 'solution_design',
                'tags': [category.lower().replace('_', '-'), 'auto-detected'],
                'validation': {
                    'rule': f'== "{value}"',
                    'success_criteria': '配置值匹配',
                    'automation_level': 'semi-auto'
                },
                'example': value,
                'template_reusability': {
                    'is_reusable': True,
                    'reuse_contexts': ['配置管理', '参数控制'],
                    'template_id': f'{field_name}_auto_001'
                },
                'auto_generated': {
                    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'source': 'field-auto-fixer-enhanced',
                    'original_value': value
                }
            }
        }
    
    def add_fields_to_files(self, hardcoded_findings: Dict) -> Dict[str, int]:
        """将缺失的字段添加到相应的 YAML 文件中"""
        results = {'files_updated': 0, 'fields_added': 0}
        
        # 按目标文件分组字段
        fields_by_file = {}
        for file_path, findings in hardcoded_findings.items():
            for finding in findings:
                target_file = finding['target_file']
                if target_file not in fields_by_file:
                    fields_by_file[target_file] = []
                fields_by_file[target_file].append(finding)
        
        # 为每个文件添加字段
        for target_file, findings in fields_by_file.items():
            file_path = self.fields_s1in_dir / target_file
            if self._add_fields_to_file(file_path, findings):
                results['files_updated'] += 1
                results['fields_added'] += len(findings)
        
        return results
    
    def _add_fields_to_file(self, file_path: Path, findings: List[Dict]) -> bool:
        """向单个 YAML 文件添加字段"""
        try:
            # 读取现有文件
            if file_path.exists():
                with open(file_path, 'r', encoding='utf-8') as f:
                    existing_data = yaml.safe_load(f) or {}
            else:
                existing_data = {'fields': {}}
            
            # 确保有 fields 键
            if 'fields' not in existing_data:
                existing_data['fields'] = {}
            
            # 添加新字段
            fields_added = 0
            for finding in findings:
                field_config = self._create_field_config(finding)
                field_name = finding['suggested_field']
                
                # 检查字段是否已存在
                if field_name not in existing_data['fields']:
                    existing_data['fields'].update(field_config)
                    fields_added += 1
                    print(f"添加字段 {field_name} 到 {file_path.name}")
            
            if fields_added > 0:
                # 备份原文件
                if file_path.exists():
                    backup_path = file_path.with_suffix(f'.backup.{datetime.now().strftime("%Y%m%d_%H%M%S")}.yaml')
                    file_path.rename(backup_path)
                    print(f"原文件已备份为: {backup_path.name}")
                
                # 写入更新后的文件
                with open(file_path, 'w', encoding='utf-8') as f:
                    yaml.dump(existing_data, f, default_flow_style=False, allow_unicode=True, indent=2)
                
                print(f"已更新 {file_path.name}，添加了 {fields_added} 个字段")
                return True
            
        except Exception as e:
            print(f"Error updating {file_path}: {e}")
            return False
        
        return False
    
    def generate_summary_report(self, hardcoded_findings: Dict, results: Dict) -> str:
        """生成处理结果摘要报告"""
        report = []
        report.append("# AIRVIO 字段自动填入报告\n")
        report.append(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        # 统计信息
        total_files_scanned = len(hardcoded_findings)
        total_hardcoded = sum(len(findings) for findings in hardcoded_findings.values())
        
        report.append(f"## 处理结果\n")
        report.append(f"- 扫描文件数: {total_files_scanned}")
        report.append(f"- 发现硬编码数值: {total_hardcoded}")
        report.append(f"- 更新配置文件数: {results['files_updated']}")
        report.append(f"- 添加字段数: {results['fields_added']}\n")
        
        # 按文件分组显示添加的字段
        fields_by_file = {}
        for file_path, findings in hardcoded_findings.items():
            for finding in findings:
                target_file = finding['target_file']
                if target_file not in fields_by_file:
                    fields_by_file[target_file] = []
                fields_by_file[target_file].append(finding)
        
        report.append("## 添加的字段详情\n")
        for target_file, findings in fields_by_file.items():
            report.append(f"### {target_file}\n")
            for finding in findings:
                report.append(f"- **{finding['suggested_field']}**: `{finding['hardcoded_value']}`")
                report.append(f"  - 类别: {finding['category']}")
                report.append(f"  - 来源: {Path(finding.get('source_file', '')).name if 'source_file' in finding else '未知'}\n")
        
        return "\n".join(report)

def main():
    """主函数"""
    # 配置路径
    modules_dir = "/Users/huijoohwee/Documents/999_sandbox/airvio/modules"
    fields_s1in_dir = "/Users/huijoohwee/Documents/999_sandbox/airvio/shared/fields/fields-s1in"
    
    # 创建增强修复器实例
    fixer = FieldAutoFixerEnhanced(modules_dir, fields_s1in_dir)
    
    print("开始扫描硬编码数值...")
    
    # 扫描硬编码数值
    hardcoded_findings = fixer.scan_hardcoded_values()
    
    if not hardcoded_findings:
        print("未发现需要处理的硬编码数值")
        return
    
    print(f"发现 {sum(len(findings) for findings in hardcoded_findings.values())} 个硬编码数值")
    
    # 添加字段到相应文件
    print("\n开始添加字段到配置文件...")
    results = fixer.add_fields_to_files(hardcoded_findings)
    
    # 生成摘要报告
    summary_report = fixer.generate_summary_report(hardcoded_findings, results)
    
    # 保存报告
    report_path = "/Users/huijoohwee/Documents/999_sandbox/airvio/shared/utils/field-addition-report.md"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(summary_report)
    
    print(f"\n处理完成！")
    print(f"- 更新了 {results['files_updated']} 个配置文件")
    print(f"- 添加了 {results['fields_added']} 个字段")
    print(f"- 详细报告已保存到: {report_path}")
    
    print("\n=== 处理摘要 ===")
    print(summary_report[:1000] + "..." if len(summary_report) > 1000 else summary_report)

if __name__ == "__main__":
    main()