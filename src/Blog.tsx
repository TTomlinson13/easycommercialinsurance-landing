import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Post {
  id: number
  slug: string
  title: string
  date: string
  summary: string
  body: string
  tags: string[]
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/blog/posts.json')
      .then(r => r.json())
      .then((data: Post[]) => {
        const sorted = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
            <Link to="/" className="text-2xl font-bold text-slate-800 hover:text-indigo-700 transition">
              Easy<span className="text-indigo-600">Commercial</span>Insurance
            </Link>
            <p className="text-xs text-slate-500">Business Coverage Made Simple</p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="sm:inline text-indigo-600 font-semibold hover:text-indigo-800 transition text-sm">Blog</Link>
            <a href="tel:800-616-1418" className="sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition">
              📞 800-616-1418
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-indigo-900 py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-300 font-semibold uppercase tracking-wider mb-2 text-sm">Florida Business Insurance Insights</p>
          <h1 className="text-4xl font-bold text-white mb-3">The EasyCommercial Blog</h1>
          <p className="text-indigo-100 text-lg">Expert guidance on commercial insurance for Florida small business owners — BOPs, liability, workers' comp, and more.</p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-20">Loading posts…</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">No posts found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <article key={post.id} className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{post.title}</h2>
                    <p className="text-gray-500 text-xs mb-3">{new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-gray-600 text-sm flex-1 mb-5">{post.summary}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2 px-5 rounded-lg transition self-start"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-yellow-400 py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">Ready to Protect Your Florida Business?</h2>
          <p className="text-indigo-800 mb-5">We shop multiple A-rated carriers to find the best commercial coverage at the best price. Call or get a quote — it's free.</p>
          <a href="tel:800-616-1418" className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition">📞 Call 800-616-1418</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg text-white mb-2">Business Coverage Made Simple</p>
          <p className="text-sm">EasyCommercialInsurance.com • Florida Commercial Insurance Specialists<br/>A Tomlinson &amp; Co Agency</p>
          <p className="text-xs mt-4">© {new Date().getFullYear()} Tomlinson &amp; Co Inc. All rights reserved.</p>
          <p className="text-xs mt-2">
            <Link to="/" className="text-gray-400 hover:text-white underline mr-4">Home</Link>
            <Link to="/blog" className="text-gray-400 hover:text-white underline mr-4">Blog</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
