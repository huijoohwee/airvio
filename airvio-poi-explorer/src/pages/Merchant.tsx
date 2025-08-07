import React, { useState, useEffect } from 'react'
import { 
  Store, 
  Plus, 
  BarChart3, 
  Users, 
  MapPin, 
  Star, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  TrendingUp,
  DollarSign,
  Heart,
  MessageSquare,
  Camera,
  Upload,
  Save,
  X,
  Target
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'
import type { POI, UserFavorite, PaymentOrder } from '../types/database'

// 添加CSS样式来隐藏滚动条
const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

interface MerchantStats {
  totalPOIs: number
  totalViews: number
  totalFavorites: number
  totalRevenue: number
  monthlyGrowth: number
}

interface POIForm {
  name: string
  description: string
  address: string
  category: string
  phone: string
  website: string
  opening_hours: string
  price_range: string
  latitude: number
  longitude: number
  images: string[]
}

export default function Merchant() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [pois, setPois] = useState<POI[]>([])
  const [stats, setStats] = useState<MerchantStats>({
    totalPOIs: 0,
    totalViews: 0,
    totalFavorites: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  })
  const [showPOIForm, setShowPOIForm] = useState(false)
  const [editingPOI, setEditingPOI] = useState<POI | null>(null)
  const [poiForm, setPOIForm] = useState<POIForm>({
    name: '',
    description: '',
    address: '',
    category: 'restaurant',
    phone: '',
    website: '',
    opening_hours: '',
    price_range: '$$',
    latitude: 0,
    longitude: 0,
    images: []
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      loadMerchantData()
    }
  }, [user])

  const loadMerchantData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // 加载商户的POI
      const { data: poisData, error: poisError } = await supabase
        .from('pois')
        .select('*')
        .eq('merchant_id', user.id)
        .order('created_at', { ascending: false })

      if (poisError) {
        console.error('加载POI失败:', poisError)
      } else {
        setPois(poisData || [])
      }

      // 计算统计数据
      if (poisData && poisData.length > 0) {
        const poiIds = poisData.map(poi => poi.id)
        
        // 获取收藏数
        const { count: favoritesCount } = await supabase
          .from('user_favorites')
          .select('*', { count: 'exact', head: true })
          .in('poi_id', poiIds)

        // 获取订单数据（模拟收入）
        const { data: ordersData } = await supabase
          .from('payment_orders')
          .select('amount')
          .eq('status', 'completed')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

        const totalRevenue = ordersData?.reduce((sum, order) => sum + order.amount, 0) || 0
        
        setStats({
          totalPOIs: poisData.length,
          totalViews: poisData.reduce((sum, poi) => sum + (poi.views || 0), 0),
          totalFavorites: favoritesCount || 0,
          totalRevenue,
          monthlyGrowth: Math.random() * 20 - 10 // 模拟增长率
        })
      }
    } catch (error) {
      console.error('加载商户数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setPOIForm({
      name: '',
      description: '',
      address: '',
      category: 'restaurant',
      phone: '',
      website: '',
      opening_hours: '',
      price_range: '$$',
      latitude: 0,
      longitude: 0,
      images: []
    })
    setEditingPOI(null)
  }

  const handleCreatePOI = () => {
    resetForm()
    setShowPOIForm(true)
  }

  const handleEditPOI = (poi: POI) => {
    // 从POI的location字段提取坐标
    let lat = 0, lng = 0
    if (poi.location) {
      try {
        if (typeof poi.location === 'string') {
          const parsed = JSON.parse(poi.location)
          if (parsed.coordinates) {
            lng = parsed.coordinates[0]
            lat = parsed.coordinates[1]
          }
        } else if (typeof poi.location === 'object' && poi.location !== null) {
          const loc = poi.location as any
          if (loc.coordinates) {
            lng = loc.coordinates[0]
            lat = loc.coordinates[1]
          } else if (loc.lng !== undefined && loc.lat !== undefined) {
            lng = loc.lng
            lat = loc.lat
          }
        }
      } catch (e) {
        console.error('解析位置信息失败:', e)
      }
    }

    setPOIForm({
      name: poi.name,
      description: poi.description || '',
      address: poi.address || '',
      category: poi.category,
      phone: (poi.contact_info as any)?.phone || '',
      website: (poi.contact_info as any)?.website || '',
      opening_hours: JSON.stringify(poi.business_hours) || '',
      price_range: poi.price_range || '$$',
      latitude: lat,
      longitude: lng,
      images: poi.images || []
    })
    setEditingPOI(poi)
    setShowPOIForm(true)
  }

  const handleSubmitPOI = async () => {
    if (!user) return
    if (!poiForm.name.trim() || !poiForm.address.trim()) {
      toast.error('请填写必要信息')
      return
    }

    try {
      setSubmitting(true)
      
      const poiData = {
        name: poiForm.name.trim(),
        description: poiForm.description.trim(),
        address: poiForm.address.trim(),
        category: poiForm.category,
        phone: poiForm.phone.trim(),
        website: poiForm.website.trim(),
        opening_hours: poiForm.opening_hours.trim(),
        price_range: poiForm.price_range,
        location: {
          type: 'Point',
          coordinates: [poiForm.longitude, poiForm.latitude]
        },
        images: poiForm.images,
        merchant_id: user.id,
        rating: editingPOI?.rating || 4.0,
        views: editingPOI?.review_count || 0,
        updated_at: new Date().toISOString()
      }

      if (editingPOI) {
        // 更新现有POI
        const { error } = await supabase
          .from('pois')
          .update(poiData)
          .eq('id', editingPOI.id)

        if (error) throw error
        toast.success('POI更新成功')
      } else {
        // 创建新POI
        const { error } = await supabase
          .from('pois')
          .insert({
            ...poiData,
            created_at: new Date().toISOString()
          })

        if (error) throw error
        toast.success('POI创建成功')
      }

      setShowPOIForm(false)
      resetForm()
      loadMerchantData()
    } catch (error) {
      console.error('保存POI失败:', error)
      toast.error('保存失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeletePOI = async (poiId: string) => {
    if (!confirm('确定要删除这个POI吗？此操作不可恢复。')) return

    try {
      const { error } = await supabase
        .from('pois')
        .delete()
        .eq('id', poiId)

      if (error) throw error
      
      toast.success('POI删除成功')
      loadMerchantData()
    } catch (error) {
      console.error('删除POI失败:', error)
      toast.error('删除失败，请重试')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      restaurant: '餐厅',
      hotel: '酒店',
      attraction: '景点',
      shopping: '购物',
      entertainment: '娱乐',
      transport: '交通',
      service: '服务'
    }
    return categories[category] || category
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">请先登录</h2>
          <p className="text-gray-600">登录后即可访问商户管理</p>
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
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">商户管理</h1>
              <p className="text-gray-600 mt-1">管理您的POI内容和业务数据</p>
            </div>
            <button
              onClick={handleCreatePOI}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-sky-700"
            >
              <Plus className="w-5 h-5" />
              <span>添加POI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 标签页导航 - 移动端优化 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-2 md:px-4">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 md:space-x-8">
            {[
              { id: 'overview', name: '概览', icon: BarChart3 },
              { id: 'pois', name: 'POI管理', icon: MapPin },
              { id: 'analytics', name: '数据分析', icon: TrendingUp },
              { id: 'customers', name: '客户管理', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 md:py-4 px-2 md:px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs md:text-sm">{tab.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 统计卡片 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">总POI数</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalPOIs}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-sky-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">总浏览量</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                  </div>
                  <Eye className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">总收藏数</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalFavorites}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">月收入</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* 最近POI */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">最近添加的POI</h2>
              </div>
              <div className="p-4">
                {pois.slice(0, 5).map((poi) => (
                  <div key={poi.id} className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{poi.name}</h3>
                      <p className="text-sm text-gray-500">{getCategoryName(poi.category)}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{poi.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{poi.review_count || 0} 次评价</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pois' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">POI列表</h2>
              </div>
              
              {pois.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">还没有添加任何POI</p>
                  <button
                    onClick={handleCreatePOI}
                    className="bg-sky-600 text-white px-4 py-2 rounded-lg"
                  >
                    添加第一个POI
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {pois.map((poi) => (
                    <div key={poi.id} className="p-3 md:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">{poi.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500 truncate">{poi.address}</p>
                            <div className="flex items-center space-x-2 md:space-x-4 mt-1">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {getCategoryName(poi.category)}
                              </span>
                              <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-600">
                                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                                <span>{poi.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-600">
                                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                                <span>{poi.review_count || 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 md:space-x-2 ml-2">
                          <button
                            onClick={() => handleEditPOI(poi)}
                            className="p-1.5 md:p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg"
                          >
                            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePOI(poi.id)}
                            className="p-1.5 md:p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* 数据概览 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
              <div className="bg-white p-3 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">今日访问</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{Math.floor(stats.totalViews * 0.1)}</p>
                    <p className="text-xs text-green-600 truncate">+12.5%</p>
                  </div>
                  <div className="p-2 md:p-3 bg-sky-100 rounded-full flex-shrink-0">
                    <Eye className="w-4 h-4 md:w-6 md:h-6 text-sky-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">今日收藏</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{Math.floor(stats.totalFavorites * 0.05)}</p>
                    <p className="text-xs text-green-600 truncate">+8.3%</p>
                  </div>
                  <div className="p-2 md:p-3 bg-red-100 rounded-full flex-shrink-0">
                    <Heart className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">转化率</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">3.2%</p>
                    <p className="text-xs text-red-600 truncate">-1.2%</p>
                  </div>
                  <div className="p-2 md:p-3 bg-blue-100 rounded-full flex-shrink-0">
                    <Target className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">平均评分</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">4.6</p>
                    <p className="text-xs text-green-600 truncate">+0.2</p>
                  </div>
                  <div className="p-2 md:p-3 bg-yellow-100 rounded-full flex-shrink-0">
                    <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* 访问趋势图表 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">访问趋势</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const height = Math.random() * 200 + 50
                  const day = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][i]
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-sky-500 rounded-t-sm transition-all duration-300 hover:bg-sky-600"
                        style={{ height: `${height}px` }}
                      ></div>
                      <p className="text-xs text-gray-600 mt-2">{day}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* POI表现排行 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">POI表现排行</h3>
              </div>
              <div className="p-4">
                {pois.slice(0, 5).map((poi, index) => (
                  <div key={poi.id} className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{poi.name}</h4>
                      <p className="text-sm text-gray-500">{getCategoryName(poi.category)}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span>{Math.floor(Math.random() * 1000 + 100)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{Math.floor(Math.random() * 50 + 10)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 用户反馈分析 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">用户反馈分析</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 评分分布 */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">评分分布</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = Math.random() * 60 + 10
                        return (
                          <div key={rating} className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1 w-12">
                              <span className="text-sm text-gray-600">{rating}</span>
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12">{percentage.toFixed(0)}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 关键词云 */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">热门关键词</h4>
                    <div className="flex flex-wrap gap-2">
                      {['服务好', '环境优美', '交通便利', '性价比高', '值得推荐', '设施完善', '体验不错', '位置佳'].map((keyword, index) => (
                        <span 
                          key={keyword}
                          className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm"
                          style={{ fontSize: `${Math.random() * 0.3 + 0.8}rem` }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* 客户统计概览 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-600 truncate">总客户数</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">1,234</p>
                    <p className="text-xs text-green-600 truncate">+15.3%</p>
                  </div>
                  <div className="p-2 md:p-3 bg-blue-100 rounded-full flex-shrink-0">
                    <Users className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-600 truncate">活跃客户</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">856</p>
                    <p className="text-xs text-green-600 truncate">+8.7%</p>
                  </div>
                  <div className="p-2 md:p-3 bg-green-100 rounded-full flex-shrink-0">
                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-600 truncate">新增客户</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">42</p>
                    <p className="text-xs text-green-600 truncate">+12.1%</p>
                  </div>
                  <div className="p-2 md:p-3 bg-orange-100 rounded-full flex-shrink-0">
                    <Plus className="w-4 h-4 md:w-6 md:h-6 text-orange-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">客户满意度</p>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <p className="text-xs text-green-600">+0.3</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* 客户列表 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">客户列表</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="搜索客户..."
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm hover:bg-sky-700">
                    导出
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客户</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">访问次数</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收藏数</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后访问</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.from({ length: 10 }, (_, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {String.fromCharCode(65 + i)}
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">用户{i + 1}</p>
                              <p className="text-sm text-gray-500">user{i + 1}@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.floor(Math.random() * 50 + 5)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.floor(Math.random() * 10 + 1)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {Math.floor(Math.random() * 7 + 1)} 天前
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-sky-600 hover:text-sky-900 mr-3">查看</button>
                          <button className="text-orange-600 hover:text-orange-900">联系</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 互动记录 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">最近互动记录</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-sky-600">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">用户{i + 1}</p>
                          <span className="text-xs text-gray-500">{Math.floor(Math.random() * 24 + 1)} 小时前</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {['收藏了您的POI', '给出了5星评价', '分享了您的内容', '提出了问题', '预订了服务'][i]}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {pois[Math.floor(Math.random() * pois.length)]?.name || '某个POI'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 营销工具 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">营销工具</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-sky-300 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium text-gray-900">优惠券推送</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">向目标客户发送个性化优惠券</p>
                    <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700">
                      创建优惠券
                    </button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-sky-300 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-sky-600" />
                      </div>
                      <h4 className="font-medium text-gray-900">群发消息</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">向客户群体发送营销消息</p>
                    <button className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg text-sm hover:bg-sky-700">
                      发送消息
                    </button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-sky-300 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="font-medium text-gray-900">活动分析</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">分析营销活动效果</p>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                      查看报告
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* POI表单弹窗 - 移动端优化 */}
      {showPOIForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center p-0 md:p-4 z-50">
          <div className="bg-white rounded-t-xl md:rounded-lg max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  {editingPOI ? '编辑POI' : '添加POI'}
                </h2>
                <button
                  onClick={() => setShowPOIForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      名称 *
                    </label>
                    <input
                      type="text"
                      value={poiForm.name}
                      onChange={(e) => setPOIForm({ ...poiForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-base md:text-sm"
                      placeholder="请输入POI名称"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      分类
                    </label>
                    <select
                      value={poiForm.category}
                      onChange={(e) => setPOIForm({ ...poiForm, category: e.target.value })}
                      className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-base md:text-sm"
                    >
                      <option value="restaurant">餐厅</option>
                      <option value="hotel">酒店</option>
                      <option value="attraction">景点</option>
                      <option value="shopping">购物</option>
                      <option value="entertainment">娱乐</option>
                      <option value="transport">交通</option>
                      <option value="service">服务</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    地址 *
                  </label>
                  <input
                    type="text"
                    value={poiForm.address}
                    onChange={(e) => setPOIForm({ ...poiForm, address: e.target.value })}
                    className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-base md:text-sm"
                    placeholder="请输入详细地址"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    描述
                  </label>
                  <textarea
                    value={poiForm.description}
                    onChange={(e) => setPOIForm({ ...poiForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-base md:text-sm resize-none"
                    placeholder="请输入POI描述"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      电话
                    </label>
                    <input
                      type="tel"
                      value={poiForm.phone}
                      onChange={(e) => setPOIForm({ ...poiForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="请输入联系电话"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      网站
                    </label>
                    <input
                      type="url"
                      value={poiForm.website}
                      onChange={(e) => setPOIForm({ ...poiForm, website: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="请输入网站地址"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      营业时间
                    </label>
                    <input
                      type="text"
                      value={poiForm.opening_hours}
                      onChange={(e) => setPOIForm({ ...poiForm, opening_hours: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="例如：09:00-22:00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      价格区间
                    </label>
                    <select
                      value={poiForm.price_range}
                      onChange={(e) => setPOIForm({ ...poiForm, price_range: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    >
                      <option value="$">$ (经济)</option>
                      <option value="$$">$$ (中等)</option>
                      <option value="$$$">$$$ (较高)</option>
                      <option value="$$$$">$$$$ (高端)</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      纬度
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={poiForm.latitude}
                      onChange={(e) => setPOIForm({ ...poiForm, latitude: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="例如：39.9042"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      经度
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={poiForm.longitude}
                      onChange={(e) => setPOIForm({ ...poiForm, longitude: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="例如：116.4074"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-4 pt-4 md:pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setShowPOIForm(false)}
                  className="w-full md:w-auto px-4 py-2.5 md:py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmitPOI}
                  disabled={submitting}
                  className="w-full md:w-auto px-4 py-2.5 md:py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingPOI ? '更新' : '创建'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}