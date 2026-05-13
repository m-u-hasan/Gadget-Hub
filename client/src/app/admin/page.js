'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, fetchAllOrders } from '@/services/api';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetchProducts(),
          fetchAllOrders()
        ]);

        const products = productsRes.data;
        const orders = ordersRes.data;

        const sales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        const lowStock = products.filter(p => p.stock < 10).length;

        setStats({
          totalSales: sales,
          totalOrders: orders.length,
          totalProducts: products.length,
          lowStock: lowStock,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="h-10 bg-slate-800 w-1/4 rounded"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-800 rounded-2xl"></div>)}
    </div>
  </div>;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
          <TrendingUp size={14} /> Live Analytics
        </div>
      </div>

      {/* Stats Cards (SRS 3.6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-blue-500/10 group-hover:scale-110 transition-transform">
            <DollarSign size={120} />
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Sales</p>
            <h3 className="text-3xl font-black text-white">৳{stats.totalSales.toLocaleString()}</h3>
            <div className="flex items-center gap-1 text-[10px] text-blue-400 font-bold">
              <ArrowUpRight size={12} /> +12% from last month
            </div>
          </div>
        </div>

        <div className="bg-purple-600/10 border border-purple-500/20 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/10 group-hover:scale-110 transition-transform">
            <ShoppingCart size={120} />
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Orders</p>
            <h3 className="text-3xl font-black text-white">{stats.totalOrders}</h3>
            <div className="flex items-center gap-1 text-[10px] text-purple-400 font-bold">
              <ArrowUpRight size={12} /> Real-time tracking
            </div>
          </div>
        </div>

        <div className="bg-emerald-600/10 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-emerald-500/10 group-hover:scale-110 transition-transform">
            <Package size={120} />
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Products</p>
            <h3 className="text-3xl font-black text-white">{stats.totalProducts}</h3>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
              <ArrowUpRight size={12} /> In Inventory
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl relative overflow-hidden group border ${stats.lowStock > 0 ? 'bg-red-600/10 border-red-500/20' : 'bg-slate-800/50 border-slate-700'}`}>
          <div className={`absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform ${stats.lowStock > 0 ? 'text-red-500/10' : 'text-slate-500/10'}`}>
            <AlertTriangle size={120} />
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Low Stock Alerts</p>
            <h3 className={`text-3xl font-black ${stats.lowStock > 0 ? 'text-red-500' : 'text-white'}`}>{stats.lowStock}</h3>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${stats.lowStock > 0 ? 'text-red-400' : 'text-slate-500'}`}>
              {stats.lowStock > 0 ? 'Immediate action required' : 'Inventory stable'}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart Placeholder */}
      <div className="tech-card p-10 bg-slate-900/50 border-dashed border-slate-800 text-center space-y-4">
        <div className="bg-blue-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-blue-500">
          <BarChart3 size={40} />
        </div>
        <h3 className="text-xl font-bold">Sales Analytics Chart</h3>
        <p className="text-slate-500 max-w-md mx-auto">Visual data representation for monthly performance, category distribution, and user engagement will appear here as more data is collected.</p>
      </div>
    </div>
  );
}

import { BarChart3 } from 'lucide-react';
