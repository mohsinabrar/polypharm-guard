import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DRUGS } from '../data/drugData'
import { PageWrapper, PageHeader, Card, Input, Stagger, StaggerItem } from '../components/UI'

const TABS = [
  { key: 'uses',        label: '💊 Uses' },
  { key: 'dosage',      label: '📏 Dosage' },
  { key: 'sideEffects', label: '⚠️ Side Effects' },
  { key: 'warnings',    label: '🚨 Warnings' },
]

/* Drug detail view */
function DrugDetail({ drug, onBack }) {
  const [tab, setTab] = useState('uses')
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-500 hover:text-navy text-sm font-medium mb-5 transition-colors"
      >
        ← Back to Search
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-navy to-navy-mid p-8">
          <span className="inline-block bg-white/15 text-white/80 text-[11px] font-semibold
            px-3 py-1 rounded-full mb-3 tracking-wide">
            {drug.category}
          </span>
          <h2 className="text-white text-2xl font-bold mb-1">{drug.name}</h2>
          <p className="text-white/55 text-sm">Brand names: {drug.brand}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3.5 text-[13px] font-medium transition-all border-b-2 ${
                tab === t.key
                  ? 'text-navy border-navy bg-white font-semibold'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-7 text-[15px] text-slate-700 leading-relaxed"
          >
            {drug[tab]}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <div className="px-7 pb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-[13px] leading-relaxed">
            ⚕️ This information is for educational purposes only. Always follow your doctor's specific instructions for your individual situation.
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DrugInfoPage() {
  const [query, setQuery]   = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = DRUGS.filter((d) =>
    !query ||
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.brand.toLowerCase().includes(query.toLowerCase()) ||
    d.category.toLowerCase().includes(query.toLowerCase())
  )

  if (selected) {
    return (
      <PageWrapper>
        <div className="flex-1 p-5 overflow-auto min-w-0">
          <DrugDetail drug={selected} onBack={() => setSelected(null)} />
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="flex-1 p-5 overflow-auto min-w-0">
        <PageHeader
          icon="🔍"
          title="Drug Information"
          subtitle="Search detailed uses, dosage, and safety information for any medication"
        />

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or brand (Aspirin, Ecosprin, Metformin...)"
            className="pl-10"
          />
        </div>

        {/* Drug grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-slate-500 text-lg">No results for "{query}"</p>
            <p className="text-slate-400 text-sm mt-1">Try a generic or brand name</p>
          </div>
        ) : (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((drug) => (
              <StaggerItem key={drug.id}>
                <button
                  onClick={() => setSelected(drug)}
                  className="w-full text-left bg-white rounded-2xl border-[1.5px] border-slate-200
                    p-5 hover:border-blue-300 hover:shadow-hover hover:-translate-y-1
                    active:translate-y-0 transition-all duration-250"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800 text-[17px]">{drug.name}</h3>
                      <p className="text-slate-400 text-[12px] mt-0.5">{drug.brand}</p>
                    </div>
                    <span className="text-blue-400 text-lg">→</span>
                  </div>
                  <span className="inline-block bg-sky-light text-blue-700 text-[11.5px]
                    font-semibold px-3 py-0.5 rounded-full mt-3">
                    {drug.category}
                  </span>
                  <p className="text-slate-500 text-[13px] mt-2.5 leading-relaxed line-clamp-2">
                    {drug.uses}
                  </p>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </PageWrapper>
  )
}
