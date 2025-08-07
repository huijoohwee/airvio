/**
 * 控制台首页组件
 */
import React, { useEffect } from 'react';
import { useAppStore } from '@/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Plus,
  Activity,
  Users,
  FolderPlus,
  GitBranch,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Home: React.FC = () => {
  const {
    systemStats,
    recentProjects,
    recentOrchestrations,
    fetchSystemStats,
    fetchRecentProjects,
    fetchRecentOrchestrations
  } = useAppStore();

  useEffect(() => {
    // 加载首页数据
    fetchSystemStats();
    fetchRecentProjects();
    fetchRecentOrchestrations();
  }, [fetchSystemStats, fetchRecentProjects, fetchRecentOrchestrations]);

  const quickActions = [
    {
      title: '创建新项目',
      description: '快速创建一个新的多智能体项目',
      icon: FolderPlus,
      href: '/projects/new',
      color: 'bg-blue-500'
    },
    {
      title: '智能体编排',
      description: '设计和配置智能体工作流',
      icon: GitBranch,
      href: '/orchestrations/new',
      color: 'bg-green-500'
    },
    {
      title: '生成文档',
      description: '自动生成项目文档',
      icon: FileText,
      href: '/documents/generate',
      color: 'bg-purple-500'
    }
  ];

  const statusCards = [
    {
      title: '总项目数',
      value: systemStats.totalProjects,
      icon: FolderPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: '活跃智能体',
      value: systemStats.activeAgents,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: '运行中编排',
      value: systemStats.runningOrchestrations,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: '今日任务',
      value: systemStats.todayTasks,
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">控制台首页</h1>
          <p className="text-gray-600 mt-1">欢迎使用多智能体编排调度中心平台</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            实时监控
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            新建项目
          </Button>
        </div>
      </div>

      {/* 系统状态卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                  </div>
                  <div className={cn('p-3 rounded-full', card.bgColor)}>
                    <Icon className={cn('w-6 h-6', card.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 快速操作 */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              快速操作
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <div className={cn('p-2 rounded-md mr-3', action.color)}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 最近项目 */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FolderPlus className="w-5 h-5 mr-2 text-blue-500" />
              最近项目
            </h3>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <FolderPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">暂无项目</p>
                <Button variant="outline" size="sm" className="mt-3">
                  创建第一个项目
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProjects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                      <p className="text-xs text-gray-500">{project.description}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        )}>
                          {project.status === 'active' ? '运行中' :
                           project.status === 'paused' ? '已暂停' : '已停止'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(project.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 最近编排 */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <GitBranch className="w-5 h-5 mr-2 text-green-500" />
              最近编排
            </h3>
          </CardHeader>
          <CardContent>
            {recentOrchestrations.length === 0 ? (
              <div className="text-center py-8">
                <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">暂无编排</p>
                <Button variant="outline" size="sm" className="mt-3">
                  创建编排
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrchestrations.slice(0, 5).map((orchestration) => (
                  <div
                    key={orchestration.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{orchestration.name}</h4>
                      <p className="text-xs text-gray-500">{orchestration.description}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                          orchestration.status === 'running' ? 'bg-green-100 text-green-800' :
                           orchestration.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          orchestration.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        )}>
                          {orchestration.status === 'running' ? '运行中' :
                           orchestration.status === 'draft' ? '草稿' :
                           orchestration.status === 'completed' ? '已完成' : '失败'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(orchestration.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 系统健康状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              性能概览
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CPU 使用率</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">内存使用率</span>
                <span className="text-sm font-medium">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">任务成功率</span>
                <span className="text-sm font-medium">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              系统状态
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-800">数据库连接</span>
                </div>
                <span className="text-xs text-green-600">正常</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-800">API 服务</span>
                </div>
                <span className="text-xs text-green-600">正常</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-yellow-800">任务队列</span>
                </div>
                <span className="text-xs text-yellow-600">繁忙</span>
              </div>
              
              {systemStats.errorCount > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm text-red-800">错误警告</span>
                  </div>
                  <span className="text-xs text-red-600">{systemStats.errorCount} 个错误</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;