import { useEffect, useState } from "react";
import SearchInput from "../../components/Inputs/SearchInput";
import type { Asset } from "../../@types/assets";
import { fetchAllAssets } from "../../api/peticiones/assets";
import { AssetTile } from "../../components/Assets/AssetTile";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [allAssets, setAllAssets] = useState<Asset[]>([]); // todos los assets
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]); // filtrados por query
  const [query, setQuery] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchAllAssets();
        setAllAssets(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
    loadAssets();
  }, []);

 
  useEffect(() => {
    if (query.length >= 3) {
      const filtered = allAssets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(query.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
          asset.market.toLowerCase().includes(query.toLocaleLowerCase())
      );
      setFilteredAssets(filtered);
    } else {
      setFilteredAssets([]);
    }
  }, [query, allAssets]);


  return (
    <>
    <div className="mt-4">

      <SearchInput
        value={query}
        onChange={setQuery}
        showCloseButton={!!query}
        onClose={() => {
          setQuery("");
          setFilteredAssets([]); // limpia la lista de resultados
        }}
      />
    </div>

    <div className="mt-28 space-y-2">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
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
        ) : query.length >= 3 ? (
          <p>No se encontraron assets</p>
        ) : (
          <p>Escribe al menos 3 letras para buscar</p>
        )}
      </div>
    
    </>
  )
}
