import { ArrowRight, Zap, Shield, Repeat } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section (SRS 3.1) */}
      <section className="text-center py-20 bg-gradient-to-b from-blue-900/20 to-transparent rounded-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          UPGRADE YOUR <span className="text-blue-500">GADGET</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
          Explore the latest smartphones, high-performance laptops, and premium accessories with advanced spec-based filtering.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/products" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold flex items-center gap-2">
            Shop Now <ArrowRight size={20} />
          </Link>
          <Link href="/compare" className="border border-slate-700 hover:bg-slate-800 px-8 py-3 rounded-full font-bold">
            Compare Products
          </Link>
        </div>
      </section>

      {/* Quick Features (SRS Objective) */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="tech-card p-8 text-center space-y-4">
          <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-500">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-bold">Fast Performance</h3>
          <p className="text-slate-400">Optimized for high-speed browsing and instant filtering.</p>
        </div>
        <div className="tech-card p-8 text-center space-y-4">
          <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-500">
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold">Secure Shopping</h3>
          <p className="text-slate-400">JWT protected accounts and secure checkout process.</p>
        </div>
        <div className="tech-card p-8 text-center space-y-4">
          <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-500">
            <Repeat size={32} />
          </div>
          <h3 className="text-xl font-bold">Tech Comparison</h3>
          <p className="text-slate-400">Detailed side-by-side specs for smarter buying decisions.</p>
        </div>
      </section>
    </div>
  );
}
