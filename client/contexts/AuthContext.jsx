// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const token = localStorage.getItem("authToken");
    
    if (token) {
      try {
        // Decode the token and set user
        const decodedToken = jwt.decode(token); 
        const { email, role } = decodedToken;

        setUser({ email, role });
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Optionally, you can clear the invalid token from localStorage
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    console.log(userData);
    router.push('/Home');
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
