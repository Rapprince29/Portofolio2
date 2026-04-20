'use client'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { name: 'INDEX', href: '#' },
  { name: 'WORKS', href: '#projects' },
  { name: 'ABOUT', href: '#about' },
  { name: 'CONNECT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-[999] transition-all duration-700 w-[90%] md:w-auto`}>
      <div className={`glass-panel rounded-full px-6 md:px-10 py-4 flex items-center gap-12 transition-all ${scrolled ? 'scale-95 opacity-80' : 'scale-100'}`}>
        <a href="#" className="text-sm font-black tracking-tighter text-white">
          Y.ANANDA<span className="text-accent underline">_</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="group flex flex-col overflow-hidden h-4"
            >
              <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 group-hover:-translate-y-full transition-transform duration-500 uppercase">{link.name}</span>
              <span className="text-[10px] font-mono tracking-[0.3em] text-accent translate-y-full group-hover:-translate-y-full transition-transform duration-500 uppercase">{link.name}</span>
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden md:flex items-center gap-3 bg-white text-black px-6 py-2 rounded-full text-[10px] font-mono font-bold tracking-widest hover:bg-accent hover:text-white transition-all">
          LET&apos;S TALK <ArrowRight size={14} />
        </a>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu (Minimal) */}
      <div className={`fixed inset-0 bg-background/98 backdrop-blur-2xl z-[-1] flex flex-col justify-center items-center gap-10 transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-5xl font-black text-white/20 hover:text-white tracking-tighter transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  )
}


