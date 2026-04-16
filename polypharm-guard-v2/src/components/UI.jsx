import { motion } from 'framer-motion'
import { riskMeta } from '../data/helpers'

/* ── Page transition wrapper ───────────────────────────── */
export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Page header ────────────────────────────────────────── */
export function PageHeader({ icon, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <div className="text-5xl mb-3">{icon}</div>
      <h1 className="font-serif text-3xl font-semibold text-navy mb-2">{title}</h1>
      {subtitle && <p className="text-slate-500 text-base max-w-xl mx-auto">{subtitle}</p>}
    </div>
  )
}

/* ── Card ───────────────────────────────────────────────── */
export function Card({ children, className = '', padding = 'p-7' }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-card ${padding} ${className}`}>
      {children}
    </div>
  )
}

/* ── Primary button ─────────────────────────────────────── */
export function PrimaryButton({ children, onClick, disabled, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 bg-navy text-white font-semibold
        text-[15px] py-3.5 rounded-xl hover:bg-navy-mid hover:-translate-y-px
        hover:shadow-cta active:translate-y-0 transition-all duration-200
        disabled:opacity-60 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  )
}

/* ── Outline button ─────────────────────────────────────── */
export function OutlineButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 border-1.5 border-slate-200 rounded-xl text-sm font-medium
        text-slate-600 hover:border-navy hover:text-navy hover:bg-sky-light
        transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  )
}

/* ── Input ──────────────────────────────────────────────── */
export function Input({ value, onChange, placeholder, onKeyDown, type = 'text', className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={`w-full px-4 py-3.5 border-[1.5px] border-slate-200 rounded-xl text-[15px]
        text-slate-800 placeholder-slate-400 bg-white outline-none
        focus:border-sky-brand focus:ring-3 focus:ring-sky-brand/10
        transition-all duration-200 ${className}`}
    />
  )
}

/* ── Risk Badge ─────────────────────────────────────────── */
export function RiskBadge({ risk }) {
  const m = riskMeta(risk)
  return (
    <span className={m.badge}>
      <span className={m.dot} />
      {m.icon} {risk} Risk
    </span>
  )
}

/* ── Section header row ─────────────────────────────────── */
export function SectionHead({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      {action}
    </div>
  )
}

/* ── Disclaimer box ─────────────────────────────────────── */
export function DisclaimerNote({ children }) {
  return (
    <div className="bg-sky-light border border-blue-200 rounded-xl p-4 text-center text-blue-800 text-sm mt-4">
      {children}
    </div>
  )
}

/* ── Animated stagger container ─────────────────────────── */
export function Stagger({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger item ────────────────────────────────────────── */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}
