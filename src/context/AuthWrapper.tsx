import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: Props) {
  const { user, loadingUser } = useContext(AuthContext);

  if (loadingUser) {
    return <div>Cargando datos del usuario...</div>;
  }

  

  return <>{children}</>;
}
