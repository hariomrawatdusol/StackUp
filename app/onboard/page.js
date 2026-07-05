'use client'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Scissors, Camera, Palette, ShoppingBag, Zap, Building2 } from 'lucide-react'
import Header from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import GradientButton from '@/components/GradientButton'
import { useStore } from '@/lib/store'

function OnboardInner() {
  const params = useSearchParams()
  const router = useRouter()
  const setRole = useStore(s => s.setRole)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const role = params.get('role')
    if (role === 'creator' || role === 'brand') setRole(role)
  }, [params, setRole])

  const go = (role) => {
    setRole(role)
    router.push(role === 'creator' ? '/dashboard/creator' : '/dashboard/brand')
  }

  return (
    <>
      <Header />
      <div className="container py-10 md:py-20">
        <h1 className="text-4xl md:text-6xl font-black text-center font-display">Pick your <span className="text-gradient">side</span>.</h1>
        <p className="text-white/60 text-center mt-3 max-w-lg mx-auto">You can switch anytime. No cap.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-4 min-h-[70vh]">
          <motion.button
            onHoverStart={() => setHovered('creator')}
            onHoverEnd={() => setHovered(null)}
            onClick={() => go('creator')}
            animate={{ scale: hovered === 'creator' ? 1.02 : hovered === 'brand' ? 0.98 : 1 }}
            className="glass rounded-3xl p-10 relative overflow-hidden text-left group flex flex-col justify-between min-h-[400px] md:min-h-full"
          >
            <div className="blob" style={{width:360,height:360,background:'#FF2E7E',top:'-80px',right:'-80px',opacity:0.35}} />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs font-semibold text-pink"><Zap size={14} /> CREATOR</div>
              <h2 className="mt-3 text-4xl md:text-5xl font-black font-display">I&apos;m a Creator</h2>
              <p className="mt-3 text-white/60 max-w-sm">Stack your skills. Get matched. Cash out via UPI. Skills that pay bills, unlocked.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[Scissors, Camera, Palette].map((Ico, i) => (
                  <motion.div key={i} initial={{ y: 0 }} animate={{ y: hovered === 'creator' ? [-4, 4, -4] : 0 }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-12 h-12 rounded-2xl glass grid place-items-center"><Ico size={20} /></motion.div>
                ))}
              </div>
            </div>
            <GradientButton variant="pink" className="self-start relative">Build My Stack →</GradientButton>
          </motion.button>

          <motion.button
            onHoverStart={() => setHovered('brand')}
            onHoverEnd={() => setHovered(null)}
            onClick={() => go('brand')}
            animate={{ scale: hovered === 'brand' ? 1.02 : hovered === 'creator' ? 0.98 : 1 }}
            className="glass rounded-3xl p-10 relative overflow-hidden text-left flex flex-col justify-between min-h-[400px] md:min-h-full"
          >
            <div className="blob" style={{width:360,height:360,background:'#00C2FF',bottom:'-80px',left:'-80px',opacity:0.35}} />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00C2FF]"><Building2 size={14} /> BRAND</div>
              <h2 className="mt-3 text-4xl md:text-5xl font-black font-display">I&apos;m a Brand</h2>
              <p className="mt-3 text-white/60 max-w-sm">Hire creators who do 3 jobs in one. Escrow protected. Zero babysitting.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Boat','Sugar','Myntra'].map((n, i) => (
                  <motion.div key={n} initial={{ y: 0 }} animate={{ y: hovered === 'brand' ? [4, -4, 4] : 0 }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="px-3 h-12 rounded-2xl glass grid place-items-center font-black text-sm">{n}</motion.div>
                ))}
              </div>
            </div>
            <GradientButton variant="primary" className="self-start relative">Post a Project →</GradientButton>
          </motion.button>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen relative">
      <GradientBlobs />
      <Suspense fallback={<div />}> <OnboardInner /> </Suspense>
    </div>
  )
}

export default App
