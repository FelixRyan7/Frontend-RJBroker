
import { useContext, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainSidebar from "../Sidebar/MainSidebar";
import { WalletContext } from "../../context/WalletContext";
import { getCurrencySymbol } from "../../helpers/currency";
import DepositMoney from "../Modals/DepositMoney";
import { convertFromUSD, formatCurrency } from "../../helpers/currencyChange";

export default function LoggedHeader() {
    
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false); 

    const walletContext = useContext(WalletContext);
    if (!walletContext) {
      throw new Error("WalletContext must be used inside WalletProvider");
    }
    const { wallet, netWorth, totalPnlPercent } = walletContext;

  return (
    <>
    <div className="fixed z-50 top-0 left-0 w-full h-20 bg-primary expressive-typography text-secondary">
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
        <div className="flex gap-2 items-baseline">
          <h1  className="text-xl">{getCurrencySymbol(wallet.currency)} {netWorth.toFixed(2)} </h1>
          <h1 className={` font-bold text-white2 rounded-full px-[4px] ${Number(totalPnlPercent.toFixed(2)) < 0 ? 'bg-red' : 'bg-green'}`}>{totalPnlPercent.toFixed(2)}%</h1>
        </div>
        
        <button onClick={() => setIsDepositModalOpen(true)} className="bg-accent px-2 py-1 rounded-full text-dark font-semibold hover:bg-dark hover:text-secondary cursor-pointer transition-all">Deposit</button>
        </div>  
        
    </div>
    
      <MainSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <DepositMoney isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)}/>
    
    </>

    
  )
}
