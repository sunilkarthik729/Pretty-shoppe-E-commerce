import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  signup: (username: string, password: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  const signup = (username: string, password: string) => {
    // store credentials (demo purpose only)
    localStorage.setItem("user", username);
    localStorage.setItem("password", password);
    setUser(username);
  };

  const login = (username: string, password: string) => {
    const savedUser = localStorage.getItem("user");
    const savedPass = localStorage.getItem("password");
    if (savedUser === username && savedPass === password) {
      setUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("password");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
