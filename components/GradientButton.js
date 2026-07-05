'use client'
import Link from 'next/link'

export default function GradientButton({ children, variant='primary', href, onClick, className='', type='button', disabled=false, size='md' }) {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const variants = {
    primary: 'bg-stack-gradient text-white glow-purple',
    pink: 'bg-pink-gradient text-white glow-pink',
    mint: 'bg-mint-gradient text-black glow-purple',
    ghost: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
    outline: 'bg-transparent border border-white/20 text-white hover:bg-white/5',
  }
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold ${sizes[size]} ${variants[variant]} transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} disabled={disabled} onClick={onClick} className={cls}>{children}</button>
}
