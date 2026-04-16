import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageWrapper, PageHeader, Card, PrimaryButton, Input, Stagger, StaggerItem } from '../components/UI'

/* ── Tool definitions ───────────────────────────────────── */
const TOOLS = [
  { key: 'pill',      icon: '💊', title: 'Pill Identifier',      desc: 'Identify any medicine by its name or imprint code.',                         border: 'border-blue-200',   link: 'text-blue-700'   },
  { key: 'symptom',   icon: '🩺', title: 'Symptom Checker',       desc: 'Find medications commonly associated with a specific side effect.',           border: 'border-violet-200', link: 'text-violet-700' },
  { key: 'dose',      icon: '⚖️', title: 'Dosage Calculator',     desc: 'Estimate an appropriate single dose based on patient weight.',                border: 'border-teal-200',   link: 'text-teal-700'   },
  { key: 'reminder',  icon: '⏰', title: 'Medication Reminder',   desc: 'Set daily reminders for each of your medications. (Coming soon)',             border: 'border-orange-200', link: 'text-orange-700' },
  { key: 'history',   icon: '🔗', title: 'Interaction History',   desc: 'Review your previous drug interaction checks at a glance.',                  border: 'border-emerald-200',link: 'text-emerald-700'},
  { key: 'emergency', icon: '🆘', title: 'Emergency Contacts',    desc: 'Quick-dial India medical and poison-control helplines.',                      border: 'border-red-200',    link: 'text-red-700'    },
]

/* ── Data ───────────────────────────────────────────────── */
const PILL_DB = {
  aspirin:      { name: 'Aspirin 75 mg',       shape: 'Round',   color: 'White',       imprint: 'ASP75',   mfr: 'Bayer'        },
  metformin:    { name: 'Metformin 500 mg',     shape: 'Oval',    color: 'White',       imprint: 'MET500',  mfr: 'Sun Pharma'   },
  atorvastatin: { name: 'Atorvastatin 20 mg',   shape: 'Oval',    color: 'White',       imprint: 'ATV20',   mfr: 'Pfizer'       },
  omeprazole:   { name: 'Omeprazole 20 mg',     shape: 'Capsule', color: 'Pink / White', imprint: 'OMZ20',   mfr: 'AstraZeneca'  },
  warfarin:     { name: 'Warfarin 5 mg',        shape: 'Round',   color: 'Peach',       imprint: 'WAR5',    mfr: 'Bristol-Myers'},
  lisinopril:   { name: 'Lisinopril 10 mg',     shape: 'Round',   color: 'Light Blue',  imprint: 'LIS10',   mfr: 'Lupin'        },
}

const SYMPTOM_DB = {
  nausea:          ['Metformin', 'Aspirin', 'Omeprazole', 'Lisinopril'],
  dizziness:       ['Amlodipine', 'Metoprolol', 'Lisinopril', 'Warfarin'],
  'muscle pain':   ['Atorvastatin', 'Simvastatin', 'Rosuvastatin'],
  bleeding:        ['Warfarin', 'Aspirin', 'Clopidogrel', 'Ibuprofen'],
  cough:           ['Lisinopril', 'Ramipril', 'Enalapril'],
  swelling:        ['Amlodipine', 'Nifedipine', 'Felodipine'],
  headache:        ['Nitroglycerin', 'Sildenafil', 'Nifedipine'],
  'stomach upset': ['Aspirin', 'Ibuprofen', 'Naproxen', 'Metformin'],
}

const DOSE_DB = {
  paracetamol: { perKg: 15, max: 1000, unit: 'mg', note: '10–15 mg/kg per dose. Maximum 1000 mg per dose, 4 doses/day.' },
  ibuprofen:   { perKg: 10, max: 400,  unit: 'mg', note: '5–10 mg/kg per dose. Maximum 400 mg for adults. Take with food.' },
  aspirin:     { fixed: 325,           unit: 'mg', note: 'Standard adult dose 325–650 mg. Low-dose cardio protection: 75–100 mg/day.' },
}

const HISTORY = [
  { drugs: 'Warfarin + Aspirin',              risk: 'High',     date: 'Today, 10:30 AM'   },
  { drugs: 'Atorvastatin + Clarithromycin',   risk: 'Moderate', date: 'Yesterday, 3:45 PM'},
  { drugs: 'Paracetamol + Ibuprofen',         risk: 'Safe',     date: '2 days ago'         },
]

const EMERGENCY = [
  { name: 'National Poison Control Centre', num: '1800-116-117', note: '24/7 Toll-free helpline',       icon: '☠️' },
  { name: 'Emergency Ambulance',            num: '108',           note: 'Free emergency service',         icon: '🚑' },
  { name: 'Medical Helpline',               num: '104',           note: 'Health advice & guidance',       icon: '🏥' },
  { name: 'Senior Citizen Helpline',        num: '14567',         note: 'Elderly care support',           icon: '👴' },
]

/* ── Risk badge helper ───────────────────────────────────── */
function MiniRiskBadge({ risk }) {
  const cls = { High: 'bg-red-50 text-red-700 border-red-200', Moderate: 'bg-amber-50 text-amber-700 border-amber-200', Safe: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  return <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cls[risk]}`}>{risk}</span>
}

/* ── Tool content components ─────────────────────────────── */
function PillIdentifier() {
  const [q, setQ] = useState(''); const [r, setR] = useState(null)
  function identify() {
    const qL = q.toLowerCase()
    const found = Object.entries(PILL_DB).find(([k, v]) =>
      k.includes(qL) || v.name.toLowerCase().includes(qL) || v.imprint.toLowerCase().includes(qL)
    )
    setR(found ? found[1] : 'not_found')
  }
  return (
    <Card>
      <h2 className="text-xl font-bold text-navy mb-1">💊 Pill Identifier</h2>
      <p className="text-slate-500 text-sm mb-5">Enter a pill name or imprint code</p>
      <Input value={q} onChange={e => { setQ(e.target.value); setR(null) }} placeholder="e.g. Aspirin, MET500, OMZ20..." className="mb-3" onKeyDown={e => e.key === 'Enter' && identify()} />
      <PrimaryButton onClick={identify}>Identify Pill</PrimaryButton>
      <AnimatePresence>
        {r && r !== 'not_found' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-sky-light border border-blue-200 rounded-xl p-5">
            <h3 className="font-bold text-navy text-base mb-3">{r.name}</h3>
            <div className="grid grid-cols-2 gap-2">
              {[['Shape', r.shape], ['Color', r.color], ['Imprint', r.imprint], ['Manufacturer', r.mfr]].map(([k, v]) => (
                <div key={k} className="bg-white rounded-lg p-2.5">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">{k}</p>
                  <p className="text-slate-800 font-semibold text-sm">{v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {r === 'not_found' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-slate-500 text-sm">
            Not found. Try: aspirin, metformin, atorvastatin, omeprazole, warfarin
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function SymptomChecker() {
  const [q, setQ] = useState(''); const [r, setR] = useState(null)
  function check() {
    const qL = q.toLowerCase()
    const found = Object.entries(SYMPTOM_DB).find(([k]) => k.includes(qL) || qL.includes(k))
    setR(found ? found[1] : [])
  }
  return (
    <Card>
      <h2 className="text-xl font-bold text-navy mb-1">🩺 Symptom Checker</h2>
      <p className="text-slate-500 text-sm mb-4">Find medications that may cause a specific symptom</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {Object.keys(SYMPTOM_DB).map(s => (
          <button key={s} onClick={() => { setQ(s); setR(SYMPTOM_DB[s]) }} className="px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full text-[12px] font-medium hover:bg-violet-100 transition-colors">{s}</button>
        ))}
      </div>
      <Input value={q} onChange={e => { setQ(e.target.value); setR(null) }} placeholder="e.g. nausea, dizziness, cough..." className="mb-3" onKeyDown={e => e.key === 'Enter' && check()} />
      <PrimaryButton onClick={check}>Check Symptom</PrimaryButton>
      <AnimatePresence>
        {r !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            {r.length > 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-bold text-amber-800 text-sm mb-3">Medications that may cause "{q}":</p>
                <div className="flex flex-wrap gap-2">{r.map((d,i) => <span key={i} className="bg-white border border-amber-200 text-slate-700 text-xs px-3 py-1 rounded-full">{d}</span>)}</div>
                <p className="text-amber-700 text-xs mt-3">⚕️ Consult your doctor if this symptom is severe.</p>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-slate-500 text-sm">
                Symptom not in database. Try: nausea, dizziness, muscle pain, bleeding, cough
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function DosageCalc() {
  const [drug, setDrug] = useState(''); const [wt, setWt] = useState(''); const [r, setR] = useState(null)
  function calc() {
    if (!drug || !wt) return
    const d = DOSE_DB[drug]; const w = parseFloat(wt)
    if (!d || isNaN(w) || w <= 0) return
    const dose = d.fixed || Math.min(w * d.perKg, d.max)
    setR({ dose: Math.round(dose), unit: d.unit, note: d.note })
  }
  return (
    <Card>
      <h2 className="text-xl font-bold text-navy mb-1">⚖️ Dosage Calculator</h2>
      <p className="text-slate-500 text-sm mb-5">Estimate dose by weight — educational purposes only</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">Select Drug</label>
          <select className="w-full px-4 py-3.5 border-[1.5px] border-slate-200 rounded-xl text-[15px] text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" value={drug} onChange={e => { setDrug(e.target.value); setR(null) }}>
            <option value="">Choose...</option>
            {Object.keys(DOSE_DB).map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">Weight (kg)</label>
          <Input type="number" value={wt} onChange={e => { setWt(e.target.value); setR(null) }} placeholder="e.g. 65" />
        </div>
      </div>
      <PrimaryButton onClick={calc}>Calculate Dose</PrimaryButton>
      <AnimatePresence>
        {r && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-teal-50 border border-teal-200 rounded-xl p-5">
            <p className="font-bold text-teal-800 text-sm mb-1">Estimated Single Dose</p>
            <p className="text-4xl font-extrabold text-teal-700 mb-2">{r.dose} <span className="text-xl">{r.unit}</span></p>
            <p className="text-slate-500 text-xs mb-2">{r.note}</p>
            <p className="text-red-600 text-xs">⚠️ Estimate only. Follow your doctor's prescription exactly.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function InteractionHistory() {
  const dot = { High: 'bg-red-500', Moderate: 'bg-amber-400', Safe: 'bg-emerald-500' }
  return (
    <Card>
      <h2 className="text-xl font-bold text-navy mb-5">🔗 Interaction History</h2>
      {HISTORY.map((h, i) => (
        <div key={i} className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
          <div>
            <p className="font-semibold text-slate-800 text-sm">{h.drugs}</p>
            <p className="text-slate-400 text-xs mt-0.5">{h.date}</p>
          </div>
          <MiniRiskBadge risk={h.risk} />
        </div>
      ))}
      <button className="w-full mt-4 text-blue-500 text-sm font-medium hover:text-navy transition-colors">View All History →</button>
    </Card>
  )
}

function EmergencyContacts() {
  return (
    <Card>
      <h2 className="text-xl font-bold text-navy mb-1">🆘 Emergency Contacts</h2>
      <p className="text-slate-500 text-sm mb-5">India-based medical emergency helplines</p>
      {EMERGENCY.map((c, i) => (
        <div key={i} className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl p-4 mb-3">
          <div>
            <p className="font-semibold text-slate-800 text-sm">{c.icon} {c.name}</p>
            <p className="text-slate-500 text-xs mt-0.5">{c.note}</p>
          </div>
          <a
            href={`tel:${c.num}`}
            className="ml-3 shrink-0 bg-red-600 text-white font-bold text-sm px-3 py-2 rounded-lg
              hover:bg-red-700 transition-colors"
          >
            📞 {c.num}
          </a>
        </div>
      ))}
    </Card>
  )
}

function ComingSoon({ title }) {
  return (
    <Card className="text-center">
      <div className="text-5xl mb-4">⏰</div>
      <h2 className="text-xl font-bold text-navy mb-2">{title}</h2>
      <p className="text-slate-500 text-sm mb-4">This feature is coming in the next update.</p>
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-orange-700 text-sm">
        🚧 You'll be able to set personalized daily reminders for each of your medications!
      </div>
    </Card>
  )
}

const TOOL_CONTENT = {
  pill: <PillIdentifier />,
  symptom: <SymptomChecker />,
  dose: <DosageCalc />,
  reminder: <ComingSoon title="⏰ Medication Reminder" />,
  history: <InteractionHistory />,
  emergency: <EmergencyContacts />,
}

/* ── Main page ───────────────────────────────────────────── */
export default function HealthToolsPage() {
  const [active, setActive] = useState(null)

  return (
    <PageWrapper>
      <div className="flex-1 p-5 overflow-auto min-w-0">
        <PageHeader
          icon="🩺"
          title="Health Tools"
          subtitle="Helpful tools to manage your medications and personal health"
        />

        {!active ? (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {TOOLS.map((t) => (
              <StaggerItem key={t.key}>
                <button
                  onClick={() => setActive(t.key)}
                  className={`w-full text-left bg-white border-[1.5px] ${t.border} rounded-2xl p-6
                    hover:shadow-hover hover:-translate-y-1 active:translate-y-0 transition-all duration-250`}
                >
                  <div className="text-4xl mb-4">{t.icon}</div>
                  <h3 className="font-bold text-slate-800 text-base mb-1.5">{t.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{t.desc}</p>
                  <span className={`text-[13px] font-semibold ${t.link}`}>Open tool →</span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="max-w-xl mx-auto">
            <button
              onClick={() => setActive(null)}
              className="flex items-center gap-2 text-blue-500 hover:text-navy text-sm font-medium mb-5 transition-colors"
            >
              ← Back to Tools
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {TOOL_CONTENT[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
