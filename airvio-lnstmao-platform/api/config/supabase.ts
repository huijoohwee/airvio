/**
 * Supabase 客户端配置
 * 用于后端API与Supabase数据库的连接
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// 从环境变量获取Supabase配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Please check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

// 创建Supabase客户端实例
// 使用SERVICE_ROLE_KEY以获得完整的数据库访问权限
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 数据库表名常量
export const TABLES = {
  USERS: 'users',
  PROJECTS: 'projects',
  AGENTS: 'agents',
  ORCHESTRATIONS: 'orchestrations',
  DOCUMENTS: 'documents',
  DYNAMIC_FIELDS: 'dynamic_fields',
  DEPLOYMENTS: 'deployments',
  SYSTEM_LOGS: 'system_logs'
} as const;

// 常用的数据库查询选项
export const DB_OPTIONS = {
  // 默认分页大小
  DEFAULT_PAGE_SIZE: 10,
  // 最大分页大小
  MAX_PAGE_SIZE: 100,
  // 默认排序
  DEFAULT_ORDER: { column: 'created_at', ascending: false }
} as const;

/**
 * 通用的分页查询函数
 */
export const paginatedQuery = async (
  tableName: string,
  page: number = 1,
  limit: number = DB_OPTIONS.DEFAULT_PAGE_SIZE,
  filters: Record<string, any> = {},
  orderBy: { column: string; ascending: boolean } = DB_OPTIONS.DEFAULT_ORDER
) => {
  // 确保分页参数有效
  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), DB_OPTIONS.MAX_PAGE_SIZE);
  const offset = (validPage - 1) * validLimit;

  let query = supabase
    .from(tableName)
    .select('*', { count: 'exact' })
    .order(orderBy.column, { ascending: orderBy.ascending })
    .range(offset, offset + validLimit - 1);

  // 应用过滤条件
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query = query.eq(key, value);
    }
  });

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data,
    pagination: {
      page: validPage,
      limit: validLimit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / validLimit)
    }
  };
};

/**
 * 检查数据库连接
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    return !error;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};