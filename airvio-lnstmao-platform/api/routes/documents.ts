/**
 * 文档生成管理API路由
 * 处理文档的创建、查询、更新、生成等操作
 */
import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

/**
 * 获取所有文档
 * GET /api/documents
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { project_id, type, status } = req.query;

    let query = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (project_id) {
      query = query.eq('project_id', project_id);
    }
    if (type) {
      query = query.eq('type', type);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data: documents, error } = await query;

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch documents'
    });
  }
});

/**
 * 根据ID获取文档详情
 * GET /api/documents/:id
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { data: document, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({
        success: false,
        error: 'Document not found'
      });
      return;
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch document'
    });
  }
});

/**
 * 创建新文档
 * POST /api/documents
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      type,
      project_id,
      template_id,
      content,
      metadata,
      user_id
    } = req.body;

    // 验证必填字段
    if (!title || !type || !project_id || !user_id) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: title, type, project_id, user_id'
      });
      return;
    }

    const { data: document, error } = await supabase
      .from('documents')
      .insert({
        title,
        type,
        project_id,
        template_id,
        content: content || '',
        metadata: metadata || {},
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
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create document'
    });
  }
});

/**
 * 更新文档
 * PUT /api/documents/:id
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      template_id,
      content,
      metadata,
      status
    } = req.body;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (title !== undefined) updateData.title = title;
    if (type !== undefined) updateData.type = type;
    if (template_id !== undefined) updateData.template_id = template_id;
    if (content !== undefined) updateData.content = content;
    if (metadata !== undefined) updateData.metadata = metadata;
    if (status !== undefined) updateData.status = status;

    const { data: document, error } = await supabase
      .from('documents')
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
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update document'
    });
  }
});

/**
 * 自动生成文档
 * POST /api/documents/generate
 */
router.post('/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      project_id,
      type,
      template_id,
      user_id,
      generation_config
    } = req.body;

    // 验证必填字段
    if (!project_id || !type || !user_id) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: project_id, type, user_id'
      });
      return;
    }

    // 获取项目信息
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', project_id)
      .single();

    if (projectError || !project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    // 根据文档类型生成内容
    let generatedContent = '';
    let documentTitle = '';

    switch (type) {
      case 'pitch_deck':
        documentTitle = `${project.name} - Pitch Deck`;
        generatedContent = generatePitchDeckContent(project, generation_config);
        break;
      case 'business_plan':
        documentTitle = `${project.name} - Business Plan`;
        generatedContent = generateBusinessPlanContent(project, generation_config);
        break;
      case 'market_research':
        documentTitle = `${project.name} - Market Research`;
        generatedContent = generateMarketResearchContent(project, generation_config);
        break;
      case 'financial_model':
        documentTitle = `${project.name} - Financial Model`;
        generatedContent = generateFinancialModelContent(project, generation_config);
        break;
      case 'product_doc':
        documentTitle = `${project.name} - Product Documentation`;
        generatedContent = generateProductDocContent(project, generation_config);
        break;
      case 'technical_doc':
        documentTitle = `${project.name} - Technical Documentation`;
        generatedContent = generateTechnicalDocContent(project, generation_config);
        break;
      case 'operations_doc':
        documentTitle = `${project.name} - Operations Documentation`;
        generatedContent = generateOperationsDocContent(project, generation_config);
        break;
      default:
        res.status(400).json({
          success: false,
          error: 'Unsupported document type'
        });
        return;
    }

    // 创建文档记录
    const { data: document, error } = await supabase
      .from('documents')
      .insert({
        title: documentTitle,
        type,
        project_id,
        template_id,
        content: generatedContent,
        metadata: {
          generated: true,
          generation_config,
          generated_at: new Date().toISOString()
        },
        user_id,
        status: 'generated'
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
      data: document,
      message: 'Document generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate document'
    });
  }
});

/**
 * 导出文档
 * GET /api/documents/:id/export
 */
router.get('/:id/export', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { format = 'markdown' } = req.query;

    const { data: document, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !document) {
      res.status(404).json({
        success: false,
        error: 'Document not found'
      });
      return;
    }

    let exportedContent = document.content;
    let contentType = 'text/plain';
    let filename = `${document.title}.txt`;

    switch (format) {
      case 'markdown':
        contentType = 'text/markdown';
        filename = `${document.title}.md`;
        break;
      case 'html':
        contentType = 'text/html';
        filename = `${document.title}.html`;
        // 这里可以添加 Markdown 到 HTML 的转换逻辑
        break;
      case 'pdf':
        // 这里可以添加 PDF 生成逻辑
        res.status(501).json({
          success: false,
          error: 'PDF export not implemented yet'
        });
        return;
      default:
        break;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(exportedContent);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to export document'
    });
  }
});

/**
 * 获取文档模板
 * GET /api/documents/templates
 */
router.get('/templates', async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.query;

    // 预定义的文档模板
    const templates = [
      {
        id: 'pitch_deck_standard',
        name: 'Standard Pitch Deck',
        type: 'pitch_deck',
        description: 'A standard 10-slide pitch deck template',
        sections: ['Problem', 'Solution', 'Market', 'Business Model', 'Competition', 'Team', 'Financials', 'Funding', 'Use of Funds', 'Contact']
      },
      {
        id: 'business_plan_comprehensive',
        name: 'Comprehensive Business Plan',
        type: 'business_plan',
        description: 'A detailed business plan template',
        sections: ['Executive Summary', 'Company Description', 'Market Analysis', 'Organization & Management', 'Service/Product Line', 'Marketing & Sales', 'Funding Request', 'Financial Projections']
      },
      {
        id: 'market_research_basic',
        name: 'Basic Market Research',
        type: 'market_research',
        description: 'A basic market research template',
        sections: ['Market Overview', 'Target Audience', 'Competitor Analysis', 'Market Trends', 'Opportunities', 'Threats']
      },
      {
        id: 'financial_model_startup',
        name: 'Startup Financial Model',
        type: 'financial_model',
        description: 'A financial model template for startups',
        sections: ['Revenue Projections', 'Cost Structure', 'Cash Flow', 'Break-even Analysis', 'Funding Requirements']
      },
      {
        id: 'product_doc_mvp',
        name: 'MVP Product Documentation',
        type: 'product_doc',
        description: 'Product documentation for MVP',
        sections: ['Product Overview', 'Features', 'User Stories', 'Technical Requirements', 'Roadmap']
      },
      {
        id: 'technical_doc_api',
        name: 'API Technical Documentation',
        type: 'technical_doc',
        description: 'Technical documentation for APIs',
        sections: ['Architecture', 'API Endpoints', 'Data Models', 'Authentication', 'Error Handling', 'Examples']
      },
      {
        id: 'operations_doc_standard',
        name: 'Standard Operations Documentation',
        type: 'operations_doc',
        description: 'Standard operations documentation',
        sections: ['Deployment Guide', 'Monitoring', 'Backup & Recovery', 'Security', 'Troubleshooting']
      }
    ];

    let filteredTemplates = templates;
    if (type) {
      filteredTemplates = templates.filter(template => template.type === type);
    }

    res.json({
      success: true,
      data: filteredTemplates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch document templates'
    });
  }
});

/**
 * 删除文档
 * DELETE /api/documents/:id
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('documents')
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
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete document'
    });
  }
});

// 文档生成辅助函数
function generatePitchDeckContent(project: any, config: any): string {
  return `# ${project.name} - Pitch Deck

## Slide 1: Problem
${project.description || 'Define the problem your product solves'}

## Slide 2: Solution
Our innovative solution addresses the core problem...

## Slide 3: Market Opportunity
The market size and opportunity...

## Slide 4: Business Model
How we make money...

## Slide 5: Competition
Competitive landscape analysis...

## Slide 6: Team
Meet our experienced team...

## Slide 7: Financials
Revenue projections and key metrics...

## Slide 8: Funding
Funding requirements and use of funds...

## Slide 9: Traction
Key achievements and milestones...

## Slide 10: Contact
Contact information and next steps...`;
}

function generateBusinessPlanContent(project: any, config: any): string {
  return `# ${project.name} - Business Plan

## Executive Summary
${project.description || 'Executive summary of the business'}

## Company Description
Detailed description of the company...

## Market Analysis
Comprehensive market analysis...

## Organization & Management
Organizational structure and management team...

## Service/Product Line
Detailed description of products and services...

## Marketing & Sales
Marketing and sales strategy...

## Funding Request
Funding requirements and financial projections...

## Financial Projections
Detailed financial forecasts...`;
}

function generateMarketResearchContent(project: any, config: any): string {
  return `# ${project.name} - Market Research

## Market Overview
Overview of the target market...

## Target Audience
Detailed analysis of target customers...

## Competitor Analysis
Comprehensive competitor analysis...

## Market Trends
Current and emerging market trends...

## Opportunities
Identified market opportunities...

## Threats
Potential market threats and challenges...`;
}

function generateFinancialModelContent(project: any, config: any): string {
  return `# ${project.name} - Financial Model

## Revenue Projections
Detailed revenue forecasts...

## Cost Structure
Breakdown of operational costs...

## Cash Flow Analysis
Cash flow projections...

## Break-even Analysis
Break-even calculations...

## Funding Requirements
Capital requirements and funding strategy...`;
}

function generateProductDocContent(project: any, config: any): string {
  return `# ${project.name} - Product Documentation

## Product Overview
${project.description || 'Overview of the product'}

## Features
Key product features and capabilities...

## User Stories
Detailed user stories and use cases...

## Technical Requirements
Technical specifications and requirements...

## Roadmap
Product development roadmap...`;
}

function generateTechnicalDocContent(project: any, config: any): string {
  return `# ${project.name} - Technical Documentation

## Architecture
System architecture overview...

## API Endpoints
Detailed API documentation...

## Data Models
Database schema and data models...

## Authentication
Authentication and authorization...

## Error Handling
Error handling and status codes...

## Examples
Code examples and usage...`;
}

function generateOperationsDocContent(project: any, config: any): string {
  return `# ${project.name} - Operations Documentation

## Deployment Guide
Step-by-step deployment instructions...

## Monitoring
Monitoring and alerting setup...

## Backup & Recovery
Backup and disaster recovery procedures...

## Security
Security best practices and procedures...

## Troubleshooting
Common issues and troubleshooting guide...`;
}

export default router;