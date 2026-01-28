import { useContext, useState } from 'react'
import { getCurrencySymbol } from '../../helpers/currency';
import { WalletContext } from '../../context/WalletContext';
import BasicButton from '../Buttons/BasicButton';
import AnimatedButton from '../Buttons/AnimatedButton';
import apiWallet from '../../api/axiosWallet';
import { AuthContext } from '../../context/AuthContext';

// types.ts o DepositModal.types.ts
export type DepositModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


export default function DepositMoney({isOpen, onClose}: DepositModalProps) {

    const walletContext = useContext(WalletContext);
        if (!walletContext) {
            throw new Error("WalletContext must be used inside WalletProvider");
        }
    const { wallet, refreshWallet} = walletContext;

    const{ token } = useContext(AuthContext)

    const [amount, setAmount] = useState<number | "">("");

    const onSubmit = async (amount: number) => {
      try{
        const response = await apiWallet.post<any>("/api/wallet/NewDeposit",{ amount }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },})
        console.log(response)
        onClose()
        setAmount("")
        refreshWallet()
        
      } catch(error: any){
          console.log(error)
      }
    };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 h-72 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-dark px-4 py-2 rounded-full text-gray font-semibold"
        >
          x
        </button>
        <h2 className="text-lg font-semibold mb-4">Depositar fondos</h2>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-5 text-4xl font-bold">
              <span>{getCurrencySymbol(wallet.currency)}</span>
              <input
              type="number"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-32 text-center text-6xl font-bold border-none focus:outline-none"
              min={0}
              />
            </div>  
            <BasicButton onClick={() => onSubmit(Number(amount))} className='absolute bottom-4 left-4 right-4'>Depositar</BasicButton>      
      </div>
     
    </div>
    </>
  );
  
}
