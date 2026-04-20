import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from './assets/profile.jpg'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────── Custom Cursor ─────────────────────────── */
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0 })
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.14, ease: 'power2.out' })
    }

    const onEnterLink = () => {
      gsap.to(ringRef.current, { scale: 2.4, opacity: 0.5, duration: 0.3 })
      gsap.to(dotRef.current, { scale: 0, duration: 0.3 })
    }
    const onLeaveLink = () => {
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ─────────────────────────── Navbar ─────────────────────────── */
function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 2.4, ease: 'power3.out' }
    )
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goldStyle = {
    background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '1.25rem 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.5s',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      background: scrolled ? 'rgba(8,8,8,0.7)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : 'none',
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: '1.35rem', letterSpacing: '0.25em', fontWeight: 300,
        ...goldStyle
      }}>AR.</div>

      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {['Work', 'About', 'Skills', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
        ))}
      </div>
    </nav>
  )
}

/* ─────────────────────────── Hero ─────────────────────────── */
function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const glowRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    // Floating glow
    gsap.to(glowRef.current, {
      opacity: 0.22, scale: 1.15,
      duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'
    })

    // Entrance timeline — fires after loading screen clears
    const tl = gsap.timeline({ delay: 0.6 })
    tl.fromTo(badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(line1Ref.current,
      { y: 120, opacity: 0, skewY: 4 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.3, ease: 'power4.out' }, '-=0.3'
    )
    .fromTo(line2Ref.current,
      { y: 120, opacity: 0, skewY: 4 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.3, ease: 'power4.out' }, '-=1'
    )
    .fromTo(subRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6'
    )
    .fromTo(ctaRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.4'
    )
  }, [])

  const goldText = {
    background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  }

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '6rem 2rem 3rem',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Glow orb */}
      <div ref={glowRef} style={{
        position: 'absolute', top: '42%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.28) 0%, transparent 70%)',
        opacity: 0.07, pointerEvents: 'none'
      }} />
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(201,169,110,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.035) 1px,transparent 1px)',
        backgroundSize: '80px 80px', pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1152, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div ref={badgeRef} style={{
          fontFamily: "'DM Mono',monospace", fontSize: 11,
          letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase',
          marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 16
        }}>
          <span>Portfolio 2025</span>
          <div style={{ width: 56, height: 1, background: '#c9a96e', opacity: 0.5 }} />
          <span style={{ opacity: 0.5 }}>Available for Projects</span>
        </div>

        {/* Headline line 1 */}
        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div ref={line1Ref} style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(4rem,10vw,9rem)',
            lineHeight: 1, fontWeight: 300, letterSpacing: '-0.02em'
          }}>
            Frontend
          </div>
        </div>

        {/* Headline line 2 */}
        <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
          <div ref={line2Ref} style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(4rem,10vw,9rem)',
            lineHeight: 1, fontWeight: 300, letterSpacing: '-0.02em',
            fontStyle: 'italic', ...goldText
          }}>
            Developer.
          </div>
        </div>

        {/* Sub */}
        <div ref={subRef} style={{
          display: 'flex', alignItems: 'center', gap: 28,
          marginBottom: '3rem', flexWrap: 'wrap'
        }}>
          <p style={{
            color: 'rgba(240,237,230,0.5)', fontSize: '1.1rem',
            fontWeight: 300, maxWidth: 420, lineHeight: 1.8
          }}>
            Crafting immersive digital experiences dengan precision, elegance,&nbsp;dan perhatian penuh pada setiap detail.
          </p>
          <div style={{ width: 1, height: 70, background: 'rgba(201,169,110,0.25)' }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>
            <div style={{ color: 'rgba(240,237,230,0.3)' }}>Based in Indonesia</div>
            <div style={{ color: '#c9a96e', marginTop: 6 }}>Open to Collaborate</div>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="#work"
            style={{
              padding: '14px 36px', border: '1px solid rgba(201,169,110,0.5)',
              fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#c9a96e', textDecoration: 'none',
              transition: 'all 0.3s', background: 'transparent', display: 'inline-block'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#080808'; e.currentTarget.style.background = '#c9a96e' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#c9a96e'; e.currentTarget.style.background = 'transparent' }}
          >View Work</a>
          <a href="#contact"
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(240,237,230,0.3)',
              textDecoration: 'none', transition: 'color 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,230,0.3)'}
          >Let's Talk →</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.35
      }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom,#c9a96e,transparent)' }} />
      </div>
    </section>
  )
}

/* ─────────────────────────── Projects ─────────────────────────── */
const projects = [
  {
    number: '01', title: 'Luminary Design System', category: 'Design System · React', year: '2025',
    desc: 'Sistem desain komprehensif dengan 80+ komponen, dark/light mode, dan aksesibilitas penuh untuk skala enterprise.',
    tags: ['React', 'TypeScript', 'Storybook', 'CSS Tokens']
  },
  {
    number: '02', title: 'Obsidian E-Commerce', category: 'Web App · Next.js', year: '2024',
    desc: 'Platform e-commerce premium dengan animasi fluid, checkout satu langkah, dan performa Core Web Vitals 98+.',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind']
  },
  {
    number: '03', title: 'Aether Dashboard', category: 'SaaS · Vue.js', year: '2024',
    desc: 'Analytics dashboard real-time dengan 3D data visualization, dark mode luxury, dan responsif di semua perangkat.',
    tags: ['Vue 3', 'D3.js', 'WebSocket', 'Three.js']
  },
  {
    number: '04', title: 'Velvet Agency Site', category: 'Website · React', year: '2023',
    desc: 'Website agensi kreatif dengan scroll storytelling immersive, parallax layers, dan micro-interaction premium.',
    tags: ['React', 'GSAP', 'ScrollTrigger', 'Lenis']
  },
]

function ProjectCard({ project }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: 70, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 87%', toggleActions: 'play none none reverse' }
      }
    )
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? '1px solid rgba(201,169,110,0.4)' : '1px solid rgba(201,169,110,0.1)',
        background: hovered ? 'rgba(201,169,110,0.05)' : 'rgba(255,255,255,0.015)',
        padding: 36, borderRadius: 2, position: 'relative', overflow: 'hidden',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        cursor: 'pointer'
      }}
    >
      {/* Shine on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',
          background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.06),transparent)',
          animation: 'shimmer 0.7s ease forwards'
        }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(201,169,110,0.5)', letterSpacing: '0.2em' }}>{project.number}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'rgba(240,237,230,0.2)', letterSpacing: '0.2em' }}>{project.year}</span>
      </div>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.3),transparent)', marginBottom: 28 }} />

      <h3 style={{
        fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', fontWeight: 300, marginBottom: 8,
        color: hovered ? '#c9a96e' : '#f0ede6', transition: 'color 0.3s'
      }}>{project.title}</h3>

      <p style={{
        fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.2em',
        color: '#c9a96e', textTransform: 'uppercase', marginBottom: 18, opacity: 0.6
      }}>{project.category}</p>

      <p style={{ color: 'rgba(240,237,230,0.42)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 26, fontWeight: 300 }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {project.tags.map(tag => (
          <span key={tag} className="skill-tag">{tag}</span>
        ))}
      </div>

      <div style={{
        marginTop: 28, fontFamily: "'DM Mono',monospace", fontSize: 11,
        letterSpacing: '0.2em', transition: 'color 0.4s',
        color: hovered ? 'rgba(201,169,110,0.8)' : 'rgba(201,169,110,0)'
      }}>
        View Project →
      </div>
    </div>
  )
}

function Work() {
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } }
    )
  }, [])

  const goldText = { background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

  return (
    <section id="work" style={{ padding: '9rem 2rem' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div ref={titleRef} style={{ marginBottom: 72, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 18 }}>Selected Work</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, lineHeight: 1 }}>
              Proyek <span style={{ ...goldText, fontStyle: 'italic' }}>Terpilih</span>
            </h2>
          </div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(240,237,230,0.2)', textAlign: 'right' }}>
            <div>04 Projects</div>
            <div style={{ color: '#c9a96e', marginTop: 6 }}>2023 — 2025</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 18 }}>
          {projects.map(p => <ProjectCard key={p.number} project={p} />)}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── About (with Profile Photo) ─────────────────────────── */
function About() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const colorOverlayRef = useRef(null)

  useEffect(() => {
    // Stagger entrance for .rev elements
    const els = sectionRef.current.querySelectorAll('.rev')
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, delay: i * 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%' } }
      )
    })

    // Photo grayscale-to-color with GSAP on hover
    const photoEl = photoRef.current
    if (!photoEl) return

    const enterHandler = () => {
      gsap.to(colorOverlayRef.current, { opacity: 1, duration: 0.9, ease: 'power2.inOut' })
      gsap.to(photoEl, { scale: 1.04, duration: 0.9, ease: 'power2.out' })
    }
    const leaveHandler = () => {
      gsap.to(colorOverlayRef.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' })
      gsap.to(photoEl, { scale: 1, duration: 0.9, ease: 'power2.out' })
    }

    photoEl.closest('.photo-container')?.addEventListener('mouseenter', enterHandler)
    photoEl.closest('.photo-container')?.addEventListener('mouseleave', leaveHandler)

    return () => {
      photoEl.closest('.photo-container')?.removeEventListener('mouseenter', enterHandler)
      photoEl.closest('.photo-container')?.removeEventListener('mouseleave', leaveHandler)
    }
  }, [])

  const goldText = { background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

  return (
    <section id="about" ref={sectionRef} style={{ padding: '9rem 2rem' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#c9a96e,transparent)', marginBottom: 88 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          {/* LEFT — Photo */}
          <div className="rev" style={{ position: 'relative' }}>
            <div className="photo-container" style={{
              width: '100%', maxWidth: 380, margin: '0 auto',
              aspectRatio: '3/4',
              border: '1px solid rgba(201,169,110,0.2)',
              position: 'relative', overflow: 'hidden', borderRadius: 2, cursor: 'none'
            }}>
              {/* Grayscale layer */}
              <img
                src={profileImg}
                alt="AR — Frontend Developer"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  filter: 'grayscale(100%) contrast(1.1)',
                }}
              />

              {/* Color layer (revealed on hover) */}
              <img
                ref={colorOverlayRef}
                src={profileImg}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  opacity: 0,
                }}
              />

              {/* Invisible interaction target */}
              <div ref={photoRef} style={{ position: 'absolute', inset: 0, zIndex: 2 }} />

              {/* Gradient overlay at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(transparent, rgba(8,8,8,0.85))',
                zIndex: 3
              }} />

              {/* Photo label */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 22px', zIndex: 4,
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
              }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', color: '#f0ede6', fontWeight: 300 }}>AR.</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.2em', color: '#c9a96e', textTransform: 'uppercase', marginTop: 2, opacity: 0.7 }}>Frontend Dev</div>
                </div>
                <div style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 8,
                  color: 'rgba(201,169,110,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase'
                }}>Hover to reveal color</div>
              </div>

              {/* Corner brackets */}
              {[{ top: 10, left: 10, bL: 1, bT: 1 }, { top: 10, right: 10, bR: 1, bT: 1 },
                { bottom: 10, left: 10, bL: 1, bB: 1 }, { bottom: 10, right: 10, bR: 1, bB: 1 }].map((pos, i) => {
                  const { bL, bR, bT, bB, ...rest } = pos
                  return (
                    <div key={i} style={{
                      position: 'absolute', width: 22, height: 22, zIndex: 5,
                      ...rest,
                      ...(bL && { borderLeft: '1px solid rgba(201,169,110,0.6)' }),
                      ...(bR && { borderRight: '1px solid rgba(201,169,110,0.6)' }),
                      ...(bT && { borderTop: '1px solid rgba(201,169,110,0.6)' }),
                      ...(bB && { borderBottom: '1px solid rgba(201,169,110,0.6)' }),
                    }} />
                  )
                })}
            </div>

            {/* Floating stats card */}
            <div style={{
              position: 'absolute', bottom: -22, right: 0,
              background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,169,110,0.15)', padding: '18px 22px',
              textAlign: 'center', minWidth: 130, borderRadius: 2
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', ...goldText, fontWeight: 300, lineHeight: 1 }}>3+</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.2em', color: '#c9a96e', textTransform: 'uppercase', marginTop: 6, opacity: 0.6 }}>Years Exp.</div>
            </div>
          </div>

          {/* RIGHT — Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div className="rev">
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 18 }}>Tentang Saya</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, lineHeight: 1.25 }}>
                Passion untuk <span style={{ ...goldText, fontStyle: 'italic' }}>craft</span> yang sempurna
              </h2>
            </div>

            <p className="rev" style={{ color: 'rgba(240,237,230,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
              Saya adalah Frontend Developer yang berfokus pada pembuatan pengalaman web yang tidak hanya indah secara visual, tetapi juga performant dan accessible.
            </p>

            <p className="rev" style={{ color: 'rgba(240,237,230,0.38)', lineHeight: 1.85, fontWeight: 300, fontSize: '0.92rem' }}>
              Dengan keahlian di React ecosystem, animasi GSAP, dan eye for design, saya menjembatani gap antara design vision dan technical implementation. Every pixel matters.
            </p>

            <div className="rev" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, paddingTop: 10 }}>
              {[
                { label: 'Projects Delivered', value: '24+' },
                { label: 'Happy Clients', value: '18+' },
                { label: 'Cups of Coffee', value: '∞' },
                { label: 'Lines of Code', value: '50K+' },
              ].map(s => (
                <div key={s.label} style={{ borderLeft: '1px solid rgba(201,169,110,0.2)', paddingLeft: 18 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.85rem', ...goldText, fontWeight: 300 }}>{s.value}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'rgba(240,237,230,0.28)', marginTop: 5, letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Skills ─────────────────────────── */
const skillGroups = [
  { category: 'Frontend Core', skills: ['React.js', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript ES2024'] },
  { category: 'Styling & Animation', skills: ['Tailwind CSS', 'GSAP', 'Framer Motion', 'CSS Modules', 'Sass/SCSS'] },
  { category: 'Tools & Workflow', skills: ['Vite', 'Webpack', 'Git', 'Figma', 'Storybook'] },
  { category: 'Performance & Others', skills: ['Web Vitals', 'PWA', 'REST API', 'GraphQL', 'Firebase'] },
]

function SkillBar({ item, delay }) {
  const barRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(fillRef.current,
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.6, delay, ease: 'power3.out',
        scrollTrigger: { trigger: barRef.current, start: 'top 88%' }
      }
    )
  }, [])

  return (
    <div ref={barRef} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(240,237,230,0.38)', width: 170, flexShrink: 0 }}>{item.name}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.08)', position: 'relative' }}>
        <div ref={fillRef} style={{
          position: 'absolute', inset: '0 auto 0 0',
          width: `${item.level}%`, height: 1,
          background: 'linear-gradient(90deg,#c9a96e,#f0d9a8)',
          transformOrigin: 'left center', transform: 'scaleX(0)'
        }} />
      </div>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(201,169,110,0.55)', width: 36, textAlign: 'right' }}>{item.level}</span>
    </div>
  )
}

function Skills() {
  const ref = useRef(null)
  const goldText = { background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

  useEffect(() => {
    ref.current.querySelectorAll('.sg').forEach((el, i) => {
      gsap.fromTo(el,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, delay: i * 0.13, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%' } }
      )
    })
  }, [])

  return (
    <section id="skills" ref={ref} style={{ padding: '9rem 2rem' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 18 }}>Expertise</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, lineHeight: 1 }}>
            Tech <span style={{ ...goldText, fontStyle: 'italic' }}>Stack</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, marginBottom: 72 }}>
          {skillGroups.map(g => (
            <div key={g.category} className="sg" style={{
              background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(201,169,110,0.12)', padding: 26, borderRadius: 2,
              transition: 'border-color 0.3s, transform 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a96e' }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.2em', color: '#c9a96e', textTransform: 'uppercase' }}>{g.category}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {g.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.2em', color: 'rgba(240,237,230,0.25)', textTransform: 'uppercase', marginBottom: 4 }}>Proficiency Level</div>
          {[
            { name: 'React / Next.js', level: 95 },
            { name: 'CSS / Tailwind / GSAP', level: 92 },
            { name: 'TypeScript', level: 85 },
            { name: 'Vue.js', level: 78 },
          ].map((item, i) => (
            <SkillBar key={item.name} item={item} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Contact ─────────────────────────── */
function Contact() {
  const ref = useRef(null)
  const goldText = { background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
  }, [])

  return (
    <section id="contact" style={{ padding: '9rem 2rem' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#c9a96e,transparent)', marginBottom: 88 }} />
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 28 }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, lineHeight: 1, marginBottom: 28 }}>
            Mari <span style={{ ...goldText, fontStyle: 'italic' }}>Berkolaborasi</span>
          </h2>
          <p style={{ color: 'rgba(240,237,230,0.38)', maxWidth: 500, margin: '0 auto', lineHeight: 1.85, fontWeight: 300 }}>
            Punya proyek menarik? Saya selalu terbuka untuk diskusi dan kolaborasi baru yang menantang.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <a href="mailto:hello@arizki.dev" style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(1.4rem,3.5vw,2.4rem)', fontWeight: 300,
            color: 'rgba(240,237,230,0.55)', textDecoration: 'none',
            transition: 'color 0.5s', display: 'flex', alignItems: 'center', gap: 14
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,230,0.55)'}
          >
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: 'rgba(201,169,110,0.5)' }}>→</span>
            hello@arizki.dev
          </a>

          <div style={{ display: 'flex', gap: 36, marginTop: 12 }}>
            {['GitHub', 'LinkedIn', 'Dribbble', 'Twitter / X'].map(l => (
              <a key={l} href="#"
                style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(240,237,230,0.35)',
                  textDecoration: 'none', transition: 'color 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,230,0.35)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Loading Screen ─────────────────────────── */
function Loader({ onDone }) {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(barRef.current, { width: '100%', duration: 1.8, ease: 'power2.inOut' })
      .to(textRef.current, { opacity: 0, duration: 0.4 }, '-=0.4')
      .to(loaderRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.1')
  }, [])

  const goldText = { background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

  return (
    <div ref={loaderRef} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: '#080808',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div ref={textRef} style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3.2rem', ...goldText, fontWeight: 300, letterSpacing: '0.35em' }}>AR.</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.28em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginTop: 10 }}>Loading Portfolio</div>
      </div>
      <div style={{ width: 200, height: 1, background: 'rgba(201,169,110,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div ref={barRef} style={{
          position: 'absolute', inset: '0 auto 0 0', width: 0, height: 1,
          background: 'linear-gradient(90deg,#c9a96e,#f0d9a8)'
        }} />
      </div>
    </div>
  )
}

/* ─────────────────────────── App Root ─────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false)

  const goldText = { background: 'linear-gradient(135deg,#c9a96e,#f0d9a8,#c9a96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}>
        <Navbar />
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
        <footer style={{ padding: '2.5rem 2rem', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', letterSpacing: '0.22em', ...goldText, fontWeight: 300 }}>AR.</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'rgba(240,237,230,0.18)', letterSpacing: '0.1em' }}>© 2025 · Built with React & GSAP</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'rgba(240,237,230,0.18)' }}>Designed in Indonesia</div>
          </div>
        </footer>
      </div>
    </>
  )
}
