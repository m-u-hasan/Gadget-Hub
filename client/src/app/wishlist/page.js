'use client';

import { useState, useEffect } from 'react';
import { fetchWishlist, removeFromUserList } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=wishlist');
    } else if (user) {
      getWishlist();
    }
  }, [user, authLoading, router]);

  const getWishlist = async () => {
    try {
      const { data } = await fetchWishlist();
      setWishlist(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromUserList('wishlist', id);
      setWishlist(wishlist.filter(item => item._id !== id));
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
      <div className="flex items-center gap-4">
        <div className="bg-red-500/10 p-4 rounded-2xl text-red-500 border border-red-500/20">
          <Heart size={32} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white">My Wishlist</h1>
          <p className="text-slate-400">Products you've saved for later.</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="tech-card p-20 text-center space-y-6">
          <ShoppingBag size={64} className="mx-auto text-slate-700" />
          <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
          <Link href="/products" className="inline-block btn-primary px-8 py-3 rounded-full">
            Browse Gadgets
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="relative group">
              <ProductCard product={product} />
              <button 
                onClick={() => handleRemove(product._id)}
                className="absolute top-4 right-4 p-2 bg-slate-900/80 text-white hover:text-red-500 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-all z-10"
                title="Remove from Wishlist"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
