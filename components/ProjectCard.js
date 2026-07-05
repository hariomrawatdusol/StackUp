'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import SkillPill from './SkillPill'
import GradientButton from './GradientButton'
import GlassCard from './GlassCard'
import { matchPercent } from '@/lib/mockData'
import { useStore } from '@/lib/store'

export default function ProjectCard({ project, mySkills=[] }) {
  const [open, setOpen] = useState(false)
  const applied = useStore(s => s.applied.includes(project.id))
  const applyToProject = useStore(s => s.applyToProject)
  const match = matchPercent(project.skills, mySkills)

  const doApply = () => {
    if (applied) return
    applyToProject(project.id)
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ['#7B2FFF','#00C2FF','#FF2E7E','#00FFA3'] })
    toast.success('Applied! Skill stack sent 🚀')
  }

  return (
    <>
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="glass rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg grid place-items-center text-xs font-black" style={{ background: project.brandColor + '22', color: project.brandColor }}>{project.brand[0]}</div>
            <span className="text-sm font-semibold">{project.brand}</span>
          </div>
          <span className="text-xs text-white/50">₹{project.budget.toLocaleString()}</span>
        </div>
        <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map(s => <SkillPill key={s} size="sm" animate={false}>{s}</SkillPill>)}
        </div>
        {mySkills.length > 0 && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/60">Skill match</span>
              <span className="font-bold text-mint">{match}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: match + '%' }} transition={{ duration: 0.8 }} className="h-full bg-mint-gradient" />
            </div>
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <GradientButton variant="outline" size="sm" onClick={() => setOpen(true)}>View Details</GradientButton>
          <GradientButton variant="primary" size="sm" onClick={doApply} disabled={applied} className="flex-1">
            {applied ? 'Applied ✓' : 'Quick Apply'}
          </GradientButton>
        </div>
      </motion.div>

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e)=>e.stopPropagation()} className="glass rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl grid place-items-center font-black" style={{ background: project.brandColor + '22', color: project.brandColor }}>{project.brand[0]}</div>
              <div>
                <div className="text-sm text-white/60">{project.brand}</div>
                <div className="font-bold">{project.title}</div>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-4">{project.brief}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">{project.skills.map(s => <SkillPill key={s} animate={false} size="sm">{s}</SkillPill>)}</div>
            <div className="flex items-center justify-between mb-6 glass rounded-xl p-3">
              <div>
                <div className="text-xs text-white/60">Budget</div>
                <div className="text-xl font-bold">₹{project.budget.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/60">Escrow</div>
                <div className="text-sm font-bold text-mint">🔒 Locked</div>
              </div>
            </div>
            <div className="flex gap-2">
              <GradientButton variant="ghost" onClick={() => setOpen(false)} className="flex-1">Close</GradientButton>
              <GradientButton variant="primary" onClick={() => { doApply(); setOpen(false) }} disabled={applied} className="flex-1">{applied ? 'Applied ✓' : 'Quick Apply'}</GradientButton>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
