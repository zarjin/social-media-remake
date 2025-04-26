import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.VITE_AUTH_API;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const register = async (userData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, userData, {
        withCredentials: true,
      });
      checkAuth();
      setIsAuthenticated(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const login = async (userData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/login`, userData, {
        withCredentials: true,
      });
      checkAuth();
      setIsAuthenticated(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/logout`, {
        withCredentials: true,
      });
      checkAuth();
      setIsAuthenticated(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, {
        withCredentials: true,
      });
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
