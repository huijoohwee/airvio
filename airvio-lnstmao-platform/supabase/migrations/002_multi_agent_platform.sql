-- Multi-Agent Orchestration Platform Database Schema
-- 多智能体编排调度中心平台数据库架构

-- Projects table - 项目表
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL DEFAULT 'ecommerce', -- ecommerce, saas, marketplace, etc.
    status VARCHAR(50) NOT NULL DEFAULT 'planning', -- planning, development, testing, deployed, archived
    config JSONB DEFAULT '{}',
    template_id VARCHAR(100),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orchestrations table - 编排表
CREATE TABLE IF NOT EXISTS orchestrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    workflow_config JSONB DEFAULT '{}',
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft, active, paused, completed, failed
    priority INTEGER DEFAULT 1,
    scheduled_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agents table - 智能体表
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- document_generator, code_generator, designer, tester, etc.
    description TEXT,
    capabilities TEXT[],
    config JSONB DEFAULT '{}',
    status VARCHAR(50) NOT NULL DEFAULT 'idle', -- idle, busy, error, offline
    version VARCHAR(50) DEFAULT '1.0.0',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table - 任务表
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orchestration_id UUID REFERENCES orchestrations(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100) NOT NULL, -- generate_document, create_component, deploy, test, etc.
    input_data JSONB DEFAULT '{}',
    output_data JSONB DEFAULT '{}',
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, running, completed, failed, cancelled
    priority INTEGER DEFAULT 1,
    dependencies UUID[],
    estimated_duration INTEGER, -- in minutes
    actual_duration INTEGER, -- in minutes
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table - 文档表
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- pitch_deck, business_plan, market_research, financial_model, etc.
    content TEXT,
    metadata JSONB DEFAULT '{}',
    template_id VARCHAR(100),
    version INTEGER DEFAULT 1,
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft, review, approved, published
    file_path TEXT,
    file_size INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deployments table - 部署表
CREATE TABLE IF NOT EXISTS deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    environment VARCHAR(50) NOT NULL, -- development, staging, production
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, deploying, deployed, failed, rollback
    config JSONB DEFAULT '{}',
    url TEXT,
    build_logs TEXT,
    error_message TEXT,
    deployed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent Logs table - 智能体日志表
CREATE TABLE IF NOT EXISTS agent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES agents(id),
    task_id UUID REFERENCES tasks(id),
    level VARCHAR(20) NOT NULL DEFAULT 'info', -- debug, info, warn, error
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Task Logs table - 任务日志表
CREATE TABLE IF NOT EXISTS task_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    level VARCHAR(20) NOT NULL DEFAULT 'info', -- debug, info, warn, error
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Keys table - API密钥表
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash TEXT NOT NULL,
    permissions TEXT[],
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Integrations table - 集成表
CREATE TABLE IF NOT EXISTS integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL, -- payment, analytics, mcp, blockchain, etc.
    name VARCHAR(255) NOT NULL,
    config JSONB DEFAULT '{}',
    status VARCHAR(50) NOT NULL DEFAULT 'inactive', -- inactive, active, error
    last_sync_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dynamic Fields table - 动态字段表
CREATE TABLE IF NOT EXISTS dynamic_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL, -- ecommerce, saas, marketplace, etc.
    field_name VARCHAR(255) NOT NULL,
    field_type VARCHAR(50) NOT NULL, -- text, number, boolean, select, multiselect, etc.
    field_config JSONB DEFAULT '{}',
    description TEXT,
    is_required BOOLEAN DEFAULT false,
    default_value TEXT,
    validation_rules JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_orchestrations_project_id ON orchestrations(project_id);
CREATE INDEX IF NOT EXISTS idx_orchestrations_status ON orchestrations(status);
CREATE INDEX IF NOT EXISTS idx_tasks_orchestration_id ON tasks(orchestration_id);
CREATE INDEX IF NOT EXISTS idx_tasks_agent_id ON tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_deployments_project_id ON deployments(project_id);
CREATE INDEX IF NOT EXISTS idx_agent_logs_agent_id ON agent_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_logs_created_at ON agent_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_task_logs_task_id ON task_logs(task_id);
CREATE INDEX IF NOT EXISTS idx_task_logs_created_at ON task_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_project_id ON integrations(project_id);
CREATE INDEX IF NOT EXISTS idx_dynamic_fields_category ON dynamic_fields(category);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE orchestrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_fields ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Projects policies
CREATE POLICY "Users can view their own projects" ON projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- Orchestrations policies
CREATE POLICY "Users can view orchestrations of their projects" ON orchestrations
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = orchestrations.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can create orchestrations for their projects" ON orchestrations
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = orchestrations.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can update orchestrations of their projects" ON orchestrations
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = orchestrations.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete orchestrations of their projects" ON orchestrations
    FOR DELETE USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = orchestrations.project_id AND projects.user_id = auth.uid()
    ));

-- Agents policies (public read, admin write)
CREATE POLICY "Anyone can view agents" ON agents
    FOR SELECT USING (true);

-- Tasks policies
CREATE POLICY "Users can view tasks of their orchestrations" ON tasks
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM orchestrations o
        JOIN projects p ON p.id = o.project_id
        WHERE o.id = tasks.orchestration_id AND p.user_id = auth.uid()
    ));

CREATE POLICY "Users can create tasks for their orchestrations" ON tasks
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM orchestrations o
        JOIN projects p ON p.id = o.project_id
        WHERE o.id = tasks.orchestration_id AND p.user_id = auth.uid()
    ));

CREATE POLICY "Users can update tasks of their orchestrations" ON tasks
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM orchestrations o
        JOIN projects p ON p.id = o.project_id
        WHERE o.id = tasks.orchestration_id AND p.user_id = auth.uid()
    ));

-- Documents policies
CREATE POLICY "Users can view documents of their projects" ON documents
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = documents.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can create documents for their projects" ON documents
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = documents.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can update documents of their projects" ON documents
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = documents.project_id AND projects.user_id = auth.uid()
    ));

-- Deployments policies
CREATE POLICY "Users can view deployments of their projects" ON deployments
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = deployments.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can create deployments for their projects" ON deployments
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = deployments.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can update deployments of their projects" ON deployments
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = deployments.project_id AND projects.user_id = auth.uid()
    ));

-- API Keys policies
CREATE POLICY "Users can view their own API keys" ON api_keys
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API keys" ON api_keys
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys" ON api_keys
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys" ON api_keys
    FOR DELETE USING (auth.uid() = user_id);

-- Integrations policies
CREATE POLICY "Users can view integrations of their projects" ON integrations
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = integrations.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can create integrations for their projects" ON integrations
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = integrations.project_id AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can update integrations of their projects" ON integrations
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM projects WHERE projects.id = integrations.project_id AND projects.user_id = auth.uid()
    ));

-- Dynamic Fields policies (public read)
CREATE POLICY "Anyone can view dynamic fields" ON dynamic_fields
    FOR SELECT USING (true);

-- Agent Logs policies
CREATE POLICY "Users can view agent logs related to their tasks" ON agent_logs
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM tasks t
        JOIN orchestrations o ON o.id = t.orchestration_id
        JOIN projects p ON p.id = o.project_id
        WHERE t.id = agent_logs.task_id AND p.user_id = auth.uid()
    ));

-- Task Logs policies
CREATE POLICY "Users can view task logs of their tasks" ON task_logs
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM tasks t
        JOIN orchestrations o ON o.id = t.orchestration_id
        JOIN projects p ON p.id = o.project_id
        WHERE t.id = task_logs.task_id AND p.user_id = auth.uid()
    ));

-- Insert sample agents
INSERT INTO agents (name, type, description, capabilities, config) VALUES
('Document Generator', 'document_generator', '自动生成各类商业文档的智能体', ARRAY['pitch_deck', 'business_plan', 'market_research', 'financial_model'], '{"model": "gpt-4", "temperature": 0.7}'),
('Code Generator', 'code_generator', '生成前端和后端代码的智能体', ARRAY['frontend', 'backend', 'api', 'database'], '{"frameworks": ["react", "node.js", "express"]}'),
('UI Designer', 'designer', '设计用户界面和用户体验的智能体', ARRAY['ui_design', 'ux_design', 'prototyping'], '{"design_system": "tailwind"}'),
('QA Tester', 'tester', '执行自动化测试和质量保证的智能体', ARRAY['unit_testing', 'integration_testing', 'e2e_testing'], '{"frameworks": ["jest", "cypress"]}'),
('DevOps Engineer', 'devops', '处理部署和运维的智能体', ARRAY['deployment', 'monitoring', 'scaling'], '{"platforms": ["vercel", "aws", "docker"]}'),
('Project Manager', 'project_manager', '协调项目进度和资源分配的智能体', ARRAY['planning', 'coordination', 'monitoring'], '{"methodology": "agile"}');

-- Insert sample dynamic fields for ecommerce
INSERT INTO dynamic_fields (category, field_name, field_type, field_config, description, is_required, default_value) VALUES
('ecommerce', 'store_name', 'text', '{"maxLength": 100}', '商店名称', true, ''),
('ecommerce', 'product_categories', 'multiselect', '{"options": ["服装", "电子产品", "家居", "美妆", "食品"]}', '产品类别', true, ''),
('ecommerce', 'payment_methods', 'multiselect', '{"options": ["支付宝", "微信支付", "信用卡", "PayPal"]}', '支付方式', true, ''),
('ecommerce', 'shipping_regions', 'multiselect', '{"options": ["国内", "亚洲", "欧洲", "北美", "全球"]}', '配送区域', true, ''),
('ecommerce', 'target_audience', 'select', '{"options": ["年轻人", "中年人", "老年人", "企业客户"]}', '目标客户群体', true, ''),
('ecommerce', 'business_model', 'select', '{"options": ["B2C", "B2B", "C2C", "O2O"]}', '商业模式', true, 'B2C'),
('ecommerce', 'inventory_management', 'boolean', '{}', '是否需要库存管理', false, 'true'),
('ecommerce', 'multi_vendor', 'boolean', '{}', '是否支持多商家', false, 'false'),
('ecommerce', 'mobile_app', 'boolean', '{}', '是否需要移动应用', false, 'false'),
('ecommerce', 'social_commerce', 'boolean', '{}', '是否集成社交电商', false, 'false');

-- Insert sample dynamic fields for SaaS
INSERT INTO dynamic_fields (category, field_name, field_type, field_config, description, is_required, default_value) VALUES
('saas', 'service_name', 'text', '{"maxLength": 100}', '服务名称', true, ''),
('saas', 'pricing_model', 'select', '{"options": ["订阅制", "按使用量计费", "一次性付费", "免费增值"]}', '定价模式', true, '订阅制'),
('saas', 'target_market', 'select', '{"options": ["企业级", "中小企业", "个人用户", "开发者"]}', '目标市场', true, ''),
('saas', 'integration_apis', 'multiselect', '{"options": ["REST API", "GraphQL", "Webhook", "SDK"]}', 'API集成方式', false, ''),
('saas', 'data_storage', 'select', '{"options": ["云存储", "本地存储", "混合存储"]}', '数据存储方式', true, '云存储'),
('saas', 'user_authentication', 'multiselect', '{"options": ["邮箱密码", "社交登录", "SSO", "多因素认证"]}', '用户认证方式', true, ''),
('saas', 'compliance_requirements', 'multiselect', '{"options": ["GDPR", "SOC2", "ISO27001", "HIPAA"]}', '合规要求', false, ''),
('saas', 'multi_tenancy', 'boolean', '{}', '是否支持多租户', false, 'true'),
('saas', 'real_time_features', 'boolean', '{}', '是否需要实时功能', false, 'false'),
('saas', 'analytics_dashboard', 'boolean', '{}', '是否需要分析仪表板', false, 'true');

-- Grant permissions to authenticated users
GRANT ALL ON projects TO authenticated;
GRANT ALL ON orchestrations TO authenticated;
GRANT SELECT ON agents TO authenticated;
GRANT ALL ON tasks TO authenticated;
GRANT ALL ON documents TO authenticated;
GRANT ALL ON deployments TO authenticated;
GRANT SELECT ON agent_logs TO authenticated;
GRANT SELECT ON task_logs TO authenticated;
GRANT ALL ON api_keys TO authenticated;
GRANT ALL ON integrations TO authenticated;
GRANT SELECT ON dynamic_fields TO authenticated;

-- Grant permissions to anonymous users (limited)
GRANT SELECT ON agents TO anon;
GRANT SELECT ON dynamic_fields TO anon;