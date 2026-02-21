import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import MessageIcon from '@mui/icons-material/Message';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import '../../styles/styles.css'
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNav() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const itemClass = "h-full flex flex-col justify-center items-center cursor-pointer";

  const isActive = (path:any) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm h-20 z-40">
      
      <div className="grid grid-cols-5 h-full w-full items-center text-white2">

        {/* HOME */}
        <div className={itemClass} onClick={() => navigate("/dashboard")}>
          <button >
            {isActive("/dashboard") 
              ? <HomeIcon className="text-primary icon-fill icon-pop" />
              : <HomeOutlinedIcon />
            }
          </button>
          <p className={`text-xs text-white2 ${isActive("/dashboard") && 'font-bold'}`}>Market</p>
        </div>

        {/* FAVOURITES */}
        <div className={itemClass} onClick={() => navigate("/favourites")}>
          <button>
            {isActive("/favourites") 
              ? <StarIcon className="text-primary icon-fill icon-pop" />
              : <StarBorderOutlinedIcon />
            }
          </button>
          <p className={`text-xs text-white2 ${isActive("/favourites") && 'font-bold'}`}>Favourites</p>
        </div>

        {/* BIG SEARCH BUTTON */}
        <div className="flex flex-col justify-center items-center">
          <button 
            onClick={() => navigate("/search")}
            className={`text-white2 ${isActive("/search") ? 'bg-primary/80' : 'bg-white/10'} backdrop-blur-md h-14 w-14 mb-1 rounded-full`}
          >
            <SearchIcon />
          </button>
        </div>

        {/* WALLET */}
        <div className={itemClass} onClick={() => navigate("/wallet")}>
          <button >
            {isActive("/wallet") 
              ? <AccountBalanceWalletIcon className="text-primary icon-fill icon-pop" />
              : <AccountBalanceWalletOutlinedIcon />
            }
          </button>
          <p className={`text-xs text-white2 ${isActive("/wallet") && 'font-bold'}`}>Wallet</p>
        </div>

        {/* MESSAGES */}
        <div className={itemClass} onClick={() => navigate("/messages")}>
          <button>
            {isActive("/messages") 
              ? <MessageIcon className="text-primary icon-fill icon-pop" />
              : <MessageOutlinedIcon />
            }
          </button>
          <p className={`text-xs text-white2 ${isActive("/messages") && 'font-bold'}`}>Messages</p>
        </div>

      </div>
    </nav>
  );
}

