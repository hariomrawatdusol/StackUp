'use client'
import { motion } from 'framer-motion'

export default function SkillPill({ children, active=false, onClick, className='', animate=true, size='md' }) {
  const sizes = { sm: 'px-2.5 py-0.5 text-xs', md: 'px-3 py-1 text-sm', lg: 'px-4 py-1.5 text-sm' }
  const base = `rounded-full border ${sizes[size]} font-medium transition-all select-none `
  const style = active
    ? 'bg-stack-gradient border-transparent text-white shadow-[0_0_20px_rgba(123,47,255,0.35)]'
    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
  const props = animate ? { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: 'spring', stiffness: 260, damping: 18 } } : {}
  return (
    <motion.button {...props} onClick={onClick} className={base + style + ' ' + className}>{children}</motion.button>
  )
}
