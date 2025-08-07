#!/usr/bin/env python3
"""
AIRVIO 字段自动修复工具
自动检测硬编码数值并替换为动态字段引用
"""

import os
import re
import yaml
from pathlib import Path
from typing import Dict, List, Tuple, Any

class FieldAutoFixer:
    def __init__(self, fields_yaml_path: str, modules_dir: str):
        self.fields_yaml_path = Path(fields_yaml_path)
        self.modules_dir = Path(modules_dir)
        self.fields_data = self._load_fields_yaml()
        self.hardcoded_patterns = self._define_hardcoded_patterns()
        self.missing_fields = []
        self.replacement_map = {}
        
    def _load_fields_yaml(self) -> Dict[str, Any]:
        """加载 fields.yaml 文件"""
        try:
            with open(self.fields_yaml_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except Exception as e:
            print(f"Error loading fields.yaml: {e}")
            return {}
    
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
                            'replacement_pattern': self._generate_replacement(value, category)
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
    
    def _generate_replacement(self, value: str, category: str) -> str:
        """生成替换模式"""
        field_name = self._suggest_field_name(value, category)
        return f'{{{{dynamic_fields.{field_name}}}}}'
    
    def generate_missing_fields_yaml(self, hardcoded_findings: Dict) -> str:
        """生成缺失字段的YAML配置"""
        missing_fields = {}
        
        for file_path, findings in hardcoded_findings.items():
            for finding in findings:
                category = finding['category']
                field_name = finding['suggested_field']
                value = finding['hardcoded_value']
                
                if category not in missing_fields:
                    missing_fields[category] = {}
                    
                missing_fields[category][field_name] = {
                    'zh-CN': f'{value}配置',
                    'en-US': f'{value} Configuration',
                    'description': f'配置参数：{value}',
                    'type': self._determine_field_type(value),
                    'priority': 'P1',
                    'ai_collaboration': 'L0',
                    'startup_phase': 'development',
                    'value_chain_position': 'solution_design',
                    'tags': [category.lower().replace('_', '-')],
                    'example': value,
                    'template_reusability': {
                        'is_reusable': True,
                        'reuse_contexts': ['配置管理', '参数控制'],
                        'template_id': f'{field_name}_001'
                    }
                }
        
        return yaml.dump({'dynamic_fields': missing_fields}, 
                        default_flow_style=False, 
                        allow_unicode=True, 
                        indent=2)
    
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
    
    def generate_report(self) -> str:
        """生成完整的分析报告"""
        hardcoded_findings = self.scan_hardcoded_values()
        
        report = []
        report.append("# AIRVIO 硬编码数值分析报告\n")
        report.append(f"生成时间: {self._get_timestamp()}\n")
        
        # 统计信息
        total_files = len(hardcoded_findings)
        total_hardcoded = sum(len(findings) for findings in hardcoded_findings.values())
        
        report.append(f"## 统计概览\n")
        report.append(f"- 扫描文件数: {total_files}")
        report.append(f"- 发现硬编码数值: {total_hardcoded}\n")
        
        # 按类别统计
        category_stats = {}
        for findings in hardcoded_findings.values():
            for finding in findings:
                category = finding['category']
                category_stats[category] = category_stats.get(category, 0) + 1
        
        report.append("## 按类别统计\n")
        for category, count in sorted(category_stats.items()):
            report.append(f"- {category}: {count}个")
        report.append("")
        
        # 详细发现
        report.append("## 详细发现\n")
        for file_path, findings in hardcoded_findings.items():
            relative_path = str(Path(file_path).relative_to(self.modules_dir.parent))
            report.append(f"### {relative_path}\n")
            
            for finding in findings:
                report.append(f"**行 {finding['line_number']}**: `{finding['hardcoded_value']}`")
                report.append(f"- 类别: {finding['category']}")
                report.append(f"- 建议字段: `{finding['suggested_field']}`")
                report.append(f"- 替换为: `{finding['replacement_pattern']}`")
                report.append(f"- 原文: {finding['line_content']}\n")
        
        # 生成缺失字段配置
        missing_fields_yaml = self.generate_missing_fields_yaml(hardcoded_findings)
        report.append("## 建议添加的字段配置\n")
        report.append("```yaml")
        report.append(missing_fields_yaml)
        report.append("```\n")
        
        return "\n".join(report)
    
    def _get_timestamp(self) -> str:
        """获取当前时间戳"""
        from datetime import datetime
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    def apply_fixes(self, hardcoded_findings: Dict, dry_run: bool = True) -> Dict[str, int]:
        """应用修复（替换硬编码值为动态字段引用）"""
        results = {'files_processed': 0, 'replacements_made': 0}
        
        for file_path, findings in hardcoded_findings.items():
            if self._apply_file_fixes(file_path, findings, dry_run):
                results['files_processed'] += 1
                results['replacements_made'] += len(findings)
        
        return results
    
    def _apply_file_fixes(self, file_path: str, findings: List[Dict], dry_run: bool) -> bool:
        """对单个文件应用修复"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified_content = content
            
            # 按行号倒序处理，避免行号偏移
            sorted_findings = sorted(findings, key=lambda x: x['line_number'], reverse=True)
            
            for finding in sorted_findings:
                old_value = finding['hardcoded_value']
                new_value = finding['replacement_pattern']
                
                # 简单的字符串替换（可以改进为更精确的替换）
                modified_content = modified_content.replace(old_value, new_value)
            
            if not dry_run:
                # 备份原文件
                backup_path = f"{file_path}.backup"
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # 写入修改后的内容
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
            
            return True
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            return False

def main():
    """主函数"""
    # 配置路径
    fields_yaml_path = "/Users/huijoohwee/Documents/999_sandbox/airvio/shared/fields/fields-s3out/fields.yaml"
    modules_dir = "/Users/huijoohwee/Documents/999_sandbox/airvio/modules"
    
    # 创建修复器实例
    fixer = FieldAutoFixer(fields_yaml_path, modules_dir)
    
    # 生成报告
    report = fixer.generate_report()
    
    # 保存报告
    report_path = "/Users/huijoohwee/Documents/999_sandbox/airvio/shared/utils/hardcoded-values-report.md"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"分析报告已生成: {report_path}")
    print("\n=== 报告预览 ===")
    print(report[:2000] + "..." if len(report) > 2000 else report)

if __name__ == "__main__":
    main()