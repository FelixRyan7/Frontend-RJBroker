
import { useContext } from "react";
import DefaultHeader from "./Headers/DefaultHeader";
import { AuthContext } from "../context/AuthContext";
import LoggedHeader from "./Headers/LoggedHeader";

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);
    
  return (
    <>
    {!isAuthenticated ? <DefaultHeader/> : <LoggedHeader/>}
    </>
  )
}
