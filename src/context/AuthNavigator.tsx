import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthNavigator({ children }: any) {
  const { isAuthenticated, logoutReason, setLogoutReason } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/", "/auth"];
    const path = location.pathname;

    if (logoutReason === "expired") {
      alert("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
      navigate("/", { replace: true });
      setLogoutReason(null)
      return;
    }

    if (isAuthenticated && publicRoutes.includes(path)) {
      // Si estás logeado y entras a una ruta pública → redirige al dashboard
      navigate("/dashboard", { replace: true });
    }

    if (!isAuthenticated && !publicRoutes.includes(path)) {
      // Si no estás logeado y entras a una ruta privada → redirige al home
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return children;
}