/**
 * 智能体编排页面组件
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
  GitBranch,
  Users,
  Clock,
  Activity,
  Settings,
  Eye,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Orchestrations: React.FC = () => {
  const { orchestrations, fetchOrchestrations } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchOrchestrations();
  }, [fetchOrchestrations]);

  const filteredOrchestrations = orchestrations.filter(orchestration => {
    const matchesSearch = orchestration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orchestration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || orchestration.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'stopped':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'paused':
        return '已暂停';
      case 'stopped':
        return '已停止';
      case 'failed':
        return '失败';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="w-3 h-3" />;
      case 'paused':
        return <Pause className="w-3 h-3" />;
      case 'stopped':
        return <Square className="w-3 h-3" />;
      case 'failed':
        return <Trash2 className="w-3 h-3" />;
      case 'completed':
        return <Play className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">智能体编排</h1>
          <p className="text-gray-600 mt-1">设计和管理智能体工作流编排</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新建编排
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索编排名称或描述..."
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
                <option value="running">运行中</option>
                <option value="paused">已暂停</option>
                <option value="stopped">已停止</option>
                <option value="failed">失败</option>
                <option value="completed">已完成</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 编排列表 */}
      {filteredOrchestrations.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <GitBranch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? '未找到匹配的编排' : '暂无编排'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? '请尝试调整搜索条件或筛选器' 
                : '创建您的第一个智能体编排开始自动化工作流'}
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              创建编排
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrchestrations.map((orchestration) => (
            <Card key={orchestration.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <GitBranch className="w-4 h-4 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {orchestration.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {orchestration.description}
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
                  {/* 状态和基本信息 */}
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(orchestration.status)
                    )}>
                      {getStatusIcon(orchestration.status)}
                      <span className="ml-1">{getStatusText(orchestration.status)}</span>
                    </span>
                    <div className="text-xs text-gray-500">
                      项目: {orchestration.project_name || '未关联'}
                    </div>
                  </div>

                  {/* 编排统计 */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-lg font-semibold text-blue-600">
                        {orchestration.agent_count || 0}
                      </div>
                      <div className="text-xs text-blue-600">智能体</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <div className="text-lg font-semibold text-green-600">
                        {orchestration.task_count || 0}
                      </div>
                      <div className="text-xs text-green-600">任务</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <div className="text-lg font-semibold text-purple-600">
                        {orchestration.execution_count || 0}
                      </div>
                      <div className="text-xs text-purple-600">执行次数</div>
                    </div>
                  </div>

                  {/* 时间信息 */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">创建时间</span>
                      <span className="text-gray-900">
                        {new Date(orchestration.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">最后执行</span>
                      <span className="text-gray-900">
                        {orchestration.last_execution_at 
                          ? new Date(orchestration.last_execution_at).toLocaleDateString()
                          : '从未执行'}
                      </span>
                    </div>
                    {orchestration.next_execution_at && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">下次执行</span>
                        <span className="text-gray-900">
                          {new Date(orchestration.next_execution_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                    {orchestration.status === 'running' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="w-3 h-3 mr-1" />
                        暂停
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        执行
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      编辑
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      查看
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 创建编排模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">创建新编排</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  编排名称
                </label>
                <input
                  type="text"
                  placeholder="输入编排名称"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  编排描述
                </label>
                <textarea
                  placeholder="输入编排描述"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  编排类型
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="sequential">顺序执行</option>
                  <option value="parallel">并行执行</option>
                  <option value="conditional">条件执行</option>
                  <option value="loop">循环执行</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  触发方式
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="manual">手动触发</option>
                  <option value="scheduled">定时触发</option>
                  <option value="event">事件触发</option>
                  <option value="webhook">Webhook 触发</option>
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
                创建编排
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orchestrations;