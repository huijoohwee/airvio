import React, { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Clock, Filter, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { POI } from '../../types/database'

interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void
  onPOISelect?: (poi: POI) => void
}

interface SearchFilters {
  category?: string
  priceRange?: string
  rating?: number
}

interface SearchSuggestion {
  id: string
  title: string
  type: 'poi' | 'category' | 'location'
  subtitle?: string
  icon?: React.ReactNode
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onPOISelect }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [isLoading, setIsLoading] = useState(false)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Categories for quick search
  const categories = [
    { id: 'restaurant', name: '餐厅', icon: '🍽️' },
    { id: 'hotel', name: '酒店', icon: '🏨' },
    { id: 'attraction', name: '景点', icon: '🎯' },
    { id: 'shopping', name: '购物', icon: '🛍️' },
    { id: 'transport', name: '交通', icon: '🚗' },
    { id: 'entertainment', name: '娱乐', icon: '🎪' }
  ]

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch search suggestions
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const { data: pois } = await supabase
        .from('pois')
        .select('id, name, category, address, rating')
        .or(`name.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
        .limit(8)

      const poiSuggestions: SearchSuggestion[] = (pois || []).map(poi => ({
        id: poi.id,
        title: poi.name,
        type: 'poi' as const,
        subtitle: poi.address,
        icon: <MapPin className="w-4 h-4 text-orange-500" />
      }))

      // Add category suggestions
      const categorySuggestions: SearchSuggestion[] = categories
        .filter(cat => cat.name.includes(searchQuery) || cat.id.includes(searchQuery.toLowerCase()))
        .map(cat => ({
          id: cat.id,
          title: cat.name,
          type: 'category' as const,
          subtitle: '浏览分类',
          icon: <span className="text-lg">{cat.icon}</span>
        }))

      setSuggestions([...categorySuggestions, ...poiSuggestions])
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input change
  const handleInputChange = (value: string) => {
    setQuery(value)
    setShowSuggestions(true)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchSuggestions(value)
    }, 300)

    return () => clearTimeout(timeoutId)
  }

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (finalQuery.trim()) {
      onSearch(finalQuery, filters)
      setShowSuggestions(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'poi') {
      // Fetch full POI data and call onPOISelect
      try {
        const { data: poi } = await supabase
          .from('pois')
          .select('*')
          .eq('id', suggestion.id)
          .single()
        
        if (poi && onPOISelect) {
          onPOISelect(poi)
        }
      } catch (error) {
        console.error('Error fetching POI:', error)
      }
    } else if (suggestion.type === 'category') {
      setFilters(prev => ({ ...prev, category: suggestion.id }))
      handleSearch(suggestion.title)
    }
    
    setQuery(suggestion.title)
    setShowSuggestions(false)
  }

  // Clear search
  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setFilters({})
    inputRef.current?.focus()
  }

  return (
    <div className="relative" ref={searchRef}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
          className="block w-full pl-12 pr-20 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
          placeholder="搜索目的地、景点、餐厅..."
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters || Object.keys(filters).length > 0
                ? 'bg-orange-100 text-orange-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Category Buttons */}
      <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setFilters(prev => ({ ...prev, category: category.id }))
              handleSearch(category.name)
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filters.category === category.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (query.length > 0 || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-sm">搜索中...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.type}-${suggestion.id}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-shrink-0">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {suggestion.title}
                    </p>
                    {suggestion.subtitle && (
                      <p className="text-sm text-gray-500 truncate">
                        {suggestion.subtitle}
                      </p>
                    )}
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          ) : query.length > 1 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">未找到相关结果</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-40 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">筛选条件</h3>
          
          <div className="space-y-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">价格范围</label>
              <div className="flex space-x-2">
                {['经济', '中等', '高端'].map((price) => (
                  <button
                    key={price}
                    onClick={() => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: prev.priceRange === price ? undefined : price 
                    }))}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      filters.priceRange === price
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">最低评分</label>
              <div className="flex space-x-2">
                {[3, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters(prev => ({ 
                      ...prev, 
                      rating: prev.rating === rating ? undefined : rating 
                    }))}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      filters.rating === rating
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rating}+ ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => {
                setFilters({})
                setShowFilters(false)
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              清除
            </button>
            <button
              onClick={() => {
                handleSearch()
                setShowFilters(false)
              }}
              className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
            >
              应用筛选
            </button>
          </div>
        </div>
      )}
    </div>
  )
}