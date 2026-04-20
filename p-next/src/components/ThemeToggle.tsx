'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <button 
      onClick={() => setDark(!dark)}
      className="fixed top-8 right-8 z-[1000] p-3 rounded-full border border-accent/20 bg-background/50 backdrop-blur-md text-accent hover:border-accent transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
