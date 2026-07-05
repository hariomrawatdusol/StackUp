'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { Zap, Download, Sparkles } from 'lucide-react'
import Header from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import GlassCard from '@/components/GlassCard'
import GradientButton from '@/components/GradientButton'
import SkillPill from '@/components/SkillPill'
import ProjectCard from '@/components/ProjectCard'
import { useStore } from '@/lib/store'
import { ALL_SKILLS } from '@/lib/mockData'

const DEFAULT_SKILLS = ['Video Editing','Modeling','UGC']

function App() {
  const [tab, setTab] = useState('for-you')
  const [mySkills, setMySkills] = useState(DEFAULT_SKILLS)
  const [editing, setEditing] = useState(false)

  const wallet = useStore(s => s.wallet)
  const totalEarned = useStore(s => s.totalEarned)
  const projects = useStore(s => s.projects)
  const applied = useStore(s => s.applied)
  const completed = useStore(s => s.completed)
  const cashout = useStore(s => s.cashout)

  const cash = () => {
    if (wallet <= 0) return toast('Wallet empty. Deliver a project to stack ₹.', { icon: '💸' })
    cashout()
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.4 }, colors: ['#FF2E7E','#00FFA3','#7B2FFF'] })
    toast.success(`₹${wallet.toLocaleString()} sent to UPI ⚡`)
  }

  const toggleSkill = (s) => setMySkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const forYou = [...projects].sort((a,b) => {
    const aM = a.skills.filter(s => mySkills.includes(s)).length / a.skills.length
    const bM = b.skills.filter(s => mySkills.includes(s)).length / b.skills.length
    return bM - aM
  })

  const appliedList = projects.filter(p => applied.includes(p.id))
  const completedList = projects.filter(p => completed.includes(p.id))

  return (
    <div className="min-h-screen relative pb-24">
      <GradientBlobs />
      <Header />

      <div className="container py-8">
        <GlassCard className="relative overflow-hidden">
          <div className="blob" style={{width:300,height:300,background:'#7B2FFF',top:'-80px',right:'-40px',opacity:0.35}} />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Wallet</div>
              <div className="text-5xl md:text-6xl font-black font-display mt-1">₹{wallet.toLocaleString()}</div>
              <div className="mt-2 text-sm text-white/60">Total Earned <span className="text-mint font-bold">₹{totalEarned.toLocaleString()}</span></div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <GradientButton variant="pink" onClick={cash}><Zap size={16} /> Cashout via UPI</GradientButton>
              <GradientButton variant="ghost" href="/wallet">Withdraw History</GradientButton>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Your Stack</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {mySkills.map(s => <SkillPill key={s} active animate={false} size="sm">{s}</SkillPill>)}
              </div>
            </div>
            <button onClick={() => setEditing(v => !v)} className="text-sm font-semibold text-white/70 hover:text-white flex items-center gap-1"><Sparkles size={14} /> {editing ? 'Done' : 'Edit'}</button>
          </div>
          <AnimatePresence>
            {editing && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-white/50 mb-2">Tap to toggle</div>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_SKILLS.map(s => <SkillPill key={s} onClick={() => toggleSkill(s)} active={mySkills.includes(s)} animate={false} size="sm">{s}</SkillPill>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        <div className="mt-8 flex items-center gap-2 glass rounded-full p-1 w-fit">
          {[['for-you','For You'],['applied','Applied'],['completed','Completed']].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${tab === k ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>{l}</button>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tab === 'for-you' && forYou.map(p => <ProjectCard key={p.id} project={p} mySkills={mySkills} />)}
          {tab === 'applied' && appliedList.map(p => <ProjectCard key={p.id} project={p} mySkills={mySkills} />)}
          {tab === 'completed' && completedList.map(p => <ProjectCard key={p.id} project={p} mySkills={mySkills} />)}
        </div>

        {tab === 'applied' && appliedList.length === 0 && (
          <div className="text-center py-16 text-white/50">No apps yet. Quick apply on projects that match your stack.</div>
        )}
        {tab === 'completed' && completedList.length === 0 && (
          <div className="text-center py-16 text-white/50">Nothing shipped yet. Deliver work to stack this list 💪</div>
        )}
      </div>
    </div>
  )
}

export default App
