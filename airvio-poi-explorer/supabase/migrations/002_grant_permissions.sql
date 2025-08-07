-- 为新创建的表授予权限
-- 确保anon和authenticated角色可以访问相应的表

-- 为anon角色授予基本读取权限
GRANT SELECT ON public.pois TO anon;
GRANT SELECT ON public.mcp_plugins TO anon;
GRANT SELECT ON public.reviews TO anon;

-- 为authenticated角色授予完整权限
GRANT ALL PRIVILEGES ON public.users TO authenticated;
GRANT ALL PRIVILEGES ON public.pois TO authenticated;
GRANT ALL PRIVILEGES ON public.user_favorites TO authenticated;
GRANT ALL PRIVILEGES ON public.routes TO authenticated;
GRANT ALL PRIVILEGES ON public.mcp_plugins TO authenticated;
GRANT ALL PRIVILEGES ON public.plugin_connections TO authenticated;
GRANT ALL PRIVILEGES ON public.payment_orders TO authenticated;
GRANT ALL PRIVILEGES ON public.reviews TO authenticated;

-- 为序列授予权限（如果有的话）
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;