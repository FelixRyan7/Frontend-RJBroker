import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PersonalDataModal from "../../components/Modals/PersonalDataModal";
import apiAsset from "../../api/axiosAsset";
import type { DashboardAssets } from "../../@types/assets";
import { AssetsSection } from "../../components/Assets/AssetsSection";
import  SearchInput from "../../components/Inputs/SearchInput";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

  const { token, user} = useContext(AuthContext);
  const [assetsByType, setAssetsByType] = useState<DashboardAssets | null>(null);
   const navigate = useNavigate();
  

  const fetchDashboardAssets = async () => {
    try {
      const response = await apiAsset.get("/api/assets/getAssetsByType", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        ,
      });
      setAssetsByType(response.data)
      console.log("✅ asset response:", response.data);

    } catch (error) {
      console.error("❌ Error:", error);
    }
  };
 
  useEffect(() => {
  if (token && user?.hasPersonalData) {
    fetchDashboardAssets();
  }
}, [token, user?.hasPersonalData]);

  
  return (
    <>
    <div className="min-h-screen">
      {
        user.hasPersonalData ? (
        <>
        <div className="min-h-screen p-4">
          <div className="">
            <SearchInput
              onFocus={() => navigate("/search")}/>
          </div>
        <div className="mt-24">
          {assetsByType &&
            Object.entries(assetsByType).map(([type, assets]) => (
            <AssetsSection
              key={type}
              type={type}
              assets={assets}
            />
            ))
          }
          </div>
        </div>
        </>
        ):
        (
          <PersonalDataModal/>
        )
      }
    </div>
    </>
    
  )
}
