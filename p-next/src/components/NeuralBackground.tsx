'use client'
import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 12 : 55 // Reduced mobile particles
    const connectionDistance = isMobile ? 70 : 140 // Shorter connections on mobile
    const mouse = { x: -1000, y: -1000 }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.size = Math.random() * 1.5 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1

        // Optimized mouse reaction
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distSq = dx * dx + dy * dy
        if (distSq < 15000) { // Using distance squared to avoid Math.sqrt
          const dist = Math.sqrt(distSq)
          this.x -= (dx / dist) * 0.5
          this.y -= (dy / dist) * 0.5
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(112, 0, 255, 0.3)'
        ctx.fill()
      }
    }

    const init = () => {
      if (typeof window === 'undefined') return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.update()
        p.draw()

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(112, 0, 255, ${0.12 * (1 - dist / connectionDistance)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('resize', init)
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    init()
    animate()

    return () => {
      window.removeEventListener('resize', init)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[0] opacity-50"
    />
  )
}
