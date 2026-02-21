
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import apiWallet from "../api/axiosWallet";
import { fetchAssetsInfo } from "../api/peticiones/assets";
import type { AssetFromApiDTO } from "../@types/assets";
import { convertFromUSD } from "../helpers/currencyChange";


interface Asset {
  assetId: number;
  assetSymbol: string;
  quantity: number;
  averagePrice: number;
  category: string
}
interface AssetWithPrice extends Asset {
  currentPrice: number;
  averagePrice: number; // precio promedio al que compraste
  
}

interface WalletData {
  balance: number;
  currency: string;
  assets: Asset[];
  
}

export const WalletContext = createContext<{
  wallet: WalletData;
  refreshWallet: () => Promise<void>;
  netWorth: number;
  totalPnlPercent: number
} | null>(null);


export const WalletProvider = ({ children }: { children: React.ReactNode }) => {

    const { token } = useContext(AuthContext);

    const [wallet, setWallet] = useState<WalletData>({
      balance: 0,
      currency: "EUR",
      assets: [],
    
    });

    const [netWorth, setNetWorth] = useState<number>(0);
    const [totalPnlPercent, setTotalPnlPercent] = useState<number>(0);
    
    

    const refreshWallet = async () => {
    if (!token) return;
    try {
      
      // 1️⃣ Traer wallet
      const walletResponse = await apiWallet.get<WalletData>("/api/wallet/me");
      const walletData = walletResponse.data;

      // 2️⃣ Traer info de assets si hay alguno
      const assetIds = walletData.assets.map(a => a.assetId);
      let assetsWithPrice: AssetWithPrice[] = [];

      if (assetIds.length > 0) {
        const assetsInfo = await fetchAssetsInfo(assetIds);
        // 3️⃣ Combinar datos y añadir currentPrice
         assetsWithPrice = walletData.assets.map(asset => {
          const extra: AssetFromApiDTO | undefined = assetsInfo.find((a: AssetFromApiDTO) => a.id === asset.assetId);
          
          return {
            ...asset,
            currentPrice: extra?.currentPrice || 0,
            category: extra?.category ?? asset.category ?? "unknown"
            
          };
        });
      }

      const walletWithPrices = { ...walletData, assets: assetsWithPrice };

      // 4️⃣ Calcular net worth: balance + Σ(currentPrice * quantity)
      const assetsValue = assetsWithPrice.reduce(
        (acc, asset) => acc + ((asset.currentPrice) || 0) * asset.quantity,
        0
      );
      const totalNetWorth = walletWithPrices.balance + convertFromUSD(assetsValue, wallet.currency);

      const totalInvested = walletWithPrices.assets.reduce((acc, asset) => {
      return acc + asset.averagePrice * asset.quantity;
      }, 0);

      const totalPnlPercent = totalInvested > 0
        ? ((convertFromUSD(assetsValue, wallet.currency) - (convertFromUSD(totalInvested, wallet.currency))) / convertFromUSD(totalInvested, wallet.currency)) * 100
      : 0;
      
      // 5️⃣ Guardar en estado
      setWallet(walletWithPrices);
      setNetWorth(totalNetWorth);
      setTotalPnlPercent(totalPnlPercent)

    } catch (err) {
      console.error(err);
    }
  };

    useEffect(() => {
      if (token) refreshWallet();
    }, [token]);

  return (
    <WalletContext.Provider value={{ wallet, refreshWallet, netWorth, totalPnlPercent }}>
      {children}
    </WalletContext.Provider>
  );
    
}