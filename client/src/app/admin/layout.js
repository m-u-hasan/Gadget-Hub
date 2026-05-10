'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="flex justify-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Products', href: '/admin/products', icon: Package },
    { label: 'Manage Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Users List', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-10rem)]">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-72 space-y-2">
        <div className="tech-card p-6 mb-6 border-blue-500/30 bg-blue-500/5">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BarChart3 className="text-blue-500" /> Admin Panel
          </h2>
          <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">Control Center</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center justify-between group px-6 py-4 rounded-xl font-bold transition-all hover:bg-slate-900 text-slate-400 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className="group-hover:text-blue-500 transition-colors" />
                {item.label}
              </div>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </nav>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-grow">
        <div className="tech-card p-8 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
