'use client'

import { motion } from 'framer-motion'

interface FlowConnectorProps {
  label?: string
  throughput?: string
  isInView: boolean
  delay?: number
  variant?: 'primary' | 'branch'
}

export function FlowConnector({
  label,
  throughput,
  isInView,
  delay = 0,
  variant = 'primary',
}: FlowConnectorProps) {
  const packetCount = variant === 'primary' ? 3 : 2

  return (
    <div className="relative flex flex-col items-center py-1 min-h-[72px]">
      <div
        className={`relative w-px flex-1 min-h-[48px] ${
          variant === 'primary'
            ? 'bg-gradient-to-b from-indigo-500/60 via-cyan-500/50 to-indigo-500/30'
            : 'bg-gradient-to-b from-purple-500/40 to-indigo-500/20'
        }`}
      >
        {isInView &&
          Array.from({ length: packetCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
              initial={{ top: '0%', opacity: 0 }}
              animate={{
                top: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: delay + i * 0.55,
                ease: 'linear',
              }}
            />
          ))}

        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyan-500/70"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.2 }}
        />
      </div>

      {(label || throughput) && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 0.15 }}
          className="absolute left-1/2 ml-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 font-mono text-[9px] whitespace-nowrap"
        >
          {label && <span className="text-indigo-400/90 uppercase tracking-wider">{label}</span>}
          {throughput && <span className="text-cyan-400/80">{throughput}</span>}
        </motion.div>
      )}
    </div>
  )
}
