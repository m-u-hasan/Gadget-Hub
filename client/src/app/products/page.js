'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { Filter, X } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    category: categoryParam || '',
    ram: '',
    storage: '',
    priceMax: '',
  });

  // Update category filter when URL parameter changes
  useEffect(() => {
    if (categoryParam !== null) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  // Fetch products when filters change
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    getProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ brand: '', category: '', ram: '', storage: '', priceMax: '' });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters (SRS 3.3) */}
      <aside className="w-full md:w-64 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Filter size={20} /> Filters
          </h2>
          <button onClick={clearFilters} className="text-sm text-blue-500 hover:underline">
            Clear All
          </button>
        </div>

        {/* Brand Filter */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Brand</label>
          <select 
            name="brand" 
            value={filters.brand} 
            onChange={handleFilterChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
          >
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="HP">HP</option>
            <option value="Dell">Dell</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Category</label>
          <select 
            name="category" 
            value={filters.category} 
            onChange={handleFilterChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
          >
            <option value="">All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* RAM Filter */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">RAM</label>
          <select 
            name="ram" 
            value={filters.ram} 
            onChange={handleFilterChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
          >
            <option value="">All</option>
            <option value="8GB">8GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
          </select>
        </div>

        {/* Max Price Filter */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Max Price (৳{filters.priceMax ? Number(filters.priceMax).toLocaleString() : 'Any'})</label>
          <input 
            type="range" 
            name="priceMax" 
            min="0" 
            max="1000000" 
            step="1000"
            value={filters.priceMax} 
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-slate-400">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
