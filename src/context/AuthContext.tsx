import { createContext, useState, useEffect } from "react";
import { isTokenExpired } from "../helpers/isTokenExpired";
import { jwtDecode } from "jwt-decode";
import type { UserLevel } from "../@types/userProfile";

interface JwtPayload {
  sub: string;
  userId: number
  roles?: string[];
  iat: number;
  exp: number;
}


interface UserContextType {
  username: string;
  fullName: string | null;
  userLevel: UserLevel;
  permissions?: string[]; // opcional
  hasPersonalData: boolean;
}

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("jwtToken");

    if (!saved || isTokenExpired(saved)) {
      localStorage.removeItem("jwtToken");
      return null;
    }
    return saved;
  });

  
  const [user, setUser] = useState<UserContextType>(() => {
  const savedUser = localStorage.getItem("user"); // opcional, guardar todo el objeto
  if (savedUser) {
    return JSON.parse(savedUser);
  }

  // Valor por defecto
  const savedHasPersonalData = localStorage.getItem("hasPersonalData");
  return {
    userId: null,
    username: "",
    fullName: null,
    userLevel: "BASIC",
    permissions: [],
    hasPersonalData: savedHasPersonalData ? JSON.parse(savedHasPersonalData) : false,
  };
});

  const [hasPersonalData, setHasPersonalData] = useState(() => {
    const saved = localStorage.getItem("hasPersonalData");
    return saved ? JSON.parse(saved) : false; 
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem("jwtToken");
    return saved !== null && !isTokenExpired(saved);
  });
  const [logoutReason, setLogoutReason] = useState<string | null>(null);

  // Login
  const login = (jwt: string) => {
    localStorage.setItem("jwtToken", jwt);
    setToken(jwt);
    setIsAuthenticated(true);
    setLogoutReason(null)
  };

  // Logout
  const logout = (reason?: string) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user")
    setToken(null);
    setIsAuthenticated(false);
    setLogoutReason(reason || null);
  };

  useEffect(() => {
  localStorage.setItem("user", JSON.stringify(user));
}, [user]);

  useEffect(() => {
    if (!token) return;

    const payload = jwtDecode<JwtPayload>(token);
    const expirationTime = payload.exp * 1000; 
    const now = Date.now();
    const timeout = expirationTime - now;
    
    
    if (timeout <= 0) {
      logout("expired");
      return;
    }
    const timer = setTimeout(() => logout("expired"), timeout);
    
    return () => clearTimeout(timer);

    

  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, logoutReason, setLogoutReason, hasPersonalData, setHasPersonalData, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
