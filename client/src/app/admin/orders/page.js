'use client';

import { useState, useEffect } from 'react';
import { fetchAllOrders, updateOrderStatus } from '@/services/api';
import { 
  ShoppingBag, 
  User, 
  Calendar, 
  MapPin, 
  MoreVertical,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  Search
} from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      getOrders();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'Shipped': return <Truck size={16} className="text-blue-500" />;
      case 'Processing': return <Clock size={16} className="text-yellow-500" />;
      case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-slate-500" />;
    }
  };

  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.userId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Order Management</h1>
          <p className="text-slate-500 text-sm">Monitor sales and manage fulfillment statuses.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID or Name..."
            className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="tech-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-blue-500/30 transition-all">
            <div className="flex flex-wrap gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Order Reference</p>
                <p className="text-sm font-mono text-white">#{order._id.toUpperCase()}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Customer</p>
                <div className="flex items-center gap-2 text-white font-bold">
                  <User size={14} className="text-blue-500" /> {order.userId?.name || 'Guest User'}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={12} /> {order.shippingAddress?.slice(0, 30)}...
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Revenue</p>
                <p className="text-lg font-black text-blue-500">৳{order.totalPrice.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Current Status</p>
                 <select 
                   className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs font-bold text-white focus:border-blue-500 outline-none cursor-pointer"
                   value={order.status}
                   onChange={(e) => handleStatusChange(order._id, e.target.value)}
                 >
                   <option value="Pending">Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Shipped">Shipped</option>
                   <option value="Delivered">Delivered</option>
                   <option value="Cancelled">Cancelled</option>
                 </select>
               </div>
               <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-blue-500/20 transition-all">
                 {getStatusIcon(order.status)}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
