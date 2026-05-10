import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'GadgetHub | Premium Electronics Store',
  description: 'Your one-stop shop for the latest gadgets and electronics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
