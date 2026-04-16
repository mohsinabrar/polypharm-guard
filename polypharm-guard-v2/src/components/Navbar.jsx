import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/',          label: 'Home'         },
  { to: '/checker',   label: 'Drug Checker' },
  { to: '/info',      label: 'Drug Info'    },
  { to: '/tools',     label: 'Health Tools' },
  { to: '/resources', label: 'Resources'    },
  { to: '/about',     label: 'About Us'     },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobile, setMobile] = useState(false)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#0d2b5e] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5 4 9 9 11 5-2 9-6 9-11V7L12 2z" fill="white" fillOpacity=".2" stroke="white" strokeWidth="1.5"/>
              <path d="M9 12h6M12 9v6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#0d2b5e] leading-tight">PolyPharm Guard</p>
            <p className="text-[10.5px] text-slate-400 leading-tight">Safe Medication, Better Health</p>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link key={to} to={to}
                className={`px-3.5 py-1.5 text-[13.5px] font-medium transition-all rounded-lg ${
                  active ? 'text-[#0d2b5e] font-semibold border-b-2 border-[#0d2b5e] rounded-none pb-[5px]'
                         : 'text-slate-500 hover:text-[#0d2b5e] hover:bg-slate-50'}`}>
                {label}
              </Link>
            )
          })}
        </div>
        <div className="flex items-center gap-2.5">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[13px] text-slate-600 hover:bg-slate-50 transition-colors">
            🌐 English ▾
          </button>
          <button className="px-4 py-1.5 border-[1.5px] border-[#1e3a6e] rounded-lg text-[13.5px] font-medium text-[#1e3a6e] hover:bg-blue-50 transition-colors">Login</button>
          <button className="px-5 py-1.5 bg-[#1e3a6e] text-white rounded-lg text-[13.5px] font-semibold hover:bg-[#162d57] transition-colors">Sign Up</button>
          <button className="lg:hidden ml-1 p-1.5 rounded-lg hover:bg-slate-100 text-slate-600" onClick={() => setMobile(!mobile)}>{mobile ? '✕' : '☰'}</button>
        </div>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-slate-200 bg-white px-4 py-3">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMobile(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all ${pathname === to ? 'bg-[#e8edff] text-[#1e3a6e] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
