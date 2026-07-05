'use client'
import { motion } from 'framer-motion'

export default function MatchViz() {
  const skills = ['Video Editing','Modeling','UGC']
  const creators = [
    { name: 'Riya', match: 100 },
    { name: 'Nikita', match: 66 },
    { name: 'Zoya', match: 66 },
  ]
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-white/60">SKILL MATCH ENGINE</div>
        <div className="text-xs text-mint font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" /> live</div>
      </div>
      <div className="grid grid-cols-3 gap-6 items-center">
        <div className="space-y-2">
          {skills.map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-center">{s}</motion.div>
          ))}
        </div>
        <div className="relative h-full min-h-[160px]">
          <svg viewBox="0 0 100 160" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lg" x1="0" x2="1">
                <stop offset="0" stopColor="#7B2FFF" />
                <stop offset="1" stopColor="#00FFA3" />
              </linearGradient>
            </defs>
            {[[10,20,90,20],[10,80,90,50],[10,140,90,80]].map((c,i) => (
              <motion.line key={i} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke="url(#lg)" strokeWidth="1.5" strokeDasharray="3 3" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }} transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }} />
            ))}
          </svg>
        </div>
        <div className="space-y-2">
          {creators.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }} className={`px-3 py-2 rounded-lg text-xs font-bold text-center ${c.match === 100 ? 'bg-mint-gradient text-black' : 'bg-white/5 border border-white/10'}`}>{c.name} · {c.match}%</motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
