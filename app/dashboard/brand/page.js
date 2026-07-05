'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import Header from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import GlassCard from '@/components/GlassCard'
import GradientButton from '@/components/GradientButton'
import SkillPill from '@/components/SkillPill'
import PostProjectModal from '@/components/PostProjectModal'
import MatchViz from '@/components/MatchViz'
import { useStore } from '@/lib/store'

function App() {
  const [open, setOpen] = useState(false)
  const projects = useStore(s => s.projects)
  const myProjects = useStore(s => s.myProjects)
  const markComplete = useStore(s => s.markComplete)

  const mine = projects.filter(p => myProjects.includes(p.id))

  const complete = (pid) => {
    markComplete(pid)
    toast.success('Escrow released ✅ Creator paid via UPI.')
  }

  return (
    <div className="min-h-screen relative pb-24">
      <GradientBlobs />
      <Header />
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="dashed-gradient rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="blob" style={{width:340,height:340,background:'#7B2FFF',top:'-100px',left:'-40px',opacity:0.35}} />
          <div className="blob" style={{width:340,height:340,background:'#00C2FF',bottom:'-100px',right:'-40px',opacity:0.35}} />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <div className="text-xs font-semibold text-mint tracking-wider uppercase">Post a Brief</div>
              <h1 className="mt-2 text-3xl md:text-5xl font-black font-display leading-tight max-w-xl">Need a <span className="text-gradient">multi-skill</span> creator?</h1>
              <p className="mt-2 text-white/60 max-w-md">One post. All the skills. Escrow-locked. Delivered before your next standup.</p>
            </div>
            <GradientButton variant="primary" size="lg" onClick={() => setOpen(true)}><Plus size={18} /> Post New Project</GradientButton>
          </div>
        </motion.div>

        {mine.length === 0 ? (
          <div className="mt-10 grid md:grid-cols-2 gap-4 items-stretch">
            <GlassCard className="flex flex-col justify-center">
              <h3 className="text-2xl font-black font-display">How matching works</h3>
              <p className="mt-2 text-white/60 text-sm">Post skills → we scan every creator&apos;s stack → sort by overlap %. Top match gets a confetti nudge 🎉</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>✓ Escrow protects both sides</li>
                <li>✓ Instant UPI payout on delivery</li>
                <li>✓ One creator, multiple skills, zero cost of context-switching</li>
              </ul>
              <div className="mt-6"><GradientButton variant="pink" onClick={() => setOpen(true)}><Plus size={16} /> Post Your First Project</GradientButton></div>
            </GlassCard>
            <MatchViz />
          </div>
        ) : (
          <div className="mt-10">
            <h2 className="text-2xl font-black font-display mb-4">My Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mine.map(p => (
                <GlassCard key={p.id}>
                  <div className="text-xs text-white/50">{p.brand}</div>
                  <h3 className="mt-1 font-bold text-lg">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1">{p.skills.map(s => <SkillPill key={s} size="sm" animate={false}>{s}</SkillPill>)}</div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="text-white/60"><span className="text-white font-bold">{p.applicants.length}</span> applicants</div>
                    <div className="text-mint font-bold">Escrow ₹{p.escrow.toLocaleString()} 🔒</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/project/${p.id}`} className="flex-1"><GradientButton variant="outline" size="sm" className="w-full">View Applicants</GradientButton></Link>
                    <GradientButton variant="mint" size="sm" onClick={() => complete(p.id)} disabled={p.status === 'completed'}>{p.status === 'completed' ? 'Done ✓' : 'Mark Complete'}</GradientButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>

      <PostProjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default App
