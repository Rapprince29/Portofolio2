import { User, Briefcase, Camera, Database, LayoutGrid, ShieldCheck, Cpu, Code2 } from 'lucide-react'

export const projects = [
  {
    title: "VIRTUAL_REALITY DASHBOARD",
    category: "INTERACTIVE UI",
    desc: "A futuristic data management interface with real-time analytics and neural-inspired visualizations.",
    image: "/projects/moco.png",
    stack: ["React", "Three.js", "GSAP", "RTK"],
    links: [
       { label: "Github", url: "#" },
       { label: "Live Demo", url: "#" }
    ]
  },
  {
    title: "E-COMM_X ARCHITECTURE",
    category: "SYSTEM DESIGN",
    desc: "High-performance modular e-commerce backbone optimized for low latency and high concurrency.",
    image: "/project2.jpg",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    links: [
       { label: "Repository", url: "#" }
    ]
  }
]

export const academicHistory = [
  {
    id: "01",
    year: "2018 — 2020",
    school: "smp negeri 1 sukodono",
    degree: "Sekolah Menengah Pertama",
    desc: "langkah awal dalam eksplorasi dunia digital dan logika dasar.",
    details: [
      { label: "waiter", company: "defins art cafe", duration: "3 years (2019-2021)" },
      { label: "champion", company: "basketball competition", duration: "2019" }
    ]
  },
  {
    id: "02",
    year: "2021 — 2024",
    school: "smk antartika 2 sidoarjo",
    degree: "Sekolah Menengah Kejuruan",
    desc: "mendalami fondasi pemrograman, sistem komputer, dan praktek industri.",
    details: [
      { label: "leader", company: "student council (OSIS)", duration: "2022-2023" },
      { label: "freelance", company: "graphic design & web", duration: "2022-Present" }
    ]
  },
  {
    id: "03",
    year: "2024 — Present",
    school: "PENS SURABAYA",
    degree: "Informatics Engineering (D4)",
    desc: "Menekuni arsitektur sistem informasi, rekayasa perangkat lunak, dan kecerdasan buatan di Politeknik Elektronika Negeri Surabaya.",
    details: [
       { label: "student", company: "PENS", duration: "Active" },
       { label: "member", company: "SurabayaDev", duration: "2024" }
    ]
  }
]

export const certificates = [
  {
    id: "C_01",
    title: "DIGITAL BRANDING",
    issuer: "B1GFAIR RISE",
    year: "2025",
    serial: "03175/1/BF/PB/SBY/I/2025",
    speakers: "Harriz Vriza — Public Figure",
    desc: "Seminar Nasional with Harriz Vriza on establishing a high-impact digital presence.",
    icon: <User size={24} />,
    image: "/certs/branding.png"
  },
  {
    id: "C_02",
    title: "ENTREPRENEURSHIP",
    issuer: "B1GFAIR RISE",
    year: "2025",
    serial: "03175/2/BF/E/SBY/I/2025",
    speakers: "Abi Atria — Professional Coach",
    desc: "Training focus on 'Zero Point to High Point' with Abi Atria for strategic growth.",
    icon: <Briefcase size={24} />,
    image: "/certs/entrepreneur.png"
  },
  {
    id: "C_03",
    title: "PUBLIC SPEAKING",
    issuer: "B1GFAIR RISE",
    year: "2025",
    serial: "03175/3/BF/PS/SBY/I/2025",
    speakers: "Dr. Charly Hongdiyanto — Speaker",
    desc: "Advanced communication training with Dr. Charly Hongdiyanto.",
    icon: <Camera size={24} />,
    image: "/certs/speaking.png"
  },
  {
    id: "C_04",
    title: "FINANCIAL PLANNING",
    issuer: "B1GFAIR RISE",
    year: "2025",
    serial: "03175/4/BF/FP/SBY/I/2025",
    speakers: "Yonathan S.Kom — Financial Planner",
    desc: "Financial literacy and management strategy training with Yonathan S.Kom.",
    icon: <Database size={24} />,
    image: "/certs/financial.png"
  },
  {
    id: "C_05",
    title: "CONTENT CREATOR",
    issuer: "B1GFAIR RISE",
    year: "2025",
    serial: "03175/5/BF/CC/SBY/I/2025",
    speakers: "Tifani Hernang — Content Strategist",
    desc: "Professional training on social media monetization with Tifani Hernang.",
    icon: <LayoutGrid size={24} />,
    image: "/certs/creator.png"
  },
  {
    id: "C_06",
    title: "LKMM-TD PENS",
    issuer: "BEM PENS",
    year: "2025",
    serial: "1055/PL14/KM.03.00.02/VI/2025",
    speakers: "Ahmad Miftahur Rif'at — Presiden BEM",
    desc: "Leadership and management training at Politeknik Elektronika Negeri Surabaya.",
    icon: <ShieldCheck size={24} />,
    image: "/certs/lkmmtd.png"
  },
  {
    id: "C_07",
    title: "NEXTGEN TECHVERSE",
    issuer: "SURABAYADEV",
    year: "2025",
    serial: "261/SBYDEV/SERT/XI/2025",
    speakers: "Sawitri Dyah Kusuma Wardhani — Community Manager",
    desc: "SurabayaDev Anniversary 11th on next-gen technology ecosystems.",
    icon: <Cpu size={24} />,
    image: "/certs/surabayadev.jpg"
  },
  {
    id: "C_08",
    title: "WEB TECHNOLOGY INTERN",
    issuer: "CV BAROTERA",
    year: "2022",
    serial: "B_INTERN_2022_09",
    speakers: "Barotera Engineering Team",
    desc: "Certification of completion for professional web architecture and system deployment.",
    icon: <Code2 size={24} />,
    image: ""
  },
  {
    id: "C_09",
    title: "LEARNING REACT.JS",
    issuer: "H-TECH CORP",
    year: "2024",
    serial: "2773/HTECH/SH/XI/2024",
    speakers: "Tegar Aprilian — CEO & Founder H-Tech Corp",
    desc: "Certification for successful participation in the React.js short class organized by H-Tech Corp.",
    icon: <Code2 size={24} />,
    image: "/certs/react-class.png"
  }
]
