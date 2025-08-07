#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI原生字段合并工具 - 基于LNST精益创业统筹中枢
优化原则：DRY、KISS、YAGNI、SOLID
价值链路：用户痛点→解决方案→商业价值
发展路径：一人草创 → 多智能体编排 → 可持续盈利增长
"""

import os
import yaml
import json
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime
import logging
from pathlib import Path

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class AIFieldMerger:
    """AI原生字段合并器 - 价值导向 + 精益创业"""
    
    def __init__(self, fields_dir: str = None, output_file: str = None):
        # 修复路径：指向fields-s1in目录
        base_dir = Path(__file__).parent.parent
        self.fields_dir = Path(fields_dir) if fields_dir else base_dir / 'fields-s1in'
        self.output_dir = base_dir / 'fields-s3out'
        self.output_file = Path(output_file) if output_file else self.output_dir / 'fields.yaml'
        self.schema_file = base_dir / 'field_schema.json'
        self.orchestrator_file = base_dir / 'field_orchestrator.yaml'
        
        # 确保输出目录存在
        self.output_dir.mkdir(exist_ok=True)
        
        # 优先级映射 - 遵循核心到边缘原则
        self.priority_order = {
            'P0': 0,  # 核心价值链路
            'P1': 1,  # AI原生架构
            'P2': 2,  # 质量保障
            'P3': 3   # 扩展功能
        }
        
        # AI协作级别映射
        self.ai_collaboration_levels = {
            'L0': {'ai_ratio': 90, 'human_ratio': 10, 'use_case': '文档、代码、测试'},
            'L1': {'ai_ratio': 50, 'human_ratio': 50, 'use_case': '架构设计、产品决策'},
            'L2': {'ai_ratio': 30, 'human_ratio': 70, 'use_case': '战略规划、商业决策'}
        }
        
        # 精益创业阶段
        self.startup_phases = ['discovery', 'validation', 'development', 'launch', 'fundraising']
        
        # 价值链路位置
        self.value_chain_positions = ['user_pain_point', 'solution_design', 'business_value']
        
        # 统计信息 - 增强版
        self.stats = {
            'total_fields': 0,
            'by_priority': {'P0': 0, 'P1': 0, 'P2': 0, 'P3': 0},
            'by_ai_level': {'L0': 0, 'L1': 0, 'L2': 0},
            'by_startup_phase': {phase: 0 for phase in self.startup_phases},
            'by_value_chain': {pos: 0 for pos in self.value_chain_positions},
            'token_budget_total': 0,
            'mvp_critical_fields': 0,
            'quick_launch_compatible': 0,
            'reusable_templates': 0,
            'business_impact_high': 0,
            'risk_mitigation_covered': 0,
            'validation_errors': 0,
            'files_processed': 0,
            'files_failed': 0
        }
        
        # 业务分析结果
        self.business_analysis = {
            'high_value_fields': [],
            'mvp_critical_path': [],
            'risk_areas': [],
            'optimization_opportunities': []
        }
    
    def load_schema(self) -> Optional[Dict]:
        """加载字段Schema规范"""
        try:
            if self.schema_file.exists():
                with open(self.schema_file, 'r', encoding='utf-8') as f:
                    schema = json.load(f)
                    logger.info(f"✅ 加载Schema成功: {self.schema_file}")
                    return schema
        except Exception as e:
            logger.warning(f"⚠️ 无法加载Schema文件: {e}")
        return None
    
    def load_orchestrator_config(self) -> Optional[Dict]:
        """加载编排器配置文件"""
        try:
            if self.orchestrator_file.exists():
                with open(self.orchestrator_file, 'r', encoding='utf-8') as f:
                    config = yaml.safe_load(f)
                    logger.info(f"✅ 加载编排器配置成功: {self.orchestrator_file}")
                    return config
        except Exception as e:
            logger.warning(f"⚠️ 无法加载编排器配置: {e}")
        return None
    
    def get_file_priority(self, filename: str) -> int:
        """根据文件名确定优先级 - 增强版"""
        filename_lower = filename.lower()
        
        # P0: 核心价值链路
        if any(x in filename_lower for x in ['-p0.', 'core', 'lnst', 'mvp']):
            return 0
        
        # P1: AI原生架构
        elif any(x in filename_lower for x in ['-p1.', 'hmnm', 'maos', 'gstr', 'matb']):
            return 1
        
        # P2: 质量保障
        elif any(x in filename_lower for x in ['-p2.', 'metrics', 'quality']):
            return 2
        
        # P3: 扩展功能
        else:
            return 3
    
    def validate_field(self, field_name: str, field_data: Dict, schema: Dict = None) -> Tuple[bool, List[str]]:
        """验证字段是否符合Schema规范 - 增强版"""
        errors = []
        
        if not isinstance(field_data, dict):
            errors.append("字段数据必须是字典类型")
            return False, errors
        
        # 检查必填字段
        required_fields = ['zh-CN', 'en-US', 'description', 'type']
        for req_field in required_fields:
            if req_field not in field_data:
                errors.append(f"缺少必填属性: {req_field}")
        
        # 检查优先级
        if 'priority' in field_data:
            if field_data['priority'] not in self.priority_order:
                errors.append(f"优先级无效: {field_data['priority']}")
        
        # 检查AI协作级别
        if 'ai_collaboration' in field_data:
            if field_data['ai_collaboration'] not in self.ai_collaboration_levels:
                errors.append(f"AI协作级别无效: {field_data['ai_collaboration']}")
        
        # 检查精益创业阶段
        if 'startup_phase' in field_data:
            if field_data['startup_phase'] not in self.startup_phases:
                errors.append(f"精益创业阶段无效: {field_data['startup_phase']}")
        
        # 检查价值链路位置
        if 'value_chain_position' in field_data:
            if field_data['value_chain_position'] not in self.value_chain_positions:
                errors.append(f"价值链路位置无效: {field_data['value_chain_position']}")
        
        # 检查Token预算格式
        if 'token_budget' in field_data:
            token_budget = field_data['token_budget']
            if isinstance(token_budget, dict):
                if 'estimated_tokens' in token_budget and not isinstance(token_budget['estimated_tokens'], (int, float)):
                    errors.append("Token预算必须是数字")
        
        is_valid = len(errors) == 0
        if not is_valid:
            self.stats['validation_errors'] += 1
            logger.warning(f"字段 {field_name} 验证失败: {'; '.join(errors)}")
        
        return is_valid, errors
    
    def analyze_business_value(self, field_name: str, field_data: Dict) -> Dict:
        """分析字段的商业价值"""
        analysis = {
            'user_value_score': 0,
            'business_value_score': 0,
            'roi_potential': 'unknown',
            'market_validation_status': 'pending'
        }
        
        # 基于优先级评分
        priority = field_data.get('priority', 'P3')
        priority_scores = {'P0': 10, 'P1': 7, 'P2': 5, 'P3': 3}
        base_score = priority_scores.get(priority, 3)
        
        # MVP关键性加分
        if field_data.get('mvp_relevance', {}).get('is_mvp_critical', False):
            base_score += 5
        
        # 快速启动兼容性加分
        if field_data.get('mvp_relevance', {}).get('quick_launch_compatible', False):
            base_score += 3
        
        analysis['user_value_score'] = min(base_score, 10)
        analysis['business_value_score'] = min(base_score, 10)
        
        # 分析商业影响
        if 'business_impact' in field_data:
            business_impact = field_data['business_impact']
            if 'roi_estimate' in business_impact:
                analysis['roi_potential'] = business_impact['roi_estimate']
            if 'market_validation' in business_impact:
                analysis['market_validation_status'] = business_impact['market_validation']
        
        # 高价值字段识别
        if analysis['user_value_score'] >= 8 or analysis['business_value_score'] >= 8:
            self.business_analysis['high_value_fields'].append(field_name)
            self.stats['business_impact_high'] += 1
        
        return analysis
    
    def assess_risks(self, field_name: str, field_data: Dict) -> Dict:
        """评估字段相关风险"""
        risk_assessment = {
            'technical_risk_level': 'low',
            'market_risk_level': 'low',
            'execution_risk_level': 'low',
            'overall_risk_score': 0
        }
        
        # 检查风险缓解措施
        if 'risk_mitigation' in field_data:
            risk_mitigation = field_data['risk_mitigation']
            
            # 技术风险评估
            tech_risks = risk_mitigation.get('technical_risks', [])
            if len(tech_risks) > 2:
                risk_assessment['technical_risk_level'] = 'high'
            elif len(tech_risks) > 0:
                risk_assessment['technical_risk_level'] = 'medium'
            
            # 市场风险评估
            market_risks = risk_mitigation.get('market_risks', [])
            if len(market_risks) > 2:
                risk_assessment['market_risk_level'] = 'high'
            elif len(market_risks) > 0:
                risk_assessment['market_risk_level'] = 'medium'
            
            # 执行风险评估
            exec_risks = risk_mitigation.get('execution_risks', [])
            if len(exec_risks) > 2:
                risk_assessment['execution_risk_level'] = 'high'
            elif len(exec_risks) > 0:
                risk_assessment['execution_risk_level'] = 'medium'
            
            # 有缓解策略的字段
            if 'mitigation_strategy' in risk_mitigation:
                self.stats['risk_mitigation_covered'] += 1
        
        # 计算总体风险分数
        risk_levels = {'low': 1, 'medium': 2, 'high': 3}
        total_risk = (risk_levels[risk_assessment['technical_risk_level']] + 
                     risk_levels[risk_assessment['market_risk_level']] + 
                     risk_levels[risk_assessment['execution_risk_level']])
        risk_assessment['overall_risk_score'] = total_risk
        
        # 高风险字段识别
        if total_risk >= 7:
            self.business_analysis['risk_areas'].append(field_name)
        
        return risk_assessment
    
    def update_statistics(self, field_name: str, field_data: Dict):
        """更新统计信息 - 增强版"""
        self.stats['total_fields'] += 1
        
        # 按优先级统计
        priority = field_data.get('priority', 'P3')
        if priority in self.stats['by_priority']:
            self.stats['by_priority'][priority] += 1
        
        # 按AI协作级别统计
        ai_level = field_data.get('ai_collaboration', 'L1')
        if ai_level in self.stats['by_ai_level']:
            self.stats['by_ai_level'][ai_level] += 1
        
        # 按精益创业阶段统计
        startup_phase = field_data.get('startup_phase')
        if startup_phase and startup_phase in self.stats['by_startup_phase']:
            self.stats['by_startup_phase'][startup_phase] += 1
        
        # 按价值链路位置统计
        value_chain_pos = field_data.get('value_chain_position')
        if value_chain_pos and value_chain_pos in self.stats['by_value_chain']:
            self.stats['by_value_chain'][value_chain_pos] += 1
        
        # Token预算统计
        if 'token_budget' in field_data and isinstance(field_data['token_budget'], dict):
            estimated_tokens = field_data['token_budget'].get('estimated_tokens', 0)
            if isinstance(estimated_tokens, (int, float)):
                self.stats['token_budget_total'] += estimated_tokens
        
        # MVP关键字段统计
        if field_data.get('mvp_relevance', {}).get('is_mvp_critical', False):
            self.stats['mvp_critical_fields'] += 1
            self.business_analysis['mvp_critical_path'].append(field_name)
        
        # 快速启动兼容性统计
        if field_data.get('mvp_relevance', {}).get('quick_launch_compatible', False):
            self.stats['quick_launch_compatible'] += 1
        
        # 可复用模板统计
        if field_data.get('template_reusability', {}).get('is_reusable', False):
            self.stats['reusable_templates'] += 1
    
    def discover_field_files(self) -> List[Tuple[int, str, Path]]:
        """发现并排序字段文件"""
        file_list = []
        
        if not self.fields_dir.exists():
            logger.error(f"❌ 字段目录不存在: {self.fields_dir}")
            return file_list
        
        # 支持.yaml和.yml扩展名
        for pattern in ['*.yaml', '*.yml']:
            for file_path in self.fields_dir.glob(pattern):
                filename = file_path.name
                # 跳过特殊文件
                if filename.startswith(('CNTNT-', '_', '.')):
                    continue
                
                priority = self.get_file_priority(filename)
                file_list.append((priority, filename, file_path))
        
        # 按优先级排序：P0 → P1 → P2 → P3
        file_list.sort(key=lambda x: (x[0], x[1]))
        
        logger.info(f"📁 发现 {len(file_list)} 个字段文件")
        return file_list
    
    def merge_fields(self) -> Dict:
        """合并所有字段文件 - 增强版"""
        logger.info("🚀 开始AI原生字段合并...")
        
        # 加载配置
        schema = self.load_schema()
        orchestrator_config = self.load_orchestrator_config()
        
        merged_data = {}
        file_list = self.discover_field_files()
        
        if not file_list:
            logger.error("❌ 未找到任何字段文件")
            return {}
        
        # 合并字段
        for priority, filename, file_path in file_list:
            logger.info(f"📄 处理文件: {filename} (优先级: P{priority})")
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = yaml.safe_load(f)
                    
                    if not data:
                        logger.warning(f"⚠️ 文件为空: {filename}")
                        continue
                    
                    self.stats['files_processed'] += 1
                    
                    # 处理嵌套结构：检查是否有 'fields' 键
                    fields_data = data
                    if 'fields' in data and isinstance(data['fields'], dict):
                        fields_data = data['fields']
                        logger.info(f"📋 检测到嵌套结构，处理 'fields' 键下的内容")
                    
                    for field_name, field_data in fields_data.items():
                        # 跳过元数据字段
                        if field_name.startswith('_') or field_name in ['version', 'meta', 'config', 'fields']:
                            continue
                        
                        # 验证字段
                        is_valid, errors = self.validate_field(field_name, field_data, schema)
                        
                        if is_valid:
                            # 处理字段冲突
                            if field_name in merged_data:
                                existing_priority = merged_data[field_name].get('priority', 'P3')
                                new_priority = field_data.get('priority', 'P3')
                                
                                # 高优先级覆盖低优先级
                                if self.priority_order[new_priority] <= self.priority_order[existing_priority]:
                                    merged_data[field_name] = field_data
                                    logger.info(f"🔄 字段 {field_name} 被 {new_priority} 优先级覆盖")
                            else:
                                merged_data[field_name] = field_data
                                logger.info(f"✅ 添加字段: {field_name}")
                            
                            # 更新统计和分析
                            self.update_statistics(field_name, field_data)
                            self.analyze_business_value(field_name, field_data)
                            self.assess_risks(field_name, field_data)
                        else:
                            logger.warning(f"⚠️ 字段验证失败，跳过: {field_name} - {'; '.join(errors)}")
                    
            except yaml.YAMLError as e:
                logger.error(f"❌ YAML解析错误 {filename}: {e}")
                self.stats['files_failed'] += 1
            except Exception as e:
                logger.error(f"❌ 处理文件错误 {filename}: {e}")
                self.stats['files_failed'] += 1
        
        # 生成优化建议
        self.generate_optimization_recommendations()
        
        # 添加元数据
        merged_data['_meta'] = {
            'generated_at': datetime.now().isoformat(),
            'generator': 'AI原生字段合并器 v5.1',
            'version': 'v5.1-ai-native-enhanced-fixed',
            'design_principles': ['DRY', 'KISS', 'YAGNI', 'SOLID'],
            'value_chain': '用户痛点→解决方案→商业价值',
            'development_roadmap': '一人草创 → 多智能体编排 → 可持续盈利增长',
            'statistics': self.stats,
            'business_analysis': self.business_analysis
        }
        
        if orchestrator_config:
            merged_data['_meta']['orchestrator_config'] = orchestrator_config.get('global_config', {})
        
        logger.info(f"✅ 合并完成，共处理 {self.stats['total_fields']} 个字段")
        return merged_data
    
    def generate_optimization_recommendations(self):
        """生成优化建议"""
        recommendations = []
        
        # Token效率优化建议
        if self.stats['token_budget_total'] > 50000:
            recommendations.append("考虑优化Token使用，当前预算较高")
        
        # MVP关键路径优化
        mvp_ratio = (self.stats['mvp_critical_fields'] / max(self.stats['total_fields'], 1)) * 100
        if mvp_ratio < 20:
            recommendations.append("建议增加MVP关键字段比例，当前比例偏低")
        
        # AI协作优化
        l0_ratio = (self.stats['by_ai_level'].get('L0', 0) / max(self.stats['total_fields'], 1)) * 100
        if l0_ratio < 50:
            recommendations.append("建议增加L0级AI协作字段，提高自动化程度")
        
        # 风险缓解覆盖率
        risk_coverage = (self.stats['risk_mitigation_covered'] / max(self.stats['total_fields'], 1)) * 100
        if risk_coverage < 70:
            recommendations.append("建议完善风险缓解策略覆盖率")
        
        self.business_analysis['optimization_opportunities'] = recommendations
    
    def save_merged_data(self, merged_data: Dict):
        """保存合并后的数据 - 增强版"""
        try:
            with open(self.output_file, 'w', encoding='utf-8') as f:
                # 自定义YAML输出格式
                yaml.dump(
                    merged_data, 
                    f, 
                    allow_unicode=True, 
                    sort_keys=False, 
                    default_flow_style=False, 
                    indent=2,
                    width=120
                )
            
            logger.info(f"💾 合并结果已保存到: {self.output_file}")
            
            # 保存分析报告
            self.save_analysis_report()
            
            # 输出统计报告
            self.print_statistics()
            
        except Exception as e:
            logger.error(f"❌ 保存文件失败: {e}")
    
    def save_analysis_report(self):
        """保存分析报告"""
        report_file = self.output_dir / 'analysis_report.json'
        
        report = {
            'timestamp': datetime.now().isoformat(),
            'statistics': self.stats,
            'business_analysis': self.business_analysis,
            'recommendations': self.business_analysis['optimization_opportunities']
        }
        
        try:
            with open(report_file, 'w', encoding='utf-8') as f:
                json.dump(report, f, ensure_ascii=False, indent=2)
            logger.info(f"📊 分析报告已保存到: {report_file}")
        except Exception as e:
            logger.warning(f"⚠️ 保存分析报告失败: {e}")
    
    def print_statistics(self):
        """打印统计报告 - 增强版"""
        print("\n" + "="*80)
        print("🚀 AI原生字段合并统计报告 - 价值导向版")
        print("="*80)
        
        # 基础统计
        print(f"📊 总字段数: {self.stats['total_fields']}")
        print(f"📁 处理文件: {self.stats['files_processed']} 成功, {self.stats['files_failed']} 失败")
        print(f"⚠️ 验证错误: {self.stats['validation_errors']}")
        print(f"💰 Token预算总计: {self.stats['token_budget_total']:,}")
        
        # MVP和快速启动
        print(f"\n🎯 MVP & 快速启动:")
        print(f"  MVP关键字段: {self.stats['mvp_critical_fields']}")
        print(f"  快速启动兼容: {self.stats['quick_launch_compatible']}")
        print(f"  可复用模板: {self.stats['reusable_templates']}")
        
        # 商业价值
        print(f"\n💼 商业价值分析:")
        print(f"  高价值字段: {self.stats['business_impact_high']}")
        print(f"  风险缓解覆盖: {self.stats['risk_mitigation_covered']}")
        
        # 优先级分布
        print("\n📈 按优先级分布:")
        for priority, count in self.stats['by_priority'].items():
            percentage = (count / max(self.stats['total_fields'], 1) * 100)
            print(f"  {priority}: {count} ({percentage:.1f}%)")
        
        # AI协作级别分布
        print("\n🤖 按AI协作级别分布:")
        for level, count in self.stats['by_ai_level'].items():
            percentage = (count / max(self.stats['total_fields'], 1) * 100)
            ai_info = self.ai_collaboration_levels.get(level, {})
            print(f"  {level}: {count} ({percentage:.1f}%) - {ai_info.get('use_case', '')}")
        
        # 精益创业阶段分布
        print("\n🚀 按精益创业阶段分布:")
        for phase, count in self.stats['by_startup_phase'].items():
            if count > 0:
                percentage = (count / max(self.stats['total_fields'], 1) * 100)
                print(f"  {phase}: {count} ({percentage:.1f}%)")
        
        # 价值链路分布
        print("\n🔗 按价值链路位置分布:")
        for position, count in self.stats['by_value_chain'].items():
            if count > 0:
                percentage = (count / max(self.stats['total_fields'], 1) * 100)
                print(f"  {position}: {count} ({percentage:.1f}%)")
        
        # 优化建议
        if self.business_analysis['optimization_opportunities']:
            print("\n💡 优化建议:")
            for i, recommendation in enumerate(self.business_analysis['optimization_opportunities'], 1):
                print(f"  {i}. {recommendation}")
        
        print("\n✅ 合并完成！遵循价值导向原则：")
        print("   • DRY: 模板化复用")
        print("   • KISS: 先能用再好用")
        print("   • YAGNI: 当前需求优先")
        print("   • SOLID: 高内聚低耦合")
        print("   • 价值链路: 用户痛点→解决方案→商业价值")
        print("   • 发展路径: 一人草创→多智能体编排→可持续盈利增长")
        print("="*80)
    
    def run(self) -> bool:
        """执行合并流程"""
        try:
            merged_data = self.merge_fields()
            if merged_data:
                self.save_merged_data(merged_data)
                return True
            return False
        except Exception as e:
            logger.error(f"❌ 合并流程执行失败: {e}")
            return False

def main():
    """主函数"""
    print("🚀 启动AI原生字段合并器...")
    print("价值链路: 用户痛点→解决方案→商业价值")
    print("发展路径: 一人草创→多智能体编排→可持续盈利增长\n")
    
    merger = AIFieldMerger()
    success = merger.run()
    
    if success:
        print("\n🎉 AI原生字段合并成功完成！")
        print(f"📁 输出文件: {merger.output_file}")
        print(f"📊 分析报告: {merger.output_dir / 'analysis_report.json'}")
    else:
        print("❌ 合并过程中出现错误")
        exit(1)

if __name__ == '__main__':
    main()