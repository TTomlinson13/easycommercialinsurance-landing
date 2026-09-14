import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const JOTFORM_ID = '261482212909053'
const CANOPY_URL = 'https://app.usecanopy.com/c/tomlinson-and-co'

function JotformModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold shadow transition"
        aria-label="Close"
      >×</button>
      <iframe
        src={`https://form.jotform.com/${JOTFORM_ID}`}
        title="Contractor Insurance Quote"
        allow="geolocation; microphone; camera"
        allowFullScreen
        style={{ width: '100%', height: '80vh', border: 'none', display: 'block', background: '#fff' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Contract requirements checker                                       */
/* ------------------------------------------------------------------ */

type Status = 'ok' | 'add'

interface CheckItem {
  label: string
  status: Status
  tag: string
  note: string
}

const SAMPLE =
  "Subcontractor shall procure and maintain Commercial General Liability insurance with limits of not " +
  "less than $1,000,000 per occurrence and $2,000,000 general aggregate. The General Contractor and Owner " +
  "shall be named as Additional Insureds on a primary and non-contributory basis. Coverage shall include a " +
  "Waiver of Subrogation in favor of the General Contractor. Contractor shall carry Business Automobile " +
  "Liability of $1,000,000 combined single limit, and Umbrella/Excess Liability of not less than $5,000,000. " +
  "Workers' Compensation as required by statute with Employers' Liability limits of $1,000,000. A Certificate " +
  "of Insurance evidencing the above, with thirty (30) days' written notice of cancellation, must be provided " +
  "prior to commencing work."

interface Rule {
  re: RegExp
  build: (t: string) => CheckItem
}

function largestDollar(t: string): string | null {
  const m = t.match(/\$\s?[\d]{1,3}(?:,\d{3})+/)
  return m ? m[0].replace(/\s/g, '') : null
}

const RULES: Rule[] = [
  {
    re: /general liability|\bCGL\b/i,
    build: () => ({ label: 'General Liability', status: 'ok', tag: 'Covered',
      note: 'Your program carries GL at $1M / $2M — meets the required limits.' }),
  },
  {
    re: /additional insured/i,
    build: () => ({ label: 'Additional Insured', status: 'add', tag: "We'll add",
      note: 'We endorse the GC and Owner onto your policy and show it on the certificate.' }),
  },
  {
    re: /primary and non[- ]?contributory|primary & non/i,
    build: () => ({ label: 'Primary & Non-Contributory', status: 'add', tag: "We'll endorse",
      note: 'Added by endorsement so your coverage responds first, as the contract requires.' }),
  },
  {
    re: /waiver of subrogation/i,
    build: () => ({ label: 'Waiver of Subrogation', status: 'add', tag: "We'll endorse",
      note: 'Waiver in favor of the GC endorsed onto GL (and workers comp where required).' }),
  },
  {
    re: /auto(mobile)? liability|business auto/i,
    build: () => ({ label: 'Commercial Auto Liability', status: 'ok', tag: 'Covered',
      note: 'Business Auto at $1M CSL already in force — meets requirement.' }),
  },
  {
    re: /umbrella|excess liability/i,
    build: (t) => {
      const seg = t.slice(t.search(/umbrella|excess/i))
      const amt = largestDollar(seg) || '$5,000,000'
      return { label: 'Umbrella / Excess Liability', status: 'add', tag: "We'll add",
        note: `No umbrella currently in force — we'll quote a ${amt} layer to satisfy this.` }
    },
  },
  {
    re: /workers?.{0,3}comp|employers?.{0,3}liab/i,
    build: () => ({ label: "Workers' Compensation", status: 'ok', tag: 'Covered',
      note: 'Statutory WC with Employers Liability in force — confirms on the certificate.' }),
  },
  {
    re: /certificate of insurance|notice of cancellation|days.{0,12}(notice|cancellation)/i,
    build: () => ({ label: 'Certificate + Notice of Cancellation', status: 'add', tag: 'Same day',
      note: 'We issue the ACORD 25 with the required cancellation-notice language before work starts.' }),
  },
]

function parse(text: string): CheckItem[] {
  if (text.trim().length < 12) return []
  return RULES.filter((r) => r.re.test(text)).map((r) => r.build(text))
}

function ContractChecker({ onQuote }: { onQuote: () => void }) {
  const [text, setText] = useState(SAMPLE)
  const [items, setItems] = useState<CheckItem[]>(() => parse(SAMPLE))
  const [ran, setRan] = useState(true)

  const covered = items.filter((i) => i.status === 'ok').length
  const toAdd = items.length - covered

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* input */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <span className="text-lg">📋</span>
          <span className="text-sm font-semibold text-slate-700">Paste the contract's insurance requirements</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label="Paste contract insurance requirements"
          className="w-full min-h-[240px] p-4 text-sm text-slate-700 font-mono resize-y outline-none focus:bg-indigo-50/30"
        />
        <div className="px-5 py-4 border-t border-slate-100 flex flex-wrap gap-3 items-center">
          <button
            onClick={() => { setItems(parse(text)); setRan(true) }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition"
          >
            Check my coverage
          </button>
          <button
            onClick={() => { setText(SAMPLE); setItems(parse(SAMPLE)); setRan(true) }}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            Load a sample clause
          </button>
          <span className="ml-auto text-xs text-slate-400">Runs in your browser — nothing is sent.</span>
        </div>
      </div>

      {/* output */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <span className="text-lg">✅</span>
          <span className="text-sm font-semibold text-slate-700">Your checklist for this job</span>
        </div>

        {!ran || items.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            {text.trim().length < 12
              ? 'Paste a requirements paragraph, then press “Check my coverage.”'
              : "We didn't spot standard insurance requirements in that text. Send it to us and we'll read it line by line."}
          </div>
        ) : (
          <>
            <div className="px-5 py-3 bg-indigo-50/60 border-b border-slate-100 text-sm text-slate-600">
              <b className="text-slate-900">{items.length}</b> requirements found ·{' '}
              <b className="text-green-600">{covered}</b> already covered ·{' '}
              <b className="text-amber-600">{toAdd}</b> we'll handle before you sign.
            </div>
            <ul className="divide-y divide-slate-100">
              {items.map((it) => (
                <li key={it.label} className="flex gap-3 px-5 py-3.5">
                  <span
                    className={`mt-0.5 flex-none w-6 h-6 rounded-full grid place-items-center text-sm font-bold ${
                      it.status === 'ok'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                    aria-hidden="true"
                  >
                    {it.status === 'ok' ? '✓' : '+'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">{it.label}</span>
                      <span
                        className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full ${
                          it.status === 'ok'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{it.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-5 py-4 border-t border-slate-100 flex flex-wrap gap-3 items-center">
              <button
                onClick={onQuote}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-lg font-bold text-sm transition"
              >
                Get these endorsements — start a quote →
              </button>
              <span className="text-xs text-slate-400">Illustrative — final terms subject to your policy.</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const TRADES = [
  { icon: '❄️', name: 'HVAC / A/C' },
  { icon: '🔧', name: 'Plumbing' },
  { icon: '⚡', name: 'Electrical' },
  { icon: '🏠', name: 'Roofing' },
  { icon: '🔨', name: 'General Contractors' },
  { icon: '🌳', name: 'Landscaping' },
  { icon: '🎨', name: 'Painting' },
  { icon: '🧱', name: 'Masonry & Concrete' },
]

export default function Contractors() {
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [showJotform, setShowJotform] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-indigo-900 text-white text-sm py-2 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span>🏗️ Contractor insurance &amp; same-day certificates for Florida trades.</span>
          <a href="tel:800-616-1418" className="hover:text-indigo-200">📞 800-616-1418</a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold text-slate-800 truncate">Easy<span className="text-indigo-600">Commercial</span><span className="sm:inline">Insurance</span></h1>
            <p className="text-xs text-slate-500 sm:block">Business Coverage Made Simple</p>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="text-slate-600 hover:text-indigo-600">Home</Link>
            <a href="#checker" className="text-slate-600 hover:text-indigo-600">Contract Checker</a>
            <a href="#trades" className="text-slate-600 hover:text-indigo-600">Trades</a>
            <Link to="/blog" className="text-indigo-600 font-semibold hover:text-indigo-800">Blog</Link>
          </nav>
          <div className="relative">
            <button onClick={() => setShowNavMenu(!showNavMenu)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition">
              Get a Quote {showNavMenu ? '▲' : '▼'}
            </button>
            {showNavMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-indigo-100 overflow-hidden" style={{ zIndex: 9999 }}>
                <a href={CANOPY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition border-b border-gray-100" onClick={() => setShowNavMenu(false)}>
                  <span className="text-xl">⚡</span><div className="text-left"><div className="font-bold text-indigo-900 text-sm">Quick Quote</div><div className="text-xs text-gray-500">2 mins • Auto-fill</div></div>
                </a>
                <button className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition border-b border-gray-100 w-full text-left" onClick={() => { setShowNavMenu(false); setShowJotform(true) }}>
                  <span className="text-xl">📝</span><div className="text-left"><div className="font-bold text-indigo-900 text-sm">Full Quote Form</div><div className="text-xs text-gray-500">Conversational • 2 min</div></div>
                </button>
                <a href="tel:800-616-1418" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition" onClick={() => setShowNavMenu(false)}>
                  <span className="text-xl">📞</span><div className="text-left"><div className="font-bold text-indigo-900 text-sm">Call Us</div><div className="text-xs text-gray-500">800-616-1418</div></div>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-indigo-900 text-white py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-indigo-300 font-semibold mb-2 uppercase tracking-wider">Contractor Insurance</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Win the job. We handle the paperwork that gets you on site.
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              The GC needs a certificate before your crew can start. We issue it the same day — and make
              sure your coverage actually matches what the contract demands.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#checker" className="bg-yellow-400 hover:bg-yellow-300 text-black px-7 py-4 rounded-xl font-bold text-base transition shadow-lg text-center">
                <span className="block text-xl mb-0.5">📋</span>
                Check a contract
                <span className="block text-xs font-normal opacity-75">Paste it • get a checklist</span>
              </a>
              <a href={CANOPY_URL} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-indigo-50 text-indigo-800 px-7 py-4 rounded-xl font-bold text-base transition shadow-lg text-center">
                <span className="block text-xl mb-0.5">⚡</span>
                Quick Quote
                <span className="block text-xs font-normal opacity-60">2 mins • Auto-fill</span>
              </a>
              <a href="tel:800-616-1418" className="bg-indigo-700 hover:bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-base transition shadow-lg text-center">
                <span className="block text-xl mb-0.5">📞</span>
                Call Us
                <span className="block text-xs font-normal opacity-75">800-616-1418</span>
              </a>
            </div>
            <p className="text-sm text-indigo-300 mt-6">Same-day certificates ✓ A-rated carriers ✓ Licensed since 1966</p>
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="font-bold">Same-Day COIs</h3>
              <p className="text-sm text-indigo-200">Additional insured &amp; waiver endorsed</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="font-bold">General Liability</h3>
              <p className="text-sm text-indigo-200">Limits that meet the contract</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">👷</div>
              <h3 className="font-bold">Workers Comp</h3>
              <p className="text-sm text-indigo-200">Statutory, for every trade</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-bold">Umbrella / Excess</h3>
              <p className="text-sm text-indigo-200">Extra limits when a job needs them</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contract checker */}
      <section id="checker" className="py-16 px-4 bg-slate-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-8">
            <p className="text-indigo-600 font-semibold uppercase tracking-wider text-sm mb-2">The contract decoder</p>
            <h3 className="text-3xl font-bold text-slate-800 mb-3">Paste the insurance clause. Get a checklist.</h3>
            <p className="text-slate-600">
              Every subcontract buries its insurance requirements in a wall of legalese. Drop that
              paragraph in and see what your program already covers — and what we'll add before you sign.
            </p>
          </div>
          <ContractChecker onQuote={() => setShowJotform(true)} />
        </div>
      </section>

      {/* Trades */}
      <section id="trades" className="py-16 px-4 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-4">Coverage Tuned to Your Trade</h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Every trade carries a different risk — rooftop falls, blown mains, energized panels, equipment
            left on an open site. We quote to the trade, not a generic “contractor” box.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TRADES.map((t) => (
              <div key={t.name} className="bg-white p-5 rounded-lg text-center border-2 border-slate-200 hover:border-indigo-400 hover:shadow-md transition">
                <div className="text-3xl mb-2">{t.icon}</div>
                <p className="text-sm font-semibold text-slate-700">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why / steps */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">Built Around the Job, Not the Policy</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto text-3xl">📄</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Certificates, same day</h4>
              <p className="text-slate-600">Send the holder and the requirements. Most COIs go back the same business day — additional insured, waiver, and primary &amp; non-contributory endorsed as the contract calls for.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto text-3xl">✅</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Coverage that fits the contract</h4>
              <p className="text-slate-600">Before a job stalls at “insufficient limits,” we check your program against what the GC requires — and close the gap with the right endorsement, not a whole new policy.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto text-3xl">💬</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">A real person answers</h4>
              <p className="text-slate-600">One relationship with people who know your book — certs, mid-season adds, and the odd 5 p.m. question — not a call-center queue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Bidding a job this week?</h3>
          <p className="text-xl text-indigo-100 mb-8">
            Send us the contract or just the requirements. We'll tell you today whether you're covered —
            and have the certificate ready when you win it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowJotform(true)} className="bg-white text-indigo-700 font-bold text-xl py-4 px-8 rounded-lg shadow-lg hover:bg-slate-100 transition">
              Start Your Quote →
            </button>
            <a href="tel:800-616-1418" className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xl py-4 px-8 rounded-lg shadow-lg transition">
              📞 800-616-1418
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-white font-bold text-xl mb-2">EasyCommercialInsurance.com</h4>
          <p className="text-sm mb-4">All Your Business Insurance — One Easy Place</p>
          <p className="text-sm">A Tomlinson &amp; Co Agency • Florida Licensed Since 1966</p>
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Also from Tomlinson &amp; Co</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a href="https://tomlinsonandco.com" className="text-slate-400 hover:text-white transition">Tomlinson &amp; Co (Parent Agency)</a>
              <a href="https://easycommercialauto.com" className="text-slate-400 hover:text-white transition">Commercial Auto Insurance</a>
              <a href="https://flawc.com" className="text-slate-400 hover:text-white transition">Workers Compensation</a>
              <a href="https://hoinsurance.com" className="text-slate-400 hover:text-white transition">Florida Home Insurance</a>
            </div>
          </div>
          <p className="text-xs mt-6">© {new Date().getFullYear()} Tomlinson &amp; Co Inc. All rights reserved. The contract checker is an illustrative tool and is not a binder, quote, or confirmation of coverage.</p>
        </div>
      </footer>

      {showJotform && <JotformModal onClose={() => setShowJotform(false)} />}
    </div>
  )
}
