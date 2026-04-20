'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const educationData = [
  {
    id: "01",
    period: "2016 — 2018",
    school: "SMP NEGERI 1 SUKODONO",
    degree: "JUNIOR HIGH SCHOOL",
    description: "Langkah awal dalam eksplorasi dunia digital dan logika dasar."
  },
  {
    id: "02",
    period: "2019 — 2024",
    school: "SMK ANTARTIKA 2 SIDOARJO",
    degree: "VOCATIONAL HIGH SCHOOL",
    description: "Mendalami fondasi pemrograman, sistem komputer, dan praktek industri."
  },
  {
    id: "03",
    period: "2024 — SEKARANG",
    school: "PENS SURABAYA",
    degree: "D3 TEKNIK INFORMATIKA",
    description: "Berada di kampus PENS untuk mengasah keahlian software engineering tingkat lanjut."
  }
]

export default function Education() {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section ref={containerRef} id="education" className="bg-foreground text-background scroll-mt-20">
      <div className="max-w-full">
         {/* Head */}
        <div className="grid grid-cols-1 md:grid-cols-2 hairline-border-b border-background/20">
           <div className="p-8 md:p-12 md:hairline-border-r border-background/20">
              <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] font-bold">[ EDUCATION ]</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mt-6">
                ACADEMIC<br />JOURNEY.
              </h2>
           </div>
           <div className="p-8 md:p-12 flex items-end">
              <p className="text-xs font-mono text-background/40 uppercase leading-relaxed max-w-sm">
                 Riwayat pendidikan formal yang membangun fondasi teknis dan cara berpikir sistematis saya.
              </p>
           </div>
        </div>

        {/* List */}
        <div>
          {educationData.map((edu, index) => (
            <div key={index} className="group grid grid-cols-1 md:grid-cols-12 hairline-border-b border-background/10 hover:bg-white/5 transition-colors duration-500">
               <div className="md:col-span-1 p-8 md:hairline-border-r border-background/10 flex items-start justify-center">
                  <span className="text-xl font-mono text-accent font-bold opacity-30 group-hover:opacity-100 transition-opacity">{edu.id}</span>
               </div>
               
               <div className="md:col-span-3 p-8 md:hairline-border-r border-background/10">
                  <span className="text-[10px] font-mono text-accent mb-4 block tracking-widest font-bold">{edu.period}</span>
                  <h3 className="text-3xl font-black tracking-tight uppercase leading-none group-hover:text-accent transition-colors">
                     {edu.school}
                  </h3>
               </div>

               <div className="md:col-span-3 p-8 md:hairline-border-r border-background/10 flex items-center">
                  <span className="text-xs font-mono tracking-widest text-background/60 uppercase">
                     {edu.degree}
                  </span>
               </div>

               <div className="md:col-span-5 p-8 flex items-center">
                  <p className="text-sm font-medium text-background/40 group-hover:text-background transition-colors leading-relaxed uppercase">
                     {edu.description}
                  </p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

