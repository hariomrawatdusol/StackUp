'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Wallet, User, Home as HomeIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import AuthButton from './AuthButton'
import { useAuth } from './AuthProvider'

function LogoIcon({ size=28 }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div layout className="absolute inset-0 grid grid-cols-2 gap-[2px]">
        <div className="rounded-[4px] bg-gradient-to-br from-[#7B2FFF] to-[#00C2FF]" />
        <div className="rounded-[4px] bg-[#FF2E7E]" />
        <div className="rounded-[4px] bg-[#00FFA3]" />
        <div className="rounded-[4px] bg-white/90" />
      </motion.div>
    </div>
  )
}

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-2xl bg-black/40">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoIcon />
            <span className="text-xl font-black tracking-tight font-display">StackUp</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/search" className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition">Explore</Link>
            <Link href="/dashboard/creator" className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition">Creators</Link>
            <Link href="/dashboard/brand" className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition">Brands</Link>
          </nav>
          <div className="flex items-center gap-2">
            <AuthButton />
            <Link href="/onboard" className="hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-stack-gradient glow-purple transition-all active:scale-95">Get Started</Link>
          </div>
        </div>
      </header>
      <MobileDock />
    </>
  )
}

function MobileDock() {
  const p = usePathname()
  const router = useRouter()
  const { user, mounted, signInWithGoogle } = useAuth()

  const onProfileClick = async (e) => {
    e.preventDefault()
    if (user) {
      router.push('/dashboard/creator')
    } else {
      const u = await signInWithGoogle()
      if (u) router.push('/dashboard/creator')
    }
  }

  // Only show avatar photo after client mount to keep SSR/CSR identical
  const showAvatar = mounted && user?.photoURL

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <div className="glass rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl">
        <Link href="/" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl ${p === '/' ? 'bg-white/10 text-white' : 'text-white/60'}`}>
          <HomeIcon size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl ${p === '/search' ? 'bg-white/10 text-white' : 'text-white/60'}`}>
          <Search size={20} />
          <span className="text-[10px] font-medium">Search</span>
        </Link>
        <Link href="/wallet" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl ${p === '/wallet' ? 'bg-white/10 text-white' : 'text-white/60'}`}>
          <Wallet size={20} />
          <span className="text-[10px] font-medium">Wallet</span>
        </Link>
        <button
          onClick={onProfileClick}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl ${p === '/dashboard/creator' ? 'bg-white/10 text-white' : 'text-white/60'}`}
        >
          {showAvatar ? (
            <img src={user.photoURL} referrerPolicy="no-referrer" alt="" className="w-5 h-5 rounded-full object-cover" />
          ) : (
            <User size={20} />
          )}
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  )
}

export { LogoIcon }
