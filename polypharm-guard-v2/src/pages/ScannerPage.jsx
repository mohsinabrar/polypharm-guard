import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { riskMeta } from '../data/helpers'
import { PageWrapper, PageHeader, Card, PrimaryButton } from '../components/UI'

/* Simulated scan result */
const MOCK_RESULT = {
  patient: 'Patient (Age 68)',
  doctor: 'Dr. S. Sharma',
  drugs: [
    { name: 'Metformin 500 mg', status: 'Identified' },
    { name: 'Atorvastatin 20 mg', status: 'Identified' },
    { name: 'Amlodipine 5 mg', status: 'Identified' },
  ],
  interactions: [
    {
      pair: 'Atorvastatin + Amlodipine',
      risk: 'Moderate',
      msg: 'Amlodipine may increase atorvastatin levels. Monitor for muscle pain or weakness.',
    },
  ],
}

export default function ScannerPage() {
  const [file, setFile]         = useState(null)
  const [preview, setPreview]   = useState(null)
  const [drag, setDrag]         = useState(false)
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult]     = useState(null)
  const inputRef = useRef()

  function handleFile(f) {
    if (!f) return
    setFile(f); setResult(null); setProgress(0)
    if (f.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(f)
    } else {
      setPreview(null)
    }
  }

  function scan() {
    setScanning(true); setResult(null); setProgress(0)
    // Simulate incremental progress
    let p = 0
    const timer = setInterval(() => {
      p += Math.random() * 18
      if (p >= 100) { p = 100; clearInterval(timer) }
      setProgress(Math.min(Math.round(p), 100))
    }, 180)
    setTimeout(() => {
      setScanning(false)
      setResult({ ...MOCK_RESULT, date: new Date().toLocaleDateString('en-IN') })
    }, 2800)
  }

  const m = result?.interactions?.[0] ? riskMeta(result.interactions[0].risk) : null

  return (
    <PageWrapper>
      <div className="flex-1 p-5 overflow-auto min-w-0">
        <PageHeader
          icon="📋"
          title="Prescription Scanner"
          subtitle="Upload your prescription image or PDF to automatically detect medications and check interactions"
        />

        <div className="max-w-xl mx-auto space-y-4">
          {/* Upload zone */}
          <div
            onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]) }}
            onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
            onDragLeave={() => setDrag(false)}
            onClick={() => !file && inputRef.current.click()}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200
              ${drag ? 'border-blue-400 bg-blue-50' : file ? 'border-slate-200 cursor-default' : 'border-slate-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50'}`}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {!file ? (
              <>
                <div className="text-5xl mb-4">📁</div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">Drop your prescription here</h3>
                <p className="text-slate-400 text-sm mb-6">Supports JPG, PNG, PDF formats</p>
                <button
                  onClick={(e) => { e.stopPropagation(); inputRef.current.click() }}
                  className="bg-navy text-white font-semibold px-7 py-3 rounded-xl
                    hover:bg-navy-mid transition-all text-sm"
                >
                  📤 Choose File
                </button>
              </>
            ) : (
              <div className="w-full">
                {preview ? (
                  <img
                    src={preview}
                    alt="prescription preview"
                    className="max-h-48 mx-auto mb-4 rounded-xl object-contain shadow-sm"
                  />
                ) : (
                  <div className="bg-sky-light rounded-xl p-6 mb-4 text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-blue-700 font-semibold text-sm">{file.name}</p>
                    <p className="text-slate-400 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null) }}
                    className="px-4 py-2.5 border-[1.5px] border-slate-200 rounded-xl text-sm font-medium
                      text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    Remove
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); scan() }}
                    disabled={scanning}
                    className="flex-1 bg-navy text-white font-semibold py-2.5 rounded-xl text-sm
                      hover:bg-navy-mid transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {scanning ? '🔄 Scanning...' : '🔍 Scan & Analyze'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Scanning progress */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="text-center">
                  <div className="text-4xl mb-3 animate-pulse-slow">🔬</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Analyzing Prescription…</h3>
                  <p className="text-slate-500 text-sm mb-4">Detecting medications and checking interactions</p>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-teal-brand rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">{progress}% complete</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Card padding="p-0">
                  {/* Meta */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                      <span className="font-bold text-slate-800">Scan Complete</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[['Date', result.date], ['Doctor', result.doctor], ['Patient', result.patient]].map(([l, v]) => (
                        <div key={l} className="bg-slate-50 rounded-xl p-3 text-center">
                          <div className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">{l}</div>
                          <div className="text-[13px] font-semibold text-slate-700">{v}</div>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold text-slate-700 text-sm mb-3">
                      Detected Medications ({result.drugs.length})
                    </h4>
                    {result.drugs.map((d, i) => (
                      <div key={i} className="flex items-center gap-3 bg-sky-light rounded-xl px-4 py-3 mb-2">
                        <span>💊</span>
                        <span className="flex-1 font-medium text-slate-800 text-sm">{d.name}</span>
                        <span className="text-emerald-600 text-xs font-semibold">✓ {d.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactions */}
                  {result.interactions.length > 0 && (
                    <div className="p-6">
                      <h4 className="font-bold text-slate-800 mb-3">Interactions Found</h4>
                      {result.interactions.map((it, i) => {
                        const rm = riskMeta(it.risk)
                        return (
                          <div key={i} className={rm.card}>
                            <span className={rm.badge}><span className={rm.dot}/>{it.risk} Risk</span>
                            <div className="font-bold text-slate-800 text-base mt-2 mb-1">{it.pair}</div>
                            <p className={rm.msg + ' text-sm'}>{it.msg}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </Card>

                <div className="bg-sky-light border border-blue-200 rounded-xl p-4 text-blue-800 text-sm text-center">
                  ⚕️ Share this report with your doctor or pharmacist for professional guidance.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips */}
          {!file && (
            <Card padding="p-5">
              <h3 className="font-bold text-slate-800 mb-3 text-sm">📌 Tips for Best Results</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {[
                  'Ensure the image is well-lit and in focus',
                  'Capture the full prescription including drug names',
                  'PDF format from e-pharmacy works best',
                  'Handwritten prescriptions may have lower accuracy',
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2"><span className="text-blue-400">•</span>{tip}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
