import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import StyleIcon from '@mui/icons-material/Style';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function SidebarOptions() {
  return (
    <div className="flex flex-col gap-3 mt-10">
      <div className='flex bg-primary w-full justify-between items-center align-center h-20 px-4'>
        <h1 className=" text-white2 font-bold p-2  text-sm flex gap-3"> <AccountBalanceIcon/> Depositar / Retirar </h1> <p className='text-white2'><ArrowForwardIosIcon/></p>
      </div>
      <div className='flex w- border-b-2 border-secondary justify-between items-center align-center h-20 px-4'>
        <h1 className="text-dark p-2 h-20 text-sm flex items-center gap-3"><SettingsIcon/> Ajustes de Cuenta</h1> <p className='text-primary'><ArrowForwardIosIcon/></p>
      </div>
      <div className='flex w-full border-b-2 border-secondary justify-between items-center align-center h-20 px-4'>
        <h1 className="text-dark p-2 h-20 text-sm flex items-center gap-3"><StyleIcon/> En que invertir</h1> <p className='text-primary'><ArrowForwardIosIcon/></p>
      </div>
      <div className='flex w-full border-b-2 border-secondary justify-between items-center align-center h-20 px-4'>
        <h1 className="text-dark p-2 h-20 text-sm flex items-center gap-3"><SchoolIcon/> Escuela financiera</h1> <p className='text-primary'><ArrowForwardIosIcon/></p>
      </div>
    </div>
  )
}
