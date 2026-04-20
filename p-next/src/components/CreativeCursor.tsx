'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CreativeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power3.out"
        })
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-accent pointer-events-none z-[300] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" 
    />
  )
}
