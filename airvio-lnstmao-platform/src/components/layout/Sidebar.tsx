/**
 * 侧边栏组件
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import {
  Home,
  FolderPlus,
  GitBranch,
  Activity,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    name: '控制台首页',
    href: '/',
    icon: Home
  },
  {
    name: '项目管理',
    href: '/projects',
    icon: FolderPlus
  },
  {
    name: '智能体编排',
    href: '/orchestrations',
    icon: GitBranch
  },
  {
    name: '智能体管理',
    href: '/agents',
    icon: Bot
  },
  {
    name: '实时监控',
    href: '/monitoring',
    icon: Activity
  },
  {
    name: '文档生成',
    href: '/documents',
    icon: FileText
  },
  {
    name: '系统设置',
    href: '/settings',
    icon: Settings
  }
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, systemStats } = useAppStore();

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo区域 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AirVio</h1>
              <p className="text-xs text-gray-500">多智能体平台</p>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* 导航菜单 */}
      <nav className="mt-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            // 获取对应的徽章数字
            let badgeCount = '';
            if (item.href === '/agents') {
              badgeCount = systemStats.activeAgents > 0 ? systemStats.activeAgents.toString() : '';
            } else if (item.href === '/orchestrations') {
              badgeCount = systemStats.runningOrchestrations > 0 ? systemStats.runningOrchestrations.toString() : '';
            } else if (item.href === '/monitoring' && systemStats.errorCount > 0) {
              badgeCount = systemStats.errorCount.toString();
            }

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    'hover:bg-blue-50 hover:text-blue-700',
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700'
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <Icon className={cn('flex-shrink-0', sidebarCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3')} />
                  
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {badgeCount && (
                        <span className={cn(
                          'ml-2 px-2 py-0.5 text-xs rounded-full',
                          item.href === '/monitoring' && systemStats.errorCount > 0
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        )}>
                          {badgeCount}
                        </span>
                      )}
                    </>
                  )}
                  
                  {sidebarCollapsed && badgeCount && (
                    <div className={cn(
                      'absolute left-8 top-1 w-2 h-2 rounded-full',
                      item.href === '/monitoring' && systemStats.errorCount > 0
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    )} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 底部状态信息 */}
      {!sidebarCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">系统状态</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">活跃项目</span>
                <span className="font-medium text-gray-900">{systemStats.totalProjects}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">运行智能体</span>
                <span className="font-medium text-green-600">{systemStats.activeAgents}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">执行中编排</span>
                <span className="font-medium text-blue-600">{systemStats.runningOrchestrations}</span>
              </div>
              {systemStats.errorCount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">错误数量</span>
                  <span className="font-medium text-red-600">{systemStats.errorCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;