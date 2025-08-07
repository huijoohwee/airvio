-- 多智能体编排调度中心平台数据库初始化脚本
-- Multi-agent Orchestration Platform Database Schema

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'entrepreneur' CHECK (role IN ('entrepreneur', 'enterprise', 'developer', 'investor')),
    plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'pro', 'enterprise')),
    token_balance INTEGER DEFAULT 10000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建项目表
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    template VARCHAR(50) NOT NULL,
    config JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'created' CHECK (status IN ('created', 'configuring', 'orchestrating', 'developing', 'testing', 'deploying', 'deployed', 'failed')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建智能体编排表
CREATE TABLE orchestrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    workflow_config JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
    estimated_time INTEGER, -- 预计完成时间(分钟)
    actual_time INTEGER, -- 实际完成时间(分钟)
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建智能体表
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orchestration_id UUID NOT NULL REFERENCES orchestrations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('development', 'discovery', 'validation', 'monitoring', 'deployment', 'documentation')),
    config JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'idle' CHECK (status IN ('idle', 'running', 'completed', 'failed', 'paused')),
    token_usage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建任务表
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orchestration_id UUID NOT NULL REFERENCES orchestrations(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    input_data JSONB DEFAULT '{}',
    output_data JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建文档表
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('business_plan', 'pitch_deck', 'market_research', 'financial_model', 'technical_doc', 'user_manual')),
    template VARCHAR(100),
    data JSONB NOT NULL DEFAULT '{}',
    file_url TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'completed', 'failed')),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建部署表
CREATE TABLE deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    environment VARCHAR(20) NOT NULL CHECK (environment IN ('development', 'staging', 'production')),
    url TEXT,
    config JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'deploying', 'deployed', 'failed', 'stopped')),
    deployed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建智能体日志表
CREATE TABLE agent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    level VARCHAR(10) NOT NULL CHECK (level IN ('debug', 'info', 'warn', 'error')),
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建任务日志表
CREATE TABLE task_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    level VARCHAR(10) NOT NULL CHECK (level IN ('debug', 'info', 'warn', 'error')),
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建API密钥表
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建集成表
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    service_type VARCHAR(50) NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    config JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'error')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_template ON projects(template);

CREATE INDEX idx_orchestrations_project_id ON orchestrations(project_id);
CREATE INDEX idx_orchestrations_status ON orchestrations(status);
CREATE INDEX idx_orchestrations_started_at ON orchestrations(started_at DESC);

CREATE INDEX idx_agents_orchestration_id ON agents(orchestration_id);
CREATE INDEX idx_agents_type ON agents(type);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_created_at ON agents(created_at DESC);

CREATE INDEX idx_tasks_orchestration_id ON tasks(orchestration_id);
CREATE INDEX idx_tasks_agent_id ON tasks(agent_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);

CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_generated_at ON documents(generated_at DESC);

CREATE INDEX idx_deployments_project_id ON deployments(project_id);
CREATE INDEX idx_deployments_environment ON deployments(environment);
CREATE INDEX idx_deployments_status ON deployments(status);

CREATE INDEX idx_agent_logs_agent_id ON agent_logs(agent_id);
CREATE INDEX idx_agent_logs_level ON agent_logs(level);
CREATE INDEX idx_agent_logs_created_at ON agent_logs(created_at DESC);

CREATE INDEX idx_task_logs_task_id ON task_logs(task_id);
CREATE INDEX idx_task_logs_level ON task_logs(level);
CREATE INDEX idx_task_logs_created_at ON task_logs(created_at DESC);

CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);

CREATE INDEX idx_integrations_project_id ON integrations(project_id);
CREATE INDEX idx_integrations_service_type ON integrations(service_type);
CREATE INDEX idx_integrations_status ON integrations(status);

-- 插入示例数据
INSERT INTO users (email, name, role, plan) VALUES
('demo@airvio.com', 'Demo User', 'entrepreneur', 'free'),
('enterprise@airvio.com', 'Enterprise User', 'enterprise', 'pro'),
('developer@airvio.com', 'Developer User', 'developer', 'basic'),
('investor@airvio.com', 'Investor User', 'investor', 'enterprise');

-- 插入示例项目
INSERT INTO projects (user_id, name, template, config, status, progress) 
SELECT 
    u.id,
    'Demo E-commerce Platform',
    'b2c_ecommerce',
    '{
        "business_type": "retail",
        "target_market": "consumer",
        "features": ["product_catalog", "shopping_cart", "payment", "user_management"],
        "budget": {
            "development": 2500,
            "validation": 2000,
            "deployment": 1000
        }
    }'::jsonb,
    'developing',
    45
FROM users u WHERE u.email = 'demo@airvio.com';

-- 插入示例智能体编排
INSERT INTO orchestrations (project_id, workflow_config, status, estimated_time, started_at)
SELECT 
    p.id,
    '{
        "steps": ["discovery", "development", "validation", "deployment"],
        "parallel_execution": true,
        "retry_policy": {
            "max_retries": 3,
            "backoff_strategy": "exponential"
        }
    }'::jsonb,
    'running',
    120,
    NOW() - INTERVAL '30 minutes'
FROM projects p WHERE p.name = 'Demo E-commerce Platform';

-- 插入示例智能体
INSERT INTO agents (orchestration_id, name, type, config, status, token_usage)
SELECT 
    o.id,
    'Development Agent',
    'development',
    '{
        "model": "gpt-4",
        "max_tokens": 2500,
        "temperature": 0.7,
        "capabilities": ["code_generation", "architecture_design", "testing"]
    }'::jsonb,
    'running',
    1250
FROM orchestrations o WHERE o.status = 'running';

INSERT INTO agents (orchestration_id, name, type, config, status, token_usage)
SELECT 
    o.id,
    'Validation Agent',
    'validation',
    '{
        "model": "gpt-3.5-turbo",
        "max_tokens": 2000,
        "temperature": 0.3,
        "capabilities": ["code_review", "testing", "quality_assurance"]
    }'::jsonb,
    'idle',
    0
FROM orchestrations o WHERE o.status = 'running';