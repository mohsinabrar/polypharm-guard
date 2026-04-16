import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ARTICLES, FAQS, SAFETY_TIPS } from '../data/drugData'
import { PageWrapper, PageHeader, Stagger, StaggerItem } from '../components/UI'

/* ── Tag color map ─────────────────────────────────────── */
const TAG_STYLE = {
  Education: 'bg-blue-50 text-blue-700',
  Safety:    'bg-red-50 text-red-700',
  Tips:      'bg-emerald-50 text-emerald-700',
  Advice:    'bg-violet-50 text-violet-700',
}

/* ── Article Card ──────────────────────────────────────── */
function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-hover
      hover:-translate-y-1 active:translate-y-0 transition-all duration-250 cursor-pointer flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${TAG_STYLE[article.tag] || TAG_STYLE.Education}`}>
          {article.tag}
        </span>
        <span className="text-slate-400 text-[11.5px]">{article.time}</span>
      </div>
      <h3 className="font-bold text-slate-800 text-[15px] mb-2 leading-snug">{article.title}</h3>
      <p className="text-slate-500 text-[13px] leading-relaxed flex-1">{article.summary}</p>
      <button className="text-blue-500 text-[13px] font-semibold mt-3 text-left hover:text-navy transition-colors">
        Read More →
      </button>
    </div>
  )
}

/* ── FAQ Accordion ─────────────────────────────────────── */
function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-2.5">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-6 py-5 flex justify-between items-center gap-4
              hover:bg-slate-50 transition-colors"
          >
            <span className="font-semibold text-slate-800 text-[15px] leading-snug">{faq.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-blue-400 text-2xl font-light shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-slate-600
                  text-[14px] leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ── Safety Tips Grid ──────────────────────────────────── */
function SafetyTips({ tips }) {
  return (
    <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tips.map((tip, i) => (
        <StaggerItem key={i}>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3
            hover:border-emerald-300 hover:shadow-card transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[13px]
              flex items-center justify-center shrink-0 border border-emerald-200">
              {i + 1}
            </div>
            <p className="text-slate-700 text-[13.5px] leading-relaxed">{tip}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

/* ── Main Page ─────────────────────────────────────────── */
const TABS = [
  { key: 'articles', label: '📰 Articles' },
  { key: 'faqs',     label: '❓ FAQs'     },
  { key: 'tips',     label: '💡 Safety Tips' },
]

export default function ResourcesPage() {
  const [tab, setTab] = useState('articles')

  return (
    <PageWrapper>
      <div className="flex-1 p-5 overflow-auto min-w-0">
        <PageHeader
          icon="📚"
          title="Resources"
          subtitle="Articles, FAQs, and safety tips for smarter medication management"
        />

        {/* Tab switcher */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex bg-white rounded-2xl p-1.5 border border-slate-200 shadow-card">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  tab === key ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === key && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-navy rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content with animation */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tab === 'articles' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ARTICLES.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <ArticleCard article={a} />
                    </motion.div>
                  ))}
                </div>
              )}

              {tab === 'faqs' && <FAQAccordion faqs={FAQS} />}

              {tab === 'tips' && <SafetyTips tips={SAFETY_TIPS} />}
            </motion.div>
          </AnimatePresence>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-br from-navy to-navy-mid rounded-3xl p-8 text-center"
          >
            <h3 className="font-serif text-2xl text-white mb-2">Stay Updated</h3>
            <p className="text-white/60 text-sm mb-6 max-w-sm mx-auto">
              Get the latest medication safety tips and drug information updates delivered to your inbox.
            </p>
            <div className="flex max-w-sm mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-sm text-slate-800 outline-none
                  focus:ring-2 focus:ring-blue-300 border border-white/10"
              />
              <button className="bg-white text-navy font-semibold px-5 py-3 rounded-xl text-sm
                hover:bg-navy-light transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <div className="mt-6 bg-sky-light border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-blue-800 text-[13px]">
              <strong>⚕️ Medical Disclaimer:</strong> All content is for educational purposes only and is not a
              substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified
              healthcare provider before making any medication changes.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
