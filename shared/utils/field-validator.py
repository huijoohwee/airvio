#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
字段池配置自动化验证器
功能：验证字段池配置的完整性、一致性和性能影响
"""

import os
import re
import yaml
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple, Any
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ValidationResult:
    """验证结果数据类"""
    level: str
    status: str  # 'pass', 'warning', 'error'
    message: str
    file_path: str = ""
    line_number: int = 0
    suggestion: str = ""

class FieldPoolValidator:
    """字段池验证器主类"""
    
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.config = self._load_config()
        self.results: List[ValidationResult] = []
        self.field_registry: Dict[str, Any] = {}
        self.reference_map: Dict[str, Set[str]] = {}
    
    def _load_config(self) -> Dict:
        """加载验证配置"""
        with open(self.config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    
    def validate_all(self, project_root: str) -> List[ValidationResult]:
        """执行完整验证流程"""
        self.results.clear()
        
        # 1. 结构验证
        self._validate_structure(project_root)
        
        # 2. 引用验证
        self._validate_references(project_root)
        
        # 3. 语法验证
        self._validate_syntax(project_root)
        
        # 4. 一致性验证
        self._validate_consistency(project_root)
        
        # 5. 性能验证
        self._validate_performance(project_root)
        
        return self.results
    
    def _validate_structure(self, project_root: str):
        """验证字段池文件结构"""
        fields_file = Path(project_root) / "airvio/shared/fields/fields-s3out/fields.yaml"
        
        if not fields_file.exists():
            self.results.append(ValidationResult(
                level="structure",
                status="error",
                message="字段池文件不存在",
                file_path=str(fields_file),
                suggestion="请确保字段池文件存在于正确路径"
            ))
            return
        
        try:
            with open(fields_file, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f)
            
            # 检查根节点
            required_roots = self.config['validation_config']['rules']['structure']['required_root_nodes']
            for root in required_roots:
                if root not in data:
                    self.results.append(ValidationResult(
                        level="structure",
                        status="error",
                        message=f"缺少必需的根节点: {root}",
                        file_path=str(fields_file),
                        suggestion=f"请在文件开头添加 '{root}:' 节点"
                    ))
            
            # 检查字段属性完整性
            if 'dynamic_fields' in data:
                self._validate_field_properties(data['dynamic_fields'], str(fields_file))
                self.field_registry = data['dynamic_fields']
            
        except yaml.YAMLError as e:
            self.results.append(ValidationResult(
                level="structure",
                status="error",
                message=f"YAML 解析错误: {str(e)}",
                file_path=str(fields_file),
                suggestion="请检查 YAML 语法格式"
            ))
    
    def _validate_field_properties(self, fields: Dict, file_path: str):
        """验证字段属性完整性"""
        required_props = self.config['validation_config']['rules']['structure']['required_field_properties']
        
        for field_name, field_data in fields.items():
            if not isinstance(field_data, dict):
                continue
                
            for prop in required_props:
                if prop not in field_data:
                    self.results.append(ValidationResult(
                        level="structure",
                        status="warning",
                        message=f"字段 {field_name} 缺少属性: {prop}",
                        file_path=file_path,
                        suggestion=f"请为字段 {field_name} 添加 {prop} 属性"
                    ))
    
    def _validate_references(self, project_root: str):
        """验证字段引用完整性"""
        modules_dir = Path(project_root) / "airvio/modules"
        reference_pattern = re.compile(r'\{\{dynamic_fields\.([A-Z_]+(?:\.[a-z_]+)*)\}\}')
        
        for md_file in modules_dir.rglob("*.md"):
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # 查找所有字段引用
                references = reference_pattern.findall(content)
                
                for ref in references:
                    self._validate_single_reference(ref, str(md_file))
                    
                    # 记录引用关系
                    if str(md_file) not in self.reference_map:
                        self.reference_map[str(md_file)] = set()
                    self.reference_map[str(md_file)].add(ref)
                        
            except Exception as e:
                self.results.append(ValidationResult(
                    level="reference",
                    status="error",
                    message=f"读取文件失败: {str(e)}",
                    file_path=str(md_file)
                ))
    
    def _validate_single_reference(self, ref_path: str, file_path: str):
        """验证单个字段引用"""
        parts = ref_path.split('.')
        field_name = parts[0]
        
        # 检查字段是否存在
        if field_name not in self.field_registry:
            self.results.append(ValidationResult(
                level="reference",
                status="error",
                message=f"引用的字段不存在: {field_name}",
                file_path=file_path,
                suggestion=f"请检查字段名拼写或在字段池中添加字段 {field_name}"
            ))
            return
        
        # 检查嵌套属性路径
        if len(parts) > 1:
            current = self.field_registry[field_name]
            for i, part in enumerate(parts[1:], 1):
                if not isinstance(current, dict) or part not in current:
                    self.results.append(ValidationResult(
                        level="reference",
                        status="error",
                        message=f"引用路径不存在: {'.'.join(parts[:i+1])}",
                        file_path=file_path,
                        suggestion=f"请检查字段 {field_name} 的属性结构"
                    ))
                    return
                current = current[part]
    
    def _validate_syntax(self, project_root: str):
        """验证语法规范"""
        field_pattern = re.compile(self.config['validation_config']['rules']['syntax']['field_naming_convention'])
        
        for field_name in self.field_registry.keys():
            if not field_pattern.match(field_name):
                self.results.append(ValidationResult(
                    level="syntax",
                    status="warning",
                    message=f"字段名不符合命名规范: {field_name}",
                    suggestion="字段名应使用大写字母和下划线，如 FIELD_NAME"
                ))
    
    def _validate_consistency(self, project_root: str):
        """验证一致性"""
        # 检查孤立字段
        used_fields = set()
        for refs in self.reference_map.values():
            for ref in refs:
                field_name = ref.split('.')[0]
                used_fields.add(field_name)
        
        for field_name in self.field_registry.keys():
            if field_name not in used_fields:
                self.results.append(ValidationResult(
                    level="consistency",
                    status="warning",
                    message=f"未使用的字段: {field_name}",
                    suggestion="考虑删除未使用的字段或添加相应引用"
                ))
    
    def _validate_performance(self, project_root: str):
        """验证性能影响"""
        # 检查字段池文件大小
        fields_file = Path(project_root) / "airvio/shared/fields/fields-s3out/fields.yaml"
        if fields_file.exists():
            file_size = fields_file.stat().st_size
            if file_size > 1024 * 1024:  # 1MB
                self.results.append(ValidationResult(
                    level="performance",
                    status="warning",
                    message=f"字段池文件过大: {file_size / 1024 / 1024:.2f}MB",
                    suggestion="考虑拆分字段池或优化字段定义"
                ))
    
    def generate_report(self, output_path: str):
        """生成验证报告"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "summary": {
                "total_checks": len(self.results),
                "errors": len([r for r in self.results if r.status == "error"]),
                "warnings": len([r for r in self.results if r.status == "warning"]),
                "passed": len([r for r in self.results if r.status == "pass"])
            },
            "details": [
                {
                    "level": r.level,
                    "status": r.status,
                    "message": r.message,
                    "file_path": r.file_path,
                    "line_number": r.line_number,
                    "suggestion": r.suggestion
                }
                for r in self.results
            ]
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)

def main():
    """主函数"""
    import sys
    
    if len(sys.argv) != 2:
        print("用法: python field-validator.py <project_root>")
        sys.exit(1)
    
    project_root = sys.argv[1]
    config_path = os.path.join(project_root, "airvio/shared/utils/field-validation-config.yaml")
    
    validator = FieldPoolValidator(config_path)
    results = validator.validate_all(project_root)
    
    # 生成报告
    report_path = os.path.join(project_root, "airvio/shared/fields/validation-report.json")
    validator.generate_report(report_path)
    
    # 输出摘要
    errors = [r for r in results if r.status == "error"]
    warnings = [r for r in results if r.status == "warning"]
    
    print(f"验证完成: {len(errors)} 个错误, {len(warnings)} 个警告")
    
    if errors:
        print("\n错误:")
        for error in errors:
            print(f"  - {error.message} ({error.file_path})")
    
    if warnings:
        print("\n警告:")
        for warning in warnings:
            print(f"  - {warning.message} ({warning.file_path})")
    
    # 返回适当的退出码
    sys.exit(1 if errors else 0)

if __name__ == "__main__":
    main()