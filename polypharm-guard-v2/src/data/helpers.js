/**
 * Normalizes two drug names into a consistent lookup key.
 * Sorts alphabetically, lowercases, trims, and joins with "+".
 * Example: normKey("Warfarin", "Aspirin") => "aspirin+warfarin"
 */
export function normKey(d1, d2) {
  return [d1.toLowerCase().trim(), d2.toLowerCase().trim()].sort().join('+')
}

/**
 * Returns Tailwind class sets for a given risk level.
 */
export function riskMeta(risk) {
  const map = {
    High: {
      badge:   'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200',
      dot:     'w-2 h-2 rounded-full bg-red-500',
      card:    'rounded-2xl border-2 border-red-300 bg-red-50 p-6',
      heading: 'text-red-800 font-bold text-lg mt-2 mb-1',
      msg:     'text-red-700 font-semibold text-sm mb-2',
      icon:    '⚠️',
    },
    Moderate: {
      badge:   'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200',
      dot:     'w-2 h-2 rounded-full bg-amber-400',
      card:    'rounded-2xl border-2 border-amber-300 bg-amber-50 p-6',
      heading: 'text-amber-900 font-bold text-lg mt-2 mb-1',
      msg:     'text-amber-700 font-semibold text-sm mb-2',
      icon:    '⚡',
    },
    Safe: {
      badge:   'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200',
      dot:     'w-2 h-2 rounded-full bg-emerald-500',
      card:    'rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6',
      heading: 'text-emerald-900 font-bold text-lg mt-2 mb-1',
      msg:     'text-emerald-700 font-semibold text-sm mb-2',
      icon:    '✅',
    },
  }
  return map[risk] || map.Safe
}
