import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const storedAdmin = localStorage.getItem('adminToken');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedAdmin) {
        setAdmin(storedAdmin);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // User login/logout
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    if(!admin){
      router.push('/login');
    }
  };

  // Admin login/logout
  const loginAdmin = (token) => {
    setAdmin(token);
    localStorage.setItem('adminToken', token);
    router.push('/admin/dashboard');
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
    if(!user){
      router.push('/admin/login');
    }
  };

  const value = {
    user,
    admin,
    loading,
    login,
    logout,
    loginAdmin,
    logoutAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
