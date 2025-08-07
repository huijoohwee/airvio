import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Plane, Navigation, Bell } from 'lucide-react'
import { SearchBar } from '../components/home/SearchBar'
import { RecommendationSection } from '../components/home/RecommendationSection'
import { UserAvatar, AuthModal } from '../components/auth'
import { useAuthStore } from '../stores/authStore'
import { POI } from '../types/database'
import { toast } from 'sonner'

interface UserLocation {
  lat: number
  lng: number
  address?: string
}

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null)
  const { user } = useAuthStore()

  useEffect(() => {
    requestLocation()
  }, [])

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Use default location (e.g., city center)
          setUserLocation({
            lat: 39.9042, // Beijing
            lng: 116.4074
          })
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    }
  }

  const handleSearch = (query: string, filters?: any) => {
    // TODO: Navigate to search results page
    console.log('Search:', query, filters)
    toast.success(`搜索: ${query}`)
  }

  const handlePoiSelect = (poi: POI) => {
    // Navigate to POI detail page or show modal
    console.log('Selected POI:', poi)
    toast.success(`已选择 ${poi.name}`)
  }

  const handleFavorite = (poi: POI) => {
    // Toggle favorite status
    console.log('Toggle favorite for:', poi)
    toast.success(`已${Math.random() > 0.5 ? '添加到' : '从'}收藏夹${Math.random() > 0.5 ? '' : '移除'} ${poi.name}`)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return '早上好'
    if (hour < 18) return '下午好'
    return '晚上好'
  }

  const getLocationDisplay = () => {
    if (!userLocation) return '获取位置中...'
    if (userLocation.address) return userLocation.address
    return `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-sky-500 to-orange-500 p-2 rounded-xl">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent">
                  Maps Explorer
                </h1>
                <p className="text-xs text-gray-500">航空与旅游导览</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Location */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="max-w-32 truncate">{getLocationDisplay()}</span>
              </div>

              {/* Notifications */}
              {user && (
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
              )}

              {/* User Avatar or Login Button */}
              {user ? (
                <UserAvatar />
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {user ? `${getGreeting()}，${user.user_metadata?.full_name || '探索者'}` : '发现精彩世界'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {user 
              ? '今天想去哪里探索？' 
              : '智能推荐 · 精准导航 · 个性化体验'
            }
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              onPOISelect={handlePoiSelect}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '🗺️', title: '探索地图', subtitle: '交互式导览', path: '/map' },
            { icon: '🛣️', title: '路线规划', subtitle: '智能导航', path: '/routes' },
            { icon: '⭐', title: '我的收藏', subtitle: '个人收藏', path: '/profile' },
            { icon: '🎯', title: '附近推荐', subtitle: '发现周边', path: '/map' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Recommendation Sections */}
        <div className="space-y-8">
          {/* Trending Places */}
          <RecommendationSection
            title="热门推荐"
            subtitle="最受欢迎的目的地"
            type="trending"
            onPoiSelect={handlePoiSelect}
            userLocation={userLocation || undefined}
          />

          {/* Nearby Places */}
          {userLocation && (
            <RecommendationSection
              title="附近推荐"
              subtitle="发现周边精彩"
              type="nearby"
              onPoiSelect={handlePoiSelect}
              userLocation={userLocation}
            />
          )}

          {/* Personalized Recommendations */}
          {user && (
            <RecommendationSection
              title="为您推荐"
              subtitle="基于您的喜好"
              type="personalized"
              onPoiSelect={handlePoiSelect}
              userLocation={userLocation || undefined}
            />
          )}

          {/* Category Sections */}
          {[
            { category: 'restaurant', title: '美食推荐', subtitle: '品味当地特色' },
            { category: 'attraction', title: '热门景点', subtitle: '必游打卡地' },
            { category: 'hotel', title: '精选住宿', subtitle: '舒适住宿体验' }
          ].map((section) => (
            <RecommendationSection
              key={section.category}
              title={section.title}
              subtitle={section.subtitle}
              type="category"
              category={section.category}
              onPoiSelect={handlePoiSelect}
              userLocation={userLocation || undefined}
            />
          ))}
        </div>

        {/* Call to Action */}
        {!user && (
          <div className="bg-gradient-to-r from-sky-500 to-orange-500 rounded-2xl p-8 text-center text-white mt-12">
            <h3 className="text-2xl font-bold mb-4">加入Maps Explorer</h3>
            <p className="text-lg mb-6 opacity-90">
              注册账户，享受个性化推荐和更多专属功能
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              立即注册
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Maps Explorer. 让每次旅行都充满惊喜。</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  )
}