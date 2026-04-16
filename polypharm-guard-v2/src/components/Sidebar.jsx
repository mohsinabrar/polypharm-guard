import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/',        icon: '🏠', label: 'Dashboard',         sub: '' },
  { to: '/checker', icon: '🔍', label: 'Drug Interaction',   sub: 'Check Combinations' },
  { to: '/scan',    icon: '📋', label: 'Prescription Scan',  sub: 'Upload & Analyze' },
  { to: '/info',    icon: '📖', label: 'Drug Information',   sub: 'A-Z Database' },
  { to: '/profile', icon: '👤', label: 'Health Profile',     sub: 'Your Medical Info' },
  { to: '/reports', icon: '📊', label: 'Reports',            sub: 'Your History' },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="w-[252px] bg-white border-r border-slate-200 flex flex-col shrink-0 p-3">
      {/* Main nav items */}
      {NAV_ITEMS.map(({ to, icon, label, sub }) => {
        const active = pathname === to
        return (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl mb-0.5 transition-all duration-150 ${
              active ? 'bg-[#e8edff]' : 'hover:bg-slate-50'
            }`}
          >
            {/* Icon box */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${
              active ? 'bg-[#c7d4ff]' : 'bg-slate-100'
            }`}>
              {icon}
            </div>
            <div>
              <p className={`text-[13.5px] font-semibold leading-tight ${
                active ? 'text-[#1e3a6e]' : 'text-slate-700'
              }`}>
                {label}
              </p>
              {sub && <p className="text-[11.5px] text-slate-400 leading-tight">{sub}</p>}
            </div>
          </Link>
        )
      })}

      {/* Divider */}
      <hr className="border-slate-100 my-2" />

      {/* AI Assistant */}
      <Link
        to="/ai"
        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl mb-0.5 hover:bg-slate-50 transition-all"
      >
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-base shrink-0">
          🤖
        </div>
        <div>
          <p className="text-[13.5px] font-semibold text-slate-700 leading-tight">AI Assistant</p>
          <p className="text-[11.5px] text-slate-400 leading-tight">Settings</p>
        </div>
      </Link>

      {/* Push help card to bottom */}
      <div className="flex-1" />

      {/* Need Help card */}
      <div className="bg-[#f8faff] border border-[#e8edff] rounded-xl p-3.5">
        <div className="flex items-center gap-2 text-[13.5px] font-bold text-slate-800 mb-1.5">
          <span>🎧</span> Need Help?
        </div>
        <p className="text-[12px] text-slate-500 leading-relaxed mb-2.5">
          Our support team is here for you.
        </p>
        <button className="w-full py-2 bg-[#e8edff] hover:bg-[#d1dbff] text-slate-700 text-[13px]
          font-medium rounded-lg transition-colors">
          Contact Support
        </button>
      </div>
    </aside>
  )
}
