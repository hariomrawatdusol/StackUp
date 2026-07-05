import Link from 'next/link'
import GradientBlobs from '@/components/GradientBlobs'
import Header from '@/components/Header'

export default function NotFound() {
  return (
    <div className="min-h-screen relative">
      <GradientBlobs />
      <Header />
      <div className="container py-20 text-center">
        <div className="grid grid-cols-3 gap-2 w-24 mx-auto opacity-60 rotate-6">
          <div className="aspect-square rounded-lg bg-[#7B2FFF]" />
          <div className="aspect-square rounded-lg bg-[#FF2E7E] rotate-12" />
          <div className="aspect-square rounded-lg bg-[#00FFA3] -rotate-6" />
          <div className="aspect-square rounded-lg bg-white/20 -rotate-12" />
          <div className="aspect-square rounded-lg bg-[#00C2FF]" />
          <div className="aspect-square rounded-lg bg-white/10 rotate-6" />
        </div>
        <h1 className="mt-8 text-5xl md:text-7xl font-black font-display">Skill <span className="text-gradient">not found</span>.</h1>
        <p className="mt-3 text-white/60">This block fell out of the stack. Let&apos;s go home.</p>
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-stack-gradient font-semibold">Go Home →</Link>
        </div>
      </div>
    </div>
  )
}
