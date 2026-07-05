'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function OpeningAnimation({ onDone }) {
  const [show, setShow] = useState(true)
  const [text, setText] = useState('')
  const full = 'Stack skills. Stack clients. Stack income.'

  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setText(full.slice(0, i))
        if (i >= full.length) clearInterval(iv)
      }, 28)
    }, 1000)
    const finish = setTimeout(() => { setShow(false); onDone?.() }, 2400)
    return () => { clearTimeout(start); clearTimeout(finish) }
  }, [onDone])

  const skip = () => { setShow(false); onDone?.() }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[60] bg-[#0A0A0B] flex flex-col items-center justify-center overflow-hidden"
        >
          <button onClick={skip} className="absolute top-5 right-5 text-xs font-medium text-white/60 hover:text-white glass px-3 py-1.5 rounded-full">Skip Intro →</button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 0.8, duration: 1.5 }} className="absolute inset-0 pointer-events-none">
            <div className="blob" style={{width:500,height:500,background:'#7B2FFF',top:'10%',left:'10%'}} />
            <div className="blob" style={{width:500,height:500,background:'#FF2E7E',bottom:'10%',right:'10%'}} />
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              {[
                { c: 'from-[#7B2FFF] to-[#00C2FF]', d: 0, x: 0, y: 0 },
                { c: 'bg-[#FF2E7E]', d: 0.15, x: 32, y: 0 },
                { c: 'bg-[#00FFA3]', d: 0.3, x: 0, y: 32 },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -300, opacity: 0, rotate: -30 }}
                  animate={{ y: b.y, opacity: 1, rotate: 0 }}
                  transition={{ delay: b.d, type: 'spring', stiffness: 260, damping: 18 }}
                  className={`absolute w-8 h-8 rounded-lg ${b.c.startsWith('from') ? 'bg-gradient-to-br ' + b.c : b.c}`}
                  style={{ left: b.x }}
                />
              ))}
              <motion.div initial={{ y: -300, opacity: 0 }} animate={{ y: 32, opacity: 1 }} transition={{ delay: 0.45, type: 'spring', stiffness: 260, damping: 18 }} className="absolute w-8 h-8 rounded-lg bg-white/90" style={{ left: 32 }} />
            </div>
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-6xl font-black tracking-tight font-display"
            >
              StackUp
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.4 }} className="mt-8 text-lg text-white/70 font-medium h-6">
            {text}<span className="inline-block w-[3px] h-5 bg-white/80 ml-0.5 align-middle animate-pulse" />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
