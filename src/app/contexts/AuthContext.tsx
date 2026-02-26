import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { isAuthenticated: auth, username: user } = JSON.parse(storedAuth);
      setIsAuthenticated(auth);
      setUsername(user);
    }
  }, []);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, username }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
