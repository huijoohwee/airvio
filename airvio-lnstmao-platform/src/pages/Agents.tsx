/**
 * 智能体管理页面组件
 */
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Square,
  Edit,
  Copy,
  Trash2,
  Bot,
  Users,
  Clock,
  Activity,
  Settings,
  Eye,
  MoreVertical,
  Cpu,
  HardDrive,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Agents: React.FC = () => {
  const { agents, fetchAgents } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesType = typeFilter === 'all' || agent.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'idle':
        return 'bg-blue-100 text-blue-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '活跃';
      case 'idle':
        return '空闲';
      case 'busy':
        return '忙碌';
      case 'error':
        return '错误';
      case 'offline':
        return '离线';
      default:
        return '未知';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-3 h-3" />;
      case 'idle':
        return <Clock className="w-3 h-3" />;
      case 'busy':
        return <Activity className="w-3 h-3" />;
      case 'error':
        return <XCircle className="w-3 h-3" />;
      case 'offline':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coding':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'analysis':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'communication':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'automation':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'monitoring':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'coding':
        return '编程助手';
      case 'analysis':
        return '数据分析';
      case 'communication':
        return '沟通协调';
      case 'automation':
        return '自动化';
      case 'monitoring':
        return '监控告警';
      default:
        return '通用';
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">智能体管理</h1>
          <p className="text-gray-600 mt-1">管理和监控所有智能体实例</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新建智能体
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总智能体</p>
                <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">活跃智能体</p>
                <p className="text-2xl font-bold text-green-600">
                  {agents.filter(a => a.status === 'active').length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">忙碌智能体</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {agents.filter(a => a.status === 'busy').length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">错误智能体</p>
                <p className="text-2xl font-bold text-red-600">
                  {agents.filter(a => a.status === 'error').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索智能体名称或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部状态</option>
                <option value="active">活跃</option>
                <option value="idle">空闲</option>
                <option value="busy">忙碌</option>
                <option value="error">错误</option>
                <option value="offline">离线</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部类型</option>
                <option value="coding">编程助手</option>
                <option value="analysis">数据分析</option>
                <option value="communication">沟通协调</option>
                <option value="automation">自动化</option>
                <option value="monitoring">监控告警</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 智能体列表 */}
      {filteredAgents.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? '未找到匹配的智能体' : '暂无智能体'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? '请尝试调整搜索条件或筛选器' 
                : '创建您的第一个智能体开始自动化任务'}
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              创建智能体
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="w-4 h-4 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {agent.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {agent.description}
                    </p>
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded-md">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* 状态和类型 */}
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(agent.status)
                    )}>
                      {getStatusIcon(agent.status)}
                      <span className="ml-1">{getStatusText(agent.status)}</span>
                    </span>
                    <span className={cn(
                      'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border',
                      getTypeColor(agent.type)
                    )}>
                      {getTypeText(agent.type)}
                    </span>
                  </div>

                  {/* 性能指标 */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Cpu className="w-3 h-3 text-blue-500 mr-1" />
                        <span className="text-xs text-gray-600">CPU</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {agent.cpu_usage || 0}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <HardDrive className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-gray-600">内存</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {agent.memory_usage || 0}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Activity className="w-3 h-3 text-purple-500 mr-1" />
                        <span className="text-xs text-gray-600">任务</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {agent.task_count || 0}
                      </div>
                    </div>
                  </div>

                  {/* 配置信息 */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">版本</span>
                      <span className="text-gray-900">{agent.version || 'v1.0.0'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">创建时间</span>
                      <span className="text-gray-900">
                        {new Date(agent.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">最后活跃</span>
                      <span className="text-gray-900">
                        {agent.last_active_at 
                          ? new Date(agent.last_active_at).toLocaleDateString()
                          : '从未活跃'}
                      </span>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                    {agent.status === 'active' || agent.status === 'busy' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="w-3 h-3 mr-1" />
                        停止
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        启动
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Settings className="w-3 h-3 mr-1" />
                      配置
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      日志
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 创建智能体模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">创建新智能体</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  智能体名称
                </label>
                <input
                  type="text"
                  placeholder="输入智能体名称"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  智能体描述
                </label>
                <textarea
                  placeholder="输入智能体描述"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  智能体类型
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="coding">编程助手</option>
                  <option value="analysis">数据分析</option>
                  <option value="communication">沟通协调</option>
                  <option value="automation">自动化</option>
                  <option value="monitoring">监控告警</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  关联项目
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">选择项目</option>
                  <option value="project1">项目 1</option>
                  <option value="project2">项目 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  配置模板
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="basic">基础配置</option>
                  <option value="advanced">高级配置</option>
                  <option value="custom">自定义配置</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                取消
              </Button>
              <Button onClick={() => setShowCreateModal(false)}>
                创建智能体
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;