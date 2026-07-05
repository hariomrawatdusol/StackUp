'use client'
import { use } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Header from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import GlassCard from '@/components/GlassCard'
import GradientButton from '@/components/GradientButton'
import SkillPill from '@/components/SkillPill'
import { getCreator, PORTFOLIO } from '@/lib/mockData'

const REVIEWS = [
  { text: 'Great stack! Edited + modeled same day ⭐⭐⭐⭐⭐', by: 'Boat' },
  { text: 'Fastest turnaround. Copy slapped. Would rehire.', by: 'Sugar' },
  { text: 'One creator, three deliverables. No cap.', by: 'Myntra' },
]

function App({ params }) {
  const resolved = typeof params?.then === 'function' ? use(params) : params
  const c = getCreator(resolved.id)

  if (!c) return (
    <div className="min-h-screen relative"><GradientBlobs /><Header />
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-black">Creator not found.</h1>
        <div className="mt-6"><GradientButton href="/search" variant="primary">Explore Creators</GradientButton></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen relative pb-24">
      <GradientBlobs />
      <Header />
      <div className="container py-8">
        {/* cover */}
        <div className="relative h-40 md:h-56 rounded-3xl overflow-hidden glass">
          <div className="blob" style={{width:340,height:340,background:'#7B2FFF',top:'-100px',left:'10%',opacity:0.5}} />
          <div className="blob" style={{width:340,height:340,background:'#FF2E7E',top:'-80px',right:'10%',opacity:0.5}} />
          <div className="blob" style={{width:340,height:340,background:'#00C2FF',bottom:'-140px',left:'40%',opacity:0.5}} />
        </div>

        <div className="-mt-16 md:-mt-20 px-2 md:px-4 flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-stack-gradient">
              <img src={c.avatar} alt={c.name} className="w-full h-full rounded-full object-cover ring-4 ring-bg" />
            </div>
            {c.online && <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-mint ring-2 ring-bg" />}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black font-display">{c.name}</h1>
            <div className="text-white/60">{c.handle} · {c.college}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.skills.map(s => <SkillPill key={s} size="sm" className="hover-wiggle" animate={false}>{s}</SkillPill>)}
            </div>
          </div>
          <div className="flex gap-2">
            <GradientButton variant="pink" onClick={() => toast.success(`Request sent to ${c.name.split(' ')[0]} 💌`)}>Hire {c.name.split(' ')[0]}</GradientButton>
            <GradientButton variant="outline" onClick={() => toast('Chat soon 💬')}>Message</GradientButton>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <GlassCard>
            <div className="text-xs text-white/50">RATES</div>
            <div className="mt-1 text-2xl font-black">Starting at ₹{c.rate.toLocaleString()}<span className="text-sm text-white/50 font-normal">/project</span></div>
            <div className="mt-2 text-sm text-white/60">{c.bio || 'Multi-skill creator stacking bread across brands.'}</div>
          </GlassCard>
          <GlassCard>
            <div className="text-xs text-white/50">EARNED (30D)</div>
            <div className="mt-1 text-2xl font-black text-mint">₹{c.earned.toLocaleString()}</div>
            <div className="mt-2 text-sm text-white/60">Consistent shipping. Consistent bag.</div>
          </GlassCard>
          <GlassCard>
            <div className="text-xs text-white/50">RESPONSE</div>
            <div className="mt-1 text-2xl font-black">Under 30 min</div>
            <div className="mt-2 text-sm text-white/60">Fast replies, faster edits.</div>
          </GlassCard>
        </div>

        <h2 className="mt-10 text-2xl font-black font-display">Portfolio</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[0,1,2,3,0,1].map((idx, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
              <img src={PORTFOLIO[idx]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 grid place-items-center transition">
                <div className="w-12 h-12 rounded-full bg-white/90 grid place-items-center text-black">▶</div>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-black font-display">Reviews</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          {REVIEWS.map((r, i) => (
            <GlassCard key={i}>
              <div className="text-sm text-white/80">&ldquo;{r.text}&rdquo;</div>
              <div className="mt-3 text-xs text-white/50">— {r.by}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
