
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainSidebar from "../Sidebar/MainSidebar";

export default function LoggedHeader() {
    const { logout } = useContext(AuthContext); 
    const handleLogout = () => {
      logout();
    };
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <>
    <div className="fixed top-0 left-0 w-full h-20 bg-primary expressive-typography text-secondary">
        <div className="flex items-center justify-between h-20 p-3">
        <AccountCircleIcon 
          onClick={() => setIsMenuOpen(true)}
          sx={{
          fontSize: {
            xs: "2.2rem",   // móvil
            md: "2.4rem",   // pantallas medianas
            lg: "2.6rem",     // pantallas grandes
         }
        }}
        />
        <h1 onClick={handleLogout} className="">$ 1.000.000</h1>
        <button className="bg-accent px-4 py-1 rounded-full text-dark font-semibold hover:bg-dark hover:text-secondary cursor-pointer transition-all">Depositar</button>
        </div>  
        
    </div>
    
      <MainSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
    
    </>

    
  )
}
