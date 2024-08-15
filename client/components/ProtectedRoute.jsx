import { useRouter } from "next/router";
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children, adminOnly = false }) {
    const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!user) {
        router.push('/');
      } else if (adminOnly && user.role !== 'admin') {
        router.push('/');
      }
    }, [user, router, adminOnly]);
  
    if (!user || (adminOnly && user.role !== 'admin')) {
      return null; // or a loading spinner
    }
  
    return children;
  }
  
  export default ProtectedRoute;