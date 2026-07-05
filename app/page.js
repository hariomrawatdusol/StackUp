'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Sparkles, Zap, Lock, ArrowRight, Twitter, Instagram, Linkedin } from 'lucide-react'
import Header, { LogoIcon } from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import OpeningAnimation from '@/components/OpeningAnimation'
import GlassCard from '@/components/GlassCard'
import GradientButton from '@/components/GradientButton'
import SkillPill from '@/components/SkillPill'
import CreatorCard from '@/components/CreatorCard'
import MatchViz from '@/components/MatchViz'
import { creators, brandLogos } from '@/lib/mockData'

function Landing() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative pt-20 md:pt-28 pb-20 md:pb-32">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
            <div className="glass rounded-full px-4 py-1.5 text-xs font-medium flex items-center gap-2">
              <Sparkles size={14} className="text-mint" /> New — Multi-skill stacking is live
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-center font-display leading-[0.95]">
            Stop choosing one skill.<br />
            <span className="text-gradient">Stack them all.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 max-w-2xl mx-auto text-center text-lg text-white/70">
            StackUp is where editors who model, designers who influence, and creators who do <span className="text-white font-semibold">everything</span> get booked by top brands.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-10 flex flex-wrap justify-center gap-3">
            <GradientButton href="/onboard?role=creator" variant="primary" size="lg">Join as Creator <ArrowRight size={18} /></GradientButton>
            <GradientButton href="/onboard?role=brand" variant="outline" size="lg">Hire Talent</GradientButton>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              {creators.slice(0,5).map(c => (
                <div key={c.id} className="w-9 h-9 rounded-full ring-2 ring-bg overflow-hidden bg-white/5">
                  <img src={c.avatar} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm text-white/60"><span className="text-white font-semibold">1,200+</span> multi-skill creators already stacking</div>
          </motion.div>
        </div>
      </section>

      {/* BENTO HOW IT WORKS */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-black text-center font-display">How <span className="text-gradient">StackUp</span> Works</h2>
          <p className="text-white/60 text-center mt-3">Three steps to get the bag.</p>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            <GlassCard hover className="md:col-span-1">
              <div className="text-4xl">🎨</div>
              <h3 className="mt-4 text-xl font-bold">List Your Stack</h3>
              <p className="mt-2 text-sm text-white/60">Add skills like Edit + Model + UGC. One profile, all your talents.</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {['Editor','Model','UGC','Design'].map(s => <SkillPill key={s} size="sm" animate={false}>{s}</SkillPill>)}
              </div>
            </GlassCard>

            <GlassCard hover>
              <div className="text-4xl">⚡</div>
              <h3 className="mt-4 text-xl font-bold">Instant Match</h3>
              <p className="mt-2 text-sm text-white/60">We scan projects for skill overlap. 80% match? You&apos;re top of list.</p>
              <div className="mt-5"><MatchViz /></div>
            </GlassCard>

            <GlassCard hover>
              <div className="text-4xl">🔒</div>
              <h3 className="mt-4 text-xl font-bold">Safe Payouts</h3>
              <p className="mt-2 text-sm text-white/60">Money locked in escrow. Deliver work → instant UPI cashout.</p>
              <div className="mt-5 glass rounded-xl p-4">
                <div className="flex items-center justify-between text-sm"><span className="text-white/60">Escrow</span><span className="font-bold text-mint">₹5,000 🔒</span></div>
                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full bg-mint-gradient" /></div>
                <div className="mt-3 text-xs text-white/60">Delivery → UPI in <span className="text-white font-semibold">under 2 min</span></div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CREATOR SPOTLIGHT */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black font-display">Creator <span className="text-pink-gradient">Spotlight</span></h2>
              <p className="text-white/60 mt-2">Stacking bread across Delhi, JMC, IP, DU.</p>
            </div>
            <Link href="/search" className="hidden md:flex items-center gap-1 text-sm text-white/70 hover:text-white">View all <ArrowRight size={16} /></Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
            {creators.slice(0,8).map(c => <CreatorCard key={c.id} creator={c} />)}
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section className="py-14 border-y border-white/10 bg-white/[0.02]">
        <div className="container">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-6">Trusted by</p>
          <div className="marquee">
            <div className="marquee-track">
              {[...brandLogos, ...brandLogos, ...brandLogos].map((b, i) => (
                <div key={i} className="text-3xl md:text-4xl font-black grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition" style={{ color: b.color }}>{b.name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <GlassCard className="text-center py-16 relative overflow-hidden">
            <div className="blob" style={{width:400,height:400,background:'#7B2FFF',top:'-100px',right:'-100px',opacity:0.4}} />
            <div className="blob" style={{width:400,height:400,background:'#FF2E7E',bottom:'-100px',left:'-100px',opacity:0.4}} />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black font-display">Let&apos;s get this <span className="text-gradient">bag.</span></h2>
              <p className="mt-4 text-white/60 max-w-lg mx-auto">Skills that pay bills, delivered in one profile. Stack yours in under 2 minutes.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <GradientButton href="/onboard?role=creator" variant="pink" size="lg">Start Stacking</GradientButton>
                <GradientButton href="/dashboard/brand" variant="outline" size="lg">Post a Project</GradientButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-black font-display">StackUp</span>
            <span className="text-white/50 text-sm ml-2">Built by Gen-Z for Gen-Z.</span>
          </div>
          <div className="flex gap-2">
            {[Twitter, Instagram, Linkedin].map((Ico, i) => (
              <button key={i} onClick={()=>toast('Following soon 👀')} className="w-10 h-10 rounded-full glass grid place-items-center hover:bg-white/10"><Ico size={16} /></button>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const seen = typeof window !== 'undefined' && sessionStorage.getItem('stackup_intro')
    if (seen) setReady(true)
  }, [])

  const done = () => {
    if (typeof window !== 'undefined') sessionStorage.setItem('stackup_intro','1')
    setReady(true)
  }

  return (
    <div className="min-h-screen relative">
      <GradientBlobs />
      {!ready && <OpeningAnimation onDone={done} />}
      <Landing />
    </div>
  )
}

export default App
