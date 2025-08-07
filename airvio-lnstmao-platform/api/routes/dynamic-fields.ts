/**
 * 动态字段管理API路由
 * 处理动态字段的创建、查询、更新等操作
 */
import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

/**
 * 获取所有动态字段
 * GET /api/dynamic-fields
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, type, is_active } = req.query;

    let query = supabase
      .from('dynamic_fields')
      .select('*')
      .order('category', { ascending: true })
      .order('order_index', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }
    if (type) {
      query = query.eq('type', type);
    }
    if (is_active !== undefined) {
      query = query.eq('is_active', is_active === 'true');
    }

    const { data: fields, error } = await query;

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dynamic fields'
    });
  }
});

/**
 * 根据分类获取动态字段
 * GET /api/dynamic-fields/category/:category
 */
router.get('/category/:category', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const { is_active = 'true' } = req.query;

    const { data: fields, error } = await supabase
      .from('dynamic_fields')
      .select('*')
      .eq('category', category)
      .eq('is_active', is_active === 'true')
      .order('order_index', { ascending: true });

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dynamic fields by category'
    });
  }
});

/**
 * 根据ID获取动态字段详情
 * GET /api/dynamic-fields/:id
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { data: field, error } = await supabase
      .from('dynamic_fields')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({
        success: false,
        error: 'Dynamic field not found'
      });
      return;
    }

    res.json({
      success: true,
      data: field
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dynamic field'
    });
  }
});

/**
 * 创建新的动态字段
 * POST /api/dynamic-fields
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      label,
      type,
      category,
      description,
      default_value,
      validation_rules,
      options,
      order_index,
      is_required,
      is_active
    } = req.body;

    // 验证必填字段
    if (!name || !label || !type || !category) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, label, type, category'
      });
      return;
    }

    // 检查字段名是否已存在
    const { data: existingField } = await supabase
      .from('dynamic_fields')
      .select('id')
      .eq('name', name)
      .eq('category', category)
      .single();

    if (existingField) {
      res.status(409).json({
        success: false,
        error: 'Field name already exists in this category'
      });
      return;
    }

    const { data: field, error } = await supabase
      .from('dynamic_fields')
      .insert({
        name,
        label,
        type,
        category,
        description,
        default_value,
        validation_rules: validation_rules || {},
        options: options || [],
        order_index: order_index || 0,
        is_required: is_required || false,
        is_active: is_active !== false
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: field
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create dynamic field'
    });
  }
});

/**
 * 更新动态字段
 * PUT /api/dynamic-fields/:id
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      label,
      type,
      category,
      description,
      default_value,
      validation_rules,
      options,
      order_index,
      is_required,
      is_active
    } = req.body;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (name !== undefined) updateData.name = name;
    if (label !== undefined) updateData.label = label;
    if (type !== undefined) updateData.type = type;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (default_value !== undefined) updateData.default_value = default_value;
    if (validation_rules !== undefined) updateData.validation_rules = validation_rules;
    if (options !== undefined) updateData.options = options;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (is_required !== undefined) updateData.is_required = is_required;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data: field, error } = await supabase
      .from('dynamic_fields')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: field
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update dynamic field'
    });
  }
});

/**
 * 批量更新字段顺序
 * PUT /api/dynamic-fields/reorder
 */
router.put('/reorder', async (req: Request, res: Response): Promise<void> => {
  try {
    const { fields } = req.body;

    if (!Array.isArray(fields)) {
      res.status(400).json({
        success: false,
        error: 'Fields must be an array'
      });
      return;
    }

    // 批量更新字段顺序
    const updatePromises = fields.map((field: any, index: number) => {
      return supabase
        .from('dynamic_fields')
        .update({
          order_index: index,
          updated_at: new Date().toISOString()
        })
        .eq('id', field.id);
    });

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Field order updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to reorder fields'
    });
  }
});

/**
 * 获取字段分类列表
 * GET /api/dynamic-fields/categories
 */
router.get('/categories', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: categories, error } = await supabase
      .from('dynamic_fields')
      .select('category')
      .eq('is_active', true);

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    // 去重并排序
    const uniqueCategories = [...new Set(categories?.map(item => item.category) || [])]
      .sort();

    res.json({
      success: true,
      data: uniqueCategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch field categories'
    });
  }
});

/**
 * 验证字段值
 * POST /api/dynamic-fields/validate
 */
router.post('/validate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { field_id, value } = req.body;

    if (!field_id) {
      res.status(400).json({
        success: false,
        error: 'Missing required field: field_id'
      });
      return;
    }

    // 获取字段配置
    const { data: field, error } = await supabase
      .from('dynamic_fields')
      .select('*')
      .eq('id', field_id)
      .single();

    if (error || !field) {
      res.status(404).json({
        success: false,
        error: 'Field not found'
      });
      return;
    }

    // 验证逻辑
    const validationResult = validateFieldValue(field, value);

    res.json({
      success: true,
      data: {
        field_id,
        value,
        is_valid: validationResult.isValid,
        errors: validationResult.errors
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to validate field value'
    });
  }
});

/**
 * 获取字段使用统计
 * GET /api/dynamic-fields/stats
 */
router.get('/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: fields, error } = await supabase
      .from('dynamic_fields')
      .select('category, type, is_active');

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    // 统计数据
    const stats = {
      total_fields: fields?.length || 0,
      active_fields: fields?.filter(f => f.is_active).length || 0,
      inactive_fields: fields?.filter(f => !f.is_active).length || 0,
      by_category: {},
      by_type: {}
    };

    // 按分类统计
    fields?.forEach(field => {
      const category = field.category;
      if (!stats.by_category[category]) {
        stats.by_category[category] = { total: 0, active: 0 };
      }
      stats.by_category[category].total++;
      if (field.is_active) {
        stats.by_category[category].active++;
      }
    });

    // 按类型统计
    fields?.forEach(field => {
      const type = field.type;
      if (!stats.by_type[type]) {
        stats.by_type[type] = { total: 0, active: 0 };
      }
      stats.by_type[type].total++;
      if (field.is_active) {
        stats.by_type[type].active++;
      }
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch field statistics'
    });
  }
});

/**
 * 删除动态字段
 * DELETE /api/dynamic-fields/:id
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('dynamic_fields')
      .delete()
      .eq('id', id);

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      message: 'Dynamic field deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete dynamic field'
    });
  }
});

// 字段值验证辅助函数
function validateFieldValue(field: any, value: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 必填验证
  if (field.is_required && (value === null || value === undefined || value === '')) {
    errors.push(`${field.label} is required`);
  }

  // 如果值为空且非必填，跳过其他验证
  if (!field.is_required && (value === null || value === undefined || value === '')) {
    return { isValid: true, errors: [] };
  }

  // 类型验证
  switch (field.type) {
    case 'text':
    case 'textarea':
      if (typeof value !== 'string') {
        errors.push(`${field.label} must be a string`);
      }
      break;
    case 'number':
      if (typeof value !== 'number' && !Number.isFinite(Number(value))) {
        errors.push(`${field.label} must be a valid number`);
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(value))) {
        errors.push(`${field.label} must be a valid email address`);
      }
      break;
    case 'url':
      try {
        new URL(String(value));
      } catch {
        errors.push(`${field.label} must be a valid URL`);
      }
      break;
    case 'select':
      if (field.options && !field.options.includes(value)) {
        errors.push(`${field.label} must be one of: ${field.options.join(', ')}`);
      }
      break;
    case 'multiselect':
      if (!Array.isArray(value)) {
        errors.push(`${field.label} must be an array`);
      } else if (field.options) {
        const invalidOptions = value.filter(v => !field.options.includes(v));
        if (invalidOptions.length > 0) {
          errors.push(`${field.label} contains invalid options: ${invalidOptions.join(', ')}`);
        }
      }
      break;
    case 'boolean':
      if (typeof value !== 'boolean') {
        errors.push(`${field.label} must be a boolean`);
      }
      break;
    case 'date':
      if (isNaN(Date.parse(String(value)))) {
        errors.push(`${field.label} must be a valid date`);
      }
      break;
  }

  // 自定义验证规则
  if (field.validation_rules) {
    const rules = field.validation_rules;

    // 最小长度
    if (rules.minLength && String(value).length < rules.minLength) {
      errors.push(`${field.label} must be at least ${rules.minLength} characters long`);
    }

    // 最大长度
    if (rules.maxLength && String(value).length > rules.maxLength) {
      errors.push(`${field.label} must be no more than ${rules.maxLength} characters long`);
    }

    // 最小值
    if (rules.min && Number(value) < rules.min) {
      errors.push(`${field.label} must be at least ${rules.min}`);
    }

    // 最大值
    if (rules.max && Number(value) > rules.max) {
      errors.push(`${field.label} must be no more than ${rules.max}`);
    }

    // 正则表达式
    if (rules.pattern && !new RegExp(rules.pattern).test(String(value))) {
      errors.push(`${field.label} format is invalid`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export default router;