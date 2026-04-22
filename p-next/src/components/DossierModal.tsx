'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { X, Award, ShieldCheck, Download, Code2, User, Cpu } from 'lucide-react'

interface DossierModalProps {
  show: boolean;
  cert: any;
  onClose: () => void;
}

const DossierModal = ({ show, cert, onClose }: DossierModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (show && cert) {
      document.body.style.overflow = 'hidden'
      const tl = gsap.timeline()
      tl.fromTo(".modal-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(".modal-left", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, "-=0.3")
        .fromTo(".modal-right", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, "-=0.6")
        .fromTo(".modal-item", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4")
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show, cert])

  if (!show || !cert) return null

  const handleInnerClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(".modal-left", { x: -50, opacity: 0, duration: 0.4, ease: "power2.in" })
      .to(".modal-right", { x: 50, opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.3")
      .to(".modal-backdrop", { opacity: 0, duration: 0.3 }, "-=0.2")
  }

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 md:p-8">
      {/* BACKGROUND BLUR */}
      <div 
        className="modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-3xl"
        onClick={handleInnerClose}
      />

      <div ref={modalRef} className="relative w-full max-w-6xl aspect-video md:aspect-[16/9] flex flex-col md:flex-row bg-[#050505] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(112,0,255,0.2)]">
        
        {/* LEFT: CERTIFICATE PREVIEW */}
        <div className="modal-left relative w-full md:w-3/5 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.01]">
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
               {cert.image ? (
                 <Image 
                   src={cert.image} 
                   alt={cert.title} 
                   fill 
                   className="object-contain bg-black"
                 />
               ) : (
                 <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                    <Code2 size={80} className="text-white/5" />
                    <span className="absolute text-white/20 font-mono text-xs uppercase">No Preview Available</span>
                 </div>
               )}
               {/* TECH OVERLAY */}
               <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-mono text-accent/80 tracking-widest">{cert.serial || 'ENCRYPTED_SIGNATURE'}</span>
                     <button className="p-3 bg-accent rounded-full text-white hover:scale-110 transition-transform">
                        <Download size={18} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute top-6 left-6 flex items-center gap-4 text-white/20 font-mono text-[9px] tracking-[0.3em] uppercase">
            <span>Security_Layer: 04</span>
            <div className="w-8 h-[1px] bg-white/10" />
            <span>Encrypted Dossier</span>
          </div>
        </div>

        {/* RIGHT: DATA & INTEL */}
        <div className="modal-right w-full md:w-2/5 p-8 md:p-12 flex flex-col bg-white/[0.01] overflow-y-auto">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-accent uppercase tracking-[0.4em]">{cert.year} VERSION</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-none uppercase italic tracking-tighter">
                {cert.title}
              </h2>
            </div>
            <button 
              onClick={handleInnerClose}
              className="p-3 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all border border-white/5"
            >
              <X size={24} />
            </button>
          </div>

          {/* INTEL GRID */}
          <div className="grid grid-cols-1 gap-8 flex-grow">
            <div className="modal-item space-y-3">
               <div className="flex items-center gap-3 text-white/30">
                  <Award size={14} className="text-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Issuing Authority</span>
               </div>
               <p className="text-lg font-bold text-white uppercase">{cert.issuer}</p>
            </div>

            <div className="modal-item space-y-3">
               <div className="flex items-center gap-3 text-white/30">
                  <User size={14} className="text-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Key Mentors / Speakers</span>
               </div>
               <p className="text-base text-white/80 leading-relaxed italic">{cert.speakers || 'Industrial Professional'}</p>
            </div>

            <div className="modal-item space-y-3">
               <div className="flex items-center gap-3 text-white/30">
                  <ShieldCheck size={14} className="text-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Technical Briefing</span>
               </div>
               <p className="text-sm text-white/40 leading-relaxed font-light lowercase">
                  {cert.desc || 'Comprehensive evaluation and mastery of core domains within the specified field of expertise.'}
               </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-item mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Verification Status</span>
              <span className="text-xs font-mono text-green-500/80 uppercase">Verified Identity</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 grayscale opacity-30">
               {/* Logo dummy */}
               <Cpu size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DossierModal
