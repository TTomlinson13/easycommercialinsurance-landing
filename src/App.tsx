function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-indigo-900 text-white text-sm py-2 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span>🏢 Florida Commercial Insurance Specialists</span>
          <a href="tel:800-616-1418" className="hover:text-indigo-200">📞 800-616-1418</a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Easy<span className="text-indigo-600">Commercial</span>Insurance</h1>
            <p className="text-xs text-slate-500">Business Coverage Made Simple</p>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#coverage" className="text-slate-600 hover:text-indigo-600">Coverage</a>
            <a href="#industries" className="text-slate-600 hover:text-indigo-600">Industries</a>
            <a href="#why-us" className="text-slate-600 hover:text-indigo-600">Why Us</a>
          </nav>
          <a href="https://app.usecanopy.com/c/tomlinson-and-co" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition">
            Get a Quote →
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 py-16 md:py-24 px-4 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-indigo-300 font-semibold mb-2 uppercase tracking-wider">Commercial Insurance</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              All Your Business Insurance — One Easy Place
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              From general liability to workers comp, commercial auto to BOPs — we shop multiple 
              A-rated carriers to find the best coverage at the best price for your Florida business.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://app.usecanopy.com/c/tomlinson-and-co" target="_blank" rel="noopener noreferrer" className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold text-lg transition hover:bg-indigo-50 shadow-lg">
                Start Your Quote →
              </a>
              <a href="tel:800-616-1418" className="bg-indigo-700 hover:bg-indigo-600 border-2 border-indigo-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition">
                📞 800-616-1418
              </a>
            </div>
            <p className="text-sm text-indigo-300 mt-4">✓ Quotes in minutes ✓ A-rated carriers ✓ Licensed since 1966</p>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">🏢</div>
              <h3 className="font-bold">Business Owners Policy</h3>
              <p className="text-sm text-indigo-200">GL + Property bundled</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="font-bold">General Liability</h3>
              <p className="text-sm text-indigo-200">Protect against claims</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">👷</div>
              <h3 className="font-bold">Workers Comp</h3>
              <p className="text-sm text-indigo-200">Employee protection</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
              <div className="text-3xl mb-2">🚛</div>
              <h3 className="font-bold">Commercial Auto</h3>
              <p className="text-sm text-indigo-200">Fleet coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section id="coverage" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-4">Commercial Insurance Products</h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Whatever your business needs, we have you covered with competitive rates from top carriers.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Business Owners Policy (BOP)</h4>
              <p className="text-slate-600 mb-4">Bundle general liability and property insurance into one affordable policy. Perfect for small to mid-sized businesses.</p>
              <a href="https://buyabop.com" className="text-indigo-600 font-semibold hover:underline">Learn more →</a>
            </div>
            
            <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚖️</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">General Liability</h4>
              <p className="text-slate-600 mb-4">Protection against third-party bodily injury, property damage, and advertising injury claims.</p>
              <a href="https://app.usecanopy.com/c/tomlinson-and-co" className="text-indigo-600 font-semibold hover:underline">Get a quote →</a>
            </div>
            
            <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition">
              <div className="text-4xl mb-4">👷</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Workers Compensation</h4>
              <p className="text-slate-600 mb-4">Required coverage for employee injuries. We find competitive rates even for high-risk industries.</p>
              <a href="https://app.usecanopy.com/c/tomlinson-and-co" className="text-indigo-600 font-semibold hover:underline">Get a quote →</a>
            </div>
            
            <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚛</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Commercial Auto</h4>
              <p className="text-slate-600 mb-4">Coverage for business vehicles, from single trucks to entire fleets. Hired and non-owned auto available.</p>
              <a href="https://app.usecanopy.com/c/tomlinson-and-co" className="text-indigo-600 font-semibold hover:underline">Get a quote →</a>
            </div>
            
            <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏗️</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Contractors Insurance</h4>
              <p className="text-slate-600 mb-4">Specialized coverage for GCs, roofers, electricians, plumbers, and all trades. Bonds available.</p>
              <a href="https://app.usecanopy.com/c/tomlinson-and-co" className="text-indigo-600 font-semibold hover:underline">Get a quote →</a>
            </div>
            
            <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏬</div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Commercial Property</h4>
              <p className="text-slate-600 mb-4">Protect your building, equipment, inventory, and business personal property from loss or damage.</p>
              <a href="https://app.usecanopy.com/c/tomlinson-and-co" className="text-indigo-600 font-semibold hover:underline">Get a quote →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-4">Industries We Serve</h3>
          <p className="text-center text-slate-600 mb-12">Coverage for 300+ business classes across Florida</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { icon: '🏪', name: 'Retail' },
              { icon: '🍽️', name: 'Restaurants' },
              { icon: '🔨', name: 'Contractors' },
              { icon: '💈', name: 'Salons' },
              { icon: '🏥', name: 'Medical' },
              { icon: '📊', name: 'Consultants' },
              { icon: '🏢', name: 'Offices' },
              { icon: '🚚', name: 'Trucking' },
              { icon: '🧹', name: 'Cleaning' },
              { icon: '📸', name: 'Photography' },
              { icon: '🏋️', name: 'Fitness' },
              { icon: '🖥️', name: 'Tech' },
            ].map((item) => (
              <div key={item.name} className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-sm font-medium text-slate-700">{item.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-6">...and many more. If you run a business, we can insure it.</p>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-16 px-4 bg-indigo-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Easy Commercial Insurance?</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="font-bold text-lg">Fast Quotes</h4>
              <p className="text-indigo-200 mt-2">Get quotes in minutes, not days</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h4 className="font-bold text-lg">A-Rated Carriers</h4>
              <p className="text-indigo-200 mt-2">Top-rated insurers only</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h4 className="font-bold text-lg">Since 1966</h4>
              <p className="text-indigo-200 mt-2">Nearly 60 years in Florida</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💬</div>
              <h4 className="font-bold text-lg">Real Agents</h4>
              <p className="text-indigo-200 mt-2">Talk to humans, not bots</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Protect Your Business?</h3>
          <p className="text-xl text-indigo-100 mb-8">
            Get your free commercial insurance quote in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://app.usecanopy.com/c/tomlinson-and-co" target="_blank" rel="noopener noreferrer" className="bg-white text-indigo-700 font-bold text-xl py-4 px-8 rounded-lg shadow-lg hover:bg-slate-100 transition">
              Start Your Quote →
            </a>
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
          <p className="text-sm">A Tomlinson & Co Agency • Florida Licensed Since 1966</p>
          <p className="text-xs mt-4">© {new Date().getFullYear()} Tomlinson & Co Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
