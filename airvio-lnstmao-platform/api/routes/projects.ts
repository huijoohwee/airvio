/**
 * 项目管理API路由
 * 处理项目创建、查询、更新、删除等操作
 */
import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

/**
 * 获取所有项目
 * GET /api/projects
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        *,
        orchestrations(count),
        deployments(count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});

/**
 * 根据ID获取项目详情
 * GET /api/projects/:id
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        orchestrations(*),
        deployments(*),
        documents(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
    });
  }
});

/**
 * 创建新项目
 * POST /api/projects
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      type,
      template_id,
      config,
      user_id
    } = req.body;

    // 验证必填字段
    if (!name || !type || !user_id) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, type, user_id'
      });
      return;
    }

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        name,
        description,
        type,
        template_id,
        config: config || {},
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
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
});

/**
 * 更新项目
 * PUT /api/projects/:id
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      template_id,
      config,
      status
    } = req.body;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (template_id !== undefined) updateData.template_id = template_id;
    if (config !== undefined) updateData.config = config;
    if (status !== undefined) updateData.status = status;

    const { data: project, error } = await supabase
      .from('projects')
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
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update project'
    });
  }
});

/**
 * 删除项目
 * DELETE /api/projects/:id
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('projects')
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
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete project'
    });
  }
});

/**
 * 获取项目统计信息
 * GET /api/projects/:id/stats
 */
router.get('/:id/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 获取项目基本信息
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    // 获取智能体编排数量
    const { count: orchestrationCount } = await supabase
      .from('orchestrations')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', id);

    // 获取活跃智能体数量
    const { count: activeAgentCount } = await supabase
      .from('agents')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', id)
      .eq('status', 'active');

    // 获取任务数量
    const { count: taskCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', id);

    // 获取文档数量
    const { count: documentCount } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', id);

    // 获取部署数量
    const { count: deploymentCount } = await supabase
      .from('deployments')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', id);

    res.json({
      success: true,
      data: {
        project,
        stats: {
          orchestrations: orchestrationCount || 0,
          active_agents: activeAgentCount || 0,
          tasks: taskCount || 0,
          documents: documentCount || 0,
          deployments: deploymentCount || 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project stats'
    });
  }
});

export default router;