'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Award, Camera } from 'lucide-react'

const CertificateCard = ({ cert, onOpen }: { cert: any, onOpen: (c: any) => void }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={itemRef}
      onClick={() => onOpen(cert)}
      className="reveal-item group relative bg-[#0a0a0a] rounded-[2rem] border border-white/5 transition-all duration-700 cursor-pointer overflow-hidden shadow-2xl hover:border-accent/30"
    >
      {/* UPPER IMAGE SECTION (THE HERO) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
         {cert.image ? (
           <Image 
             src={cert.image} 
             alt={cert.title} 
             fill 
             className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
           />
         ) : (
           <div className="absolute inset-0 bg-white/[0.02] flex items-center justify-center">
              <Camera className="text-white/10" size={48} />
           </div>
         )}
         
         {/* IMAGE OVERLAYS (CYBER STYLE) */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
         
         <div className="absolute top-6 left-6 flex flex-col gap-1">
            <span className="px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full text-[8px] font-mono text-accent uppercase tracking-[0.2em] w-fit">
               ENCRYPTED_DOC
            </span>
         </div>

         <div className="absolute bottom-6 left-8 right-8 z-10 transition-transform duration-700 group-hover:-translate-y-2">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] font-black">{cert.issuer}</span>
               <h3 className="text-3xl font-black text-white leading-none uppercase italic tracking-tighter shadow-black drop-shadow-md text-nowrap">
                  {cert.title.split(' ')[0]}<br/>
                  <span className="text-white/60 group-hover:text-white transition-colors">{cert.title.split(' ').slice(1).join(' ')}</span>
               </h3>
            </div>
         </div>

         {/* SCANLINE OVERLAY */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(112,0,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
      </div>

      {/* LOWER UTILITY BAR */}
      <div className="relative px-8 py-6 flex items-center justify-between bg-white/[0.02] backdrop-blur-xl border-t border-white/5">
         <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
               <Award size={16} />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-mono text-white/80 tracking-widest uppercase">{cert.year} {cert.issuer}</span>
               <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">DATA_KEY: {cert.id}</span>
            </div>
         </div>

         <div className="flex items-center gap-3 text-accent group/btn">
            <span className="text-[10px] font-mono tracking-[0.2em] font-black uppercase">VIEW_DETAIL</span>
            <div className="p-1.5 rounded-full border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500 group-hover:translate-x-1">
               <ArrowUpRight size={12} />
            </div>
         </div>
      </div>
    </div>
  )
}

export default CertificateCard
