import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./views/LoginPage";
import Dashboard from "./views/ProtectedViews/Market";
import UserLayout from "./layout/UserLayout";
import Wallet from "./views/ProtectedViews/Wallet";
import Favourites from "./views/ProtectedViews/Favourites";
import Messages from "./views/ProtectedViews/Messages";
import Search from "./views/ProtectedViews/Search";
import UserDataForm from "./components/Forms/UserDataForm";
import AuthWrapper from "./context/AuthWrapper";
import { AssetsList } from "./views/ProtectedViews/assets/AssetsList";
import AssetDetails from "./components/Assets/AssetDetails";

export default function router() {
  return (
      <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<LoginPage />} />
        </Route> 
        <Route element={<AuthWrapper><UserLayout /></AuthWrapper>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Assets/:type" element={<AssetsList />} />
            
        </Route> 
        
        <Route path="/complete-profile" element={<UserDataForm />} />
      </Routes>
  )
}
