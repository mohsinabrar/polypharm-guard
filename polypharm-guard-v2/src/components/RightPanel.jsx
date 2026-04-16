// Right sidebar — Health Profile Summary, Daily Tip, AI Health Assistant

const PROFILE_ROWS = [
  { icon: '👤', label: 'Age',          value: '54 Years'       },
  { icon: '🏥', label: 'Conditions',   value: 'Hypertension'   },
  { icon: '⚠️', label: 'Allergies',    value: 'Penicillin'     },
  { icon: '📅', label: 'Last Updated', value: '12 May 2024'    },
]

export default function RightPanel() {
  return (
    <aside className="w-[230px] shrink-0 flex flex-col gap-4 p-4" style={{background:'#f4f6f9'}}>

      {/* Health Profile Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-slate-800">Health Profile Summary</span>
          <button className="text-[12.5px] text-blue-600 font-medium hover:underline">Edit</button>
        </div>
        {PROFILE_ROWS.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-[11px] text-slate-400 leading-none mb-0.5">{label}</p>
              <p className="text-[13px] font-semibold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Tip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">💡</span>
          <span className="text-sm font-bold text-slate-800">Daily Tip</span>
        </div>
        <p className="text-[12.5px] text-slate-500 leading-relaxed mb-2.5">
          Never stop or change your medication without consulting your doctor.
        </p>
        <button className="text-[12.5px] text-blue-600 font-semibold hover:underline">
          Learn More →
        </button>
      </div>

      {/* AI Health Assistant */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#eef2ff] flex items-center justify-center text-lg">
            🤖
          </div>
          <span className="text-sm font-bold text-slate-800">AI Health Assistant</span>
        </div>
        <p className="text-[12px] text-slate-500 leading-relaxed mb-3">
          Ask your health questions anytime.
        </p>
        <button className="w-full py-2 border-[1.5px] border-[#1e3a6e] rounded-lg text-[13px]
          font-semibold text-[#1e3a6e] bg-white hover:bg-[#eef2ff] transition-colors">
          Start Chat
        </button>
      </div>
    </aside>
  )
}
