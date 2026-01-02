import { useState } from "react";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const initialMode = location.state?.mode === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 min-h-screen bg-secondary">

      {/* Sección izquierda (2/3) */}
      <div className="xl:col-span-2 text-secondary relative">
        <img 
          src="src/assets/images/image_login.jpg" 
          alt="Trading background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Sección derecha (1/3) */}
      <div className="bg-white p-3 flex items-center lg:justify-start justify-center">
        {mode === "login" ? <LoginForm onSwitchMode={() => setMode("register")}/> : <RegisterForm onSwitchMode={() => setMode("login")}/>}
        
      </div>

    </div>
          
          
        
)}