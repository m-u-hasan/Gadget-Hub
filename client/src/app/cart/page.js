'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-40 space-y-6">
        <div className="bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-slate-700">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold">Your cart is empty</h2>
        <p className="text-slate-400">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="inline-block btn-primary px-8 py-3 rounded-full">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="tech-card p-4 flex gap-4 items-center">
              <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={item.images?.[0]} alt={item.name} className="max-h-full object-contain" />
              </div>
              
              <div className="flex-grow space-y-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-slate-400">{item.brand}</p>
                <p className="text-blue-500 font-bold">৳{item.price.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item._id, item.qty - 1)}
                  className="p-1 hover:text-blue-500 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-bold">{item.qty}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.qty + 1)}
                  className="p-1 hover:text-blue-500 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button 
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-slate-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="tech-card p-6 space-y-4">
            <h2 className="text-xl font-bold border-b border-slate-800 pb-4">Order Summary</h2>
            
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-white">৳{totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-slate-400">
              <span>Shipping</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>

            <div className="border-t border-slate-800 pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-blue-500">৳{totalPrice.toLocaleString()}</span>
            </div>

            <Link 
              href="/checkout" 
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 rounded-xl text-lg font-bold"
            >
              Checkout <ArrowRight size={20} />
            </Link>
          </div>

          <div className="text-center text-sm text-slate-500">
            Secure checkout powered by GadgetHub
          </div>
        </div>
      </div>
    </div>
  );
}
