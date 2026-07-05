'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import SkillPill from './SkillPill'
import GradientButton from './GradientButton'
import { ALL_SKILLS } from '@/lib/mockData'
import { useStore } from '@/lib/store'
import { X } from 'lucide-react'

export default function PostProjectModal({ open, onClose }) {
  const [title, setTitle] = useState('')
  const [brief, setBrief] = useState('')
  const [budget, setBudget] = useState(5000)
  const [skills, setSkills] = useState([])
  const postProject = useStore(s => s.postProject)

  const toggle = (s) => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const submit = () => {
    if (!title || skills.length === 0) return toast.error('Add a title + at least one skill 🎯')
    postProject({ title, brief: brief || 'Project brief.', budget, skills })
    toast.success(`Project live + ₹${budget.toLocaleString()} locked 🔒`)
    setTitle(''); setBrief(''); setBudget(5000); setSkills([])
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e)=>e.stopPropagation()} className="glass rounded-2xl max-w-lg w-full p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10"><X size={18} /></button>
            <h2 className="text-2xl font-black font-display mb-1">Post a Project</h2>
            <p className="text-sm text-white/60 mb-5">Escrow locks the moment you post. No stress.</p>

            <label className="block text-xs font-semibold text-white/60 mb-1.5">PROJECT TITLE</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Need Editor + Model for Reel" className="w-full glass rounded-xl px-4 py-3 text-sm mb-4 placeholder:text-white/30" />

            <label className="block text-xs font-semibold text-white/60 mb-1.5">SKILLS NEEDED</label>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {ALL_SKILLS.map(s => (
                <SkillPill key={s} active={skills.includes(s)} onClick={()=>toggle(s)} animate={false} size="sm">{s}</SkillPill>
              ))}
            </div>

            <label className="block text-xs font-semibold text-white/60 mb-1.5">BUDGET: <span className="text-mint font-bold">₹{budget.toLocaleString()}</span></label>
            <input type="range" min={1000} max={50000} step={500} value={budget} onChange={e=>setBudget(+e.target.value)} className="w-full accent-[#7B2FFF] mb-4" />

            <label className="block text-xs font-semibold text-white/60 mb-1.5">BRIEF</label>
            <textarea value={brief} onChange={e=>setBrief(e.target.value)} placeholder="What's the vibe? Deliverables? Deadline?" rows={3} className="w-full glass rounded-xl px-4 py-3 text-sm mb-5 placeholder:text-white/30 resize-none" />

            <div className="flex gap-2">
              <GradientButton variant="ghost" onClick={onClose} className="flex-1">Cancel</GradientButton>
              <GradientButton variant="primary" onClick={submit} className="flex-1">Post + Lock Escrow 🔒</GradientButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
