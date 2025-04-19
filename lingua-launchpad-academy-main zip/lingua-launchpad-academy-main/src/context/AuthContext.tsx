
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock API responses for now (will integrate with real API later)
  const mockLoginResponse = (email: string) => ({
    id: "user123",
    name: email.split("@")[0],
    email,
    token: "mock-jwt-token"
  });

  useEffect(() => {
    // Check if user info is in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      const userData = mockLoginResponse(email);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Failed to login: " + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      const userData = {
        id: "user" + Math.floor(Math.random() * 1000),
        name,
        email,
        token: "mock-jwt-token"
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Registered successfully!");
    } catch (error) {
      toast.error("Failed to register: " + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
