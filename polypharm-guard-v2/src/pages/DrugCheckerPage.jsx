import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INTERACTIONS } from '../data/drugData'
import { normKey, riskMeta } from '../data/helpers'
import { PageWrapper, PageHeader, Card, PrimaryButton, Input, DisclaimerNote } from '../components/UI'

/* Quick-add suggestions */
const SUGGESTIONS = [
  'Aspirin', 'Warfarin', 'Metformin', 'Atorvastatin', 'Omeprazole',
  'Paracetamol', 'Ibuprofen', 'Amlodipine', 'Lisinopril', 'Metoprolol',
  'Clopidogrel', 'Amoxicillin',
]

/* Single interaction result card */
function InteractionResult({ item }) {
  const m = riskMeta(item.risk)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={m.card + ' mb-4'}
    >
      <span className={m.badge}>
        <span className={m.dot} />
        {m.icon} {item.risk} Risk
      </span>
      <h3 className={m.heading}>{item.pair}</h3>
      <p className={m.msg}>{item.message}</p>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.detail}</p>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
          Recommendation
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">{item.recommendation}</p>
      </div>
    </motion.div>
  )
}

export default function DrugCheckerPage() {
  const [drugs, setDrugs]   = useState(['', ''])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  function updateDrug(idx, val) {
    const a = [...drugs]; a[idx] = val; setDrugs(a)
  }
  function removeDrug(idx) {
    if (drugs.length > 2) setDrugs(drugs.filter((_, i) => i !== idx))
  }
  function addDrug() {
    if (drugs.length < 6) setDrugs([...drugs, ''])
  }
  function quickAdd(name) {
    const empty = drugs.findIndex((d) => !d.trim())
    if (empty !== -1) updateDrug(empty, name)
    else if (drugs.length < 6) setDrugs([...drugs, name])
  }

  function handleCheck() {
    setError(''); setResult(null)
    const filled = drugs.map((d) => d.trim()).filter(Boolean)
    if (filled.length < 2) { setError('Please enter at least 2 drug names.'); return }
    setLoading(true)
    // Simulate async call (replace with real API later)
    setTimeout(() => {
      setLoading(false)
      const found = []
      for (let i = 0; i < filled.length; i++) {
        for (let j = i + 1; j < filled.length; j++) {
          const key = normKey(filled[i], filled[j])
          if (INTERACTIONS[key]) {
            found.push({ pair: `${filled[i]} + ${filled[j]}`, ...INTERACTIONS[key] })
          }
        }
      }
      setResult(found.length ? { type: 'found', items: found } : { type: 'none' })
    }, 1300)
  }

  return (
    <PageWrapper>
      <div className="flex-1 p-5 overflow-auto min-w-0">
        <PageHeader
          icon="💊"
          title="Drug Interaction Checker"
          subtitle="Enter two or more medications to check for potential interactions"
        />

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 max-w-4xl mx-auto">

          {/* ── Input card ── */}
          <Card>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-bold text-slate-800">Enter Drug Names</h2>
              <span className="text-xs text-slate-400">{drugs.length} / 6 drugs</span>
            </div>

            {/* Drug inputs */}
            {drugs.map((d, i) => (
              <div key={i} className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center
                  text-[12px] font-bold shrink-0">
                  {i + 1}
                </div>
                <Input
                  value={d}
                  onChange={(e) => { updateDrug(i, e.target.value); setResult(null) }}
                  placeholder={`Drug ${i + 1} (e.g. ${SUGGESTIONS[i % SUGGESTIONS.length]})`}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                />
                {drugs.length > 2 && (
                  <button
                    onClick={() => removeDrug(i)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400
                      hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 text-lg"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {/* Quick add tags */}
            <div className="mb-5 mt-1">
              <p className="text-[11px] text-slate-400 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => quickAdd(s)}
                    className="px-3 py-1 bg-sky-light text-blue-700 rounded-full text-[12px]
                      font-medium hover:bg-blue-200 transition-colors border border-transparent
                      hover:border-blue-300"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-3"
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex gap-3">
              {drugs.length < 6 && (
                <button
                  onClick={addDrug}
                  className="px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm
                    font-medium text-slate-500 hover:border-blue-400 hover:text-blue-600
                    hover:bg-blue-50 transition-all whitespace-nowrap"
                >
                  + Add Drug
                </button>
              )}
              <PrimaryButton onClick={handleCheck} disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⚙️
                    </motion.span>
                    Checking...
                  </>
                ) : (
                  '🔍 Check Interactions'
                )}
              </PrimaryButton>
            </div>
          </Card>

          {/* ── Sidebar tips ── */}
          <div className="space-y-4">
            <Card padding="p-5">
              <h3 className="font-bold text-slate-800 mb-3">💡 How to Use</h3>
              <ol className="space-y-2 text-sm text-slate-600 leading-relaxed list-decimal list-inside">
                <li>Type drug names in the fields (use generic names for best results)</li>
                <li>Use quick-add tags for common medicines</li>
                <li>Click <strong>Check Interactions</strong> to see results</li>
                <li>Review risk levels and recommendations</li>
              </ol>
            </Card>
            <Card padding="p-5">
              <h3 className="font-bold text-slate-800 mb-3">⚠️ Disclaimer</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                This tool provides educational information only. Always consult your doctor
                or pharmacist before making any medication changes.
              </p>
            </Card>
            <Card padding="p-5">
              <h3 className="font-bold text-slate-800 mb-2">🧪 Try These Examples</h3>
              {[['Warfarin', 'Aspirin'], ['Atorvastatin', 'Clarithromycin'], ['Paracetamol', 'Ibuprofen']].map(([a, b]) => (
                <button
                  key={a}
                  onClick={() => { setDrugs([a, b, ...drugs.slice(2)]); setResult(null) }}
                  className="w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1.5
                    border-b border-slate-100 last:border-0 transition-colors"
                >
                  {a} + {b} →
                </button>
              ))}
            </Card>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="max-w-2xl mx-auto mt-6">
          <AnimatePresence>
            {result?.type === 'none' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-10 text-center"
              >
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-emerald-700 mb-2">No Known Interactions Found</h3>
                <p className="text-emerald-600 text-sm mb-1">
                  No significant interactions found between your medications in our database.
                </p>
                <p className="text-slate-500 text-xs">
                  This doesn't guarantee safety — always verify with your doctor or pharmacist.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result?.type === 'found' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-base font-bold text-slate-700 mb-3">
                  {result.items.length} Interaction{result.items.length > 1 ? 's' : ''} Found
                </h3>
                {result.items.map((item, i) => (
                  <InteractionResult key={i} item={item} />
                ))}
                <DisclaimerNote>
                  ⚕️ Always consult your doctor or pharmacist before making any medication changes.
                </DisclaimerNote>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  )
}
