-- Maps Explorer Database Schema
-- 创建航空与旅游地图导览应用的核心数据表

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 用户表 (扩展Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    user_type TEXT CHECK (user_type IN ('tourist', 'advanced', 'merchant')) DEFAULT 'tourist',
    preferences JSONB DEFAULT '{}',
    location_preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- POI (兴趣点) 表
CREATE TABLE IF NOT EXISTS public.pois (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'airport', 'hotel', 'restaurant', 'attraction', 'transport'
    subcategory TEXT,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    address TEXT,
    contact_info JSONB DEFAULT '{}',
    business_hours JSONB DEFAULT '{}',
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    price_range TEXT CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
    amenities TEXT[],
    images TEXT[],
    metadata JSONB DEFAULT '{}',
    merchant_id UUID REFERENCES public.users(id),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户收藏表
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    poi_id UUID REFERENCES public.pois(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, poi_id)
);

-- 路线规划表
CREATE TABLE IF NOT EXISTS public.routes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    start_location GEOGRAPHY(POINT, 4326) NOT NULL,
    end_location GEOGRAPHY(POINT, 4326) NOT NULL,
    waypoints JSONB DEFAULT '[]',
    route_data JSONB DEFAULT '{}',
    transport_mode TEXT CHECK (transport_mode IN ('driving', 'walking', 'transit', 'flying')) DEFAULT 'driving',
    estimated_duration INTEGER, -- 分钟
    estimated_distance DECIMAL, -- 公里
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MCP插件表
CREATE TABLE IF NOT EXISTS public.mcp_plugins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT,
    version TEXT NOT NULL,
    category TEXT NOT NULL, -- 'aviation', 'tourism', 'payment', 'analytics'
    config_schema JSONB DEFAULT '{}',
    endpoints JSONB DEFAULT '{}',
    capabilities TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    developer_info JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插件连接表
CREATE TABLE IF NOT EXISTS public.plugin_connections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plugin_id UUID REFERENCES public.mcp_plugins(id) ON DELETE CASCADE,
    config JSONB DEFAULT '{}',
    is_enabled BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, plugin_id)
);

-- 支付订单表
CREATE TABLE IF NOT EXISTS public.payment_orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES public.users(id),
    order_type TEXT NOT NULL, -- 'booking', 'service', 'product'
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    payment_method TEXT,
    payment_provider TEXT,
    external_order_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 评论表
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    poi_id UUID REFERENCES public.pois(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title TEXT,
    content TEXT,
    images TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_pois_location ON public.pois USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_pois_category ON public.pois (category);
CREATE INDEX IF NOT EXISTS idx_pois_merchant ON public.pois (merchant_id);
CREATE INDEX IF NOT EXISTS idx_routes_user ON public.routes (user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_poi ON public.reviews (poi_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON public.reviews (user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_user ON public.payment_orders (user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON public.payment_orders (status);

-- 启用行级安全 (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pois ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plugin_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
-- 用户表策略
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- POI表策略
CREATE POLICY "POIs are viewable by everyone" ON public.pois
    FOR SELECT USING (is_active = true);

CREATE POLICY "Merchants can manage own POIs" ON public.pois
    FOR ALL USING (auth.uid() = merchant_id);

-- 收藏表策略
CREATE POLICY "Users can manage own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- 路线表策略
CREATE POLICY "Users can view public routes" ON public.routes
    FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage own routes" ON public.routes
    FOR ALL USING (auth.uid() = user_id);

-- 插件连接策略
CREATE POLICY "Users can manage own plugin connections" ON public.plugin_connections
    FOR ALL USING (auth.uid() = user_id);

-- 支付订单策略
CREATE POLICY "Users can view own orders" ON public.payment_orders
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() = merchant_id);

CREATE POLICY "Users can create orders" ON public.payment_orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 评论策略
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own reviews" ON public.reviews
    FOR ALL USING (auth.uid() = user_id);

-- 创建触发器函数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 更新时间戳触发器函数
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为需要的表添加更新时间戳触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pois_updated_at BEFORE UPDATE ON public.pois
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON public.routes
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mcp_plugins_updated_at BEFORE UPDATE ON public.mcp_plugins
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plugin_connections_updated_at BEFORE UPDATE ON public.plugin_connections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payment_orders_updated_at BEFORE UPDATE ON public.payment_orders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();