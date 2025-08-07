import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, Clock, Car, Bike, Footprints, Bus, Save, Share2 } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import { toast } from 'sonner'
import type { Route } from '../types/database'

// Mapbox access token (需要在.env中配置)
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'

interface RoutePoint {
  coordinates: [number, number]
  name: string
  address?: string
}

interface RouteData {
  geometry: {
    coordinates: [number, number][]
  }
  duration: number
  distance: number
  legs: Array<{
    duration: number
    distance: number
    steps: Array<{
      instruction: string
      distance: number
      duration: number
    }>
  }>
}

const transportModes = [
  { id: 'driving', name: '驾车', icon: Car, color: 'bg-blue-500' },
  { id: 'walking', name: '步行', icon: Footprints, color: 'bg-green-500' },
  { id: 'cycling', name: '骑行', icon: Bike, color: 'bg-orange-500' },
  { id: 'transit', name: '公交', icon: Bus, color: 'bg-purple-500' }
]

export default function Routes() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const { user } = useAuthStore()
  
  const [startPoint, setStartPoint] = useState<RoutePoint | null>(null)
  const [endPoint, setEndPoint] = useState<RoutePoint | null>(null)
  const [transportMode, setTransportMode] = useState('driving')
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [savedRoutes, setSavedRoutes] = useState<Route[]>([])
  const [routeName, setRouteName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // 初始化地图
  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [116.4074, 39.9042], // 北京
      zoom: 10
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }), 'top-right')

    // 地图点击事件
    map.current.on('click', handleMapClick)

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  // 加载用户保存的路线
  useEffect(() => {
    if (user) {
      loadSavedRoutes()
    }
  }, [user])

  const loadSavedRoutes = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSavedRoutes(data || [])
    } catch (error) {
      console.error('加载保存的路线失败:', error)
    }
  }

  const handleMapClick = async (e: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = e.lngLat
    
    try {
      // 反向地理编码获取地址
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&language=zh`
      )
      const data = await response.json()
      const address = data.features[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      
      const point: RoutePoint = {
        coordinates: [lng, lat],
        name: data.features[0]?.text || '选择的位置',
        address
      }

      if (!startPoint) {
        setStartPoint(point)
        addMarker([lng, lat], '起点', '#22c55e')
      } else if (!endPoint) {
        setEndPoint(point)
        addMarker([lng, lat], '终点', '#ef4444')
      } else {
        // 重新选择起点
        clearRoute()
        setStartPoint(point)
        setEndPoint(null)
        addMarker([lng, lat], '起点', '#22c55e')
      }
    } catch (error) {
      console.error('获取地址信息失败:', error)
    }
  }

  const addMarker = (coordinates: [number, number], title: string, color: string) => {
    if (!map.current) return

    new mapboxgl.Marker({ color })
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(title))
      .addTo(map.current)
  }

  const calculateRoute = async () => {
    if (!startPoint || !endPoint || !map.current) return

    setIsCalculating(true)
    
    try {
      const profile = transportMode === 'transit' ? 'driving' : transportMode
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startPoint.coordinates[0]},${startPoint.coordinates[1]};${endPoint.coordinates[0]},${endPoint.coordinates[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}&language=zh`
      )
      
      const data = await response.json()
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0]
        setRouteData(route)
        displayRoute(route)
        
        // 调整地图视角以显示整个路线
        const coordinates = route.geometry.coordinates
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord as [number, number])
        }, new mapboxgl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number]))
        
        map.current.fitBounds(bounds, { padding: 50 })
      } else {
        toast.error('无法计算路线，请重新选择起点和终点')
      }
    } catch (error) {
      console.error('路线计算失败:', error)
      toast.error('路线计算失败，请稍后重试')
    } finally {
      setIsCalculating(false)
    }
  }

  const displayRoute = (route: RouteData) => {
    if (!map.current) return

    // 移除之前的路线
    if (map.current.getSource('route')) {
      map.current.removeLayer('route')
      map.current.removeSource('route')
    }

    // 添加新路线
    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route.geometry.coordinates
        }
      }
    })

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 5,
        'line-opacity': 0.75
      }
    })
  }

  const clearRoute = () => {
    if (!map.current) return

    // 清除所有标记
    const markers = document.querySelectorAll('.mapboxgl-marker')
    markers.forEach(marker => marker.remove())

    // 清除路线
    if (map.current.getSource('route')) {
      map.current.removeLayer('route')
      map.current.removeSource('route')
    }

    setStartPoint(null)
    setEndPoint(null)
    setRouteData(null)
  }

  const saveRoute = async () => {
    if (!user || !routeData || !startPoint || !endPoint || !routeName.trim()) {
      toast.error('请填写路线名称')
      return
    }

    try {
      const waypoints = {
        start: startPoint,
        end: endPoint,
        geometry: {
          type: 'LineString',
          coordinates: routeData.geometry.coordinates
        }
      }

      const { error } = await supabase
        .from('routes')
        .insert({
          user_id: user.id,
          name: routeName.trim(),
          description: `从 ${startPoint.name} 到 ${endPoint.name}`,
          waypoints,
          total_distance: routeData.distance,
          estimated_duration: routeData.duration,
          transportation_mode: transportMode,
          is_public: false
        })

      if (error) throw error

      toast.success('路线保存成功')
      setShowSaveDialog(false)
      setRouteName('')
      loadSavedRoutes()
    } catch (error) {
      console.error('保存路线失败:', error)
      toast.error('保存路线失败')
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 地图容器 */}
      <div ref={mapContainer} className="h-64 md:h-80" />

      {/* 控制面板 */}
      <div className="p-4 space-y-4">
        {/* 起点终点信息 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">路线规划</h2>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">起点</p>
                <p className="text-gray-900">
                  {startPoint ? startPoint.address || startPoint.name : '点击地图选择起点'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">终点</p>
                <p className="text-gray-900">
                  {endPoint ? endPoint.address || endPoint.name : '点击地图选择终点'}
                </p>
              </div>
            </div>
          </div>

          {/* 交通方式选择 */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">交通方式</p>
            <div className="grid grid-cols-4 gap-2">
              {transportModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setTransportMode(mode.id)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      transportMode === mode.id
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${
                      transportMode === mode.id ? 'text-sky-600' : 'text-gray-600'
                    }`} />
                    <p className={`text-xs ${
                      transportMode === mode.id ? 'text-sky-600' : 'text-gray-600'
                    }`}>
                      {mode.name}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-4 flex space-x-2">
            <button
              onClick={calculateRoute}
              disabled={!startPoint || !endPoint || isCalculating}
              className="flex-1 bg-sky-600 text-white py-2 px-4 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isCalculating ? '计算中...' : '开始导航'}
            </button>
            
            <button
              onClick={clearRoute}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
            >
              清除
            </button>
          </div>
        </div>

        {/* 路线信息 */}
        {routeData && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">路线详情</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSaveDialog(true)}
                  className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">预计时间</p>
                  <p className="font-medium">{formatDuration(routeData.duration)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">总距离</p>
                  <p className="font-medium">{formatDistance(routeData.distance)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 保存的路线 */}
        {savedRoutes.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">我的路线</h3>
            <div className="space-y-2">
              {savedRoutes.slice(0, 3).map((route) => (
                <div key={route.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{route.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatDistance(route.total_distance)} · {formatDuration(route.estimated_duration)}
                      </p>
                    </div>
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 保存路线对话框 */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">保存路线</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                路线名称
              </label>
              <input
                type="text"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="输入路线名称"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={saveRoute}
                className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}