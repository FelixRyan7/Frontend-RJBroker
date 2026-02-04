import { useQuery } from "@tanstack/react-query";
import { fetchAssetsByType } from "../../../api/peticiones/assets";
import { AssetsRow } from "../../../components/Assets/AssetsRow";
import { useNavigate, useParams } from "react-router-dom";
import SearchInput from "../../../components/Inputs/SearchInput";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import type { Asset, FilterPanelType } from "../../../@types/assets";
import { MARKET_TO_COUNTRY } from "../../../helpers/marketToCountry";
import FilterBottomSheet from "../../../components/filters/FilterBottomSheet";


const ASSET_TYPES = ["STOCK", "CRYPTO", "ETF", "COMMODITY", "REIT"] as const;

export function AssetsList() {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const navigate = useNavigate()
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(true);
    const {type} = useParams<{type: string}>();
    const [activePanel, setActivePanel] = useState<FilterPanelType>(null);
    const [filters, setFilters] = useState({
      country: [] as string[],
      market: [] as string[],
      sector: [] as string[],
    });

    useEffect(() => {
      if (type) {
        setFilters({
          country: [],
          market: [],
          sector: [],
        })
      }
    }, [type]);

    if (!type) return null
    const { data, isLoading, isError } = useQuery<Asset[]>({
    queryKey: ["assets", type],
    queryFn: () => fetchAssetsByType(type),
    staleTime: 60_000,
    });

    const filteredAssets = (data || []).filter(a => {
      const country = MARKET_TO_COUNTRY[a.market];
      if (filters.country.length > 0 && !filters.country.includes(country)) return false;
      if (filters.sector.length > 0 && !filters.sector.includes(a.category)) return false;
      if (filters.market.length > 0 && !filters.market.includes(a.market)) return false;
      return true;
    });

    const countryOptions = Array.from(
      new Set(
        (filters.sector.length === 0 && filters.market.length === 0
          ? data || []
          : filteredAssets
        ).map(asset => MARKET_TO_COUNTRY[asset.market]).filter(Boolean)
      )  
    );

    const sectorOptions = Array.from(
      new Set(
      (filters.country.length === 0 && filters.market.length === 0
          ? data || []
          : filteredAssets
      ).map(a => a.category) || [])
    );
    const marketOptions = Array.from(
      new Set(
        (filters.country.length === 0 && filters.sector.length === 0
          ? data || []
          : filteredAssets
      ).map(a => a.market) || []));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading assets</div>;
  if (!data) return;

  return (
  <>
      {/* Search Input animado desde abajo */}
      <div className="fixed bottom-32 right-8 z-30">
        <div
          className={`
            relative border-none 
            border overflow-hidden
            transition-[width,border-radius,transform,opacity]
            duration-300 ease-out
            ${isSearchVisible
              ? "h-[5.2rem] w-96 rounded-2xl "
              : "h-20 w-20 rounded-full cursor-pointer shadow-md"}
          `}
        >
        {/* Icono lupa */}
        <button
          onClick={() => setIsSearchVisible(true)}
          className={`
            absolute inset-0 flex items-center justify-center
            transition-transform duration-300
            ${isSearchVisible
              ? "opacity-0 scale-50 pointer-events-none"
              : "opacity-100 scale-100 bg-white/40 backdrop-blur-md"}
            `}
        >
          <SearchIcon sx={{ fontSize: 32 }} />
        </button>

        {/* SearchInput */}
        <div
          className={`
            absolute inset-0 transition-transform duration-300
            ${isSearchVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8 pointer-events-none"}
            `}
        >
          <SearchInput
            showCloseButton
            onClose={() => setIsSearchVisible(false)}
          />
        </div>
      </div>



    </div>
      <div className="mt-4 relative">
        <h1 className="text-dark font-bold uppercase mb-3 px-3">filters</h1>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar mb-2">

          <span onClick={() => setIsTypeOpen((prev) => !prev)} className="font-bold ml-2 bg-primary text-white2 py-1 px-3 rounded-full lowercase flex-shrink-0 cursor-pointer">{type}S 
            <ArrowDropDownIcon className={`transition-transform ${isTypeOpen ? "rotate-180" : ""}`}/>
          </span>
          {isTypeOpen && (
          <ul className="absolute left-4 top-9 mt-2 w-28 bg-white border-white  text-dark font-bold rounded-lg shadow-lg z-10">
            {ASSET_TYPES.map((asset) => (
              <li
                key={asset}
                onClick={() => {
                  navigate(`/assets/${asset}`)
                  setIsTypeOpen(false);
                }}
                className="px-3 py-2 cursor-pointer hover:bg-white/10 lowercase"
              >
                {asset}s
              </li>
            ))
            }
          </ul>
          )}

          {type !== "CRYPTO" && (
            <>
            <div className={`font-bold py-1 px-3 rounded-full text-md flex-shrink-0 cursor-pointer
                  ${filters.country.length > 0 ? 'bg-primary text-white2' : 'bg-secondary text-dark'}`}>
              <span
                onClick={() => setActivePanel("country")}
                className=""
              >
                Country
                
                {filters.country.length === 0 && <ArrowDropDownIcon />}
              </span>
              {filters.country.length > 0 && (
                  <>
                    {" | " + filters.country.length}{" "}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, country: [] }))}
                      className="ml-4 text-white font-bold"
                    >
                      ✕
                    </button>
                  </>
                )}
            </div>

              {/* Market */}
              <div className={`font-bold py-1 px-3 rounded-full text-md flex-shrink-0 cursor-pointer 
                ${filters.market.length > 0 ? 'bg-primary text-white2' : 'bg-secondary text-dark'}`}>
                <span onClick={() => setActivePanel("market")}>
                  Market
                  {filters.market.length === 0 && <ArrowDropDownIcon />}
                </span>
                {filters.market.length > 0 && (
                  <>
                    
                    {"  |  " + filters.market.length}{" "}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, market: [] }))}
                      className="ml-4 text-white font-bold"
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>
            </>
          )}
          {/* Sector */}
          <div className={`font-bold py-1 px-3 rounded-full text-md flex-shrink-0 cursor-pointer
            ${filters.sector.length > 0 ? 'bg-primary text-white2' : 'bg-secondary text-dark'}`}>
            <span onClick={() => setActivePanel("sector")}>
              Sector
              {filters.sector.length === 0 && <ArrowDropDownIcon />}
            </span>
            {filters.sector.length > 0 && (
              <>
                {" | " + filters.sector.length}{" "}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, sector: [] }))}
                  className="ml-4 text-white font-bold"
                >
                  ✕
                </button>
              </>
            )}
          </div>
          
        </div>
        <h1 className="text-gray px-3 mt-4">{filteredAssets.length} Results</h1>
        
      <AssetsRow assets={filteredAssets} />
    </div>

    {activePanel && (
      <FilterBottomSheet
        type={activePanel}
        options={
          activePanel === "country"
            ? countryOptions
            : activePanel === "market"
            ? marketOptions
            : sectorOptions
        }
        selected={filters[activePanel]}
        conditioningFilters={{
          market: filters.market,
          country: filters.country,
          sector: filters.sector
        }}
        onChange={(values) => setFilters(prev => ({ ...prev, [activePanel]: values }))}
        onClose={() => setActivePanel(null)}
      />
    )}


    
  </>
  )
  
}
