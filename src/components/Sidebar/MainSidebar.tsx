import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from 'react';

import AccountInfo from './AccountInfo';
import SidebarOptions from './SidebarOptions';
import { AuthContext } from '../../context/AuthContext';


type MainSidebarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function MainSidebar({isMenuOpen, setIsMenuOpen}: MainSidebarProps) {
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
      logout();
    };

  return (
    <>
    {isMenuOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 transition-opacity z-40"
    ></div>
  )}
    <div
      className={`fixed top-0 left-0 w-10/12 sm:w-2/3 lg:w-1/3 h-screen bg-white2 z-50 flex flex-col
                transition-transform duration-200 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
      >

      <button
        onClick={() => setIsMenuOpen(false)}
        className=" absolute left-4 top-4 z-50 text-dark rounded-full border"
      >
        <ArrowBackIcon className="h-8 w-8 m-2"/>
      </button>

      <AccountInfo/>
      <SidebarOptions/>
      <div className=" absolute left-4 bottom-4 z-50 text-dark rounded-full border p-2">
        <button
        onClick={handleLogout}
        className='font-bold'
      >
        <ArrowBackIcon/> LogOut
      </button>
      </div>
      

       
    </div>
    </>
  )
}
