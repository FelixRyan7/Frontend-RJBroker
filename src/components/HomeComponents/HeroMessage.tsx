import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';
import AnimatedButton from '../Buttons/AnimatedButton';
import BasicButton from '../Buttons/BasicButton';

export default function HeroMessage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col relative">
      <div className='flex flex-col gap-3'>
        <h1 className="fade-up tracking-wider text-center p-2 md:p-auto md:text-left md:absolute md:top-auto sm:bottom-10 sm:left-10 text-4xl xl:text-5xl 2xl:text-7xl text-secondary home-message">
          Aprende. <span className='text-primary bg-secondary px-2 rounded transition-colors duration-200 hover:text-secondary hover:bg-primary'>Invierte</span>. <br/>Avanza hacia tu autonomía financiera.
        </h1>
        <p className='md:hidden mt-4 text-secondary tracking-wider text-center'>Ahorra, invierte en múltiples mercados y haz crecer tu patrimonio de forma inteligente con nosotros</p>
      </div>
      <div className='md:hidden flex flex-col absolute bottom-20 gap-14 p-8 w-full'>
        <BasicButton
          onClick={() => navigate("/auth", { state: { mode: "register" } })}>
          Crear Cuenta 
        </BasicButton>  
        <AnimatedButton 
          onClick={() => navigate("/auth", { state: { mode: "login" } })}
          rounded={false}
          border="border-b-2">
          Iniciar Sesion
        </AnimatedButton>
      </div>
    </div>

  )
}
