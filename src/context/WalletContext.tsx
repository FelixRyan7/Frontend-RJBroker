
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import apiWallet from "../api/axiosWallet";

interface Asset {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
}

interface WalletData {
  balance: number;
  currency: string;
  
}

export const WalletContext = createContext<{
  wallet: WalletData;
  refreshWallet: () => Promise<void>;
} | null>(null);


export const WalletProvider = ({ children }: { children: React.ReactNode }) => {

    const { user, token } = useContext(AuthContext);

    const [wallet, setWallet] = useState<WalletData>({
      balance: 0,
      currency: "EUR"
    });
    

    const refreshWallet = async () => {
      if (!token) return;
      try {
        const response = await apiWallet.get<WalletData>("/api/wallet/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      if (token) refreshWallet();
    }, [token]);

  return (
    <WalletContext.Provider value={{ wallet, refreshWallet }}>
      {children}
    </WalletContext.Provider>
  );
    
}