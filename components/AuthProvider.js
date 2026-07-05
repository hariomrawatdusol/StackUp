'use client'
import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext({
  user: null,
  mounted: false,
  loading: true,
  signInWithGoogle: async () => null,
  signOut: async () => {},
})

const STORAGE_KEY = 'stackup_user'

function serializeUser(u) {
  if (!u) return null
  return {
    uid: u.uid,
    email: u.email,
    name: u.displayName,
    photoURL: u.photoURL,
  }
}

export function AuthProvider({ children }) {
  // IMPORTANT: identical initial state on server and client to avoid hydration mismatch.
  const [user, setUser] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const authRef = useRef(null)          // { auth, googleProvider } once loaded
  const authFnsRef = useRef(null)       // { signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence }

  useEffect(() => {
    let cancelled = false
    let unsub = () => {}

    // 1) Hydrate from localStorage first (zero-flicker, purely client)
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') setUser(parsed)
      }
    } catch {}
    setMounted(true)

    // 2) Lazy-load Firebase SDK (browser only) and wire the listener
    ;(async () => {
      try {
        const [{ auth, googleProvider }, fns] = await Promise.all([
          import('@/lib/firebase'),
          import('firebase/auth'),
        ])
        if (cancelled) return
        authRef.current = { auth, googleProvider }
        authFnsRef.current = fns

        try {
          await fns.setPersistence(auth, fns.browserLocalPersistence)
        } catch (e) {
          console.warn('[auth] persistence set failed (non-fatal):', e?.code || e?.message)
        }

        unsub = fns.onAuthStateChanged(auth, (fbUser) => {
          const u = serializeUser(fbUser)
          setUser(u)
          try {
            if (u) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
            else window.localStorage.removeItem(STORAGE_KEY)
          } catch {}
          setLoading(false)
        })
      } catch (e) {
        console.error('[auth] init failed:', e)
        setLoading(false)
      }
    })()

    return () => { cancelled = true; try { unsub() } catch {} }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      // Ensure SDK is loaded (in case user clicks before effect finished)
      if (!authRef.current || !authFnsRef.current) {
        const [{ auth, googleProvider }, fns] = await Promise.all([
          import('@/lib/firebase'),
          import('firebase/auth'),
        ])
        authRef.current = { auth, googleProvider }
        authFnsRef.current = fns
      }
      const { auth, googleProvider } = authRef.current
      const { signInWithPopup } = authFnsRef.current
      const res = await signInWithPopup(auth, googleProvider)
      const u = serializeUser(res.user)
      if (u) {
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u)) } catch {}
        toast.success(`Welcome, ${u.name?.split(' ')[0] || 'Creator'} 🎉`)
      }
      return u
    } catch (e) {
      const code = e?.code || ''
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return null
      if (code === 'auth/unauthorized-domain') {
        toast.error('This domain is not authorized in Firebase. Add it under Auth → Settings → Authorized domains.')
      } else if (code === 'auth/popup-blocked') {
        toast.error('Popup blocked. Allow popups and try again.')
      } else {
        toast.error(e?.message || 'Sign-in failed')
      }
      console.error('[auth] signInWithGoogle', e)
      return null
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      if (!authRef.current || !authFnsRef.current) {
        const [{ auth }, fns] = await Promise.all([
          import('@/lib/firebase'),
          import('firebase/auth'),
        ])
        authRef.current = { ...(authRef.current || {}), auth }
        authFnsRef.current = fns
      }
      await authFnsRef.current.signOut(authRef.current.auth)
      try { window.localStorage.removeItem(STORAGE_KEY) } catch {}
      toast.success('Logged out')
    } catch (e) {
      console.error('[auth] signOut', e)
      toast.error('Logout failed')
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, mounted, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
