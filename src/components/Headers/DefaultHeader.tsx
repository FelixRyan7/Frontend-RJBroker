import '../../styles/styles.css';
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedButton from '../Buttons/AnimatedButton';
import BasicButton from '../Buttons/BasicButton';
export default function DefaultHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';
  return (
    <div>
        <div className={`${isHome ? 'bg-transparent' : 'bg-primary'} expressive-typography text-2xl flex justify-between p-10 text-secondary`}>
            <a href="/">RJ Broker</a>
            <div className='hidden md:flex gap-3'>
              <BasicButton
                onClick={() => navigate("/auth", { state: { mode: "register" } })}>
                Crear Cuenta 
              </BasicButton>  
              <AnimatedButton 
                onClick={() => navigate("/auth", { state: { mode: "login" } })}>
                Iniciar Sesion
              </AnimatedButton>
            </div>

        </div>
    </div>
  )
}
