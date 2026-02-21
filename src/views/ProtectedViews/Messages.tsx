import { useQuery } from "@tanstack/react-query";
import { fetchMessagesById } from "../../api/peticiones/messages";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { WalletContext } from "../../context/WalletContext";
import { getCurrencySymbol } from "../../helpers/currency";
import { Loader } from "../../components/utils/Loader";

interface MessagesResponse {
  amount: number
  details: string,
  id: number,
  timestamp: string
  type: string,
  userId: number


}

export default function Messages() {

  const getIconByType = (type: string) => {
  switch (type.toUpperCase()) {
    case "DEPOSIT":
      return <KeyboardArrowDownOutlinedIcon sx={{ color: "#14B8A6" }} />;

    case "WITHDRAW":
    case "WITHDRAWAL":
      return <KeyboardArrowUpOutlinedIcon sx={{ color: "#F43F5E" }} />;

    case "BUY":
      return <TrendingUpOutlinedIcon sx={{ color: "#14B8A6" }} />;

    case "SELL":
      return <TrendingDownOutlinedIcon sx={{ color: "#F43F5E" }} />;

    default:
      return null;
  }
  };

  const walletContext = useContext(WalletContext);
    if (!walletContext) {
      throw new Error("WalletContext must be used inside WalletProvider");
    }
  const { wallet} = walletContext;


  const { data, isLoading, isError } = useQuery<MessagesResponse[]>({
    queryKey: ["asset"],
    queryFn: () => fetchMessagesById(),
    staleTime: 5 * 60_000,              // 5 min en caché después de inactivo
    });

  if(isLoading) return (
    <div className="flex items-center mt-10 justify-center h-full">
      <Loader isLoading={isLoading} color="primary"/>
    </div>
  )
  return (
    (!data ? (
      <>
        <h1>no hay notificaciones aun</h1>
      </>
    ) : 
    (
      <>
      <h1 className="my-5 p-4 text-3xl">Notifications:</h1>
        {data.slice().reverse().map((message) => {
          return(
            <div key={message.id} className="shadow-sm bg-white flex justify-between gap-4 my-2 mx-4 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center`}>
                  {getIconByType(message.type)}
                </div>
                  <div>
                      <p className="text-dark text-sm">{message.details}</p>
                      <small className="text-gray">
                        {new Date(message.timestamp).toLocaleString()}
                      </small>
                  </div>
                
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-xs bg-primary p-1 rounded-lg text-white2 w-full text-center font-semibold">{message.type}</span>
                <span className="text-lg">{message.amount}{getCurrencySymbol(wallet.currency)}</span>        
              </div>
            </div>
            
          )
          
        }
        )}
      </>
    ))
  )
}
