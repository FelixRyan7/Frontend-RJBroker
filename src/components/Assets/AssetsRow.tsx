import type { AssetRowProps } from "../../@types/assets";
import { AssetTile } from "./AssetTile";
import '../../styles/styles.css';
import { useNavigate } from "react-router-dom";


// componente que muestra assets 
export function AssetsRow({ assets }: AssetRowProps) {

  const navigate = useNavigate()
  
  return (
    <div className="mb-10">
      <>
        {assets.map(asset => (
          <div 
            onClick={() => navigate(`/asset/${asset.id}`)}
            key={asset.id}
          >
          <AssetTile
            symbol={asset.symbol}
            name={asset.name}
            market={asset.market}
            logo={asset.logo}
            type={asset.type}
          />
          </div>
          
        ))
        }
      </>
    </div>
  );
}
