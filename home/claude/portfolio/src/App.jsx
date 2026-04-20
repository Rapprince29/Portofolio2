import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0 })
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <>
      <div ref={dotRef} style={{position:'fixed',width:6,height:6,background:'#c9a96e',borderRadius:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9999}} />
      <div ref={ringRef} style={{position:'fixed',width:32,height:32,border:'1px solid rgba(201,169,110,0.6)',borderRadius:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9998,transition:'width 0.2s,height 0.2s'}} />
    </>
  )
}

function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 2.2, ease: 'power3.out' })
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav ref={navRef} style={{
      position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'1.25rem 2rem',
      display:'flex',alignItems:'center',justifyContent:'space-between',
      transition:'all 0.5s',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      background: scrolled ? 'rgba(8,8,8,0.6)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(201,169,110,0.1)' : 'none'
    }}>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.25rem',letterSpacing:'0.2em',background:'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontWeight:300}}>AR.</div>
      <div style={{display:'flex',gap:'2rem'}}>
        {['Work','About','Skills','Contact'].map(item=>(
          <a key={item} href={`#${item.toLowerCase()}`} style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(240,237,230,0.5)',textDecoration:'none',transition:'color 0.3s'}}
            onMouseEnter={e=>e.target.style.color='#c9a96e'} onMouseLeave={e=>e.target.style.color='rgba(240,237,230,0.5)'}>{item}</a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const glowRef = useRef(null)
  useEffect(() => {
    gsap.to(glowRef.current, { opacity: 0.18, scale: 1.1, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(line1Ref.current, { y: 100, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' })
      .fromTo(line2Ref.current, { y: 100, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' }, '-=0.85')
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.5')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  }, [])

  const goldText = { background:'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
  return (
    <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',padding:'6rem 2rem 3rem',position:'relative',overflow:'hidden'}}>
      <div ref={glowRef} style={{position:'absolute',top:'40%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle, rgba(201,169,110,0.35) 0%, transparent 70%)',opacity:0.08,pointerEvents:'none'}} />
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(201,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.04) 1px,transparent 1px)',backgroundSize:'80px 80px',pointerEvents:'none'}} />

      <div style={{maxWidth:1152,margin:'0 auto',width:'100%',position:'relative',zIndex:1}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.25em',color:'#c9a96e',textTransform:'uppercase',marginBottom:'2rem',display:'flex',alignItems:'center',gap:16}}>
          <span>Portfolio 2025</span>
          <div style={{width:48,height:1,background:'#c9a96e',opacity:0.5}} />
        </div>

        <div style={{overflow:'hidden',marginBottom:4}}>
          <div ref={line1Ref} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(4rem,10vw,9rem)',lineHeight:1,fontWeight:300,letterSpacing:'-0.02em'}}>
            Frontend
          </div>
        </div>
        <div style={{overflow:'hidden',marginBottom:'2rem'}}>
          <div ref={line2Ref} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(4rem,10vw,9rem)',lineHeight:1,fontWeight:300,letterSpacing:'-0.02em',fontStyle:'italic',...goldText}}>
            Developer
          </div>
        </div>

        <div ref={subRef} style={{display:'flex',alignItems:'center',gap:24,marginBottom:'3rem',flexWrap:'wrap'}}>
          <p style={{color:'rgba(240,237,230,0.5)',fontSize:'1.1rem',fontWeight:300,maxWidth:400,lineHeight:1.7}}>
            Crafting immersive digital experiences dengan precision, elegance, dan perhatian penuh pada detail.
          </p>
          <div style={{width:1,height:64,background:'rgba(201,169,110,0.3)'}} />
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12}}>
            <div style={{color:'rgba(240,237,230,0.3)'}}>Based in Indonesia</div>
            <div style={{color:'#c9a96e',marginTop:4}}>Available for Projects</div>
          </div>
        </div>

        <div ref={ctaRef} style={{display:'flex',gap:16,alignItems:'center'}}>
          <a href="#work" style={{
            position:'relative',padding:'12px 32px',border:'1px solid rgba(201,169,110,0.5)',
            fontFamily:"'DM Mono',monospace",fontSize:12,letterSpacing:'0.2em',textTransform:'uppercase',
            color:'#c9a96e',textDecoration:'none',overflow:'hidden',display:'inline-block',transition:'color 0.3s',
            background:'transparent'
          }}
            onMouseEnter={e=>{e.currentTarget.style.color='#080808';e.currentTarget.style.background='#c9a96e'}}
            onMouseLeave={e=>{e.currentTarget.style.color='#c9a96e';e.currentTarget.style.background='transparent'}}
          >View Work</a>
          <a href="#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:12,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(240,237,230,0.35)',textDecoration:'none',transition:'color 0.3s'}}
            onMouseEnter={e=>e.currentTarget.style.color='#c9a96e'} onMouseLeave={e=>e.currentTarget.style.color='rgba(240,237,230,0.35)'}
          >Let's Talk →</a>
        </div>
      </div>

      <div style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,opacity:0.35}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:'0.25em',color:'#c9a96e',textTransform:'uppercase'}}>Scroll</span>
        <div style={{width:1,height:48,background:'linear-gradient(to bottom,#c9a96e,transparent)'}} />
      </div>
    </section>
  )
}

const projects = [
  { number:'01', title:'Luminary Design System', category:'Design System · React', year:'2025', desc:'Sistem desain komprehensif dengan 80+ komponen, dark/light mode, dan aksesibilitas penuh untuk skala enterprise.', tags:['React','TypeScript','Storybook','CSS Tokens'] },
  { number:'02', title:'Obsidian E-Commerce', category:'Web App · Next.js', year:'2024', desc:'Platform e-commerce premium dengan animasi fluid, checkout satu langkah, dan performa Core Web Vitals 98+.', tags:['Next.js','GSAP','Framer Motion','Tailwind'] },
  { number:'03', title:'Aether Dashboard', category:'SaaS · Vue.js', year:'2024', desc:'Analytics dashboard real-time dengan 3D data visualization, dark mode luxury, dan responsif di semua perangkat.', tags:['Vue 3','D3.js','WebSocket','Three.js'] },
  { number:'04', title:'Velvet Agency Site', category:'Website · React', year:'2023', desc:'Website agensi kreatif dengan scroll storytelling immersive, parallax layers, dan micro-interaction premium.', tags:['React','GSAP','ScrollTrigger','Lenis'] },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    gsap.fromTo(ref.current, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' }
    })
  }, [])
  return (
    <div ref={ref} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        border: hovered ? '1px solid rgba(201,169,110,0.35)' : '1px solid rgba(201,169,110,0.12)',
        background: hovered ? 'rgba(201,169,110,0.04)' : 'rgba(255,255,255,0.02)',
        padding:32,borderRadius:2,position:'relative',overflow:'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition:'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',cursor:'pointer'
      }}
    >
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:'rgba(201,169,110,0.5)',letterSpacing:'0.2em'}}>{project.number}</span>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:'rgba(240,237,230,0.25)',letterSpacing:'0.2em'}}>{project.year}</span>
      </div>
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.3),transparent)',marginBottom:24}} />
      <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.5rem',fontWeight:300,marginBottom:8,color: hovered ? '#c9a96e' : '#f0ede6',transition:'color 0.3s'}}>{project.title}</h3>
      <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'0.2em',color:'#c9a96e',textTransform:'uppercase',marginBottom:16,opacity:0.6}}>{project.category}</p>
      <p style={{color:'rgba(240,237,230,0.45)',fontSize:'0.875rem',lineHeight:1.7,marginBottom:24,fontWeight:300}}>{project.desc}</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {project.tags.map(tag=>(
          <span key={tag} style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'0.1em',border:'1px solid rgba(201,169,110,0.25)',color:'#c9a96e',padding:'4px 12px',borderRadius:2,background:'rgba(201,169,110,0.05)'}}>{tag}</span>
        ))}
      </div>
      <div style={{marginTop:24,fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.2em',color: hovered ? 'rgba(201,169,110,0.7)' : 'rgba(201,169,110,0)',transition:'color 0.3s'}}>View Project →</div>
    </div>
  )
}

function Work() {
  const titleRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
    })
  }, [])
  return (
    <section id="work" style={{padding:'8rem 2rem'}}>
      <div style={{maxWidth:1152,margin:'0 auto'}}>
        <div ref={titleRef} style={{marginBottom:64,display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.25em',color:'#c9a96e',textTransform:'uppercase',marginBottom:16}}>Selected Work</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2.5rem,6vw,5rem)',fontWeight:300,lineHeight:1}}>
              Proyek <span style={{background:'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontStyle:'italic'}}>Terpilih</span>
            </h2>
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:'rgba(240,237,230,0.25)',textAlign:'right'}}>
            <div>04 Projects</div>
            <div style={{color:'#c9a96e',marginTop:4}}>2023 — 2025</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:16}}>
          {projects.map((p,i)=><ProjectCard key={p.number} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function About() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const els = sectionRef.current.querySelectorAll('.rev')
    els.forEach((el,i) => gsap.fromTo(el, { y:50,opacity:0 }, { y:0,opacity:1,duration:0.9,delay:i*0.1,ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 85%' } }))
  }, [])
  const goldText = { background:'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }
  return (
    <section id="about" ref={sectionRef} style={{padding:'8rem 2rem'}}>
      <div style={{maxWidth:1152,margin:'0 auto'}}>
        <div style={{height:1,background:'linear-gradient(90deg,transparent,#c9a96e,transparent)',marginBottom:80}} />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
          <div className="rev" style={{position:'relative'}}>
            <div style={{
              width:'100%',maxWidth:360,margin:'0 auto',
              aspectRatio:'4/5',border:'1px solid rgba(201,169,110,0.2)',
              background:'linear-gradient(135deg,#0f0f0f 0%,#1a1409 100%)',
              display:'flex',alignItems:'center',justifyContent:'center',
              position:'relative',borderRadius:2
            }}>
              <div style={{textAlign:'center'}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'5rem',lineHeight:1,...goldText,fontWeight:300}}>AR</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'0.25em',color:'#c9a96e',textTransform:'uppercase',marginTop:16,opacity:0.6}}>Frontend Dev</div>
              </div>
              {[['top:12px,left:12px','borderLeft,borderTop'],['top:12px,right:12px','borderRight,borderTop'],
                ['bottom:12px,left:12px','borderLeft,borderBottom'],['bottom:12px,right:12px','borderRight,borderBottom']].map((_,i)=>{
                const positions = [{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}]
                const borders = [{borderLeft:'1px solid rgba(201,169,110,0.4)',borderTop:'1px solid rgba(201,169,110,0.4)'},
                  {borderRight:'1px solid rgba(201,169,110,0.4)',borderTop:'1px solid rgba(201,169,110,0.4)'},
                  {borderLeft:'1px solid rgba(201,169,110,0.4)',borderBottom:'1px solid rgba(201,169,110,0.4)'},
                  {borderRight:'1px solid rgba(201,169,110,0.4)',borderBottom:'1px solid rgba(201,169,110,0.4)'}]
                return <div key={i} style={{position:'absolute',width:24,height:24,...positions[i],...borders[i]}} />
              })}
            </div>
            <div style={{
              position:'absolute',bottom:-16,right:0,
              background:'rgba(255,255,255,0.03)',backdropFilter:'blur(10px)',
              border:'1px solid rgba(201,169,110,0.15)',padding:16,textAlign:'center',minWidth:120,borderRadius:2
            }}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',...goldText,fontWeight:300}}>3+</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:'0.2em',color:'#c9a96e',textTransform:'uppercase',marginTop:4,opacity:0.6}}>Years Exp.</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:24}}>
            <div className="rev">
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.25em',color:'#c9a96e',textTransform:'uppercase',marginBottom:16}}>Tentang Saya</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:300,lineHeight:1.2}}>
                Passion untuk <span style={{...goldText,fontStyle:'italic'}}>craft</span> yang sempurna
              </h2>
            </div>
            <p className="rev" style={{color:'rgba(240,237,230,0.5)',lineHeight:1.7,fontWeight:300}}>
              Saya adalah Frontend Developer yang berfokus pada pembuatan pengalaman web yang tidak hanya indah secara visual, tetapi juga performant dan accessible.
            </p>
            <p className="rev" style={{color:'rgba(240,237,230,0.4)',lineHeight:1.7,fontWeight:300,fontSize:'0.9rem'}}>
              Dengan keahlian di React ecosystem, animasi GSAP, dan eye for design, saya menjembatani gap antara design vision dan technical implementation. Every pixel matters.
            </p>
            <div className="rev" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,paddingTop:16}}>
              {[{label:'Projects Delivered',value:'24+'},{label:'Happy Clients',value:'18+'},{label:'Cups of Coffee',value:'∞'},{label:'Lines of Code',value:'50K+'}].map(s=>(
                <div key={s.label} style={{borderLeft:'1px solid rgba(201,169,110,0.2)',paddingLeft:16}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.75rem',...goldText,fontWeight:300}}>{s.value}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(240,237,230,0.3)',marginTop:4,letterSpacing:'0.1em'}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillBar({ item, delay }) {
  const barRef = useRef(null)
  const fillRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(fillRef.current, { width:'0%' }, {
      width:`${item.level}%`, duration:1.4, delay, ease:'power3.out',
      scrollTrigger: { trigger:barRef.current, start:'top 85%' }
    })
  }, [])
  return (
    <div ref={barRef} style={{display:'flex',alignItems:'center',gap:16}}>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:'rgba(240,237,230,0.4)',width:160,flexShrink:0}}>{item.name}</span>
      <div style={{flex:1,height:1,background:'rgba(201,169,110,0.1)',position:'relative'}}>
        <div ref={fillRef} style={{position:'absolute',inset:'0 auto 0 0',height:1,background:'linear-gradient(90deg,#c9a96e,#f0d9a8)',width:'0%'}} />
      </div>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:'rgba(201,169,110,0.6)',width:32,textAlign:'right'}}>{item.level}</span>
    </div>
  )
}

const skillGroups = [
  { category:'Frontend Core', skills:['React.js','Vue.js','Next.js','TypeScript','JavaScript ES2024'] },
  { category:'Styling & Animation', skills:['Tailwind CSS','GSAP','Framer Motion','CSS Modules','Sass/SCSS'] },
  { category:'Tools & Workflow', skills:['Vite','Webpack','Git','Figma','Storybook'] },
  { category:'Performance & Others', skills:['Web Vitals','PWA','REST API','GraphQL','Firebase'] },
]

function Skills() {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.querySelectorAll('.sg').forEach((el,i)=>{
      gsap.fromTo(el,{x:-30,opacity:0},{x:0,opacity:1,duration:0.8,delay:i*0.12,ease:'power3.out', scrollTrigger:{trigger:el,start:'top 85%'}})
    })
  }, [])
  const goldText = { background:'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }
  return (
    <section id="skills" ref={ref} style={{padding:'8rem 2rem'}}>
      <div style={{maxWidth:1152,margin:'0 auto'}}>
        <div style={{marginBottom:64}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.25em',color:'#c9a96e',textTransform:'uppercase',marginBottom:16}}>Expertise</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2.5rem,6vw,5rem)',fontWeight:300,lineHeight:1}}>
            Tech <span style={{...goldText,fontStyle:'italic'}}>Stack</span>
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:16,marginBottom:64}}>
          {skillGroups.map((g,i)=>(
            <div key={g.category} className="sg" style={{background:'rgba(255,255,255,0.03)',backdropFilter:'blur(10px)',border:'1px solid rgba(201,169,110,0.15)',padding:24,borderRadius:2}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#c9a96e'}} />
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'0.2em',color:'#c9a96e',textTransform:'uppercase'}}>{g.category}</span>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {g.skills.map(s=>(
                  <span key={s} style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'0.1em',border:'1px solid rgba(201,169,110,0.25)',color:'#c9a96e',padding:'4px 12px',borderRadius:2,background:'rgba(201,169,110,0.05)'}}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'0.2em',color:'rgba(240,237,230,0.3)',textTransform:'uppercase',marginBottom:8}}>Proficiency Level</div>
          {[{name:'React / Next.js',level:95},{name:'CSS / Tailwind / GSAP',level:92},{name:'TypeScript',level:85},{name:'Vue.js',level:78}].map((item,i)=>(
            <SkillBar key={item.name} item={item} delay={i*0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current,{y:60,opacity:0},{y:0,opacity:1,duration:1.2,ease:'power3.out', scrollTrigger:{trigger:ref.current,start:'top 80%'}})
  }, [])
  const goldText = { background:'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }
  return (
    <section id="contact" style={{padding:'8rem 2rem'}}>
      <div style={{maxWidth:1152,margin:'0 auto'}}>
        <div style={{height:1,background:'linear-gradient(90deg,transparent,#c9a96e,transparent)',marginBottom:80}} />
        <div ref={ref} style={{textAlign:'center',marginBottom:64}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.25em',color:'#c9a96e',textTransform:'uppercase',marginBottom:24}}>Get In Touch</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(3rem,8vw,7rem)',fontWeight:300,lineHeight:1,marginBottom:24}}>
            Mari <span style={{...goldText,fontStyle:'italic'}}>Berkolaborasi</span>
          </h2>
          <p style={{color:'rgba(240,237,230,0.4)',maxWidth:480,margin:'0 auto',lineHeight:1.7,fontWeight:300}}>
            Punya proyek menarik? Saya selalu terbuka untuk diskusi dan kolaborasi baru.
          </p>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:24}}>
          <a href="mailto:hello@arizki.dev" style={{
            fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(1.2rem,3vw,2rem)',fontWeight:300,
            color:'rgba(240,237,230,0.6)',textDecoration:'none',transition:'color 0.5s',display:'flex',alignItems:'center',gap:12
          }}
            onMouseEnter={e=>e.currentTarget.style.color='#c9a96e'} onMouseLeave={e=>e.currentTarget.style.color='rgba(240,237,230,0.6)'}
          >
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:'rgba(201,169,110,0.5)'}}>→</span>
            hello@arizki.dev
          </a>
          <div style={{display:'flex',gap:32,marginTop:16}}>
            {['GitHub','LinkedIn','Dribbble','Twitter / X'].map(l=>(
              <a key={l} href="#" style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(240,237,230,0.4)',textDecoration:'none',transition:'color 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.color='#c9a96e'} onMouseLeave={e=>e.currentTarget.style.color='rgba(240,237,230,0.4)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const loaderTextRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setLoaded(true)
        gsap.to(loaderRef.current, { opacity:0, duration:0.6, onComplete:()=>{ if(loaderRef.current) loaderRef.current.style.display='none' } })
      }
    })
    tl.to(barRef.current, { width:'100%', duration:1.8, ease:'power2.inOut' })
    tl.to(loaderTextRef.current, { opacity:0, duration:0.4 }, '-=0.4')
    tl.to(loaderRef.current, { yPercent:-100, duration:0.8, ease:'power4.inOut' }, '+=0.1')
  }, [])

  const goldText = { background:'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }

  return (
    <>
      <div ref={loaderRef} style={{position:'fixed',inset:0,zIndex:100,background:'#080808',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div ref={loaderTextRef} style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'3rem',...goldText,fontWeight:300,letterSpacing:'0.3em'}}>AR.</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:'0.25em',color:'rgba(201,169,110,0.5)',textTransform:'uppercase',marginTop:8}}>Loading Portfolio</div>
        </div>
        <div style={{width:192,height:1,background:'rgba(201,169,110,0.1)',position:'relative',overflow:'hidden'}}>
          <div ref={barRef} style={{position:'absolute',inset:'0 auto 0 0',width:0,height:1,background:'linear-gradient(90deg,#c9a96e,#f0d9a8)'}} />
        </div>
      </div>

      <Cursor />

      <div>
        <Navbar />
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
        <footer style={{padding:'2rem',borderTop:'1px solid rgba(201,169,110,0.1)'}}>
          <div style={{maxWidth:1152,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.25rem',letterSpacing:'0.2em',...goldText,fontWeight:300}}>AR.</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:'rgba(240,237,230,0.2)',letterSpacing:'0.1em'}}>© 2025 · Built with React & GSAP</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:'rgba(240,237,230,0.2)'}}>Designed in Indonesia</div>
          </div>
        </footer>
      </div>
    </>
  )
}
