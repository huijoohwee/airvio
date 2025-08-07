import React, { useState, useEffect } from 'react'
import { User, Settings, Heart, MapPin, CreditCard, Bell, LogOut, Edit3, Camera, Star, Clock, Navigation } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'
import type { POI, Route, PaymentOrder, UserFavorite } from '../types/database'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  preferences: any
  location: any
  created_at: string
  updated_at: string
}

export default function Profile() {
  const { user, signOut } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [favorites, setFavorites] = useState<(UserFavorite & { poi: POI })[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [orders, setOrders] = useState<PaymentOrder[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // 加载用户资料
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('加载用户资料失败:', profileError)
      } else if (profile) {
        setUserProfile(profile)
        setEditForm({
          full_name: profile.full_name || '',
          email: profile.email || ''
        })
      }

      // 加载收藏
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('user_favorites')
        .select(`
          *,
          poi:pois(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (favoritesError) {
        console.error('加载收藏失败:', favoritesError)
      } else {
        setFavorites(favoritesData || [])
      }

      // 加载路线
      const { data: routesData, error: routesError } = await supabase
        .from('routes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (routesError) {
        console.error('加载路线失败:', routesError)
      } else {
        setRoutes(routesData || [])
      }

      // 加载订单
      const { data: ordersData, error: ordersError } = await supabase
        .from('payment_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (ordersError) {
        console.error('加载订单失败:', ordersError)
      } else {
        setOrders(ordersData || [])
      }
    } catch (error) {
      console.error('加载用户数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: editForm.email,
          full_name: editForm.full_name,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast.success('资料更新成功')
      setIsEditing(false)
      loadUserData()
    } catch (error) {
      console.error('更新资料失败:', error)
      toast.error('更新资料失败')
    }
  }

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('id', favoriteId)

      if (error) throw error

      toast.success('已取消收藏')
      setFavorites(favorites.filter(fav => fav.id !== favoriteId))
    } catch (error) {
      console.error('取消收藏失败:', error)
      toast.error('取消收藏失败')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('已退出登录')
    } catch (error) {
      console.error('退出登录失败:', error)
      toast.error('退出登录失败')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`
    }
    return `${minutes}分钟`
  }

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}公里`
    }
    return `${Math.round(meters)}米`
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'pending': return '处理中'
      case 'failed': return '失败'
      default: return '未知'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">请先登录</h2>
          <p className="text-gray-600">登录后即可查看个人中心</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部用户信息 */}
      <div className="bg-gradient-to-r from-sky-600 to-orange-500 text-white">
        <div className="px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {userProfile?.avatar_url ? (
                  <img 
                    src={userProfile.avatar_url} 
                    alt="头像" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-sky-600 rounded-full flex items-center justify-center">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-semibold">
                {userProfile?.full_name || user.email?.split('@')[0] || '用户'}
              </h1>
              <p className="text-white text-opacity-80 text-sm">
                {user.email}
              </p>
              <p className="text-white text-opacity-60 text-xs mt-1">
                注册于 {formatDate(user.created_at)}
              </p>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-white bg-opacity-20 rounded-lg"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <div className="flex space-x-8">
            {[
              { id: 'profile', name: '资料', icon: User },
              { id: 'favorites', name: '收藏', icon: Heart },
              { id: 'routes', name: '路线', icon: Navigation },
              { id: 'orders', name: '订单', icon: CreditCard }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            {/* 个人信息 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">个人信息</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sky-600 hover:text-sky-700"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      姓名
                    </label>
                    <input
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="请输入姓名"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="请输入邮箱"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                    >
                      取消
                    </button>
                    <button
                      onClick={updateProfile}
                      className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg"
                    >
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">姓名</p>
                    <p className="text-gray-900">{userProfile?.full_name || '未设置'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">邮箱</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 设置选项 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">设置</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">账户设置</span>
                  </div>
                </button>
                
                <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">通知设置</span>
                  </div>
                </button>
                
                <button 
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-red-600"
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5" />
                    <span>退出登录</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">我的收藏</h2>
              
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">暂无收藏</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-gray-500" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{favorite.poi.name}</h3>
                        <p className="text-sm text-gray-500">{favorite.poi.address}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{favorite.poi.rating}</span>
                          </div>
                          <span className="text-sm text-gray-400">·</span>
                          <span className="text-sm text-gray-600">{favorite.poi.category}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFavorite(favorite.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">我的路线</h2>
              
              {routes.length === 0 ? (
                <div className="text-center py-8">
                  <Navigation className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">暂无保存的路线</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {routes.map((route) => (
                    <div key={route.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{route.name}</h3>
                        <span className="text-xs text-gray-500">{formatDate(route.created_at)}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{route.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Navigation className="w-4 h-4" />
                          <span>{formatDistance(route.total_distance)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(route.estimated_duration)}</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {route.transportation_mode === 'driving' ? '驾车' :
                           route.transportation_mode === 'walking' ? '步行' :
                           route.transportation_mode === 'cycling' ? '骑行' : '公交'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">订单历史</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">暂无订单记录</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">订单号: {order.id.slice(0, 8)}...</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getOrderStatusColor(order.status)}`}>
                          {getOrderStatusText(order.status)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">¥{order.amount}</p>
                          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                        </div>
                        <p className="text-sm text-gray-600">{order.payment_method}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}