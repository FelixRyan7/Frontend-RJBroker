import type { AssetRowProps } from "../../@types/assets";
import { AssetTile } from "./AssetTile";
import '../../styles/styles.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AssetDetails from "./AssetDetails";

// componente que muestra assets 
export function AssetsRow({ assets }: AssetRowProps) {
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  return (
    <div className="mb-10">
      {!selectedAssetId && (
        <>
        {assets.map(asset => (
          <div onClick={() => setSelectedAssetId(asset.id)}>
          <AssetTile
            key={asset.id}
            symbol={asset.symbol}
            name={asset.name}
            market={asset.market}
          />
          </div>
        ))
        }
      </>
      )}

      {selectedAssetId && (
        <AssetDetails
          id={selectedAssetId}
          onBack={() => setSelectedAssetId(null)}
        />
      )}
      
    </div>
  );
}
