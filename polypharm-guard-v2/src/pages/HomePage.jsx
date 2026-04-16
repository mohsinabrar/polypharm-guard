import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RECENT_CHECKS } from '../data/drugData'
import { PageWrapper } from '../components/UI'

function PillHeroArt() {
  return (
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect width="280" height="200" fill="#dce8f5"/>
      <g transform="rotate(-25 100 80)"><rect x="68" y="68" width="64" height="26" rx="13" fill="#b8cfe8"/><rect x="68" y="68" width="32" height="26" rx="13 0 0 13" fill="#9ab8d8"/></g>
      <g transform="rotate(15 180 60)"><rect x="148" y="47" width="64" height="24" rx="12" fill="#c5d9ee"/><rect x="148" y="47" width="32" height="24" rx="12 0 0 12" fill="#a8c4e0"/></g>
      <g transform="rotate(-40 60 130)"><rect x="28" y="118" width="56" height="22" rx="11" fill="#d4e7f5"/><rect x="28" y="118" width="28" height="22" rx="11 0 0 11" fill="#b5d0e8"/></g>
      <g transform="rotate(10 200 140)"><rect x="168" y="128" width="62" height="24" rx="12" fill="#a3bcd4"/><rect x="168" y="128" width="31" height="24" rx="12 0 0 12" fill="#8aa9c0"/></g>
      <circle cx="140" cy="150" r="16" fill="#c2d8ec" opacity=".9"/><circle cx="140" cy="150" r="16" fill="none" stroke="#a8c4dc" strokeWidth="2"/>
      <circle cx="90" cy="60" r="12" fill="#d8e9f5" opacity=".85"/>
      <g transform="rotate(30 220 100)"><rect x="196" y="90" width="48" height="20" rx="10" fill="#b8cfe8"/><rect x="196" y="90" width="24" height="20" rx="10 0 0 10" fill="#9abbda"/></g>
      <circle cx="52" cy="170" r="10" fill="#c8dced" opacity=".8"/>
      <g transform="rotate(-60 150 30)"><rect x="118" y="22" width="52" height="20" rx="10" fill="#ccdff0"/><rect x="118" y="22" width="26" height="20" rx="10 0 0 10" fill="#aecde4"/></g>
      <ellipse cx="220" cy="80" rx="28" ry="36" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
      <ellipse cx="220" cy="66" rx="28" ry="10" fill="rgba(255,255,255,0.12)"/>
    </svg>
  )
}

const RISK_BADGE = { High:'bg-[#fce8e8] text-[#b91c1c]', Moderate:'bg-[#fff3dc] text-[#92600a]', Safe:'bg-[#dcfce7] text-[#166534]' }
const EXPLORE = [
  { icon:'💊', title:'Drug Directory',  desc:'Search any medicine from our database.', to:'/info' },
  { icon:'⚠️', title:'Side Effects',   desc:'Know possible side effects and warnings.', to:'/info' },
  { icon:'⚖️', title:'Compare Drugs',  desc:'Compare two medicines side by side.', to:'/checker' },
  { icon:'❤️', title:'Health Tracker', desc:'Track your medications and health history.', to:'/tools' },
]

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <div className="flex-1 p-5 overflow-auto min-w-0">

        {/* Hero */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex mb-4" style={{minHeight:190}}>
          <div className="flex-1 p-7">
            <h1 className="text-2xl font-extrabold text-[#0d2b5e] leading-tight mb-2">Check Drug Interactions. Stay Safe.</h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">Find potential interactions between your medications and get clear, reliable information.</p>
          </div>
          <div className="w-64 shrink-0"><PillHeroArt/></div>
        </div>

        {/* Search card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Enter Drug Names <span className="font-normal normal-case tracking-normal">(add up to 10)</span>
          </p>
          <div className="flex gap-2.5 mb-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input className="w-full pl-9 pr-4 py-2.5 border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/10 transition-all" placeholder="e.g. Aspirin, Metformin, Atorvastatin" onKeyDown={e=>e.key==='Enter'&&navigate('/checker')}/>
            </div>
            <button onClick={()=>navigate('/checker')} className="bg-[#1e3a6e] text-white font-semibold text-sm px-5 rounded-xl hover:bg-[#162d57] transition-colors whitespace-nowrap">Check Interaction ›</button>
          </div>
          <div className="flex gap-2.5">
            {[{icon:'📷',title:'Scan Prescription',sub:'Upload image or PDF',to:'/scan'},{icon:'🎤',title:'Voice Search',sub:'Speak your medicine names',to:null}].map(btn=>(
              <button key={btn.title} onClick={()=>btn.to&&navigate(btn.to)} className="flex-1 flex items-center gap-3 border-[1.5px] border-slate-200 rounded-xl p-3 hover:border-[#1e3a6e] hover:bg-[#f8faff] transition-all text-left">
                <span className="text-lg opacity-70">{btn.icon}</span>
                <div className="flex-1"><p className="text-sm font-semibold text-slate-800">{btn.title}</p><p className="text-xs text-slate-400">{btn.sub}</p></div>
                <span className="text-slate-400 text-sm">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Checks */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-800">Recent Checks</h2>
          <button className="text-sm font-semibold text-blue-600 hover:underline">View All ›</button>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {RECENT_CHECKS.map((r,i)=>(
            <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              onClick={()=>navigate('/checker')} className="bg-white border-[1.5px] border-slate-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2.5 ${RISK_BADGE[r.risk]}`}>{r.result}</span>
              <p className="font-bold text-sm text-slate-800 mb-1">{r.drugs}</p>
              <p className="text-xs text-slate-500 mb-3">{r.desc}</p>
              <div className="flex items-center justify-between text-xs text-slate-400"><span>🕐 {r.time}</span><span>›</span></div>
            </motion.div>
          ))}
        </div>

        {/* Explore More */}
        <h2 className="text-base font-bold text-slate-800 mb-3">Explore More</h2>
        <div className="grid grid-cols-4 gap-2.5">
          {EXPLORE.map((e,i)=>(
            <motion.button key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.06}} onClick={()=>navigate(e.to)}
              className="bg-white border-[1.5px] border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-left hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#eef2ff] flex items-center justify-center text-base shrink-0">{e.icon}</div>
              <div className="flex-1 min-w-0"><p className="font-bold text-xs text-slate-800 mb-0.5">{e.title}</p><p className="text-xs text-slate-500 leading-tight">{e.desc}</p></div>
              <span className="text-slate-400 text-xs shrink-0 self-center">›</span>
            </motion.button>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
