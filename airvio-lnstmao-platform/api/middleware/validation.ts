/**
 * 请求验证中间件
 * 使用Zod进行请求数据验证
 */
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

/**
 * 创建验证中间件
 * @param schema Zod验证模式
 * @param target 验证目标 ('body' | 'query' | 'params')
 */
export const validateRequest = (schema: ZodSchema, target: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const dataToValidate = req[target];
      const validatedData = schema.parse(dataToValidate);
      
      // 将验证后的数据替换原始数据
      req[target] = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Invalid request data'
        });
      }
    }
  };
};

/**
 * 常用的验证模式
 */
export const commonSchemas = {
  // ID参数验证
  idParam: z.object({
    id: z.string().uuid('Invalid ID format')
  }),
  
  // 分页查询验证
  pagination: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional().default('desc')
  }),
  
  // 项目创建验证
  createProject: z.object({
    name: z.string().min(1, 'Project name is required').max(100, 'Project name too long'),
    description: z.string().optional(),
    mvp_config: z.object({
      type: z.string(),
      requirements: z.array(z.string()).optional(),
      timeline: z.string().optional()
    }).optional()
  }),
  
  // 智能体创建验证
  createAgent: z.object({
    name: z.string().min(1, 'Agent name is required').max(100, 'Agent name too long'),
    description: z.string().optional(),
    type: z.string().min(1, 'Agent type is required'),
    project_id: z.string().uuid('Invalid project ID'),
    config: z.record(z.any()).optional(),
    capabilities: z.array(z.string()).optional()
  }),
  
  // 编排创建验证
  createOrchestration: z.object({
    name: z.string().min(1, 'Orchestration name is required').max(100, 'Orchestration name too long'),
    description: z.string().optional(),
    project_id: z.string().uuid('Invalid project ID'),
    type: z.string().optional(),
    trigger: z.string().optional(),
    workflow: z.record(z.any()).optional()
  }),
  
  // 文档创建验证
  createDocument: z.object({
    title: z.string().min(1, 'Document title is required').max(200, 'Document title too long'),
    type: z.string().min(1, 'Document type is required'),
    project_id: z.string().uuid('Invalid project ID'),
    template_id: z.string().uuid('Invalid template ID').optional(),
    content: z.string().optional(),
    metadata: z.record(z.any()).optional()
  }),
  
  // 动态字段创建验证
  createDynamicField: z.object({
    name: z.string().min(1, 'Field name is required').max(100, 'Field name too long'),
    type: z.enum(['text', 'number', 'boolean', 'date', 'select', 'multiselect']),
    label: z.string().min(1, 'Field label is required'),
    description: z.string().optional(),
    required: z.boolean().optional().default(false),
    default_value: z.any().optional(),
    options: z.array(z.string()).optional(),
    validation_rules: z.record(z.any()).optional()
  })
};

/**
 * 验证UUID格式
 */
export const validateUUID = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  
  if (!id || !z.string().uuid().safeParse(id).success) {
    res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
    return;
  }
  
  next();
};

/**
 * 验证分页参数
 */
export const validatePagination = validateRequest(commonSchemas.pagination, 'query');