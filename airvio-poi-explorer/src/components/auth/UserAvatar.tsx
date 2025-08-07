import React, { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut, Heart, MapPin, CreditCard } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { toast } from 'sonner'

interface UserAvatarProps {
  onProfileClick?: () => void
  onFavoritesClick?: () => void
  onOrdersClick?: () => void
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  onProfileClick,
  onFavoritesClick,
  onOrdersClick
}) => {
  const { user, signOut } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('已成功退出登录')
      setIsDropdownOpen(false)
    } catch (error) {
      toast.error('退出登录失败')
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const menuItems = [
    {
      icon: Settings,
      label: '个人资料',
      onClick: () => {
        onProfileClick?.()
        setIsDropdownOpen(false)
      }
    },
    {
      icon: Heart,
      label: '我的收藏',
      onClick: () => {
        onFavoritesClick?.()
        setIsDropdownOpen(false)
      }
    },
    {
      icon: MapPin,
      label: '我的路线',
      onClick: () => {
        // TODO: Navigate to routes page
        setIsDropdownOpen(false)
      }
    },
    {
      icon: CreditCard,
      label: '订单历史',
      onClick: () => {
        onOrdersClick?.()
        setIsDropdownOpen(false)
      }
    }
  ]

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata?.full_name || 'User'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(user.user_metadata?.full_name || user.email || 'U')
          )}
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.user_metadata?.full_name || user.email}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.user_metadata?.full_name || '用户'}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="w-4 h-4 mr-3 text-gray-400" />
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  )
}