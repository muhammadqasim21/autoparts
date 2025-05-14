import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { OrderProvider } from '../context/OrderContext';


const publicRoutes = ['/', '/login', '/signup','/admin/login'];

function RouteGuard({ children }) {
  const router = useRouter();
  const { user, loading, admin } = useAuth();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(router.pathname);
    if (router.pathname.startsWith('/admin')) {
      if (!admin && !loading) {
        router.push('/admin/login');
      }
      return; 
    }
    if (!isPublicRoute && !user && !loading) {
      router.push('/login');
    }
  }, [router.pathname, user,admin, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
}

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
