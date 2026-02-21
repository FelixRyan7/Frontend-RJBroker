import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BasicButton from '../Buttons/BasicButton';
import type { loginData, LoginResponse } from '../../@types/loginPage';
import { useContext, useState } from 'react';
import InputFloating from '../Inputs/floatingInput';
import api from '../../api/axios';
import { ToastMessage, type MessageType } from '../Message/Message';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

type loginformProps = {
  onSwitchMode: () => void 
}

export default function LoginForm({ onSwitchMode }: loginformProps) {

  const navigate = useNavigate();
  const { login, setUser } = useContext(AuthContext);

  const [loginFormData, setLoginFormData] = useState<loginData>({
    username: '',
    password: '',
  });

  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [apiMessageType, setApiMessageType] = useState<MessageType>("info");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLoginFormData({
    ...loginFormData,
    [e.target.id]: e.target.value, 
  });
  };

  const isFormValid = loginFormData.username !== "" && loginFormData.password !== "";

  const handleLogInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
        // Realizar la solicitud POST a la API
        const response = await api.post<LoginResponse>("/api/auth/login", loginFormData)
        login(response.data.token)
        setUser({
          userId: response.data.userId,
          username: response.data.username,
          fullName: response.data.fullName,
          permissions: response.data.permissions,
          hasPersonalData: response.data.hasPersonalData,
        });
        navigate("/dashboard")
        
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setApiMessage(error.response.data.error)
          setApiMessageType("error")   
            
        } else {
          console.error('Error inesperado:', error);
          setApiMessage(error.response.data.error)
          setApiMessageType("error")
          
        }
      }
  };

  return (
    <div className="sm:px-4 w-full max-w-lg ">
    <h2 className="text-4xl font-bold text-dark">Inicia Sesión con tu nombre de usuario.</h2>
    <form onSubmit={handleLogInSubmit} className='mt-10 mb-16'>
      {apiMessage && <ToastMessage type={apiMessageType} text={apiMessage} />}
    <InputFloating
    id="username"
    label="Tu Nombre De Usuario"
    icon={<AccountCircleOutlinedIcon />}
    value={loginFormData.username}
    onChange={handleChange}
    />
    <InputFloating
    id="password"
    label="Tu Contraseña"
    icon={<LockOutlinedIcon />}
    value={loginFormData.password}
    onChange={handleChange}
    type="password"
    />
    

    <BasicButton type='submit' disabled={!isFormValid} className='mt-10 w-full md:w-auto'>
      Enviar
    </BasicButton>

    <div className='flex justify-between mt-14 text-xs text-primary font-bold cursor-pointer'>
      <p>has olvidado tu contraseña?</p>
      <p onClick={onSwitchMode}>Todavia no tienes cuenta?</p>
    </div>

   </form>
   </div>
  )
}
