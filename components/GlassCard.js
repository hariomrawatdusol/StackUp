'use client'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className='', hover=false, ...rest }) {
  const hoverProps = hover ? { whileHover: { y: -4, rotateX: 3 }, transition: { type: 'spring', stiffness: 260, damping: 20 } } : {}
  return (
    <motion.div {...hoverProps} className={`glass rounded-2xl p-6 ${className}`} {...rest}>{children}</motion.div>
  )
}
