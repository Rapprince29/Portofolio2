'use client'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight, Circle } from 'lucide-react'
import gsap from 'gsap'

const navLinks = [
  { name: 'INDEX', href: '#' },
  { name: 'WORKS', href: '#projects' },
  { name: 'ABOUT', href: '#about' },
  { name: 'CONNECT', href: '#contact' },
]

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState('')
  const lastScrollY = useRef(0)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 200 && currentScrollY > lastScrollY.current) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
      lastScrollY.current = currentScrollY
    }

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))
    }, 1000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-[999] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCollapsed ? 'w-16 h-16' : 'w-[90%] md:w-auto h-16'}`}
      >
        <div 
          className={`glass-panel rounded-full w-full h-full flex items-center justify-between px-6 transition-all duration-700 ${isCollapsed ? 'p-0 justify-center' : 'md:px-10'}`}
          onClick={() => isCollapsed && setIsCollapsed(false)}
        >
          {/* EXPANDED CONTENT */}
          {!isCollapsed && (
            <div className="flex items-center gap-8 w-full animate-in fade-in zoom-in-95 duration-500">
               <a href="#" className="text-sm font-black tracking-tighter text-white whitespace-nowrap">
                 Y.ANANDA<span className="text-accent underline">_</span>
               </a>

               <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 border-l border-white/10 ml-2">
                  <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">{time}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
               </div>

               {/* Desktop Nav */}
               <div className="hidden md:flex items-center gap-10 mx-auto">
                 {navLinks.map((link) => (
                   <a key={link.name} href={link.href} className="group flex flex-col overflow-hidden h-4">
                     <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 group-hover:-translate-y-full transition-transform duration-500 uppercase">{link.name}</span>
                     <span className="text-[10px] font-mono tracking-[0.3em] text-accent translate-y-full group-hover:-translate-y-full transition-transform duration-500 uppercase">{link.name}</span>
                   </a>
                 ))}
               </div>

               <a href="#contact" className="hidden md:flex items-center gap-3 bg-white text-black px-6 py-2 rounded-full text-[10px] font-mono font-bold tracking-widest hover:bg-accent hover:text-white transition-all whitespace-nowrap">
                 LET&apos;S TALK <ArrowRight size={14} />
               </a>

               <button className="md:hidden text-white ml-auto" onClick={() => setIsOpen(true)}>
                 <Menu size={20} />
               </button>
            </div>
          )}

          {/* COLLAPSED CONTENT (ZEN ORB) */}
          {isCollapsed && (
            <div className="flex items-center justify-center w-full h-full animate-in fade-in zoom-in-75 duration-700">
               <Menu size={20} className="text-white hover:text-accent transition-colors" />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background/98 backdrop-blur-2xl z-[1000] flex flex-col justify-center items-center gap-10 transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <button className="absolute top-10 right-10 text-white" onClick={() => setIsOpen(false)}>
           <X size={32} />
        </button>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="text-5xl font-black text-white/20 hover:text-white tracking-tighter transition-colors" onClick={() => setIsOpen(false)}>
            {link.name}
          </a>
        ))}
      </div>
    </>
  )
}


