'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SkillPill from './SkillPill'

export default function CreatorCard({ creator, showEarnings=true }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="glass rounded-2xl p-5 flex flex-col gap-3 min-w-[240px]">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-14 h-14 rounded-full p-[2px] bg-stack-gradient">
            <img src={creator.avatar} alt={creator.name} className="w-full h-full rounded-full object-cover bg-white/5" />
          </div>
          {creator.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-mint ring-2 ring-bg" />}
        </div>
        <div className="min-w-0">
          <div className="font-bold truncate">{creator.name}</div>
          <div className="text-xs text-white/50 truncate">{creator.handle}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {creator.skills.slice(0,3).map(s => <SkillPill key={s} size="sm" animate={false} className="hover-wiggle">{s}</SkillPill>)}
      </div>
      {showEarnings && <div className="text-xs text-white/60">Earned <span className="text-mint font-semibold">₹{creator.earned.toLocaleString()}</span> last month</div>}
      <Link href={`/profile/${creator.id}`} className="mt-1 text-center text-sm font-semibold py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">View Stack</Link>
    </motion.div>
  )
}
