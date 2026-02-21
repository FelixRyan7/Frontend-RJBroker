import { useContext, useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BuySellToggleButton from '../Buttons/BuySellToggleButton';
import TradeAmountInput from '../Inputs/TradeAmountInput';
import { WalletContext } from '../../context/WalletContext';
import { getCurrencySymbol } from '../../helpers/currency';
import { convertFromUSD } from '../../helpers/currencyChange';
import BasicButton from '../Buttons/BasicButton';
import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '../../api/peticiones/assets';
import { SuccesfulTradeComponent } from '../Message/SuccesfullTradeComponent';
import { useNavigate } from 'react-router-dom';

type TradeAssetProps = {
  tradeType: "buy" | "sell";
  setTradeType: React.Dispatch<
    React.SetStateAction<"buy" | "sell" | null>
  >;
  price: number;
  assetId: number;
  assetSymbol: string;
  assetLogo: string;
};

type SuccessData = {
  type: "buy" | "sell";
  price: number;
  quantity: number;
  assetSymbol: string;
};

export default function TradeAsset({
  tradeType,
  setTradeType,
  price,
  assetId,
  assetSymbol,
  assetLogo
}: TradeAssetProps) {
    const navigate = useNavigate()
    const walletContext = useContext(WalletContext);
        if (!walletContext) {
          throw new Error("WalletContext must be used inside WalletProvider");
        }
    const { wallet, refreshWallet } = walletContext;

    const [amount, setAmount] = useState("")

   const [successData, setSuccessData] = useState<SuccessData | null>(null);

    const amountNumber = Number(amount);

    // Total del trade en USD
    const totalCostUSD = price * amountNumber;

    // Total en la moneda del wallet
    const totalCostWalletCurrency = convertFromUSD(totalCostUSD, wallet.currency);


    // Condición para deshabilitar botón de compra
    const isBuyDisabled =
    tradeType === "buy" && totalCostWalletCurrency > wallet.balance;

    const assetInWallet = wallet.assets.find(a => a.assetSymbol === assetSymbol || a.assetId === assetId);
    const ownedQuantity = assetInWallet?.quantity || 0;

    const isSellDisabled =
    tradeType === "sell" && ownedQuantity < amountNumber

    const mutation = useMutation({
      mutationFn: () =>
        placeOrder({
          tradeType: tradeType!,
          assetId,
          price,
          quantity: amountNumber,
          assetSymbol,
        }),
      onSuccess: (data) => {
        
        setSuccessData({
          type: tradeType!,
          price,
          quantity: amountNumber,
          assetSymbol,
        });
        refreshWallet()
        setTimeout(() => {
          navigate("/wallet")
          
        }, 3500);
        setTimeout(() => {
          
          setTradeType(null);
          setSuccessData(null);
          
        }, 4000);
        
      },
      onError: (error: any) => {
        alert("Failed to place order: " + error.message);
      },
    });

    const handlePlaceOrder = () => {
      if (!isBuyDisabled && tradeType && amountNumber > 0) {
        mutation.mutate();
      }
    };
    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => setTradeType(null), 300);
    };
    
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    // fuerza el render inicial y luego anima
    requestAnimationFrame(() => {
        setIsVisible(true);
    });

    return () => setIsVisible(false);
    }, []);



  return (
    <div className={`fixed inset-0 z-50 transition-all duration-100 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
        `}
    >
        <div className={`fixed inset-x-0 bottom-0 top-12 border-t p-4 border-gray rounded-t-2xl bg-white2 flex flex-col transition-transform duration-100 ease-out
             ${isVisible ? "translate-y-0" : "translate-y-full"}
            `}
        >       
        
            <div className='flex justify-between items-center  mr-3'>
                <div className='flex gap-3 items-center text-gray'>
            <img
              src={assetLogo}
             
              className="w-11 h-11 rounded-full "
            />
             | {assetSymbol} | ${price}
            </div>
            <div 
              onClick={handleClose}
              className='p-2 rounded-full text-white bg-gray '><KeyboardArrowDownIcon/>
            </div>
            </div>
            
            

            <div className='flex justify-between items-center mt-10 mx-3'>
                <h1 className='text-2xl font-bold'>{tradeType}</h1>
              <BuySellToggleButton side={tradeType} onChange={setTradeType} />
            
            </div>
            
            {tradeType === 'buy' ? 
            (
                <h1 className="text-gray mx-3"> Available to trade: {wallet.balance}{getCurrencySymbol(wallet.currency)}</h1>
            )
            :
            (   
                <h1 className="text-gray mx-3">Quantity in your portfolio: {ownedQuantity}</h1>
            )
            }
        
        <TradeAmountInput amount={amount} setAmount={setAmount} price={price} tradeType={tradeType} assetSymbol={assetSymbol}/>
        <BasicButton 
          className="bg-primary absolute bottom-0 left-0 w-full p-4 text-white2 rounded-t-2xl text-xl font-bold "
          disabled={isBuyDisabled || mutation.isPending || !amountNumber || isSellDisabled}
          onClick={handlePlaceOrder}
        >
            {
            mutation.isPending
            ? "Processing..."
            : tradeType === "buy"
            ? "Buy"
            : "Sell"
            } 
        </BasicButton>
          
      </div>
      {successData && <SuccesfulTradeComponent data={successData} />}
    </div>
  )
}
