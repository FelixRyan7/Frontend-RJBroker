import { useContext, useEffect, useState } from "react";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";
import PersonalDataModal from "../../components/Modals/PersonalDataModal";
import Button from "@mui/material/Button";
import BasicButton from "../../components/Buttons/BasicButton";
import axios from "axios";
import apiWallet from "../../api/axiosWallet";


export default function Dashboard() {

  const { token, user, logout} = useContext(AuthContext);
  

  const testFetchWallet = async () => {
    try {
      const response = await apiWallet.get("/api/wallet/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        ,
      });

      console.log("✅ Wallet response:", response.data);

    } catch (error) {
      console.error("❌ Error:", error);
    }
  };


  
  return (
    <>

    <div className="min-h-screen">
    {
      user.hasPersonalData ? (<BasicButton onClick={testFetchWallet}>tienes acceso</BasicButton>
      ): (<PersonalDataModal/>)
    }

    </div>
    </>
    
  )
}
