import { useState } from 'react'
import InputFloating from '../Inputs/floatingInput'
import BasicButton from '../Buttons/BasicButton'
import { AccountCircleOutlined as AccountCircleOutlinedIcon, LockOutlined as LockOutlinedIcon, EmailOutlined as EmailOutlinedIcon } from '@mui/icons-material';
import type { registerFormType } from '../../@types/loginPage';
import api from '../../api/axios';
import type { MessageType } from '../Message/Message';
import {ToastMessage} from '../Message/Message'

type registerFormProps = {
    onSwitchMode: () => void 
}
export default function RegisterForm({onSwitchMode}: registerFormProps) {


    const [registerFormData, setRegisterFormData] = useState<registerFormType>({
       username:'',
       email:'',
       password:'',
       confirmPassword:'',
    });
    const [apiMessage, setApiMessage] = useState<string | null>(null);
    const [apiMessageType, setApiMessageType] = useState<MessageType>("info");
    const [countdown, setCountdown] = useState<number | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setRegisterFormData({
    ...registerFormData,
    [e.target.id]: e.target.value, 
  });
  };


  const isFormValid = registerFormData.username !== "" && registerFormData.password !== ""
  && registerFormData.email !== "" && registerFormData.confirmPassword !== "";

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      const { confirmPassword, ...dataToSend } = registerFormData;
      try {
        // Realizar la solicitud POST a la API
        const response = await api.post("/api/auth/register", dataToSend)
        console.log('Usuario registrado exitosamente:', response.data);
        setApiMessage(response.data.message)
        setApiMessageType("success")
        setCountdown(4)
        const timer = setInterval(() => {
         setCountdown((prev) => {
         if (prev && prev > 1) {
          return prev - 1;
         } else {
         clearInterval(timer);
         onSwitchMode(); // Cambia al login cuando termine
         return null;
         }
         });
        }, 1000);
      
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          console.error('Error en la solicitud:', error.response.data);     
             setApiMessage(error.response.data.error)
             setApiMessageType("error")
        } else {
          console.error('Error inesperado:', error);
          setApiMessage(error)
          setApiMessageType("error")
        }
      }
  };

    
  return (
    <div className="sm:px-4 w-full max-w-lg ">
    <h2 className="text-4xl font-bold text-dark">Registrate Ahora.</h2>
          
    <form onSubmit={handleSignUpSubmit} className='mt-10 mb-16'>
      {apiMessage && <ToastMessage type={apiMessageType} text={apiMessage} />}
    <InputFloating
    id="username"
    label="Tu Nombre De Usuario"
    icon={<AccountCircleOutlinedIcon />}
    value={registerFormData.username}
    onChange={handleChange}
    />
    <InputFloating
    id="email"
    label="Tu Email"
    icon={<EmailOutlinedIcon />}
    value={registerFormData.email}
    onChange={handleChange}
    />
    <InputFloating
    id="password"
    label="Tu Contraseña"
    icon={<LockOutlinedIcon />}
    value={registerFormData.password}
    onChange={handleChange}
    type="password"
    />
    <InputFloating
    id="confirmPassword"
    label="Confirma Contraseña"
    icon={<LockOutlinedIcon />}
    value={registerFormData.confirmPassword}
    onChange={handleChange}
    type="password"
    />
    {apiMessageType === "success" ? 
    (<p className="text-center bg-primary text-secondary cursor-pointer hover:brightness-125 font-bold p-3 rounded-full mt-5" onClick={onSwitchMode}>Iniciar Sesion <span className='ml-2'>{countdown}</span></p>) 
    : 
    <BasicButton type='submit' disabled={!isFormValid} className='mt-10 w-full md:w-auto'>
      Enviar
    </BasicButton>}
    
    {apiMessageType !== "success" && 
    <div className='flex mt-14 text-xs text-primary font-bold cursor-pointer'>
      <p onClick={onSwitchMode}>Ya tienes cuenta?</p>
    </div>}

   </form>
   </div>
  )
}
