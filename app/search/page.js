'use client'
import { useState, useMemo } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import Header from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import SkillPill from '@/components/SkillPill'
import CreatorCard from '@/components/CreatorCard'
import { creators, ALL_SKILLS } from '@/lib/mockData'

function App() {
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState([])
  const [under5k, setUnder5k] = useState(false)

  const toggle = (s) => setFilters(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const results = useMemo(() => {
    return creators.filter(c => {
      const matchesQ = !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(q.toLowerCase()))
      const matchesFilters = filters.length === 0 || filters.every(f => c.skills.includes(f))
      const matchesBudget = !under5k || c.rate <= 5000
      return matchesQ && matchesFilters && matchesBudget
    })
  }, [q, filters, under5k])

  return (
    <div className="min-h-screen relative pb-24">
      <GradientBlobs />
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl md:text-5xl font-black font-display">Explore <span className="text-gradient">Creators</span></h1>
        <p className="text-white/60 mt-2">Search by skill, name, or vibe.</p>

        <div className="mt-6 glass rounded-2xl flex items-center gap-3 px-4 py-3">
          <SearchIcon size={18} className="text-white/50" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search skills or creators..." className="flex-1 text-sm bg-transparent placeholder:text-white/40" />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {['Video Editing','Modeling','Design','UGC','Reels','Photography'].map(s => (
            <SkillPill key={s} active={filters.includes(s)} onClick={() => toggle(s)} animate={false} size="sm">{s}</SkillPill>
          ))}
          <SkillPill active={under5k} onClick={() => setUnder5k(v => !v)} animate={false} size="sm">Under ₹5k</SkillPill>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
        {results.length === 0 && <div className="text-center py-16 text-white/50">No creators found. Try loosening filters.</div>}
      </div>
    </div>
  )
}

export default App
