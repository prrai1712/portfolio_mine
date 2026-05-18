import { useEffect, useState } from 'react'

export function useAnimatedCounter(
  target: number,
  duration = 2000,
  enabled = true
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const startTime = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [target, duration, enabled])

  return value
}
