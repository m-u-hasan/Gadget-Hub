'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/services/api';
import { useRouter } from 'next/navigation';
import { CreditCard, MapPin, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Redirect if not logged in or cart empty
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=checkout');
    } else if (cartItems.length === 0 && !orderSuccess) {
      router.push('/products');
    }
  }, [user, authLoading, cartItems, orderSuccess, router]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          quantity: item.qty
        })),
        shippingAddress,
        totalPrice
      };
      
      await createOrder(orderData);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="text-center py-40 space-y-6">
        <div className="bg-green-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/50">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-bold text-white">Order Confirmed!</h1>
        <p className="text-slate-400 text-lg">Thank you for your purchase. We've received your order and are processing it.</p>
        <div className="flex justify-center gap-4 pt-4">
          <button onClick={() => router.push('/dashboard')} className="btn-primary px-8 py-3 rounded-xl">
            View My Orders
          </button>
          <button onClick={() => router.push('/products')} className="tech-card px-8 py-3 rounded-xl">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div className="space-y-8">
          <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MapPin size={24} className="text-blue-500" /> Shipping Information
            </h2>
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Full Shipping Address</label>
                <textarea
                  required
                  rows="4"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Street, City, Zip Code, Country"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CreditCard size={24} className="text-blue-500" /> Payment Method
            </h2>
            <div className="tech-card p-4 flex items-center gap-4 bg-blue-500/5 border-blue-500/30">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Truck size={24} />
              </div>
              <div>
                <p className="font-bold text-white">Cash on Delivery</p>
                <p className="text-sm text-slate-400">Pay when your gadgets arrive.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Order Review */}
        <div className="space-y-6">
          <div className="tech-card p-6 space-y-6">
            <h2 className="text-xl font-bold border-b border-slate-800 pb-4">Order Review</h2>
            
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center gap-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center flex-shrink-0">
                      <img src={item.images?.[0]} alt={item.name} className="max-h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">${(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span className="text-blue-500">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full btn-primary py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Processing Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
