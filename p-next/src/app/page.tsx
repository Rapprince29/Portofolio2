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
import { ArrowUpRight, Globe, Info, Mail, MousePointer2, Camera, Briefcase, Music } from 'lucide-react'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const profileImgRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 0. LOADING LOGIC
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)
          document.body.style.overflow = 'auto'
        }
      })

      const counter = { val: 0 }
      tl.to(counter, {
        val: 100,
        duration: 2.5,
        ease: "power4.inOut",
        onUpdate: () => setProgress(Math.floor(counter.val))
      })
      .to(".loader-panel", {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        delay: 0.2
      })
    }

    // 1. MOUSE CURSOR
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.1,
        ease: "none"
      })
    }
    window.addEventListener('mousemove', moveCursor)

    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline()
      tl.from(".reveal-text", { 
        y: 100, 
        opacity: 0, 
        duration: 2, 
        stagger: 0.2, 
        ease: "expo.out" 
      })
      .from(".reveal-sub", { 
        opacity: 0, 
        duration: 1.5, 
        ease: "power2.out" 
      }, "-=1.5")
      .from(".hero-orb", {
        scale: 0,
        opacity: 0,
        duration: 2.5,
        ease: "elastic.out(1, 0.3)"
      }, "-=1.5")

      // 3. SCROLL REVEALS (Consolidated)
      const sections = ['#about', '#projects', '#education', '#contact']
      sections.forEach(select => {
         const target = document.querySelector(select)
         if (target) {
            gsap.from(`${select} .reveal-item`, {
               y: 60,
               opacity: 0,
               duration: 1.5,
               stagger: 0.15,
               ease: "power4.out",
               scrollTrigger: {
                  trigger: select,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
               }
            })
         }
      })

      // 4. IMAGE HOVER (GSAP)
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

    }, containerRef)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      ctx.revert()
    }
  }, [])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background overflow-hidden selection:bg-accent/30 lowercase">
      {/* LOADING SCREEN OVERLAY */}
      <div className="loader-panel fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center pointer-events-auto">
         <div className="relative flex flex-col items-center gap-8 translate-y-[-20%]">
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.6em] text-accent uppercase opacity-60">
               <span className="w-8 h-[1px] bg-accent animate-pulse" />
               initializing_experience
               <span className="w-8 h-[1px] bg-accent animate-pulse" />
            </div>
            
            <h1 className="text-8xl md:text-[12rem] font-black text-white italic tracking-tighter tabular-nums">
               {progress}<span className="text-accent opacity-30">%</span>
            </h1>

            <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
               <div 
                  className="absolute inset-0 bg-accent transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
               />
            </div>
         </div>
         
         <div className="absolute bottom-20 flex flex-col items-center gap-2 opacity-20">
            <span className="text-[9px] font-mono tracking-widest uppercase">system_pens_v2.0</span>
            <span className="text-[9px] font-mono tracking-widest uppercase">yoga_ananda_digital_identity</span>
         </div>
      </div>

      <Navbar />

      {/* CUSTOM CURSOR */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      >
        <div className="w-1 h-1 bg-accent rounded-full" />
      </div>

      {/* AMBIENT BACKGROUND */}
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
          
          <h1 className="reveal-text text-[clamp(3.5rem,12vw,12rem)] font-black leading-[0.9] tracking-tighter text-white uppercase italic">
            YOGA <br />
            <span className="text-gradient not-italic">ANANDA.</span>
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
                        className="object-cover transition-all grayscale"
                        style={{ filter: 'grayscale(100%)' }}
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
            {[1, 2].map((i) => (
              <div key={i} className="reveal-item project-item group relative glass-panel rounded-3xl p-6 md:p-12 transition-all duration-700">
                 <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-10">
                    <Image 
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1550745165-9bc0b252726f' : '1498050108023-c5249f4df085'}?q=80&w=1200`} 
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                      alt="Project"
                    />
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="space-y-4">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">Case Study — 0{i}</span>
                    <h3 className="text-4xl font-bold text-white tracking-tight uppercase">High-Performance Dashboard</h3>
                    <p className="text-white/40 font-light max-w-sm">
                       Next-gen data visualization for enterprise level clients. Built with Next.js and high-frequency WebSockets.
                    </p>
                 </div>
                 <ArrowUpRight className="absolute top-12 right-12 text-white/20 group-hover:text-accent transition-colors" size={32} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 ACADEMIC HISTORY SECTION */}
      <section id="education" className="relative py-40 px-6 md:px-12 bg-background">
         <div className="max-w-7xl mx-auto space-y-32">
            <div className="reveal-item text-center space-y-6">
               <span className="text-xs font-mono text-accent uppercase tracking-[0.5em]">[ academic track ]</span>
               <h2 className="text-5xl md:text-[8rem] font-black text-white tracking-tighter uppercase leading-none">the <span className="text-gradient">foundation.</span></h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {[
                  {
                     id: "01",
                     year: "2016 — 2018",
                     school: "smp negeri 1 sukodono",
                     degree: "junior high school",
                     desc: "langkah awal dalam eksplorasi dunia digital dan logika dasar."
                  },
                  {
                     id: "02",
                     year: "2019 — 2024",
                     school: "smk antartika 2 sidoarjo",
                     degree: "vocational high school",
                     desc: "mendalami fondasi pemrograman, sistem komputer, dan praktek industri."
                  },
                  {
                     id: "03",
                     year: "2024 — sekarang",
                     school: "pens surabaya",
                     degree: "d3 teknik informatika",
                     desc: "mengasah keahlian software engineering tingkat lanjut di kampus pens."
                  }
               ].map((edu, idx) => (
                  <div key={idx} className="reveal-item group glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-white/[0.05] transition-all duration-500">
                     <div className="flex items-center gap-12">
                        <span className="text-4xl font-black text-accent opacity-20 group-hover:opacity-100 transition-opacity">{edu.id}</span>
                        <div>
                           <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{edu.year}</span>
                           <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase group-hover:text-accent transition-colors">{edu.school}</h3>
                        </div>
                     </div>
                     <div className="text-center md:text-right">
                        <h4 className="text-lg font-mono text-white/60 mb-2 uppercase tracking-widest">{edu.degree}</h4>
                        <p className="text-sm font-light text-white/30 max-w-xs">{edu.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. CONTACT / FOOTER */}
      <footer id="contact" className="relative py-40 px-6 md:px-12 bg-background border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
           <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white uppercase italic text-center leading-none mb-20 text-gradient">
              Let&apos;s Build <br />The Future.
           </h2>
           
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

              <div className="flex flex-col items-center text-center gap-4">
                 <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center animate-bounce">
                    <ArrowUpRight size={24} className="-rotate-90 text-accent" />
                 </div>
                 <span className="text-xs font-mono text-accent uppercase tracking-widest">Back to top</span>
              </div>

              <div className="text-right flex flex-col gap-2">
                 <span className="text-xs font-mono text-white/20 uppercase tracking-widest">© 2025 Crafted by Yoga Ananda</span>
                 <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">PENS CAMPUS · SURABAYA</span>
              </div>
           </div>
        </div>
      </footer>
    </main>
  )
}
