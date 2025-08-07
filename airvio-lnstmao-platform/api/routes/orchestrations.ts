/**
 * 智能体编排管理API路由
 * 处理智能体编排的创建、查询、更新、执行等操作
 */
import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

/**
 * 获取所有智能体编排
 * GET /api/orchestrations
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { project_id } = req.query;

    let query = supabase
      .from('orchestrations')
      .select(`
        *,
        agents(count),
        tasks(count)
      `)
      .order('created_at', { ascending: false });

    if (project_id) {
      query = query.eq('project_id', project_id);
    }

    const { data: orchestrations, error } = await query;

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: orchestrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orchestrations'
    });
  }
});

/**
 * 根据ID获取智能体编排详情
 * GET /api/orchestrations/:id
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { data: orchestration, error } = await supabase
      .from('orchestrations')
      .select(`
        *,
        agents(*),
        tasks(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({
        success: false,
        error: 'Orchestration not found'
      });
      return;
    }

    res.json({
      success: true,
      data: orchestration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orchestration'
    });
  }
});

/**
 * 创建新的智能体编排
 * POST /api/orchestrations
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      project_id,
      workflow_config,
      trigger_config,
      user_id
    } = req.body;

    // 验证必填字段
    if (!name || !project_id || !user_id) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, project_id, user_id'
      });
      return;
    }

    const { data: orchestration, error } = await supabase
      .from('orchestrations')
      .insert({
        name,
        description,
        project_id,
        workflow_config: workflow_config || {},
        trigger_config: trigger_config || {},
        user_id,
        status: 'draft'
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
      data: orchestration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create orchestration'
    });
  }
});

/**
 * 更新智能体编排
 * PUT /api/orchestrations/:id
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      workflow_config,
      trigger_config,
      status
    } = req.body;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (workflow_config !== undefined) updateData.workflow_config = workflow_config;
    if (trigger_config !== undefined) updateData.trigger_config = trigger_config;
    if (status !== undefined) updateData.status = status;

    const { data: orchestration, error } = await supabase
      .from('orchestrations')
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
      data: orchestration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update orchestration'
    });
  }
});

/**
 * 执行智能体编排
 * POST /api/orchestrations/:id/execute
 */
router.post('/:id/execute', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { input_data } = req.body;

    // 获取编排配置
    const { data: orchestration, error: fetchError } = await supabase
      .from('orchestrations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !orchestration) {
      res.status(404).json({
        success: false,
        error: 'Orchestration not found'
      });
      return;
    }

    // 更新编排状态为运行中
    const { error: updateError } = await supabase
      .from('orchestrations')
      .update({
        status: 'running',
        last_executed_at: new Date().toISOString()
      })
      .eq('id', id);

    if (updateError) {
      res.status(500).json({
        success: false,
        error: 'Failed to update orchestration status'
      });
      return;
    }

    // 创建执行任务
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .insert({
        orchestration_id: id,
        project_id: orchestration.project_id,
        name: `Execute ${orchestration.name}`,
        type: 'orchestration_execution',
        config: {
          input_data: input_data || {},
          workflow_config: orchestration.workflow_config
        },
        status: 'pending'
      })
      .select()
      .single();

    if (taskError) {
      res.status(500).json({
        success: false,
        error: 'Failed to create execution task'
      });
      return;
    }

    // 这里可以添加实际的智能体编排执行逻辑
    // 目前返回任务ID，前端可以通过任务ID查询执行状态

    res.json({
      success: true,
      data: {
        orchestration_id: id,
        task_id: task.id,
        status: 'started',
        message: 'Orchestration execution started'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to execute orchestration'
    });
  }
});

/**
 * 停止智能体编排执行
 * POST /api/orchestrations/:id/stop
 */
router.post('/:id/stop', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 更新编排状态为已停止
    const { data: orchestration, error } = await supabase
      .from('orchestrations')
      .update({
        status: 'stopped',
        updated_at: new Date().toISOString()
      })
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

    // 停止相关的运行中任务
    await supabase
      .from('tasks')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('orchestration_id', id)
      .in('status', ['pending', 'running']);

    res.json({
      success: true,
      data: orchestration,
      message: 'Orchestration stopped successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to stop orchestration'
    });
  }
});

/**
 * 获取智能体编排执行历史
 * GET /api/orchestrations/:id/history
 */
router.get('/:id/history', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('orchestration_id', id)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orchestration history'
    });
  }
});

/**
 * 删除智能体编排
 * DELETE /api/orchestrations/:id
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('orchestrations')
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
      message: 'Orchestration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete orchestration'
    });
  }
});

export default router;