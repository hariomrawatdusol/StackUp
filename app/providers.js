'use client'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/AuthProvider'

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(20,20,22,0.95)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            borderRadius: '14px',
            padding: '12px 16px',
            fontWeight: 500,
            boxShadow: '0 10px 40px rgba(123,47,255,0.25)',
          },
        }}
      />
    </AuthProvider>
  )
}
