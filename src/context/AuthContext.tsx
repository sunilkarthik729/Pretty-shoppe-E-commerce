// context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  signup: (username: string, password: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<{ username: string; password: string }[]>(
    []
  );

  const signup = (username: string, password: string) => {
    setUsers((prev) => [...prev, { username, password }]);
    setUser(username); // auto-login after signup
  };

  const login = (username: string, password: string) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(username);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
