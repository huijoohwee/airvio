/**
 * 文档生成页面组件
 */
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Plus,
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Edit,
  Copy,
  Trash2,
  Clock,
  User,
  Tag,
  MoreVertical,
  Wand2,
  Settings,
  Upload,
  BookOpen,
  FileCode,
  FileImage,
  FileSpreadsheet,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  title: string;
  type: string;
  status: string;
  content: string;
  template_id?: string;
  project_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  file_size?: number;
  download_count?: number;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // 模拟获取文档数据
    const mockDocuments: Document[] = [
      {
        id: '1',
        title: 'AI助手平台技术文档',
        type: 'technical',
        status: 'completed',
        content: '详细的技术实现文档...',
        template_id: 'tech-template-1',
        project_id: 'project-1',
        created_by: 'AI文档生成器',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T14:20:00Z',
        file_size: 2048,
        download_count: 15
      },
      {
        id: '2',
        title: '用户操作手册',
        type: 'user_manual',
        status: 'generating',
        content: '用户使用指南...',
        template_id: 'manual-template-1',
        project_id: 'project-1',
        created_by: 'AI文档生成器',
        created_at: '2024-01-15T09:15:00Z',
        updated_at: '2024-01-15T09:15:00Z',
        file_size: 1024,
        download_count: 8
      },
      {
        id: '3',
        title: 'API接口文档',
        type: 'api',
        status: 'completed',
        content: 'RESTful API文档...',
        template_id: 'api-template-1',
        project_id: 'project-2',
        created_by: 'AI文档生成器',
        created_at: '2024-01-14T16:45:00Z',
        updated_at: '2024-01-14T18:30:00Z',
        file_size: 3072,
        download_count: 23
      },
      {
        id: '4',
        title: '部署指南',
        type: 'deployment',
        status: 'failed',
        content: '系统部署说明...',
        template_id: 'deploy-template-1',
        project_id: 'project-1',
        created_by: 'AI文档生成器',
        created_at: '2024-01-14T14:20:00Z',
        updated_at: '2024-01-14T14:25:00Z',
        file_size: 0,
        download_count: 0
      }
    ];
    setDocuments(mockDocuments);
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'generating':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'generating':
        return '生成中';
      case 'failed':
        return '失败';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'generating':
        return <RefreshCw className="w-3 h-3 animate-spin" />;
      case 'failed':
        return <XCircle className="w-3 h-3" />;
      case 'draft':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <FileCode className="w-4 h-4 text-blue-500" />;
      case 'user_manual':
        return <BookOpen className="w-4 h-4 text-green-500" />;
      case 'api':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'deployment':
        return <Settings className="w-4 h-4 text-orange-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'technical':
        return '技术文档';
      case 'user_manual':
        return '用户手册';
      case 'api':
        return 'API文档';
      case 'deployment':
        return '部署文档';
      default:
        return '其他';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">文档生成</h1>
          <p className="text-gray-600 mt-1">自动生成和管理项目文档</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowTemplateModal(true)}>
            <Settings className="w-4 h-4 mr-2" />
            模板管理
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            生成文档
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总文档数</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已完成</p>
                <p className="text-2xl font-bold text-green-600">
                  {documents.filter(d => d.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">生成中</p>
                <p className="text-2xl font-bold text-blue-600">
                  {documents.filter(d => d.status === 'generating').length}
                </p>
              </div>
              <RefreshCw className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总下载量</p>
                <p className="text-2xl font-bold text-purple-600">
                  {documents.reduce((sum, d) => sum + (d.download_count || 0), 0)}
                </p>
              </div>
              <Download className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索文档标题或内容..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">全部类型</option>
                  <option value="technical">技术文档</option>
                  <option value="user_manual">用户手册</option>
                  <option value="api">API文档</option>
                  <option value="deployment">部署文档</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">全部状态</option>
                  <option value="completed">已完成</option>
                  <option value="generating">生成中</option>
                  <option value="failed">失败</option>
                  <option value="draft">草稿</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setSelectedView('grid')}
                className={cn(
                  'p-2 rounded-md',
                  selectedView === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                </div>
              </button>
              <button
                onClick={() => setSelectedView('list')}
                className={cn(
                  'p-2 rounded-md',
                  selectedView === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <div className="w-4 h-4 space-y-1">
                  <div className="h-0.5 bg-current rounded" />
                  <div className="h-0.5 bg-current rounded" />
                  <div className="h-0.5 bg-current rounded" />
                </div>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 文档列表 */}
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' ? '未找到匹配的文档' : '暂无文档'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                ? '请尝试调整搜索条件或筛选器' 
                : '开始生成您的第一个文档'}
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Wand2 className="w-4 h-4 mr-2" />
              生成文档
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={cn(
          selectedView === 'grid' 
            ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'space-y-4'
        )}>
          {filteredDocuments.map((document) => (
            selectedView === 'grid' ? (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(document.type)}
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                          {document.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        {getTypeText(document.type)}
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
                    {/* 状态 */}
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(document.status)
                      )}>
                        {getStatusIcon(document.status)}
                        <span className="ml-1">{getStatusText(document.status)}</span>
                      </span>
                      <div className="text-xs text-gray-500">
                        {formatFileSize(document.file_size || 0)}
                      </div>
                    </div>

                    {/* 统计信息 */}
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-lg font-semibold text-blue-600">
                          {document.download_count || 0}
                        </div>
                        <div className="text-xs text-blue-600">下载次数</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-lg font-semibold text-green-600">
                          {new Date(document.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-green-600">创建日期</div>
                      </div>
                    </div>

                    {/* 创建信息 */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">创建者</span>
                        <span className="text-gray-900">{document.created_by}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">更新时间</span>
                        <span className="text-gray-900">
                          {new Date(document.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                      <Button variant="outline" size="sm" disabled={document.status !== 'completed'}>
                        <Download className="w-3 h-3 mr-1" />
                        下载
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        预览
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        编辑
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card key={document.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getTypeIcon(document.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {document.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>{getTypeText(document.type)}</span>
                          <span>·</span>
                          <span>{formatFileSize(document.file_size || 0)}</span>
                          <span>·</span>
                          <span>{document.download_count || 0} 次下载</span>
                          <span>·</span>
                          <span>{new Date(document.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(document.status)
                      )}>
                        {getStatusIcon(document.status)}
                        <span className="ml-1">{getStatusText(document.status)}</span>
                      </span>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" disabled={document.status !== 'completed'}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      )}

      {/* 生成文档模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">生成新文档</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文档标题
                </label>
                <input
                  type="text"
                  placeholder="输入文档标题"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文档类型
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="technical">技术文档</option>
                  <option value="user_manual">用户手册</option>
                  <option value="api">API文档</option>
                  <option value="deployment">部署文档</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  关联项目
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">选择项目</option>
                  <option value="project1">AI助手平台</option>
                  <option value="project2">数据分析系统</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文档模板
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="template1">标准技术文档模板</option>
                  <option value="template2">用户手册模板</option>
                  <option value="template3">API文档模板</option>
                  <option value="custom">自定义模板</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  生成方式
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="generation" value="auto" className="mr-2" defaultChecked />
                    <span className="text-sm">自动生成 - 基于项目代码和配置</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="generation" value="template" className="mr-2" />
                    <span className="text-sm">模板生成 - 使用预定义模板</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="generation" value="manual" className="mr-2" />
                    <span className="text-sm">手动创建 - 空白文档</span>
                  </label>
                </div>
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
                <Wand2 className="w-4 h-4 mr-2" />
                开始生成
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 模板管理模态框 */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">文档模板管理</h3>
            <div className="space-y-4">
              {[
                { id: '1', name: '标准技术文档模板', type: 'technical', usage: 15 },
                { id: '2', name: '用户手册模板', type: 'user_manual', usage: 8 },
                { id: '3', name: 'API文档模板', type: 'api', usage: 23 },
                { id: '4', name: '部署文档模板', type: 'deployment', usage: 5 }
              ].map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(template.type)}
                    <div>
                      <p className="font-medium text-gray-900">{template.name}</p>
                      <p className="text-sm text-gray-500">
                        {getTypeText(template.type)} · 使用 {template.usage} 次
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      编辑
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-3 h-3 mr-1" />
                      复制
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                新建模板
              </Button>
              <Button onClick={() => setShowTemplateModal(false)}>
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;