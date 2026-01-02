import { useContext, useEffect } from "react";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";
import PersonalDataModal from "../../components/Modals/PersonalDataModal";


export default function Dashboard() {

  const { token, user, logout} = useContext(AuthContext);

  const probarProtegido = async () => {
  
  try {
    const response = await api.get("/api/user-profile/prueba", {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });
     const payload = jwtDecode(token);
      console.log("Payload:", payload);

    console.log("Respuesta del servidor:", response.data);
  } catch (error: any) {
    console.error("Error:", error.response ? error.response.data : error.message);
    logout()
  }

};

useEffect(() => {
    probarProtegido();
  }, [])
  return (
    <>
    <div className="min-h-screen">
    {
      user.hasPersonalData ? (<h1>tienes acceso</h1>
      ): (<PersonalDataModal/>)
    }

    </div>
    </>
    
  )
}
