import React, { useState, useEffect } from 'react'
import { ChevronRight, TrendingUp, MapPin, Clock, Sparkles } from 'lucide-react'
import { DestinationCard } from './DestinationCard'
import { supabase } from '../../lib/supabase'
import { POI } from '../../types/database'
import { useAuthStore } from '../../stores/authStore'

interface RecommendationSectionProps {
  title: string
  subtitle?: string
  type: 'trending' | 'nearby' | 'personalized' | 'category'
  category?: string
  onViewAll?: () => void
  onPoiSelect: (poi: POI) => void
  userLocation?: { lat: number; lng: number }
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  title,
  subtitle,
  type,
  category,
  onViewAll,
  onPoiSelect,
  userLocation
}) => {
  const [pois, setPois] = useState<POI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { user } = useAuthStore()

  useEffect(() => {
    fetchPOIs()
    if (user) {
      fetchUserFavorites()
    }
  }, [type, category, userLocation, user])

  const fetchPOIs = async () => {
    setIsLoading(true)
    try {
      let query = supabase.from('pois').select('*')

      switch (type) {
        case 'trending':
          // Get POIs with high ratings and recent activity
          query = query
            .gte('rating', 4.0)
            .order('rating', { ascending: false })
            .limit(6)
          break

        case 'nearby':
          if (userLocation) {
            // Use PostGIS function to find nearby POIs
            const { data } = await supabase.rpc('nearby_pois', {
              lat: userLocation.lat,
              lng: userLocation.lng,
              radius_km: 10
            })
            setPois(data || [])
            setIsLoading(false)
            return
          } else {
            // Fallback to random selection if no location
            query = query.limit(6)
          }
          break

        case 'category':
          if (category) {
            query = query
              .eq('category', category)
              .order('rating', { ascending: false })
              .limit(6)
          }
          break

        case 'personalized':
          // Simple personalization based on user's favorite categories
          if (user) {
            // This could be enhanced with ML recommendations
            query = query
              .gte('rating', 4.0)
              .order('created_at', { ascending: false })
              .limit(6)
          } else {
            query = query
              .gte('rating', 4.5)
              .limit(6)
          }
          break
      }

      const { data, error } = await query
      
      if (error) {
        console.error('Error fetching POIs:', error)
        setPois([])
      } else {
        setPois(data || [])
      }
    } catch (error) {
      console.error('Error fetching POIs:', error)
      setPois([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserFavorites = async () => {
    if (!user) return

    try {
      const { data } = await supabase
        .from('user_favorites')
        .select('poi_id')
        .eq('user_id', user.id)

      if (data) {
        setFavorites(new Set(data.map(fav => fav.poi_id)))
      }
    } catch (error) {
      console.error('Error fetching favorites:', error)
    }
  }

  const handleFavorite = async (poi: POI) => {
    if (!user) return

    const isFavorited = favorites.has(poi.id)
    
    try {
      if (isFavorited) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('poi_id', poi.id)
        
        setFavorites(prev => {
          const newSet = new Set(prev)
          newSet.delete(poi.id)
          return newSet
        })
      } else {
        await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            poi_id: poi.id
          })
        
        setFavorites(prev => new Set([...prev, poi.id]))
      }
    } catch (error) {
      console.error('Error updating favorite:', error)
    }
  }

  const getSectionIcon = () => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-orange-500" />
      case 'nearby':
        return <MapPin className="w-5 h-5 text-blue-500" />
      case 'personalized':
        return <Sparkles className="w-5 h-5 text-purple-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-40 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (pois.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getSectionIcon()}
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
        
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <span>查看全部</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* POI Cards */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {pois.map((poi) => (
          <div key={poi.id} className="flex-shrink-0">
            <DestinationCard
              poi={poi}
              onSelect={onPoiSelect}
              onFavorite={user ? handleFavorite : undefined}
              isFavorited={favorites.has(poi.id)}
              size="medium"
            />
          </div>
        ))}
      </div>

      {/* Show More Button for Mobile */}
      {onViewAll && (
        <div className="mt-4 text-center md:hidden">
          <button
            onClick={onViewAll}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span>查看更多{title}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}