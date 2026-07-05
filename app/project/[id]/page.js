'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Header from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import GlassCard from '@/components/GlassCard'
import GradientButton from '@/components/GradientButton'
import SkillPill from '@/components/SkillPill'
import { useStore } from '@/lib/store'
import { creators, matchPercent } from '@/lib/mockData'

function App({ params }) {
  const resolved = typeof params?.then === 'function' ? use(params) : params
  const id = resolved.id
  const project = useStore(s => s.projects.find(p => p.id === id))
  const hired = useStore(s => s.hired[id])
  const hireCreator = useStore(s => s.hireCreator)

  if (!project) return (
    <div className="min-h-screen relative"><GradientBlobs /><Header />
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-black">Project not found.</h1>
        <div className="mt-6"><GradientButton href="/dashboard/brand" variant="primary">Back to dashboard</GradientButton></div>
      </div>
    </div>
  )

  const applicants = project.applicants.map(aid => creators.find(c => c.id === aid)).filter(Boolean)

  const hire = (cid) => {
    hireCreator(id, cid)
    toast.success('Hired! Escrow active 🔒')
  }

  return (
    <div className="min-h-screen relative pb-24">
      <GradientBlobs />
      <Header />
      <div className="container py-8">
        <Link href="/dashboard/brand" className="text-sm text-white/60 hover:text-white">← Back</Link>
        <GlassCard className="mt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl grid place-items-center font-black" style={{ background: (project.brandColor || '#7B2FFF') + '22', color: project.brandColor || '#7B2FFF' }}>{project.brand[0]}</div>
            <div>
              <div className="text-xs text-white/50">{project.brand}</div>
              <h1 className="text-2xl md:text-3xl font-black font-display">{project.title}</h1>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">{project.skills.map(s => <SkillPill key={s} size="sm" animate={false}>{s}</SkillPill>)}</div>
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div><span className="text-white/60">Budget:</span> <span className="font-bold">₹{project.budget.toLocaleString()}</span></div>
            <div><span className="text-white/60">Escrow:</span> <span className="font-bold text-mint">🔒 Locked</span></div>
          </div>
        </GlassCard>

        <h2 className="mt-8 text-2xl font-black font-display mb-4">Applicants ({applicants.length})</h2>
        {applicants.length === 0 ? (
          <div className="text-white/50 text-sm">No applicants yet. Share your project link 🚀</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.map((c, i) => {
              const m = matchPercent(project.skills, c.skills)
              const isHired = hired === c.id
              const anyoneHired = !!hired
              return (
                <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full p-[2px] bg-stack-gradient"><img src={c.avatar} alt="" className="w-full h-full rounded-full object-cover" /></div>
                    <div className="min-w-0">
                      <div className="font-bold truncate">{c.name}</div>
                      <div className="text-xs text-white/50 truncate">{c.handle}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className={`font-black text-lg ${m === 100 ? 'text-mint' : 'text-white/80'}`}>{m}%</div>
                      <div className="text-[10px] text-white/50">{m === 100 ? '🔥 perfect' : 'match'}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">{c.skills.slice(0,4).map(s => <SkillPill key={s} size="sm" animate={false}>{s}</SkillPill>)}</div>
                  <div className="mt-3 text-xs text-white/60">Rate: <span className="text-white font-semibold">₹{c.rate.toLocaleString()}/project</span></div>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/profile/${c.id}`} className="flex-1"><GradientButton size="sm" variant="outline" className="w-full">View Profile</GradientButton></Link>
                    <GradientButton size="sm" variant={isHired ? 'mint' : 'primary'} disabled={anyoneHired} onClick={() => hire(c.id)}>{isHired ? 'Hired ✓' : anyoneHired ? '—' : 'Hire'}</GradientButton>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
