// src/context/AuthContext.js
// Context for managing user authentication state
import { createContext, useState, useEffect } from 'react';

// Create authentication context
export const AuthContext = createContext();

// Provider component to wrap the app
export const AuthProvider = ({ children }) => {
  // State for current user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Log in a user
  const login = (username) => {
    const userData = { username };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Log out the current user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    // Provide auth functions and user state to children
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};