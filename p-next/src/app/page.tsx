'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import profileImg from '@/assets/profile.jpg'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}
import { ArrowUpRight, Globe, Info, Mail, MousePointer2, Camera, Briefcase, Music, Clock, ArrowUp, Link2, User, Code2, Cpu, Database, Layout, Smartphone, Command, Award, CheckCircle2, ShieldCheck, FileCheck, LayoutGrid } from 'lucide-react'
import Lenis from 'lenis'
import NeuralBackground from '@/components/NeuralBackground'

// INTERACTIVE COMPONENT FOR EDUCATION
const EducationCard = ({ edu }: { edu: any }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    const detailsEl = itemRef.current?.querySelector('.details-tray')
    if (!detailsEl || gsap.isTweening(detailsEl)) return // PREVENT OVERLAP & NULL BUG

    if (isExpanded) {
      gsap.to(detailsEl, { height: 0, opacity: 0, duration: 0.6, ease: "expo.inOut" })
    } else {
      gsap.set(detailsEl, { height: "auto" })
      const autoHeight = detailsEl?.clientHeight
      gsap.fromTo(detailsEl, 
        { height: 0, opacity: 0 }, 
        { height: autoHeight, opacity: 1, duration: 0.8, ease: "expo.out" }
      )
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div 
      ref={itemRef}
      onClick={toggleExpand}
      className={`reveal-item group glass-panel rounded-3xl p-8 md:p-12 transition-all duration-700 cursor-pointer ${isExpanded ? 'border-accent/40 bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-12">
          <span className={`text-4xl font-black transition-all ${isExpanded ? 'text-accent scale-125' : 'text-accent opacity-20 group-hover:opacity-100'}`}>{edu.id}</span>
          <div>
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{edu.year}</span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase transition-colors">{edu.school}</h3>
          </div>
        </div>
        <div className="text-center md:text-right flex items-center gap-6">
          <div className="hidden md:block text-left md:text-right">
            <h4 className="text-lg font-mono text-white/60 mb-1 uppercase tracking-widest">{edu.degree}</h4>
            <p className="text-xs font-light text-white/30 max-w-xs">{edu.desc}</p>
          </div>
          <ArrowUpRight className={`text-accent transition-transform duration-500 ${isExpanded ? 'rotate-90 scale-125' : 'opacity-20 group-hover:opacity-100'}`} size={32} />
        </div>
      </div>

      {/* DETAILS TRAY */}
      <div className="details-tray h-0 opacity-0 overflow-hidden">
        <div className="pt-12 border-t border-white/5 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {edu.details.map((detail: any, dIdx: number) => (
            <div key={dIdx} className="glass-panel p-6 rounded-2xl bg-white/[0.02] border-white/5 hover:border-accent/30 transition-colors">
              <span className="block text-[9px] font-mono text-accent uppercase tracking-widest mb-2">{detail.label}</span>
              <h5 className="text-lg font-black text-white uppercase leading-tight mb-1">{detail.company}</h5>
              <p className="text-[11px] font-mono text-white/30 uppercase">{detail.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const profileImgRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState('')
  const [logs, setLogs] = useState<string[]>(['> Initializing_Yoga_Ananda_OS...'])
  const [cursorIcon, setCursorIcon] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // TERMINAL STATES
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<{type: string, text: string}[]>([
    { type: 'system', text: 'Y.ANANDA OS v2.0. Type "help" to see available commands.' }
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  // FORM STATES
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-10), `> ${msg}`])
  }

  const handleCursorEnter = (iconType: string, scale = 3) => {
    setCursorIcon(iconType)
    gsap.to(cursorRef.current, { scale: scale, backgroundColor: "rgba(112, 0, 255, 0.05)", duration: 0.4, ease: "back.out(1.7)" })
  }

  const handleCursorLeave = () => {
    setCursorIcon(null)
    gsap.to(cursorRef.current, { scale: 1, backgroundColor: "transparent", duration: 0.3, ease: "power2.inOut" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.message) {
      addLog('Error:_Incomplete_Transmission_Data')
      return
    }
    addLog('Finalizing_Transmission...')
    const text = `Halo Yoga! Nama saya *${formData.name}* (${formData.email}).\n\n*Pesan:* ${formData.message}`
    const waLink = `https://wa.me/6285804709019?text=${encodeURIComponent(text)}`
    
    setTimeout(() => {
      window.open(waLink, '_blank')
      addLog('Signal_Transmitted_Successfully!')
    }, 1000)
  }

  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  const handleMagneticLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  }

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsTerminalOpen(prev => {
          if(!prev) setTimeout(() => inputRef.current?.focus(), 100);
          return !prev;
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // 0.1 SMOOTH SCROLL (LENIS)
    const lenis = new Lenis()
    lenisRef.current = lenis
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // 0.2 LOADING LOGIC
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      gsap.set(".loader-panel", { yPercent: 0 })
      
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)
          document.body.style.overflow = 'auto'
          ScrollTrigger.refresh()
          addLog('System_Ready_V.2.0')
          
          // BRAIN TUTORIAL LOGS
          setTimeout(() => addLog('Environment_Detected: Interactive'), 1000)
          setTimeout(() => addLog('[Tip]:_Probe_objects_with_cursor'), 2500)
        }
      })

      const counter = { val: 0 }
      tl.to(counter, {
        val: 100,
        duration: 3.5,
        ease: "none",
        onUpdate: () => setProgress(Math.floor(counter.val))
      })
      .to(".loader-panel", { 
        yPercent: -100, 
        duration: 1.2, 
        ease: "expo.inOut" 
      })
      // START REVEALING HERO AS THE PANEL SLIDES UP
      .from(".reveal-text-line", { 
        y: 120, 
        skewY: 7,
        opacity: 0, 
        filter: "blur(20px)",
        duration: 2, 
        stagger: 0.15, 
        ease: "expo.out",
        onComplete: () => gsap.set(".reveal-text-line", { filter: "none" })
      }, "-=1.0")
      .from(".reveal-sub", { 
        y: 20,
        opacity: 0, 
        filter: "blur(15px)",
        duration: 1.5, 
        stagger: 0.1,
        ease: "power3.out",
        onComplete: () => gsap.set(".reveal-sub", { filter: "none" })
      }, "-=1.5")
      .from(".hero-orb", {
        scale: 0.8,
        opacity: 0,
        duration: 2.5,
        ease: "expo.out"
      }, "-=1.8")
    }

    // 1. MOUSE CURSOR
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.08,
        ease: "power2.out"
      })
      // 1.1 FLASHLIGHT FOLLOW
      gsap.to(".cursor-flashlight", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      })
    }
    window.addEventListener('mousemove', moveCursor)

    const ctx = gsap.context(() => {
      // 3. CINEMATIC REVEALS (Unified Global System)

      // 3. CINEMATIC REVEALS (Unified Global System)
      gsap.utils.toArray<HTMLElement>('.reveal-item').forEach((item) => {
        gsap.from(item, {
          y: 60,
          scale: 0.95,
          filter: "blur(10px)",
          opacity: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            toggleActions: "play none none reverse",
            onEnter: () => {
               const section = item.closest('section')?.id
               if (section) addLog(`Entering_${section}_module...`)
               
               // AUTO-TEASE TILT (TELL USER IT'S INTERACTIVE)
               if (item.classList.contains('tilt-card')) {
                 gsap.to(item, { 
                   rotateY: 5, 
                   rotateX: -5, 
                   duration: 0.6, 
                   yoyo: true, 
                   repeat: 1, 
                   ease: "power2.inOut" 
                 })
               }
            }
          },
          onComplete: () => gsap.set(item, { filter: "none" })
        })
      })

      // 3.1 SECTION TITLE LETTER-SPACING SCRUB (REFINED)
      gsap.utils.toArray<HTMLElement>('.text-gradient').forEach((title) => {
        gsap.from(title, {
          letterSpacing: "-0.05em",
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "top 70%",
            scrub: 1
          }
        })
      })

      // 4. 3D TILT EFFECT FOR CARDS
      const tiltCards = document.querySelectorAll('.tilt-card')
      tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e: any) => {
          const { left, top, width, height } = card.getBoundingClientRect()
          const x = (e.clientX - (left + width / 2)) / 15
          const y = (e.clientY - (top + height / 2)) / 15
          gsap.to(card, {
            rotateY: x,
            rotateX: -y,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" })
        })
      })

      // 5. IMAGE HOVER (GSAP)
      const profileImg = profileImgRef.current
      if (profileImg) {
         profileImg.addEventListener('mouseenter', () => {
            gsap.to(profileImg.querySelector('img'), {
               filter: 'grayscale(0%)',
               scale: 1,
               duration: 0.8,
               ease: "power2.out"
            })
            gsap.to(profileImg, {
               boxShadow: "0 0 50px rgba(112, 0, 255, 0.2)",
               scale: 1.02,
               duration: 0.5
            })
         })
         profileImg.addEventListener('mouseleave', () => {
            gsap.to(profileImg.querySelector('img'), {
               filter: 'grayscale(100%)',
               scale: 1.05,
               duration: 0.8,
               ease: "power2.out"
            })
            gsap.to(profileImg, {
               boxShadow: "0 0 0px rgba(112, 0, 255, 0)",
               scale: 1,
               duration: 0.5
            })
         })
      }

      // 5. MAGNETIC SKILLS EFFECT
      const skills = document.querySelectorAll('.skill-tile')
      skills.forEach(skill => {
        skill.addEventListener('mousemove', (e: any) => {
          const rect = skill.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(skill, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" })
        })
        skill.addEventListener('mouseenter', () => {
           const name = skill.querySelector('h4')?.textContent
           addLog(`Analyzing_${name}_matrix...`)
        })
        skill.addEventListener('mouseleave', () => {
          gsap.to(skill, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" })
        })
      })

      // 6. PARALLAX PROJECTS
      gsap.utils.toArray<HTMLElement>('.project-image').forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            scrub: true
          }
        })
      })

      // 7. SCROLL PROGRESS BAR
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3
        }
      })

    }, containerRef)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ctx.revert()
    }
  }, [])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!terminalInput.trim()) return

    const cmd = terminalInput.trim().toLowerCase()
    const newHistory = [...terminalHistory, { type: 'user', text: `> ${terminalInput}` }]

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'system', text: 'Available Commands: whoami, projects, skill, hire, clear, exit' })
        break
      case 'whoami':
        newHistory.push({ type: 'system', text: 'Yoga Ananda - Informatics Student at PENS. Digital Craftsman & UI Implementer.' })
        break
      case 'projects':
        newHistory.push({ type: 'system', text: 'Scanning records... Found [2] Visions. Scroll down to view.' })
        break
      case 'skill':
        newHistory.push({ type: 'system', text: 'Next.js, React, Tailwind, GSAP, TypeScript. (See Mastered Tools via UI)' })
        break
      case 'sudo hire yoga':
      case 'hire':
        newHistory.push({ type: 'system', text: 'Initiating hire protocol... Prepare to send message in the contact section!' })
        break
      case 'clear':
        setTerminalHistory([{ type: 'system', text: 'Terminal cleared.' }])
        setTerminalInput('')
        return
      case 'exit':
        setIsTerminalOpen(false)
        break
      default:
         newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found` })
    }

    setTerminalHistory(newHistory)
    setTerminalInput('')
    setTimeout(() => inputRef.current?.focus(), 10)
  }

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background overflow-hidden selection:bg-accent/30 uppercase">
      <NeuralBackground />
      {/* DECRYPTION + SLIDE-UP LOADING SYSTEM */}
      {isLoading && (
        <div className="loader-panel fixed inset-0 z-[100000] bg-black/60 backdrop-blur-[60px] flex flex-col items-center justify-center pointer-events-auto overflow-hidden">
          <div className="glitch-overlay fixed inset-0 bg-white pointer-events-none z-[100001] mix-blend-overlay opacity-0" />
          
          <div className="relative flex flex-col items-center gap-12">
             {/* THE SCRAMBLE TEXT */}
             <div className="loader-scramble flex gap-4 md:gap-8">
                {['Y', 'O', 'G', 'A'].map((char, i) => {
                   const isLocked = progress >= (25 * (i + 1));
                   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
                   return (
                      <div key={i} className="relative w-16 md:w-32 h-24 md:h-48 flex items-center justify-center">
                         <span className={`text-6xl md:text-[10rem] font-black italic tracking-tighter leading-none transition-all duration-75 
                            ${isLocked ? 'text-white' : 'text-accent opacity-20 blur-[2px]'}`}>
                            {isLocked ? char : (isMounted ? chars[Math.floor(Math.random() * chars.length)] : char)}
                         </span>
                      </div>
                   )
                })}
             </div>

             {/* DATA FEED INDICATOR */}
             <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.5em] text-accent uppercase">
                   <span className="w-8 h-[1px] bg-accent" />
                   AUTHENTICATING_IDENTITY
                   <span className="w-8 h-[1px] bg-accent" />
                </div>
                <div className="text-xl font-mono text-white/40 tracking-[1em] ml-4">
                   {progress}%
                </div>
             </div>
          </div>
        </div>
      )}

      <Navbar />

      {/* HORIZONTAL SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[10001] pointer-events-none">
         <div className="scroll-progress-bar h-full bg-accent origin-left w-full scale-x-0" />
      </div>

      {/* ULTRA-LIGHT ICON CURSOR */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-accent pointer-events-none z-[99999] flex items-center justify-center mix-blend-difference will-change-transform"
      >
        {cursorIcon === 'top' && <ArrowUp size={10} className="text-white animate-in zoom-in duration-300" />}
        {cursorIcon === 'view' && <ArrowUpRight size={10} className="text-white animate-in zoom-in duration-300" />}
        {cursorIcon === 'link' && <Link2 size={10} className="text-white animate-in zoom-in duration-300" />}
        {!cursorIcon && <div className="w-1 h-1 bg-accent rounded-full" />}
      </div>

      {/* AMBIENT BACKGROUND */}
      <div className="cursor-flashlight" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] bg-accent-secondary/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 swiss-grid opacity-[0.03]" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center">
        <div className="hero-orb absolute w-[600px] h-[600px] border border-white/[0.03] rounded-full flex items-center justify-center">
          <div className="w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
          <div className="absolute inset-0 bg-aurora opacity-10" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="reveal-sub flex items-center justify-center gap-4 text-xs font-mono tracking-[0.5em] text-accent uppercase opacity-60">
            <span className="w-12 h-[1px] bg-accent/30" />
            BASED IN INDONESIA — 2025
            <span className="w-12 h-[1px] bg-accent/30" />
          </div>
          
          <h1 className="hero-title text-[clamp(4rem,14vw,14rem)] font-black leading-[0.8] tracking-tighter text-white uppercase italic text-center">
             <span className="reveal-text-line block">MUHAMMAD</span>
             <span className="reveal-text-line block">YOGA</span>
             <span className="reveal-text-line block hero-gradient not-italic">ANANDA.</span>
          </h1>

          <p className="reveal-sub max-w-xl mx-auto text-lg md:text-xl text-white/50 font-light leading-relaxed">
            Crafting immersive digital experiences where <span className="text-white italic">code meets high-art</span>. Next-gen frontend engineer at PENS.
          </p>

          <div className="reveal-sub pt-10 flex gap-12 justify-center items-center">
             <a href="#projects" className="group flex items-center gap-4 text-xs font-mono tracking-widest text-white/40 hover:text-white transition-colors">
                VIEW WORK <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
             <a href="#contact" className="group flex items-center gap-4 text-xs font-mono tracking-widest text-white/40 hover:text-white transition-colors">
                START A PROJECT <MousePointer2 size={14} className="group-hover:scale-125 transition-transform" />
             </a>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <div className="w-[1px] h-20 bg-gradient-to-b from-accent to-transparent" />
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* 1.5 ABOUT / PROFILE SECTION */}
      <section id="about" className="relative py-40 px-6 md:px-12">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div ref={profileImgRef} className="reveal-item relative group cursor-pointer">
               <div className="absolute -inset-4 bg-accent/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="relative glass-panel rounded-[2.5rem] p-4 overflow-hidden shadow-2xl">
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
                     <Image 
                        src={profileImg} 
                        alt="Yoga Ananda" 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all grayscale"
                        style={{ filter: 'grayscale(100%)' }}
                        priority
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  </div>
                  <div className="absolute bottom-10 left-10">
                     <span className="text-[10px] font-mono text-white/50 tracking-[0.4em] uppercase">identity_01 — yoga ananda</span>
                  </div>
               </div>
            </div>

            <div className="space-y-12">
               <div className="reveal-item space-y-4">
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">[ identity ]</span>
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
                     digital <br />
                     <span className="text-gradient not-italic">craftsman.</span>
                  </h2>
               </div>
               
               <p className="reveal-item text-xl md:text-2xl text-white/40 font-light leading-relaxed">
                  seorang <span className="text-white">it enthusiast</span> dari pens yang berfokus pada integrasi teknologi cutting-edge. menghubungkan logika pemrograman dengan estetika desain untuk menciptakan solusi digital yang berdampak luas.
               </p>

               <div className="reveal-item grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div>
                     <span className="block text-[10px] font-mono text-white/20 uppercase mb-4 tracking-widest">specialization</span>
                     <ul className="text-sm text-white/60 space-y-2 uppercase font-medium">
                        <li>— react / next.js</li>
                        <li>— gsap motion engineering</li>
                        <li>— high-end ui implementation</li>
                     </ul>
                  </div>
                  <div>
                     <span className="block text-[10px] font-mono text-white/20 uppercase mb-4 tracking-widest">current status</span>
                     <p className="text-sm text-white/60 uppercase font-medium">
                        d3 teknik informatika<br />
                        politeknik elektronika negeri surabaya
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 1.7 TECH STACK BENTO GRID */}
      <section id="skills" className="relative py-40 px-6 md:px-12 bg-background/30">
        <div className="max-w-7xl mx-auto space-y-20">
           <div className="reveal-item flex flex-col md:flex-row justify-between items-end gap-8">
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic">
                 tech <br />
                 <span className="text-gradient not-italic">arsenal.</span>
              </h2>
              <p className="max-w-xs text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] leading-relaxed text-right">
                 leveraging cutting-edge tools to build high-frequency digital architectures_
              </p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                 { name: "next.js", level: "advanced", icon: "N" },
                 { name: "react", level: "expert", icon: "R" },
                 { name: "gsap", level: "advanced", icon: "G" },
                 { name: "tailwind", level: "expert", icon: "T" },
                 { name: "typescript", level: "advanced", icon: "Ts" },
                 { name: "node.js", level: "intermediate", icon: "Node" },
                 { name: "three.js", level: "exploring", icon: "3J" },
                 { name: "figma", level: "expert", icon: "F" },
                 { name: "github", level: "advanced", icon: "Gi" },
                 { name: "laravel", level: "intermediate", icon: "L" },
                 { name: "framer", level: "advanced", icon: "M" },
                 { name: "python", level: "basic", icon: "Py" }
              ].map((skill, i) => (
                 <div 
                    key={i} 
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    onMouseEnter={() => addLog(`Reading_${skill.name}_Protocol...`)}
                    className="reveal-item skill-tile glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group transition-colors hover:bg-white/[0.04] cursor-none"
                 >
                    <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-xl font-black text-white group-hover:text-accent group-hover:border-accent/40 transition-all duration-300">
                       {skill.icon}
                    </div>
                    <div>
                       <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest">{skill.name}</h4>
                       <span className="text-[8px] font-mono text-white/10 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">{skill.level}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

       {/* INFINITE MARQUEE TAPE */}
       <div className="relative py-12 flex overflow-hidden bg-accent text-background border-y border-white/10 skew-y-2 translate-y-10 group cursor-none">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 group-hover:pause transition-all duration-300">
             {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-8">
                   <span className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">digital craftsman</span>
                   <span className="text-2xl mt-1 opacity-50">✦</span>
                   <span className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">high-end ui</span>
                   <span className="text-2xl mt-1 opacity-50">✦</span>
                   <span className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">pens informatics</span>
                   <span className="text-2xl mt-1 opacity-50">✦</span>
                </div>
             ))}
          </div>
          {/* Secondary Marquee Wrapper for seamless infinite loop */}
          <div className="absolute top-12 animate-marquee2 whitespace-nowrap flex items-center gap-8 group-hover:pause transition-all duration-300">
             {Array.from({ length: 8 }).map((_, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-8">
                   <span className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">digital craftsman</span>
                   <span className="text-2xl mt-1 opacity-50">✦</span>
                   <span className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">high-end ui</span>
                   <span className="text-2xl mt-1 opacity-50">✦</span>
                   <span className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">pens informatics</span>
                   <span className="text-2xl mt-1 opacity-50">✦</span>
                </div>
             ))}
          </div>
       </div>

      {/* 2. FEATURED PROJECTS */}
      <section id="projects" className="relative py-40 px-6 md:px-12 bg-background/50 backdrop-blur-3xl border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter text-white uppercase italic">
              selected <br />
              <span className="text-gradient not-italic">visions.</span>
            </h2>
            <p className="max-w-xs text-sm font-mono text-white/30 uppercase leading-relaxed text-right">
              exploring the limits of interactive web development. each project is a unique digital architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {[
              {
                id: "01",
                title: "moco web app",
                category: "pdbl project — 2024",
                desc: "a comprehensive solution for monitoring and managing public data indicators. integrated with advanced visualization and secure architecture.",
                stack: ["next.js", "laravel", "postgresql", "tailwind"],
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
                link: "https://github.com/B4-PDBL-Team-2026/moco-web-app"
              },
              {
                id: "02",
                title: "digital architect v.1",
                category: "creative lab — 2025",
                desc: "exploring the intersection of motion engineering and performance-driven ui prototypes.",
                stack: ["gsap", "three.js", "framer"],
                image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200",
                link: "#"
              }
            ].map((proj, i) => (
              <div 
                key={i} 
                onMouseEnter={() => {
                  setHoveredProject(i)
                  addLog(`Scanning_Project_Data:_${proj.title}`)
                }}
                onMouseLeave={() => setHoveredProject(null)}
                className={`reveal-item project-item tilt-card group relative glass-panel rounded-3xl p-6 md:p-12 transition-all duration-700 
                ${hoveredProject !== null && hoveredProject !== i ? 'opacity-30 blur-sm scale-[0.98]' : 'scale-100 opacity-100 blur-none'}`}
              >
                 <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-10">
                    <div className="project-image relative w-full h-[120%] -top-[10%]">
                       <Image 
                         src={proj.image} 
                         fill
                         className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                         alt={proj.title}
                       />
                    </div>
                    {/* TECH STACK CHIPS ON HOVER */}
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-wrap gap-2 items-end p-8">
                       {proj.stack.map((s, idx) => (
                          <span key={idx} className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-mono text-white/80 uppercase tracking-widest border border-white/5">
                             {s}
                          </span>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">{proj.category}</span>
                    <h3 className="text-4xl font-bold text-white tracking-tight uppercase group-hover:text-accent transition-colors">{proj.title}</h3>
                    <p className="text-white/40 font-light max-w-sm lowercase leading-relaxed">
                       {proj.desc}
                    </p>
                 </div>
                 <a href={proj.link} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight className="absolute top-12 right-12 text-white/20 group-hover:text-accent transition-colors cursor-pointer" size={32} />
                 </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 ACADEMIC HISTORY SECTION (INTERACTIVE) */}
      <section id="education" className="relative py-40 px-6 md:px-12 bg-background">
         <div className="max-w-7xl mx-auto space-y-32">
            <div className="reveal-item text-center space-y-6">
               <span className="text-xs font-mono text-accent uppercase tracking-[0.5em]">[ academic & track ]</span>
               <h2 className="text-5xl md:text-[8rem] font-black text-white tracking-tighter uppercase leading-none">the <span className="text-gradient">foundation.</span></h2>
               <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest animate-pulse">click to expand history_</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
               {[
                  {
                     id: "01",
                     year: "2018 — 2020",
                     school: "smp negeri 1 sukodono",
                     degree: "junior high school",
                     desc: "langkah awal dalam eksplorasi dunia digital dan logika dasar.",
                     details: [
                        { label: "waiter", company: "defins art cafe", duration: "3 years (2019-2021)" },
                        { label: "champion", company: "basketball competition", duration: "2019" }
                     ]
                  },
                  {
                     id: "02",
                     year: "2021 — 2024",
                     school: "smk antartika 2 sidoarjo",
                     degree: "vocational high school",
                     desc: "mendalami fondasi pemrograman, sistem komputer, dan praktek industri.",
                     details: [
                        { label: "professional", company: "the hidden castle", duration: "1 year (2023)" },
                        { label: "internship", company: "cv barotera", duration: "4 months (2022)" }
                     ]
                  },
                  {
                     id: "03",
                     year: "2024 — sekarang",
                     school: "pens surabaya",
                     degree: "d3 teknik informatika",
                     desc: "mengasah keahlian software engineering tingkat lanjut di kampus pens.",
                     details: [
                        { label: "part-time", company: "sowan cafe", duration: "present" },
                        { label: "part-time", company: "cafe playgo", duration: "2025" },
                        { label: "part-time", company: "vlog cafe", duration: "2025" }
                     ]
                  }
               ].map((edu, idx) => (
                  <div key={idx} className="tilt-card">
                     <EducationCard edu={edu} />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 2.7 DISTINGUISHED CREDENTIALS (CERTIFICATES) */}
      <section id="certificates" className="relative py-40 px-6 md:px-12 bg-background/80">
         <div className="max-w-7xl mx-auto space-y-32">
            <div className="reveal-item flex flex-col md:flex-row justify-between items-end gap-10">
               <div className="space-y-6">
                  <span className="text-xs font-mono text-accent uppercase tracking-[0.5em]">[ validation ]</span>
                  <h2 className="text-5xl md:text-[8rem] font-black text-white tracking-tighter uppercase leading-none italic">
                     distinguished <br />
                     <span className="text-gradient not-italic">credentials.</span>
                  </h2>
               </div>
               <p className="max-w-xs text-sm font-mono text-white/30 uppercase leading-relaxed text-right pb-4">
                  architectural milestones and professional certifications validating the core logic of my craft_
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  {
                     id: "C_01",
                     title: "PERSONAL BRANDING",
                     issuer: "B1GFAIR RISE",
                     year: "2025",
                     desc: "Seminar Nasional with Harriz Vriza on establishing a high-impact digital presence.",
                     icon: <User size={24} />
                  },
                  {
                     id: "C_02",
                     title: "ENTREPRENEURSHIP",
                     issuer: "B1GFAIR RISE",
                     year: "2025",
                     desc: "Training focus on 'Zero Point to High Point' with Abi Atria for strategic growth.",
                     icon: <Briefcase size={24} />
                  },
                  {
                     id: "C_03",
                     title: "PUBLIC SPEAKING",
                     issuer: "B1GFAIR RISE",
                     year: "2025",
                     desc: "Advanced communication training with Dr. Charly Hongdiyanto.",
                     icon: <Camera size={24} />
                  },
                  {
                     id: "C_04",
                     title: "FINANCIAL PLANNING",
                     issuer: "B1GFAIR RISE",
                     year: "2025",
                     desc: "Financial literacy and management strategy training with Yonathan S.Kom.",
                     icon: <Database size={24} />
                  },
                  {
                     id: "C_05",
                     title: "CONTENT CREATOR",
                     issuer: "B1GFAIR RISE",
                     year: "2025",
                     desc: "Professional training on social media monetization with Tifani Hernang.",
                     icon: <LayoutGrid size={24} />
                  },
                  {
                     id: "C_06",
                     title: "WEB TECHNOLOGY INTERN",
                     issuer: "CV BAROTERA",
                     year: "2022",
                     desc: "Certification of completion for professional web architecture and system deployment.",
                     icon: <Code2 size={24} />
                  }
               ].map((cert, i) => (
                  <div 
                    key={i} 
                    onMouseEnter={() => addLog(`Verifying_${cert.id}_Packet...`)}
                    className="reveal-item tilt-card group relative glass-panel p-8 rounded-3xl border-white/5 hover:border-accent/40 transition-all duration-700 overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                        <ShieldCheck size={120} className="text-accent" />
                     </div>
                     
                     <div className="relative z-10 space-y-8">
                        <div className="flex justify-between items-start">
                           <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                              {cert.icon}
                           </div>
                           <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{cert.year}</span>
                        </div>

                        <div>
                           <span className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-2">{cert.issuer}</span>
                           <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-tight group-hover:text-accent transition-colors">{cert.title}</h3>
                        </div>

                        <p className="text-xs text-white/30 font-light leading-relaxed uppercase">
                           {cert.desc}
                        </p>

                        <div className="pt-6 flex items-center justify-between border-t border-white/5">
                           <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">{cert.id}</span>
                           <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                              <span className="text-[10px] font-mono tracking-widest uppercase">Validated</span>
                              <CheckCircle2 size={12} />
                           </div>
                        </div>
                     </div>

                     {/* SCANLINE EFFECT */}
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-[20%] w-full -top-full group-hover:animate-scanline pointer-events-none" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. CONTACT / FOOTER */}
      <footer id="contact" className="relative py-40 px-6 md:px-12 bg-background border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
              <div className="reveal-item space-y-12">
                 <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter text-white uppercase italic leading-[0.85] text-gradient">
                    Let&apos;s Build <br />The Future.
                 </h2>
                 <p className="text-xl text-white/40 font-light max-w-md">
                    ready to initiate a new digital architecture? send a signal or link up directly via the hotline.
                 </p>
                 
                 <div className="flex flex-col gap-4">
                    <a 
                      href="https://wa.me/6285804709019" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onMouseEnter={() => handleCursorEnter('link', 2.5)}
                      onMouseLeave={handleCursorLeave}
                      className="group relative w-fit glass-panel px-8 py-5 rounded-full flex items-center gap-4 border-accent/20 hover:border-accent transition-all duration-500 overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <span className="text-xs font-mono tracking-[0.3em] text-white uppercase z-10">Direct_WhatsApp_Line</span>
                       <ArrowUpRight size={18} className="text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform z-10" />
                    </a>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="reveal-item glass-panel p-10 rounded-[2.5rem] border-white/5 space-y-8 tilt-card">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">signal_origin</label>
                       <input 
                         type="text" 
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         placeholder="NAME"
                         onFocus={() => addLog('Initializing_Contact_Form...')}
                         className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm font-mono focus:border-accent outline-none transition-colors"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">frequency_address</label>
                       <input 
                         type="email" 
                         required
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         placeholder="EMAIL"
                         className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm font-mono focus:border-accent outline-none transition-colors"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">transmission_data</label>
                    <textarea 
                      placeholder="MESSAGE"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onFocus={() => addLog('Composing_Transmission_Packet...')}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm font-mono focus:border-accent outline-none transition-colors resize-none"
                    ></textarea>
                 </div>
                 <button type="submit" className="w-full glass-panel py-4 rounded-xl text-xs font-mono tracking-[0.4em] uppercase text-white hover:text-accent border-accent/20 hover:border-accent transition-all duration-500">
                    Send_Signal_
                 </button>
              </form>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-20 items-center border-t border-white/[0.05] pt-20">
              <div className="flex flex-col gap-6">
                 <span className="text-xs font-mono text-white/20 uppercase tracking-widest">Social Connections</span>
                 <div className="flex gap-8">
                    <a href="https://linkedin.com/in/yoga-ananda" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors"><Briefcase size={20} /></a>
                    <a href="https://github.com/Rapprince29" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors"><Globe size={20} /></a>
                    <a href="https://instagram.com/rizki.ananda_" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors"><Camera size={20} /></a>
                    <a href="https://tiktok.com/@rapprince29" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors"><Music size={20} /></a>
                 </div>
              </div>

              <div 
                onClick={() => lenisRef.current?.scrollTo(0)}
                onMouseEnter={() => handleCursorEnter('top', 2.5)}
                onMouseLeave={handleCursorLeave}
                className="flex flex-col items-center text-center gap-4 cursor-pointer group"
              >
                 <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center animate-bounce group-hover:border-accent transition-all duration-500">
                    <ArrowUpRight size={24} className="-rotate-90 text-accent group-hover:scale-150 group-hover:opacity-0 transition-all duration-300" />
                 </div>
                 <span className="text-xs font-mono text-accent uppercase tracking-widest group-hover:text-white transition-colors">Back to top</span>
              </div>

              <div className="text-right flex flex-col gap-2">
                 <span className="text-xs font-mono text-white/20 uppercase tracking-widest">© 2025 Crafted by Yoga Ananda</span>
                 <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">PENS CAMPUS · SURABAYA</span>
              </div>
           </div>
        </div>
      </footer>

      {/* SYSTEM LOG PANEL (NEW INTERACTION LOG) */}
      <div className="fixed bottom-8 left-8 z-[100] hidden md:block pointer-events-none">
         <div className="glass-panel rounded-lg p-4 w-64 border-accent/20 bg-black/60 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
               <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">System_Console_V.2</span>
            </div>
            <div className="space-y-1 h-32 overflow-hidden flex flex-col justify-end">
               {logs.map((log, i) => (
                  <p key={i} className="text-[10px] font-mono text-accent/80 opacity-0 animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-forwards">
                     {log}
                  </p>
               ))}
            </div>
         </div>
      </div>

      {/* HIDDEN TERMINAL (Ctrl + K) */}
      <div 
        className={`fixed inset-0 z-[1000000] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md transition-all duration-300
        ${isTerminalOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        onClick={() => setIsTerminalOpen(false)}
      >
        <div 
          className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono text-sm uppercase"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsTerminalOpen(false)} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-white/40 text-xs tracking-widest">yoga_os@root:~</span>
          </div>
          
          <div className="p-6 h-[400px] overflow-y-auto flex flex-col space-y-4 text-white/80" onClick={() => inputRef.current?.focus()}>
            {terminalHistory.map((item, i) => (
              <div key={i} className={`${item.type === 'user' ? 'text-accent' : item.type === 'error' ? 'text-red-400' : 'text-white/60'}`}>
                {item.text}
              </div>
            ))}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-4 mt-4">
              <span className="text-accent font-bold">~</span>
              <span className="text-white/40">/</span>
              <input 
                ref={inputRef}
                type="text" 
                value={terminalInput}
                onChange={e => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white/90 focus:ring-0 uppercase placeholder-white/20"
                spellCheck={false}
                autoComplete="off"
                placeholder={isTerminalOpen ? "type 'help' to begin..." : ""}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
