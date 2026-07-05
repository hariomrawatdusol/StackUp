'use client'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { Download, Zap } from 'lucide-react'
import Header from '@/components/Header'
import GradientBlobs from '@/components/GradientBlobs'
import GlassCard from '@/components/GlassCard'
import GradientButton from '@/components/GradientButton'
import { useStore } from '@/lib/store'

function App() {
  const wallet = useStore(s => s.wallet)
  const history = useStore(s => s.history)
  const cashout = useStore(s => s.cashout)

  const cash = () => {
    if (wallet <= 0) return toast('Wallet empty rn 💸')
    cashout()
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.4 }, colors: ['#FF2E7E','#00FFA3','#7B2FFF'] })
    toast.success(`₹${wallet.toLocaleString()} sent to UPI ⚡`)
  }

  return (
    <div className="min-h-screen relative pb-24">
      <GradientBlobs />
      <Header />
      <div className="container py-8">
        <GlassCard className="relative overflow-hidden">
          <div className="blob" style={{width:340,height:340,background:'#7B2FFF',top:'-100px',right:'-40px',opacity:0.35}} />
          <div className="blob" style={{width:340,height:340,background:'#FF2E7E',bottom:'-100px',left:'-40px',opacity:0.35}} />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Available</div>
              <div className="text-6xl font-black font-display mt-1">₹{wallet.toLocaleString()}</div>
              <div className="mt-2 text-sm text-white/60">Direct to UPI. Zero fees on first ₹10k this month.</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <GradientButton variant="pink" onClick={cash}><Zap size={16} /> Instant UPI Cashout</GradientButton>
              <GradientButton variant="outline" onClick={() => toast.success('Invoice PDF downloaded 📄')}><Download size={16} /> Download Invoice</GradientButton>
            </div>
          </div>
        </GlassCard>

        <h2 className="mt-10 text-2xl font-black font-display mb-4">History</h2>
        <div className="glass rounded-2xl divide-y divide-white/10">
          {history.map(h => (
            <div key={h.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="font-semibold">{h.label}</div>
                <div className="text-xs text-white/50">{h.status}</div>
              </div>
              <div className={`font-bold ${h.amount >= 0 ? 'text-mint' : 'text-pink'}`}>{h.amount >= 0 ? '+' : ''}₹{Math.abs(h.amount).toLocaleString()}</div>
            </div>
          ))}
          {history.length === 0 && <div className="px-5 py-10 text-center text-white/50 text-sm">No transactions yet.</div>}
        </div>
      </div>
    </div>
  )
}

export default App
