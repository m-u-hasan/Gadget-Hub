'use client';

import { useState, useEffect } from 'react';
import { fetchProductById, addToWishlist, addToCompare } from '@/services/api';
import { ShoppingCart, Heart, Repeat, ChevronLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/cart');
  };

  const handleAddToWishlist = async () => {
    if (!user) return router.push('/login');
    try {
      await addToWishlist(product._id);
      router.push('/wishlist');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding to wishlist');
    }
  };

  const handleAddToCompare = async () => {
    if (!user) return router.push('/login');
    try {
      await addToCompare(product._id);
      router.push('/compare');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding to comparison');
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center py-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-40">
      <h2 className="text-3xl font-bold">Product Not Found</h2>
      <Link href="/products" className="text-blue-500 hover:underline mt-4 block">Back to Products</Link>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <Link href="/products" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit">
        <ChevronLeft size={20} /> Back to Catalog
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="tech-card p-4 aspect-square flex items-center justify-center">
          <img 
            src={product.images?.[0]} 
            alt={product.name} 
            className="max-h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <span className="text-blue-500 font-semibold uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-4xl font-extrabold mt-2">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4 text-slate-400">
              <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">{product.category}</span>
              <span>•</span>
              <span className="text-yellow-500">★ {product.rating} Rating</span>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed">
            {product.description}
          </p>

          <div className="text-4xl font-bold text-white">
            ৳{product.price.toLocaleString()}
          </div>

          {/* Action Buttons (SRS 3.3) */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-grow btn-primary flex items-center justify-center gap-2 py-4 text-lg"
            >
              <ShoppingCart size={24} /> Add to Cart
            </button>
            <button 
              onClick={handleAddToWishlist}
              className="p-4 tech-card hover:text-red-500 transition-colors"
            >
              <Heart size={24} />
            </button>
            <button 
              onClick={handleAddToCompare}
              className="p-4 tech-card hover:text-blue-500 transition-colors"
            >
              <Repeat size={24} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck size={24} className="text-blue-500" />
              Free Shipping
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck size={24} className="text-blue-500" />
              1 Year Warranty
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RefreshCw size={24} className="text-blue-500" />
              7 Day Return
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table (SRS 3.3) */}
      <section className="tech-card overflow-hidden">
        <div className="bg-slate-900 px-8 py-4 border-b border-slate-800">
          <h2 className="text-2xl font-bold">Technical Specifications</h2>
        </div>
        <div className="grid md:grid-cols-2">
          {Object.entries(product.specs || {}).map(([key, value], index) => (
            <div 
              key={key} 
              className={`flex justify-between px-8 py-4 ${index % 2 === 0 ? 'bg-slate-900/30' : ''}`}
            >
              <span className="text-slate-400 capitalize font-medium">{key}</span>
              <span className="text-white font-bold">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
