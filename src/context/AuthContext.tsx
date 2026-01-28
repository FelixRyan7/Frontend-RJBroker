import { createContext, useState, useEffect } from "react";
import { isTokenExpired } from "../helpers/isTokenExpired";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import api from "../api/axios";

interface JwtPayload {
  sub: string;
  userId: number
  roles?: string[];
  permissions?: string[];
  iat: number;
  exp: number;
}


interface UserContextType {
  userId: number | null;
  username: string;
  fullName: string | null;
  permissions: string[];
  hasPersonalData: boolean;
}

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  
  // estado que contiene el token y logica para extraer de localstorage
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("jwtToken");

    if (!saved || isTokenExpired(saved)) {
      localStorage.removeItem("jwtToken");
      return null;
    }
    return saved;
  });

  // estado de user con datos basicos del user autenticado
  const [user, setUser] = useState<UserContextType | null>({
    userId: 0,
    username: "",
    fullName: "",
    permissions: [],
    hasPersonalData: true
  });

  //estado para condicionar la ui en funcion de si esta autenticado el user
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
    setToken(null);
    setIsAuthenticated(false);
    setLogoutReason(reason || null);
  };

  // funcion para traer datos actualizados del user
  const [loadingUser, setLoadingUser] = useState(true);

const refreshUser = async () => {
  if (!token) return;
  try {
    const response = await api.get<UserContextType>("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data);
  } catch (err) {
    console.error(err);
    setUser(null);
  } finally {
    setLoadingUser(false);
  }
};

useEffect(() => {
  if (token) refreshUser();
  else setLoadingUser(false);
}, [token]);



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
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, logoutReason, setLogoutReason, user, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
