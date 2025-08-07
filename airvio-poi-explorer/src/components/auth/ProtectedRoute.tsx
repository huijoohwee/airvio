import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { AuthModal } from './AuthModal'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { user, loading } = useAuthStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  useEffect(() => {
    if (!loading) {
      setHasCheckedAuth(true)
    }
  }, [loading])

  useEffect(() => {
    if (hasCheckedAuth && !user && !loading) {
      setShowAuthModal(true)
    }
  }, [hasCheckedAuth, user, loading])

  // Show loading spinner while checking authentication
  if (!hasCheckedAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">正在验证身份...</p>
        </div>
      </div>
    )
  }

  // Show auth modal if user is not authenticated
  if (!user) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">需要登录</h2>
              <p className="text-gray-600 mb-6">请登录以访问此页面</p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                立即登录
              </button>
            </div>
          </div>
        )}
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </>
    )
  }

  // User is authenticated, render children
  return <>{children}</>
}