import React from 'react'
import { MapPin, Star, Heart, Clock, DollarSign } from 'lucide-react'
import { POI } from '../../types/database'

interface DestinationCardProps {
  poi: POI
  onSelect: (poi: POI) => void
  onFavorite?: (poi: POI) => void
  isFavorited?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  poi,
  onSelect,
  onFavorite,
  isFavorited = false,
  size = 'medium'
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFavorite?.(poi)
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      restaurant: '🍽️',
      hotel: '🏨',
      attraction: '🎯',
      shopping: '🛍️',
      transport: '🚗',
      entertainment: '🎪',
      default: '📍'
    }
    return icons[category] || icons.default
  }

  const getPriceDisplay = (priceRange?: string) => {
    const priceMap: Record<string, string> = {
      '经济': '$',
      '中等': '$$',
      '高端': '$$$'
    }
    return priceMap[priceRange || ''] || ''
  }

  const getCardClasses = () => {
    const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group'
    
    switch (size) {
      case 'small':
        return `${baseClasses} w-64`
      case 'large':
        return `${baseClasses} w-full`
      default:
        return `${baseClasses} w-80`
    }
  }

  const getImageClasses = () => {
    switch (size) {
      case 'small':
        return 'h-32'
      case 'large':
        return 'h-48'
      default:
        return 'h-40'
    }
  }

  return (
    <div className={getCardClasses()} onClick={() => onSelect(poi)}>
      {/* Image */}
      <div className={`relative ${getImageClasses()} bg-gradient-to-br from-sky-400 to-orange-400`}>
        {poi.images && poi.images.length > 0 ? (
          <img
            src={poi.images[0]}
            alt={poi.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">{getCategoryIcon(poi.category)}</div>
              <p className="text-sm font-medium">{poi.category}</p>
            </div>
          </div>
        )}
        
        {/* Favorite Button */}
        {onFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              isFavorited
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
            <span className="mr-1">{getCategoryIcon(poi.category)}</span>
            {poi.category}
          </span>
        </div>

        {/* Price Badge */}
        {poi.price_range && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <DollarSign className="w-3 h-3 mr-1" />
              {getPriceDisplay(poi.price_range)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-gray-900 group-hover:text-orange-600 transition-colors ${
            size === 'small' ? 'text-sm' : 'text-lg'
          }`}>
            {poi.name}
          </h3>
          
          {poi.rating && (
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {poi.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className={`truncate ${
            size === 'small' ? 'text-xs' : 'text-sm'
          }`}>
            {poi.address}
          </span>
        </div>

        {/* Description */}
        {poi.description && size !== 'small' && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {poi.description}
          </p>
        )}

        {/* Tags */}
        {poi.tags && poi.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {poi.tags.slice(0, size === 'small' ? 2 : 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {poi.tags.length > (size === 'small' ? 2 : 3) && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{poi.tags.length - (size === 'small' ? 2 : 3)}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>
              {poi.business_hours ? '营业中' : '查看营业时间'}
            </span>
          </div>
          
          {poi.distance && (
            <span>
              {poi.distance < 1000 
                ? `${Math.round(poi.distance)}m` 
                : `${(poi.distance / 1000).toFixed(1)}km`
              }
            </span>
          )}
        </div>
      </div>
    </div>
  )
}