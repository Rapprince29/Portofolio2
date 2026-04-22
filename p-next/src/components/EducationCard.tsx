'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'

const EducationCard = ({ edu }: { edu: any }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    const detailsEl = itemRef.current?.querySelector('.details-tray')
    if (!detailsEl || gsap.isTweening(detailsEl)) return 

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

export default EducationCard
