'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Plus } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    id: "01",
    title: "E-KINERJA PENS",
    category: "MANAGEMENT SYSTEM",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a5f9a7?q=80&w=800&h=500&auto=format&fit=crop",
    description: "Sistem manajemen performa terintegrasi menggunakan Next.js dan NestJS untuk efisiensi birokrasi kampus."
  },
  {
    id: "02",
    title: "CYBER SCANNER",
    category: "SECURITY TOOL",
    year: "2023",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&h=500&auto=format&fit=crop",
    description: "Alat pemindaian kerentanan jaringan otomatis dengan laporan real-time."
  },
  {
    id: "03",
    title: "ARCHI-PORTFOLIO",
    category: "VISUAL DESIGN",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92fb1ab?q=80&w=800&h=500&auto=format&fit=crop",
    description: "Desain website agensi arsitektur dengan fokus pada minimalisme dan geometri."
  }
]

export default function Projects() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} id="projects" className="bg-background scroll-mt-20">
      <div className="max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 hairline-border-b">
           <div className="p-8 md:p-12 hairline-border-r flex flex-col justify-between min-h-[300px]">
              <span className="text-xs font-mono text-accent uppercase tracking-[0.3em]">[ SELECTED_WORKS ]</span>
              <h2 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.85]">
                PROJECTS<br />ARCHIVE.
              </h2>
           </div>
           <div className="p-8 md:p-12 flex items-end justify-end">
              <p className="text-sm font-mono text-foreground/40 max-w-xs text-right uppercase leading-relaxed">
                 Eksplorasi solusi digital dari perancangan sistem backend hingga antarmuka user-centric. dioptimalkan untuk performa.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={i} className="group relative flex flex-col hairline-border-b lg:hairline-border-r last:border-r-0 hover:bg-accent transition-colors duration-500 overflow-hidden">
               {/* Project Number */}
               <div className="p-6 flex justify-between items-start">
                  <span className="text-3xl font-black text-foreground group-hover:text-white transition-colors">{p.id}</span>
                  <div className="w-10 h-10 border border-foreground group-hover:border-white flex items-center justify-center transition-colors">
                     <Plus size={16} className="text-foreground group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
                  </div>
               </div>

               {/* Project Image */}
               <div className="px-6 pb-6">
                  <div className="aspect-[16/10] overflow-hidden hairline-border bg-grey-200">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                  </div>
               </div>

               {/* Project Info */}
               <div className="p-6 mt-auto">
                  <span className="text-[10px] font-mono text-accent group-hover:text-white transition-colors uppercase tracking-widest block mb-2">{p.category}</span>
                  <h3 className="text-3xl font-black text-foreground group-hover:text-white transition-colors uppercase tracking-tighter mb-4">{p.title}</h3>
                  
                  <div className="h-0 group-hover:h-24 transition-all duration-500 overflow-hidden">
                     <p className="text-xs text-white uppercase font-medium leading-relaxed mb-6">
                        {p.description}
                     </p>
                     <a href="#" className="inline-flex items-center gap-2 text-[10px] font-mono text-white underline underline-offset-4 uppercase tracking-widest">
                        View Detail <ArrowUpRight size={12} />
                     </a>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

