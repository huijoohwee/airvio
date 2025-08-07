/**
 * 系统设置页面组件
 */
import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  Globe,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Check,
  X,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Zap,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    desktop: true
  });
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('zh-CN');

  const tabs = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'appearance', label: '外观设置', icon: Palette },
    { id: 'integrations', label: '集成配置', icon: Zap },
    { id: 'system', label: '系统配置', icon: SettingsIcon },
    { id: 'advanced', label: '高级设置', icon: Server }
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">基本信息</h3>
          <p className="text-sm text-gray-600">管理您的个人资料信息</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                上传头像
              </Button>
              <p className="text-xs text-gray-500 mt-1">支持 JPG、PNG 格式，最大 2MB</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓名
              </label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手机号
              </label>
              <input
                type="tel"
                placeholder="请输入手机号"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                职位
              </label>
              <input
                type="text"
                placeholder="请输入职位"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              个人简介
            </label>
            <textarea
              rows={3}
              placeholder="请输入个人简介"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              保存更改
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">密码设置</h3>
          <p className="text-sm text-gray-600">更改您的登录密码</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              当前密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              新密码
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              确认新密码
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">密码要求：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>至少 8 个字符</li>
                  <li>包含大小写字母</li>
                  <li>包含数字和特殊字符</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button>
              <Lock className="w-4 h-4 mr-2" />
              更新密码
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">两步验证</h3>
          <p className="text-sm text-gray-600">增强账户安全性</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">短信验证</p>
                <p className="text-sm text-gray-500">通过短信接收验证码</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              启用
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">身份验证器</p>
                <p className="text-sm text-gray-500">使用 Google Authenticator 等应用</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              配置
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">API 密钥</h3>
          <p className="text-sm text-gray-600">管理您的 API 访问密钥</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { name: '生产环境密钥', key: 'sk_live_****', created: '2024-01-15', status: 'active' },
              { name: '测试环境密钥', key: 'sk_test_****', created: '2024-01-10', status: 'active' }
            ].map((apiKey, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{apiKey.name}</p>
                  <p className="text-sm text-gray-500 font-mono">{apiKey.key}</p>
                  <p className="text-xs text-gray-400">创建于 {apiKey.created}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    活跃
                  </span>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              生成新密钥
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">通知偏好</h3>
          <p className="text-sm text-gray-600">选择您希望接收通知的方式</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {[
              { key: 'email', label: '邮件通知', icon: Mail, description: '通过邮件接收重要通知' },
              { key: 'push', label: '推送通知', icon: Bell, description: '浏览器推送通知' },
              { key: 'sms', label: '短信通知', icon: Smartphone, description: '通过短信接收紧急通知' },
              { key: 'desktop', label: '桌面通知', icon: Monitor, description: '系统桌面通知' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">通知类型</h3>
          <p className="text-sm text-gray-600">选择您希望接收的通知类型</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { label: '项目状态更新', description: '项目创建、完成等状态变化' },
              { label: '智能体活动', description: '智能体启动、停止、错误等' },
              { label: '系统维护', description: '系统升级、维护通知' },
              { label: '安全警告', description: '登录异常、安全事件' },
              { label: '账单提醒', description: '费用变化、账单到期' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">主题设置</h3>
          <p className="text-sm text-gray-600">选择您喜欢的界面主题</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'light', label: '浅色主题', icon: Sun },
              { key: 'dark', label: '深色主题', icon: Moon },
              { key: 'system', label: '跟随系统', icon: Monitor }
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => setTheme(item.key)}
                className={cn(
                  'p-4 border-2 rounded-lg cursor-pointer transition-colors',
                  theme === item.key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex flex-col items-center space-y-2">
                  <item.icon className={cn(
                    'w-8 h-8',
                    theme === item.key ? 'text-blue-600' : 'text-gray-500'
                  )} />
                  <p className={cn(
                    'font-medium',
                    theme === item.key ? 'text-blue-900' : 'text-gray-900'
                  )}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">语言设置</h3>
          <p className="text-sm text-gray-600">选择界面显示语言</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              界面语言
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="zh-CN">简体中文</option>
              <option value="zh-TW">繁體中文</option>
              <option value="en-US">English (US)</option>
              <option value="ja-JP">日本語</option>
              <option value="ko-KR">한국어</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">显示设置</h3>
          <p className="text-sm text-gray-600">自定义界面显示选项</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {[
              { label: '显示侧边栏', description: '在页面左侧显示导航侧边栏' },
              { label: '紧凑模式', description: '减少界面元素间距，显示更多内容' },
              { label: '显示动画', description: '启用界面过渡动画效果' },
              { label: '显示提示', description: '显示操作提示和帮助信息' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">第三方集成</h3>
          <p className="text-sm text-gray-600">连接外部服务和工具</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {[
              { name: 'GitHub', status: 'connected', description: '代码仓库集成' },
              { name: 'Slack', status: 'disconnected', description: '团队协作通知' },
              { name: 'Jira', status: 'connected', description: '项目管理集成' },
              { name: 'Discord', status: 'disconnected', description: '社区通知' }
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{integration.name}</p>
                    <p className="text-sm text-gray-500">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    integration.status === 'connected'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  )}>
                    {integration.status === 'connected' ? '已连接' : '未连接'}
                  </span>
                  <Button variant="outline" size="sm">
                    {integration.status === 'connected' ? '断开' : '连接'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Webhook 配置</h3>
          <p className="text-sm text-gray-600">配置事件回调地址</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { url: 'https://api.example.com/webhook', events: ['project.created', 'agent.started'], status: 'active' },
              { url: 'https://hooks.slack.com/services/...', events: ['system.error'], status: 'inactive' }
            ].map((webhook, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900 font-mono text-sm">{webhook.url}</p>
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                      webhook.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    )}>
                      {webhook.status === 'active' ? '活跃' : '停用'}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {webhook.events.map((event, eventIndex) => (
                    <span key={eventIndex} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              添加 Webhook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">系统信息</h3>
          <p className="text-sm text-gray-600">查看系统运行状态和信息</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">系统版本</span>
                <span className="font-medium">v1.2.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">运行时间</span>
                <span className="font-medium">15 天 8 小时</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最后更新</span>
                <span className="font-medium">2024-01-15</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">数据库状态</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  正常
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">API 状态</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  正常
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">存储状态</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                  警告
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">资源使用情况</h3>
          <p className="text-sm text-gray-600">系统资源实时监控</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'CPU 使用率', value: '45%', icon: Cpu, color: 'blue' },
              { label: '内存使用', value: '2.1/8GB', icon: MemoryStick, color: 'green' },
              { label: '磁盘空间', value: '156/500GB', icon: HardDrive, color: 'yellow' },
              { label: '网络流量', value: '1.2MB/s', icon: Network, color: 'purple' }
            ].map((metric, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={cn(
                    'w-5 h-5',
                    metric.color === 'blue' && 'text-blue-500',
                    metric.color === 'green' && 'text-green-500',
                    metric.color === 'yellow' && 'text-yellow-500',
                    metric.color === 'purple' && 'text-purple-500'
                  )} />
                  <span className="text-lg font-semibold">{metric.value}</span>
                </div>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">系统操作</h3>
          <p className="text-sm text-gray-600">系统维护和管理操作</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-2">
                <Download className="w-4 h-4" />
                <span className="font-medium">导出数据</span>
              </div>
              <p className="text-sm text-gray-500 text-left">导出系统数据和配置</p>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-2">
                <Upload className="w-4 h-4" />
                <span className="font-medium">导入数据</span>
              </div>
              <p className="text-sm text-gray-500 text-left">从备份文件恢复数据</p>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-2">
                <RefreshCw className="w-4 h-4" />
                <span className="font-medium">重启服务</span>
              </div>
              <p className="text-sm text-gray-500 text-left">重启系统服务</p>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4" />
                <span className="font-medium">系统诊断</span>
              </div>
              <p className="text-sm text-gray-500 text-left">运行系统健康检查</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">实验性功能</h3>
          <p className="text-sm text-gray-600">启用测试中的新功能</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium mb-1">注意：</p>
                <p>实验性功能可能不稳定，请谨慎在生产环境中使用。</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'AI 智能推荐', description: '基于使用习惯的智能功能推荐' },
              { label: '高级分析', description: '更详细的数据分析和洞察' },
              { label: '实时协作', description: '多用户实时协作编辑' },
              { label: '语音控制', description: '语音命令操作界面' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{feature.label}</p>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">开发者选项</h3>
          <p className="text-sm text-gray-600">面向开发者的高级配置</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API 基础地址
              </label>
              <input
                type="url"
                defaultValue="https://api.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                调试级别
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="error">错误</option>
                <option value="warn">警告</option>
                <option value="info">信息</option>
                <option value="debug">调试</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">启用调试模式</p>
                <p className="text-sm text-gray-500">显示详细的调试信息</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">危险操作</h3>
          <p className="text-sm text-gray-600">不可逆的系统操作</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
              <div className="text-sm text-red-700">
                <p className="font-medium mb-1">警告：</p>
                <p>以下操作将永久删除数据，请确保已备份重要信息。</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              清空所有项目数据
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              重置系统配置
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              删除账户
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'integrations':
        return renderIntegrationSettings();
      case 'system':
        return renderSystemSettings();
      case 'advanced':
        return renderAdvancedSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
        <p className="text-gray-600 mt-1">管理您的账户和系统配置</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 侧边栏导航 */}
        <div className="lg:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors',
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;