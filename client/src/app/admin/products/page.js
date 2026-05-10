'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '@/services/api';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  Package,
  X,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', brand: '', category: 'Mobile', price: 0, stock: 0, description: '', 
    specs: { ram: '', storage: '', processor: '', battery: '' },
    images: ['']
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await addProduct(formData);
      }
      setShowModal(false);
      getProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        getProducts();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '', brand: '', category: 'Mobile', price: 0, stock: 0, description: '', 
      specs: { ram: '', storage: '', processor: '', battery: '' },
      images: ['']
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Inventory Management</h1>
          <p className="text-slate-500 text-sm">Add, update, or remove gadgets from your store.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20"
        >
          <Plus size={20} /> Add New Gadget
        </button>
      </div>

      {/* Product Table (SRS 3.6) */}
      <div className="tech-card overflow-hidden border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.map((p) => (
                <tr key={p._id} className="group hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                        {p.images?.[0] ? <img src={p.images[0]} className="max-h-full object-contain" /> : <Package size={20} className="text-slate-600" />}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-400">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                      <span className={`font-bold ${p.stock < 10 ? 'text-red-500' : 'text-slate-300'}`}>{p.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-white">
                    ${p.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(p)} className="p-2 hover:bg-blue-600/10 text-slate-500 hover:text-blue-500 rounded-lg transition-colors">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-600/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal (SRS 3.6 - Dynamic Specs) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="tech-card w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black text-white mb-8">
              {editingProduct ? 'Update Gadget' : 'Add New Gadget'}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Product Name</label>
                  <input required className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Brand</label>
                    <input required className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                      value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                    <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option value="Mobile">Mobile</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Price ($)</label>
                    <input type="number" required className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                      value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stock Units</label>
                    <input type="number" required className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                      value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image URL</label>
                   <div className="flex gap-2">
                     <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-500"><ImageIcon size={20} /></div>
                     <input required className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                       value={formData.images[0]} onChange={e => setFormData({...formData, images: [e.target.value]})} />
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl space-y-4">
                  <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest border-b border-blue-500/20 pb-2">Technical Specs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="RAM (e.g. 16GB)" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" 
                      value={formData.specs.ram} onChange={e => setFormData({...formData, specs: {...formData.specs, ram: e.target.value}})} />
                    <input placeholder="Storage (e.g. 512GB SSD)" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" 
                      value={formData.specs.storage} onChange={e => setFormData({...formData, specs: {...formData.specs, storage: e.target.value}})} />
                    <input placeholder="Processor" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" 
                      value={formData.specs.processor} onChange={e => setFormData({...formData, specs: {...formData.specs, processor: e.target.value}})} />
                    <input placeholder="Battery" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" 
                      value={formData.specs.battery} onChange={e => setFormData({...formData, specs: {...formData.specs, battery: e.target.value}})} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea rows="4" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none resize-none" 
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> {editingProduct ? 'Apply Changes' : 'Confirm & Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
