import { useContext, useState } from "react";
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { WalletContext } from "../../context/WalletContext";
import { convertFromUSD, formatCurrency } from "../../helpers/currencyChange";
import { getCurrencySymbol } from "../../helpers/currency";

type TradeInputProps = {
  amount: string;
  setAmount: (value: string) => void;
  price: number
  tradeType: "buy" | "sell";          // Nuevo
  assetSymbol?: string; 
};

export default function TradeAmountInput({amount,setAmount, price, tradeType, assetSymbol} : TradeInputProps) {

const walletContext = useContext(WalletContext);
  if (!walletContext) {
    throw new Error("WalletContext must be used inside WalletProvider");
  }
const { wallet } = walletContext;
  
const handleKeyPress = (key: string) => {
  if (key === "DEL") {
    setAmount(amount.slice(0, -1)); // usa el valor actual
  } else if (key === "." && amount.includes(".")) {
    return; // solo un punto decimal
  } else {
    setAmount(amount + key);
  }
};

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "DEL"],
  ];

  const amountNumber = Number(amount);
  const totalCostUSD = price * amountNumber; // total en USD
  const totalCostWalletCurrency = convertFromUSD(totalCostUSD, wallet.currency);
  const missingAmount = totalCostWalletCurrency - wallet.balance; // ahora ambos están en la misma moneda
  const depositNeeded = Math.max(0, missingAmount);
  const insufficientFundsMessage = tradeType === "buy" && depositNeeded > 0
  ? `Insufficient funds. Deposit ${depositNeeded.toFixed(2)} ${getCurrencySymbol(wallet.currency)} .`
  : '';

  const assetInWallet = wallet.assets.find(a => a.assetSymbol === assetSymbol);
  const ownedQuantity = assetInWallet?.quantity || 0;
  const sellWarning = tradeType === "sell" && amountNumber > ownedQuantity
  ? `You only have ${ownedQuantity.toFixed(2)} ${assetSymbol} to sell.`
  : '';

  return (
    <div className="flex flex-col items-center p-4">
      {/* Input de display */}
        <div className=" flex flex-col gap-4 w-full mb-10 mt-8 max-w-xs p-4 text-center text-2xl border-none rounded-lg bg-gray-100">
          <span className={`text-6xl mb-2 ${Number(amount) === 0 ? 'text-gray' : 'text-dark'}`}>{amount || "0"}</span>
          <span className="text-gray text-sm">
            <span className="">Price:</span>{" "}
              {convertFromUSD(
              price * (Number(amount) > 0 ? Number(amount) : 1),
              wallet.currency
              )}
              {getCurrencySymbol(wallet.currency)}
            </span>
          <span className="text-gray text-sm">
            {insufficientFundsMessage || sellWarning || "\u00A0"}
          </span>         
        </div>
       

      {/* Teclado numérico */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs ">
        {keys.flat().map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className={`p-4 rounded-lg text-xl font-bold transition
              ${key === "DEL" ? "bg-red text-white" : "bg-white hover:bg-gray-300"}`}
          >
            {key === "DEL" ? <BackspaceOutlinedIcon /> : key}
          </button>
        ))}
      </div>
    </div>
  );
}
