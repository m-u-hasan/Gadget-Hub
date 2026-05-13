'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchMyOrders } from '@/services/api';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Heart, 
  Settings, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  Truck, 
  ChevronRight,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      const getOrders = async () => {
        try {
          const { data } = await fetchMyOrders();
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };
      getOrders();
    }
  }, [user, authLoading, router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Shipped': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Processing': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  if (authLoading || loading) return (
    <div className="flex justify-center py-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-blue-600/10 to-transparent p-8 rounded-3xl border border-blue-500/10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-600/20">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Hello, {user?.name.split(' ')[0]}!</h1>
            <p className="text-slate-400 mt-1">Manage your orders and account settings.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="tech-card px-6 py-3 text-center">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Orders</p>
            <p className="text-2xl font-black text-white">{orders.length}</p>
          </div>
          <div className="tech-card px-6 py-3 text-center border-blue-500/30">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Membership</p>
            <p className="text-2xl font-black text-blue-500">Elite</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-900 text-slate-400'}`}
          >
            <Package size={20} /> My Orders
          </button>
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'wishlist' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-900 text-slate-400'}`}
          >
            <Heart size={20} /> Wishlist
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-900 text-slate-400'}`}
          >
            <Settings size={20} /> Settings
          </button>
        </aside>

        {/* Dynamic Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Clock className="text-blue-500" /> Recent Orders
              </h2>
              
              {orders.length === 0 ? (
                <div className="tech-card p-20 text-center space-y-4">
                  <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-600">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="text-xl font-bold">No orders found</h3>
                  <p className="text-slate-400">You haven't placed any orders yet. Start shopping!</p>
                  <button onClick={() => router.push('/products')} className="btn-primary px-8 py-2 rounded-full">
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order) => (
                    <div key={order._id} className="tech-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-blue-500/50 transition-all">
                      <div className="flex gap-6 items-center">
                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 group-hover:bg-blue-600/10 transition-colors">
                          <Package size={32} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Order ID</p>
                          <p className="text-sm font-mono text-white">#{order._id.slice(-8).toUpperCase()}</p>
                          <p className="text-xs text-slate-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Amount</p>
                          <p className="text-lg font-black text-white">৳{order.totalPrice.toLocaleString()}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-tighter ${getStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                        <ChevronRight size={20} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="tech-card p-20 text-center space-y-4">
              <Heart size={48} className="mx-auto text-red-500/20" />
              <h3 className="text-xl font-bold">Your wishlist is empty</h3>
              <p className="text-slate-400">Save products you love to see them here.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tech-card p-10 space-y-8">
               <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm text-slate-500 font-bold">Full Name</label>
                   <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-white">{user?.name}</div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm text-slate-500 font-bold">Email Address</label>
                   <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-white">{user?.email}</div>
                 </div>
               </div>
               <button className="btn-primary px-8 py-3 rounded-xl opacity-50 cursor-not-allowed">
                 Update Profile (Coming Soon)
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
