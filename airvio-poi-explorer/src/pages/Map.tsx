import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { Search, Filter, Navigation, MapPin } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { POI } from '../types/database'
import 'mapbox-gl/dist/mapbox-gl.css'

// Mapbox access token - 在实际部署时需要设置环境变量
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibWFwc2V4cGxvcmVyIiwiYSI6ImNscXh5ejF6YjBhZGkya3BjZGVxbXVxZXgifQ.example'

interface MapProps {
  className?: string
}

const Map: React.FC<MapProps> = ({ className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [pois, setPois] = useState<POI[]>([])
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Helper function to extract coordinates from PostGIS geometry
  const getCoordinates = (location: any): { lng: number; lat: number } | null => {
    if (!location) return null
    
    // Handle different PostGIS geometry formats
    if (typeof location === 'string') {
      try {
        const parsed = JSON.parse(location)
        if (parsed.coordinates && Array.isArray(parsed.coordinates)) {
          return { lng: parsed.coordinates[0], lat: parsed.coordinates[1] }
        }
      } catch (e) {
        console.warn('Failed to parse location string:', e)
      }
    }
    
    if (location.coordinates && Array.isArray(location.coordinates)) {
      return { lng: location.coordinates[0], lat: location.coordinates[1] }
    }
    
    // Fallback for direct lat/lng properties
    if (location.lng && location.lat) {
      return { lng: location.lng, lat: location.lat }
    }
    
    return null
  }
  const [isLoading, setIsLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  // 获取用户位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude])
        },
        (error) => {
          console.log('获取位置失败:', error)
          // 默认位置：北京
          setUserLocation([116.4074, 39.9042])
        }
      )
    } else {
      // 默认位置：北京
      setUserLocation([116.4074, 39.9042])
    }
  }, [])

  // 初始化地图
  useEffect(() => {
    if (!mapContainer.current || !userLocation) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userLocation,
      zoom: 12,
      attributionControl: false
    })

    // 添加导航控件
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // 添加用户位置标记
    new mapboxgl.Marker({ color: '#0ea5e9' })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setHTML('<div class="text-sm font-medium">您的位置</div>'))
      .addTo(map.current)

    setIsLoading(false)

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [userLocation])

  // 获取POI数据
  useEffect(() => {
    const fetchPOIs = async () => {
      try {
        const { data, error } = await supabase
          .from('pois')
          .select('*')
          .eq('status', 'active')

        if (error) throw error
        setPois(data || [])
      } catch (error) {
        console.error('获取POI数据失败:', error)
      }
    }

    fetchPOIs()
  }, [])

  // 在地图上添加POI标记
  useEffect(() => {
    if (!map.current || !pois.length) return

    // 清除现有标记
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker')
    existingMarkers.forEach(marker => {
      if (!marker.classList.contains('user-location')) {
        marker.remove()
      }
    })

    // 过滤POI
    const filteredPois = pois.filter(poi => {
      const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           poi.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || poi.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // 添加POI标记
    filteredPois.forEach(poi => {
      const coords = getCoordinates(poi.location)
      if (coords) {
        const markerColor = getCategoryColor(poi.category)
        
        const marker = new mapboxgl.Marker({ color: markerColor })
          .setLngLat([coords.lng, coords.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-3 max-w-xs">
                  <h3 class="font-semibold text-gray-900 mb-1">${poi.name}</h3>
                  <p class="text-sm text-gray-600 mb-2">${poi.description || ''}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded">${poi.category}</span>
                    ${poi.rating ? `<span class="text-xs text-yellow-600">⭐ ${poi.rating}</span>` : ''}
                  </div>
                </div>
              `)
          )
          .addTo(map.current!)
      }
    })
  }, [pois, searchQuery, selectedCategory])

  // 获取分类颜色
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'restaurant': '#f97316', // 旅游橙
      'hotel': '#0ea5e9', // 天空蓝
      'attraction': '#10b981', // 绿色
      'shopping': '#8b5cf6', // 紫色
      'transport': '#ef4444', // 红色
      'entertainment': '#f59e0b', // 黄色
    }
    return colors[category] || '#6b7280'
  }

  // 搜索POI
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // 筛选分类
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
  }

  // 定位到POI
  const flyToPOI = (poi: POI) => {
    const coords = getCoordinates(poi.location)
    if (map.current && coords) {
      map.current.flyTo({
        center: [coords.lng, coords.lat],
        zoom: 15,
        duration: 1000
      })
    }
  }

  const categories = [
    { value: 'all', label: '全部', icon: MapPin },
    { value: 'restaurant', label: '餐厅', icon: MapPin },
    { value: 'hotel', label: '酒店', icon: MapPin },
    { value: 'attraction', label: '景点', icon: MapPin },
    { value: 'shopping', label: '购物', icon: MapPin },
    { value: 'transport', label: '交通', icon: MapPin },
    { value: 'entertainment', label: '娱乐', icon: MapPin },
  ]

  return (
    <div className={`relative h-screen bg-gray-50 ${className}`}>
      {/* 搜索栏 */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索地点、餐厅、景点..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          
          {/* 分类筛选 */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.value}
                  onClick={() => handleCategoryFilter(category.value)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 地图容器 */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto mb-2"></div>
            <p className="text-gray-600">加载地图中...</p>
          </div>
        </div>
      )}

      {/* POI列表（移动端底部抽屉） */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg max-h-48 overflow-hidden z-10 md:hidden">
        <div className="p-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 className="font-semibold text-gray-900 mb-3">附近地点</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {pois.filter(poi => {
              const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase())
              const matchesCategory = selectedCategory === 'all' || poi.category === selectedCategory
              return matchesSearch && matchesCategory
            }).slice(0, 5).map((poi) => (
              <div
                key={poi.id}
                onClick={() => flyToPOI(poi)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getCategoryColor(poi.category) }}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{poi.name}</p>
                  <p className="text-xs text-gray-500 truncate">{poi.category}</p>
                </div>
                {poi.rating && (
                  <span className="text-xs text-yellow-600">⭐ {poi.rating}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map