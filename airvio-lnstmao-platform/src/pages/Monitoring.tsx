/**
 * 实时监控页面组件
 */
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Cpu,
  Database,
  Download,
  Eye,
  Filter,
  HardDrive,
  LineChart,
  Monitor,
  Play,
  RefreshCw,
  Search,
  Server,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricData {
  timestamp: string;
  value: number;
}

interface SystemMetrics {
  cpu: MetricData[];
  memory: MetricData[];
  network: MetricData[];
  disk: MetricData[];
}

const Monitoring: React.FC = () => {
  const { systemStats, fetchSystemStats } = useAppStore();
  
  // 为了修复类型错误，提供默认值
  const safeSystemStats = {
    activeProjects: systemStats?.activeProjects || 0,
    runningAgents: systemStats?.runningAgents || 0,
    todayTasks: systemStats?.todayTasks || 0,
    runningOrchestrations: systemStats?.runningOrchestrations || 0,
    errorCount: systemStats?.errorCount || 0,
    ...systemStats
  };
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // 秒
  const [selectedMetric, setSelectedMetric] = useState('cpu');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: [],
    memory: [],
    network: [],
    disk: []
  });

  useEffect(() => {
    fetchSystemStats();
    generateMockMetrics();
  }, [fetchSystemStats]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchSystemStats();
        updateMetrics();
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchSystemStats]);

  const generateMockMetrics = () => {
    const now = new Date();
    const points = 20;
    const metrics: SystemMetrics = {
      cpu: [],
      memory: [],
      network: [],
      disk: []
    };

    for (let i = points - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000).toISOString();
      metrics.cpu.push({
        timestamp,
        value: Math.random() * 100
      });
      metrics.memory.push({
        timestamp,
        value: Math.random() * 100
      });
      metrics.network.push({
        timestamp,
        value: Math.random() * 1000
      });
      metrics.disk.push({
        timestamp,
        value: Math.random() * 100
      });
    }

    setSystemMetrics(metrics);
  };

  const updateMetrics = () => {
    setSystemMetrics(prev => {
      const now = new Date().toISOString();
      const newMetrics = { ...prev };
      
      // 添加新数据点并移除旧数据点
      Object.keys(newMetrics).forEach(key => {
        const metric = key as keyof SystemMetrics;
        newMetrics[metric] = [
          ...newMetrics[metric].slice(1),
          {
            timestamp: now,
            value: Math.random() * (metric === 'network' ? 1000 : 100)
          }
        ];
      });
      
      return newMetrics;
    });
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'cpu':
        return 'text-blue-600';
      case 'memory':
        return 'text-green-600';
      case 'network':
        return 'text-purple-600';
      case 'disk':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'cpu':
        return <Cpu className="w-4 h-4" />;
      case 'memory':
        return <HardDrive className="w-4 h-4" />;
      case 'network':
        return <Monitor className="w-4 h-4" />;
      case 'disk':
        return <Database className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getCurrentValue = (metric: keyof SystemMetrics) => {
    const data = systemMetrics[metric];
    return data.length > 0 ? data[data.length - 1].value : 0;
  };

  const getHealthStatus = (value: number, metric: string) => {
    const threshold = metric === 'network' ? 800 : 80;
    if (value > threshold) return { status: 'error', color: 'text-red-600', bg: 'bg-red-100' };
    if (value > threshold * 0.7) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'healthy', color: 'text-green-600', bg: 'bg-green-100' };
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和控制 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">实时监控</h1>
          <p className="text-gray-600 mt-1">监控系统性能和智能体运行状态</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">自动刷新</label>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                autoRefresh ? 'bg-blue-600' : 'bg-gray-200'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  autoRefresh ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={10}>10秒</option>
            <option value={30}>30秒</option>
            <option value={60}>1分钟</option>
            <option value={300}>5分钟</option>
          </select>
          <Button variant="outline" onClick={() => {
            fetchSystemStats();
            updateMetrics();
          }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
        </div>
      </div>

      {/* 系统概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">活跃项目</p>
                <p className="text-2xl font-bold text-blue-600">{safeSystemStats.activeProjects}</p>
                <p className="text-xs text-green-600 mt-1">+2 今日新增</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">运行智能体</p>
                <p className="text-2xl font-bold text-green-600">{safeSystemStats.runningAgents}</p>
                <p className="text-xs text-green-600 mt-1">98% 正常运行</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">执行中编排</p>
                <p className="text-2xl font-bold text-purple-600">{safeSystemStats.runningOrchestrations}</p>
                <p className="text-xs text-purple-600 mt-1">5个队列中</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">系统告警</p>
                <p className="text-2xl font-bold text-red-600">{safeSystemStats.errorCount}</p>
                <p className="text-xs text-red-600 mt-1">需要关注</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 性能监控 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 实时指标图表 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">系统性能指标</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cpu">CPU 使用率</option>
                  <option value="memory">内存使用率</option>
                  <option value="network">网络流量</option>
                  <option value="disk">磁盘使用率</option>
                </select>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1h">最近1小时</option>
                  <option value="6h">最近6小时</option>
                  <option value="24h">最近24小时</option>
                  <option value="7d">最近7天</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">实时图表显示区域</p>
                <p className="text-sm text-gray-400 mt-1">
                  当前 {selectedMetric.toUpperCase()}: {getCurrentValue(selectedMetric as keyof SystemMetrics).toFixed(1)}
                  {selectedMetric === 'network' ? ' MB/s' : '%'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 系统健康状态 */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">系统健康状态</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(systemMetrics).map(([metric, data]) => {
                const currentValue = data.length > 0 ? data[data.length - 1].value : 0;
                const health = getHealthStatus(currentValue, metric);
                return (
                  <div key={metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={cn('p-2 rounded-lg', health.bg)}>
                        <div className={health.color}>
                          {getMetricIcon(metric)}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {metric === 'cpu' ? 'CPU' : 
                           metric === 'memory' ? '内存' :
                           metric === 'network' ? '网络' : '磁盘'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentValue.toFixed(1)}{metric === 'network' ? ' MB/s' : '%'}
                        </p>
                      </div>
                    </div>
                    <div className={cn('px-2 py-1 rounded-full text-xs font-medium', health.bg, health.color)}>
                      {health.status === 'healthy' ? '正常' :
                       health.status === 'warning' ? '警告' : '异常'}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 智能体状态和日志 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 智能体状态 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">智能体状态</h3>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                查看全部
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'AI编程助手-001', status: 'active', tasks: 5, cpu: 45 },
                { name: '数据分析师-002', status: 'busy', tasks: 12, cpu: 78 },
                { name: '文档生成器-003', status: 'idle', tasks: 0, cpu: 12 },
                { name: '监控代理-004', status: 'active', tasks: 3, cpu: 23 },
                { name: '自动化助手-005', status: 'error', tasks: 0, cpu: 0 }
              ].map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      agent.status === 'active' ? 'bg-green-500' :
                      agent.status === 'busy' ? 'bg-yellow-500' :
                      agent.status === 'idle' ? 'bg-blue-500' : 'bg-red-500'
                    )} />
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">
                        {agent.tasks} 个任务 · CPU {agent.cpu}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      agent.status === 'active' ? 'bg-green-100 text-green-800' :
                      agent.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                      agent.status === 'idle' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    )}>
                      {agent.status === 'active' ? '活跃' :
                       agent.status === 'busy' ? '忙碌' :
                       agent.status === 'idle' ? '空闲' : '错误'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 系统日志 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">系统日志</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                { time: '14:32:15', level: 'info', message: '智能体 AI编程助手-001 启动成功', source: 'agent-manager' },
                { time: '14:31:42', level: 'warning', message: '数据分析师-002 CPU使用率过高 (78%)', source: 'monitor' },
                { time: '14:30:18', level: 'error', message: '自动化助手-005 连接超时', source: 'network' },
                { time: '14:29:55', level: 'info', message: '编排任务 "数据处理流程" 执行完成', source: 'orchestrator' },
                { time: '14:28:33', level: 'info', message: '新项目 "AI助手平台" 创建成功', source: 'project-manager' },
                { time: '14:27:12', level: 'warning', message: '系统内存使用率达到 85%', source: 'system' },
                { time: '14:26:48', level: 'info', message: '文档生成器-003 进入空闲状态', source: 'agent-manager' },
                { time: '14:25:21', level: 'error', message: '数据库连接异常，正在重试', source: 'database' }
              ].map((log, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                  <div className="text-xs text-gray-500 font-mono w-16 flex-shrink-0">
                    {log.time}
                  </div>
                  <div className={cn(
                    'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                    log.level === 'error' ? 'bg-red-500' :
                    log.level === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{log.message}</p>
                    <p className="text-xs text-gray-500">{log.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Monitoring;