'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type ScrollRevealPhotoProps = {
  children: ReactNode
  className: string
}

export default function ScrollRevealPhoto({ children, className }: ScrollRevealPhotoProps) {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (
      !frame ||
      !window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) return

    const bounds = frame.getBoundingClientRect()
    if (bounds.top < window.innerHeight - 80 && bounds.bottom > 0) return

    frame.dataset.reveal = 'pending'
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        frame.dataset.reveal = 'shown'
        observer.disconnect()
      }
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.15 })
    observer.observe(frame)

    return () => observer.disconnect()
  }, [])

  return <div ref={frameRef} className={className}>{children}</div>
}
