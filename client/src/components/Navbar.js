'use client';

import Link from 'next/link';
import { ShoppingCart, User, Smartphone, Laptop, Watch, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemsCount } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-500 flex items-center gap-2">
          Gadget<span className="text-white">Hub</span>
        </Link>

        {/* Categories (SRS 3.1) */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/products?category=Mobile" className="hover:text-blue-400 flex items-center gap-1 transition-colors">
            <Smartphone size={18} /> Mobile
          </Link>
          <Link href="/products?category=Laptop" className="hover:text-blue-400 flex items-center gap-1 transition-colors">
            <Laptop size={18} /> Laptop
          </Link>
          <Link href="/products?category=Accessories" className="hover:text-blue-400 flex items-center gap-1 transition-colors">
            <Watch size={18} /> Accessories
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative hover:text-blue-400 transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900">{itemsCount}</span>
          </Link>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-medium">{user.name.split(' ')[0]}</span>
                <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 hover:bg-slate-800 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="block px-4 py-2 hover:bg-slate-800 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    Wishlist
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="block px-4 py-2 text-blue-400 hover:bg-slate-800 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div className="border-t border-slate-800 my-2"></div>
                  <button 
                    onClick={() => { logout(); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <User size={24} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
