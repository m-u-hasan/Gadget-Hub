'use client';

import { useState, useEffect } from 'react';
import { fetchCompareList, removeFromUserList } from '@/services/api';
import { Repeat, X, ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ComparePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=compare');
    } else if (user) {
      getCompareList();
    }
  }, [user, authLoading, router]);

  const getCompareList = async () => {
    try {
      const { data } = await fetchCompareList();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromUserList('compare', id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Error removing item');
    }
  };

  if (loading) return (
    <div className="flex justify-center py-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500 border border-blue-500/20">
            <Repeat size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white">Compare Gadgets</h1>
            <p className="text-slate-400">Side-by-side technical specification comparison.</p>
          </div>
        </div>
        <Link href="/products" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Add More
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="tech-card p-20 text-center space-y-6">
          <Repeat size={64} className="mx-auto text-slate-700" />
          <h2 className="text-2xl font-bold">No gadgets to compare</h2>
          <p className="text-slate-400">Add up to 3 products from the catalog to see them side-by-side.</p>
          <Link href="/products" className="inline-block btn-primary px-8 py-3 rounded-full">
            Browse Gadgets
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 p-6 bg-slate-900/50 rounded-tl-3xl border-r border-slate-800"></th>
                {products.map((p) => (
                  <th key={p._id} className="w-1/4 p-6 bg-slate-900/50 relative group border-r border-slate-800 last:border-r-0 last:rounded-tr-3xl">
                    <button 
                      onClick={() => handleRemove(p._id)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <div className="space-y-4">
                      <div className="h-32 flex items-center justify-center">
                        <img src={p.images?.[0]} className="max-h-full object-contain" alt={p.name} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-blue-500 font-bold uppercase">{p.brand}</p>
                        <p className="font-bold text-white text-lg leading-tight line-clamp-2">{p.name}</p>
                        <p className="text-xl font-black text-white mt-2">৳{p.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => { addToCart(p); router.push('/cart'); }}
                        className="w-full btn-primary py-2 text-xs flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} /> Buy Now
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="bg-slate-900/20">
                <td className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest border-r border-slate-800">Processor</td>
                {products.map(p => <td key={p._id} className="p-6 text-center text-white font-medium border-r border-slate-800 last:border-r-0">{p.specs?.processor || '-'}</td>)}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest border-r border-slate-800">RAM</td>
                {products.map(p => <td key={p._id} className="p-6 text-center text-white font-medium border-r border-slate-800 last:border-r-0">{p.specs?.ram || '-'}</td>)}
              </tr>
              <tr className="bg-slate-900/20">
                <td className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest border-r border-slate-800">Storage</td>
                {products.map(p => <td key={p._id} className="p-6 text-center text-white font-medium border-r border-slate-800 last:border-r-0">{p.specs?.storage || '-'}</td>)}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest border-r border-slate-800">Battery</td>
                {products.map(p => <td key={p._id} className="p-6 text-center text-white font-medium border-r border-slate-800 last:border-r-0">{p.specs?.battery || '-'}</td>)}
              </tr>
              <tr className="bg-slate-900/20">
                <td className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest border-r border-slate-800 rounded-bl-3xl">Category</td>
                {products.map(p => <td key={p._id} className="p-6 text-center text-white font-medium border-r border-slate-800 last:border-r-0 last:rounded-br-3xl">{p.category}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
