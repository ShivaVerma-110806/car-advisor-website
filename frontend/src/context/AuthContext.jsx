import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_AUTH_URL = "https://car-advisor-website-1.onrender.com/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/login`, { email, password });
      const { token: receivedToken, user: receivedUser } = response.data;

      localStorage.setItem("auth_token", receivedToken);
      localStorage.setItem("auth_user", JSON.stringify(receivedUser));

      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Invalid credentials. Please try again.";
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Backend registration endpoint
      const response = await axios.post(`${API_AUTH_URL}/register`, { name, email, password });
      
      // Auto login after registration if backend returns token
      if (response.data.token) {
        const { token: receivedToken, user: receivedUser } = response.data;
        localStorage.setItem("auth_token", receivedToken);
        localStorage.setItem("auth_user", JSON.stringify(receivedUser));
        setToken(receivedToken);
        setUser(receivedUser);
      } else {
        // Fallback: run login automatically after successful register
        return await login(email, password);
      }
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
