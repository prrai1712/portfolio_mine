import { useEffect, useState } from 'react'

export function useAnimatedCounter(
  target: number,
  duration = 2000,
  enabled = true
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let start = 0
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
    return () => {
      start = 1
    }
  }, [target, duration, enabled])

  return value
}
