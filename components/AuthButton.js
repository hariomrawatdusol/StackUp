'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, User } from 'lucide-react'
import { useAuth } from './AuthProvider'

function GoogleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.75-6-6.15S8.7 5.9 12 5.9c1.9 0 3.15.8 3.87 1.5l2.65-2.55C16.8 3.25 14.6 2.3 12 2.3 6.65 2.3 2.35 6.6 2.35 12S6.65 21.7 12 21.7c6.9 0 9.55-4.85 9.55-7.35 0-.5-.05-.9-.13-1.3H12z"/>
      <path fill="#4285F4" d="M21.55 12.85c0-.5-.05-.9-.13-1.3H12v3.9h5.5c-.24 1.4-.98 2.6-2.1 3.4l3.35 2.6c1.95-1.8 3.05-4.45 3.05-7.6z"/>
      <path fill="#FBBC05" d="M5.4 13.7c-.2-.6-.32-1.25-.32-1.9s.12-1.3.32-1.9L2 7.35C1.35 8.75 1 10.3 1 12s.35 3.25 1 4.65L5.4 13.7z"/>
      <path fill="#34A853" d="M12 21.7c2.6 0 4.8-.85 6.4-2.35l-3.35-2.6c-.9.6-2.05.95-3.05.95-2.65 0-4.9-1.75-5.7-4.15L2 16.65C3.75 19.8 7.55 21.7 12 21.7z"/>
    </svg>
  )
}

function SignInBtn({ onClick, busy = false }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-2 px-3 md:px-4 h-9 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-95 transition-all disabled:opacity-60"
    >
      <GoogleIcon />
      <span className="hidden sm:inline">{busy ? 'Signing in…' : 'Sign in with Google'}</span>
      <span className="sm:hidden">{busy ? '…' : 'Sign in'}</span>
    </button>
  )
}

export default function AuthButton() {
  const { user, mounted, signInWithGoogle, signOut } = useAuth()
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const doSignIn = async () => {
    if (busy) return
    setBusy(true)
    await signInWithGoogle()
    setBusy(false)
  }

  // BEFORE HYDRATION: render the exact same output as SSR (signed-out button).
  // This is critical to avoid hydration mismatch.
  if (!mounted || !user) {
    return <SignInBtn onClick={doSignIn} busy={busy} />
  }

  const first = user.name?.split(' ')[0] || 'Creator'
  const initials = (user.name || user.email || 'S').split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 pl-1 pr-2 md:pr-3 h-9 rounded-full glass hover:bg-white/10 transition"
      >
        <div className="w-7 h-7 rounded-full p-[1.5px] bg-stack-gradient">
          {user.photoURL ? (
            <img src={user.photoURL} referrerPolicy="no-referrer" alt={user.name || ''} className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-black grid place-items-center text-[10px] font-black">{initials}</div>
          )}
        </div>
        <span className="hidden md:inline text-sm font-semibold max-w-[120px] truncate">{first}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-2 w-64 glass rounded-2xl p-2 shadow-2xl z-50"
          >
            <div className="px-3 py-3 flex items-center gap-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-full p-[2px] bg-stack-gradient shrink-0">
                {user.photoURL ? (
                  <img src={user.photoURL} referrerPolicy="no-referrer" alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-black grid place-items-center text-xs font-black">{initials}</div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold truncate">{user.name || first}</div>
                <div className="text-xs text-white/50 truncate">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => { setOpen(false); router.push('/dashboard/creator') }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/5 hover:text-white"
            >
              <User size={16} /> My Dashboard
            </button>
            <button
              onClick={async () => { setOpen(false); await signOut(); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-pink hover:bg-pink/10"
            >
              <LogOut size={16} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
